import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { EventState, Item } from "../app/counter"

// Mock the viewstate management logic
class ViewStateManager {
	event: EventState

	constructor() {
		this.event = {
			name: "Test Event",
			startDate: null,
			endDate: null,
			items: [],
			viewState: "item",
			selectedItemId: null,
			selectedImage: null,
			imageMode: "single",
			imageCollection: [],
			collectionInterval: 30,
			collectionCurrentIndex: 0,
			collectionLastRotation: 0,
			activeTimers: [],
		}
	}

	// Mock filler images
	fillerImages = ["/assets/stage-timer/filler/diwali.png", "/assets/stage-timer/filler/holi.png"]
	upNextImage = "/assets/stage-timer/filler/diwali.png"

	updateViewState() {
		const hasActivePerformance = this.event.items.some(
			(item: Item) => item.state === "PERFORMING" || item.state === "READY TO GO"
		)

		if (hasActivePerformance) {
			this.event.viewState = "item"
			this.event.selectedItemId = this.getCurrentItemId()
			// Clear any selected image when switching to item view
			this.event.selectedImage = null
			this.event.imageMode = "single"
			this.event.imageCollection = []
		} else if (this.event.imageMode === "collection" && this.event.imageCollection.length > 0) {
			this.event.viewState = "image"
		} else if (this.event.selectedImage) {
			this.event.viewState = "image"
		} else {
			// Check if there are upcoming performances to show
			const nextItem = this.getNextUpcomingItem()
			if (nextItem) {
				// Show the next upcoming performance
				this.event.viewState = "item"
				this.event.selectedItemId = nextItem.itemId
			} else if (this.fillerImages.length > 0) {
				// Fallback to filler collection when no upcoming performances
				this.event.viewState = "image"
				this.event.imageMode = "collection"
				this.event.imageCollection = this.fillerImages
			} else {
				// No images available, stay in item view
				this.event.viewState = "item"
			}
		}
	}

	getNextUpcomingItem() {
		// Find the first upcoming item (BACKSTAGE, CHECKED IN, etc.)
		const upcomingStates = ["BACKSTAGE", "CHECKED IN", "NONE"]
		const nextItem = this.event.items.find((item: Item) => upcomingStates.includes(item.state))
		return nextItem || null
	}

	getCurrentItemId(): string | null {
		// First priority: PERFORMING items
		const performing = this.event.items.find((item: Item) => item.state === "PERFORMING")
		if (performing) return performing.itemId

		// Second priority: READY TO GO items
		const ready = this.event.items.find((item: Item) => item.state === "READY TO GO")
		if (ready) return ready.itemId

		return null
	}

	// Simulate Load button action
	loadItem(itemId: string) {
		const item = this.event.items.find((i: Item) => i.itemId === itemId)
		if (item) {
			item.state = "READY TO GO"
			this.updateViewState()
		}
	}

	// Simulate Start button action
	startItem(itemId: string) {
		const item = this.event.items.find((i: Item) => i.itemId === itemId)
		if (item) {
			// Mark other performing items as done
			for (const other of this.event.items) {
				if (other.itemId !== itemId && other.state === "PERFORMING") {
					other.state = "DONE"
				}
			}

			item.state = "PERFORMING"
			item.timer_start_time = Date.now()
			this.updateViewState()
		}
	}

	// Simulate item completion
	completeItem(itemId: string) {
		const item = this.event.items.find((i: Item) => i.itemId === itemId)
		if (item) {
			item.state = "DONE"
			this.updateViewState()
		}
	}

	// Simulate image selection
	selectImage(imagePath: string) {
		this.event.viewState = "image"
		this.event.imageMode = "single"
		this.event.selectedImage = imagePath
		this.updateViewState()
	}

	// Simulate image collection selection
	selectImageCollection(imagePaths: string[], interval = 30) {
		this.event.viewState = "image"
		this.event.imageMode = "collection"
		this.event.imageCollection = imagePaths
		this.event.collectionInterval = interval
		this.updateViewState()
	}

	// Add test item
	addItem(item: unknown) {
		this.event.items.push(item as Item)
	}

	// Clear image selection
	clearImageSelection() {
		this.event.selectedImage = null
		this.event.imageCollection = []
		this.event.imageMode = "single"
		// Force view state to item when clearing selection
		this.event.viewState = "item"
	}
}

describe("ViewState Management Tests", () => {
	let manager: ViewStateManager

	beforeEach(() => {
		manager = new ViewStateManager()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	describe("Load Button ViewState Test", () => {
		it("should set viewstate to 'item' mode when Load button transitions item to READY TO GO", () => {
			// Setup: Add a performance item in BACKSTAGE state
			const testItem = {
				itemId: "test-item-1",
				name: "Test Performance",
				type: "PERFORMANCE" as const,
				state: "BACKSTAGE" as const,
				timer_start_time: null,
			}
			manager.addItem(testItem as Item)

			// Simulate Load button action
			manager.loadItem("test-item-1")

			expect(manager.event.viewState).toBe("item")
			expect(manager.event.selectedItemId).toBe("test-item-1")
			expect(testItem.state).toBe("READY TO GO")
		})

		it("should handle Load button with multiple items - selects first active item", () => {
			const item1 = {
				itemId: "item-1",
				name: "Performance 1",
				type: "PERFORMANCE",
				state: "BACKSTAGE",
				timer_start_time: null,
			}
			const item2 = {
				itemId: "item-2",
				name: "Performance 2",
				type: "PERFORMANCE",
				state: "READY TO GO",
				timer_start_time: null,
			}
			manager.addItem(item1 as Item)
			manager.addItem(item2 as Item)

			manager.loadItem("item-1")

			expect(manager.event.viewState).toBe("item")
			expect(manager.event.selectedItemId).toBe("item-1") // Selects the first READY TO GO item (item-1 after loading)
		})
	})

	describe("Start Button ViewState Test", () => {
		it("should set viewstate to 'item' mode when Start button transitions item to PERFORMING", () => {
			const testItem = {
				itemId: "test-item-1",
				name: "Test Performance",
				type: "PERFORMANCE",
				state: "READY TO GO",
				timer_start_time: null,
			}
			manager.addItem(testItem)

			manager.startItem("test-item-1")

			expect(manager.event.viewState).toBe("item")
			expect(manager.event.selectedItemId).toBe("test-item-1")
			expect(testItem.state).toBe("PERFORMING")
			expect(testItem.timer_start_time).toBeGreaterThan(0)
		})

		it("should handle Start button when another item is already performing", () => {
			const item1 = {
				itemId: "item-1",
				name: "Performance 1",
				type: "PERFORMANCE",
				state: "PERFORMING",
				timer_start_time: Date.now() - 10000,
			}
			const item2 = {
				itemId: "item-2",
				name: "Performance 2",
				type: "PERFORMANCE",
				state: "READY TO GO",
				timer_start_time: null,
			}
			manager.addItem(item1)
			manager.addItem(item2)

			manager.startItem("item-2")

			expect(manager.event.viewState).toBe("item")
			expect(manager.event.selectedItemId).toBe("item-2") // Selects the newly PERFORMING item
			expect(item1.state).toBe("DONE") // Previous item marked as done
			expect(item2.state).toBe("PERFORMING")
		})
	})

	describe("No Active Performance ViewState Test", () => {
		it("should automatically switch to 'image' mode when no performances are active", () => {
			const testItem = {
				itemId: "item-1",
				name: "Performance 1",
				type: "PERFORMANCE",
				state: "DONE",
			}
			manager.addItem(testItem)

			manager.updateViewState()

			expect(manager.event.viewState).toBe("image")
			expect(manager.event.imageMode).toBe("collection")
			expect(manager.event.imageCollection).toEqual([
				"/assets/stage-timer/filler/diwali.png",
				"/assets/stage-timer/filler/holi.png",
			])
		})

		it("should show next upcoming performance when there are upcoming items", () => {
			// Create a completed performance and an upcoming one
			const completedItem = {
				itemId: "completed-1",
				name: "Completed Performance",
				type: "PERFORMANCE",
				state: "DONE",
			}
			const upcomingItem = {
				itemId: "upcoming-1",
				name: "Upcoming Performance",
				type: "PERFORMANCE",
				state: "BACKSTAGE",
			}
			manager.addItem(completedItem)
			manager.addItem(upcomingItem)

			// Update view state - should show the upcoming performance
			manager.updateViewState()

			expect(manager.event.viewState).toBe("item")
			expect(manager.event.selectedItemId).toBe("upcoming-1")
		})

		it("should switch to image mode immediately when last performing item completes", () => {
			const testItem = {
				itemId: "item-1",
				name: "Performance 1",
				type: "PERFORMANCE",
				state: "PERFORMING",
				timer_start_time: Date.now() - 10000,
			}
			manager.addItem(testItem)

			manager.completeItem("item-1")

			expect(manager.event.viewState).toBe("image")
			expect(manager.event.selectedItemId).toBe(null)
		})
	})

	describe("Image Selection Integration Test", () => {
		it("should handle single image selection", () => {
			const testImage = "/test/image.png"

			manager.selectImage(testImage)

			expect(manager.event.viewState).toBe("image")
			expect(manager.event.imageMode).toBe("single")
			expect(manager.event.selectedImage).toBe(testImage)
		})

		it("should handle image collection selection", () => {
			const imagePaths = ["/img1.png", "/img2.png"]

			manager.selectImageCollection(imagePaths, 45)

			expect(manager.event.viewState).toBe("image")
			expect(manager.event.imageMode).toBe("collection")
			expect(manager.event.imageCollection).toEqual(imagePaths)
			expect(manager.event.collectionInterval).toBe(45)
		})
	})

	describe("ViewState Priority Test", () => {
		it("should prioritize active performances over image selections", () => {
			// Set up image selection first
			manager.selectImage("/test/image.png")
			expect(manager.event.viewState).toBe("image")

			// Add and start a performance
			const testItem = {
				itemId: "item-1",
				name: "Performance 1",
				type: "PERFORMANCE",
				state: "READY TO GO",
				timer_start_time: null,
			}
			manager.addItem(testItem)
			manager.startItem("item-1")

			expect(manager.event.viewState).toBe("item")
			expect(manager.event.selectedItemId).toBe("item-1")
			expect(manager.event.selectedImage).toBe(null)
		})

		it("should switch back to image mode when performance completes", () => {
			// Start with a performing item
			const testItem = {
				itemId: "item-1",
				name: "Performance 1",
				type: "PERFORMANCE",
				state: "PERFORMING",
				timer_start_time: Date.now() - 10000,
			}
			manager.addItem(testItem)
			expect(manager.event.viewState).toBe("item")

			// Complete the performance
			manager.completeItem("item-1")

			expect(manager.event.viewState).toBe("image")
			expect(manager.event.selectedItemId).toBe(null)
		})

		it("should switch from filler image to performance when Load button is clicked", () => {
			// Start with filler images being shown (no active performances)
			manager.updateViewState()
			expect(manager.event.viewState).toBe("image")
			expect(manager.event.imageMode).toBe("collection")

			// Add a performance item and load it
			const testItem = {
				itemId: "item-1",
				name: "Performance 1",
				type: "PERFORMANCE",
				state: "BACKSTAGE",
				timer_start_time: null,
			}
			manager.addItem(testItem)

			// Click Load button - should switch from filler image to performance
			manager.loadItem("item-1")

			expect(manager.event.viewState).toBe("item")
			expect(manager.event.selectedItemId).toBe("item-1")
			expect(manager.event.selectedImage).toBe(null)
			expect(manager.event.imageMode).toBe("single")
			expect(manager.event.imageCollection).toEqual([])
		})

		it("should switch from filler image to performance when Start button is clicked", () => {
			// Start with filler images being shown
			manager.updateViewState()
			expect(manager.event.viewState).toBe("image")
			expect(manager.event.imageMode).toBe("collection")

			// Add a performance item in READY TO GO state
			const testItem = {
				itemId: "item-1",
				name: "Performance 1",
				type: "PERFORMANCE",
				state: "READY TO GO",
				timer_start_time: null,
			}
			manager.addItem(testItem)

			// Click Start button - should switch from filler image to performance
			manager.startItem("item-1")

			expect(manager.event.viewState).toBe("item")
			expect(manager.event.selectedItemId).toBe("item-1")
			expect(manager.event.selectedImage).toBe(null)
			expect(manager.event.imageMode).toBe("single")
			expect(manager.event.imageCollection).toEqual([])
			expect(testItem.state).toBe("PERFORMING")
			expect(testItem.timer_start_time).toBeGreaterThan(0)
		})

		it("should switch from selected image to performance when Load button is clicked", () => {
			// Start with a selected image
			manager.selectImage("/selected/image.png")
			expect(manager.event.viewState).toBe("image")
			expect(manager.event.selectedImage).toBe("/selected/image.png")

			// Add a performance item and load it
			const testItem = {
				itemId: "item-1",
				name: "Performance 1",
				type: "PERFORMANCE",
				state: "BACKSTAGE",
				timer_start_time: null,
			}
			manager.addItem(testItem)

			// Click Load button - should switch from selected image to performance
			manager.loadItem("item-1")

			expect(manager.event.viewState).toBe("item")
			expect(manager.event.selectedItemId).toBe("item-1")
			expect(manager.event.selectedImage).toBe(null)
			expect(manager.event.imageMode).toBe("single")
			expect(manager.event.imageCollection).toEqual([])
		})
	})

	describe("Edge Cases and Error Handling", () => {
		it("should handle invalid item IDs gracefully", () => {
			manager.loadItem("non-existent-item")

			// Viewstate should remain unchanged
			expect(manager.event.viewState).toBe("item")
		})

		it("should handle empty item list", () => {
			manager.updateViewState()

			expect(manager.event.viewState).toBe("image")
			expect(manager.event.imageMode).toBe("collection")
		})

		it("should handle items with invalid states", () => {
			const testItem = {
				itemId: "item-1",
				name: "Performance 1",
				type: "PERFORMANCE",
				state: "INVALID_STATE",
			}
			manager.addItem(testItem)

			manager.updateViewState()

			// Should not crash, should fall back to image mode
			expect(manager.event.viewState).toBe("image")
		})
	})

	describe("Image Selection Integration", () => {
		it("should switch to image view when selectImage is called", () => {
			const imagePath = "/assets/stage-timer/filler/test-image.jpg"

			// Initially should be in item view
			expect(manager.event.viewState).toBe("item")

			// Simulate image selection
			manager.selectImage(imagePath)

			expect(manager.event.viewState).toBe("image")
			expect(manager.event.imageMode).toBe("single")
			expect(manager.event.selectedImage).toBe(imagePath)
			expect(manager.event.imageCollection).toEqual([])
		})

		it("should clear image selection when clearImageSelection is called", () => {
			// First select an image
			const imagePath = "/assets/stage-timer/filler/test-image.jpg"
			manager.selectImage(imagePath)

			expect(manager.event.viewState).toBe("image")
			expect(manager.event.selectedImage).toBe(imagePath)

			// Then clear the selection
			manager.clearImageSelection()

			expect(manager.event.selectedImage).toBe(null)
			expect(manager.event.imageCollection).toEqual([])
			// Should fall back to item view since no active performances
			expect(manager.event.viewState).toBe("item")
		})

		it("should handle image collection selection", () => {
			const imagePaths = ["/assets/stage-timer/filler/image1.jpg", "/assets/stage-timer/filler/image2.jpg"]

			manager.selectImageCollection(imagePaths, 45)

			expect(manager.event.viewState).toBe("image")
			expect(manager.event.imageMode).toBe("collection")
			expect(manager.event.imageCollection).toEqual(imagePaths)
			expect(manager.event.collectionInterval).toBe(45)
		})

		it("should switch to item view when clearing selection with active performance", () => {
			// Add an active performance
			const performanceItem = {
				itemId: "perf-1",
				name: "Test Performance",
				type: "PERFORMANCE",
				state: "PERFORMING",
				timer_start_time: Date.now(),
				timer_end_time: null,
				durationSeconds: 300,
			}
			manager.addItem(performanceItem)

			// Select an image
			const imagePath = "/assets/stage-timer/filler/test-image.jpg"
			manager.selectImage(imagePath)

			// When there's an active performance, selecting an image should still switch to item view
			expect(manager.event.viewState).toBe("item")
			expect(manager.event.selectedItemId).toBe("perf-1")
		})

		it("should show next upcoming item when no current performance is active", () => {
			// Add items in different states
			const upcomingItem = {
				itemId: "upcoming-1",
				name: "Upcoming Performance",
				type: "PERFORMANCE",
				state: "BACKSTAGE",
			}
			const laterItem = {
				itemId: "later-1",
				name: "Later Performance",
				type: "PERFORMANCE",
				state: "CHECKED IN",
			}

			manager.addItem(upcomingItem)
			manager.addItem(laterItem)

			// Update view state to reflect the new items
			manager.updateViewState()

			// No current item should be active, but should show next upcoming
			expect(manager.event.viewState).toBe("item")
			expect(manager.event.selectedItemId).toBe("upcoming-1") // Should select the first upcoming item

			// Verify the next upcoming item logic
			const nextItem = manager.getNextUpcomingItem()
			expect(nextItem?.name).toBe("Upcoming Performance")
		})

		it("should handle no upcoming items gracefully", () => {
			// Clear filler images for this test
			manager.fillerImages = []

			// Add only DONE items
			const doneItem = {
				itemId: "done-1",
				name: "Completed Performance",
				type: "PERFORMANCE",
				state: "DONE",
			}
			manager.addItem(doneItem)

			// Update view state to reflect the new items
			manager.updateViewState()

			// Should stay in item view but with no selected item
			expect(manager.event.viewState).toBe("item")
			expect(manager.event.selectedItemId).toBe(null)

			// No upcoming items should be found
			const nextItem = manager.getNextUpcomingItem()
			expect(nextItem).toBe(null)
		})
	})
})
