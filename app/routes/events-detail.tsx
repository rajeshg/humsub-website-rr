import { Icon } from "@iconify-icon/react"
import { preload } from "react-dom"
import { Outlet } from "react-router"
import blogCss from "~/blog.css?url"
import { Button } from "~/components/ui/button"
import { dateRangeFormatter, parseFrontmatterDate } from "~/lib/utils"
import type { Route } from "./+types/events-detail"
import type { Event } from "./events-home"

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url)
	const path = url.pathname.split("/").pop()
	const event = (await import(`../content/events/${path}.mdx`)) as Event
	if (event.frontmatter?.startDate) {
		const parsedDate = parseFrontmatterDate(event.frontmatter.startDate)
		if (parsedDate) event.frontmatter.startDate = parsedDate.toISOString()
		else console.warn(`Invalid start date format in ${path}:`, event.frontmatter.startDate, parsedDate)
	}
	if (event.frontmatter?.endDate) {
		const parsedDate = parseFrontmatterDate(event.frontmatter.endDate)
		if (parsedDate) event.frontmatter.endDate = parsedDate.toISOString()
		else console.warn(`Invalid end date format in ${path}:`, event.frontmatter.endDate, parsedDate)
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
	const { startDate, endDate } = event.frontmatter || {}

	return (
		<>
			<link href={blogCss} rel="stylesheet" />
			<h1>{event.frontmatter?.title}</h1>
			<section className="flex flex-col flex-wrap gap-2 md:gap-4 md:mx-auto text-center not-prose rounded-lg bg-base-200/50 dark:bg-slate-800/70 p-4 shadow-sm">
				<div className="flex items-center gap-2">
					<a
						href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${
							event.frontmatter?.title
						}&dates=${startDate?.replaceAll(/[-:]/g, "").slice(0, 8)}/${endDate?.replaceAll(/[-:]/g, "").slice(0, 8)}&details=${event.frontmatter?.description}&location=${event.frontmatter?.location}`}
						target="_blank"
						rel="noopener noreferrer"
						className="ml-5"
					>
						<Button size={"sm"} variant="outline">
							<Icon icon="mdi:calendar" />
						</Button>
					</a>
					<span>{dateRangeFormatter(startDate, endDate)}</span>
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
