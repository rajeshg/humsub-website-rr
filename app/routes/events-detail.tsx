import { Icon } from "@iconify-icon/react"
import { Link, Outlet, redirect } from "react-router"
import blogCss from "~/blog.css?url"
import { Button } from "~/components/ui/button"
import { getEventBySlug } from "~/events.server"
import type { Route } from "./+types/events-detail"

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const path = url.pathname.split("/").pop()

  // Handle redirects for specific events
  const redirects: Record<string, string> = {
    "diwali-2025": "/hum-sub-diwali-2025",
    // Add more redirects here as needed
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

  // Create description from location and date
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
  const { startDateISO, endDateISO, dateRangeUserFriendly } = event.frontmatter

  return (
    <>
      <div className="mb-4">
        <Link to="/events">
          <Button size="lg" variant="outline">
            <Icon icon="mdi:arrow-left" className="mr-2" />
            View all events
          </Button>
        </Link>
      </div>
      <link href={blogCss} rel="stylesheet" />
      <h1>{event.frontmatter?.title}</h1>
      <section className="flex flex-col flex-wrap gap-2 md:gap-4 md:mx-auto text-center not-prose rounded-lg bg-base-200/50 dark:bg-slate-800/70 p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <a
            href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.frontmatter?.title || "")}
							&dates=${startDateISO?.replaceAll(/[-:]/g, "")}/${endDateISO?.replaceAll(/[-:]/g, "")}
							&location=${encodeURIComponent(event.frontmatter?.location || "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-5"
          >
            <Button size={"sm"} variant="outline">
              <Icon icon="mdi:calendar" />
            </Button>
          </a>
          <span>{dateRangeUserFriendly}</span>
        </div>

        {event.frontmatter?.location && (
          <div className="flex items-center gap-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${event.frontmatter.location}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-5"
            >
              <Button size={"sm"} variant="outline">
                <Icon icon="mdi:map-check-outline" />
              </Button>
            </a>
            {event.frontmatter.location ? <span>{event.frontmatter.location}</span> : null}
          </div>
        )}
      </section>
      <img src={event.frontmatter?.image} alt={event.frontmatter?.title || "Event Image"} />
      <Outlet />
    </>
  )
}
