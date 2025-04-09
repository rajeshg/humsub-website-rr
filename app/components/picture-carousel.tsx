import Autoplay from "embla-carousel-autoplay"

import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel"

export function PictureCarousel() {
	const images = [
		"/assets/home-carousel/basantbahar24-0303-160300fin2.webp",
		"/assets/home-carousel/basantbahar24-0303-162119fin2.webp",
		"/assets/home-carousel/basantbahar24-0303-170353fin2.webp",
		"/assets/home-carousel/hum-sab-diwali-218.webp",
		"/assets/home-carousel/hum-sab-diwali-252.webp",
		"/assets/home-carousel/hum-sab-diwali-282.webp",
	]

	return (
		<Carousel
			className="w-full h-auto"
			opts={{
				align: "start",
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 2000,
				}),
			]}
		>
			<CarouselContent>
				{images.map((src) => (
					<CarouselItem key={src}>
						<img src={src} alt="event pic" className="w-full h-auto" loading="lazy" />
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	)
}
