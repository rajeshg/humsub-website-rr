import { Link } from "react-router"
import { Button } from "~/components/ui/button"

export default function CatchAll() {
  // This component handles all unmatched routes with a 404 page
  // Chrome DevTools requests are handled server-side in entry.server.tsx
  return (
    <div className="not-prose min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-800 dark:text-slate-200 mb-4">404</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">Page not found</p>
        <p className="text-slate-500 dark:text-slate-500 mb-8">The page you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/" className="no-underline hover:scale-105">
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
