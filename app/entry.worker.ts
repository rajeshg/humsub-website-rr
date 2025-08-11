import type { RequestHandler } from "react-router"
import { createRequestHandler, unstable_RouterContextProvider } from "react-router"

let handler: RequestHandler | null = null

export default {
	async fetch(request: Request) {
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
