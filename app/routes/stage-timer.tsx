import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { useEffect, useMemo, useState } from "react"
import { CompactEventCard, StateBadge } from "~/components/event-dashboard"
import { Spinner } from "~/components/spinner"
import { StageSponsorDisplay } from "~/components/stage-sponsor-display"
import { ImageDisplay } from "~/components/stage-timer/image-display"

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
const _CountdownDisplay = ({
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
			{/* Simplified Time Left Display */}
			<div className="bg-slate-800 dark:bg-slate-900 rounded-lg p-4 md:p-8 border border-slate-700">
				<div className="flex flex-col items-center space-y-2 md:space-y-4">
					<span className="text-slate-300 text-sm md:text-lg font-semibold uppercase tracking-wide">Time Left</span>
					<span className="text-white text-4xl md:text-8xl font-mono font-bold">{formatTime(remaining)}</span>
				</div>

				{/* Simple progress bar */}
				<div className="mt-4 md:mt-6 w-full bg-slate-700 rounded-full h-2">
					<div
						className={`h-full rounded-full transition-all duration-300 ${
							percentage >= 80 ? "bg-red-500" : percentage >= 50 ? "bg-yellow-500" : "bg-green-500"
						}`}
						style={{ width: `${percentage}%` }}
					/>
				</div>
			</div>
		</div>
	)
}

export default function StageTimer() {
	const workerUrl = "/api/durable" // Same worker URL as in EventDashboard
	const eventState = useWebSocket(workerUrl)

	// Track current time for countdown
	const [now, setNow] = useState(() => Date.now())

	// Track filler image display state
	const [showFillerImages, setShowFillerImages] = useState(false)
	const [fillerTimeoutStart, setFillerTimeoutStart] = useState<number | null>(null)

	// Randomly select filler image when filler images are shown
	const fillerImage = useMemo(() => {
		const images = ["diwali.png", "holi.png"]
		return images[Math.floor(Math.random() * images.length)]
	}, []) // Randomly select once

	// Update time every second
	useEffect(() => {
		const id = setInterval(() => setNow(Date.now()), 1000)
		return () => clearInterval(id)
	}, [])

	// Handle filler image timeout logic
	useEffect(() => {
		if (!eventState?.items) return

		// Check if any item just became DONE
		const hasDoneItems = eventState.items.some((item) => item.state === "DONE")

		if (hasDoneItems && !showFillerImages && fillerTimeoutStart === null) {
			// Start showing filler images and set timeout
			setShowFillerImages(true)
			setFillerTimeoutStart(Date.now())
		} else if (!hasDoneItems && showFillerImages) {
			// Reset when no more DONE items
			setShowFillerImages(false)
			setFillerTimeoutStart(null)
		}
	}, [eventState?.items, showFillerImages, fillerTimeoutStart])

	// Handle 30-second timeout for filler images
	useEffect(() => {
		if (!showFillerImages || fillerTimeoutStart === null) return

		const timeoutDuration = 30 * 1000 // 30 seconds
		const elapsed = Date.now() - fillerTimeoutStart

		if (elapsed >= timeoutDuration) {
			// Timeout reached, hide filler images
			setShowFillerImages(false)
			setFillerTimeoutStart(null)
		}
	}, [showFillerImages, fillerTimeoutStart])

	// Process event data and determine current and next items
	const { currentItem, nextItems } = useMemo(() => {
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
		<>
			{/* Mobile Layout - Vertical Stack with natural scrolling */}
			<div className="min-h-screen w-full flex flex-col p-1 bg-slate-100 dark:bg-slate-900 md:hidden">
				{/* Header - Top for mobile */}
				<div className="bg-purple-700 text-white py-2 px-3 shadow-lg flex flex-col items-center justify-between rounded-md mb-2">
					<div className="w-12 h-12 flex-shrink-0 bg-white rounded-full p-1 flex items-center justify-center mb-2">
						<img src="/assets/25yr-logo.png" alt="Hum Sub 25 Years Logo" className="w-full h-full object-contain" />
					</div>
					<h1 className="text-lg font-bold text-center tracking-wide px-2">{eventState.name}</h1>

					{/* Special Sponsors - Always Visible */}
					<div className="flex items-center gap-2 mb-2">
						{/* Marius Pharmaceuticals */}
						<div className="flex flex-col items-center gap-1">
							<div className="bg-white rounded-lg p-1 shadow-md">
								<img
									src="/assets/sponsors/Marius_logo.png"
									alt="Marius Pharmaceuticals - Prime Sponsor"
									className="h-6 w-auto object-contain"
								/>
							</div>
							<span className="text-xs font-semibold text-center leading-tight">Prime Sponsor</span>
						</div>

						{/* Town of Cary */}
						<div className="flex flex-col items-center gap-1">
							<div className="bg-white rounded-lg p-1 shadow-md">
								<img
									src="/assets/sponsors/town-of-cary-logo.png"
									alt="Town of Cary, NC - Partner"
									className="h-6 w-auto object-contain"
								/>
							</div>
							<span className="text-xs font-semibold text-center leading-tight">Partner</span>
						</div>
					</div>
				</div>

				{/* Main stage view - takes most space on mobile */}
				<div className="flex-1 min-h-[60vh] relative mb-2">
					<div className="h-full bg-white dark:bg-gray-800 shadow-lg">
						{eventState.viewState === "item" ? (
							<div className="flex flex-col h-full">
								{/* Main display area - takes maximum space */}
								<div className="flex-grow">
									{!currentItem ? (
										showFillerImages ? (
											<ImageDisplay
												imagePath={`/assets/stage-timer/filler/${fillerImage}`}
												isCollection={false}
												now={now}
											/>
										) : (
											<ImageDisplay
												imagePath={`/assets/stage-timer/filler/${fillerImage}`}
												isCollection={false}
												now={now}
											/>
										)
									) : currentItem?.durationSeconds ? (
										<div className="w-full h-full flex flex-col items-center justify-center gap-6">
											<div className="text-center">
												<div className="mb-4">
													<span className="inline-block px-4 py-2 bg-purple-600 text-white text-lg font-semibold rounded-full">
														{currentItem.timer_start_time ? "Now Playing" : "Up Next"}
													</span>
												</div>
												<h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2 whitespace-normal break-words px-2">
													{currentItem.name}
												</h2>
												<div className="text-3xl font-mono font-bold text-slate-400 tracking-wider">
													{currentItem.timer_start_time
														? formatTime(
																Math.max(
																	0,
																	Math.round(
																		(currentItem.timer_start_time + (currentItem.durationSeconds || 0) * 1000 - now) /
																			1000
																	)
																)
															)
														: formatTime(currentItem.durationSeconds || 0)}
												</div>
											</div>
											<div className="w-3/4">
												<Progress
													value={
														currentItem.timer_start_time
															? Math.min(
																	100,
																	Math.round(
																		((now - currentItem.timer_start_time) /
																			((currentItem.durationSeconds || 0) * 1000)) *
																			100
																	)
																)
															: 0
													}
													className={
														currentItem.timer_start_time
															? Math.round(
																	((now - currentItem.timer_start_time) / ((currentItem.durationSeconds || 0) * 1000)) *
																		100
																) >= 80
																? "h-8 [&>div]:bg-red-600 dark:[&>div]:bg-red-400"
																: Math.round(
																			((now - currentItem.timer_start_time) /
																				((currentItem.durationSeconds || 0) * 1000)) *
																				100
																		) >= 50
																	? "h-8 [&>div]:bg-amber-500 dark:[&>div]:bg-amber-400"
																	: "h-8 [&>div]:bg-emerald-500 dark:[&>div]:bg-emerald-400"
															: "h-8 [&>div]:bg-emerald-500/40 dark:[&>div]:bg-emerald-400/40"
													}
												/>
											</div>
										</div>
									) : (
										<div className="w-full h-full flex items-center justify-center">
											<div className="text-center text-gray-500 text-2xl">No duration set</div>
										</div>
									)}
								</div>

								{/* Performance metadata - positioned at bottom */}
								{currentItem && (
									<div className="mt-auto p-2">
										{/* Performance metadata */}
										<div className="grid grid-cols-1 gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
											{currentItem.choreographers && (
												<div className="flex flex-col">
													<span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
														Choreographers
													</span>
													<span className="text-sm font-medium truncate">{currentItem.choreographers}</span>
												</div>
											)}

											{currentItem.style && (
												<div className="flex flex-col">
													<span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
														Style
													</span>
													<span className="text-sm font-medium">{currentItem.style}</span>
												</div>
											)}

											{currentItem.teamSize && (
												<div className="flex flex-col">
													<span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
														Team Size
													</span>
													<span className="text-sm font-medium">{currentItem.teamSize}</span>
												</div>
											)}

											{currentItem.duration && (
												<div className="flex flex-col">
													<span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
														Duration
													</span>
													<span className="text-sm font-medium">{currentItem.duration}</span>
												</div>
											)}
										</div>

										{/* Show badge when not PERFORMING and not READY TO GO */}
										{currentItem.state !== "PERFORMING" && currentItem.state !== "READY TO GO" ? (
											<div className="mt-4 flex justify-center w-full">
												<StateBadge state={currentItem.state} />
											</div>
										) : null}
									</div>
								)}
							</div>
						) : eventState.viewState === "image" ? (
							<div className="h-full pb-24">
								<ImageDisplay
									imagePath={eventState.selectedImage}
									isCollection={eventState.imageMode === "collection"}
									collectionInterval={eventState.collectionInterval}
									collectionLastRotation={eventState.collectionLastRotation}
									now={now}
								/>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center h-full p-4 pb-24">
								<div className="flex flex-col items-center justify-center flex-grow">
									<Icon icon="mdi:stage" className="w-16 h-16 text-purple-300" />
									<h3 className="text-lg font-bold mt-4 text-slate-800 dark:text-white text-center px-2">
										No Content Selected
									</h3>
									<p className="text-xs text-slate-600 dark:text-slate-300 mt-2 text-center px-2">
										Waiting for content selection...
									</p>
								</div>
							</div>
						)}
					</div>

					{/* Small sponsor display for mobile */}
					<div className="absolute bottom-2 right-2 z-10">
						<div className="scale-75 origin-bottom-right">
							<StageSponsorDisplay />
						</div>
					</div>
				</div>

				{/* Coming Up Next - Below main stage on mobile */}
				<div className="flex-shrink-0">
					<div className="bg-white dark:bg-gray-800 shadow-lg flex flex-col rounded-md overflow-hidden border-l border-gray-100 dark:border-gray-700">
						<div className="bg-purple-700 text-white py-2 px-3">
							<h2 className="text-lg font-bold">Coming Up Next</h2>
						</div>

						<div className="p-2 space-y-2">
							{nextItems.length > 0 ? (
								nextItems.map((item) => <CompactEventCard key={item.itemId} item={item} />)
							) : (
								<div className="text-center text-gray-500 py-4 text-sm px-2">No upcoming performances in the queue</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Desktop Layout - Fixed height for TV display */}
			<div className="hidden md:flex fixed inset-0 overflow-hidden bg-slate-100 dark:bg-slate-900">
				<div className="h-full w-full flex flex-row p-2">
					{/* Left column: header + current performance */}
					<div className="w-2/3 pr-2 flex flex-col min-h-0">
						{/* Header placed inside left column so header + stage read as one unit */}
						<div className="bg-purple-700 text-white py-2 px-4 shadow-lg flex flex-row items-center justify-between rounded-md mb-2">
							<div className="w-24 h-24 flex-shrink-0 bg-white rounded-full p-1 flex items-center justify-center">
								<img src="/assets/25yr-logo.png" alt="Hum Sub 25 Years Logo" className="w-full h-full object-contain" />
							</div>
							<h1 className="text-3xl font-bold text-center flex-grow tracking-wide">{eventState.name}</h1>

							{/* Special Sponsors - Always Visible */}
							<div className="flex items-center gap-4">
								{/* Marius Pharmaceuticals */}
								<div className="flex flex-col items-center gap-1">
									<div className="bg-white rounded-lg p-1 shadow-md">
										<img
											src="/assets/sponsors/Marius_logo.png"
											alt="Marius Pharmaceuticals - Prime Sponsor"
											className="h-12 w-auto object-contain"
										/>
									</div>
									<span className="text-sm font-semibold text-center leading-tight">Prime Sponsor</span>
								</div>

								{/* Town of Cary */}
								<div className="flex flex-col items-center gap-1">
									<div className="bg-white rounded-lg p-1 shadow-md">
										<img
											src="/assets/sponsors/town-of-cary-logo.png"
											alt="Town of Cary, NC - Partner"
											className="h-12 w-auto object-contain"
										/>
									</div>
									<span className="text-sm font-semibold text-center leading-tight">Partner</span>
								</div>
							</div>
						</div>

						{/* Stage area */}
						<div id="stage" className="flex-grow mt-2 relative">
							<div className="h-full bg-white dark:bg-gray-800 shadow-lg border-l-8 border-l-purple-600">
								{eventState.viewState === "item" ? (
									<div className="flex flex-col h-full">
										{/* Main display area - takes maximum space */}
										<div className="flex-grow">
											{!currentItem ? (
												showFillerImages ? (
													<ImageDisplay
														imagePath={`/assets/stage-timer/filler/${fillerImage}`}
														isCollection={false}
														now={now}
													/>
												) : (
													<ImageDisplay
														imagePath={`/assets/stage-timer/filler/${fillerImage}`}
														isCollection={false}
														now={now}
													/>
												)
											) : currentItem?.durationSeconds ? (
												<div className="w-full h-full flex flex-col items-center justify-center gap-6">
													<div className="text-center">
														<div className="mb-4">
															<span className="inline-block px-4 py-2 bg-purple-600 text-white text-lg md:text-xl font-semibold rounded-full">
																{currentItem.timer_start_time ? "Now Playing" : "Up Next"}
															</span>
														</div>
														<h2 className="text-xl md:text-5xl font-bold text-slate-800 dark:text-white mb-2 md:mb-4 whitespace-normal break-words px-2">
															{currentItem.name}
														</h2>
														<div className="text-3xl md:text-7xl font-mono font-bold text-slate-400 tracking-wider">
															{currentItem.timer_start_time
																? formatTime(
																		Math.max(
																			0,
																			Math.round(
																				(currentItem.timer_start_time +
																					(currentItem.durationSeconds || 0) * 1000 -
																					now) /
																					1000
																			)
																		)
																	)
																: formatTime(currentItem.durationSeconds || 0)}
														</div>
													</div>
													<div className="w-3/4">
														<Progress
															value={
																currentItem.timer_start_time
																	? Math.min(
																			100,
																			Math.round(
																				((now - currentItem.timer_start_time) /
																					((currentItem.durationSeconds || 0) * 1000)) *
																					100
																			)
																		)
																	: 0
															}
															className={
																currentItem.timer_start_time
																	? Math.round(
																			((now - currentItem.timer_start_time) /
																				((currentItem.durationSeconds || 0) * 1000)) *
																				100
																		) >= 80
																		? "h-8 [&>div]:bg-red-600 dark:[&>div]:bg-red-400"
																		: Math.round(
																					((now - currentItem.timer_start_time) /
																						((currentItem.durationSeconds || 0) * 1000)) *
																						100
																				) >= 50
																			? "h-8 [&>div]:bg-amber-500 dark:[&>div]:bg-amber-400"
																			: "h-8 [&>div]:bg-emerald-500 dark:[&>div]:bg-emerald-400"
																	: "h-8 [&>div]:bg-emerald-500/40 dark:[&>div]:bg-emerald-400/40"
															}
														/>
													</div>
												</div>
											) : (
												<div className="w-full h-full flex items-center justify-center">
													<div className="text-center text-gray-500 text-2xl md:text-3xl">No duration set</div>
												</div>
											)}
										</div>

										{/* Performance metadata - positioned at bottom */}
										{currentItem && (
											<div className="mt-auto p-2 md:p-6">
												{/* Performance metadata */}
												<div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 bg-slate-50 dark:bg-slate-800 p-3 md:p-6 rounded-lg">
													{currentItem.choreographers && (
														<div className="flex flex-col">
															<span className="text-xs md:text-xl font-semibold text-slate-500 dark:text-slate-400 uppercase">
																Choreographers
															</span>
															<span className="text-sm md:text-2xl font-medium truncate">
																{currentItem.choreographers}
															</span>
														</div>
													)}

													{currentItem.style && (
														<div className="flex flex-col">
															<span className="text-xs md:text-xl font-semibold text-slate-500 dark:text-slate-400 uppercase">
																Style
															</span>
															<span className="text-sm md:text-2xl font-medium">{currentItem.style}</span>
														</div>
													)}

													{currentItem.teamSize && (
														<div className="flex flex-col">
															<span className="text-xs md:text-xl font-semibold text-slate-500 dark:text-slate-400 uppercase">
																Team Size
															</span>
															<span className="text-sm md:text-2xl font-medium">{currentItem.teamSize}</span>
														</div>
													)}

													{currentItem.duration && (
														<div className="flex flex-col">
															<span className="text-xs md:text-xl font-semibold text-slate-500 dark:text-slate-400 uppercase">
																Duration
															</span>
															<span className="text-sm md:text-2xl font-medium">{currentItem.duration}</span>
														</div>
													)}
												</div>

												{/* Show badge when not PERFORMING and not READY TO GO */}
												{currentItem.state !== "PERFORMING" && currentItem.state !== "READY TO GO" ? (
													<div className="mt-4 flex justify-center w-full">
														<StateBadge state={currentItem.state} />
													</div>
												) : null}
											</div>
										)}
									</div>
								) : eventState.viewState === "image" ? (
									<div className="h-full pb-24">
										<ImageDisplay
											imagePath={eventState.selectedImage}
											isCollection={eventState.imageMode === "collection"}
											collectionInterval={eventState.collectionInterval}
											collectionLastRotation={eventState.collectionLastRotation}
											now={now}
										/>
									</div>
								) : (
									<div className="flex flex-col items-center justify-center h-full p-4 md:p-8 pb-24">
										<div className="flex flex-col items-center justify-center flex-grow">
											<Icon icon="mdi:stage" className="w-16 h-16 md:w-32 md:h-32 text-purple-300" />
											<h3 className="text-lg md:text-5xl font-bold mt-4 md:mt-8 text-slate-800 dark:text-white text-center px-2">
												No Content Selected
											</h3>
											<p className="text-xs md:text-3xl text-slate-600 dark:text-slate-300 mt-2 md:mt-4 text-center px-2">
												Waiting for content selection...
											</p>
										</div>
									</div>
								)}
							</div>

							{/* Sponsor Display - Absolutely positioned at bottom right, very small on mobile */}
							<div className="absolute bottom-2 right-2 z-10 md:bottom-0 md:right-0">
								<div className="scale-75 md:scale-100 origin-bottom-right">
									<StageSponsorDisplay />
								</div>
							</div>
						</div>
					</div>

					{/* Right column: Coming Up Next */}
					<div className="w-1/3 pl-2">
						<div className="h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col rounded-md overflow-hidden border-l border-gray-100 dark:border-gray-700">
							<div className="bg-purple-700 text-white py-3 px-4">
								<h2 className="text-4xl font-bold">Coming Up Next</h2>
							</div>

							<div className="flex-1 p-3 space-y-4 overflow-y-auto">
								{nextItems.length > 0 ? (
									nextItems.map((item) => <CompactEventCard key={item.itemId} item={item} />)
								) : (
									<div className="text-center text-gray-500 py-12 text-3xl">No upcoming performances in the queue</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
