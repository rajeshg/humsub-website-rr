import type { unstable_RouterContextProvider } from "react-router"

import { unstable_createContext } from "react-router"

export const CloudflareContext = unstable_createContext<Cloudflare.Env>()

export function getBindings(context: unstable_RouterContextProvider) {
	return context.get(CloudflareContext)
}
