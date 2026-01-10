import { describe, expect, it } from "vitest"
import {
  convertToTimezoneOffsettedString,
  dateRangeFormatter,
  generateUserFriendlyDateString,
  parseFrontmatterDate,
  parseLocalDate,
} from "./datetime"

describe("convertToTimezoneOffsettedString", () => {
  it("should convert a date string to a timezone-offsetted string with the default timezone", () => {
    const dateString = "2025-03-30"
    const result = convertToTimezoneOffsettedString(dateString)
    expect(result).toBe("2025-03-30T00:00:00.000-04:00")
  })

  it("should convert a date string to a timezone-offsetted string with a specific timezone", () => {
    const dateString = "2025-03-30"
    const timezone = "America/Los_Angeles"
    const result = convertToTimezoneOffsettedString(dateString, timezone)
    expect(result).toBe("2025-03-29T21:00:00.000-07:00")
  })

  it("should handle different date strings correctly", () => {
    const dateString = "2024-01-01"
    const result = convertToTimezoneOffsettedString(dateString)
    expect(result).toBe("2024-01-01T00:00:00.000-05:00")
  })

  it("should handle date strings without time correctly in the default timezone", () => {
    const dateString = "2025-12-06"
    const result = convertToTimezoneOffsettedString(dateString)
    expect(result).toBe("2025-12-06T00:00:00.000-05:00")
  })

  it("should convert a date string to a timezone-offsetted string with the default timezone", () => {
    const dateString = "2025-03-30"
    const result = convertToTimezoneOffsettedString(dateString)
    expect(result).toBe("2025-03-30T00:00:00.000-04:00")
  })

  it("should convert a date string to a timezone-offsetted string with a specific timezone", () => {
    const dateString = "2025-03-30"
    const timezone = "America/Los_Angeles"
    const result = convertToTimezoneOffsettedString(dateString, timezone)
    expect(result).toBe("2025-03-29T21:00:00.000-07:00")
  })

  it("should handle different date strings correctly", () => {
    const dateString = "2024-01-01"
    const result = convertToTimezoneOffsettedString(dateString)
    expect(result).toBe("2024-01-01T00:00:00.000-05:00")
  })

  it("should handle invalid date strings gracefully", () => {
    const dateString = "invalid-date"
    const result = convertToTimezoneOffsettedString(dateString)
    expect(result).toBe("Invalid date")
  })

  it("should handle date strings with time correctly in the default timezone", () => {
    const dateString = "2025-03-06 08:00:00"
    const result = convertToTimezoneOffsettedString(dateString)
    expect(result).toBe("2025-03-06T08:00:00.000-05:00")
  })

  it("should handle date strings with time correctly in a specific timezone", () => {
    const dateString = "2025-03-06 08:00:00"
    const timezone = "Europe/London"
    const result = convertToTimezoneOffsettedString(dateString, timezone)
    expect(result).toBe("2025-03-06T13:00:00.000Z")
  })

  // 2025-06-21 08:00:00 should get converted to 2025-06-21T08:00:00.000-04:00
  it("should handle date strings with time correctly in the summer", () => {
    const dateString = "2025-06-21 08:00:00"
    const result = convertToTimezoneOffsettedString(dateString)
    expect(result).toBe("2025-06-21T08:00:00.000-04:00")
  })

  it("should handle leap year dates correctly", () => {
    const dateString = "2024-02-29"
    const result = convertToTimezoneOffsettedString(dateString)
    expect(result).toBe("2024-02-29T00:00:00.000-05:00")
  })

  it("should handle daylight saving time transitions correctly", () => {
    const dateString = "2025-03-09" // DST starts in the US
    const result = convertToTimezoneOffsettedString(dateString)
    expect(result).toBe("2025-03-09T00:00:00.000-05:00")
  })
  // handle case where timezone diff is 4 hrs between EDT and UTC
  it("should handle timezone differences correctly", () => {
    const dateString = "2025-04-13"
    const timezone = "America/New_York" // EDT
    const result = convertToTimezoneOffsettedString(dateString, timezone)
    expect(result).toBe("2025-04-13T00:00:00.000-04:00")
  })

  it("should handle dates in the future correctly", () => {
    const dateString = "2055-12-25"
    const result = convertToTimezoneOffsettedString(dateString)
    expect(result).toBe("2055-12-25T00:00:00.000-05:00")
  })
})

describe("generateUserFriendlyDateString", () => {
  it("should format a future date string with midnight time as a user-friendly date", () => {
    const dateString = "2055-12-25T00:00:00.000-05:00"
    const result = generateUserFriendlyDateString(dateString)
    expect(result).toBe("Dec 25, 2055")
  })

  it("should format a date string with time as a user-friendly date and time", () => {
    const dateString = "2025-03-06T13:00:00.000-05:00"
    const result = generateUserFriendlyDateString(dateString)
    expect(result).toBe("Mar 6, 2025 1:00 PM")
  })

  it("should format a date string with time as a user-friendly date and time in UTC", () => {
    const dateString = "2025-03-06T13:00:00.000Z"
    const result = generateUserFriendlyDateString(dateString)
    expect(result).toBe("Mar 6, 2025 8:00 AM")
  })

  it("should handle invalid date strings gracefully", () => {
    const dateString = "invalid-date"
    expect(() => generateUserFriendlyDateString(dateString)).toThrow()
  })

  it("should format a datetime string with offset as a user-friendly date", () => {
    const dateString = "2055-12-25T00:00:00.000-05:00"
    const result = generateUserFriendlyDateString(dateString)
    expect(result).toBe("Dec 25, 2055")
  })

  it("should format a datetime string with offset and time as a user-friendly date and time", () => {
    const dateString = "2055-12-25T15:30:00.000-05:00"
    const result = generateUserFriendlyDateString(dateString)
    expect(result).toBe("Dec 25, 2055 3:30 PM")
  })

  it("should handle invalid datetime strings gracefully", () => {
    const dateString = "invalid-datetime"
    expect(() => generateUserFriendlyDateString(dateString)).toThrow()
  })
})

describe("parseLocalDate", () => {
  it("should parse a valid date string and return ISO and user-friendly formats", () => {
    const result = parseLocalDate("2025-04-14")
    expect(result.dateTimeISO).toBe("2025-04-14T00:00:00.000-04:00")
    expect(result.dateTimeUserFriendly).toBe("Apr 14, 2025")
  })

  it("should handle invalid date strings gracefully", () => {
    expect(() => parseLocalDate("invalid-date")).toThrow()
  })
})

describe("parseFrontmatterDate", () => {
  it("should parse a valid date string and return a Date object", () => {
    const result = parseFrontmatterDate("2025-04-14")
    expect(result).toEqual(new Date("2025-04-14T00:00:00"))
  })

  it("should return null for invalid date strings", () => {
    const result = parseFrontmatterDate("invalid-date")
    expect(result).toBeNull()
  })
})

describe("dateRangeFormatter", () => {
  it("should format a single date without an end date correctly", () => {
    const result = dateRangeFormatter("2025-04-10T14:30:00.000-04:00")
    expect(result).toBe("Apr 10, 2025, 2:30 PM")
  })

  it("should format a date range on the same day correctly", () => {
    const result = dateRangeFormatter("2025-04-10T14:30:00.000-04:00", "2025-04-10T16:30:00.000-04:00")
    expect(result).toBe("Apr 10, 2025, 2:30 PM - 4:30 PM")
  })

  it("should format a date range across different months correctly", () => {
    const result = dateRangeFormatter("2025-04-10T14:30:00.000-04:00", "2025-05-10T16:30:00.000-04:00")
    expect(result).toBe("Apr 10 - May 10, 2025, 2:30 PM")
  })

  it("should format a date range across different years correctly", () => {
    const result = dateRangeFormatter("2024-12-31T14:30:00.000-05:00", "2025-01-01T16:30:00.000-05:00")
    expect(result).toBe("Dec 31, 2024, 2:30 PM - Jan 1, 2025, 4:30 PM")
  })

  it("should throw an error for invalid start date", () => {
    expect(() => dateRangeFormatter("invalid-date")).toThrow()
  })

  it("should throw an error for invalid end date", () => {
    expect(() => dateRangeFormatter("2025-04-10T14:30:00.000-04:00", "invalid-date")).toThrow()
  })
})
