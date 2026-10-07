import { TIMER_TEXT_TONE, elapsedPercent, timerTone } from "~/lib/timer-tone"

interface CountdownDisplayProps {
  timerStart: number
  durationSeconds: number
  now: number
}

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ timerStart, durationSeconds, now }) => {
  const endAt = timerStart + durationSeconds * 1000
  const remaining = Math.max(0, Math.round((endAt - now) / 1000))
  const mins = Math.floor(remaining / 60)
    .toString()
    .padStart(1, "0")
  const secs = (remaining % 60).toString().padStart(2, "0")

  // Colour matches the progress bar so the two read as one indicator
  const tone = timerTone(elapsedPercent(timerStart, durationSeconds, now))

  return (
    <div className="text-xs text-right mt-1">
      <span className={`text-xs font-mono ${TIMER_TEXT_TONE[tone]}`}>{`${mins}:${secs}`}</span>
    </div>
  )
}
