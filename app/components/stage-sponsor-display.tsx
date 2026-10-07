import { useEffect, useState } from "react"
import { SPONSOR_DISPLAY_SECONDS, type Sponsor, sponsors } from "~/lib/sponsors"

// Sort sponsors by level priority for display order
const getSponsorPriority = (level: Sponsor["level"]): number => {
  switch (level) {
    case "prime":
      return 1
    case "diamond":
      return 2
    case "gold":
      return 3
    case "silver":
      return 4
    case "bronze":
      return 5
    case "media":
      return 6
    case "grantor":
      return 7
    case "partner":
      return 8
    default:
      return 9
  }
}

// Special sponsors that are shown permanently in header
const specialSponsors = ["Himanshu & Parul Shah", "Town of Cary, NC"]

// Filter out special sponsors from rotation
const rotatingSponsors = sponsors.filter((sponsor) => !specialSponsors.includes(sponsor.name))
const sortedSponsors = [...rotatingSponsors].sort((a, b) => getSponsorPriority(a.level) - getSponsorPriority(b.level))

export function StageSponsorDisplay() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")

  const currentSponsor = sortedSponsors[currentIndex]

  // Rotate on the current sponsor's own duration so higher tiers stay up longer
  useEffect(() => {
    if (sortedSponsors.length === 0) return
    const seconds = SPONSOR_DISPLAY_SECONDS[sortedSponsors[currentIndex]?.level ?? "partner"] ?? 6

    const hideTimer = setTimeout(() => {
      setIsVisible(false) // Start fade out and slide
    }, seconds * 1000)

    const advanceTimer = setTimeout(
      () => {
        setSlideDirection((prev) => (prev === "left" ? "right" : "left"))
        setCurrentIndex((prev) => (prev + 1) % sortedSponsors.length)
        setIsVisible(true) // Fade in and slide in new sponsor
      },
      seconds * 1000 + 600
    ) // 600ms for transition

    return () => {
      clearTimeout(hideTimer)
      clearTimeout(advanceTimer)
    }
  }, [currentIndex])

  if (!currentSponsor) return null

  const images = Array.isArray(currentSponsor.imagePath) ? currentSponsor.imagePath : [currentSponsor.imagePath]

  const caption = currentSponsor.label
    ? currentSponsor.label
    : currentSponsor.description
      ? currentSponsor.description.split(".")[0]
      : `${currentSponsor.level.charAt(0).toUpperCase() + currentSponsor.level.slice(1)} Sponsor`

  return (
    <div className="flex justify-end">
      <div
        className={`flex flex-col items-center gap-2 transition-all duration-600 ease-in-out transform ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : `opacity-0 translate-y-4 scale-95 ${slideDirection === "left" ? "-translate-x-8" : "translate-x-8"}`
        }`}
      >
        {/* Sponsor logos on clean ivory cards with a hairline gold edge */}
        <div className="flex items-center justify-center gap-3">
          {images.slice(0, 2).map((img, index) => (
            <div
              key={`${currentSponsor.name}-${index}`}
              className="relative bg-[#fdfaf2] rounded-xl p-3 shadow-lg border border-[#efa528]/40"
            >
              {currentSponsor.href ? (
                <a href={currentSponsor.href} target="_blank" rel="noopener noreferrer" className="block">
                  <img
                    src={img}
                    alt={`${currentSponsor.name} logo`}
                    className="h-16 md:h-20 w-24 md:w-32 object-contain transition-transform duration-300 hover:scale-105"
                  />
                </a>
              ) : (
                <img
                  src={img}
                  alt={`${currentSponsor.name} logo`}
                  className="h-20 md:h-24 w-auto object-contain transition-transform duration-300 hover:scale-105"
                />
              )}
            </div>
          ))}
        </div>

        {/* Sponsor tier label */}
        <div className="rounded-lg bg-[#5f2f83] border border-[#e8c07a]/40 px-5 py-1.5 text-center max-w-64">
          <span className="text-xs md:text-sm font-semibold tracking-[0.15em] text-[#efa528] uppercase line-clamp-2">
            {caption}
          </span>
        </div>
      </div>
    </div>
  )
}
