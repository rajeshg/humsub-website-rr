import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function DiwaliEssayCompetition() {
	return (
		<>
			<title>Diwali Essay Competition | Hum Sub</title>
			<div className="min-h-screen">
				<div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4 py-8">
					{/* Header */}
					<div className="text-center mb-8">
						<h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-200 mb-2">
							Hum Sub - Diwali Essay Competition
						</h1>
						<p className="text-lg text-gray-600 dark:text-gray-300">
							Celebrate Diwali by sharing your thoughts!
						</p>
					</div>

					{/* Flyer Image */}
					<Card className="w-full max-w-5xl mb-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
						<CardContent className="flex flex-col items-center justify-center min-h-[200px] md:min-h-[250px] p-6">
							<img
								src="/assets/Hum-Sub-Diwali-Essay-Competition-2025.jpeg"
								alt="Hum Sub - Essay Competition Flyer"
								className="w-full max-w-md h-auto object-contain mx-auto hover:scale-105 transition-transform duration-300"
							/>
						</CardContent>
					</Card>

					{/* Contest Details & Rubric */}
					<Card className="w-full max-w-5xl mb-8 shadow-lg">
						<CardHeader>
							<CardTitle className="text-xl font-bold">
								Contest Details & Rubric
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="overflow-x-auto rounded bg-gray-50 dark:bg-gray-800 p-4">
								<iframe
									title="Hum Sub - Diwali Essay Competition Rubric"
									sandbox="allow-scripts allow-forms"
									className="w-full h-[400px] border-0"
									src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRWgsmmf3lUfAi-EDu13xc9qS4FNu-6L55nRGbP6mQZK7BZ-4oMNL2scXtnoDCbzHRUTfADhaMk65Gn/pubhtml?widget=true&amp;headers=false"
								></iframe>
							</div>
						</CardContent>
					</Card>

					{/* Empowerly Prizes & Partnership Section */}
					<Card className="w-full max-w-5xl mb-8 bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
						<CardContent className="p-8">
							<div className="flex flex-col md:flex-row items-center gap-6">
								<div className="flex-shrink-0">
									<img
										src="/assets/sponsors/empowerly.png"
										alt="Empowerly Logo"
										className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-lg shadow-lg border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-900 hover:scale-110 transition-transform duration-300"
									/>
								</div>
								<div className="flex-1 text-left">
									<Badge className="px-3 py-1 mb-2 bg-gray-100 dark:bg-gray-800 text-blue-900 dark:text-blue-100 font-semibold text-xs tracking-wide uppercase">
										Prizes Sponsored by Empowerly
									</Badge>
									<Badge className="px-3 py-1 mb-4 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-semibold text-xs tracking-wide uppercase shadow-sm">
										Empowerly Partnership
									</Badge>
									<div className="text-2xl font-extrabold text-blue-800 dark:text-blue-200 mb-2">
										1<sup>st</sup>{" "}
										<span className="text-green-600 dark:text-green-300">
											$500
										</span>
										<span className="mx-2 text-lg font-normal text-blue-400 dark:text-blue-300">
											|
										</span>
										2<sup>nd</sup>{" "}
										<span className="text-yellow-600 dark:text-yellow-300">
											$250
										</span>
									</div>
									<p className="font-semibold text-gray-800 dark:text-gray-100 text-lg mb-4">
										Empowerly proudly partners with{" "}
										<span className="text-blue-700 dark:text-blue-300 font-bold">
											Hum Sub
										</span>{" "}
										to uplift student voices and empower youth education.
									</p>
									<a
										href="https://empowerly.com"
										className="inline-block underline text-blue-700 dark:text-blue-300 font-medium hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-200"
										target="_blank"
										rel="noopener noreferrer"
									>
										Learn more at empowerly.com
									</a>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Entry Form Section */}
					<h3 className="text-2xl md:text-3xl font-extrabold text-blue-800 dark:text-blue-200 mb-2">Submit your entry</h3>
					<div className="w-full max-w-5xl overflow-x-auto">
						<iframe
							title="Hum Sub - Diwali Essay Competition Form"
							sandbox="allow-scripts allow-forms"
							className="w-full min-h-[1650px] border-0"
							src="https://form.jotform.com/242075159180051"
						></iframe>
					</div>


					{/* Footer */}
					<footer className="w-full max-w-5xl mx-auto py-8 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
						<div className="flex flex-col md:flex-row items-center justify-center gap-6">
							<img
								src="/assets/25yr-logo.png"
								alt="Hum Sub Logo"
								className="w-24 h-24 rounded-full object-contain shadow-lg hover:scale-105 transition-transform duration-300"
							/>
							<div className="hidden md:block text-2xl font-bold text-blue-600 dark:text-blue-400">+</div>
							<img
								src="/assets/sponsors/empowerly.png"
								alt="Empowerly Logo"
								className="w-24 h-24 p-1 rounded-lg object-contain shadow-lg hover:scale-105 transition-transform duration-300"
							/>
						</div>
					</footer>
				</div>
			</div>
		</>
	);
}
