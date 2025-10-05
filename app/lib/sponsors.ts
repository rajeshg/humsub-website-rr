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
		name: "Empowerly",
		imagePath: "/assets/sponsors/empowerly.png",
		level: "diamond",
		description: "Education partner and exclusive sponsor for our Essay Competition.",
		href: "/sponsor/empowerly",
		label: "Education partner",
	},
	{
		name: "Publix Super Markets",
		imagePath: "/assets/sponsors/publix.png",
		level: "diamond",
		href: "https://www.publix.com/",
	},
	{
		name: "Madhur Mathur and Ashok Mathur",
		imagePath: "/assets/sponsors/madhur_ashok_mathur.png",
		level: "diamond",
		description: "Exclusive fireworks sponsor",
		label: "Fireworks Sponsor",
	},
	{
		name: "BMW of Southpoint",
		imagePath: "/assets/sponsors/BMW-joint-new-logo.png",
		level: "diamond",
		href: "https://www.bmwsouthpoint.com/",
	},

	// Gold Sponsors
	{
		name: "Lufthansa Airlines",
		imagePath: "/assets/sponsors/logo-lufthansa.png",
		level: "gold",
		description: "Exclusive Travel Partner",
		href: "https://www.lufthansa.com/us/en/homepage",
		label: "Travel Partner",
	},
	{
		name: "Pinnacle Financial Partners",
		imagePath: "/assets/sponsors/pinnacle-financial-partners-color.jpg",
		level: "gold",
		description: "Exclusive sponsor for Exhibition Booth",
		href: "https://www.pnfp.com/",
		label: "Exhibition Booth Sponsor",
	},
	{
		name: "The Pratt Villas",
		imagePath: "/assets/sponsors/the-pratt-villas-logo.jpeg",
		level: "gold",
		description:
			"Hospitality Partner generously sponsoring accommodations and hosting our artists and guests at HumSub Diwali.",
		href: "/sponsor/the-pratt-villas",
		label: "Hospitality Partner",
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
		name: "Khara Orthodontics",
		imagePath: "/assets/sponsors/khara.webp",
		level: "silver",
		href: "https://www.kharabraces.com/",
	},

	// Bronze Sponsors

	{
		name: "Sudha and Satpal Rathie",
		imagePath: "/assets/sponsors/sudha-satpal-rathie.png",
		level: "bronze",
	},
	{
		name: "Lime & Lemon Indian Grill & Bar",
		imagePath: "/assets/sponsors/lime-n-lemon-grill.jpeg",
		level: "bronze",
		href: "https://www.lnlrestaurant.com/",
	},
	// Media Partners
	{
		name: "Radio Nyra",
		imagePath: "/assets/sponsors/Radio-Nyra-logo.jpeg",
		level: "media",
		href: "https://radionyra.com/",
		label: "Media Partner",
	},

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
