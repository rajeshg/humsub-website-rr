import type { FC } from "react"
import { Link } from "react-router"
import { useTimeUntil } from "~/lib/timeuntil"

interface Props {
	eventDate: Date
}

export const CountdownHeader: FC<Props> = ({ eventDate }) => {
	const t = useTimeUntil(eventDate)

	// Hide component the day after the event
	if (t.shouldHide) return null

	const unitItems = [
		{ key: "months", value: t.months, short: "mo", singular: "month", plural: "months" },
		{ key: "days", value: t.days, short: "d", singular: "day", plural: "days" },
		{ key: "hours", value: t.hours, short: "h", singular: "hour", plural: "hours" },
		{ key: "minutes", value: t.minutes, short: "m", singular: "minute", plural: "minutes" },
	]

	const activeItems = unitItems.filter((u) => u.value > 0)
	const fallback = activeItems.length === 0 && !t.isEventHappening

	const Chip: FC<{ value: number; short: string; title?: string }> = ({ value, short, title }) => (
		<div
			role="img"
			aria-hidden="true"
			title={title}
			className="flex flex-col items-center gap-0.5 px-2 py-1 bg-white/90 dark:bg-slate-800/60 rounded-md shadow-sm ring-1 ring-orange-100 dark:ring-slate-700 min-w-[48px]"
		>
			<span className="font-semibold text-orange-700 dark:text-orange-300 text-base tabular-nums leading-none">
				{value}
			</span>
			<span className="text-[11px] text-slate-600 dark:text-slate-400 uppercase tracking-wide">{short}</span>
		</div>
	)

	const liveText = t.isEventHappening
		? "HumSub Diwali is happening now!"
		: fallback
			? "Less than a minute until HumSub Diwali"
			: `${activeItems.map((u) => `${u.value} ${u.value === 1 ? u.singular : u.plural}`).join(", ")} until HumSub Diwali`

	return (
		<div className="w-full py-2 bg-gradient-to-r from-orange-50 to-transparent dark:from-slate-900">
			<div className="mx-auto max-w-4xl px-3">
				<div className="relative overflow-hidden rounded-lg p-3 md:p-2 bg-white/50 dark:bg-slate-900/50 border border-orange-50 dark:border-slate-800 backdrop-blur-sm shadow-sm">
					{/* Desktop: horizontal layout, mobile: vertical stack */}
					{/* Keep the header to a max of two visual lines.
					   Line 1: title (no-wrap, truncated)
					   Line 2: chips + CTA in a single horizontal row (scrolls on very small screens)
					*/}
					<div className="flex flex-col gap-2">
						{/* Line 1: title */}
						<div className="w-full mx-auto text-center">
							<Link
								to="/hum-sub-diwali-2025"
								className="block truncate text-base md:text-lg font-semibold text-orange-700 dark:text-orange-300 hover:underline decoration-orange-200 dark:decoration-orange-500"
							>
								Hum Sub Diwali 2025
							</Link>
						</div>

						{/* Line 2: chips + buy button. Use horizontal scroll on x-axis for very small widths */}
						<div className="flex items-center justify-center md:justify-between gap-3 md:gap-4 w-full">
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
									{t.isEventHappening ? (
										<div className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold border border-green-200 dark:border-green-700 animate-pulse">
											🎉 Happening Now!
										</div>
									) : fallback ? (
										<div className="px-3 py-1.5 rounded-full bg-orange-100 dark:bg-slate-800 text-orange-700 dark:text-orange-300 text-sm font-medium">
											Less than a minute
										</div>
									) : (
										activeItems
											.slice(0, 3)
											.map((u) => (
												<Chip
													key={u.key}
													value={u.value}
													short={u.short}
													title={`${u.value} ${u.value === 1 ? u.singular : u.plural}`}
												/>
											))
									)}
								</div>
							</div>

							{/* CTA */}
							<div className="flex-shrink-0 ml-2">
								<Link
									to="/membership/signup"
									className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
								>
									Purchase
								</Link>
							</div>
						</div>
					</div>

					{/* Accessible live region */}
					<output className="sr-only" aria-live="polite">
						{liveText}
					</output>
				</div>
			</div>
		</div>
	)
}

export default CountdownHeader
