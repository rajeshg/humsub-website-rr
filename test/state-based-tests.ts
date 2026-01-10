import type { DurableObjectState } from "@cloudflare/workers-types"

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { Counter, type Env } from "../app/counter"

interface MockDurableObjectState {
  storage: {
    get: ReturnType<typeof vi.fn>
    put: ReturnType<typeof vi.fn>
  }
}

describe("State-Based Test Cases", () => {
  let counter: Counter
  let mockState: MockDurableObjectState

  beforeEach(() => {
    mockState = {
      storage: {
        get: vi.fn(),
        put: vi.fn(),
      },
    }
    counter = new Counter(mockState as unknown as DurableObjectState, {} as Env)
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.restoreAllMocks()
  })

  describe("Timer State Transitions", () => {
    it("should handle READY TO GO state via HTTP API", async () => {
      const response = await counter.fetch(
        new Request("http://localhost/api/durable/updateItem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            itemId: "test-ready-item",
            state: "READY TO GO",
          }),
        })
      )

      expect(response.status).toBe(200)
    })

    it("should handle PERFORMING state via WebSocket", async () => {
      await (counter as any).handleWebSocketMessage({
        action: "startTimer",
        itemId: "test-performing-item",
      })
    })

    it("should handle DONE state via HTTP API", async () => {
      const response = await counter.fetch(
        new Request("http://localhost/api/durable/updateItem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            itemId: "test-done-item",
            state: "DONE",
          }),
        })
      )

      expect(response.status).toBe(200)
    })
  })

  describe("Image State Management", () => {
    it("should handle single image selection via WebSocket", async () => {
      await (counter as any).handleWebSocketMessage({
        action: "selectImage",
        imagePath: "/test/image.png",
      })
    })

    it("should handle image collection selection via WebSocket", async () => {
      await (counter as any).handleWebSocketMessage({
        action: "selectImageCollection",
        imagePaths: ["/img1.png", "/img2.png"],
        interval: 45,
      })
    })

    it("should handle image clearing via WebSocket", async () => {
      await (counter as any).handleWebSocketMessage({
        action: "clearImageSelection",
      })
    })
  })

  describe("Item State Management", () => {
    it("should handle item reordering via WebSocket", async () => {
      await (counter as any).handleWebSocketMessage({
        action: "reorderItems",
        itemIds: ["item-1", "item-2", "item-3"],
      })
    })

    it("should handle item state updates via WebSocket", async () => {
      await (counter as any).handleWebSocketMessage({
        action: "updateState",
        itemId: "test-item",
        newState: "BACKSTAGE",
      })
    })
  })

  describe("Error Handling and Edge Cases", () => {
    it("should handle invalid item IDs gracefully", async () => {
      const response = await counter.fetch(
        new Request("http://localhost/api/durable/updateItem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            itemId: "non-existent-item",
            state: "READY TO GO",
          }),
        })
      )

      expect(response.status).toBe(200)
    })

    it("should handle malformed WebSocket messages", async () => {
      await (counter as any).handleWebSocketMessage({
        action: "updateState",
        // Missing required fields
      })
    })

    it("should handle invalid state transitions", async () => {
      await (counter as any).handleWebSocketMessage({
        action: "updateState",
        itemId: "test-item",
        newState: "INVALID_STATE",
      })
    })

    it("should handle unknown WebSocket actions", async () => {
      await (counter as any).handleWebSocketMessage({
        action: "unknown_action",
        data: "test",
      })
    })
  })

  describe("State Persistence", () => {
    it("should persist state changes to storage", async () => {
      await counter.fetch(
        new Request("http://localhost/api/durable/updateItem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            itemId: "test-item",
            state: "READY TO GO",
          }),
        })
      )

      expect(mockState.storage.put).toHaveBeenCalled()
    })

    it("should handle state retrieval from storage", async () => {
      mockState.storage.get.mockResolvedValue({
        name: "Test Event",
        items: [],
        viewState: "item",
      })

      // Create new counter to test loading
      const _newCounter = new Counter(mockState, {} as any)
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(mockState.storage.get).toHaveBeenCalled()
    })
  })

  describe("WebSocket Integration", () => {
    it("should handle multiple WebSocket clients", async () => {
      const mockClient1 = { send: vi.fn() }
      const mockClient2 = { send: vi.fn() }
      ;(counter as any).clients = new Set([mockClient1, mockClient2])

      await (counter as any).handleWebSocketMessage({
        action: "updateState",
        itemId: "test-item",
        newState: "PERFORMING",
      })

      expect(mockClient1.send).toHaveBeenCalled()
      expect(mockClient2.send).toHaveBeenCalled()
    })

    it("should broadcast state updates to connected clients", async () => {
      const mockClient = { send: vi.fn() }
      ;(counter as any).clients = new Set([mockClient])

      await (counter as any).handleWebSocketMessage({
        action: "startTimer",
        itemId: "test-item",
      })

      expect(mockClient.send).toHaveBeenCalled()
    })
  })

  describe("Timer and Collection Management", () => {
    it("should handle collection rotation setup", async () => {
      await (counter as any).handleWebSocketMessage({
        action: "selectImageCollection",
        imagePaths: ["/img1.png", "/img2.png"],
        interval: 30,
      })
    })

    it("should handle timer expiration scenarios", async () => {
      // Test timer-related state changes
      await (counter as any).handleWebSocketMessage({
        action: "startTimer",
        itemId: "timer-test-item",
      })
    })
  })
})
