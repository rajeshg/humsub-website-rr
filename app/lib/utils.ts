import type { ClassValue } from "clsx"

import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { format, fromZonedTime } from "date-fns-tz"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
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
 * @param dateString - A date string in the format "MMM d, yyyy, h:mm a"
 * @description This function takes a date string in the format "YYYY-MM-DD HH:mm:ss" and converts it to a formatted string
 * in the format "MMM d, yyyy, h:mm a" using the America/New_York timezone.
 * @returns	 A formatted date string in the format "MMM d, yyyy, h:mm a" or "MMM d, yyyy" if the time is 00:00.
 */
export function dateFormatter(dateString: string): string {
	const nyTimeZone = "America/New_York"
	const date = fromZonedTime(dateString, nyTimeZone)
	const options = "MMM d, yyyy, h:mm a"

	const startHour = date.getHours()

	if (startHour === 0) {
		return format(date, "MMM d, yyyy", { timeZone: nyTimeZone })
	}

	return format(date, options, { timeZone: nyTimeZone })
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
