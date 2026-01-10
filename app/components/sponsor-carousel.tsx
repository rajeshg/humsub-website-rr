import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel"
import { sponsors } from "~/lib/sponsors"
import { Badge } from "./ui/badge"

type SponsorCarouselProps = {
  /** Tailwind class to control the image height, e.g. 'h-20' */
  imageClass?: string
  /** Accessible label for the carousel region */
  label?: string
}

export function SponsorCarousel({ imageClass = "h-32", label = "Sponsors" }: SponsorCarouselProps) {
  const headingId = `sponsors-${label.replace(/\s+/g, "-").toLowerCase()}`

  return (
    <section aria-labelledby={headingId}>
      <h3 id={headingId} className="sr-only">
        {label}
      </h3>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 1500,
          }),
        ]}
      >
        <CarouselContent>
          {sponsors.map((sponsor) => (
            <CarouselItem key={sponsor.name} className="md:basis-1/6 basis-1/2 flex flex-col items-center">
              <img
                src={Array.isArray(sponsor.imagePath) ? sponsor.imagePath[0] : sponsor.imagePath}
                alt={`${sponsor.name} logo`}
                className={`w-full ${imageClass} object-contain bg-white p-1`}
                loading="lazy"
              />
              <Badge
                className={`text-[12px] capitalize mt-3 whitespace-normal text-center ${
                  sponsor.label ? "bg-blue-600 text-white dark:bg-blue-400 dark:text-black" : ""
                }`}
              >
                {sponsor.label ?? sponsor.level}
              </Badge>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
