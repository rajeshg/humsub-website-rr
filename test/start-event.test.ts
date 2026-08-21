import type { DurableObjectState } from "@cloudflare/workers-types"

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { Counter, type Env, type EventState } from "../app/counter"

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

// Drain the microtask queue so the constructor's async loading (loadState() and
// storage.get("order").then(...)) settles before assertions run.
const flushAsyncWork = async () => {
  for (let i = 0; i < 10; i++) {
    await Promise.resolve()
  }
}

const testPayload = (overrides: Partial<EventState> = {}): EventState => ({
  name: "BB2027",
  startDate: "2027-04-10T09:00:00Z",
  endDate: null,
  items: [
    {
      itemId: "#1",
      name: "Opening Dance",
      type: "PERFORMANCE",
      state: "NONE",
      timer_start_time: null,
      duration: "04:30",
      durationSeconds: 270,
    },
    {
      itemId: "#2",
      name: "Carnatic Fusion",
      type: "PERFORMANCE",
      state: "NONE",
      timer_start_time: null,
      duration: "06:00",
      durationSeconds: 360,
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

describe("startEvent lifecycle", () => {
  let mockState: MockDurableObjectState
  let counter: Counter

  beforeEach(() => {
    mockState = createMockState()
    counter = new Counter(mockState as unknown as DurableObjectState, {} as Env)
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.restoreAllMocks()
  })

  it("starts with an empty event when no persisted state exists", async () => {
    // let the async load settle
    await flushAsyncWork()
    expect(counter.event.items).toEqual([])
    expect(counter.event.name).toBe("")
    expect(counter.event.viewState).toBe("item")
  })

  it("loads a new event from a valid payload and clears prior storage", async () => {
    const payload = testPayload()
    const broadcastSpy = vi.spyOn(counter as unknown as { broadcast: (m: unknown) => void }, "broadcast")

    await counter.startEvent(payload)

    expect(counter.event.name).toBe("BB2027")
    expect(counter.event.startDate).toBe("2027-04-10T09:00:00Z")
    expect(counter.event.items).toHaveLength(2)
    expect(counter.event.items[0]).toMatchObject({ itemId: "#1", name: "Opening Dance" })
    expect(mockState.storage.deleteAll).toHaveBeenCalled()
    expect(mockState.storage.put).toHaveBeenCalledWith("event", expect.objectContaining({ name: "BB2027" }))
    expect(broadcastSpy).toHaveBeenCalledWith({ type: "event_reset", state: expect.any(Object) })
  })

  it("merges partial payloads against empty defaults", async () => {
    // payload only has name/startDate/items (like the reset script / UI form)
    await counter.startEvent({ name: "Short", startDate: null, items: [] } as EventState)

    expect(counter.event.name).toBe("Short")
    expect(counter.event.viewState).toBe("item")
    expect(counter.event.imageMode).toBe("single")
    expect(counter.event.collectionInterval).toBe(30)
    expect(counter.event.activeTimers).toEqual([])
  })

  it("starts with a completely empty event when no payload is provided", async () => {
    await counter.startEvent()

    expect(counter.event.name).toBe("")
    expect(counter.event.items).toEqual([])
    expect(mockState.storage.deleteAll).toHaveBeenCalled()
  })

  it("normalizes duration strings into durationSeconds on load", async () => {
    const payload = testPayload()
    payload.items[0] = { ...payload.items[0], durationSeconds: undefined } as EventState["items"][number]

    await counter.startEvent(payload)

    const item = counter.event.items[0] as unknown as { durationSeconds: number | null }
    expect(item.durationSeconds).toBe(270)
  })
})
