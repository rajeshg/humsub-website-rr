import { Link, Outlet } from "react-router"

import blogCss from "~/blog.css?url"
import { getPosts } from "~/posts.server"

import { parseLocalDate } from "~/lib/datetime"
import type { Route } from "./+types/blog-layout"

export async function loader({ request }: Route.LoaderArgs) {
	const posts = await getPosts()

	// Get the frontmatter for the current post
	const url = new URL(request.url)
	const slug = url.pathname.split("/").pop()
	const post = posts.find((post) => post.slug === slug)

	return { posts, frontmatter: post?.frontmatter }
}

export function links() {
	return [{ rel: "preload", href: blogCss, as: "style" }]
}

export default function BlogLayout({ loaderData }: Route.ComponentProps) {
	return (
		<>
			<link href={blogCss} rel="stylesheet" />
			{loaderData.frontmatter ? (
				<>
					<title>{loaderData.frontmatter?.title} | Hum Sub</title>
					<meta name="description" content={loaderData.frontmatter?.description} />
				</>
			) : null}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col lg:flex-row-reverse gap-8">
					<main className="flex-1 min-w-0 order-1 lg:order-2">
						<Outlet />
					</main>
					<aside className="lg:w-80 lg:sticky lg:top-8 lg:self-start bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 order-2 lg:order-1">
						<h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
						<ul className="space-y-3">
							{loaderData.posts.map((post) => (
								<li key={post.slug}>
									<Link
										to={post.slug}
										className="block p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
									>
										<div className="font-medium text-gray-900 dark:text-white">{post.frontmatter.title}</div>
										<div className="text-sm text-gray-500 dark:text-gray-400">
											{parseLocalDate(post.frontmatter["published-date"]).dateTimeUserFriendly}
										</div>
									</Link>
								</li>
							))}
						</ul>
					</aside>
				</div>
			</div>
		</>
	)
}
