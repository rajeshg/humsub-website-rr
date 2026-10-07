// Single source of truth for the timer's status colours, shared by the stage display
// and the backstage dashboard so both read identically at a glance.

export type TimerTone = "green" | "red"

/** Fraction of the act that has elapsed before the timer flips to red. */
export const TIMER_RED_THRESHOLD_PCT = 80

/**
 * Progress is measured as the percentage of the act that has ELAPSED, so a high
 * value means the act is running out of time (unlike a "time remaining" bar).
 */
export const elapsedPercent = (
  startTime: number | null | undefined,
  durationSeconds: number | null | undefined,
  now: number
): number => {
  if (!startTime || !durationSeconds) return 0
  return Math.min(100, Math.max(0, Math.round(((now - startTime) / (durationSeconds * 1000)) * 100)))
}

export const timerTone = (elapsedPct: number): TimerTone => (elapsedPct >= TIMER_RED_THRESHOLD_PCT ? "red" : "green")

// Applied to the <Progress> root; [&>div] targets its indicator element
export const TIMER_BAR_TONE: Record<TimerTone, string> = {
  green: "[&>div]:bg-emerald-500",
  red: "[&>div]:bg-red-600",
}

// Faded fill used before the timer has started
export const TIMER_BAR_IDLE = "[&>div]:bg-emerald-500/40"

// Neutral track so the fill stays legible on light and dark surfaces
export const TIMER_TRACK = "bg-slate-200 dark:bg-slate-700"

// Matching colour for countdown text
export const TIMER_TEXT_TONE: Record<TimerTone, string> = {
  green: "text-emerald-600 dark:text-emerald-400",
  red: "text-red-600 dark:text-red-400",
}

// Convenience: bar classes for a running timer, or the idle fill when not started
export const timerBarClass = (elapsedPct: number, started: boolean): string =>
  started ? TIMER_BAR_TONE[timerTone(elapsedPct)] : TIMER_BAR_IDLE
