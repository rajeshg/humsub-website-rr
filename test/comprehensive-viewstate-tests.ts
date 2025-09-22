import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { type BreakItem, Counter, type EventState, type PerformanceItem } from "../app/counter"

describe("Comprehensive ViewState Management Tests", () => {
	let counter: Counter
	let mockState: any
	let broadcastSpy: any

	beforeEach(() => {
		mockState = {
			storage: {
				get: vi.fn(),
				put: vi.fn(),
			},
		}
		counter = new Counter(mockState, {} as any)

		// Spy on broadcast method
		broadcastSpy = vi.spyOn(counter as any, "broadcast")
	})

	afterEach(() => {
		vi.clearAllTimers()
		vi.restoreAllMocks()
	})

	// Helper function to create test performance item
	const _createPerformanceItem = (overrides: Partial<PerformanceItem> = {}): PerformanceItem => ({
		itemId: overrides.itemId || "test-item",
		name: overrides.name || "Test Performance",
		type: "PERFORMANCE",
		state: overrides.state || "BACKSTAGE",
		timer_start_time: overrides.timer_start_time || null,
		timer_end_time: overrides.timer_end_time || null,
		durationSeconds: overrides.durationSeconds || null,
		description: overrides.description || null,
		style: overrides.style || null,
		teamSize: overrides.teamSize || null,
		choreographers: overrides.choreographers || null,
		duration: overrides.duration || null,
	})

	// Helper function to create test break item
	const _createBreakItem = (overrides: Partial<BreakItem> = {}): BreakItem => ({
		itemId: overrides.itemId || "test-break",
		name: overrides.name || "Test Break",
		type: "BREAK",
		state: overrides.state || "NONE",
		timer_start_time: overrides.timer_start_time || null,
		timer_end_time: overrides.timer_end_time || null,
	})

	// Helper to get current event state via API
	const _getEventState = async (): Promise<EventState> => {
		const response = await counter.fetch(new Request("http://localhost/api/durable/state"))
		return response.json()
	}

	// Helper to update item state via API
	const _updateItemState = async (itemId: string, state: string) => {
		return counter.fetch(
			new Request("http://localhost/api/durable/updateItem", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ itemId, state }),
			})
		)
	}

	describe("Load Button ViewState Test", () => {
		it("should set viewstate to 'item' mode when Load button transitions item to READY TO GO", async () => {
			// Setup: Add a performance item in BACKSTAGE state
			counter.event.items = [
				{
					itemId: "test-item-1",
					name: "Test Performance",
					type: "PERFORMANCE",
					state: "BACKSTAGE",
					timer_start_time: null,
					timer_end_time: null,
					durationSeconds: 300,
				},
			]

			// Simulate HTTP API call for Load button (transitions to READY TO GO)
			const response = await counter.fetch(
				new Request("http://localhost/api/durable/updateItem", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						itemId: "test-item-1",
						state: "READY TO GO",
					}),
				})
			)

			expect(response.status).toBe(200)
			expect(counter.event.viewState).toBe("item")
			expect(counter.event.selectedItemId).toBe("test-item-1")
			expect(broadcastSpy).toHaveBeenCalledWith({
				type: "view_state_updated",
				state: expect.any(Object),
			})
		})

		it("should handle Load button with multiple items - only active item selected", async () => {
			counter.event.items = [
				{
					itemId: "item-1",
					name: "Performance 1",
					type: "PERFORMANCE",
					state: "BACKSTAGE",
					timer_start_time: null,
				},
				{
					itemId: "item-2",
					name: "Performance 2",
					type: "PERFORMANCE",
					state: "READY TO GO",
					timer_start_time: null,
				},
			]

			await counter.fetch(
				new Request("http://localhost/api/durable/updateItem", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						itemId: "item-1",
						state: "READY TO GO",
					}),
				})
			)

			expect(counter.event.viewState).toBe("item")
			expect(counter.event.selectedItemId).toBe("item-2") // Should select the already READY TO GO item
		})
	})

	describe("Start Button ViewState Test", () => {
		it("should set viewstate to 'item' mode when Start button transitions item to PERFORMING", async () => {
			counter.event.items = [
				{
					itemId: "test-item-1",
					name: "Test Performance",
					type: "PERFORMANCE",
					state: "READY TO GO",
					timer_start_time: null,
					durationSeconds: 300,
				},
			]

			// Simulate WebSocket message for Start button
			await (counter as any).handleWebSocketMessage({
				action: "startTimer",
				itemId: "test-item-1",
			})

			expect(counter.event.viewState).toBe("item")
			expect(counter.event.selectedItemId).toBe("test-item-1")
			expect(counter.event.items[0].state).toBe("PERFORMING")
			expect(counter.event.items[0].timer_start_time).toBeGreaterThan(0)
			expect(broadcastSpy).toHaveBeenCalledWith({
				type: "view_state_updated",
				state: expect.any(Object),
			})
		})

		it("should handle Start button when another item is already performing", async () => {
			counter.event.items = [
				{
					itemId: "item-1",
					name: "Performance 1",
					type: "PERFORMANCE",
					state: "PERFORMING",
					timer_start_time: Date.now() - 10000,
				},
				{
					itemId: "item-2",
					name: "Performance 2",
					type: "PERFORMANCE",
					state: "READY TO GO",
					timer_start_time: null,
				},
			]

			await (counter as any).handleWebSocketMessage({
				action: "startTimer",
				itemId: "item-2",
			})

			expect(counter.event.viewState).toBe("item")
			expect(counter.event.selectedItemId).toBe("item-2")
			expect(counter.event.items[0].state).toBe("DONE") // Previous item marked as done
			expect(counter.event.items[1].state).toBe("PERFORMING")
		})
	})

	describe("No Active Performance ViewState Test", () => {
		it("should automatically switch to 'image' mode when no performances are active", () => {
			counter.event.items = [
				{
					itemId: "item-1",
					name: "Performance 1",
					type: "PERFORMANCE",
					state: "DONE",
				},
			]
			counter.event.selectedImage = null
			counter.event.imageCollection = []
			;(counter as any).updateViewState()

			expect(counter.event.viewState).toBe("image")
			expect(counter.event.imageMode).toBe("collection")
			expect(counter.event.imageCollection).toEqual([
				"/assets/stage-timer/filler/diwali.png",
				"/assets/stage-timer/filler/holi.png",
			])
		})

		it("should switch to image mode immediately when last performing item completes", async () => {
			counter.event.items = [
				{
					itemId: "item-1",
					name: "Performance 1",
					type: "PERFORMANCE",
					state: "PERFORMING",
					timer_start_time: Date.now() - 10000,
				},
			]

			// Simulate item completion via HTTP API
			await counter.fetch(
				new Request("http://localhost/api/durable/updateItem", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						itemId: "item-1",
						state: "DONE",
					}),
				})
			)

			expect(counter.event.viewState).toBe("image")
			expect(counter.event.selectedItemId).toBe(null)
		})
	})

	describe("Filler Image Rotation ViewState Test", () => {
		it("should set correct viewstate for filler image rotation", () => {
			counter.event.items = []
			counter.event.selectedImage = null
			;(counter as any).updateViewState()

			expect(counter.event.viewState).toBe("image")
			expect(counter.event.imageMode).toBe("collection")
			expect(counter.event.imageCollection).toEqual([
				"/assets/stage-timer/filler/diwali.png",
				"/assets/stage-timer/filler/holi.png",
			])
		})

		it("should start collection rotation when switching to filler images", () => {
			counter.event.items = []
			counter.event.selectedImage = null
			counter.event.imageMode = "collection"
			counter.event.imageCollection = ["/assets/stage-timer/filler/diwali.png", "/assets/stage-timer/filler/holi.png"]

			const startRotationSpy = vi.spyOn(counter as any, "startCollectionRotation")
			;(counter as any).updateViewState()

			expect(startRotationSpy).toHaveBeenCalled()
		})

		it("should select first filler image when starting rotation", () => {
			counter.event.imageCollection = ["/assets/stage-timer/filler/diwali.png", "/assets/stage-timer/filler/holi.png"]
			counter.event.collectionCurrentIndex = 0
			;(counter as any).selectRandomFromCollection()

			expect(counter.event.selectedImage).toBe("/assets/stage-timer/filler/diwali.png")
			expect(counter.event.collectionCurrentIndex).toBe(0)
		})
	})

	describe("Countdown Timer ViewState Test", () => {
		it("should handle countdown timer in collection mode", () => {
			counter.event.viewState = "image"
			counter.event.imageMode = "collection"
			counter.event.imageCollection = ["/img1.png", "/img2.png"]
			counter.event.collectionInterval = 45

			const startRotationSpy = vi.spyOn(counter as any, "startCollectionRotation")
			;(counter as any).updateViewState()

			expect(startRotationSpy).toHaveBeenCalled()
		})

		it("should set collection timer with correct interval", () => {
			counter.event.imageMode = "collection"
			counter.event.imageCollection = ["/img1.png"]
			counter.event.collectionInterval = 60
			;(counter as any).startCollectionRotation()

			expect((counter as any).collectionTimer).not.toBeNull()
		})
	})

	describe("WebSocket ViewState Sync Test", () => {
		it("should broadcast viewstate changes to all connected clients", async () => {
			counter.event.items = [
				{
					itemId: "test-item",
					name: "Test Performance",
					type: "PERFORMANCE",
					state: "BACKSTAGE",
				},
			]

			await (counter as any).handleWebSocketMessage({
				action: "updateState",
				itemId: "test-item",
				newState: "READY TO GO",
			})

			expect(broadcastSpy).toHaveBeenCalledWith({
				type: "view_state_updated",
				state: expect.any(Object),
			})
			expect(broadcastSpy).toHaveBeenCalledWith({
				type: "item_updated",
				item: expect.any(Object),
			})
		})

		it("should handle multiple WebSocket clients receiving updates", async () => {
			// Mock multiple clients
			const mockClient1 = { send: vi.fn() }
			const mockClient2 = { send: vi.fn() }
			;(counter as any).clients = new Set([mockClient1, mockClient2])

			counter.event.items = [
				{
					itemId: "test-item",
					name: "Test Performance",
					type: "PERFORMANCE",
					state: "BACKSTAGE",
				},
			]

			await (counter as any).handleWebSocketMessage({
				action: "updateState",
				itemId: "test-item",
				newState: "PERFORMING",
			})

			expect(mockClient1.send).toHaveBeenCalled()
			expect(mockClient2.send).toHaveBeenCalled()
		})
	})

	describe("ViewState Persistence Test", () => {
		it("should persist viewstate changes to storage", async () => {
			counter.event.items = [
				{
					itemId: "test-item",
					name: "Test Performance",
					type: "PERFORMANCE",
					state: "BACKSTAGE",
				},
			]

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

			expect(mockState.storage.put).toHaveBeenCalledWith("event", expect.any(Object))
		})

		it("should restore viewstate from persisted storage", async () => {
			const persistedState = {
				name: "Test Event",
				startDate: null,
				endDate: null,
				items: [
					{
						itemId: "test-item",
						name: "Test Performance",
						type: "PERFORMANCE",
						state: "PERFORMING",
					},
				],
				viewState: "item",
				selectedItemId: "test-item",
				selectedImage: null,
				imageMode: "single",
				imageCollection: [],
				collectionInterval: 30,
				collectionCurrentIndex: 0,
				collectionLastRotation: 0,
				activeTimers: [],
			}

			mockState.storage.get.mockResolvedValue(persistedState)

			// Create new counter instance to test loading
			const newCounter = new Counter(mockState, {} as any)

			// Wait for async loading
			await new Promise((resolve) => setTimeout(resolve, 0))

			expect(newCounter.event.viewState).toBe("item")
			expect(newCounter.event.selectedItemId).toBe("test-item")
		})
	})

	describe("Role-Based ViewState Access Test", () => {
		it("should allow backstage users to modify viewstate via HTTP API", async () => {
			counter.event.items = [
				{
					itemId: "test-item",
					name: "Test Performance",
					type: "PERFORMANCE",
					state: "BACKSTAGE",
				},
			]

			const response = await counter.fetch(
				new Request("http://localhost/api/durable/updateItem", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						itemId: "test-item",
						state: "READY TO GO",
					}),
				})
			)

			expect(response.status).toBe(200)
			expect(counter.event.viewState).toBe("item")
		})

		it("should handle image selection for backstage users", async () => {
			await (counter as any).handleWebSocketMessage({
				action: "selectImage",
				imagePath: "/test/image.png",
			})

			expect(counter.event.viewState).toBe("image")
			expect(counter.event.imageMode).toBe("single")
			expect(counter.event.selectedImage).toBe("/test/image.png")
		})

		it("should handle image collection selection", async () => {
			const imagePaths = ["/img1.png", "/img2.png"]

			await (counter as any).handleWebSocketMessage({
				action: "selectImageCollection",
				imagePaths,
				interval: 45,
			})

			expect(counter.event.viewState).toBe("image")
			expect(counter.event.imageMode).toBe("collection")
			expect(counter.event.imageCollection).toEqual(imagePaths)
			expect(counter.event.collectionInterval).toBe(45)
		})
	})

	describe("Edge Cases and Error Handling", () => {
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
			// ViewState should not change for invalid item
			expect(counter.event.viewState).toBe("item")
		})

		it("should handle invalid state transitions", async () => {
			counter.event.items = [
				{
					itemId: "test-item",
					name: "Test Performance",
					type: "PERFORMANCE",
					state: "BACKSTAGE",
				},
			]

			await (counter as any).handleWebSocketMessage({
				action: "updateState",
				itemId: "test-item",
				newState: "INVALID_STATE",
			})

			// State should remain unchanged
			expect(counter.event.items[0].state).toBe("BACKSTAGE")
		})

		it("should handle empty image collection gracefully", () => {
			counter.event.imageCollection = []
			counter.event.imageMode = "collection"
			;(counter as any).selectRandomFromCollection()

			// Should not crash, selectedImage should remain null
			expect(counter.event.selectedImage).toBe(null)
		})

		it("should avoid consecutive repeats in image rotation", () => {
			counter.event.imageCollection = ["/img1.png", "/img2.png"]
			counter.event.collectionCurrentIndex = 0

			// Mock Math.random to return same index
			vi.spyOn(Math, "random").mockReturnValue(0)
			;(counter as any).selectRandomFromCollection()
			const firstSelection = counter.event.selectedImage
			;(counter as any).selectRandomFromCollection()
			const secondSelection = counter.event.selectedImage

			// Should have changed despite random returning same index
			expect(secondSelection).not.toBe(firstSelection)
		})
	})

	describe("Timer State Transitions", () => {
		it("should handle timer expiration and auto-complete items", () => {
			counter.event.items = [
				{
					itemId: "test-item",
					name: "Test Performance",
					type: "PERFORMANCE",
					state: "PERFORMING",
					timer_start_time: Date.now() - 310000, // 5 minutes 10 seconds ago
					timer_end_time: null,
					durationSeconds: 300, // 5 minutes
				},
			]

			// Simulate timer expiration check
			;(counter as any).checkTimerExpiration()

			expect(counter.event.items[0].state).toBe("DONE")
			expect(counter.event.items[0].timer_end_time).toBeGreaterThan(0)
		})

		it("should calculate remaining time accurately", () => {
			const startTime = Date.now() - 60000 // 1 minute ago
			const duration = 300 // 5 minutes
			counter.event.items = [
				{
					itemId: "test-item",
					name: "Test Performance",
					type: "PERFORMANCE",
					state: "PERFORMING",
					timer_start_time: startTime,
					timer_end_time: null,
					durationSeconds: duration,
				},
			]

			const remaining = (counter as any).calculateRemainingTime("test-item")
			const expectedRemaining = duration - Math.floor((Date.now() - startTime) / 1000)

			expect(remaining).toBeCloseTo(expectedRemaining, 1) // Allow 1 second tolerance
		})
	})

	describe("Break Item State Management", () => {
		it("should handle break items in READY TO GO state", () => {
			counter.event.items = [
				{
					itemId: "break-1",
					name: "Break Time",
					type: "BREAK",
					state: "READY TO GO",
					timer_start_time: null,
					timer_end_time: null,
				},
			]
			;(counter as any).updateViewState()

			expect(counter.event.viewState).toBe("item")
			expect(counter.event.selectedItemId).toBe("break-1")
		})

		it("should prioritize performance items over break items", () => {
			counter.event.items = [
				{
					itemId: "break-1",
					name: "Break Time",
					type: "BREAK",
					state: "READY TO GO",
				},
				{
					itemId: "perf-1",
					name: "Performance",
					type: "PERFORMANCE",
					state: "READY TO GO",
				},
			]
			;(counter as any).updateViewState()

			expect(counter.event.viewState).toBe("item")
			expect(counter.event.selectedItemId).toBe("perf-1") // Performance should take priority
		})
	})

	describe("Complex State Priority Scenarios", () => {
		it("should handle multiple READY TO GO items - select first by priority", () => {
			counter.event.items = [
				{
					itemId: "break-1",
					name: "Break",
					type: "BREAK",
					state: "READY TO GO",
				},
				{
					itemId: "perf-1",
					name: "Performance 1",
					type: "PERFORMANCE",
					state: "READY TO GO",
				},
				{
					itemId: "perf-2",
					name: "Performance 2",
					type: "PERFORMANCE",
					state: "READY TO GO",
				},
			]
			;(counter as any).updateViewState()

			expect(counter.event.viewState).toBe("item")
			expect(counter.event.selectedItemId).toBe("perf-1") // First performance should be selected
		})

		it("should handle mixed states with PERFORMING taking highest priority", () => {
			counter.event.items = [
				{
					itemId: "perf-1",
					name: "Performance 1",
					type: "PERFORMANCE",
					state: "READY TO GO",
				},
				{
					itemId: "perf-2",
					name: "Performance 2",
					type: "PERFORMANCE",
					state: "PERFORMING",
				},
				{
					itemId: "break-1",
					name: "Break",
					type: "BREAK",
					state: "READY TO GO",
				},
			]
			;(counter as any).updateViewState()

			expect(counter.event.viewState).toBe("item")
			expect(counter.event.selectedItemId).toBe("perf-2") // PERFORMING should take priority
		})
	})

	describe("State Validation and Error Handling", () => {
		it("should validate timer start time for PERFORMING items", () => {
			counter.event.items = [
				{
					itemId: "perf-1",
					name: "Performance",
					type: "PERFORMANCE",
					state: "PERFORMING",
					timer_start_time: null, // Invalid - PERFORMING without start time
				},
			]
			;(counter as any).updateViewState()

			expect(counter.event.viewState).toBe("item")
			expect(counter.event.selectedItemId).toBe("perf-1")
		})

		it("should handle WebSocket messages with missing fields", async () => {
			await (counter as any).handleWebSocketMessage({
				action: "updateState",
				// Missing itemId and newState
			})

			// Should not crash, state should remain unchanged
			expect(counter.event.viewState).toBe("item")
		})

		it("should handle WebSocket messages with invalid action types", async () => {
			await (counter as any).handleWebSocketMessage({
				action: "invalid_action",
				itemId: "test-item",
			})

			// Should not crash, state should remain unchanged
			expect(counter.event.viewState).toBe("item")
		})
	})

	describe("Collection Rotation Edge Cases", () => {
		it("should handle single item collections", () => {
			counter.event.imageCollection = ["/single.png"]
			counter.event.imageMode = "collection"
			;(counter as any).selectRandomFromCollection()

			expect(counter.event.selectedImage).toBe("/single.png")
			expect(counter.event.collectionCurrentIndex).toBe(0)
		})

		it("should handle collection rotation with custom intervals", () => {
			counter.event.imageCollection = ["/img1.png", "/img2.png"]
			counter.event.collectionInterval = 120 // 2 minutes
			;(counter as any).startCollectionRotation()

			expect((counter as any).collectionTimer).not.toBeNull()
		})
	})
})
