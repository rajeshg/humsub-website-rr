import Autoplay from "embla-carousel-autoplay"
import { useEffect, useRef, useState } from "react"
import { Spinner } from "~/components/spinner"
import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel"
import { cn } from "~/lib/utils"

interface ImageSlideProps {
  src: string
  alt: string
}

const ImageCarousel = ({ slides }: { slides: ImageSlideProps[] }) => {
  const [currentIndex, _setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({}) // Track loading state per image

  const preloadImage = (index: number) => {
    if (slides[index]?.src) {
      setLoadingStates((prev) => ({ ...prev, [index]: true }))
      const img = new Image()
      img.onload = () => {
        setLoadingStates((prev) => ({ ...prev, [index]: false }))
      }
      img.onerror = () => {
        setLoadingStates((prev) => ({ ...prev, [index]: false }))
        console.error(`Error loading image at index ${index}: ${slides[index]?.src}`)
        // Optionally set a placeholder image or error message
      }
      img.src = slides[index].src
    }
  }

  const preloadNextTwoImages = () => {
    if (!carouselRef.current) return

    const nextIndex1 = (currentIndex + 1) % slides.length
    const nextIndex2 = (currentIndex + 2) % slides.length

    preloadImage(nextIndex1)
    preloadImage(nextIndex2)
  }

  const handleScrollEnd = () => {
    preloadNextTwoImages()
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: we don't need to specify preloadImage function as a dependency to this hook.
  useEffect(() => {
    // Initial preload of the first two images (optional)
    if (slides.length > 1) {
      preloadImage(1 % slides.length)
      preloadImage(2 % slides.length)
    }
  }, [slides])

  return (
    <Carousel
      className="w-full relative"
      ref={carouselRef}
      onScrollEnd={handleScrollEnd}
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={slide.src}>
            <div className="aspect-[16/9] relative overflow-hidden">
              {loadingStates[index] ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 rounded-md">
                  <Spinner className="w-6 h-6" />
                </div>
              ) : null}
              <img
                src={slide.src}
                alt={slide.alt}
                className={cn(
                  "aspect-video rounded-md object-cover transition-opacity duration-300",
                  loadingStates[index] ? "opacity-0" : "opacity-100"
                )}
                loading={index === currentIndex ? "eager" : "lazy"}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default ImageCarousel
