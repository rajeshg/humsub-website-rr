import { CalendarDays, Car, MapPin, Package, Users } from "lucide-react"
import { Link } from "react-router"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { sponsors as sponsors2025 } from "~/lib/sponsors"
import { useTimeUntil } from "~/lib/timeuntil"

interface HeroProps {
	eventDate: Date
}

function Hero({ eventDate }: HeroProps) {
	const timeLeft = useTimeUntil(eventDate)

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

function Diwali2026SponsorsGrid() {
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

export default function HumSubDiwali2026() {
	// Set event date to Diwali 2026 - October 10, 2026 at 9:00 AM
	const eventDate = new Date(2026, 9, 10, 9, 0, 0) // Month is 0-indexed, so 9 = October

	return (
		<div className="container bg-white dark:bg-black">
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
									2026 Celebration
								</span>
							</h1>
							<div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 mx-auto rounded-full animate-in zoom-in-50 duration-1000 delay-700"></div>
						</div>
						
						{/* Event Details with Enhanced Card */}
						<div className="bg-white/90 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-orange-200/50 dark:border-orange-600/30 shadow-2xl max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-300 animate-in slide-in-from-bottom-4 duration-1000 delay-500 mb-8">
							<div className="space-y-4 text-gray-800 dark:text-gray-100">
								<div className="flex items-center gap-3 md:text-xl font-medium">
									<div className="p-2 bg-orange-100 dark:bg-orange-900/60 rounded-full">
										<CalendarDays className="h-6 w-6 text-amber-600 dark:text-amber-300" />
									</div>
									<span className="text-balance">October 10, 2026 9 AM - 9 PM</span>
								</div>
								<div className="flex gap-3 md:text-xl font-medium">
									<div className="p-2 bg-orange-100 dark:bg-orange-900/60 rounded-full">
										<MapPin className="h-6 w-6 text-amber-600 dark:text-amber-300" />
									</div>
									<span>Koka Booth Amphitheatre, Cary, NC</span>
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
						<div className="space-y-8">
							<Hero eventDate={eventDate} />

							<div className="animate-in slide-in-from-bottom-4 duration-1000 delay-700">
								<p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto font-medium text-center">
									Join us for a full day of celebration, delicious food, vibrant performances, community booths, and a{" "}
									<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 font-semibold">
										spectacular fireworks finale
									</span>
									.
								</p>
							</div>
						</div>
						{/* Enhanced Action Buttons */}
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 animate-in slide-in-from-bottom-4 duration-1000 delay-1000">
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
			<div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20 space-y-16 md:space-y-24">
				<section className="space-y-12">
					<div className="text-center space-y-6">
						<h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-300 dark:via-amber-300 dark:to-yellow-300 bg-clip-text text-transparent">
							Plan Your Visit
						</h2>
						<div className="flex items-center justify-center gap-4">
							<div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-orange-400 rounded-full"></div>
							<div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
							<div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
						</div>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							Everything you need to know for an amazing day at Hum Sub Diwali 2026
						</p>
					</div>

					{/* Venue Details - Enhanced Card */}
					<Card className="shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
						<CardHeader className="pb-4">
							<CardTitle className="text-2xl text-primary flex items-center gap-3">
								<div className="p-2 bg-primary/10 rounded-lg">
									<MapPin className="h-6 w-6" />
								</div>
								Venue Information
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<div className="flex flex-col sm:flex-row sm:items-center gap-2">
									<span className="font-semibold text-primary min-w-[100px]">Location:</span>
									<span>Koka Booth Amphitheatre, 8003 Regency Pkwy, Cary, NC 27518</span>
								</div>
								<div className="flex flex-col sm:flex-row sm:items-center gap-2">
									<span className="font-semibold text-primary min-w-[100px]">Parking:</span>
									<span>$10 General / $20 Preferred Parking</span>
								</div>
								<div className="flex flex-col sm:flex-row sm:items-center gap-2">
									<span className="font-semibold text-primary min-w-[100px]">Admission:</span>
									<Badge
										variant="default"
										className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 w-fit"
									>
										🎉 FREE TO THE PUBLIC 🎉
									</Badge>
								</div>
							</div>

							<div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
								<p className="text-sm text-orange-800 dark:text-orange-200">
									<span className="font-semibold">Seating Note:</span> Membership required for reserved seating. $10
									annual membership available.
								</p>
							</div>

							<div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
								<p className="text-sm text-blue-800 dark:text-blue-200">
									<span className="font-semibold">Cashless Venue:</span> Koka Booth Amphitheatre is cashless. Many event
									vendors will accept cash and cards. No ATMs on-site.
								</p>
							</div>
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

					{/* Detailed Information Sections */}
					<div className="mt-16">
						<Accordion type="single" collapsible className="w-full space-y-6" defaultValue="schedule">
							<AccordionItem
								value="schedule"
								className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
							>
								<AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-lg font-semibold">
									<span className="flex items-center gap-3 w-full">
										<div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
											<CalendarDays className="h-5 w-5 text-orange-600 dark:text-orange-400" />
										</div>
										<span>Schedule & Highlights</span>
									</span>
								</AccordionTrigger>
								<AccordionContent className="px-6 pb-6 bg-gray-50/50 dark:bg-gray-800/50">
									<div className="space-y-4">
										<div className="grid gap-3">
											<div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-orange-100 dark:border-orange-900">
												<span className="text-lg font-bold text-orange-600 dark:text-orange-400 min-w-[80px]">
													9:00 AM
												</span>
												<span>Gates Open, Food & Vendor Village</span>
											</div>
											<div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-orange-100 dark:border-orange-900">
												<span className="text-lg font-bold text-orange-600 dark:text-orange-400 min-w-[80px]">
													9:45 AM
												</span>
												<span>Cultural Performances Begin (Main Stage)</span>
											</div>
											<div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-orange-100 dark:border-orange-900">
												<span className="text-lg font-bold text-orange-600 dark:text-orange-400 min-w-[80px]">
													5:30 PM
												</span>
												<span>Special Evening Show with Featured Artists</span>
											</div>
											<div className="flex items-center gap-4 p-3 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
												<span className="text-lg font-bold text-amber-600 dark:text-amber-400 min-w-[80px]">
													9:00 PM
												</span>
												<span className="font-semibold">✨ Grand Fireworks Finale ✨</span>
											</div>
										</div>
										<div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
											<p className="text-blue-800 dark:text-blue-200 text-sm">
												<span className="font-semibold">All Day:</span> Enjoy exhibition booths, food vendors, and
												family-friendly activities available throughout the event. Special programs and demonstrations
												will be held hourly at the exhibition booth until 5 PM.
											</p>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</section>
				<section className="space-y-12">
					<div className="text-center space-y-6">
						<h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
							Get Involved
						</h2>
						<div className="flex items-center justify-center gap-4">
							<div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-400 rounded-full"></div>
							<div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
							<div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full"></div>
						</div>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							Join our community and make Hum Sub Diwali 2026 even more special
						</p>
					</div>

					{/* Get Involved Accordion Sections */}
					<div className="mt-16">
						<Accordion type="single" collapsible className="w-full space-y-6" defaultValue="vendor-participation">
							<AccordionItem
								value="vendor-participation"
								className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
							>
								<AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-lg font-semibold">
									<span className="flex items-center gap-3 w-full">
										<div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
											<span className="text-xl text-amber-600 dark:text-amber-400">🎪</span>
										</div>
										<span>Vendor & Cultural Participation</span>
									</span>
								</AccordionTrigger>
								<AccordionContent className="px-6 pb-6 bg-gray-50/50 dark:bg-gray-800/50">
									<div className="space-y-4">
										<div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
											<p className="text-blue-800 dark:text-blue-200 font-medium">
												<span className="text-blue-600 dark:text-blue-400">📋</span> Applications will open in May 2026
											</p>
										</div>
										<p className="text-muted-foreground">
											Stay tuned for vendor and cultural participation opportunities for Hum Sub Diwali 2026. 
											Applications will be available on our website in May 2026.
										</p>
									</div>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem
								value="volunteer"
								className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
							>
								<AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-lg font-semibold">
									<span className="flex items-center gap-3 w-full">
										<div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
											<Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
										</div>
										<span>Volunteer With Us</span>
									</span>
								</AccordionTrigger>
								<AccordionContent className="px-6 pb-6 bg-gray-50/50 dark:bg-gray-800/50">
									<div className="space-y-4">
										<div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
											<h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-lg">
												<span className="text-purple-600 dark:text-purple-400">🤝</span> Join Our Volunteer Team
											</h4>
											<p className="text-muted-foreground mb-4">
												Volunteers are the backbone of any organization. We at Hum Sub value, cherish, and appreciate
												volunteers in all age groups (minimum age of volunteer is 14; minimum age to register
												independently is 16) who support us during our events.
											</p>
											<p className="text-muted-foreground mb-4">
												By working together, great things can be accomplished. At Hum Sub, our strength lies in our
												volunteer system. We encourage you to sign up for volunteer duties at our events including Hum
												Sub Diwali, Basant Bahar, and special events.
											</p>
											<p className="text-muted-foreground mb-4">
												To volunteer with us, we kindly ask that you become a member first. This ensures our volunteers
												are part of our community and get priority access to opportunities.{" "}
												<Link
													to="/membership/signup"
													className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200"
												>
													Sign up for membership here
												</Link>
												.
											</p>
											<div className="flex justify-center mt-6">
												<Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
													<a
														href="https://portal.humsub.org/index.php/login/volunteer"
														target="_blank"
														rel="noopener noreferrer"
														className="no-underline"
													>
														Sign Up to Volunteer
													</a>
												</Button>
											</div>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem
								value="mobile-app"
								className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
							>
								<AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-lg font-semibold">
									<span className="flex items-center gap-3 w-full">
										<div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
											<span className="text-xl text-blue-600 dark:text-blue-400">📱</span>
										</div>
										<span>Hum Sub Mobile App</span>
									</span>
								</AccordionTrigger>
								<AccordionContent className="px-6 pb-6 bg-gray-50/50 dark:bg-gray-800/50">
									<div className="space-y-4">
										<div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
											<h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-lg">
												<span className="text-blue-600 dark:text-blue-400">📱</span> Stay Connected
											</h4>
											<p className="text-muted-foreground mb-4">
												Stay connected and get the most out of your Hum Sub experience with our mobile app!
											</p>
											<div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6">
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
											</div>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</section>
				<section className="space-y-12">
					<div className="text-center space-y-6">
						<h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-300 dark:via-emerald-300 dark:to-teal-300 bg-clip-text text-transparent">
							Our Sponsors
						</h2>
						<div className="flex items-center justify-center gap-4">
							<div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-green-400 rounded-full"></div>
							<div className="w-8 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
							<div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent rounded-full"></div>
						</div>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							Thank you to our amazing sponsors who make this celebration possible
						</p>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 md:p-12">
						<Diwali2026SponsorsGrid />
					</div>
				</section>
			</div>
		</div>
	)
}
