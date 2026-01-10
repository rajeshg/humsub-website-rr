import ImageCarousel from "./image-carousel"

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
    <ImageCarousel
      slides={images.map((src) => ({
        src,
        alt: "event pic",
      }))}
    />
  )
}
