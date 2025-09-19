import { render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { CountdownDisplay } from "~/components/event-dashboard"

describe("CountdownDisplay", () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it("should display countdown timer for performing item", () => {
		const startTime = Date.now()
		const durationSeconds = 300 // 5 minutes
		vi.setSystemTime(startTime)

		render(
			<CountdownDisplay
				timerStart={startTime - 60000} // Started 1 minute ago
				durationSeconds={durationSeconds}
				now={startTime}
			/>
		)

		// Should show remaining time (4 minutes remaining)
		expect(screen.getByText("4:00")).toBeInTheDocument()
	})

	it("should show zero when time is up", () => {
		const startTime = Date.now()
		const durationSeconds = 300 // 5 minutes
		vi.setSystemTime(startTime)

		render(
			<CountdownDisplay
				timerStart={startTime - 360000} // Started 6 minutes ago (1 minute overtime)
				durationSeconds={durationSeconds}
				now={startTime}
			/>
		)

		// Should show zero when time is up (negative is clamped to 0)
		expect(screen.getByText("0:00")).toBeInTheDocument()
	})

	it("should format time correctly for short durations", () => {
		const startTime = Date.now()
		const durationSeconds = 90 // 1.5 minutes
		vi.setSystemTime(startTime)

		render(
			<CountdownDisplay
				timerStart={startTime - 30000} // Started 30 seconds ago
				durationSeconds={durationSeconds}
				now={startTime}
			/>
		)

		// Should show 1 minute remaining (1:00)
		expect(screen.getByText("1:00")).toBeInTheDocument()
	})

	it("should format seconds correctly", () => {
		const startTime = Date.now()
		const durationSeconds = 90 // 1.5 minutes
		vi.setSystemTime(startTime)

		render(
			<CountdownDisplay
				timerStart={startTime - 50000} // Started 50 seconds ago
				durationSeconds={durationSeconds}
				now={startTime}
			/>
		)

		// Should show 40 seconds remaining (0:40)
		expect(screen.getByText("0:40")).toBeInTheDocument()
	})

	it("should handle edge case with exact duration", () => {
		const startTime = Date.now()
		const durationSeconds = 60 // 1 minute
		vi.setSystemTime(startTime)

		render(
			<CountdownDisplay
				timerStart={startTime - 60000} // Started exactly 1 minute ago
				durationSeconds={durationSeconds}
				now={startTime}
			/>
		)

		// Should show zero when exactly at duration
		expect(screen.getByText("0:00")).toBeInTheDocument()
	})

	it("should apply correct styling classes", () => {
		const startTime = Date.now()
		const durationSeconds = 300

		const { container } = render(
			<CountdownDisplay timerStart={startTime - 60000} durationSeconds={durationSeconds} now={startTime} />
		)

		// Check that the component has the expected styling
		const displayDiv = container.firstChild as HTMLElement
		expect(displayDiv).toHaveClass("text-xs")
		expect(displayDiv).toHaveClass("text-right")
		expect(displayDiv).toHaveClass("mt-1")

		// Check that the time text has monospace font
		const timeSpan = container.querySelector("span")
		expect(timeSpan).toHaveClass("text-xs")
		expect(timeSpan).toHaveClass("font-mono")
	})
})
