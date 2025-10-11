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

			<div className="px-3 py-3 ml-8 md:ml-12">
				{/* Header with title and badges */}
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
								{item.itemId}
							</span>
							{item.type === "BREAK" && (
								<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-200 dark:bg-yellow-600 text-yellow-800 dark:text-yellow-50">
									BREAK
								</span>
							)}
						</div>
						<h3 className="font-bold text-sm md:text-xl text-slate-900 dark:text-slate-100 truncate">{item.name}</h3>
					</div>

					{/* Duration badge for performance items */}
					{item.type === "PERFORMANCE" && (item as PerformanceItem).duration && (
						<div className="flex-shrink-0">
							<span className="inline-flex items-center px-2 py-1 rounded-md text-xs md:text-sm font-mono bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
								{(item as PerformanceItem).duration}
							</span>
						</div>
					)}
				</div>

				{/* Performance metadata */}
				{item.type === "PERFORMANCE" && (
					<div className="mt-2 space-y-1">
						{(item as PerformanceItem).style && (
							<div className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium">
								{(item as PerformanceItem).style}
							</div>
						)}

						{/* Choreographers and team size */}
						<div className="flex items-center justify-between text-xs md:text-sm text-slate-500 dark:text-slate-400">
							<div className="flex-1 min-w-0">
								{(item as PerformanceItem).choreographers && (
									<span className="line-clamp-2">
										{(() => {
											const choreo = (item as PerformanceItem).choreographers || ""
											if (choreo.includes(",")) {
												const names = choreo.split(",").map((name) => name.trim())
												if (names.length > 2) {
													return `${names[0]}, ${names[1]}...`
												}
												return choreo
											}
											return choreo
										})()}
									</span>
								)}
							</div>
							{(item as PerformanceItem).teamSize && (
								<span className="flex-shrink-0 ml-2 text-xs md:text-sm font-medium">
									Team: {(item as PerformanceItem).teamSize}
								</span>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
