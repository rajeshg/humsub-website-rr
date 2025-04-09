import { StrictMode, startTransition } from "react"
import { hydrateRoot } from "react-dom/client"
import { HydratedRouter } from "react-router/dom"

import { ClientStore, StoreContext } from "./middleware/store.client"

const store = new ClientStore()

startTransition(() => {
	hydrateRoot(
		document,
		<StrictMode>
			<HydratedRouter unstable_getContext={() => new Map([[StoreContext, store]])} />
		</StrictMode>
	)
})
