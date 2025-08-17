export type SponsorLevel = "prime" | "diamond" | "gold" | "silver" | "bronze" | "media" | "grantor" | "partner"

export interface Sponsor {
	name: string
	imagePath: string
	level: SponsorLevel
	description?: string
	href?: string
}

// Flat, ordered list for carousel and general use
export const sponsors: Sponsor[] = [
	// Prime Sponsor
	{
		name: "Marius Pharmaceuticals",
		imagePath: "/assets/sponsors/Marius_logo.png",
		level: "prime",
		description: "Marius Pharmaceuticals is the prime sponsor for Hum Sub.",
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
	},
	{
		name: "Publix Super Markets",
		imagePath: "/assets/sponsors/publix.png",
		level: "diamond",
		description: "Exclusive fireworks sponsor",
		href: "https://www.publix.com/",
	},

	// Gold Sponsors
	{
		name: "Lufthansa Airlines",
		imagePath: "/assets/sponsors/logo-lufthansa.png",
		level: "gold",
		description: "Exclusive Travel Partner",
		href: "https://www.lufthansa.com/us/en/homepage",
	},
	{
		name: "BMW of Southpoint",
		imagePath: "/assets/sponsors/BMW-joint-new-logo.png",
		level: "gold",
		href: "https://www.bmwsouthpoint.com/",
	},
	{
		name: "Pinnacle Financial Partners",
		imagePath: "/assets/sponsors/pinnacle-financial-partners-color.jpg",
		level: "gold",
		description: "Exclusive sponsor for Exhibition Booth",
		href: "https://www.pnfp.com/",
	},
	{
		name: "Raj Jewels",
		imagePath: "/assets/sponsors/raj-jewels-logo.jpeg",
		level: "gold",
		description: "Exclusive sponsor for Celebrity Dance",
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

	// Bronze Sponsors

	// Media Partners
	{
		name: "Radio Nyra",
		imagePath: "/assets/sponsors/Radio-Nyra-logo.jpeg",
		level: "media",
		href: "https://radionyra.com/",
	},

	// Grantors
	{
		name: "Town of Cary, NC",
		imagePath: "/assets/sponsors/town-of-cary-logo.png",
		level: "grantor",
	},
	{
		name: "United Arts - Wake County",
		imagePath: "/assets/sponsors/uac-logo.png",
		level: "grantor",
		description:
			"Hum Sub is supported by the United Arts Wake County as well as the N.C. Arts Council, a division of the Department of Natural and Cultural Resources.",
	},
	{
		name: "Lazy Daze Festival, Cary",
		imagePath: "/assets/sponsors/lazy-daze.jpg",
		level: "grantor",
	},
	{
		name: "North Carolina Arts Council",
		imagePath: "/assets/sponsors/NCAC-color2.jpg",
		level: "grantor",
	},

	// Partners
	{
		name: "Triangle Nonprofit & Volunteer Leadership Center",
		imagePath: "/assets/sponsors/TNVLC-Logo-no-bg.png",
		level: "partner",
	},
	{
		name: "Cary Ballet Company",
		imagePath: "/assets/sponsors/cary-ballet-company-logo.png",
		level: "partner",
	},
]

// Utility function to get sponsors by level - more efficient than maintaining a separate structure
export function getSponsorsByLevel(level: SponsorLevel): Sponsor[] {
	return sponsors.filter((sponsor) => sponsor.level === level)
}
