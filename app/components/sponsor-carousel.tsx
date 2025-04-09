import Autoplay from "embla-carousel-autoplay"

import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel"

export function SponsorCarousel() {
	const images = [
		"/assets/sponsors/BMW-joint-new-logo.png",
		"/assets/sponsors/Radio-Nyra-logo.png",
		"/assets/sponsors/cary-ballet-company-logo.png",
		"/assets/sponsors/khara.webp",
		"/assets/sponsors/pnc_bank_logo.jpg",
		"/assets/sponsors/sponsor_ncimplant.png",
		"/assets/sponsors/Marius_logo.png",
		"/assets/sponsors/TNVLC-Logo-no-bg.png",
		"/assets/sponsors/coastal-logo.png",
		"/assets/sponsors/lazy-daze.jpg",
		"/assets/sponsors/publix.png",
		"/assets/sponsors/town-of-cary-logo.png",
		"/assets/sponsors/NCAC-color2.jpg",
		"/assets/sponsors/WellsFargo-logo.png",
		"/assets/sponsors/fidelity_investments_logo.jpg",
		"/assets/sponsors/pinnacle-financial-partners-color.jpg",
		"/assets/sponsors/raj-jewels-logo.jpeg",
		"/assets/sponsors/uac-logo.png",
	]

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
				{images.map((src) => (
					<CarouselItem key={src} className="md:basis-1/4 basis-1/2">
						<img src={src} alt="sponsor pic" className="w-full h-48 object-contain" loading="lazy" />
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	)
}
