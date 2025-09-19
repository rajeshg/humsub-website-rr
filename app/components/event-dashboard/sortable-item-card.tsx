import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import type { BreakState, Item, PerformanceItem, PerformanceState } from "~/counter"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"
import { ActionButtons } from "./action-buttons"
import { CountdownDisplay } from "./countdown-display"
import { getStateBgColor, getStateLabel } from "./event-constants"
import { PerformanceMeta } from "./performance-meta"
import { QRCodeDrawer } from "./qr-code-drawer"

interface SortableItemCardProps {
	item: Item
	onUpdateState: (itemId: string, newState: PerformanceState | BreakState) => void
	onStartTimer: (itemId: string) => void
	now?: number
	role?: "registration" | "backstage" | null
	openDrawerId?: string | null
	setOpenDrawerId?: (id: string | null) => void
}

export const SortableItemCard: React.FC<SortableItemCardProps> = ({
	item,
	onUpdateState,
	onStartTimer,
	now,
	role,
	openDrawerId,
	setOpenDrawerId,
}) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: item.itemId,
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	}

	const isQRDrawerOpen = openDrawerId === item.itemId
	const handleQRDrawerChange = (open: boolean) => {
		setOpenDrawerId?.(open ? item.itemId : null)
	}

	return (
		<div ref={setNodeRef} style={style} className="w-full">
			<Card
				className={`relative w-full pt-8 overflow-hidden min-h-0 shadow-md rounded-xl border border-gray-200 dark:border-gray-700 ${
					item.state === "DONE"
						? "bg-gray-50 dark:bg-gray-800/50 opacity-75"
						: item.type === "BREAK"
							? "bg-yellow-50 dark:bg-yellow-900/30"
							: "bg-white dark:bg-zinc-900"
				}`}
			>
				<div className="flex flex-col md:flex-row px-8 pb-0 ml-10">
					{/* State indicator bar */}
					<div className="absolute left-0 top-0 bottom-0 h-full">
						<div
							className={`w-10 h-full ${getStateBgColor(item.state)} flex items-center justify-center overflow-visible rounded-l-xl`}
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
						<div className="absolute left-2/3 top-3 -translate-x-1/2">
							<div className="flex items-center justify-center cursor-grab" {...attributes} {...listeners} aria-hidden>
								<Icon icon="teenyicons:drag-horizontal-outline" className="w-5 h-5" />
							</div>
						</div>
					)}

					<div className="flex flex-col flex-1">
						<CardHeader>
							<CardTitle className="flex items-center w-full mb-2">
								<div className="flex items-center gap-3 min-w-0">
									<span className="truncate mr-4 pr-6 text-lg">{item.name}</span>
									{item.type === "BREAK" && (
										<span className="text-xs font-medium px-2 py-1 rounded bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100">
											BREAK
										</span>
									)}
								</div>
							</CardTitle>
						</CardHeader>

						<CardContent className="flex flex-row">
							<div className="flex flex-col md:flex-row md:items-start gap-4 w-full">
								{/* Left: Timer and metadata */}
								<div className="flex-1 min-w-0 space-y-1">
									{/* Timer info */}
									<div className="flex">
										<span className="w-32 flex-shrink-0 text-xs font-medium">Timer:</span>
										<span className="text-xs text-muted-foreground">
											{item.timer_start_time
												? item.timer_end_time
													? `Ended at ${new Date(item.timer_end_time).toLocaleTimeString()}`
													: `Running since ${new Date(item.timer_start_time).toLocaleTimeString()}`
												: item.state === "DONE"
													? "Completed without timing"
													: "Not started"}
										</span>
									</div>

									{/* Performance metadata */}
									{item.type === "PERFORMANCE" && <PerformanceMeta performance={item as PerformanceItem} />}
								</div>

								{/* Right: Progress bar and countdown */}
								<div className="flex flex-col items-center gap-2 min-w-[140px]">
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
												<div className="w-32">
													<Progress
														value={pct}
														className={pct >= 80 ? "h-2 [&>div]:bg-red-600 dark:[&>div]:bg-red-400" : "h-2"}
													/>
													<CountdownDisplay
														timerStart={item.timer_start_time}
														durationSeconds={durationSec}
														now={nowMs}
													/>
												</div>
											)
										})()}
								</div>
							</div>
						</CardContent>

						<CardFooter>
							<div className="my-3">
								<div className="flex flex-row flex-wrap justify-start gap-3">
									<ActionButtons item={item} role={role} onUpdateState={onUpdateState} onStartTimer={onStartTimer} />
								</div>
							</div>
						</CardFooter>
					</div>

					{/* QR Code Drawer */}
					<div className="md:w-1/3 mt-2 md:justify-end flex md:ml-auto justify-center md:items-center">
						<QRCodeDrawer itemId={item.itemId} isOpen={isQRDrawerOpen} onOpenChange={handleQRDrawerChange} />
					</div>
				</div>
			</Card>
		</div>
	)
}
