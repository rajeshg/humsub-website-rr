import type { FC } from "react"
import { Link } from "react-router"
import { useTimeUntil } from "~/lib/timeuntil"

interface Props {
    eventDate: Date
}

export const CountdownHeader: FC<Props> = ({ eventDate }) => {
    const t = useTimeUntil(eventDate)

    if (t.isExpired) return null

    // Centralized unit metadata to avoid duplication when formatting/displaying
    const unitItems = [
        // short labels updated to compact, consistent tokens used in the chips
        { key: "months", value: t.months, short: "mo", singular: "month", plural: "months" },
        { key: "days", value: t.days, short: "d", singular: "day", plural: "days" },
        { key: "hours", value: t.hours, short: "h", singular: "hour", plural: "hours" },
        { key: "minutes", value: t.minutes, short: "m", singular: "minute", plural: "minutes" },
    ]

    const activeItems = unitItems.filter((u) => u.value > 0)

    // If nothing meaningful would be shown (e.g. 0s and no days/months), show a friendly fallback.
    // Note: useTimeUntil currently does not expose seconds. This is intentional here —
    // the UI treats minutes === 0 (with no larger units) as "Less than a minute".
    // t.isExpired is checked earlier so we won't show the banner for already-past events.
    const fallback = activeItems.length === 0

    // Smaller chip for compact view
    const Chip: FC<{ value: number; short: string; title?: string }> = ({ value, short, title }) => (
        // purely presentational; screen readers get the live region instead
        <div
            role="img"
            aria-hidden="true"
            title={title}
            className="flex flex-col items-center gap-0.5 px-2 py-1 bg-white/90 dark:bg-slate-800/60 rounded-md shadow-sm ring-1 ring-orange-100 dark:ring-slate-700 min-w-[48px]"
        >
            <span className="font-semibold text-orange-700 dark:text-orange-300 text-base tabular-nums leading-none">
                {value}
            </span>
            <span className="text-[11px] text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                {short}
            </span>
        </div>
    )

    // Build accessible live text from the same metadata to avoid duplicated formatting logic.
    const liveText = fallback
        ? "Less than a minute until HumSub Diwali"
        : `${activeItems.map((u) => `${u.value} ${u.value === 1 ? u.singular : u.plural}`).join(", ")} until HumSub Diwali`

    return (
        <div className="w-full py-2 bg-gradient-to-r from-orange-50 to-transparent dark:from-slate-900 text-center">
            <div className="mx-auto max-w-xl px-3">
                <div className="relative overflow-hidden rounded-lg p-3 bg-white/50 dark:bg-slate-900/50 border border-orange-50 dark:border-slate-800 backdrop-blur-sm shadow-sm">
                    {/* Top row: concise "until" + link centered */}
                    <div className="my-2 text-center">
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                            <Link to="/hum-sub-diwali-2025" className="text-sm font-medium text-orange-700 dark:text-orange-300 underline decoration-orange-200 dark:decoration-orange-500">
                                Hum Sub Diwali 2025
                            </Link>
                        </p>
                    </div>
                    {/* Second row: chips + small HH:MM */}
                    <div className="mx-auto flex justify-center">
                        <div className="flex items-center gap-2 justify-center">
                            {fallback ? (
                                <div className="px-2 py-0.5 rounded-full bg-orange-50 dark:bg-slate-800 text-orange-700 dark:text-orange-300 text-xs font-medium">
                                    Less than a minute
                                </div>
                            ) : (
                                activeItems.slice(0, 3).map((u) => (
                                    // provide a hover title describing the unit fully
                                    <Chip key={u.key} value={u.value} short={u.short} title={`${u.value} ${u.value === 1 ? u.singular : u.plural}`} />
                                ))
                            )}
                        </div>
                    </div>



                    {/* Accessible live region */}
                    <p className="sr-only" role="status" aria-live="polite">
                        {liveText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CountdownHeader
