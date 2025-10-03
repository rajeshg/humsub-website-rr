import { render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { CountdownHeader } from "./countdown-header"

// Mock the useTimeUntil hook
vi.mock("~/lib/timeuntil", () => ({
	useTimeUntil: vi.fn(),
}))

// Mock react-router Link component
vi.mock("react-router", () => ({
	Link: ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => (
		<a href={to} className={className}>
			{children}
		</a>
	),
}))

import { useTimeUntil } from "~/lib/timeuntil"

const mockUseTimeUntil = vi.mocked(useTimeUntil)

describe("CountdownHeader", () => {
	const eventDate = new Date("2025-10-20T18:00:00.000Z")

	afterEach(() => {
		vi.clearAllMocks()
	})

	describe("component visibility", () => {
		it("should hide when shouldHide is true", () => {
			mockUseTimeUntil.mockReturnValue({
				months: 0,
				days: 0,
				hours: 0,
				minutes: 0,
				isExpired: true,
				isEventDay: false,
				isEventHappening: false,
				shouldHide: true,
			})

			const { container } = render(<CountdownHeader eventDate={eventDate} />)
			expect(container.firstChild).toBeNull()
		})

		it("should render when shouldHide is false", () => {
			mockUseTimeUntil.mockReturnValue({
				months: 0,
				days: 2,
				hours: 5,
				minutes: 30,
				isExpired: false,
				isEventDay: false,
				isEventHappening: false,
				shouldHide: false,
			})

			render(<CountdownHeader eventDate={eventDate} />)
			expect(screen.getByText("Hum Sub Diwali 2025")).toBeInTheDocument()
		})
	})

	describe("countdown display", () => {
		it("should display countdown chips for normal countdown", () => {
			mockUseTimeUntil.mockReturnValue({
				months: 0,
				days: 2,
				hours: 5,
				minutes: 30,
				isExpired: false,
				isEventDay: false,
				isEventHappening: false,
				shouldHide: false,
			})

			render(<CountdownHeader eventDate={eventDate} />)

			expect(screen.getByText("2")).toBeInTheDocument()
			expect(screen.getByText("d")).toBeInTheDocument()
			expect(screen.getByText("5")).toBeInTheDocument()
			expect(screen.getByText("h")).toBeInTheDocument()
			expect(screen.getByText("30")).toBeInTheDocument()
			expect(screen.getByText("m")).toBeInTheDocument()
		})

		it("should only show non-zero time units", () => {
			mockUseTimeUntil.mockReturnValue({
				months: 0,
				days: 0,
				hours: 2,
				minutes: 15,
				isExpired: false,
				isEventDay: true,
				isEventHappening: false,
				shouldHide: false,
			})

			render(<CountdownHeader eventDate={eventDate} />)

			// Should show hours and minutes
			expect(screen.getByText("2")).toBeInTheDocument()
			expect(screen.getByText("h")).toBeInTheDocument()
			expect(screen.getByText("15")).toBeInTheDocument()
			expect(screen.getByText("m")).toBeInTheDocument()

			// Should not show days (0 value)
			expect(screen.queryByText("d")).not.toBeInTheDocument()
		})

		it('should show "Less than a minute" fallback when no active items and not happening', () => {
			mockUseTimeUntil.mockReturnValue({
				months: 0,
				days: 0,
				hours: 0,
				minutes: 0,
				isExpired: false,
				isEventDay: true,
				isEventHappening: false,
				shouldHide: false,
			})

			render(<CountdownHeader eventDate={eventDate} />)

			expect(screen.getByText("Less than a minute")).toBeInTheDocument()
		})

		it('should show "Happening Now!" when event is happening', () => {
			mockUseTimeUntil.mockReturnValue({
				months: 0,
				days: 0,
				hours: 0,
				minutes: 0,
				isExpired: true,
				isEventDay: true,
				isEventHappening: true,
				shouldHide: false,
			})

			render(<CountdownHeader eventDate={eventDate} />)

			expect(screen.getByText("🎉 Happening Now!")).toBeInTheDocument()
		})
	})

	describe("navigation links", () => {
		beforeEach(() => {
			mockUseTimeUntil.mockReturnValue({
				months: 0,
				days: 1,
				hours: 12,
				minutes: 0,
				isExpired: false,
				isEventDay: false,
				isEventHappening: false,
				shouldHide: false,
			})
		})

		it("should render event title link", () => {
			render(<CountdownHeader eventDate={eventDate} />)

			const eventLink = screen.getByRole("link", { name: "Hum Sub Diwali 2025" })
			expect(eventLink).toBeInTheDocument()
			expect(eventLink).toHaveAttribute("href", "/hum-sub-diwali-2025")
		})

		it("should render purchase link", () => {
			render(<CountdownHeader eventDate={eventDate} />)

			const purchaseLink = screen.getByRole("link", { name: "Purchase" })
			expect(purchaseLink).toBeInTheDocument()
			expect(purchaseLink).toHaveAttribute("href", "/membership/signup")
		})
	})

	describe("accessibility", () => {
		it("should have proper ARIA labels for countdown chips", () => {
			mockUseTimeUntil.mockReturnValue({
				months: 0,
				days: 1,
				hours: 2,
				minutes: 30,
				isExpired: false,
				isEventDay: false,
				isEventHappening: false,
				shouldHide: false,
			})

			render(<CountdownHeader eventDate={eventDate} />)

			// Check that chips have proper titles
			const dayChip = screen.getByText("1").closest("div")
			expect(dayChip).toHaveAttribute("title", "1 day")

			const hourChip = screen.getByText("2").closest("div")
			expect(hourChip).toHaveAttribute("title", "2 hours")

			const minuteChip = screen.getByText("30").closest("div")
			expect(minuteChip).toHaveAttribute("title", "30 minutes")
		})

		it("should have live region for screen readers", () => {
			mockUseTimeUntil.mockReturnValue({
				months: 0,
				days: 1,
				hours: 2,
				minutes: 30,
				isExpired: false,
				isEventDay: false,
				isEventHappening: false,
				shouldHide: false,
			})

			render(<CountdownHeader eventDate={eventDate} />)

			const liveRegion = screen.getByRole("status")
			expect(liveRegion).toHaveAttribute("aria-live", "polite")
			expect(liveRegion).toHaveTextContent("1 day, 2 hours, 30 minutes until HumSub Diwali")
		})

		it("should announce happening now in live region", () => {
			mockUseTimeUntil.mockReturnValue({
				months: 0,
				days: 0,
				hours: 0,
				minutes: 0,
				isExpired: true,
				isEventDay: true,
				isEventHappening: true,
				shouldHide: false,
			})

			render(<CountdownHeader eventDate={eventDate} />)

			const liveRegion = screen.getByRole("status")
			expect(liveRegion).toHaveTextContent("HumSub Diwali is happening now!")
		})

		it("should announce less than a minute in live region", () => {
			mockUseTimeUntil.mockReturnValue({
				months: 0,
				days: 0,
				hours: 0,
				minutes: 0,
				isExpired: false,
				isEventDay: true,
				isEventHappening: false,
				shouldHide: false,
			})

			render(<CountdownHeader eventDate={eventDate} />)

			const liveRegion = screen.getByRole("status")
			expect(liveRegion).toHaveTextContent("Less than a minute until HumSub Diwali")
		})
	})

	describe("responsive design classes", () => {
		beforeEach(() => {
			mockUseTimeUntil.mockReturnValue({
				months: 0,
				days: 1,
				hours: 12,
				minutes: 0,
				isExpired: false,
				isEventDay: false,
				isEventHappening: false,
				shouldHide: false,
			})
		})

		it("should have responsive layout classes", () => {
			render(<CountdownHeader eventDate={eventDate} />)

			// Check for responsive flex classes (two-line structure: column layout)
			const layoutContainer = screen.getByText("Hum Sub Diwali 2025").closest("div")?.parentElement
			expect(layoutContainer).toHaveClass("flex", "flex-col")
		})

		it("should have proper styling classes", () => {
			render(<CountdownHeader eventDate={eventDate} />)

			// Check main container has gradient background - need to go up more levels in DOM
			const titleElement = screen.getByText("Hum Sub Diwali 2025")
			const mainContainer = titleElement.closest("div")?.parentElement?.parentElement?.parentElement?.parentElement
			expect(mainContainer).toHaveClass("bg-gradient-to-r")
			expect(mainContainer).toHaveClass("from-orange-50")
		})
	})

	describe("edge cases", () => {
		it("should handle singular vs plural correctly", () => {
			mockUseTimeUntil.mockReturnValue({
				months: 0,
				days: 1,
				hours: 1,
				minutes: 1,
				isExpired: false,
				isEventDay: false,
				isEventHappening: false,
				shouldHide: false,
			})

			render(<CountdownHeader eventDate={eventDate} />)

			const liveRegion = screen.getByRole("status")
			expect(liveRegion).toHaveTextContent("1 day, 1 hour, 1 minute until HumSub Diwali")
		})

		it("should limit chips to 3 items", () => {
			mockUseTimeUntil.mockReturnValue({
				months: 2,
				days: 15,
				hours: 8,
				minutes: 45,
				isExpired: false,
				isEventDay: false,
				isEventHappening: false,
				shouldHide: false,
			})

			render(<CountdownHeader eventDate={eventDate} />)

			// Should show months, days, hours (first 3 active items)
			expect(screen.getByText("2")).toBeInTheDocument() // months
			expect(screen.getByText("15")).toBeInTheDocument() // days
			expect(screen.getByText("8")).toBeInTheDocument() // hours
			// Minutes should not be shown (limited to 3)
			expect(screen.queryByText("45")).not.toBeInTheDocument()
		})
	})
})
