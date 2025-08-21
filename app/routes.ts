import type { RouteConfig } from "@react-router/dev/routes"

import { index, layout, route } from "@react-router/dev/routes"
// Use Vite's import.meta.glob to statically import MDX files
// This works at build time rather than runtime
function processGlobFiles(globFiles: Record<string, unknown>, folderName: string) {
	return Object.keys(globFiles).map((path) => {
		const fileName = path.split("/").pop() || ""
		return {
			path: fileName.replace(".mdx", ""),
			file: `content/${folderName}/${fileName}`,
		}
	})
}

const mdxFilesForBlog = processGlobFiles(import.meta.glob("../app/content/blog-posts/*.mdx"), "blog-posts")

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
		route("our-team", "routes/our-team.tsx"),
		route("membership", "routes/membership.tsx"),
		route("privacy-policy", "routes/privacy-policy.mdx"),
		route("terms-and-conditions", "routes/terms-and-conditions.mdx"),
		route("2025-raffle", "routes/2025-raffle.tsx"),
		route("durable", "routes/durable.tsx"),
		layout("routes/events-layout.tsx", [
			route("events", "routes/events-home.tsx"),
			route("event", "routes/events-detail.tsx", [
				route("diwali-2025", "routes/hum-sub-diwali-2025.tsx"),
				...mdxFilesForEvents
					.filter(({ path: routePath }) => routePath !== "diwali-2025")
					.map(({ path: routePath, file }) => route(routePath, file)),
			]),
			route("hum-sub-diwali-2025", "routes/hum-sub-diwali-2025.tsx", {
				id: "hum-sub-diwali-2025",
			}),
		]),
		route("blog", "routes/blog-layout.tsx", [
			index("routes/blog-home.tsx"),
			...mdxFilesForBlog.map(({ path: routePath, file }) => route(routePath, file)),
		]),
	]),
	route("stage-timer", "routes/stage-timer.tsx"),
	route("api/youtube", "routes/api/youtube.ts"),
] satisfies RouteConfig
