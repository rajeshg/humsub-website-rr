import { redirect } from "react-router"

// TEMPORARY: root path redirects to the Diwali 2026 event page so it acts as
// the default homepage. The real homepage remains available at /home.
// Revert by restoring `index("routes/home.tsx")` in app/routes.ts and removing
// the /home links in main-layout.tsx.
export const loader = () => redirect("/hum-sub-diwali-2026")
