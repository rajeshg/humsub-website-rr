import { dateRangeFormatter, parseLocalDate } from "./lib/datetime"

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

export async function getAllEvents(): Promise<EventMeta[]> {
	try {
		// Use Vite's import.meta.glob to find all MDX files in the content/events directory
		const eventFiles = import.meta.glob("/app/content/events/*.mdx", { eager: true })
		const allEvents = Object.entries(eventFiles).map(([path, module]) => ({
			slug: path.replace("/app/content/events/", "").replace(".mdx", ""),
			frontmatter: (module as { frontmatter?: Frontmatter }).frontmatter,
		}))
		for (const event of allEvents) {
			if (event.frontmatter) {
				event.frontmatter.startDateISO = parseLocalDate(event.frontmatter["start-date"]).dateTimeISO
				event.frontmatter.endDateISO = event.frontmatter["end-date"]
					? parseLocalDate(event.frontmatter["end-date"]).dateTimeISO
					: undefined
				event.frontmatter.startDateUserFriendly = parseLocalDate(event.frontmatter["start-date"]).dateTimeUserFriendly
				event.frontmatter.endDateUserFriendly = event.frontmatter["end-date"]
					? parseLocalDate(event.frontmatter["end-date"]).dateTimeUserFriendly
					: undefined
				event.frontmatter.dateRangeUserFriendly = dateRangeFormatter(
					event.frontmatter.startDateISO,
					event.frontmatter.endDateISO
				)
			}
		}

		return allEvents.filter((event): event is EventMeta => event.frontmatter !== undefined)
	} catch (error) {
		console.error("Error loading events:", error)
	}
	return []
}
