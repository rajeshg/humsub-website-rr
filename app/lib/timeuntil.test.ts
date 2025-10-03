import { describe, expect, it } from "vitest"
import { timeUntil } from "./timeuntil"

describe("timeUntil", () => {
	const eventDate = new Date("2025-10-20T18:00:00.000Z") // 6:00 PM UTC event

	describe("before event scenarios", () => {
		it("should calculate correct time remaining for normal countdown", () => {
			const beforeEvent = new Date("2025-10-19T15:30:00.000Z") // 1 day, 2h 30m before
			const result = timeUntil(eventDate, beforeEvent)

			expect(result.isExpired).toBe(false)
			expect(result.isEventDay).toBe(false)
			expect(result.isEventHappening).toBe(false)
			expect(result.shouldHide).toBe(false)
			expect(result.days).toBe(1)
			expect(result.hours).toBe(2)
			expect(result.minutes).toBe(30)
		})

		it("should handle same day, hours before event", () => {
			// Use local dates to ensure same day comparison works correctly
			const eventLocal = new Date("2025-10-20 18:00:00") // 6:00 PM local time
			const sameDayLocal = new Date("2025-10-20 02:00:00") // 2:00 AM local time (16 hours before)
			const result = timeUntil(eventLocal, sameDayLocal)

			expect(result.isExpired).toBe(false)
			expect(result.isEventDay).toBe(true)
			expect(result.isEventHappening).toBe(false)
			expect(result.shouldHide).toBe(false)
			expect(result.hours).toBe(16)
			expect(result.minutes).toBe(0)
		})

		it("should handle minutes before event", () => {
			const eventLocal = new Date("2025-10-20 18:00:00")
			const minutesBefore = new Date("2025-10-20 17:54:30") // 5m 30s before
			const result = timeUntil(eventLocal, minutesBefore)

			expect(result.isExpired).toBe(false)
			expect(result.isEventDay).toBe(true)
			expect(result.isEventHappening).toBe(false)
			expect(result.shouldHide).toBe(false)
			expect(result.hours).toBe(0)
			expect(result.minutes).toBe(5)
		})

		it("should handle less than a minute before event", () => {
			const eventLocal = new Date("2025-10-20 18:00:00")
			const secondsBefore = new Date("2025-10-20 17:59:30") // 30 seconds before
			const result = timeUntil(eventLocal, secondsBefore)

			expect(result.isExpired).toBe(false)
			expect(result.isEventDay).toBe(true)
			expect(result.isEventHappening).toBe(false)
			expect(result.shouldHide).toBe(false)
			expect(result.hours).toBe(0)
			expect(result.minutes).toBe(0) // Should round down to 0 minutes
		})
	})

	describe("event time scenarios", () => {
		it("should detect event start exactly", () => {
			const eventLocal = new Date("2025-10-20 18:00:00")
			const eventStart = new Date("2025-10-20 18:00:00")
			const result = timeUntil(eventLocal, eventStart)

			expect(result.isExpired).toBe(true)
			expect(result.isEventDay).toBe(true)
			expect(result.isEventHappening).toBe(true)
			expect(result.shouldHide).toBe(false)
			expect(result.months).toBe(0)
			expect(result.days).toBe(0)
			expect(result.hours).toBe(0)
			expect(result.minutes).toBe(0)
		})

		it("should show happening now during event (same day)", () => {
			const eventLocal = new Date("2025-10-20 18:00:00")
			const duringEvent = new Date("2025-10-20 19:30:00") // 1.5 hours after start
			const result = timeUntil(eventLocal, duringEvent)

			expect(result.isExpired).toBe(true)
			expect(result.isEventDay).toBe(true)
			expect(result.isEventHappening).toBe(true)
			expect(result.shouldHide).toBe(false)
		})

		it("should show happening now late same day", () => {
			const eventLocal = new Date("2025-10-20 18:00:00")
			const lateSameDay = new Date("2025-10-20 23:59:59") // Just before midnight
			const result = timeUntil(eventLocal, lateSameDay)

			expect(result.isExpired).toBe(true)
			expect(result.isEventDay).toBe(true)
			expect(result.isEventHappening).toBe(true)
			expect(result.shouldHide).toBe(false)
		})
	})

	describe("after event scenarios", () => {
		it("should hide component day after event", () => {
			const eventLocal = new Date("2025-10-20 18:00:00")
			const dayAfter = new Date("2025-10-21 10:00:00")
			const result = timeUntil(eventLocal, dayAfter)

			expect(result.isExpired).toBe(true)
			expect(result.isEventDay).toBe(false)
			expect(result.isEventHappening).toBe(false)
			expect(result.shouldHide).toBe(true)
			expect(result.months).toBe(0)
			expect(result.days).toBe(0)
			expect(result.hours).toBe(0)
			expect(result.minutes).toBe(0)
		})

		it("should hide component weeks after event", () => {
			const eventLocal = new Date("2025-10-20 18:00:00")
			const weeksAfter = new Date("2025-11-05 12:00:00")
			const result = timeUntil(eventLocal, weeksAfter)

			expect(result.isExpired).toBe(true)
			expect(result.isEventDay).toBe(false)
			expect(result.isEventHappening).toBe(false)
			expect(result.shouldHide).toBe(true)
		})
	})

	describe("edge cases", () => {
		it("should handle timezone differences correctly", () => {
			// Test with different timezone representations but same moment
			const eventUTC = new Date("2025-10-20T18:00:00.000Z")
			const testTimeUTC = new Date("2025-10-20T17:30:00.000Z")

			const result = timeUntil(eventUTC, testTimeUTC)

			expect(result.isExpired).toBe(false)
			expect(result.minutes).toBe(30)
		})

		it("should handle leap year calculations", () => {
			const leapYearEvent = new Date("2024-02-29T12:00:00.000Z")
			const beforeLeapDay = new Date("2024-02-28T12:00:00.000Z")

			const result = timeUntil(leapYearEvent, beforeLeapDay)

			expect(result.isExpired).toBe(false)
			expect(result.days).toBe(1)
		})

		it("should handle month boundary correctly", () => {
			const nextMonthEvent = new Date("2025-11-01T00:00:00.000Z")
			const endOfMonth = new Date("2025-10-31T23:30:00.000Z")

			const result = timeUntil(nextMonthEvent, endOfMonth)

			expect(result.isExpired).toBe(false)
			expect(result.minutes).toBe(30)
		})
	})

	describe("state logic verification", () => {
		it("should never have isEventHappening true when not expired", () => {
			const beforeEvent = new Date("2025-10-20T17:00:00.000Z")
			const result = timeUntil(eventDate, beforeEvent)

			expect(result.isExpired).toBe(false)
			expect(result.isEventHappening).toBe(false)
		})

		it("should never have shouldHide true on event day", () => {
			const eventDay = new Date("2025-10-20T20:00:00.000Z")
			const result = timeUntil(eventDate, eventDay)

			expect(result.isEventDay).toBe(true)
			expect(result.shouldHide).toBe(false)
		})

		it("should have mutually exclusive isEventHappening and shouldHide", () => {
			const scenarios = [
				new Date("2025-10-19T12:00:00.000Z"), // before
				new Date("2025-10-20T12:00:00.000Z"), // same day, before
				new Date("2025-10-20T19:00:00.000Z"), // happening
				new Date("2025-10-21T12:00:00.000Z"), // after
			]

			for (const testTime of scenarios) {
				const result = timeUntil(eventDate, testTime)

				// These should never both be true
				expect(result.isEventHappening && result.shouldHide).toBe(false)
			}
		})
	})
})
