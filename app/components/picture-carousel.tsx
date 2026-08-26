import ImageCarousel from "./image-carousel"

export function PictureCarousel() {
  const images = [
    { src: "/assets/home-carousel/bb2026-1.jpg", alt: "Basant Bahar 2026" },
    { src: "/assets/home-carousel/bb2026-2.jpg", alt: "Basant Bahar 2026" },
    { src: "/assets/home-carousel/bb2026-3.jpg", alt: "Basant Bahar 2026" },
    { src: "/assets/home-carousel/bb2026-4.jpg", alt: "Basant Bahar 2026" },
    { src: "/assets/home-carousel/hd2025-1.jpg", alt: "Diwali 2025" },
    { src: "/assets/home-carousel/hd2025-2.jpg", alt: "Diwali 2025" },
    { src: "/assets/home-carousel/hd2025-3.jpg", alt: "Diwali 2025" },
    { src: "/assets/home-carousel/hd2025-4.jpg", alt: "Diwali 2025" },
    { src: "/assets/home-carousel/bb2024-1.webp", alt: "Basant Bahar 2024" },
    { src: "/assets/home-carousel/hd2024-1.webp", alt: "Diwali 2024" },
  ]

  return <ImageCarousel slides={images} />
}
