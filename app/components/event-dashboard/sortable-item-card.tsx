import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import type { BreakState, Item, PerformanceItem, PerformanceState } from "~/counter"
import { Progress } from "../ui/progress"
import { ActionButtons } from "./action-buttons"
import { CountdownDisplay } from "./countdown-display"
import { getStateBgColor, getStateLabel } from "./event-constants"
import { PerformanceMeta } from "./performance-meta"

interface SortableItemCardProps {
	item: Item
	onUpdateState: (itemId: string, newState: PerformanceState | BreakState) => void
	onStartTimer: (itemId: string) => void
	now?: number
	role?: "registration" | "backstage" | null
	openDrawerId?: string | null
	setOpenDrawerId?: (id: string | null) => void
}

export const SortableItemCard: React.FC<SortableItemCardProps> = ({ item, onUpdateState, onStartTimer, now, role }) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: item.itemId,
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	}

	return (
		<div ref={setNodeRef} style={style} className="w-full">
			<div
				className={`relative w-full p-3 md:p-4 shadow-md rounded-xl border border-gray-200 dark:border-gray-700 flex items-center gap-2 md:gap-4 ${
					item.state === "DONE"
						? "bg-gray-50 dark:bg-gray-800/50 opacity-75"
						: item.type === "BREAK"
							? "bg-yellow-50 dark:bg-yellow-900/30"
							: "bg-white dark:bg-zinc-900"
				}`}
			>
				{/* State indicator bar */}
				<div className="absolute left-0 top-0 bottom-0 h-full">
					<div
						className={`w-8 md:w-10 h-full ${getStateBgColor(item.state)} flex items-center justify-center overflow-visible rounded-l-xl`}
					>
						{item.state !== "NONE" && (
							<span
								className="absolute text-[12px] font-bold text-white uppercase tracking-wider select-none"
								style={{
									writingMode: "vertical-rl",
									transform: "rotate(180deg)",
									textOrientation: "mixed",
								}}
							>
								{getStateLabel(item.state)}
							</span>
						)}
					</div>
				</div>

				{/* Drag handle */}
				{role !== "registration" && (
					// hide drag handle on small screens to save horizontal space
					<div
						className="hidden md:flex items-center justify-center cursor-grab"
						{...attributes}
						{...listeners}
						aria-hidden
					>
						<Icon icon="teenyicons:drag-horizontal-outline" className="w-5 h-5" />
					</div>
				)}

				{/* Main content - responsive layout: title on top, then meta+actions row */}
				<div className="flex flex-col flex-1 min-w-0 gap-0 ml-8 gap-2">
					{/* Top row: Title + type badge */}
					<div className="flex items-start gap-3 flex-wrap text-pretty line-clamp-2">
						<span className="text-base font-medium" title={`${item.itemId} ${item.name}`}>
							{item.itemId.toLowerCase().includes("sponsor") ? "" : item.itemId} {item.name}
						</span>
						{item.type === "BREAK" && (
							<span className="text-xs font-medium px-2 py-1 rounded bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 flex-shrink-0">
								BREAK
							</span>
						)}
					</div>

					{/* Second row: Metadata on left, Progress+Actions on right (desktop), stacked (mobile) */}
					<div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
						{/* Left: Metadata and timer */}
						<div className="flex flex-col min-w-0 flex-1 space-y-1">
							{item.type === "PERFORMANCE" &&
								(() => {
									return <PerformanceMeta performance={item as PerformanceItem} />
								})()}
							{item.timer_start_time && (
								<div className="flex">
									<span className="w-18 flex-shrink-0 text-xs font-medium">Timer</span>
									<span className="text-xs text-muted-foreground truncate">
										{item.timer_start_time
											? item.timer_end_time
												? `Ended at ${new Date(item.timer_end_time).toLocaleTimeString()}`
												: `Running since ${new Date(item.timer_start_time).toLocaleTimeString()}`
											: item.state === "DONE"
												? "Completed without timing"
												: "Not started"}
									</span>
								</div>
							)}
						</div>

						{/* Right: Progress + Countdown and Action buttons */}
						<div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3 min-w-0 md:min-w-[220px] md:justify-end">
							{item.type === "PERFORMANCE" &&
								item.timer_start_time &&
								(item as PerformanceItem).durationSeconds &&
								!(item as PerformanceItem).timer_end_time &&
								(() => {
									const p = item as PerformanceItem
									const nowMs = now ?? Date.now()
									const elapsedMs = Math.max(0, nowMs - (p.timer_start_time || 0))
									const elapsedSec = Math.floor(elapsedMs / 1000)
									const durationSec = p.durationSeconds || 1
									const pct = Math.min(100, Math.round((elapsedSec / durationSec) * 100))

									return (
										<div className="w-24 md:w-36 flex flex-col items-center">
											<Progress
												value={pct}
												className={pct >= 80 ? "h-2 [&>div]:bg-red-600 dark:[&>div]:bg-red-400" : "h-2"}
											/>
											<CountdownDisplay timerStart={item.timer_start_time} durationSeconds={durationSec} now={nowMs} />
										</div>
									)
								})()}

							{/* Action buttons */}
							<div className="w-full md:w-auto">
								<ActionButtons item={item} role={role} onUpdateState={onUpdateState} onStartTimer={onStartTimer} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
