import { Link } from "react-router"

export default function HumSubDiwali2025() {
	return (
		<div>
			<h1>Hum Sub Diwali 2025</h1>
			<p>
				Hum Sub is proud to announce the 25th edition of the Hum Sub Diwali festival on Saturday October 11, 2025. Bring
				your families and friends for a daylong cultural immersion into the Indian subcontinent filled with lots of
				entertainment, shopping, sumptuous food and breathtaking fireworks. Please mark your calendars for 10/11 and
				watch for updates on <Link to="/">https://www.humsub.org</Link>.
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<section className="card w-full max-w-2xl mx-auto bg-base-100 dark:bg-neutral-800 shadow-sm not-prose">
					<div className="card-body">
						<h2 className="card-title mt-0">Group Performer Applications Open!</h2>
						<div>
							<p>
								🌟 <span className="font-semibold text-primary">Get ready to shine together!</span> 🌟<br /> Join us for
								the <span className="font-semibold">25th Grand Edition</span> of Hum Sub Diwali!. Group performer
								applications are now open for the 25th grand edition of Hum Sub Diwali! Whether it's{" "}
								<span className="font-semibold">dance, drama, music</span>, or more—gather your team and light up our
								stage with your collective talent!
							</p>
							<a
								href="/assets/HumSub-Cultural-Guidelines.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="link underline"
							>
								Click here to view our Cultural Event Guidelines!
							</a>
						</div>
						<div className="justify-end card-actions">
							<a
								href="https://portal.humsub.org/"
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn-primary"
							>
								Apply Now
							</a>
						</div>
					</div>
				</section>
				<section className="card w-full max-w-2xl mx-auto bg-base-100 dark:bg-neutral-800 shadow-sm not-prose">
					<div className="card-body">
						<h2 className="card-title mt-0">Download our mobile apps</h2>
						<p className="dark:text-neutral-200">
							Don't miss out on the convenience and efficiency our mobile apps offer. Download them now and experience
							the difference for yourself!
						</p>

						<div className="justify-end card-actions">
							<a
								href="https://apps.apple.com/us/app/hum-sub/id6636518213"
								className="btn btn-primary"
								target="_blank"
								rel="noopener noreferrer"
							>
								Download for iOS
							</a>
							<a
								href="https://play.google.com/store/apps/details?id=com.humsub2.app"
								className="btn btn-success"
								target="_blank"
								rel="noopener noreferrer"
							>
								Download for Android
							</a>
						</div>
					</div>
				</section>
			</div>
			<section className="my-4">
				<strong>When:</strong> October 11, 2025. Doors open 9 AM
				<br />
				<strong>Where:</strong> Koka Booth Amphitheater, 8003 Regency Pkwy, Cary, NC 27518
				<br />
				<strong>Parking:</strong> $10 General / $20 Preferred Parking
				<br />
				<strong>Admission:</strong> <span className="text-green-700 font-semibold">FREE TO THE PUBLIC.</span>
				<br />
				<span>
					<strong>Seating:</strong> Seniors (65 and older only with a valid government ID) have access to free seating
					(limited seats) all day long. Free seats for everyone upfront until daytime programs end.
					<br />
					<strong>Seating after 5 PM:</strong> Starting 5:00PM (possibly earlier),{" "}
					<span className="font-semibold text-red-700">EVERYONE</span> must have a ticket to reserve a spot at the
					seating area (Except for Seniors 65+).
					<br />
					<span className="ml-2">- Children 2 &amp; under are free but MUST sit on a lap.</span>
					<br />
					<span className="ml-2">
						- Seniors 65 &amp; Older MUST show a valid Government Issued ID at the Hum Sub Information Booth for a
						wristband to enter the seating area.
					</span>
					<br />
					<strong>NOTE:</strong> <span className="text-orange-700">SEATING IS SUBJECT TO AVAILABILITY.</span>
					<br />
					<strong>Seating arrangements:</strong>{" "}
					<a
						href="/assets/HD2024-SeatingArrangements-v2.pdf"
						target="_blank"
						rel="noopener noreferrer"
						className="link link-primary underline"
					>
						View PDF
					</a>
				</span>
			</section>
		</div>
	)
}
