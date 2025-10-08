import { Icon } from "@iconify-icon/react"

import { Link } from "react-router"
import { PictureCarousel } from "~/components/picture-carousel"
import { SponsorCarousel } from "~/components/sponsor-carousel"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import type { EventMeta } from "~/events.server"

export function Welcome({ events }: { events: EventMeta[] }) {
	return (
		<div id="container" className="container mx-auto max-w-7xl not-prose">
			<main className="md:mx-4 flex flex-col dark:text-slate-100">
				<div className="flex flex-col md:flex-row gap-4">
					{/* Membership and Live Streaming Links */}
					<div className="flex flex-col items-center my-4 w-full md:w-1/2">
						<div className="w-full h-full bg-base-100/60 dark:bg-slate-800/60 rounded-xl shadow border border-base-200 dark:border-slate-700 px-6 py-5 flex flex-col items-center backdrop-blur">
							<h3 className="text-lg font-bold text-primary dark:text-amber-300 mt-0 mb-2 flex items-center gap-2">
								<Icon icon="mdi:star-four-points" className="h-5 w-5 animate-spin [animation-duration:3s]" />
								Join the Fun!
							</h3>
							<p className="text-sm text-center text-base-content/70 dark:text-slate-300 mb-3">
								Become a member. Get involved and support the community!
							</p>
							<div className="flex w-full gap-3 flex-col sm:flex-row">
								<Link
									to="/membership"
									title="Become a Member"
									className="w-full sm:flex-1 sm:min-w-0 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-base md:text-lg transition-all
									text-primary dark:text-amber-300 bg-primary/5 dark:bg-amber-300/10 hover:bg-primary/20 dark:hover:bg-amber-300/20
									decoration-2 decoration-primary dark:decoration-amber-300 no-underline shadow-sm hover:scale-105"
								>
									<Icon icon="mdi:account-group" className="h-5 w-5" />
									<span className="truncate">Membership</span>
								</Link>
							</div>
						</div>
					</div>

					{events.length > 0 && (
						<section className="w-full md:w-1/2 my-4 flex flex-col text-center not-prose rounded-xl bg-base-200/50 dark:bg-slate-800/70 px-6 py-5 shadow-sm h-full">
							<div className="text-lg font-semibold flex items-center justify-center mb-2">
								<span className="animate-pulse text-primary dark:text-amber-300">Upcoming Events</span>
							</div>
							<div className="flex flex-col gap-2 md:gap-4 w-full">
								{events.map((event) => (
									<Link
										key={event.slug}
										to={`/event/${event.slug}`}
										className="flex flex-row gap-3 link link-hover link-primary dark:link-accent items-center transition-transform hover:scale-105 w-full mx-auto"
									>
										<figure className="w-12 h-12 md:w-16 md:h-16 mask mask-decagon shadow-md flex-shrink-0 overflow-hidden">
											<img
												src={event.frontmatter?.image}
												alt={event.frontmatter?.title}
												width={100}
												height={100}
												className="object-contain object-top"
											/>
										</figure>
										<div className="flex flex-col gap-1 truncate">
											<span className="font-medium text-left" title={event.frontmatter?.title}>
												{event.frontmatter?.title}
											</span>
											<span className="text-xs text-left" title={event.frontmatter?.startDateUserFriendly}>
												{event.frontmatter?.startDateUserFriendly}
											</span>
										</div>
									</Link>
								))}
							</div>
						</section>
					)}
				</div>

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
					<Card className="shadow-lg bg-gradient-to-r from-base-100 to-base-300 dark:from-slate-700 dark:to-slate-800 border border-base-300 dark:border-slate-600 hover:border-primary dark:hover:border-amber-400 transition-all hover:-translate-y-1">
						<CardHeader>
							<CardTitle className="text-xl font-semibold text-primary dark:text-amber-300">Events</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-base-content/80 dark:text-slate-300">
								We organize family-oriented cultural events with no general admission fees
							</p>
						</CardContent>
					</Card>
					<Card className="shadow-lg bg-gradient-to-r from-base-100 to-base-300 dark:from-slate-700 dark:to-slate-800 border border-base-300 dark:border-slate-600 hover:border-primary dark:hover:border-amber-400 transition-all hover:-translate-y-1">
						<CardHeader>
							<CardTitle className="text-xl font-semibold text-primary dark:text-amber-300">Youth Focus</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-base-content/80 dark:text-slate-300">
								We invest in youth initiatives to develop next generation leaders
							</p>
						</CardContent>
					</Card>
					<Card className="shadow-lg bg-gradient-to-r from-base-100 to-base-300 dark:from-slate-700 dark:to-slate-800 border border-base-300 dark:border-slate-600 hover:border-primary dark:hover:border-amber-400 transition-all hover:-translate-y-1">
						<CardHeader>
							<CardTitle className="text-xl font-semibold text-primary dark:text-amber-300">Performers</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-base-content/80 dark:text-slate-300">
								We provide a platform for performers to showcase their talents
							</p>
						</CardContent>
					</Card>
					<Card className="shadow-lg bg-gradient-to-r from-base-100 to-base-300 dark:from-slate-700 dark:to-slate-800 border border-base-300 dark:border-slate-600 hover:border-primary dark:hover:border-amber-400 transition-all hover:-translate-y-1">
						<CardHeader>
							<CardTitle className="text-xl font-semibold text-primary dark:text-amber-300">Vendors</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-base-content/80 dark:text-slate-300">
								We provide a platform for vendors to promote their products and services
							</p>
						</CardContent>
					</Card>
					<Card className="shadow-lg bg-gradient-to-r from-base-100 to-base-300 dark:from-slate-700 dark:to-slate-800 border border-base-300 dark:border-slate-600 hover:border-primary dark:hover:border-teal-400 transition-all hover:-translate-y-1">
						<CardHeader>
							<CardTitle className="text-xl font-semibold text-primary dark:text-teal-300">
								Want to volunteer?
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-base-content/80 dark:text-slate-300 flex flex-col">
								<span>We are a 100% volunteer organization and welcome volunteers of all ages.</span>
								<Button asChild className="w-full mt-4 group" variant="secondary">
									<Link to="/volunteer" title="Volunteer with Hum Sub">
										Apply
										<span className="group-hover:translate-x-1 transition-transform ml-1">→</span>
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
					<Card className="shadow-lg bg-gradient-to-r from-base-100 to-base-300 dark:from-slate-700 dark:to-slate-800 border border-base-300 dark:border-slate-600 hover:border-primary dark:hover:border-amber-400 transition-all hover:-translate-y-1">
						<CardHeader>
							<CardTitle className="text-xl font-semibold text-primary dark:text-amber-300">Non-Profit</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-base-content/80 dark:text-slate-300">
								We are a registered 501(c)(3) non-profit organization dedicated to serving the community. We partner
								with other non-profit organizations.
							</p>
						</CardContent>
					</Card>
				</section>

				<section className="shadow-lg rounded-xl bg-base-100 dark:bg-slate-800 p-2 my-4 grid grid-cols-2 md:grid-cols-4 gap-3">
					<div className="bg-base-200/50 dark:bg-slate-700/70 rounded-lg p-3 md:p-2 flex flex-col items-center text-center gap-2">
						<div className="flex flex-col justify-center items-center gap-1">
							<div className="flex items-center justify-center h-6 w-6 text-blue-700 dark:text-blue-400">
								<Icon icon="mdi:lightning-bolt" className="h-full w-full" />
							</div>
							<div className="text-sm font-medium text-gray-700 dark:text-slate-200 leading-none">Attendees</div>
						</div>
						<div className="text-2xl md:text-3xl font-extrabold text-blue-700 dark:text-blue-400 leading-tight">
							15,000+
						</div>
						<div className="text-xs text-gray-700 dark:text-slate-200">Largest event in South-East USA</div>
					</div>

					<div className="bg-base-200/50 dark:bg-slate-700/70 rounded-lg p-3 md:p-2 flex flex-col items-center text-center gap-2">
						<div className="flex flex-col justify-center items-center gap-1">
							<div className="flex items-center justify-center h-6 w-6 text-red-700 dark:text-red-400">
								<Icon icon="mdi:heart" className="h-full w-full" />
							</div>
							<div className="text-sm font-medium text-gray-700 dark:text-slate-200 leading-none">Performers</div>
						</div>
						<div className="text-2xl md:text-3xl font-extrabold text-red-700 dark:text-red-400 leading-tight">
							1,200+
						</div>
						<div className="text-xs text-gray-700 dark:text-slate-200">On stage</div>
					</div>

					<div className="bg-base-200/50 dark:bg-slate-700/70 rounded-lg p-3 md:p-2 flex flex-col items-center text-center gap-2">
						<div className="flex flex-col justify-center items-center gap-1">
							<div className="flex items-center justify-center h-6 w-6 text-yellow-700 dark:text-yellow-400">
								<Icon icon="mdi:store" className="h-full w-full" />
							</div>
							<div className="text-sm font-medium text-gray-700 dark:text-slate-200 leading-none">Vendors</div>
						</div>
						<div className="text-2xl md:text-3xl font-extrabold text-yellow-700 dark:text-yellow-400 leading-tight">
							50+
						</div>
						<div className="text-xs text-gray-700 dark:text-slate-200">Food / Fashion / Business</div>
					</div>

					<div className="bg-base-200/50 dark:bg-slate-700/70 rounded-lg p-3 md:p-2 flex flex-col items-center text-center gap-2">
						<div className="flex flex-col justify-center items-center gap-1">
							<div className="flex items-center justify-center h-6 w-6 text-green-700 dark:text-green-400">
								<Icon icon="mdi:information" className="h-full w-full" />
							</div>
							<div className="text-sm font-medium text-gray-700 dark:text-slate-200 leading-none">
								Years in existence
							</div>
						</div>
						<div className="text-2xl md:text-3xl font-extrabold text-green-700 dark:text-green-400 leading-tight">
							25
						</div>
						<div className="text-xs text-gray-700 dark:text-slate-200">since 2000</div>
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
