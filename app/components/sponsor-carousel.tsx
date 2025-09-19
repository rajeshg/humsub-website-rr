import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel"
import { sponsors } from "~/lib/sponsors"
import { Badge } from "./ui/badge"

export function SponsorCarousel() {
	return (
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
					<CarouselItem key={sponsor.name} className="md:basis-1/4 basis-1/2 flex flex-col items-center">
						<img
							src={Array.isArray(sponsor.imagePath) ? sponsor.imagePath[0] : sponsor.imagePath}
							alt={`${sponsor.name} logo`}
							className="w-full h-48 object-contain bg-white p-1"
							loading="lazy"
						/>
						<Badge
							className={`capitalize mt-3 ${
								sponsor.label ? "bg-blue-600 text-white dark:bg-blue-400 dark:text-black" : ""
							}`}
						>
							{sponsor.label ?? sponsor.level}
						</Badge>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	)
}
