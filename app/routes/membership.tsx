import { Button } from "~/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "~/components/ui/accordion"
import { Link } from "react-router"

export function meta() {
	return [
		{ title: "Membership | Hum Sub" },
		{
			name: "description",
			content:
				"Annual membership: priority Diwali seating, year-round offers, and members-only perks that help fund community programming.",
		},
	]
}

export default function Membership() {
	return (
		<div className="container mx-auto px-4 py-12 max-w-3xl">
			<h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">Hum Sub Membership</h1>

			<section className="prose prose-neutral dark:prose-invert mx-auto">
				<div className="text-center mb-6">
					<div className="text-2xl font-bold text-green-600 dark:text-green-400">$10 / year</div>
					<div className="text-sm text-muted-foreground">Annual membership (calendar year)</div>
				</div>

				<p>
					Membership is an annual plan that gives you priority access to our Diwali event's best seating and members-only perks —
					while helping fund and grow community programming. Memberships follow the calendar year for easy renewal planning.
				</p>

				<h2 className="mt-6 text-xl font-semibold">What you get</h2>

				<ul className="mt-3 space-y-3">
					<li className="flex items-start">
						<span className="text-green-600 mr-3 mt-1" aria-hidden="true">
							✅
						</span>
						<div>
							<strong>Front-Section Access at Diwali</strong>
							<div className="text-sm text-muted-foreground">
								Enjoy premium seating with no extra charge (first come, first served). The front section — typically used by performers'
								families — is reserved for members.
							</div>
						</div>
					</li>

					<li className="flex items-start">
						<span className="text-green-600 mr-3 mt-1" aria-hidden="true">
							✅
						</span>
						<div>
							<strong>Special Offers Year-Round</strong>
							<div className="text-sm text-muted-foreground">Exclusive member promotions and partner perks.</div>
						</div>
					</li>

					<li className="flex items-start">
						<span className="text-green-600 mr-3 mt-1" aria-hidden="true">
							✅
						</span>
						<div>
							<strong>Senior Access Included</strong>
							<div className="text-sm text-muted-foreground">
								We welcome our senior guests as members this year. Front-section access is included to help keep seating fair and
								consistent.
							</div>
						</div>
					</li>
				</ul>

				<div className="mt-6 p-4 rounded-md bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-800">
					<h3 className="text-lg font-medium">Note</h3>
					<p className="mt-2 text-sm text-muted-foreground">
						This year, membership is offered <strong>FREE</strong> as a benefit when you purchase a raffle ticket (sponsored by Lufthansa).
						See full details on our{" "}
						<Link to="/2025-raffle" className="text-blue-600 dark:text-blue-300 underline">
							raffle sign‑up page
						</Link>
						.
					</p>
				</div>

				<div className="text-center mt-8">
					<Link to="/membership/signup" aria-label="Open membership sign-up">
						<Button size="lg">Signup for Membership</Button>
					</Link>
				</div>

				{/* FAQ Accordion */}
				<div className="mt-10">
					<h2 className="text-xl font-semibold mb-4 text-center">Frequently Asked Questions</h2>
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="faq-1">
							<AccordionTrigger>What's the difference between a ticket and membership?</AccordionTrigger>
							<AccordionContent>
								Membership provides year‑round priority access and member perks. Individual tickets grant access for a single event.
								To secure membership in advance, visit our{" "}
								<Link to="/membership/signup" className="text-blue-600 underline">
									membership sign‑up page
								</Link>
								.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="faq-2">
							<AccordionTrigger>Can I just buy tickets instead of membership?</AccordionTrigger>
							<AccordionContent>
								Yes — single‑event tickets are available (often sold in person). Tickets grant event access only; membership adds priority
								and year‑round benefits.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="faq-3">
							<AccordionTrigger>Can we get membership in person at an event?</AccordionTrigger>
							<AccordionContent>
								Yes. You can purchase membership at the event or in advance via our{" "}
								<Link to="/membership/signup" className="text-blue-600 underline">
									membership sign‑up page
								</Link>
								.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="faq-4">
							<AccordionTrigger>Is seating reserved for members?</AccordionTrigger>
							<AccordionContent>
								Seating is offered on a priority, first‑come first‑served basis for members. The front section is reserved for members.
								We recommend arriving early (around 5:30 PM) to take advantage of member seating.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="faq-5">
							<AccordionTrigger>If I buy a membership, do I get tickets to events?</AccordionTrigger>
							<AccordionContent>
								Membership grants priority access but doesn't always replace event tickets when a separate ticketing system is used.
								Check the specific event page for details.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="faq-6">
							<AccordionTrigger>I am a member — can I bring family members?</AccordionTrigger>
							<AccordionContent>
								Membership is per person. Adults (18+) need their own membership. You may{" "}
								<Link to="/membership/signup" className="text-blue-600 underline">
									purchase additional memberships
								</Link>{" "}
								for family members online or at the event.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="faq-7">
							<AccordionTrigger>Do children need tickets or membership?</AccordionTrigger>
							<AccordionContent>
								Lap children under 3 years old do not require a ticket or membership. Children aged 3 and older should have their own
								ticket or membership as applicable.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="faq-8">
							<AccordionTrigger>Do I need a ticket or membership to take photos?</AccordionTrigger>
							<AccordionContent>
								To enhance the experience for our valued Hum Sub Members, the front-stage seating and photo area will be reserved exclusively for Members at Hum Sub Diwali 2025.
								📸 Parents and families are still welcome to take photos from other venue areas. For the best access and uninterrupted views, we encourage you to <Link to="/membership/signup" className="text-blue-600 underline">become a Member</Link> {" "} and enjoy this special benefit.
								Your membership supports scholarships, cultural programs, and year-round community initiatives—thank you for helping us keep our traditions alive.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="faq-9">
							<AccordionTrigger>Can members purchase extra tickets?</AccordionTrigger>
							<AccordionContent>
								Yes — members may buy additional tickets. Tickets can be purchased at our membership booth during events (cards accepted)
								or in advance online via the membership/ticket page.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="faq-10">
							<AccordionTrigger>Are there other perks like free parking?</AccordionTrigger>
							<AccordionContent>
								Currently membership provides priority seating only. Any future parking discounts or additional perks will be announced
								in advance.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</section>
		</div>
	)
}