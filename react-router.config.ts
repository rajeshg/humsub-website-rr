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
    unstable_optimizeDeps: true,
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
  },
} satisfies Config
