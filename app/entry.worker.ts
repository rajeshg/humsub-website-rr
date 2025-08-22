import { env } from "cloudflare:workers"
import type { RequestHandler } from "react-router"
import { createRequestHandler, unstable_RouterContextProvider } from "react-router"
import { Counter } from "./counter"

let handler: RequestHandler | null = null
const eventId = "event-dashboard-1"

export default {
	async fetch(request: Request) {
		if (request.url.includes("/api/durable")) {
			const id = env.COUNTER_DO.idFromName(eventId)
			const stub = env.COUNTER_DO.get(id)

			// Forward the request to the Durable Object
			return stub.fetch(request)
		}
		// Dynamically import React Router server build
		// This helps reduce worker init time
		const build = await import("virtual:react-router/server-build")
		// Only create a request handler if `handler` is still null (first request)
		if (handler === null) handler = createRequestHandler(build)

		// Create a new router context for each request
		const context = new unstable_RouterContextProvider()

		// Call the handler with the request and context and return the response
		return await handler(request, context)
	},
} satisfies ExportedHandler<Cloudflare.Env>

export { Counter }
