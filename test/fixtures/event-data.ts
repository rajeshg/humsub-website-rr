import type { BreakItem, Item, PerformanceItem } from "../../app/counter"

export const mockPerformanceItem: PerformanceItem = {
  itemId: "perf-1",
  name: "Classical Dance Performance",
  state: "CHECKED IN",
  type: "PERFORMANCE",
  choreographers: "Jane Doe, John Smith",
  style: "Bharatanatyam",
  teamSize: 5,
  duration: "5 mins",
  durationSeconds: 300,
  timer_start_time: null,
  timer_end_time: null,
}

export const mockPerformingItem: PerformanceItem = {
  ...mockPerformanceItem,
  itemId: "perf-2",
  name: "Folk Dance Performance",
  state: "PERFORMING",
  timer_start_time: Date.now() - 60000, // Started 1 minute ago
}

export const mockReadyToGoItem: PerformanceItem = {
  ...mockPerformanceItem,
  itemId: "perf-3",
  name: "Next Performance",
  state: "READY TO GO",
}

export const mockBreakItem: BreakItem = {
  itemId: "break-1",
  name: "Intermission",
  state: "NONE",
  type: "BREAK",
  timer_start_time: null,
  timer_end_time: null,
}

export const mockDoneItem: PerformanceItem = {
  ...mockPerformanceItem,
  itemId: "perf-4",
  name: "Completed Performance",
  state: "DONE",
  timer_end_time: Date.now() - 300000, // Ended 5 minutes ago
}

export const mockItems: Item[] = [
  mockPerformanceItem,
  mockPerformingItem,
  mockReadyToGoItem,
  mockBreakItem,
  mockDoneItem,
]

export const mockEventState = {
  name: "Hum Sub Diwali 2025",
  items: mockItems,
}

// Helper function to create mock performance items
export const createMockPerformanceItem = (overrides: Partial<PerformanceItem> = {}): PerformanceItem => ({
  ...mockPerformanceItem,
  ...overrides,
})

// Helper function to create mock break items
export const createMockBreakItem = (overrides: Partial<BreakItem> = {}): BreakItem => ({
  ...mockBreakItem,
  ...overrides,
})
