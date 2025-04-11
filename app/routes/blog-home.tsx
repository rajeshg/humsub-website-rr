import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { Link } from "react-router"

import { getFeaturedOrLatestPosts } from "~/posts.server"

import type { Route } from "./+types/blog-home"

export async function loader() {
	const posts = await getFeaturedOrLatestPosts()
	return { posts }
}

export default function Blog({ loaderData }: Route.ComponentProps) {
	return (
		<>
			<title>Blog | Hum Sub</title>
			<meta name="description" content="Articles about React Router, web development, and modern web architecture" />
			<div>
				<h1 className="text-4xl font-bold mb-4">Blog</h1>
				<p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
					A collection of articles about React Router, web development, and modern web architecture.
				</p>

				<div className="space-y-8">
					{loaderData.posts.map((post) => (
						<article
							key={post.slug}
							className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
						>
							<Link to={post.slug} className="block p-6">
								<div className="flex flex-col sm:flex-row sm:items-start gap-6">
									<div className="flex-1">
										<h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
											{post.frontmatter.title}
										</h2>
										<p className="text-gray-600 dark:text-gray-300 mt-3">{post.frontmatter.description}</p>
										<time className="text-sm text-gray-500 dark:text-gray-400 mt-4 block">
											{new Date(post.frontmatter["published-date"]).toLocaleDateString()}
										</time>
									</div>
									<div className="flex items-center text-blue-600 dark:text-blue-400">
										<Icon icon="mdi:arrow-right" />
									</div>
								</div>
							</Link>
						</article>
					))}
				</div>
			</div>
		</>
	)
}
