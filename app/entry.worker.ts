import * as build from "virtual:react-router/server-build"
import { createRequestHandler } from "react-router"

import { CloudflareContext } from "./middleware/bindings.server"

const handler = createRequestHandler(build)

export default {
	async fetch(request: Request, env: Cloudflare.Env) {
		const context = new Map([[CloudflareContext, env]])
		return await handler(request, context)
	},
}
