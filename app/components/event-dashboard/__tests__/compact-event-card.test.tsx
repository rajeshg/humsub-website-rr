import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { CompactEventCard } from "~/components/event-dashboard"
import type { BreakItem, PerformanceItem } from "~/counter"

// Create test data that matches the actual structure
const mockPerformanceItem: PerformanceItem = {
	itemId: "perf-1",
	name: "Bharatanatyam Dance",
	state: "CHECKED IN",
	type: "PERFORMANCE",
	choreographers: "Priya Sharma, Raj Patel",
	style: "Bharatanatyam",
	teamSize: 3,
	duration: "15 mins",
	durationSeconds: 900,
	timer_start_time: null,
	timer_end_time: null,
}

const mockBreakItem: BreakItem = {
	itemId: "break-1",
	name: "Intermission Break",
	state: "NONE",
	type: "BREAK",
	timer_start_time: null,
	timer_end_time: null,
}

describe("CompactEventCard", () => {
	it("should render performance item with all key information", () => {
		render(<CompactEventCard item={mockPerformanceItem} />)

		// Check that the performance name is displayed
		expect(screen.getByText("Bharatanatyam Dance")).toBeInTheDocument()

		// Check that choreographer info is displayed
		expect(screen.getByText(/Priya Sharma, Raj Patel/)).toBeInTheDocument()

		// Check that duration is displayed
		expect(screen.getByText(/15 mins/)).toBeInTheDocument()

		// Check that state badge is rendered
		expect(screen.getByText("Checked In")).toBeInTheDocument()
	})

	it("should render break item with correct information", () => {
		render(<CompactEventCard item={mockBreakItem} />)

		// Check that break title is displayed
		expect(screen.getByText("Intermission Break")).toBeInTheDocument()

		// Check that break badge is shown
		expect(screen.getByText("BREAK")).toBeInTheDocument()
	})

	it("should handle different performance states", () => {
		const performingItem = {
			...mockPerformanceItem,
			state: "PERFORMING" as const,
		}

		render(<CompactEventCard item={performingItem} />)

		// PERFORMING state shows as "On Stage"
		expect(screen.getByText("On Stage")).toBeInTheDocument()
	})

	it("should display choreographer information", () => {
		render(<CompactEventCard item={mockPerformanceItem} />)

		expect(screen.getByText("Priya Sharma, Raj Patel")).toBeInTheDocument()
	})

	it("should show performance style", () => {
		render(<CompactEventCard item={mockPerformanceItem} />)

		// Use getAllByText to handle multiple elements with same text
		const elements = screen.getAllByText(/Bharatanatyam/)
		expect(elements.length).toBeGreaterThan(0)
	})

	it("should handle edge cases gracefully", () => {
		const edgeCaseItem: PerformanceItem = {
			...mockPerformanceItem,
			name: "",
			choreographers: "",
			style: "",
			teamSize: 0,
		}

		const { container } = render(<CompactEventCard item={edgeCaseItem} />)

		// Component should still render without crashing
		expect(container.firstChild).toBeInTheDocument()
	})

	it("should apply correct styling classes based on item type", () => {
		const { container } = render(<CompactEventCard item={mockPerformanceItem} />)

		// Check that performance items have appropriate styling
		const card = container.firstChild as HTMLElement
		expect(card).toHaveClass("relative")
		expect(card).toHaveClass("py-2")
		expect(card).toHaveClass("w-full")
	})

	it("should be accessible", () => {
		render(<CompactEventCard item={mockPerformanceItem} />)

		// Check that all text content is accessible
		expect(screen.getByText("Bharatanatyam Dance")).toBeInTheDocument()
		expect(screen.getByText("Checked In")).toBeInTheDocument()
		expect(screen.getByText("15 mins")).toBeInTheDocument()
	})
})
