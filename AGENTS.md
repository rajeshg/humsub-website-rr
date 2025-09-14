# Agent Guidelines for HumSub Website

## Build/Lint/Test Commands

- **Build**: `vite build`
- **Lint**: `biome check .`
- **Lint & Fix**: `biome check --fix .`
- **Test**: `vitest run`
- **Test Single File**: `vitest run <file-path>`
- **Typecheck**: `bun rr:typegen && bun cf:typegen && tsc`
- **Dev Server**: `vite dev`

## Code Style Guidelines

### TypeScript
- Always use TypeScript, never JavaScript
- Avoid `any` and `as` - prefer `unknown` when type is uncertain
- Use path mapping: `~/*` for `./app/*`
- Strict type checking enabled

### React
- Use functional components exclusively
- Latest React version (v19)
- Use shadcn/ui components for UI elements
- Avoid useEffect where possible - prefer event handlers, ref callbacks, CSS, useSyncExternalStore

### React Router v7
- File-based routing in `app/routes/`
- Use loaders for data fetching instead of useEffect
- Use actions for form mutations
- Prefer `<Link>` and `<NavLink>` for navigation
- Use `useNavigate()` for programmatic navigation

### CSS/Styling
- Use Tailwind CSS exclusively
- Prefer Tailwind classes over custom CSS
- Support both dark and light themes
- Never use inline styles unless absolutely necessary

### Directory Structure
- Components: `app/components/`
- Routes: `app/routes/` (API routes in `app/routes/api/`)
- Common logic: `app/lib/`
- Assets: `public/assets/`
- Content: `app/content/`

### Formatting & Linting
- Line width: 120 characters
- Semicolons: asNeeded
- Trailing commas: es5
- Organize imports automatically
- No unused imports/variables/functions
- Console allowed only for `error` and `warn`

### Naming Conventions
- Components: PascalCase
- Files: kebab-case for routes, camelCase for utilities
- Hooks: camelCase with `use` prefix
- Types: PascalCase with descriptive names

### Error Handling
- Use proper error boundaries for routes
- Handle loading states appropriately
- Validate form data with proper error messages
- Use try/catch for async operations

### Testing
- Use Vitest for unit tests
- Test files: `*.test.ts`
- Follow describe/it/expect pattern
- Test utilities and components thoroughly

## Copilot Instructions
- Focus on React/TypeScript best practices
- Leverage Cloudflare ecosystem (Workers, KV, Durable Objects)
- Use modern testing frameworks (Vitest, React Testing Library)
- Follow state management patterns (Zustand, Context API)
- Implement proper authentication/authorization
- Design RESTful APIs and GraphQL when needed
- Provide objective feedback based on facts
- Include examples to illustrate points
- Think carefully and make minimal code changes