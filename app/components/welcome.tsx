import { Icon } from "@iconify-icon/react"

import { Link } from "react-router"
import { PictureCarousel } from "~/components/picture-carousel"
import { SponsorCarousel } from "~/components/sponsor-carousel"
import type { EventMeta } from "~/events.server"

export function Welcome({ events }: { events: EventMeta[] }) {
	return (
		<div id="container" className="container mx-auto px-4 max-w-7xl">
			<main className="flex flex-col dark:text-slate-100">
				{events.length > 0 && (
					<section className="flex flex-col md:flex-row gap-2 md:gap-8 md:mx-auto text-center not-prose rounded-lg bg-base-200/50 dark:bg-slate-800/70 p-4 shadow-sm">
						<div className="text-lg font-semibold flex items-center justify-center">
							<span className="animate-pulse text-primary dark:text-amber-300">Upcoming Events</span>
						</div>
						<div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
							{events.map((event) => (
								<Link
									key={event.slug}
									to={`/event/${event.slug}`}
									className="flex flex-row gap-3 link link-hover link-primary dark:link-accent items-center transition-transform hover:scale-105 w-full max-w-xs mx-auto"
								>
									<figure className="w-12 h-12 md:w-16 md:h-16 mask mask-decagon shadow-md flex-shrink-0 overflow-hidden">
										<img
											src={event.frontmatter?.image}
											alt={event.frontmatter?.title}
											width={100}
											height={100}
											className="object-cover w-full h-full"
										/>
									</figure>
									<div className="flex flex-col gap-1">
										<span className="font-medium truncate text-left">{event.frontmatter?.title}</span>
										<span className="text-xs truncate text-left">{event.frontmatter?.startDateUserFriendly}</span>
									</div>
								</Link>
							))}
						</div>
					</section>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
					<PictureCarousel />
					<section
						id="hero"
						className="flex flex-col p-4 gap-2 items-center justify-center w-full bg-base-100/50 dark:bg-slate-800/70 rounded-xl shadow-lg"
					>
						<div className="flex justify-center place-items-center bg-base-200 dark:bg-slate-700 rounded-lg p-4 shadow-inner">
							<div className="bg-gradient-to-r from-orange-500 via-gray-400 to-green-500 dark:from-orange-400 dark:via-gray-300 dark:to-green-400 inline-block text-transparent bg-clip-text text-2xl md:text-5xl font-bold p-2">
								HUM SUB
							</div>
						</div>
						<div className="p-2 md:p-4 col-span-2">
							<p className="text-base md:text-lg leading-relaxed dark:text-slate-200">
								Hum Sub is dedicated to sharing the social and cultural traditions of India with the residents of the
								North Carolina Triangle area and beyond. We do this by promoting, supporting, and organizing
								family-oriented cultural events which are geared towards inclusivity and diversity awareness while
								helping to build a stronger foundation for our youth.
							</p>
						</div>
					</section>
				</div>
				<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-4 not-prose">
					<div className="card shadow-lg bg-gradient-to-r from-base-100 to-base-300 dark:from-slate-700 dark:to-slate-800 border border-base-300 dark:border-slate-600 hover:border-primary dark:hover:border-amber-400 transition-all hover:-translate-y-1">
						<div className="card-body">
							<h2 className="text-xl font-semibold card-title text-primary dark:text-amber-300">Events</h2>
							<p className="text-base-content/80 dark:text-slate-300">
								We organize family-oriented cultural events with no general admission fees
							</p>
						</div>
					</div>
					<div className="card shadow-lg bg-gradient-to-r from-base-100 to-base-300 dark:from-slate-700 dark:to-slate-800 border border-base-300 dark:border-slate-600 hover:border-primary dark:hover:border-amber-400 transition-all hover:-translate-y-1">
						<div className="card-body">
							<h2 className="text-xl font-semibold card-title text-primary dark:text-amber-300">Youth Focus</h2>
							<p className="text-base-content/80 dark:text-slate-300">
								We invest in youth initiatives to develop next generation leaders
							</p>
						</div>
					</div>
					<div className="card shadow-lg bg-gradient-to-r from-base-100 to-base-300 dark:from-slate-700 dark:to-slate-800 border border-base-300 dark:border-slate-600 hover:border-primary dark:hover:border-amber-400 transition-all hover:-translate-y-1">
						<div className="card-body">
							<h2 className="text-xl font-semibold card-title text-primary dark:text-amber-300">Performers</h2>
							<p className="text-base-content/80 dark:text-slate-300">
								We provide a platform for performers to showcase their talents
							</p>
						</div>
					</div>
					<div className="card shadow-lg bg-gradient-to-r from-base-100 to-base-300 dark:from-slate-700 dark:to-slate-800 border border-base-300 dark:border-slate-600 hover:border-primary dark:hover:border-amber-400 transition-all hover:-translate-y-1">
						<div className="card-body">
							<h2 className="text-xl font-semibold card-title text-primary dark:text-amber-300">Vendors</h2>
							<p className="text-base-content/80 dark:text-slate-300">
								We provide a platform for vendors to promote their products and services
							</p>
						</div>
					</div>
					<div className="card shadow-lg bg-gradient-to-r from-base-100 to-base-300 dark:from-slate-700 dark:to-slate-800 border border-base-300 dark:border-slate-600 hover:border-secondary dark:hover:border-teal-400 transition-all hover:-translate-y-1">
						<div className="card-body">
							<h2 className="text-xl font-semibold card-title text-primary dark:text-teal-300">Want to volunteer?</h2>
							<p className="text-base-content/80 dark:text-slate-300 flex flex-col">
								<span>We are a 100% volunteer organization and welcome volunteers of all ages.</span>
								<a
									href="/volunteer"
									className="btn btn-secondary w-full mt-4 group"
									target="_self"
									rel="noopener noreferrer"
									title="Volunteer with Hum Sub"
								>
									Apply
									<span className="group-hover:translate-x-1 transition-transform">→</span>
								</a>
							</p>
						</div>
					</div>
					<div className="card shadow-lg bg-gradient-to-r from-base-100 to-base-300 dark:from-slate-700 dark:to-slate-800 border border-base-300 dark:border-slate-600 hover:border-primary dark:hover:border-amber-400 transition-all hover:-translate-y-1">
						<div className="card-body">
							<h2 className="text-xl font-semibold card-title text-primary dark:text-amber-300">Non-Profit</h2>
							<p className="text-base-content/80 dark:text-slate-300">
								We are a registered 501(c)(3) non-profit organization dedicated to serving the community. We partner
								with other non-profit organizations.
							</p>
						</div>
					</div>
				</section>

				<section className="shadow-lg rounded-xl bg-base-100 dark:bg-slate-800 p-4 my-4 grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="relative bg-base-200/50 dark:bg-slate-700/70 rounded-lg p-4 flex flex-col">
						<div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-700 dark:text-blue-400">
							<Icon icon="mdi:lightning-bolt" className="h-6 w-6" />
						</div>
						<div className="text-sm font-medium text-gray-700 dark:text-slate-200">Attendees</div>
						<div className="text-2xl font-bold text-blue-700 dark:text-blue-400 mt-1">15,000+</div>
						<div className="text-xs text-gray-700 dark:text-slate-200 mt-1">Largest event in South-East USA</div>
					</div>
					<div className="relative bg-base-200/50 dark:bg-slate-700/70 rounded-lg p-4 flex flex-col">
						<div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-red-700 dark:text-red-400">
							<Icon icon="mdi:heart" className="h-6 w-6" />
						</div>
						<div className="text-sm font-medium text-gray-700 dark:text-slate-200">Performers</div>
						<div className="text-2xl font-bold text-red-700 dark:text-red-400 mt-1">1,200+</div>
						<div className="text-xs text-gray-700 dark:text-slate-200 mt-1">On stage</div>
					</div>
					<div className="relative bg-base-200/50 dark:bg-slate-700/70 rounded-lg p-4 flex flex-col">
						<div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-yellow-700 dark:text-yellow-400">
							<Icon icon="mdi:store" className="h-6 w-6" />
						</div>
						<div className="text-sm font-medium text-gray-700 dark:text-slate-200">Vendors</div>
						<div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400 mt-1">50+</div>
						<div className="text-xs text-gray-700 dark:text-slate-200 mt-1">Food / Fashion / Business</div>
					</div>
					<div className="relative bg-base-200/50 dark:bg-slate-700/70 rounded-lg p-4 flex flex-col">
						<div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-700 dark:text-green-400">
							<Icon icon="mdi:information" className="h-6 w-6" />
						</div>
						<div className="text-sm font-medium text-gray-700 dark:text-slate-200">Years in existence</div>
						<div className="text-2xl font-bold text-green-700 dark:text-green-400 mt-1">25</div>
						<div className="text-xs text-gray-700 dark:text-slate-200 mt-1">since 2000</div>
					</div>
				</section>
				<section className="not-prose shadow-lg rounded-xl bg-base-100 dark:bg-slate-800 p-4 my-4">
					<h4 className="text-2xl font-bold text-center mb-6 text-primary dark:text-amber-300">Our Sponsors</h4>
					<SponsorCarousel />
				</section>
			</main>
		</div>
	)
}
