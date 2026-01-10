/**
 * Format a time value into a compact human-friendly string.
 * Examples:
 *  - 14:00 -> "2 PM"
 *  - 10:24 -> "10:24 AM"
 *
 * Accepts Date | ISO string | timestamp (ms) | undefined | null.
 */
export function formatTime(value?: Date | string | number | null): string | undefined {
  if (value == null) return undefined

  // Normalize to Date
  let d: Date
  if (value instanceof Date) {
    d = value
  } else if (typeof value === "number") {
    // treat as milliseconds timestamp
    d = new Date(value)
  } else {
    // string
    // Accept time-only strings like "10:20:00 AM" or "2:00:00 PM"
    if (typeof value === "string") {
      const timeOnly = value.trim()
      // Regex matches H:MM[:SS] AM/PM or HH:MM[:SS]AM/PM (case-insensitive)
      const m = timeOnly.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AaPp][Mm])$/)
      if (m) {
        const hh = Number.parseInt(m[1] ?? "0", 10)
        const mm = Number.parseInt(m[2] ?? "0", 10)
        const ss = m[3] ? Number.parseInt(m[3], 10) : 0
        const ampm = (m[4] ?? "AM").toUpperCase()
        let hours = hh % 12
        if (ampm === "PM") hours += 12
        const now = new Date()
        d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, mm, ss)
      } else {
        d = new Date(value)
      }
    } else {
      d = new Date(String(value))
    }
  }

  // If invalid date, fall back to original string representation
  if (Number.isNaN(d.getTime())) {
    return typeof value === "string" ? value : String(value)
  }

  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  const isPM = hours >= 12
  let hour12 = hours % 12
  if (hour12 === 0) hour12 = 12

  // Only show minutes if they are non-zero
  if (minutes === 0 && seconds === 0) {
    return `${hour12} ${isPM ? "PM" : "AM"}`
  }
  if (minutes !== 0) {
    const mm = String(minutes).padStart(2, "0")
    return `${hour12}:${mm} ${isPM ? "PM" : "AM"}`
  }
  // If minutes are zero but seconds are non-zero, still show hour only
  return `${hour12} ${isPM ? "PM" : "AM"}`
}
