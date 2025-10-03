import PrimeSponsorCard from "~/components/prime-sponsor-card"
import SponsorCard from "~/components/sponsor-card"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { getSponsorsByLevel } from "~/lib/sponsors"

export default function OurSponsors() {
	return (
		<div>
			<title>Our Sponsors | Hum Sub</title>
			<h1>2025 Sponsors</h1>

			<Card className="border-2 border-orange-400">
				<CardContent>
					<h2 className="text-black text-center text-primary text-3xl mt-2 mb-2">Prime Sponsor!</h2>
					<PrimeSponsorCard
						name="Marius Pharmaceuticals"
						href="/sponsor/marius"
						imagePaths={["/assets/sponsors/Marius_logo.png", "/assets/sponsors/rethink-testosterone-marius.jpeg"]}
						description="Marius Pharmaceuticals is the prime sponsor for Hum Sub."
					/>
					<p>
						Marius Pharmaceuticals - ReThink Testosterone's main goal is to help men dealing with low testosterone or
						Low T (male hypogonadism) better understand the symptoms of the condition and the impact it has on overall
						health and options for treating it.
					</p>
				</CardContent>
			</Card>

			<h2>Diamond Sponsors</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-transparent">
				{getSponsorsByLevel("diamond").map((sponsor) => (
					<SponsorCard key={sponsor.name} {...sponsor} />
				))}
			</div>

			<h2>Gold Sponsors</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				{getSponsorsByLevel("gold").map((sponsor) => (
					<SponsorCard key={sponsor.name} {...sponsor} />
				))}
			</div>

			<h2>Silver Sponsors</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				{getSponsorsByLevel("silver").map((sponsor) => (
					<SponsorCard key={sponsor.name} {...sponsor} />
				))}
			</div>

			<h2>Bronze Sponsors</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				{getSponsorsByLevel("bronze").map((sponsor) => (
					<SponsorCard key={sponsor.name} {...sponsor} />
				))}
			</div>

			<h2>Media Partners</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				{getSponsorsByLevel("media").map((sponsor) => (
					<SponsorCard key={sponsor.name} {...sponsor} />
				))}
			</div>

			<h2>Grantors</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-transparent">
				{getSponsorsByLevel("grantor").map((sponsor) => (
					<SponsorCard key={sponsor.name} {...sponsor} />
				))}
			</div>

			<p>
				Hum Sub is supported by the United Arts Council of Raleigh and Wake County as well as the NC Arts Council, a
				division of the Department of Natural and Cultural Resources.
			</p>
			{/* - No partners anymore. Removed Cary Ballet.
			<h2>Partners</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				{getSponsorsByLevel("partner").map((sponsor) => (
					<SponsorCard key={sponsor.name} {...sponsor} />
				))}
			</div>
			*/}

			<Card className="shadow-lg hover:shadow-xl transition-shadow mt-4">
				<CardHeader>
					<CardTitle className="text-2xl text-primary">Become a sponsor</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						Join us in celebrating 25 years of Hum Sub by becoming a sponsor! Your support will help us continue to
						provide a platform for cultural exchange and community engagement. As a sponsor, you'll have the opportunity
						to showcase your brand to a diverse audience and demonstrate your commitment to cultural diversity.
					</div>
				</CardContent>
				<CardFooter className="justify-end space-x-2 mt-4">
					<Button asChild>
						<a href="mailto:sponsorship@humsub.net">Contact Us</a>
					</Button>
					<Button asChild>
						<a
							href="/assets/sponsors/HumSub_25th_Anniversary_Sponsorship_Benefits.pdf"
							target="_blank"
							rel="noopener noreferrer"
						>
							Sponsorship Benefits
						</a>
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
