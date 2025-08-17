import { Button } from "~/components/ui/button"

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
				<p>
					Membership is an annual plan that gives you priority access to our Diwali event's best seating and
					members-only perks — all while helping us fund and grow community programming.
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
								Enjoy premium seating with no extra charge (first come, first served).
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
								We're excited to welcome our senior guests as members this year. To help keep seating fair and
								consistent, front-section access is part of membership benefits for all — including our cherished senior
								attendees.
							</div>
						</div>
					</li>
				</ul>

				<div className="mt-6 p-4 rounded-md bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-800">
					<h3 className="text-lg font-medium">Note</h3>
					<p className="mt-2 text-sm text-muted-foreground">
						This year, membership comes <strong>FREE</strong> as a perk with the purchase of a raffle ticket (sponsored
						by Lufthansa). See full details on our{" "}
						<a href="/2025-raffle" className="text-blue-600 dark:text-blue-300 underline">
							raffle signup page
						</a>
						.
					</p>
				</div>

				<div className="text-center mt-8">
					<a
						href="https://portal.humsub.org/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Sign up for Hum Sub membership (opens in new tab)"
					>
						<Button size="lg">Sign Up Now</Button>
					</a>
				</div>
			</section>
		</div>
	)
}
