import { Link } from "react-router"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"

export default function HumSubDiwali2025() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-6 text-primary">Hum Sub Diwali 2025</h1>

			<div className="prose dark:prose-invert max-w-none mb-8">
				<p className="text-lg">
					Hum Sub is proud to announce the 25th edition of the Hum Sub Diwali festival on Saturday October 11, 2025.
					Bring your families and friends for a daylong cultural immersion into the Indian subcontinent filled with lots
					of entertainment, shopping, sumptuous food and breathtaking fireworks. Please mark your calendars for 10/11
					and watch for updates on{" "}
					<Link to="/" className="link link-primary">
						https://www.humsub.org
					</Link>
					.
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 not-prose">
				<Card className="shadow-lg hover:shadow-xl transition-shadow">
					<CardHeader>
						<CardTitle className="text-2xl text-primary">Vendor Applications Open!</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<p>
								🌟{" "}
								<span className="font-semibold text-primary">
									Want to be a vendor and setup booth at our Diwali event?
								</span>{" "}
								🌟
								<br />
								Our festival provides an opportunity to reach out to thousands of attendees in the Triangle Area.
								<br />
								Contact us if you are interested in setting up a Vendor Booth to{" "}
								<span className="font-semibold">market or sell your products or services during our events</span>.
							</p>
						</div>
					</CardContent>
					<CardFooter className="justify-end space-x-2 mt-4">
						<Button asChild>
							<a href="/assets/HD2025_Vendor_Application_Guidelines.pdf" target="_blank" rel="noopener noreferrer">
								Vendor Guidelines
							</a>
						</Button>
						<Button asChild>
							<a href="https://portal.humsub.org/" target="_blank" rel="noopener noreferrer">
								Apply Now
							</a>
						</Button>
					</CardFooter>
				</Card>

				<Card className="shadow-lg hover:shadow-xl transition-shadow">
					<CardHeader>
						<CardTitle className="text-2xl text-primary">Group Performer Applications Open!</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<p>
								🌟 <span className="font-semibold text-primary">Get ready to shine together!</span> 🌟<br /> Join us for
								the <span className="font-semibold">25th Grand Edition</span> of Hum Sub Diwali!. Group performer
								applications are now open for the 25th grand edition of Hum Sub Diwali! Whether it's{" "}
								<span className="font-semibold">dance, drama, music</span>, or more—gather your team and light up our
								stage with your collective talent!
							</p>
						</div>
					</CardContent>
					<CardFooter className="justify-end space-x-2 mt-4">
						<Button asChild>
							<a href="/assets/HS-Diwali-2025-Guidelines.pdf" target="_blank" rel="noopener noreferrer">
								Cultural Event Guidelines
							</a>
						</Button>
						<Button asChild>
							<a href="https://portal.humsub.org/" target="_blank" rel="noopener noreferrer">
								Apply Now
							</a>
						</Button>
					</CardFooter>
				</Card>
			</div>

			<Card className="shadow-lg hover:shadow-xl transition-shadow mb-8">
				<CardHeader>
					<CardTitle className="text-2xl text-primary">Download our mobile apps</CardTitle>
				</CardHeader>
				<CardContent>
					<p>
						Don't miss out on the convenience and efficiency our mobile apps offer. Download them now and experience the
						difference for yourself!
					</p>
				</CardContent>
				<CardFooter className="justify-end space-x-2 mt-4">
					<Button asChild>
						<a
							href="https://apps.apple.com/us/app/hum-sub/id6636518213"
							target="_blank"
							rel="noopener noreferrer"
							className="no-underline"
						>
							Download for iOS
						</a>
					</Button>
					<Button variant="secondary" asChild>
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

			<Card className="shadow-lg">
				<CardContent className="pt-6">
					{" "}
					{/* Added pt-6 for padding as there's no CardHeader */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<p>
								<strong className="text-primary">When:</strong> October 11, 2025. Doors open 9 AM
							</p>
							<p>
								<strong className="text-primary">Where:</strong> Koka Booth Amphitheater, 8003 Regency Pkwy, Cary, NC
								27518
							</p>
							<p>
								<strong className="text-primary">Parking:</strong> $10 General / $20 Preferred Parking
							</p>
							<p>
								<strong className="text-primary">Admission:</strong>
								<Badge variant="default" className="ml-2 bg-green-600 hover:bg-green-700 text-white">
									FREE TO THE PUBLIC
								</Badge>
							</p>
						</div>

						<div className="space-y-3">
							<div>
								<strong className="text-primary">Seating:</strong>
								<p>
									Seniors (65 and older only with a valid government ID) have access to free seating (limited seats) all
									day long. Free seats for everyone upfront until daytime programs end.
								</p>
							</div>

							<div>
								<strong className="text-primary">Seating after 5 PM:</strong>
								<p>
									Starting 5:00PM (possibly earlier), <span className="font-semibold text-error">EVERYONE</span> must
									have a ticket to reserve a spot at the seating area (Except for Seniors 65+).
								</p>
							</div>

							<ul className="list-disc pl-5 space-y-2">
								<li>Children 2 & under are free but MUST sit on a lap.</li>
								<li>
									Seniors 65 & Older MUST show a valid Government Issued ID at the Hum Sub Information Booth for a
									wristband to enter the seating area.
								</li>
							</ul>

							<div className="alert alert-warning alert-soft mt-4">
								<span className="font-semibold">NOTE:</span> SEATING IS SUBJECT TO AVAILABILITY
							</div>

							<div className="mt-4">
								<strong className="text-primary">Seating arrangements:</strong>
								<Button variant="outline" size="sm" className="ml-2" asChild>
									<a
										href="/assets/HD2024-SeatingArrangements-v2.pdf"
										target="_blank"
										rel="noopener noreferrer"
										className="no-underline"
									>
										View PDF
									</a>
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
