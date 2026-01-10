// lightweight time picker
import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface TimePickerProps {
  value: string // ISO string
  onChange: (iso: string) => void
  step?: number // seconds
  className?: string
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function isoToTimeParts(iso: string) {
  const d = new Date(iso)
  return { h: d.getHours(), m: d.getMinutes(), s: d.getSeconds(), date: d }
}

function parseTimeInput(input: string, baseDate: Date, step: number) {
  const clean = input.trim()
  const parts = clean.split(":")
  if (parts.length < 2 || parts.length > 3) return null
  const hh = Number(parts[0])
  const mm = Number(parts[1])
  const ss = parts[2] ? Number(parts[2]) : 0
  if (
    Number.isNaN(hh) ||
    Number.isNaN(mm) ||
    Number.isNaN(ss) ||
    hh < 0 ||
    hh > 23 ||
    mm < 0 ||
    mm > 59 ||
    ss < 0 ||
    ss > 59
  )
    return null

  // snap seconds to nearest step
  let snapped = Math.round(ss / step) * step
  if (snapped >= 60) snapped = 60 - step
  const d = new Date(baseDate)
  d.setHours(hh, mm, snapped, 0)
  return d
}

export function TimePicker({ value, onChange, step = 5, className }: TimePickerProps) {
  const { h, m, s, date } = isoToTimeParts(value)
  const label = `${pad(h)}:${pad(m)}:${pad(s)}`
  const [text, setText] = React.useState(label)

  React.useEffect(() => setText(label), [label])

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)
  const seconds = Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-28">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const parsed = parseTimeInput(text, date, step)
                if (parsed) onChange(parsed.toISOString())
              }
            }}
            onBlur={() => {
              const parsed = parseTimeInput(text, date, step)
              if (parsed) onChange(parsed.toISOString())
              else setText(label) // revert invalid
            }}
            className={`w-full font-mono text-center border p-1 rounded ${className ?? ""}`}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-3">
        <div className="flex gap-2">
          <select
            aria-label="Hours"
            value={String(h)}
            onChange={(e) => {
              const hh = Number(e.target.value)
              const dt = new Date(date)
              dt.setHours(hh, m, s, 0)
              onChange(dt.toISOString())
            }}
            className="border p-1 rounded"
          >
            {hours.map((hh) => (
              <option key={hh} value={hh}>
                {pad(hh)}
              </option>
            ))}
          </select>

          <select
            aria-label="Minutes"
            value={String(m)}
            onChange={(e) => {
              const mm = Number(e.target.value)
              const dt = new Date(date)
              dt.setHours(h, mm, s, 0)
              onChange(dt.toISOString())
            }}
            className="border p-1 rounded"
          >
            {minutes.map((mm) => (
              <option key={mm} value={mm}>
                {pad(mm)}
              </option>
            ))}
          </select>

          <select
            aria-label="Seconds"
            value={String(s)}
            onChange={(e) => {
              let ss = Number(e.target.value)
              // snap just in case
              ss = Math.round(ss / step) * step
              if (ss >= 60) ss = 55
              const dt = new Date(date)
              dt.setHours(h, m, ss, 0)
              onChange(dt.toISOString())
            }}
            className="border p-1 rounded"
          >
            {seconds.map((ss) => (
              <option key={ss} value={ss}>
                {pad(ss)}
              </option>
            ))}
          </select>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default TimePicker
