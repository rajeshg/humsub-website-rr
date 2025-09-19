import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { useEffect, useMemo, useState } from "react"
import { CompactEventCard, StateBadge } from "~/components/event-dashboard"
import { Spinner } from "~/components/spinner"
import { Badge } from "~/components/ui/badge"
import { Progress } from "~/components/ui/progress"
import { useWebSocket } from "~/components/use-websocket"
import type { Item, PerformanceItem } from "~/counter"

// Helper for formatting time
const formatTime = (seconds: number) => {
	const mins = Math.floor(seconds / 60)
		.toString()
		.padStart(1, "0")
	const secs = (seconds % 60).toString().padStart(2, "0")
	return `${mins}:${secs}`
}

// Countdown display component
const CountdownDisplay = ({
	timerStart,
	durationSeconds,
	now,
}: { timerStart: number; durationSeconds: number; now: number }) => {
	const endAt = timerStart + durationSeconds * 1000
	const remaining = Math.max(0, Math.round((endAt - now) / 1000))
	const elapsed = Math.min(durationSeconds, Math.round((now - timerStart) / 1000))
	const percentage = Math.min(100, Math.round((elapsed / durationSeconds) * 100))

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
				{/* smaller on mobile */}
				<span className="text-lg md:text-3xl font-bold uppercase tracking-wide">Time Remaining</span>
				<span className="text-5xl md:text-7xl font-mono font-bold">{formatTime(remaining)}</span>
			</div>

			<Progress
				value={percentage}
				className={
					percentage >= 80
						? "h-8 [&>div]:bg-red-600 dark:[&>div]:bg-red-400"
						: percentage >= 50
							? "h-8 [&>div]:bg-amber-500 dark:[&>div]:bg-amber-400"
							: "h-8 [&>div]:bg-emerald-500 dark:[&>div]:bg-emerald-400"
				}
			/>
		</div>
	)
}

export default function StageTimer() {
	const workerUrl = "/api/durable" // Same worker URL as in EventDashboard
	const eventState = useWebSocket(workerUrl)

	// Track current time for countdown
	const [now, setNow] = useState(() => Date.now())

	// Update time every second
	useEffect(() => {
		const id = setInterval(() => setNow(Date.now()), 1000)
		return () => clearInterval(id)
	}, [])

	// Process event data and determine current and next items
	const { currentItem, nextItems, firstItem } = useMemo(() => {
		if (!eventState?.items || !Array.isArray(eventState.items)) {
			return { currentItem: undefined, nextItems: [], firstItem: undefined }
		}

		// Filter out DONE items first for upcoming items consideration
		const activeItems = eventState.items.filter((item) => item.state !== "DONE")

		// Find currently performing item (prefer PERFORMING with active timer)
		let current = eventState.items.find(
			(item) => item.state === "PERFORMING" && item.timer_start_time && !item.timer_end_time
		) as PerformanceItem | undefined

		// If nothing is PERFORMING, treat a READY TO GO item as the current item so it appears in the main area
		if (!current) {
			current = eventState.items.find((item) => item.state === "READY TO GO") as PerformanceItem | undefined
		}

		// If we found a current item, find items that come after it
		let upcoming: Item[] = []
		if (current) {
			const currentIndex = activeItems.findIndex((item) => item.itemId === current?.itemId)
			if (currentIndex !== -1) {
				// Get up to 8 items after the current one that aren't DONE and guard against out-of-bounds
				const start = currentIndex + 1
				if (start < activeItems.length) {
					const end = Math.min(activeItems.length, start + 8)
					upcoming = activeItems.slice(start, end)
				} else {
					upcoming = []
				}
			} else {
				// Edge case: current was not found in activeItems (fallback)
				upcoming = activeItems.slice(0, 8)
			}
		} else {
			// If no current item, get the next few upcoming items that aren't DONE (first 8)
			upcoming = activeItems.slice(0, 8)
		}

		return {
			currentItem: current,
			nextItems: upcoming,
			// The first item is either the current item's next item, or the first active item in the list
			firstItem: current ? upcoming[0] : activeItems.length > 0 ? activeItems[0] : undefined,
		}
	}, [eventState])

	// If no event state yet, show loading
	if (!eventState) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<Spinner className="w-12 h-12" />
				<span className="ml-4 text-lg md:text-3xl">Loading stage timer...</span>
			</div>
		)
	}

	return (
		// Changed: allow scrolling on small screens and keep background; make layout responsive below
		<div className="fixed inset-0 overflow-auto bg-slate-100 dark:bg-slate-900">
			<div className="h-full w-full flex flex-col md:flex-row p-2">
				{/* Left column: header + current performance (be full width on mobile, 2/3 on md+) */}
				<div className="w-full md:w-2/3 md:pr-2 flex flex-col">
					{/* Header placed inside left column so header + stage read as one unit
							Changed: stack logo + title on small screens, horizontal on md+ */}
					<div className="bg-purple-700 text-white py-2 px-4 shadow-lg flex flex-col md:flex-row items-center justify-between rounded-md">
						<div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 bg-white rounded-full p-1 flex items-center justify-center mb-3 md:mb-0">
							<img src="/assets/25yr-logo.png" alt="Hum Sub 25 Years Logo" className="w-full h-full object-contain" />
						</div>
						<h1 className="text-xl md:text-3xl font-bold text-center flex-grow tracking-wide">{eventState.name}</h1>
						<div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0" /> {/* balance */}
					</div>

					{/* Stage area */}
					<div id="stage" className="flex-grow mt-2">
						<div className="h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col md:border-l-8 md:border-l-purple-600">
							{currentItem ? (
								<div className="flex flex-col h-full p-4 md:p-6">
									{/* Current performance name */}
									<div className="text-center mb-6">
										<div className="mb-2 flex justify-center">
											{currentItem.state === "READY TO GO" ? (
												<Badge className="text-white bg-amber-500 dark:bg-amber-600 text-sm md:text-2xl font-bold uppercase tracking-wider px-3 py-1 rounded">
													NEXT
												</Badge>
											) : (
												<Badge className="text-white bg-emerald-500 dark:bg-emerald-600 text-sm md:text-2xl font-bold uppercase tracking-wider px-3 py-1 rounded">
													ON STAGE
												</Badge>
											)}
										</div>
										<h2 className="text-4xl md:text-7xl font-bold text-slate-800 dark:text-white truncate leading-tight">
											{currentItem.name}
										</h2>
									</div>

									{/* Timer display */}
									<div className="flex-grow flex items-center justify-center mt-6">
										{currentItem.durationSeconds ? (
											currentItem.timer_start_time ? (
												<div className="w-full">
													<CountdownDisplay
														timerStart={currentItem.timer_start_time}
														durationSeconds={currentItem.durationSeconds}
														now={now}
													/>
												</div>
											) : (
												<div className="w-full flex flex-col items-center gap-6">
													<div className="text-center">
														<div className="text-5xl md:text-7xl font-mono font-bold text-slate-400 tracking-wider">
															{formatTime(currentItem.durationSeconds)}
														</div>
														<div className="mt-4 text-2xl md:text-3xl font-semibold text-slate-600 dark:text-slate-300">
															Awaiting Start
														</div>
													</div>
													<div className="w-3/4">
														<Progress
															value={0}
															className="h-8 [&>div]:bg-emerald-500/40 dark:[&>div]:bg-emerald-400/40"
														/>
													</div>
												</div>
											)
										) : (
											<div className="text-center text-gray-500 text-2xl md:text-3xl">No duration set</div>
										)}
									</div>

									{/* Performance metadata */}
									<div className="grid grid-cols-2 gap-6 md:gap-8 mt-4 md:mt-6 bg-slate-50 dark:bg-slate-800 p-4 md:p-6 rounded-lg">
										{currentItem.choreographers && (
											<div className="flex flex-col">
												<span className="text-xs md:text-xl font-semibold text-slate-500 dark:text-slate-400 uppercase">
													Choreographers
												</span>
												<span className="text-lg md:text-2xl font-medium truncate">{currentItem.choreographers}</span>
											</div>
										)}

										{currentItem.style && (
											<div className="flex flex-col">
												<span className="text-xs md:text-xl font-semibold text-slate-500 dark:text-slate-400 uppercase">
													Style
												</span>
												<span className="text-lg md:text-2xl font-medium">{currentItem.style}</span>
											</div>
										)}

										{currentItem.teamSize && (
											<div className="flex flex-col">
												<span className="text-xs md:text-xl font-semibold text-slate-500 dark:text-slate-400 uppercase">
													Team Size
												</span>
												<span className="text-lg md:text-2xl font-medium">{currentItem.teamSize}</span>
											</div>
										)}

										{currentItem.duration && (
											<div className="flex flex-col">
												<span className="text-xs md:text-xl font-semibold text-slate-500 dark:text-slate-400 uppercase">
													Duration
												</span>
												<span className="text-lg md:text-2xl font-medium">{currentItem.duration}</span>
											</div>
										)}
									</div>

									{/* Show badge when not PERFORMING and not READY TO GO */}
									{currentItem.state !== "PERFORMING" && currentItem.state !== "READY TO GO" ? (
										<div className="mt-4 md:mt-6 flex justify-center w-full place-items-center">
											<StateBadge state={currentItem.state} />
										</div>
									) : null}
								</div>
							) : firstItem ? (
								<div className="flex flex-col items-center justify-center h-full p-6 md:p-8">
									<div className="flex flex-col items-center justify-center flex-grow">
										<Icon icon="mdi:stage" className="w-24 h-24 md:w-32 md:h-32 text-purple-300" />
										<h3 className="text-2xl md:text-5xl font-bold mt-6 md:mt-8 text-slate-800 dark:text-white text-center">
											No Performance On Stage
										</h3>
										<p className="text-sm md:text-3xl text-slate-600 dark:text-slate-300 mt-4 md:mt-6 mb-4 md:mb-8 text-center">
											The next scheduled performance is:
										</p>

										<div className="max-w-md w-full">
											<CompactEventCard item={firstItem} />
										</div>
									</div>
								</div>
							) : (
								<div className="flex flex-col items-center justify-center h-full p-6 md:p-8">
									<div className="flex flex-col items-center justify-center flex-grow">
										<Icon icon="mdi:stage" className="w-24 h-24 md:w-32 md:h-32 text-purple-300" />
										<h3 className="text-2xl md:text-5xl font-bold mt-6 md:mt-8 text-slate-800 dark:text-white text-center">
											No Performances Scheduled
										</h3>
										<p className="text-sm md:text-3xl text-slate-600 dark:text-slate-300 mt-4 text-center">
											There are no performances in the queue.
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Right column: Coming Up Next */}
				<div className="w-full md:w-1/3 md:pl-2 mt-4 md:mt-0">
					<div className="h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col rounded-md overflow-hidden border-l border-gray-100 dark:border-gray-700">
						<div className="bg-purple-700 text-white py-3 px-4">
							<h2 className="text-xl md:text-4xl font-bold">Coming Up Next</h2>
						</div>

						<div className="flex-1 p-3 space-y-4 overflow-hidden">
							{nextItems.length > 0 ? (
								nextItems.map((item) => <CompactEventCard key={item.itemId} item={item} />)
							) : (
								<div className="text-center text-gray-500 py-12 text-lg md:text-3xl">
									No upcoming performances in the queue
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
