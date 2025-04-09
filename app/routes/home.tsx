import { Welcome } from "~/components/welcome"
import { getBindings } from "~/middleware/bindings.server"
import { getStore } from "~/middleware/store.client"

import { dateFormatter } from "~/lib/utils"
import type { Route } from "./+types/home"
import { type Event, getAllEvents } from "./events-home"

export async function loader({ context }: Route.LoaderArgs) {
	const { KV } = getBindings(context)
	const rawValue = await KV.get("upcomingEvents")
	let value = rawValue ? (JSON.parse(rawValue) as Event[]) : []

	if (!value || value.length === 0) {
		const events = await getAllEvents()
		const upcomingEvents = events
			.filter((event) => new Date(event.frontmatter.startDate) >= new Date())
			.sort((a, b) => new Date(a.frontmatter.startDate).getTime() - new Date(b.frontmatter.startDate).getTime())
			.slice(0, 3)
		for (const event of upcomingEvents) {
			event.frontmatter.startDate = dateFormatter(event.frontmatter.startDate)
		}

		value = upcomingEvents
		await KV.put("upcomingEvents", JSON.stringify(value), {
			expirationTtl: 60 * 60 * 24, // 1 day
		})
	}

	return { upcomingEvents: value }
}

export async function clientLoader({ serverLoader, context }: Route.ClientLoaderArgs) {
	const store = getStore(context)
	if (store.has("upcomingEvents")) return { upcomingEvents: store.get("upcomingEvents") as Event[] }
	const serverData = await serverLoader()
	store.set("upcomingEvents", serverData.upcomingEvents)
	return serverData
}

export default function Home({ loaderData }: Route.ComponentProps) {
	if (!loaderData.upcomingEvents) {
		return <div>Loading...</div>
	}
	const upcomingEvents = loaderData.upcomingEvents
	return <Welcome events={upcomingEvents} />
}
