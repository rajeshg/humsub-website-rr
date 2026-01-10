// lightweight DateTime picker wrapper

// Minimal DateTime picker wrapper using native inputs styled to match shadcn.
// This avoids adding external dependencies; it exposes a controlled API similar to shadcn's.

interface DateTimePickerProps {
  value: string // ISO string
  onChange: (iso: string) => void
  className?: string
}

export function DateTimePicker({ value, onChange, className }: DateTimePickerProps) {
  const date = new Date(value)
  const pad = (n: number) => String(n).padStart(2, "0")
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`

  return (
    <div className={className}>
      <input
        type="date"
        value={dateStr}
        onChange={(e) => {
          const parts = e.target.value.split("-")
          const y = Number(parts[0]) || new Date(value).getFullYear()
          const m = Number(parts[1]) || new Date(value).getMonth() + 1
          const d = Number(parts[2]) || new Date(value).getDate()
          const dt = new Date(value)
          dt.setFullYear(y, m - 1, d)
          onChange(dt.toISOString())
        }}
        className="mr-2"
      />
      <input
        type="time"
        step={5}
        value={timeStr}
        onChange={(e) => {
          const [hh = "0", mm = "0", ss = "0"] = e.target.value.split(":")
          const dt = new Date(value)
          dt.setHours(Number(hh) || 0, Number(mm) || 0, Number(ss) || 0, 0)
          // snap seconds to nearest 5
          let s = Math.round((Number(ss) || 0) / 5) * 5
          if (s >= 60) s = 55
          dt.setSeconds(s, 0)
          onChange(dt.toISOString())
        }}
      />
    </div>
  )
}

export default DateTimePicker
