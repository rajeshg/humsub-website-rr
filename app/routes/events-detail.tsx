import { Calendar, MapPin, ArrowLeft } from "lucide-react"
import { Link, Outlet, redirect } from "react-router"
import blogCss from "~/blog.css?url"
import { getEventBySlug } from "~/events.server"
import type { Route } from "./+types/events-detail"

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const path = url.pathname.split("/").pop()

  // Handle redirects for specific events
  const redirects: Record<string, string> = {
    "diwali-2025": "/hum-sub-diwali-2025",
  }
  if (path && redirects[path]) {
    return redirect(redirects[path], { status: 301 })
  }

  if (!path) {
    throw new Response("Not Found", { status: 404 })
  }

  const event = await getEventBySlug(path)
  if (!event || !event.frontmatter) {
    throw new Response("Not Found", { status: 404 })
  }
  return { event }
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  return await serverLoader()
}

export function meta({ params, data }: Route.MetaArgs) {
  const { event } = data
  const { title, dateRangeUserFriendly, location } = event.frontmatter || {}

  const description = `${title}. ${location}. ${dateRangeUserFriendly}. Join us for this exciting Hum Sub event.`

  const ogUrl = new URL("https://humsub.org/api/og")
  if (title) ogUrl.searchParams.set("title", title)
  if (dateRangeUserFriendly) ogUrl.searchParams.set("date", dateRangeUserFriendly)
  if (location) ogUrl.searchParams.set("location", location)

  const eventUrl = `https://humsub.org/event/${(params as { slug?: string }).slug || ""}`

  return [
    { title: `${title} | Hum Sub` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | Hum Sub` },
    { property: "og:description", content: description },
    { property: "og:image", content: ogUrl.toString() },
    { property: "og:url", content: eventUrl },
    { property: "og:type", content: "event" },
  ]
}

export default function EventsDetail({ loaderData }: Route.ComponentProps) {
  const { event } = loaderData
  const { startDateISO, endDateISO, dateRangeUserFriendly, title, location, image } = event.frontmatter

  return (
    <div className="max-w-6xl mx-auto sm:px-6 py-6 md:py-10">
      <nav className="mb-2 md:mb-6 px-4 sm:px-0">
        <Link
          to="/events"
          className="group inline-flex items-center text-[10px] md:text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="mr-0.5 w-3 h-3 transition-transform group-hover:-translate-x-1" />
          Back to all events
        </Link>
      </nav>

      <link href={blogCss} rel="stylesheet" />

      <header className="mb-6 px-4 sm:px-0">
        <h1 className="text-3xl md:text-5xl font-black text-primary tracking-tight mb-4 uppercase italic">{title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 not-prose">
          <div className="flex items-center gap-4 bg-primary/5 rounded-2xl p-4 border border-primary/10 shadow-sm transition-all hover:bg-primary/10">
            <a
              href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title || "")}
                 &dates=${startDateISO?.replaceAll(/[-:]/g, "")}/${endDateISO?.replaceAll(/[-:]/g, "")}
                 &location=${encodeURIComponent(location || "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Calendar className="w-6 h-6 md:w-7 h-7 text-primary hover:scale-110 transition-transform" />
            </a>
            <div>
              <p className="text-[10px] md:text-xs uppercase font-black text-primary/40 tracking-widest mb-0.5 leading-none">
                Date & Time
              </p>
              <p className="font-bold text-sm md:text-lg leading-tight text-foreground">{dateRangeUserFriendly}</p>
            </div>
          </div>

          {location && (
            <div className="flex items-center gap-4 bg-primary/5 rounded-2xl p-4 border border-primary/10 shadow-sm transition-all hover:bg-primary/10">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <MapPin className="w-6 h-6 md:w-7 h-7 text-primary hover:scale-110 transition-transform" />
              </a>
              <div>
                <p className="text-[10px] md:text-xs uppercase font-black text-primary/40 tracking-widest mb-0.5 leading-none">
                  Location
                </p>
                <p className="font-bold text-sm md:text-lg leading-tight text-foreground">{location}</p>
              </div>
            </div>
          )}
        </div>
      </header>

      <figure className="mb-10 -mx-4 sm:mx-0 sm:rounded-3xl overflow-hidden border-y sm:border bg-muted/5 flex items-center justify-center shadow-2xl">
        <img
          src={image}
          alt={title || "Event Image"}
          className="w-full h-auto object-contain max-h-[500px] md:max-h-[800px]"
        />
      </figure>

      <article className="px-4 sm:px-0 prose prose-lg dark:prose-invert max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:underline">
        <Outlet />
      </article>
    </div>
  )
}
