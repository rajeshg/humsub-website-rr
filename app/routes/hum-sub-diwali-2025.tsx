import { CalendarDays, MapPin, Package } from "lucide-react"
import { useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { sponsors as sponsors2025 } from "~/lib/sponsors"

interface HeroProps {
	eventDate: Date
}

function Hero({ eventDate }: HeroProps) {
	const [timeLeft, setTimeLeft] = useState({
		months: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		isExpired: false,
	})

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date().getTime()
			const eventTime = eventDate.getTime()
			const distance = eventTime - now

			if (distance > 0) {
				// Calculate time units
				const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.44)) // Average month length
				const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24))
				const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

				setTimeLeft({ months, days, hours, minutes, isExpired: false })
			} else {
				setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, isExpired: true })
			}
		}, 1000)

		return () => clearInterval(timer)
	}, [eventDate])

	return (
		<>
			{/* Countdown Timer */}
			{!timeLeft.isExpired && (
				<div className="mx-auto bg-white/20 dark:bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-orange-200/30 dark:border-orange-600/30 shadow-2xl">
					<div className="flex justify-center items-center gap-2 md:gap-4 flex-wrap">
						{timeLeft.months > 0 && (
							<>
								<div className="bg-orange-100/80 dark:bg-orange-900/60 backdrop-blur-sm rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[80px] border border-orange-300/50 dark:border-orange-600/50">
									<div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-800 dark:text-orange-200">
										{timeLeft.months.toString().padStart(2, "0")}
									</div>
									<div className="text-xs md:text-sm text-orange-700 dark:text-orange-300 uppercase tracking-wide">
										Months
									</div>
								</div>
								<div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-800 dark:text-orange-200 hidden sm:block">
									:
								</div>
							</>
						)}
						{(timeLeft.days > 0 || timeLeft.months > 0) && (
							<>
								<div className="bg-orange-100/80 dark:bg-orange-900/60 backdrop-blur-sm rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[80px] border border-orange-300/50 dark:border-orange-600/50">
									<div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-800 dark:text-orange-200">
										{timeLeft.days.toString().padStart(2, "0")}
									</div>
									<div className="text-xs md:text-sm text-orange-700 dark:text-orange-300 uppercase tracking-wide">
										Days
									</div>
								</div>
								{timeLeft.days < 30 && (
									<div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-800 dark:text-orange-200 hidden sm:block">
										:
									</div>
								)}
							</>
						)}
						{timeLeft.days < 30 && (
							<>
								<div className="bg-orange-100/80 dark:bg-orange-900/60 backdrop-blur-sm rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[80px] border border-orange-300/50 dark:border-orange-600/50">
									<div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-800 dark:text-orange-200">
										{timeLeft.hours.toString().padStart(2, "0")}
									</div>
									<div className="text-xs md:text-sm text-orange-700 dark:text-orange-300 uppercase tracking-wide">
										Hours
									</div>
								</div>
								<div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-800 dark:text-orange-200 hidden sm:block">
									:
								</div>
								<div className="bg-orange-100/80 dark:bg-orange-900/60 backdrop-blur-sm rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[80px] border border-orange-300/50 dark:border-orange-600/50">
									<div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-800 dark:text-orange-200">
										{timeLeft.minutes.toString().padStart(2, "0")}
									</div>
									<div className="text-xs md:text-sm text-orange-700 dark:text-orange-300 uppercase tracking-wide">
										Minutes
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			)}

			{timeLeft.isExpired && (
				<div className="bg-white/20 dark:bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-orange-200/30 dark:border-orange-600/30 shadow-2xl">
					<p className="text-lg md:text-xl text-orange-800 dark:text-orange-200 font-semibold [text-shadow:1px_1px_2px_rgba(255,255,255,0.3)]">
						Event has started!
					</p>
				</div>
			)}
		</>
	)
}

function Diwali2025SponsorsGrid() {
	return (
		<div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-2 items-center justify-center">
			{sponsors2025.map((sponsor) => (
				<a
					key={sponsor.name}
					href={sponsor.href}
					target="_blank"
					rel="noopener noreferrer"
					className="flex flex-col items-center group"
				>
					<img
						src={Array.isArray(sponsor.imagePath) ? sponsor.imagePath[0] : sponsor.imagePath}
						alt={sponsor.name}
						className="h-24 w-24 object-contain p-1 rounded-lg bg-white mb-2 transition-transform group-hover:scale-105"
						loading="lazy"
					/>
				</a>
			))}
		</div>
	)
}

export default function HumSubDiwali2025() {
	// Set event date to Diwali 2025 - October 11, 2025 at 9:00 AM
	const eventDate = new Date(2025, 9, 11, 9, 0, 0) // Month is 0-indexed, so 9 = October

	return (
		<>
			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-orange-950 dark:to-amber-950 py-16 md:py-24 overflow-hidden">
				{/* Decorative Background Elements */}
				<div className="absolute inset-0 opacity-10 dark:opacity-20">
					<div className="absolute top-10 left-10 w-32 h-32 bg-orange-400 dark:bg-orange-600 rounded-full blur-3xl animate-pulse"></div>
					<div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-400 dark:bg-amber-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
					<div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-400 dark:bg-yellow-600 rounded-full blur-2xl animate-pulse delay-500"></div>
				</div>

				<div className="w-full px-4 md:px-4 relative z-10">
					{/* Hero Content */}
					<div className="text-center space-y-8 max-w-4xl mx-auto">
						{/* Main Title with Enhanced Styling */}
						<div className="space-y-4">
							<h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight animate-in fade-in duration-1000">
								<span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-300 dark:via-amber-300 dark:to-yellow-300">
									Hum Sub Diwali
								</span>
								<span className="block text-2xl md:text-3xl lg:text-4xl font-semibold mt-2 text-orange-600 dark:text-orange-300 animate-in slide-in-from-bottom-4 duration-1000 delay-300">
									25th Anniversary Celebration
								</span>
							</h1>
							<div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 mx-auto rounded-full animate-in zoom-in-50 duration-1000 delay-700"></div>
						</div>

						{/* Event Details with Enhanced Card */}
						<div className="bg-white/90 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-orange-200/50 dark:border-orange-600/30 shadow-2xl max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-300 animate-in slide-in-from-bottom-4 duration-1000 delay-500">
							<div className="space-y-4 text-gray-800 dark:text-gray-100">
								<div className="flex items-center gap-3 md:text-xl font-medium">
									<div className="p-2 bg-orange-100 dark:bg-orange-900/60 rounded-full">
										<CalendarDays className="h-6 w-6 text-amber-600 dark:text-amber-300" />
									</div>
									<span className="text-balance">October 11, 2025 9 AM - 9 PM</span>
								</div>
								<div className="flex gap-3 md:text-xl font-medium">
									<div className="p-2 bg-orange-100 dark:bg-orange-900/60 rounded-full">
										<MapPin className="h-6 w-6 text-amber-600 dark:text-amber-300" />
									</div>
									<span>Koka Booth Amphitheater, Cary, NC</span>
								</div>
								<div className="text-center pt-2">
									<Badge
										variant="default"
										className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-500 dark:hover:to-emerald-500 text-white text-lg px-6 py-2 rounded-full shadow-lg animate-pulse"
									>
										🎉 FREE ADMISSION 🎉
									</Badge>
								</div>
							</div>
						</div>

						{/* Countdown Timer */}
						<Hero eventDate={eventDate} />

						<div className="animate-in slide-in-from-bottom-4 duration-1000 delay-700">
							<p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto font-medium">
								Join us for a full day of celebration, delicious food, vibrant performances, community booths, and a{" "}
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 font-semibold">
									spectacular fireworks finale
								</span>
								.
							</p>
						</div>

						{/* Enhanced Action Buttons */}
						<div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 animate-in slide-in-from-bottom-4 duration-1000 delay-1000">
							<Button
								asChild
								size="lg"
								className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:via-orange-700 hover:to-amber-700 text-white font-bold px-10 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transform hover:scale-110 transition-all duration-300 w-full sm:w-auto border-2 border-orange-400/50 group"
							>
								<a
									href="https://www.zeffy.com/en-US/ticketing/hum-sub-annual-membership"
									target="_blank"
									rel="noopener noreferrer"
									className="no-underline flex items-center gap-2"
								>
									<span>Get your membership</span>
									<span className="group-hover:translate-x-1 transition-transform">→</span>
								</a>
							</Button>
							<Button
								variant="secondary"
								size="lg"
								asChild
								className="bg-white/95 dark:bg-gray-800/95 text-orange-600 dark:text-orange-400 hover:bg-white dark:hover:bg-gray-800 border-2 border-orange-300 dark:border-orange-700 hover:border-orange-400 dark:hover:border-orange-600 font-bold px-10 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transform hover:scale-110 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm group"
							>
								<a href="/volunteer" className="no-underline flex items-center gap-2">
									<span>Volunteer With Us</span>
									<span className="group-hover:translate-x-1 transition-transform">→</span>
								</a>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Main Content Container */}
			<div className="container mx-auto px-4 py-12 space-y-12">
				<section className="mb-6">
					<h2 className="text-3xl font-bold mb-4 text-primary text-center">Plan Your Visit</h2>

					{/* Venue Details - Separate Card */}
					<Card className="shadow-lg hover:shadow-xl transition-shadow mb-3">
						<CardHeader>
							<CardTitle className="text-xl text-primary flex items-center gap-2">
								<MapPin className="h-6 w-6" />
								Venue Details
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								<strong>Location:</strong> Koka Booth Amphitheater, 8003 Regency Pkwy, Cary, NC 27518
							</p>
							<p>
								<strong>Parking:</strong> $10 General / $20 Preferred Parking
							</p>
							<p>
								<strong>Admission:</strong>{" "}
								<Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white">
									FREE TO THE PUBLIC
								</Badge>
							</p>
							<p className="text-slate-600 dark:text-slate-300 mt-2">
								<strong>Seating:</strong> Membership required for seating. Buy tickets for $10 annual membership.
							</p>
							<p>
								<strong>Cashless Venue:</strong> Koka Booth Amphitheatre is a cashless venue. Cash is not accepted at
								the Box Office, Concessions, Parking or at Guest Services. For this event many outside vendors will
								accept cash and/or credit/debit cards. ATMS will NOT be on-site.
							</p>
						</CardContent>
						<CardFooter className="flex justify-center">
							<Button
								asChild
								size="lg"
								className="bg-white text-orange-600 hover:bg-gray-100 border-2 border-orange-300 dark:border-orange-700"
							>
								<a
									href="https://www.zeffy.com/en-US/ticketing/hum-sub-annual-membership"
									target="_blank"
									rel="noopener noreferrer"
									className="no-underline"
								>
									Buy Tickets
								</a>
							</Button>
						</CardFooter>
					</Card>

					{/* Accordion for other sections */}
					<Accordion type="single" collapsible className="w-full space-y-4" defaultValue="schedule">
						<AccordionItem
							value="schedule"
							className="bg-orange-100/90 dark:bg-orange-900/40 data-[state=open]:bg-orange-100/90 dark:data-[state=open]:bg-orange-900/40"
						>
							<AccordionTrigger className="text-center bg-orange-100/90 dark:bg-orange-900/40 hover:bg-orange-100/90 dark:hover:bg-orange-900/40 data-[state=open]:bg-orange-100/90 dark:data-[state=open]:bg-orange-900/40 px-4 justify-center text-lg">
								<span className="flex items-center justify-center gap-2 w-full uppercase">
									<CalendarDays className="h-5 w-5 text-orange-700 dark:text-orange-300" />
									Schedule & Highlights
								</span>
							</AccordionTrigger>
							<AccordionContent className="bg-orange-100/90 dark:bg-orange-900/40 px-4 text-base">
								<ul className="space-y-2">
									<li>
										<strong>9:00 AM</strong> — Gates Open, Food & Vendor Village
									</li>
									<li>
										<strong>9:45 AM</strong> — Cultural Performances Begin (Main Stage)
									</li>
									<li>
										<strong>5:00 PM</strong> — Special Evening Show
									</li>
									<li>
										<strong>9:00 PM</strong> — Fireworks Finale
									</li>
								</ul>
								<p className="mt-4 text-slate-600 dark:text-slate-300">
									Exhibition booths, food vendors, and family-friendly activities will be available throughout the day.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							value="bag-policy"
							className="bg-green-100/90 dark:bg-green-900/40 data-[state=open]:bg-green-100/90 dark:data-[state=open]:bg-green-900/40"
						>
							<AccordionTrigger className="text-center bg-green-100/90 dark:bg-green-900/40 hover:bg-green-100/90 dark:hover:bg-green-900/40 data-[state=open]:bg-green-100/90 dark:data-[state=open]:bg-green-900/40 px-4 justify-center text-lg uppercase">
								<span className="flex items-center justify-center gap-2 w-full">
									<Package className="h-5 w-5 text-green-700 dark:text-green-300" />
									Bag Policy & Items Allowed
								</span>
							</AccordionTrigger>
							<AccordionContent className="bg-green-100/90 dark:bg-green-900/40 px-4 text-base">
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Bag Policy:</h4>
										<ul className="space-y-1">
											<li>Bags 6"x 8" or smaller permitted</li>
											<li>Clear bags up to 12" x 12" x 9"</li>
											<li>Medical and parenting bags allowed</li>
											<li>All bags subject to search</li>
										</ul>
										<p className="mt-2 text-red-600">
											<strong>Note:</strong> Umbrellas not allowed due to sight lines.
										</p>
									</div>

									<div>
										<h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Items Allowed:</h4>
										<p className="mb-2">Guests can bring the following items to THIS EVENT:</p>
										<ul>
											<li>Bags 6" x 8" or smaller are permitted.</li>
											<li>12" x 12" x 9" Clear bags only.</li>
											<li>All items must fit in clear bags.</li>
											<li>Plastic factory-sealed bottled water (1 per person).</li>
											<li>No glass, cans, or flavored water.</li>
											<li>
												Select lawn chairs: No footrest, canopy, lounge chairs, tri-fold chairs, or swinging chairs. See
												examples. Please remove the chair from the bag at the security checkpoint.
											</li>
											<li>Raincoats & ponchos.</li>
											<li>Strollers.</li>
											<li>Tablets.</li>
											<li>Reusable bottles (no glass).</li>
											<li>Water fill stations available in the Cobblestone Courtyard.</li>
											<li>All allowed bags will be searched.</li>
											<li>All patrons will walk through metal detectors.</li>
										</ul>
										<p className="mt-4 text-slate-600 dark:text-slate-300">
											For more information on parking, prohibited items, and more, please visit{" "}
											<a
												href="https://www.boothamphitheatre.com/events/detail/hum-sub-diwali-2025"
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:text-blue-800 underline"
											>
												Koka Booth Amphitheater's website
											</a>
											.
										</p>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</section>
				<section className="mb-6">
					<h2 className="text-3xl font-bold mb-4 text-primary text-center">Get Involved</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Vendor & Cultural Participation */}
						<Card className="shadow-lg hover:shadow-xl transition-shadow gap-2">
							<CardHeader>
								<CardTitle className="text-xl text-primary">Vendor & Cultural Participation</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-base text-slate-700 dark:text-slate-300">
									Vendor and Cultural applications are now closed.
									<br />
									Please check back next year for opportunities to participate in Hum Sub Diwali 2026.
								</p>
							</CardContent>
						</Card>

						{/* Mobile Apps */}
						<Card className="shadow-lg hover:shadow-xl transition-shadow gap-2">
							<CardHeader>
								<CardTitle className="text-xl text-primary">Download Our Mobile Apps</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-base text-slate-700 dark:text-slate-300">
									Don't miss out on the convenience and efficiency our mobile apps offer. Download them now and
									experience the difference for yourself!
								</p>
							</CardContent>
							<CardFooter className="flex flex-col sm:flex-row justify-center gap-4">
								<Button asChild className="w-full sm:w-auto">
									<a
										href="https://apps.apple.com/us/app/hum-sub/id6636518213"
										target="_blank"
										rel="noopener noreferrer"
										className="no-underline"
									>
										Download for iOS
									</a>
								</Button>
								<Button variant="secondary" asChild className="w-full sm:w-auto">
									<a
										href="https://play.google.com/store/apps/details?id=com.humsub2.app"
										target="_blank"
										rel="noopener noreferrer"
										className="no-underline"
									>
										Download for Android
									</a>
								</Button>
							</CardFooter>
						</Card>
					</div>
				</section>
				<section className="not-prose shadow-lg rounded-xl bg-white dark:bg-base-100 dark:bg-slate-800 p-4 my-4">
					<h4 className="text-2xl font-bold text-center mb-4 text-primary dark:text-amber-300">Our Sponsors</h4>
					<Diwali2025SponsorsGrid />
				</section>
			</div>
		</>
	)
}
