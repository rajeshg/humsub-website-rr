import { env } from "cloudflare:workers"
import type { RequestHandler } from "react-router"
import { RouterContextProvider, createRequestHandler } from "react-router"
import { Counter } from "./counter"
import type { EventState } from "./counter"

let handler: RequestHandler | null = null
const eventId = "event-dashboard-1"

export default {
	async fetch(request: Request) {
		const url = new URL(request.url)
		if (url.pathname === "/api/durable/resetEvent" && request.method === "POST") {
			// validate/parse the payload and call typed RPC on the Durable Object
			const id = env.COUNTER_DO.idFromName(eventId)
			const stub = env.COUNTER_DO.get(id) as unknown as Counter
			try {
				const body = await request.json().catch(() => null)
				// Basic runtime guard: ensure body has an items array before treating it as EventState
				let payload: EventState | undefined = undefined
				if (body && typeof body === "object" && Array.isArray((body as { items?: unknown }).items)) {
					payload = body as EventState
				}
				// Let the durable object do final validation; pass undefined if payload invalid
				await stub.resetEvent(payload)
				return new Response(JSON.stringify({ success: true }), { status: 200 })
			} catch (err) {
				return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
			}
		}
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
		const context = new RouterContextProvider()

		// Call the handler with the request and context and return the response
		return await handler(request, context)
	},
} satisfies ExportedHandler<Cloudflare.Env>

export { Counter }
