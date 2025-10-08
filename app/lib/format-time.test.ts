import { describe, expect, it } from "vitest"
import { formatTime } from "./format-time"

describe("formatTime", () => {
	it('formats 2:00:00 PM as "2 PM"', () => {
		// create a date at 14:00 local time
		const d = new Date()
		d.setHours(14, 0, 0, 0)
		const out = formatTime(d)
		expect(out).toBe("2 PM")
	})

	it('formats 10:20:00 AM as "10:20 AM"', () => {
		const d = new Date()
		d.setHours(10, 20, 0, 0)
		const out = formatTime(d)
		expect(out).toBe("10:20 AM")
	})

	it('parses time-only string "2:00:00 PM" -> "2 PM"', () => {
		const out = formatTime("2:00:00 PM")
		expect(out).toBe("2 PM")
	})

	it('parses time-only string "10:20:00 AM" -> "10:20 AM"', () => {
		const out = formatTime("10:20:00 AM")
		expect(out).toBe("10:20 AM")
	})
})
