import { TZDate } from "@date-fns/tz"
import { format, parseISO } from "date-fns"

const DEFAULT_TIMEZONE = "America/New_York"

/**
 * Converts a date string to a timezone-offsetted string.
 * This function takes a date string in the format 'YYYY-MM-DD' or 'YYYY-MM-DD HH:mm:ss' and converts it to a string
 * @param dateString - The date string to convert, e.g., '2025-03-30'
 * @param timezone - The timezone to use for conversion, defaults to 'America/New_York'
 * @returns A string representing the date in the specified timezone with offset
 */
export function convertToTimezoneOffsettedString(dateString: string, timezone: string = DEFAULT_TIMEZONE): string {
	try {
		const zonedDate = new TZDate(parseISO(dateString), timezone) // Parse ISO date and apply timezone
		return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX") // Format with timezone offset
	} catch (error) {
		// Only log in non-test environments to avoid stderr noise during testing
		if (!import.meta.env?.VITEST) {
			console.error("error with convertToTimezoneOffsettedString", error)
		}
		return "Invalid date" // Handle invalid date strings gracefully
	}
}

/**
 * Formats a given date string into a user-friendly format. If the time is exactly midnight, it formats the date as MMM d, yyyy (e.g., "Apr 14, 2025"). Otherwise, it includes the time in the format MMM d, yyyy h:mm a (e.g., "Apr 14, 2025 3:00 PM").
 * @param dateString - The date string to convert, e.g., '2025-04-14'
 * @returns A user-friendly formatted date string
 */
export function generateUserFriendlyDateString(isoWithDateTimeOffsetString: string) {
	// Format the TZDate object into an ISO 8601 string with the correct UTC offset
	const dt = new Date(isoWithDateTimeOffsetString)

	// Check if it's exactly midnight
	const isMidnight = dt.getHours() === 0 && dt.getMinutes() === 0

	// Build a friendly string
	const dateTimeUserFriendly = isMidnight ? format(dt, "MMM d, yyyy") : format(dt, "MMM d, yyyy h:mm a")

	return dateTimeUserFriendly
}

export function parseLocalDate(
	dateStr: string,
	timeZone = "America/New_York"
): { dateStr: string; dateTimeISO: string; dateTimeUserFriendly: string } {
	const dateTimeISO = convertToTimezoneOffsettedString(dateStr, timeZone)
	const dateTimeUserFriendly = generateUserFriendlyDateString(dateTimeISO)

	return {
		dateStr,
		dateTimeISO,
		dateTimeUserFriendly,
	}
}

/**
 * Parses a date string and returns a Date object or null.
 * @param rawDate - The raw date string to parse.
 * @returns A Date object if parsing is successful, otherwise null.
 */

export function parseFrontmatterDate(rawDate: unknown): Date | null {
	if (typeof rawDate === "object" && rawDate instanceof Date) {
		return rawDate
	}
	if (typeof rawDate !== "string") return null

	const trimmed = rawDate.trim()

	// Match just the date
	if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
		return new Date(`${trimmed}T00:00:00`)
	}

	// Match date with time
	if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(trimmed)) {
		// biome-ignore lint/style/useTemplate: <explanation>
		const isoLike = trimmed.replace(" ", "T") + ":00"
		return new Date(isoLike)
	}

	// Optional: fallback to native parsing
	const fallback = new Date(trimmed)
	return Number.isNaN(fallback.getTime()) ? null : fallback
}
/**
 * Formats a date range based on start and optional end date strings.
 * @param startDateString - The start date string to format.
 * @param endDateString - The optional end date string to format.
 * @returns A formatted string representing the date range.
 */

export function dateRangeFormatter(startDateISO: string, endDateISO?: string): string {
	const startDate = new Date(startDateISO)
	const endDate = endDateISO ? new Date(endDateISO) : undefined

	const options = "MMM d, yyyy, h:mm a"
	if (!endDate) {
		const startHour = startDate.getHours()

		if (startHour === 0) {
			return format(startDate, "MMM d, yyyy")
		}

		return format(startDate, options)
	}

	const sameYear = startDate.getFullYear() === endDate.getFullYear()
	const sameMonth = sameYear && startDate.getMonth() === endDate.getMonth()
	const sameDay = sameMonth && startDate.getDate() === endDate.getDate()

	if (sameDay) {
		// e.g., Apr 1, 2025, 4:30 - 5:30 PM
		const month = format(startDate, "MMM d, yyyy")
		const startTime = format(startDate, "h:mm a")
		const endTime = format(endDate, "h:mm a")
		return `${month}, ${startTime} - ${endTime}`
	}

	if (sameMonth) {
		// e.g., Apr 1–5, 2025, 4:30 PM
		const month = format(startDate, "MMM")
		const year = startDate.getFullYear()
		const time = format(startDate, "h:mm a")
		return `${month} ${startDate.getDate()}-${endDate.getDate()}, ${year}, ${time}`
	}

	if (sameYear) {
		// e.g., Apr 1 – May 5, 2025, 4:30 PM
		const start = format(startDate, "MMM d")
		const end = format(endDate, "MMM d")
		const time = format(startDate, "h:mm a")
		return `${start} - ${end}, ${startDate.getFullYear()}, ${time}`
	}

	// e.g., Dec 31, 2024 – Jan 1, 2025, 4:30 PM
	const start = format(startDate, options)
	const end = format(endDate, options)
	return `${start} - ${end}`
}
