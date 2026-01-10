import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import type { PerformanceItem } from "~/counter"
import { formatTime } from "~/lib/format-time"

// Helper to format durations
const formatDuration = (d?: number | string) => {
  if (d == null) return undefined
  // If number assumed to be seconds
  if (typeof d === "number") {
    const minutes = Math.floor(d / 60)
    const seconds = Math.floor(d % 60)
    if (minutes > 0) {
      return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`
    }
    return `${seconds}s`
  }
  // If string, try to coerce numeric string first
  const n = Number(d)
  if (!Number.isNaN(n)) return formatDuration(n)
  // Fallback to raw string
  return String(d)
}

interface PerformanceMetaProps {
  performance: PerformanceItem
}

export const PerformanceMeta: React.FC<PerformanceMetaProps> = ({ performance }) => {
  const duration = formatDuration(
    (performance as unknown as { durationSeconds?: number }).durationSeconds ??
      (performance.duration as unknown as number) ??
      performance.duration
  )

  const hasMeta = Boolean(performance.style || performance.teamSize || performance.choreographers || duration)

  if (!hasMeta) return null

  // Compact layout: more columns on wider screens and inline labels to use horizontal space
  return (
    <dl
      className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-muted-foreground"
      aria-label="Performance metadata"
    >
      {performance.choreographers && (
        <div className="flex items-start gap-1">
          <dt className="sr-only">Choreographers</dt>
          <Icon icon="mdi:person-outline" className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
          <dd className="mt-0">
            <div className="hidden sm:block font-medium text-xs text-foreground mb-2">Choreographers</div>
            <div className="text-xs text-muted-foreground mt-1">{performance.choreographers}</div>
          </dd>
        </div>
      )}

      {typeof performance.teamSize === "number" && (
        <div className="flex items-start gap-1">
          <dt className="sr-only">Team Size</dt>
          <Icon icon="mdi:people" className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
          <dd className="mt-0">
            <div className="hidden sm:block font-medium text-xs text-foreground">Team Size</div>
            <div className="text-xs text-muted-foreground mt-1">{performance.teamSize}</div>
          </dd>
        </div>
      )}

      {performance.style && (
        <div className="flex items-start gap-1">
          <dt className="sr-only">Style</dt>
          <Icon icon="mdi:format-line-style" className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
          <dd className="mt-0">
            <div className="hidden sm:block font-medium text-xs text-foreground">Style</div>
            <div className="text-xs text-muted-foreground mt-1">{performance.style}</div>
          </dd>
        </div>
      )}

      {duration && (
        <div className="flex items-start gap-1">
          <dt className="sr-only">Duration</dt>
          <Icon icon="ion:time-outline" className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
          <dd className="mt-0">
            <div className="hidden sm:block font-medium text-xs text-foreground">Duration</div>
            <div className="text-xs text-muted-foreground mt-1">{duration}</div>
          </dd>
        </div>
      )}
      {performance.rehearsalTime && (
        <div className="flex items-start gap-1">
          <dt className="sr-only">Rehearsal Time</dt>
          <Icon icon="mdi:calendar-clock" className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
          <dd className="mt-0">
            <div className="hidden sm:block font-medium text-xs text-foreground">Rehearsal Time</div>
            <div className="text-xs text-muted-foreground mt-1">{formatTime(performance.rehearsalTime)}</div>
          </dd>
        </div>
      )}

      {performance.eventTime && (
        <div className="flex items-start gap-1">
          <dt className="sr-only">Performance Time</dt>
          <Icon icon="mdi:calendar-clock" className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
          <dd className="mt-0">
            <div className="hidden sm:block font-medium text-xs text-foreground">Event Time</div>
            <div className="text-xs text-muted-foreground mt-1">{formatTime(performance.eventTime)}</div>
          </dd>
        </div>
      )}
    </dl>
  )
}
