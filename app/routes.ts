import type { RouteConfig } from "@react-router/dev/routes"

import { index, layout, route } from "@react-router/dev/routes"
// Use Vite's import.meta.glob to statically import MDX files
// This works at build time rather than runtime
function processGlobFiles(globFiles: Record<string, unknown>, folderName: string) {
	return Object.keys(globFiles).map((path) => {
		const fileName = path.split("/").pop() || ""
		return {
			path: fileName.replace(/\.mdx?$/, ""),
			file: `content/${folderName}/${fileName}`,
		}
	})
}

const mdxFilesForBlog = processGlobFiles(import.meta.glob("../app/content/blog-posts/*.{mdx,md}"), "blog-posts")

const mdxFilesForEvents = processGlobFiles(import.meta.glob("../app/content/events/*.mdx"), "events")

export default [
	layout("routes/main-layout.tsx", [
		index("routes/home.tsx"),
		route("about", "routes/about.tsx"),
		route("vision-mission", "routes/vision-mission.tsx"),
		route("contact-us", "routes/contact-us.tsx"),
		route("cultural-faq", "routes/cultural-faq.tsx"),
		route("volunteer", "routes/volunteer.tsx"),
		route("gallery", "routes/gallery.tsx"),
		route("yaa", "routes/yaa.tsx"),
		route("youth-ambassador", "routes/youth-ambassador.tsx"),
		route("discover-india-series", "routes/discover-india-series.tsx"),
		route("diwali-essay-competition", "routes/diwali-essay-competition.tsx"),
		route("our-sponsors", "routes/our-sponsors.tsx"),
		route("sponsor/:sponsorSlug", "routes/sponsor.$sponsorSlug.tsx"),
		route("our-team", "routes/our-team.tsx"),
		route("membership", "routes/membership.tsx"),
		route("privacy-policy", "routes/privacy-policy.mdx"),
		route("terms-and-conditions", "routes/terms-and-conditions.mdx"),
		route("2025-raffle", "routes/2025-raffle.tsx"),
		route("durable", "routes/durable.tsx"),
		layout("routes/events-layout.tsx", [
			route("events/diwali", "routes/events/diwali.tsx"),
			route("events/holi", "routes/events/holi.tsx"),
			route("events/basant-bahar", "routes/events/basant-bahar.tsx"),
			route("events/exhibition", "routes/events/exhibition.tsx"),
			route("events", "routes/events-home.tsx"),
			route("event", "routes/events-detail.tsx", [
				// for diwali events, we have lot more content and sometimes widgets to include, so chose to use tsx file instead of using .md files like other events
				// we still need to create a md/mdx file at app/content/events/diwali-2025.mdx for the diwali event to be included in the events list page, but we will use the tsx file for the actual event detail page
				// Also we use the image and timings from the .md/.mdx file
				route("diwali-2025", "routes/hum-sub-diwali-2025.tsx"),
				...mdxFilesForEvents
					.filter(({ path: routePath }) => !["diwali-2025"].includes(routePath))
					.map(({ path: routePath, file }) => route(routePath, file)),
			]),
			// this is an alias for the diwali event route at the path /event/diwali-2025
			route("hum-sub-diwali-2025", "routes/hum-sub-diwali-2025.tsx", {
				id: "hum-sub-diwali-2025",
			}),
		]),
		route("blog", "routes/blog-layout.tsx", [
			index("routes/blog-home.tsx"),
			...mdxFilesForBlog.map(({ path: routePath, file }) => route(routePath, file)),
		]),
		// Catch-all route for Chrome DevTools and other special paths
		route("*", "routes/catch-all.tsx"),
	]),
	route("stage-timer", "routes/stage-timer.tsx"),
	route("api/youtube", "routes/api/youtube.ts"),
] satisfies RouteConfig
