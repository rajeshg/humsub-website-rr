export type SponsorLevel =
  | "prime"
  | "diamond"
  | "gold"
  | "silver"
  | "bronze"
  | "media"
  | "grantor"
  | "partner"
  | "small-business-supporter"

export interface Sponsor {
  name: string
  imagePath: string | string[]
  level: SponsorLevel
  description?: string
  href?: string
  label?: string
}

// Flat, ordered list for carousel and general use
export const sponsors: Sponsor[] = [
  // Prime Sponsors (personal)
  {
    name: "Himanshu & Parul Shah",
    imagePath: "/assets/sponsors/himanshu-parul-shah.png",
    level: "prime",
    description: "Our prime sponsors for Hum Sub Diwali 2026.",
    label: "Prime Sponsor",
  },

  // Diamond Sponsors
  {
    name: "SAM IT Solutions",
    imagePath: "/assets/sponsors/sam-it-solutions-logo.png",
    level: "diamond",
    href: "https://samitsolutions.com/",
  },
  {
    name: "Coastal Credit Union",
    imagePath: "/assets/sponsors/coastal-logo.png",
    level: "diamond",
    description: "Exclusive sponsor for Youth achievement award",
    href: "https://www.coastal24.com/",
    label: "Youth Achievement Award Sponsor",
  },
  // Gold Sponsors
  {
    name: "Pinnacle Financial Partners",
    imagePath: "/assets/sponsors/pinnacle-financial-partners-color.jpg",
    level: "gold",
    description: "Exclusive sponsor for Exhibition Booth",
    href: "https://www.pnfp.com/",
    label: "Exhibition Booth Sponsor",
  },
  {
    name: "Raj Jewels",
    imagePath: "/assets/sponsors/raj-jewels-logo.jpeg",
    level: "gold",
    href: "https://www.rajjewels.com/",
  },
  {
    name: "PNC Bank",
    imagePath: "/assets/sponsors/pnc_bank_logo.jpg",
    level: "gold",
    href: "https://www.pnc.com/",
  },
  // Silver Sponsors
  {
    name: "First Bank",
    imagePath: "/assets/sponsors/first_bank_logo.jpg",
    level: "silver",
    href: "https://localfirstbank.com/",
  },
  {
    name: "Cornerstone Pediatric and Adolescent Medicine",
    imagePath: "/assets/sponsors/cornerstone-pediatrics.png",
    level: "silver",
    href: "https://cornerstonepediatrics.org/",
  },
  {
    name: "Lune Spark",
    imagePath: "/assets/sponsors/lune-spark.jpg",
    level: "silver",
    description:
      "Lune Spark Center for Creativity is an arts center offering classes and camps in art, music, drama, filmmaking and more, with locations in Apex, Chapel Hill and Holly Springs.",
    href: "https://www.lunespark.com/",
  },
  {
    name: "Foley Orthodontics",
    imagePath: "/assets/sponsors/foley-orthodontics.png",
    level: "silver",
    description:
      "Board-certified Cary orthodontist Dr. John Foley provides braces and Invisalign care for patients of all ages, with the latest in orthodontic technology.",
    href: "https://foleyorthodontics.com/",
  },
  {
    name: "Growing Smiles Pediatric Dentistry",
    imagePath: "/assets/sponsors/growing-smiles.jpg",
    level: "silver",
    href: "http://growingsmilesnc.com/",
  },

  // Bronze Sponsors

  {
    name: "Sudha and Satpal Rathie",
    imagePath: "/assets/sponsors/sudha-satpal-rathie.png",
    level: "bronze",
  },
  // Media Partners
  // Grantors
  {
    name: "Town of Cary, NC",
    imagePath: "/assets/sponsors/town-of-cary-logo.png",
    level: "grantor",
    href: "https://www.carync.gov/",
  },
  {
    name: "United Arts - Wake County",
    imagePath: "/assets/sponsors/uac-logo.png",
    level: "grantor",
    description:
      "Hum Sub is supported by the United Arts Wake County as well as the N.C. Arts Council, a division of the Department of Natural and Cultural Resources.",
    href: "https://unitedarts.org/",
  },
  {
    name: "Lazy Daze Festival, Cary",
    imagePath: "/assets/sponsors/lazy-daze.jpg",
    level: "grantor",
    href: "https://www.carync.gov/recreation-enjoyment/events/festivals/lazy-daze-arts-and-crafts-festival",
  },
  {
    name: "North Carolina Arts Council",
    imagePath: "/assets/sponsors/NCAC-color2.jpg",
    level: "grantor",
    href: "https://www.ncarts.org/",
  },

  // Partners
  // Small business supporter
]

// Utility function to get sponsors by level - more efficient than maintaining a separate structure
export function getSponsorsByLevel(level: SponsorLevel): Sponsor[] {
  return sponsors.filter((sponsor) => sponsor.level === level)
}

// How long each sponsor stays on screen in the small corner rotation, by level.
// These are deliberately short - the logo is glanceable and the rotation should keep moving.
export const SPONSOR_DISPLAY_SECONDS: Record<SponsorLevel, number> = {
  prime: 5,
  diamond: 5,
  gold: 4,
  silver: 3,
  bronze: 2,
  media: 2,
  grantor: 3,
  partner: 2,
  "small-business-supporter": 2,
}

// How long the large full-screen slides stay up, tapered from the top tiers down.
// Longer than the corner rotation: there is a logo plus a level and description to
// read, and it is being read from across a room.
export const FILLER_SLIDE_SECONDS: Record<SponsorLevel, number> = {
  prime: 10,
  diamond: 10,
  gold: 8,
  silver: 7,
  grantor: 7,
  bronze: 6,
  media: 6,
  partner: 6,
  "small-business-supporter": 6,
}

// Special slides that carry more information than a single sponsor logo
export const FILLER_WELCOME_SECONDS = 10
export const FILLER_GRANTORS_SECONDS = 8
export const FILLER_PROMO_SECONDS = 12
export const FILLER_FALLBACK_SECONDS = 8

export const slugifySponsorName = (name: string): string =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

// Duration for an idle filler slide, derived from its filename:
// HD2026-sponsor-<slug>.png -> that sponsor's level, plus the special slides.
export function getFillerSlideDurationSeconds(path: string): number {
  const base = path.split("/").pop() ?? ""
  if (base.startsWith("HD2026-prime-sponsors")) return FILLER_SLIDE_SECONDS.prime
  if (base.startsWith("HD2026-grantors")) return FILLER_GRANTORS_SECONDS
  if (base.startsWith("HD2026-welcome")) return FILLER_WELCOME_SECONDS
  // Promo flyers (TGT, theme music competition) are text-heavy, so they get the most time
  if (base.startsWith("HD2026-promo-")) return FILLER_PROMO_SECONDS
  const match = /^HD2026-sponsor-(.+)\.\w+$/.exec(base)
  if (match) {
    const sponsor = sponsors.find((s) => slugifySponsorName(s.name) === match[1])
    if (sponsor) return FILLER_SLIDE_SECONDS[sponsor.level]
  }
  return FILLER_FALLBACK_SECONDS
}
