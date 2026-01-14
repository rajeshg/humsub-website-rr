import { Link } from "react-router"
import EventCard from "~/components/event-card"
import { getAllEvents } from "~/events.server"
import type { Route } from "./+types/events-home"
import { Calendar, History } from "lucide-react"

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      <title>Events | Hum Sub</title>

      {/* Page Header Area */}
      <div className="mb-10 border-b border-primary/10 pb-6">
        <h1 className="text-4xl md:text-5xl font-black mb-3 text-primary tracking-tight uppercase italic">Events</h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Celebrating Indian culture and heritage in the Triangle area through our flagship events.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-xs font-black uppercase tracking-[0.2em]">
          <Link
            to="/events/diwali"
            className="text-primary/60 hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary"
          >
            Diwali
          </Link>
          <Link
            to="/events/holi"
            className="text-primary/60 hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary"
          >
            Holi
          </Link>
          <Link
            to="/events/basant-bahar"
            className="text-primary/60 hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary"
          >
            Basant Bahar
          </Link>
          <Link
            to="/events/exhibition"
            className="text-primary/60 hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary"
          >
            Exhibition
          </Link>
        </div>
      </div>

      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8 border-b border-primary/5 pb-4">
          <Calendar className="w-6 h-6 md:w-7 h-7 text-primary" />
          <h2 className="text-xl md:text-3xl font-black text-primary uppercase tracking-tight leading-none">
            Upcoming Events
          </h2>
        </div>
        {loaderData.upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="bg-muted/5 rounded-3xl p-12 text-center border border-dashed border-muted/30">
            <Calendar className="w-16 h-16 text-muted/20 mx-auto mb-4" />
            <p className="text-xl text-muted-foreground font-bold">No upcoming events scheduled right now.</p>
          </div>
        )}
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-4 mb-8 border-b border-muted/10 pb-4">
          <History className="w-6 h-6 md:w-7 h-7 text-muted-foreground" />
          <h2 className="text-xl md:text-2xl font-black text-muted-foreground uppercase tracking-tight leading-none">
            Past Events
          </h2>
        </div>
        {loaderData.pastEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 opacity-90 transition-all duration-500">
            {loaderData.pastEvents.slice(0, 8).map((event) => (
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
          <p className="text-muted-foreground italic text-lg font-medium">No past events recorded.</p>
        )}
      </section>
    </div>
  )
}
