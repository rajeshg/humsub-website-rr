import { useParams } from "react-router"
import empowerlyLogo from "../../public/assets/sponsors/empowerly.png"
import thePrattVillasLogo from "../../public/assets/sponsors/the-pratt-villas-logo.jpeg"

const SPONSOR_DATA: Record<string, { name: string; description: string; logo?: string; content: React.ReactNode }> = {
	empowerly: {
		name: "Empowerly",
		logo: empowerlyLogo,
		description: "Education partner and exclusive sponsor for our Essay Competition.",
		content: (
			<>
				<div className="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 my-8">
					<img src={empowerlyLogo} alt="Empowerly Logo" className="w-48 h-48 object-contain rounded-lg" />
					<div className="flex-1">
						<h2 className="text-3xl font-bold mb-2">Empowerly</h2>
						<span className="inline-block mb-2 px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
							Education Partner
						</span>
						<p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
							Empowerly is a leading college admissions counseling platform dedicated to empowering students to become
							the best versions of themselves. With a 98% success rate for top 100 US college admissions, Empowerly
							offers personalized, data-driven guidance, exclusive extracurricular programs, and holistic support for
							every step of the higher education journey.
						</p>
						<p className="mb-4 text-gray-600 dark:text-gray-300">
							As our <b>Education Partner</b> and exclusive sponsor for the Hum Sub Diwali Essay Competition, Empowerly
							helps uplift student voices and inspire academic excellence in our community.
						</p>
						<a
							href="https://empowerly.com"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition no-underline"
						>
							Learn more at empowerly.com
						</a>
					</div>
				</div>
				<div className="bg-white dark:bg-gray-900 rounded-lg p-6 mt-4 border border-gray-200 dark:border-gray-700">
					<h3 className="text-xl font-semibold mb-2 text-blue-700">Thank you, Empowerly!</h3>
					<p className="text-gray-700 dark:text-gray-200">
						Your partnership helps us bring communities together and inspire the next generation.
					</p>
				</div>
			</>
		),
	},
	"the-pratt-villas": {
		name: "The Pratt Villas",
		logo: thePrattVillasLogo,
		description: "Hospitality partner generously hosting our artists and guests with exceptional accommodations.",
		content: (
			<>
				<div className="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 my-8">
					<div>
						<img src={thePrattVillasLogo} alt="The Pratt Villas Logo" className="w-48 h-48 object-contain rounded-lg" />
						<img
							src="/assets/sponsors/the-pratt-destination.jpeg"
							alt="The Pratt Destination"
							className="w-48 h-48 object-contain rounded-lg"
						/>
					</div>
					<div className="flex-1">
						<h2 className="text-3xl font-bold mb-2">The Pratt Villas</h2>
						<span className="inline-block mb-2 px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
							Hospitality Partner
						</span>
						<p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
							The Pratt Villas offers luxury and corporate rentals, real estate, and relocation consulting in the
							Triangle of NC. Renowned for their exceptional accommodations and personalized service, they provide a
							true "Stile Di Vita Sontuoso"—a luxurious lifestyle—for every guest.
						</p>
						<p className="mb-4 text-gray-600 dark:text-gray-300">
							As our <b>Hospitality Partner</b>, The Pratt Villas generously hosts our artists and guests, ensuring a
							memorable and comfortable experience during Hum Sub events.
						</p>
						<a
							href="https://theprattvillas.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition no-underline"
						>
							Visit theprattvillas.com
						</a>
					</div>
				</div>
				<div className="bg-white dark:bg-gray-900 rounded-lg p-6 mt-4 border border-gray-200 dark:border-gray-700">
					<h3 className="text-xl font-semibold mb-2 text-blue-700">Thank you, The Pratt Villas!</h3>
					<p className="text-gray-700 dark:text-gray-200">
						Your support makes a difference in our community's cultural journey.
					</p>
				</div>
			</>
		),
	},
}

export default function SponsorPage() {
	const { sponsorSlug } = useParams() as { sponsorSlug: string }
	const sponsor = SPONSOR_DATA[sponsorSlug?.toLowerCase()]

	if (!sponsor) {
		return (
			<div className="max-w-2xl mx-auto py-16 text-center">
				<h1 className="text-2xl font-bold mb-4">Sponsor Not Found</h1>
				<p className="text-gray-600 dark:text-gray-300">We couldn't find the sponsor you're looking for.</p>
			</div>
		)
	}

	return <div className="max-w-3xl mx-auto p-4 no-prose">{sponsor.content}</div>
}
