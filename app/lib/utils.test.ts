import { describe, expect, it } from "vitest"
import { dateRangeFormatter } from "./utils"

describe("dateRangeFormatter", () => {
	it("formats a single date without an end date correctly", () => {
		const result = dateRangeFormatter("2025-04-10 14:30:00")
		expect(result).toBe("Apr 10, 2025, 2:30 PM")
	})

	it("formats a date range on the same day correctly", () => {
		const result = dateRangeFormatter("2025-04-10 14:30:00", "2025-04-10 16:30:00")
		expect(result).toBe("Apr 10, 2025, 2:30 PM - 4:30 PM")
	})

	it("formats a date range in the same month correctly", () => {
		const result = dateRangeFormatter("2025-04-10 14:30:00", "2025-04-15 16:30:00")
		expect(result).toBe("Apr 10-15, 2025, 2:30 PM")
	})

	it("formats a date range in the same year but different months correctly", () => {
		const result = dateRangeFormatter("2025-04-10 14:30:00", "2025-05-10 16:30:00")
		expect(result).toBe("Apr 10 - May 10, 2025, 2:30 PM")
	})

	it("formats a date range across different years correctly", () => {
		const result = dateRangeFormatter("2024-12-31 14:30:00", "2025-01-01 16:30:00")
		expect(result).toBe("Dec 31, 2024, 2:30 PM - Jan 1, 2025, 4:30 PM")
	})

	it("throws an error for invalid start date", () => {
		expect(() => dateRangeFormatter("invalid-date")).toThrow()
	})

	it("throws an error for invalid end date", () => {
		expect(() => dateRangeFormatter("2025-04-10 14:30:00", "invalid-date")).toThrow()
	})
})
