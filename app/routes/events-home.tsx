import EventCard from "~/components/event-card"
import { parseFrontmatterDate } from "~/lib/utils"
import type { Route } from "./+types/events-home"

export type Event = {
	slug: string
	// biome-ignore lint/suspicious/noExplicitAny: frontmatter is any type
	frontmatter?: Record<string, any>
}
export async function getAllEvents() {
	const events = []

	try {
		// Use Vite's import.meta.glob to find all MDX files in the content/events directory
		const eventFiles = import.meta.glob("/app/content/events/*.mdx", { eager: true })

		// Process each event file
		for (const [filePath, module] of Object.entries(eventFiles)) {
			try {
				// Extract the frontmatter from the module
				// biome-ignore lint/suspicious/noExplicitAny: frontmatter is any type
				const frontmatter = (module as { frontmatter?: Record<string, any> }).frontmatter || {}

				if (frontmatter?.startDate) {
					const parsedDate = parseFrontmatterDate(frontmatter.startDate)
					if (parsedDate) frontmatter.startDate = parsedDate
					else console.warn(`Invalid start date format in ${filePath}:`, frontmatter.startDate, parsedDate)
				}
				if (frontmatter?.endDate) {
					const parsedDate = parseFrontmatterDate(frontmatter.endDate)
					if (parsedDate) frontmatter.endDate = parsedDate
					else console.warn(`Invalid end date format in ${filePath}:`, frontmatter.endDate, parsedDate)
				}

				// Get slug from filename (remove path and extension)
				const slug = filePath.replace("/app/content/events/", "").replace(".mdx", "")

				events.push({
					slug,
					frontmatter,
					// Include other properties if needed
				})
			} catch (err) {
				console.error(`Error processing file ${filePath}:`, err)
			}
		}
	} catch (error) {
		console.error("Error loading events:", error)
	}
	return events
}
export async function loader() {
	const events = await getAllEvents()
	const now = new Date()
	const upcomingEvents = events.filter((event) => new Date(event.frontmatter.startDate) >= now)
	// Sort upcoming events by start date ascending
	upcomingEvents.sort(
		(a, b) => new Date(a.frontmatter.startDate).getTime() - new Date(b.frontmatter.startDate).getTime()
	)
	const pastEvents = events.filter((event) => new Date(event.frontmatter.startDate) < now)
	// Sort past events by start date descending
	pastEvents
		.sort((a, b) => new Date(b.frontmatter.startDate).getTime() - new Date(a.frontmatter.startDate).getTime())
		.slice(0, 5)

	// Return all future events and Limit past events to the last 5
	return { upcomingEvents, pastEvents: pastEvents.slice(0, 5) }
}

export default function EventsHome({ loaderData }: Route.ComponentProps) {
	return (
		<div>
			<title>Events | Hum Sub</title>
			<h1>Events</h1>
			<section className="mb-16">
				<h2>Upcoming Events</h2>
				{loaderData.upcomingEvents.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{loaderData.upcomingEvents.map((event) => (
							<EventCard
								key={event.slug}
								title={event.frontmatter.title}
								slug={event.slug}
								location={event.frontmatter.location}
								startDate={event.frontmatter.startDate}
								endDate={event.frontmatter.endDate}
								isPast={false}
								imageUrl={event.frontmatter.image}
							/>
						))}
					</div>
				) : (
					<p>No upcoming events.</p>
				)}
			</section>

			<section>
				<h2>Past Events</h2>
				{loaderData.pastEvents.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{loaderData.pastEvents.map((event) => (
							<EventCard
								key={event.slug}
								title={event.frontmatter.title}
								slug={event.slug}
								location={event.frontmatter.location}
								startDate={event.frontmatter.startDate}
								endDate={event.frontmatter.endDate}
								isPast={false}
								imageUrl={event.frontmatter.image}
							/>
						))}
					</div>
				) : (
					<p>No past events.</p>
				)}
			</section>
		</div>
	)
}
