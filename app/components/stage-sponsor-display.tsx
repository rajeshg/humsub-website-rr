import { useEffect, useState } from "react"
import { Badge } from "~/components/ui/badge"
import { type Sponsor, sponsors } from "~/lib/sponsors"

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
const specialSponsors = ["Marius Pharmaceuticals", "Town of Cary, NC"]

// Filter out special sponsors from rotation
const rotatingSponsors = sponsors.filter((sponsor) => !specialSponsors.includes(sponsor.name))
const sortedSponsors = [...rotatingSponsors].sort((a, b) => getSponsorPriority(a.level) - getSponsorPriority(b.level))

export function StageSponsorDisplay() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")

  const currentSponsor = sortedSponsors[currentIndex]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false) // Start fade out and slide

      setTimeout(() => {
        setSlideDirection((prev) => (prev === "left" ? "right" : "left"))
        setCurrentIndex((prev) => (prev + 1) % sortedSponsors.length)
        setIsVisible(true) // Fade in and slide in new sponsor
      }, 600) // 600ms for transition
    }, 6000) // Change sponsor every 6 seconds

    return () => clearInterval(interval)
  }, [])

  if (!currentSponsor) return null

  const images = Array.isArray(currentSponsor.imagePath) ? currentSponsor.imagePath : [currentSponsor.imagePath]

  return (
    <div className="mt-4 md:mt-6 flex justify-end">
      <div
        className={`flex flex-col items-center gap-1.5 md:gap-2 transition-all duration-600 ease-in-out transform ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : `opacity-0 translate-y-4 scale-95 ${slideDirection === "left" ? "-translate-x-8" : "translate-x-8"}`
        }`}
      >
        {/* Sponsor Logo with Flashy Effects */}
        <div className="flex items-center justify-center gap-3 relative">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl blur-xl opacity-30 animate-pulse scale-110"></div>

          {images.slice(0, 2).map((img, index) => (
            <div
              key={`${currentSponsor.name}-${index}`}
              className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-xl p-3 shadow-2xl border-2 border-purple-200 dark:border-purple-700 transform transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: "0 0 30px rgba(147, 51, 234, 0.3), 0 0 60px rgba(147, 51, 234, 0.1)",
              }}
            >
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-transparent rounded-lg opacity-50"></div>

              {currentSponsor.href ? (
                <a href={currentSponsor.href} target="_blank" rel="noopener noreferrer" className="block relative z-10">
                  <img
                    src={img}
                    alt={`${currentSponsor.name} logo`}
                    className="h-16 md:h-20 w-24 md:w-32 object-contain drop-shadow-lg transition-transform duration-300 hover:scale-110"
                  />
                </a>
              ) : (
                <img
                  src={img}
                  alt={`${currentSponsor.name} logo`}
                  className="h-20 md:h-24 w-auto object-contain drop-shadow-lg relative z-10 transition-transform duration-300 hover:scale-110"
                />
              )}

              {/* Sparkle effects */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Flashy Sponsor Label - Now under the logo */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-lg blur-sm opacity-60 animate-pulse"></div>

            <Badge
              className="relative text-sm md:text-lg px-4 py-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white font-bold border-2 border-purple-300 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-64 whitespace-normal text-center overflow-hidden"
              style={{ textWrap: "pretty" }}
            >
              <span className="relative z-10 drop-shadow-md line-clamp-3">
                {currentSponsor.label
                  ? currentSponsor.label
                  : currentSponsor.description
                    ? currentSponsor.description.split(".")[0]
                    : `${currentSponsor.level.charAt(0).toUpperCase() + currentSponsor.level.slice(1)} Sponsor`}
              </span>

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse rounded"></div>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
