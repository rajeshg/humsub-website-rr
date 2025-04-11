import type { ClassValue } from "clsx"

import { clsx } from "clsx"
import { format, fromZonedTime } from "date-fns-tz"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function toISODateStringFromLocalEasternDateString(dateStr: string): string {
	const timeZone = "America/New_York"
	// Ensure there's a time component
	const normalized = dateStr.includes(" ") ? dateStr : `${dateStr} 00:00:00`
	// Convert to UTC - parse the string into a Date object first
	const dateObj = new Date(normalized)
	try {
		const utcDate = fromZonedTime(dateObj, timeZone)
		// Return ISO string
		return utcDate.toISOString()
	} catch (error) {
		console.error("Error converting date string to ISO:", dateStr, error)
		return dateStr
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

export function formatDateISOToUserFriendly(isoDateString: string): string {
	const date = new Date(isoDateString)
	if (Number.isNaN(date.getTime())) {
		console.error("Invalid ISO date string:", isoDateString)
		return "Invalid date"
	}
	const etTimeZone = "America/New_York" // North Carolina is in Eastern Time
	let formatted = format(date, "MMM d, yyyy, h:mm a", { timeZone: etTimeZone })

	// If the time is midnight, only show the date
	if (date.getUTCHours() === 0 && date.getUTCMinutes() === 0) {
		return format(date, "MMM d, yyyy", { timeZone: etTimeZone })
	}
	formatted = formatted.replace(/, 12:00 AM/, "") // Remove the time if it's midnight
	return formatted
}

/**
 * Formats a date range based on start and optional end date strings.
 * @param startDateString - The start date string to format.
 * @param endDateString - The optional end date string to format.
 * @returns A formatted string representing the date range.
 */
export function dateRangeFormatter(startDateString: string, endDateString?: string): string {
	const nyTimeZone = "America/New_York"
	const startDate = fromZonedTime(startDateString, nyTimeZone)
	const endDate = endDateString ? fromZonedTime(endDateString, nyTimeZone) : undefined

	const options = "MMM d, yyyy, h:mm a"
	if (!endDate) {
		const startHour = startDate.getHours()

		if (startHour === 0) {
			return format(startDate, "MMM d, yyyy", { timeZone: nyTimeZone })
		}

		return format(startDate, options, { timeZone: nyTimeZone })
	}

	const sameYear = startDate.getFullYear() === endDate.getFullYear()
	const sameMonth = sameYear && startDate.getMonth() === endDate.getMonth()
	const sameDay = sameMonth && startDate.getDate() === endDate.getDate()

	if (sameDay) {
		// e.g., Apr 1, 2025, 4:30 - 5:30 PM
		const month = format(startDate, "MMM d, yyyy", { timeZone: nyTimeZone })
		const startTime = format(startDate, "h:mm a", { timeZone: nyTimeZone })
		const endTime = format(endDate, "h:mm a", { timeZone: nyTimeZone })
		return `${month}, ${startTime} - ${endTime}`
	}

	if (sameMonth) {
		// e.g., Apr 1–5, 2025, 4:30 PM
		const month = format(startDate, "MMM", { timeZone: nyTimeZone })
		const year = startDate.getFullYear()
		const time = format(startDate, "h:mm a", { timeZone: nyTimeZone })
		return `${month} ${startDate.getDate()}-${endDate.getDate()}, ${year}, ${time}`
	}

	if (sameYear) {
		// e.g., Apr 1 – May 5, 2025, 4:30 PM
		const start = format(startDate, "MMM d", { timeZone: nyTimeZone })
		const end = format(endDate, "MMM d", { timeZone: nyTimeZone })
		const time = format(startDate, "h:mm a", { timeZone: nyTimeZone })
		return `${start} - ${end}, ${startDate.getFullYear()}, ${time}`
	}

	// e.g., Dec 31, 2024 – Jan 1, 2025, 4:30 PM
	const start = format(startDate, options, { timeZone: "America/New_York" })
	const end = format(endDate, options, { timeZone: "America/New_York" })
	return `${start} - ${end}`
}
