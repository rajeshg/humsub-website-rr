import { parseEventDates, parseLocalDate } from "./lib/datetime"

export type Frontmatter = {
	slug: string
	title: string
	location: string
	"start-date": string // YYYY-MM-DD HH:mm or YYYY-MM-DD
	"end-date"?: string // YYYY-MM-DD HH:mm or YYYY-MM-DD
	image: string

	// these are not in the frontmatter but are added later while parsing the mdx file
	startDateISO?: string
	endDateISO?: string
	startDateUserFriendly?: string
	endDateUserFriendly?: string
	dateRangeUserFriendly?: string
}

export type EventMeta = {
	slug: string
	frontmatter: Frontmatter
}

// Cache for events to avoid repeated imports
let cachedEvents: EventMeta[] | null = null

async function initializeEvents(): Promise<EventMeta[]> {
	if (cachedEvents) {
		return cachedEvents
	}

	try {
		// Use Vite's import.meta.glob to find all MDX files in the content/events directory
		const eventFiles = import.meta.glob("/app/content/events/*.mdx", { eager: true })
		const allEvents = Object.entries(eventFiles).map(([path, module]) => ({
			slug: path.replace("/app/content/events/", "").replace(".mdx", ""),
			frontmatter: (module as { frontmatter?: Frontmatter }).frontmatter,
		}))
		for (const event of allEvents) {
			if (event.frontmatter) {
				const parsedDates = parseEventDates(event.frontmatter)
				event.frontmatter.startDateISO = parsedDates.startDateISO
				event.frontmatter.endDateISO = parsedDates.endDateISO
				event.frontmatter.dateRangeUserFriendly = parsedDates.dateRangeUserFriendly
				// Also compute user-friendly individual dates for backward compatibility
				if (event.frontmatter.startDateISO) {
					event.frontmatter.startDateUserFriendly = parseLocalDate(event.frontmatter["start-date"]).dateTimeUserFriendly
				}
				if (event.frontmatter.endDateISO) {
					event.frontmatter.endDateUserFriendly = parseLocalDate(
						event.frontmatter["end-date"] as string
					).dateTimeUserFriendly
				}
			}
		}

		cachedEvents = allEvents.filter((event): event is EventMeta => event.frontmatter !== undefined)
		return cachedEvents
	} catch (error) {
		console.error("Error loading events:", error)
		return []
	}
}

export async function getAllEvents(): Promise<EventMeta[]> {
	return initializeEvents()
}

export async function getEventBySlug(slug: string): Promise<EventMeta | null> {
	const allEvents = await initializeEvents()
	return allEvents.find((event) => event.slug === slug) || null
}
