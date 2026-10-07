import { Theater } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { CompactEventCard, StateBadge } from "~/components/event-dashboard"
import { Spinner } from "~/components/spinner"
import { StageSponsorDisplay } from "~/components/stage-sponsor-display"
import { ImageDisplay } from "~/components/stage-timer/image-display"

import { Progress } from "~/components/ui/progress"
import { useWebSocket } from "~/components/use-websocket"
import type { Item, PerformanceItem } from "~/counter"
import imageManifest from "~/lib/image-manifest.json"
import { getFillerSlideDurationSeconds, type Sponsor, sponsors } from "~/lib/sponsors"

// Header sponsors are driven by the same list as the sponsors page
// (app/routes/our-sponsors.tsx) so the stage timer stays in sync.
const primeSponsor = sponsors.find((s) => s.level === "prime")
const carySponsor = sponsors.find((s) => s.name === "Town of Cary, NC")

// Event tagline shown under the event title (Diwali 2026 theme)
const EVENT_THEME = "Udaan – Soaring High"

const sponsorImages = (sponsor: Sponsor | undefined): string[] => {
  if (!sponsor) return []
  return Array.isArray(sponsor.imagePath) ? sponsor.imagePath : [sponsor.imagePath]
}

// Permanent header sponsors: prime sponsor + Town of Cary grantor.
// Every other sponsor rotates via <StageSponsorDisplay />.
const HeaderSponsors = ({ logoClassName, labelClassName }: { logoClassName: string; labelClassName: string }) => (
  <div className="flex items-center gap-2">
    {primeSponsor && (
      <div className="flex flex-col items-center gap-1">
        <div className="bg-white rounded-lg p-1 shadow-md flex items-center gap-1">
          {sponsorImages(primeSponsor).length > 0 ? (
            sponsorImages(primeSponsor).map((src) => (
              <img
                key={src}
                src={src}
                alt={`${primeSponsor.name} - ${primeSponsor.label ?? "Prime Sponsor"}`}
                className={`${logoClassName} w-auto object-contain`}
              />
            ))
          ) : (
            <span className="px-2 py-1 text-sm md:text-base font-bold text-[#bc2067] whitespace-nowrap">
              {primeSponsor.name}
            </span>
          )}
        </div>
        <span className={`${labelClassName} font-semibold text-center leading-tight`}>
          {primeSponsor.label ?? "Prime Sponsor"}
        </span>
      </div>
    )}

    {primeSponsor && carySponsor && <div className="w-px self-stretch bg-white/30" aria-hidden />}

    {carySponsor && (
      <div className="flex flex-col items-center gap-1">
        <div className="bg-white rounded-lg p-1 shadow-md">
          {sponsorImages(carySponsor).map((src) => (
            <img
              key={src}
              src={src}
              alt={`${carySponsor.name} - Partner`}
              className={`${logoClassName} w-auto object-contain`}
            />
          ))}
        </div>
        <span className={`${labelClassName} font-semibold text-center leading-tight`}>Partner</span>
      </div>
    )}
  </div>
)

// Precompute filler paths at module level so selection is stable and doesn't need to be
// recomputed on every render beyond the controlled memo below.
const FILLER_PATHS: string[] = (imageManifest?.filler ?? []).map((f) => f.path)

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
}: {
  timerStart: number
  durationSeconds: number
  now: number
}) => {
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

  // Update time every second
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

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

  // Client-side single random filler image selection (no rotation)
  const shouldShowFiller = useMemo(() => {
    return !currentItem || eventState?.viewState === "image"
  }, [eventState?.viewState, currentItem])

  // Idle filler slides rotate on each slide's own duration (by sponsor level),
  // starting at a random slide each time the filler becomes visible.
  const [fillerIndex, setFillerIndex] = useState(0)

  useEffect(() => {
    if (shouldShowFiller && FILLER_PATHS.length > 0) {
      setFillerIndex(Math.floor(Math.random() * FILLER_PATHS.length))
    }
  }, [shouldShowFiller])

  useEffect(() => {
    if (!shouldShowFiller || FILLER_PATHS.length === 0) return
    const seconds = getFillerSlideDurationSeconds(FILLER_PATHS[fillerIndex % FILLER_PATHS.length] ?? "")
    const id = setTimeout(() => {
      setFillerIndex((i) => (i + 1) % FILLER_PATHS.length)
    }, seconds * 1000)
    return () => clearTimeout(id)
  }, [shouldShowFiller, fillerIndex])

  const selectedFiller =
    shouldShowFiller && FILLER_PATHS.length > 0 ? (FILLER_PATHS[fillerIndex % FILLER_PATHS.length] ?? null) : null

  // Resolve the effective image path (controller-selected image or client filler)
  const effectiveImagePath: string | null = eventState?.selectedImage ?? selectedFiller ?? null

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
      <div className="min-h-screen w-full flex flex-col p-1 bg-gradient-to-br from-[#5f2f83] via-[#8a2a86] to-[#bc2067] md:hidden">
        {/* Header - Top for mobile */}
        <div className="bg-gradient-to-b from-[#5f2f83] to-[#bc2067] text-white py-2 px-3 shadow-lg flex flex-col items-center justify-between rounded-lg mb-2 border-b-2 border-[#efa528]">
          <div className="h-12 flex-shrink-0 bg-white rounded-lg px-2 py-1 flex items-center justify-center">
            <img src="/assets/humsub-logo.png" alt="Hum Sub logo" className="h-full w-auto object-contain" />
          </div>
          <span className="text-xs font-semibold tracking-[0.25em] text-[#e8c07a]">ORGANIZER</span>
          <h1 className="text-lg font-bold text-center tracking-wide px-2 text-[#ffd166]">{eventState.name}</h1>
          <span className="text-[9px] font-semibold tracking-[0.3em] text-[#f3f2d6] uppercase">{EVENT_THEME}</span>

          {/* Special Sponsors - Always Visible */}
          <HeaderSponsors logoClassName="h-6" labelClassName="text-xs" />
        </div>

        {/* Main stage view - takes most space on mobile */}
        <div className="relative mb-4 h-[45vh]">
          <div className="h-full bg-[#fdfaf2] shadow-lg py-2 overflow-hidden rounded-lg border-l-4 border-l-[#efa528]">
            {eventState.viewState === "item" ? (
              <div className="flex flex-col h-full">
                {/* Main display area - takes maximum space */}
                <div className="flex-grow">
                  {!currentItem ? (
                    effectiveImagePath ? (
                      <ImageDisplay imagePath={effectiveImagePath} isCollection={false} now={now} />
                    ) : (
                      <div className="w-full h-full"></div>
                    )
                  ) : currentItem?.durationSeconds ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                      <div className="text-center">
                        <div className="mb-4">
                          <span className="inline-block px-4 py-2 bg-[#5f2f83] text-[#f3f2d6] text-lg font-semibold rounded-full border border-[#efa528]/50">
                            {currentItem.timer_start_time ? "Now Playing" : "Up Next"}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2 whitespace-normal break-words px-2">
                          {currentItem.itemId.startsWith("#") ? "" : "#"}
                          {currentItem.itemId} {currentItem.name}
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
                  <div className="mt-auto p-1">
                    {/* Performance metadata */}
                    <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
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
              <div className="h-full md:pb-0 pb-6">
                <ImageDisplay
                  imagePath={eventState.selectedImage}
                  isCollection={eventState.imageMode === "collection"}
                  collectionInterval={eventState.collectionInterval}
                  collectionLastRotation={eventState.collectionLastRotation}
                  now={now}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 pb-6">
                <div className="flex flex-col items-center justify-center flex-grow">
                  <Theater className="w-16 h-16 text-purple-300" />
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
        </div>

        {/* Coming Up Next - Below main stage on mobile */}
        <div className="flex-shrink-0">
          <div className="bg-[#fdfaf2] shadow-lg flex flex-col rounded-lg overflow-hidden border border-[#efa528]/30">
            <div className="bg-gradient-to-r from-[#5f2f83] to-[#bc2067] text-white py-2 px-3 border-b-2 border-[#efa528]">
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
      <div className="hidden md:flex fixed inset-0 overflow-hidden bg-gradient-to-br from-[#5f2f83] via-[#8a2a86] to-[#bc2067]">
        <div className="h-full w-full flex flex-row p-2">
          {/* Left column: header + current performance */}
          <div className="w-2/3 pr-2 flex flex-col min-h-0">
            {/* Header: three distinct zones for TV/LED - organizer left, title center, sponsors right */}
            <div className="bg-gradient-to-b from-[#5f2f83] to-[#bc2067] text-white py-3 px-4 shadow-lg flex flex-row items-center justify-between rounded-lg mb-2 border-b-2 border-[#efa528]">
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="h-16 bg-white rounded-lg px-3 py-1 flex items-center justify-center">
                  <img src="/assets/humsub-logo.png" alt="Hum Sub logo" className="h-full w-auto object-contain" />
                </div>
                <span className="text-xs font-semibold tracking-widest text-purple-200">ORGANIZER</span>
              </div>

              <div className="flex-grow flex flex-col items-center px-2">
                <h1 className="text-2xl xl:text-4xl font-bold text-center leading-tight tracking-wide text-[#ffd166]">
                  {eventState.name}
                </h1>
                <span className="mt-1 text-[10px] xl:text-sm font-semibold tracking-[0.35em] text-[#f3f2d6] uppercase">
                  {EVENT_THEME}
                </span>
              </div>

              <div className="flex-shrink-0">
                {/* Special Sponsors - Always Visible */}
                <HeaderSponsors logoClassName="h-10" labelClassName="text-sm" />
              </div>
            </div>

            {/* Stage area */}
            <div id="stage" className="flex-grow mt-2 relative min-h-0">
              <div className="h-full bg-[#fdfaf2] shadow-lg border-l-4 border-l-[#efa528] min-h-0 rounded-lg">
                {eventState.viewState === "item" ? (
                  <div className="flex flex-col h-full">
                    {/* Main display area - takes maximum space */}
                    <div className="flex-grow min-h-0">
                      {!currentItem ? (
                        effectiveImagePath ? (
                          <ImageDisplay imagePath={effectiveImagePath} isCollection={false} now={now} />
                        ) : (
                          <div className="w-full h-full"></div>
                        )
                      ) : currentItem?.durationSeconds ? (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-6 px-6">
                          <div className="text-center">
                            <span className="inline-block px-4 py-1.5 bg-[#5f2f83] text-[#f3f2d6] text-sm md:text-lg font-semibold tracking-wide rounded-full border border-[#efa528]/50">
                              {currentItem.timer_start_time ? "Now Playing" : "Up Next"}
                            </span>
                            <h2 className="mt-4 text-xl xl:text-3xl font-bold text-[#5f2f83] tracking-wide whitespace-normal break-words px-2">
                              {currentItem.itemId.startsWith("#") ? "" : "#"}
                              {currentItem.itemId} {currentItem.name}
                            </h2>
                          </div>
                          <div className="flex items-center gap-8 w-full max-w-4xl">
                            <div className="flex flex-col items-center flex-shrink-0">
                              <span className="text-[11px] font-semibold tracking-[0.3em] text-[#e8c07a]">
                                {currentItem.timer_start_time ? "TIME LEFT" : "DURATION"}
                              </span>
                              <div className="mt-1 text-4xl xl:text-6xl font-mono font-bold text-[#5f2f83] tabular-nums tracking-tight">
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
                            <div className="flex-1 min-w-0">
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
                                      ? "h-3 bg-[#e8dcc4] [&>div]:bg-[#b23a2e]"
                                      : Math.round(
                                            ((now - currentItem.timer_start_time) /
                                              ((currentItem.durationSeconds || 0) * 1000)) *
                                              100
                                          ) >= 50
                                        ? "h-3 bg-[#e8dcc4] [&>div]:bg-[#c98a1e]"
                                        : "h-3 bg-[#e8dcc4] [&>div]:bg-[#4f7a52]"
                                    : "h-3 bg-[#e8dcc4] [&>div]:bg-[#cbbfa6]"
                                }
                              />
                            </div>
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
                        <div className="grid grid-cols-2 gap-x-6 md:gap-x-10 gap-y-4 bg-[#faf5e8] border-t border-[#efa528]/30 px-4 md:px-8 py-4 md:py-6 rounded-b-lg">
                          {currentItem.choreographers && (
                            <div className="flex flex-col">
                              <span className="text-[10px] md:text-sm font-semibold tracking-[0.25em] text-[#e8c07a] uppercase">
                                Choreographers
                              </span>
                              <span className="text-sm md:text-2xl font-medium text-[#5f2f83] truncate">
                                {currentItem.choreographers}
                              </span>
                            </div>
                          )}

                          {currentItem.style && (
                            <div className="flex flex-col">
                              <span className="text-[10px] md:text-sm font-semibold tracking-[0.25em] text-[#e8c07a] uppercase">
                                Style
                              </span>
                              <span className="text-sm md:text-2xl font-medium text-[#5f2f83]">
                                {currentItem.style}
                              </span>
                            </div>
                          )}

                          {currentItem.teamSize && (
                            <div className="flex flex-col">
                              <span className="text-[10px] md:text-sm font-semibold tracking-[0.25em] text-[#e8c07a] uppercase">
                                Team Size
                              </span>
                              <span className="text-sm md:text-2xl font-medium text-[#5f2f83]">
                                {currentItem.teamSize}
                              </span>
                            </div>
                          )}

                          {currentItem.duration && (
                            <div className="flex flex-col">
                              <span className="text-[10px] md:text-sm font-semibold tracking-[0.25em] text-[#e8c07a] uppercase">
                                Duration
                              </span>
                              <span className="text-sm md:text-2xl font-medium text-[#5f2f83]">
                                {currentItem.duration}
                              </span>
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
                  <div className="h-full md:pb-0 pb-6">
                    <ImageDisplay
                      imagePath={eventState.selectedImage}
                      isCollection={eventState.imageMode === "collection"}
                      collectionInterval={eventState.collectionInterval}
                      collectionLastRotation={eventState.collectionLastRotation}
                      now={now}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-4 md:p-8 pb-6">
                    <div className="flex flex-col items-center justify-center flex-grow">
                      <Theater className="w-16 h-16 md:w-32 md:h-32 text-purple-300" />
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

              {/* Corner rotation runs only while an act is on the timer. When idle,
              the center filler rotation owns the screen - two unsynced motions
              at once look conflicting, and they'd often show the same sponsor. */}
              {currentItem && (
                <div className="absolute bottom-2 right-2 z-10 md:bottom-0 md:right-0">
                  <div className="scale-75 md:scale-100 origin-bottom-right">
                    <StageSponsorDisplay />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column: Coming Up Next */}
          <div className="w-1/3 pl-2">
            <div className="h-full bg-[#fdfaf2] shadow-lg flex flex-col rounded-lg overflow-hidden border border-[#efa528]/30">
              <div className="bg-gradient-to-r from-[#5f2f83] to-[#bc2067] text-white py-3 px-4 border-b-2 border-[#efa528]">
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
