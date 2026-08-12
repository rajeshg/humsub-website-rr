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
  // Prime Sponsor
  {
    name: "Marius Pharmaceuticals",
    imagePath: "/assets/sponsors/Marius_logo.png",
    level: "prime",
    description: "Marius Pharmaceuticals is the prime sponsor for Hum Sub.",
    href: "/sponsor/marius",
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
  {
    name: "Madhur Mathur and Ashok Mathur",
    imagePath: "/assets/sponsors/madhur_ashok_mathur.png",
    level: "diamond",
    description: "Exclusive fireworks sponsor",
    label: "Fireworks Sponsor",
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
  {
    name: "CRS Marble & Granite",
    imagePath: "/assets/sponsors/logo_crs.jpg",
    level: "gold",
    description: "Exclusive sponsor for Shuttle Service",
    href: "https://crsgranite.com/",
    label: "Shuttle Sponsor",
  },
  {
    name: "Sajjan Agarwal",
    imagePath: "/assets/sponsors/sajjan-agarwal-logo.png",
    level: "gold",
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
  {
    name: "Wake Dental Arts",
    imagePath: ["/assets/sponsors/wake-dental-arts.jpeg", "/assets/sponsors/cary-dental-arts.jpeg"],
    level: "small-business-supporter",
    href: "https://wakedentalarts.com/",
  },
]

// Utility function to get sponsors by level - more efficient than maintaining a separate structure
export function getSponsorsByLevel(level: SponsorLevel): Sponsor[] {
  return sponsors.filter((sponsor) => sponsor.level === level)
}
