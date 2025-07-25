import { Link } from "react-router"
import EventCard from "~/components/event-card"
import { Button } from "~/components/ui/button"
import { getAllEvents } from "~/events.server"
import type { Route } from "./+types/events-home"

export async function loader() {
	const events = await getAllEvents()
	const now = new Date()
	const upcomingEvents = events.filter((event) => new Date(event.frontmatter["start-date"]) >= now)
	// Sort upcoming events by start date ascending
	upcomingEvents.sort(
		(a, b) => new Date(a.frontmatter["start-date"]).getTime() - new Date(b.frontmatter["start-date"]).getTime()
	)
	const pastEvents = events.filter((event) => new Date(event.frontmatter["start-date"]) < now)
	// Sort past events by start date descending
	pastEvents
		.sort((a, b) => new Date(b.frontmatter["start-date"]).getTime() - new Date(a.frontmatter["start-date"]).getTime())
		.slice(0, 5)

	// Return all future events and Limit past events to the last 5
	return { upcomingEvents, pastEvents: pastEvents.slice(0, 5) }
}

export default function EventsHome({ loaderData }: Route.ComponentProps) {
	return (
		<div>
			<title>Events | Hum Sub</title>
			<h1>Events</h1>
			{/* Discover India Series Link */}
			<div className="mb-8">
				<div className="flex flex-col md:flex-row gap-6">
					<figure className="not-prose">
						<img
							src="/assets/discover-india-series-2025.jpeg"
							alt="Discover India Series"
							className="w-full md:w-64 object-cover"
						/>
					</figure>
					<div className="mt-0">
						<h2 className="mt-0 text-2xl font-bold">Discover India Series</h2>
						<p className="text-base">
							Year-round event series celebrating India's rich culture and heritage. Click to learn more!
						</p>
						<div className="flex justify-end">
							<Button asChild>
								<Link to="/discover-india-series" className="no-underline">
									Learn More
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
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
								dateRange={event.frontmatter.dateRangeUserFriendly ?? ""}
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
								dateRange={event.frontmatter.dateRangeUserFriendly ?? ""}
								isPast={true}
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
