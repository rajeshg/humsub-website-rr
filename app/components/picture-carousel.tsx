import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "~/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export function PictureCarousel() {
    const images = [
        "/assets/home-carousel/basantbahar24-0303-160300fin2.jpg",
        "/assets/home-carousel/basantbahar24-0303-162119fin2.jpg",
        "/assets/home-carousel/basantbahar24-0303-170353fin2.jpg",
        "/assets/home-carousel/hum-sab-diwali-218.jpg",
        "/assets/home-carousel/hum-sab-diwali-252.jpg",
        "/assets/home-carousel/hum-sab-diwali-282.jpg",
    ];

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
                {images.map((src, index) => (
                    <CarouselItem key={index}>
                        <img
                            src={src}
                            alt={`Image ${index + 1}`}
                            className="w-full h-auto"
                            loading="lazy"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
