import type { Route } from "./+types/events-home";
import EventCard from "~/components/event-card";

export type Event = {
    slug: string;
    frontmatter?: Record<string, any>;
}
export async function getAllEvents() {
    const events = [];

    try {
        // Use Vite's import.meta.glob to find all MDX files in the content/events directory
        const eventFiles = import.meta.glob('/app/content/events/*.mdx', { eager: true });

        // Process each event file
        for (const [filePath, module] of Object.entries(eventFiles)) {
            try {
                // Extract the frontmatter from the module
                const frontmatter = (module as { frontmatter?: Record<string, any> }).frontmatter || {};

                // Get slug from filename (remove path and extension)
                const slug = filePath
                    .replace('/app/content/events/', '')
                    .replace('.mdx', '');

                events.push({
                    slug,
                    frontmatter,
                    // Include other properties if needed
                });
            } catch (err) {
                console.error(`Error processing file ${filePath}:`, err);
            }
        }
    } catch (error) {
        console.error("Error loading events:", error);
    }
    return events;
}
export async function loader() {
    const events = await getAllEvents();
    const now = new Date();
    const upcomingEvents = events.filter(event => new Date(event.frontmatter.startDate) >= now);
    // Sort upcoming events by start date ascending
    upcomingEvents.sort((a, b) => new Date(a.frontmatter.startDate).getTime() - new Date(b.frontmatter.startDate).getTime());
    const pastEvents = events.filter(event => new Date(event.frontmatter.startDate) < now);
    // Sort past events by start date descending
    pastEvents.sort((a, b) => new Date(b.frontmatter.startDate).getTime() - new Date(a.frontmatter.startDate).getTime());

    return { upcomingEvents, pastEvents };
}

export function dateRangeFormatter(start: string, end?: string) {
    let startDate = new Date(start);
    let endDate = end ? new Date(end) : undefined;
	try {
		const formatter = new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});

		// Check if formatRange is supported
		if (!endDate) {
			return formatter.format(startDate);
		}
		if (typeof formatter.formatRange === "function" && endDate) {
			return formatter.formatRange(startDate, endDate);
		}
		// Fallback: Format start and end dates separately
		return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
	} catch (error) {
		// Fallback for any parsing errors
		return `${startDate.toString()} - ${endDate ? endDate.toString() : "N/A"}`;
	}
}


export default function EventsHome({ loaderData }: Route.ComponentProps) {
    return (
        <div>
            <title>Events | Hum Sub</title>
            <h1 className="text-4xl font-bold mb-4">Events</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                A collection of articles about React Router, web development, and
                modern web architecture.
            </p>

            <section className="mb-16">
                <h2 className="text-3xl font-semibold mb-6">Upcoming Events</h2>
                {loaderData.upcomingEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loaderData.upcomingEvents.map((event) => (
                                <EventCard key={event.slug} title={event.frontmatter.title} slug={event.slug} location={event.frontmatter.location} startDate={new Date(event.frontmatter.startDate)} endDate={event.frontmatter.endDate} isPast={false} imageUrl={event.frontmatter.image} />
                            ))}
                        </div>
                    ) : (
                        <p>No upcoming events.</p>
                    )}
            </section>

            <section>
                <h2 className="text-3xl font-semibold mb-6">Past Events</h2>
                {loaderData.pastEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loaderData.pastEvents.map((event) => (
                            <EventCard key={event.slug} title={event.frontmatter.title} slug={event.slug} location={event.frontmatter.location} startDate={new Date(event.frontmatter.startDate)} endDate={event.frontmatter.endDate} isPast={false} imageUrl={event.frontmatter.image} />
                        ))}
                    </div>
                ) : (
                    <p>No past events.</p>
                )}
            </section>
        </div>
    )
}
