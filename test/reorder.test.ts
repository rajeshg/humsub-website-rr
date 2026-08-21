import type { DurableObjectState } from "@cloudflare/workers-types"

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { Counter, type Env, type EventState, type Item } from "../app/counter"

interface MockDurableObjectState {
  storage: {
    get: ReturnType<typeof vi.fn>
    put: ReturnType<typeof vi.fn>
    deleteAll: ReturnType<typeof vi.fn>
  }
}

const createMockState = (): MockDurableObjectState => ({
  storage: {
    // get() must return a promise (the Counter constructor chains .then() on it)
    get: vi.fn(async () => undefined),
    put: vi.fn(),
    deleteAll: vi.fn(),
  },
})

const flushAsyncWork = async () => {
  // The constructor fires loadState() and storage.get("order").then(...) on the
  // microtask queue; drain it so the settled state is observable before assertions.
  for (let i = 0; i < 10; i++) {
    await Promise.resolve()
  }
}

const testPayload = (overrides: Partial<EventState> = {}): EventState => ({
  name: "Test Event",
  startDate: null,
  endDate: null,
  items: [
    {
      itemId: "#1",
      name: "Alpha",
      type: "PERFORMANCE",
      state: "BACKSTAGE",
      timer_start_time: null,
      eventTime: null,
      durationSeconds: 300,
    },
    {
      itemId: "#2",
      name: "Beta",
      type: "PERFORMANCE",
      state: "READY TO GO",
      timer_start_time: null,
      eventTime: null,
      durationSeconds: 300,
    },
    {
      itemId: "#3",
      name: "Gamma",
      type: "PERFORMANCE",
      state: "DONE",
      timer_start_time: null,
      eventTime: null,
      durationSeconds: 300,
    },
  ],
  viewState: "item",
  selectedItemId: null,
  selectedImage: null,
  imageMode: "single",
  imageCollection: [],
  collectionInterval: 30,
  collectionCurrentIndex: 0,
  collectionLastRotation: 0,
  activeTimers: [],
  ...overrides,
})

const handleWs = (counter: Counter) => {
  return (
    counter as unknown as {
      handleWebSocketMessage: (data: Record<string, unknown>) => Promise<void>
    }
  ).handleWebSocketMessage.bind(counter)
}

describe("reorderItems (WebSocket)", () => {
  let mockState: MockDurableObjectState
  let counter: Counter

  beforeEach(async () => {
    mockState = createMockState()
    counter = new Counter(mockState as unknown as DurableObjectState, {} as Env)
    // let the constructor's async loading settle before loading a fresh event
    await flushAsyncWork()
    await counter.startEvent(testPayload())
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.restoreAllMocks()
  })

  it("persists the new order and broadcasts the full reordered state", async () => {
    const broadcastSpy = vi.spyOn(counter as unknown as { broadcast: (m: unknown) => void }, "broadcast")

    const itemIds = ["#2", "#1"]
    await handleWs(counter)({ action: "reorderItems", itemIds })

    // Visible (non-DONE) items are reordered; hidden DONE items stay appended at the end
    expect(counter.event.items.map((i) => i.itemId)).toEqual(["#2", "#1", "#3"])

    // The new order is persisted
    expect(mockState.storage.put).toHaveBeenCalledWith("order", itemIds)

    // Regression: the WS broadcast must include BOTH `order` and the full `state`.
    // Previously it omitted `state`, so the dashboard's order_updated handler
    // (which reads `data.state.items`) never updated local items and the card snapped
    // back until a page refresh.
    const orderUpdate = broadcastSpy.mock.calls.find((call) => (call[0] as { type?: string }).type === "order_updated")
    expect(orderUpdate).toBeDefined()
    const msg = orderUpdate![0] as { type: string; order: string[]; state: { items: Item[] } }
    expect(msg.order).toEqual(itemIds)
    expect(msg.state).toBeDefined()
    expect(msg.state.items.map((i) => i.itemId)).toEqual(["#2", "#1", "#3"])
  })

  it("honors a full reorder that includes DONE items", async () => {
    const itemIds = ["#3", "#1", "#2"]
    await handleWs(counter)({ action: "reorderItems", itemIds })

    // When the client sends the fully-visible list (e.g. "Show Completed" is on),
    // the backend keeps exactly the client's order.
    expect(counter.event.items.map((i) => i.itemId)).toEqual(["#3", "#1", "#2"])
  })

  it("appends items missing from the new order at the end", async () => {
    const itemIds = ["#2"]
    await handleWs(counter)({ action: "reorderItems", itemIds })

    // Items not in the new order (#1, #3) are appended afterward in their original relative order
    expect(counter.event.items.map((i) => i.itemId)).toEqual(["#2", "#1", "#3"])
  })

  it("ignores messages without a valid itemIds array", async () => {
    const broadcastSpy = vi.spyOn(counter as unknown as { broadcast: (m: unknown) => void }, "broadcast")
    const before = counter.event.items.map((i) => i.itemId)

    await handleWs(counter)({ action: "reorderItems" })

    expect(counter.event.items.map((i) => i.itemId)).toEqual(before)
    expect(broadcastSpy).not.toHaveBeenCalled()
  })
})
