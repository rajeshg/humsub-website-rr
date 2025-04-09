import type { Config } from "@react-router/dev/config"

import "react-router"

declare module "react-router" {
	// eslint-disable-next-line ts/consistent-type-definitions
	interface Future {
		unstable_middleware: true
	}
}

export default {
	future: {
		unstable_middleware: true,
		unstable_optimizeDeps: true,
		unstable_splitRouteModules: true,
		unstable_viteEnvironmentApi: true,
	},
} satisfies Config
