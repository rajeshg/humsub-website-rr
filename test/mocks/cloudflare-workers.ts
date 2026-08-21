// Minimal stub for the `cloudflare:workers` module so `Counter` can be imported
// and exercised under plain vitest (no miniflare/vitest-pool-workers dependency).
// Only the surface used by app/counter.ts at runtime is provided.
export class DurableObject {
  constructor(state: unknown, env: unknown) {
    this.state = state
    this.env = env
  }
  state: unknown
  env: unknown
}
