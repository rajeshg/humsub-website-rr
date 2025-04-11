import { Icon } from "@iconify-icon/react"
import { preload } from "react-dom"
import { Link, Outlet } from "react-router"
import blogCss from "~/blog.css?url"
import { Button } from "~/components/ui/button"
import { dateRangeFormatter, toISODateStringFromLocalEasternDateString } from "~/lib/utils"
import type { Route } from "./+types/events-detail"
import type { Event } from "./events-home"

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url)
	const path = url.pathname.split("/").pop()
	const event = (await import(`../content/events/${path}.mdx`)) as Event
	if (event.frontmatter?.["start-date"]) {
		event.frontmatter.startDateISO = toISODateStringFromLocalEasternDateString(event.frontmatter["start-date"])
	}
	if (event.frontmatter?.["end-date"]) {
		event.frontmatter.endDateISO = event.frontmatter["end-date"]
			? toISODateStringFromLocalEasternDateString(event.frontmatter["end-date"])
			: null
	}
	if (!event) {
		throw new Response("Not Found", { status: 404 })
	}
	return { event }
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
	preload(blogCss, { as: "style" })
	return await serverLoader()
}

export function meta({ params, data }: Route.MetaArgs) {
	const { event } = data
	const { title, image } = event.frontmatter || {}

	return [
		{ title },
		{ property: "og:title", content: `${title} | Hum Sub` },
		{ property: "og:image", content: `https://humsub-website-rr.socialmedia-6ce.workers.dev/${image}` },
		{ property: "og:url", content: `https://humsub-website-rr.socialmedia-6ce.workers.dev/event/${params.slug}` },
	]
}

export default function EventsDetail({ loaderData }: { loaderData: { event: Event } }) {
	const { event } = loaderData
	const { startDateISO, endDateISO } = event.frontmatter || {}

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
							&details=${encodeURIComponent(event.frontmatter?.description || "")}
							&location=${encodeURIComponent(event.frontmatter?.location || "")}`}
						target="_blank"
						rel="noopener noreferrer"
						className="ml-5"
					>
						<Button size={"sm"} variant="outline">
							<Icon icon="mdi:calendar" />
						</Button>
					</a>
					<span>{dateRangeFormatter(startDateISO, endDateISO)}</span>
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
