import type { Item, PerformanceItem } from "~/counter"
import { STATE_STYLES, getStateLabel } from "./event-constants"

interface CompactEventCardProps {
	item: Item
}

export const CompactEventCard: React.FC<CompactEventCardProps> = ({ item }) => {
	const style = STATE_STYLES[item.state as keyof typeof STATE_STYLES] || STATE_STYLES.NONE

	return (
		<div
			className={`relative py-2 w-full overflow-hidden shadow rounded ${item.type === "BREAK" ? "bg-yellow-50 dark:bg-yellow-900/30" : "bg-white dark:bg-slate-800"}`}
		>
			{/* Vertical state indicator with text */}
			{item.state !== "NONE" && (
				<div className="absolute left-0 top-0 bottom-0 h-full">
					<div className={`w-8 md:w-12 h-full ${style.barColor} flex items-center justify-center overflow-visible`}>
						<span
							className="absolute text-xs md:text-lg font-bold text-white uppercase tracking-wider select-none"
							style={{
								writingMode: "vertical-rl",
								transform: "rotate(180deg)",
								textOrientation: "mixed",
							}}
						>
							{getStateLabel(item.state)}
						</span>
					</div>
				</div>
			)}

			<div className="px-2 py-2 ml-8 md:ml-12">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1 md:gap-2 min-w-0 flex-grow">
						{/* smaller default name on mobile */}
						<span className="font-bold text-sm md:text-2xl truncate">{item.name}</span>
						{item.type === "BREAK" && (
							<span className="text-xs md:text-lg font-bold px-1 md:px-2 py-0.5 rounded bg-yellow-200 dark:bg-yellow-600 text-yellow-800 dark:text-yellow-50">
								BREAK
							</span>
						)}
					</div>

					{/* Optional: Keep horizontal state badge for additional visibility */}
					{false && item.state !== "NONE" && (
						<div className={`text-sm uppercase font-bold px-2 py-1 rounded ml-2 ${style.bg} ${style.text}`}>
							{getStateLabel(item.state)}
						</div>
					)}
				</div>
				{/* Performance metadata - improved visibility */}
				{item.type === "PERFORMANCE" && (
					<div className="flex justify-between mt-2 md:mt-3">
						<div className="flex flex-col gap-1 min-w-0 flex-1">
							<div className="flex gap-2 md:gap-3 text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium">
								{(item as PerformanceItem).style && <div className="truncate">{(item as PerformanceItem).style}</div>}
							</div>

							{/* Show choreographers - first 2 names if multiple */}
							{(item as PerformanceItem).choreographers && (
								<div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 truncate">
									{(() => {
										const choreo = (item as PerformanceItem).choreographers || ""
										if (choreo.includes(",")) {
											// If multiple choreographers, show first 2
											const names = choreo.split(",").map((name) => name.trim())
											if (names.length > 2) {
												return `${names[0]}, ${names[1]}...`
											}
											return choreo
										}
										return choreo
									})()}
								</div>
							)}
						</div>
						{(item as PerformanceItem).duration && (
							<div className="text-xs md:text-sm font-mono bg-slate-100 dark:bg-slate-700 px-1 md:px-2 py-0.5 md:py-1 rounded ml-2 flex-shrink-0 flex place-items-center">
								{(item as PerformanceItem).duration}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
