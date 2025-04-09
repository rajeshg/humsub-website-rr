import PrimeSponsorCard from "~/components/prime-sponsor-card"
import SponsorCard from "~/components/sponsor-card"

export default function OurSponsors() {
	return (
		<div>
			<title>Our Sponsors | Hum Sub</title>
			<h1>2024 Sponsors</h1>

			<h2>Prime Sponsor</h2>
			<PrimeSponsorCard
				name="Marius Pharmaceuticals"
				imagePath="/assets/sponsors/Marius_logo.png"
				description="Marius Pharmaceuticals is the prime sponsor for Hum Sub."
			/>
			<p>
				Marius Pharmaceuticals - ReThink Testosterone's main goal is to help men dealing with low testosterone or Low T
				(male hypogonadism) better understand the symptoms of the condition and the impact it has on overall health and
				options for treating it.
			</p>

			<h2>Diamond Sponsors</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-transparent">
				<SponsorCard
					name="Coastal Credit Union"
					imagePath="/assets/sponsors/coastal-logo.png"
					description="Exclusive sponsor for Youth achievement award"
				/>
				<SponsorCard
					name="Coastal Credit Union"
					imagePath="/assets/sponsors/publix.png"
					description="Exclusive fireworks sponsor"
				/>
			</div>

			<h2>Gold Sponsors</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				<SponsorCard name="BMW of Southpoint" imagePath="/assets/sponsors/BMW-joint-new-logo.png" />
				<SponsorCard
					name="Pinnacle Financial Partners"
					imagePath="/assets/sponsors/pinnacle-financial-partners-color.jpg"
					description="Exclusive sponsor for Exhibition Booth"
				/>
				<SponsorCard name="Wells Fargo" imagePath="/assets/sponsors/WellsFargo-logo.png" />
				<SponsorCard
					name="Raj Jewels"
					imagePath="/assets/sponsors/raj-jewels-logo.jpeg"
					description="Exclusive sponsor for Celebrity Dance"
				/>
			</div>

			<h2>Silver Sponsors</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				<SponsorCard
					name="Nu Image Surgical & Dental Implant Center"
					imagePath="/assets/sponsors/sponsor_ncimplant.png"
				/>
				<SponsorCard name="PNC Bank" imagePath="/assets/sponsors/pnc_bank_logo.jpg" />
				<SponsorCard name="Khara Orthodontics" imagePath="/assets/sponsors/khara.webp" />
			</div>

			<h2>Bronze Sponsors</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				<SponsorCard name="Fidelity Investments" imagePath="/assets/sponsors/fidelity_investments_logo.jpg" />
			</div>

			<h2>Media Partners</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				<SponsorCard name="Radio Nyra" imagePath="/assets/sponsors/Radio-Nyra-logo.png" />
			</div>

			<h2>Grantors</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				<SponsorCard name="Town of Cary, NC" imagePath="/assets/sponsors/town-of-cary-logo.png" />
				<SponsorCard
					name="United Arts - Wake County"
					imagePath="/assets/sponsors/uac-logo.png"
					description="Hum Sub is supported by the United Arts Wake County as well as the N.C. Arts Council, a division of the Department of Natural and Cultural Resources."
				/>
				<SponsorCard name="Lazy Daze Festival, Cary" imagePath="/assets/sponsors/lazy-daze.jpg" />
				<SponsorCard name="North Carolina Arts Council" imagePath="/assets/sponsors/NCAC-color2.jpg" />
			</div>

			<p>
				Hum Sub is supported by the United Arts Council of Raleigh and Wake County as well as the NC Arts Council, a
				division of the Department of Natural and Cultural Resources.
			</p>

			<p>
				For sponsorship opportunities, please contact <a href="mailto:sponsorship@humsub.net">sponsorship@humsub.net</a>
			</p>

			<h2>Partners</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				<SponsorCard
					name="Triangle Nonprofit & Volunteer Leadership Center"
					imagePath="/assets/sponsors/TNVLC-Logo-no-bg.png"
				/>
				<SponsorCard name="Cary Ballet Company" imagePath="/assets/sponsors/cary-ballet-company-logo.png" />
			</div>
		</div>
	)
}
