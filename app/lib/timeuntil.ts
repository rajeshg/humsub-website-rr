import { useEffect, useState } from "react"

export interface TimeUntilResult {
	months: number
	days: number
	hours: number
	minutes: number
	isExpired: boolean
	isEventDay: boolean
	isEventHappening: boolean
	shouldHide: boolean
}

/**
 * Calculate time until a future date.
 * This is a pure function that returns the main parts needed by UI code.
 */
export function timeUntil(eventDate: Date, nowDate = new Date()): TimeUntilResult {
	const now = nowDate.getTime()
	const eventTime = eventDate.getTime()
	const distance = eventTime - now

	// Check if we're on the same day as the event
	const isEventDay = nowDate.toDateString() === eventDate.toDateString()
	const isExpired = distance <= 0
	const isEventHappening = isExpired && isEventDay
	const shouldHide = isExpired && !isEventDay

	if (isExpired) {
		return {
			months: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			isExpired: true,
			isEventDay,
			isEventHappening,
			shouldHide,
		}
	}

	const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.44))
	const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24))
	const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

	return {
		months,
		days,
		hours,
		minutes,
		isExpired: false,
		isEventDay,
		isEventHappening: false,
		shouldHide: false,
	}
}

/**
 * React hook that updates the value every second.
 * It keeps the display/update logic small and reusable.
 */
export function useTimeUntil(eventDate: Date) {
	const [value, setValue] = useState<TimeUntilResult>(() => timeUntil(eventDate))

	useEffect(() => {
		setValue(timeUntil(eventDate))
		const id = setInterval(() => setValue(timeUntil(eventDate)), 1000)
		return () => clearInterval(id)
	}, [eventDate])

	return value
}
