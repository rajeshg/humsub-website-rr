export default function Raffle2025() {
	return (
		<div className="min-h-screen bg-gray-50 dark:from-gray-900 dark:to-gray-800">
			<div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
				{/* Header Section */}
				<div className="text-center mb-8">
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
						Hum Sub Diwali 2025 Raffle
					</h1>
					<div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
						<span className="text-blue-700 dark:text-blue-300 font-medium">Sponsored by Lufthansa</span>
					</div>
				</div>

				{/* Prize Announcement */}
				<div className="max-w-4xl mx-auto mb-8">
					<div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-1 shadow-lg">
						<div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
							<div className="text-4xl sm:text-5xl mb-3">🎉✨</div>
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
								Win 2 Round-Trip Lufthansa Tickets
							</h2>
							<p className="text-lg text-gray-600 dark:text-gray-300">Valued at $2,500 each</p>
						</div>
					</div>
				</div>

				{/* Content Section */}
				<div className="max-w-3xl mx-auto mb-8">
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
						<div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
							<div className="text-center mb-6">
								<p className="text-lg font-medium text-gray-900 dark:text-white">
									Presented by Lufthansa | Celebrating Togetherness with Hum Sub
								</p>
							</div>

							<div className="flex items-start space-x-3">
								<p className="text-lg">
									<span className="text-3xl pr-4">🌟</span>
									This Diwali, Hum Sub is lighting up the skies — literally!
								</p>
							</div>

							<p className="text-lg">
								Thanks to our generous sponsor Lufthansa, you have the chance to win{" "}
								<span className="font-semibold text-orange-600 dark:text-orange-400">
									TWO round-trip airline tickets
								</span>{" "}
								(valued at $2,500 each) to any Lufthansa destination worldwide!
							</p>

							<p className="text-lg">
								Whether you're planning to visit loved ones, explore a dream destination, or experience a new culture —
								this is your chance to fly in style and comfort with one of the world's leading airlines.
							</p>

							<div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-6">
								<div className="flex items-start space-x-2">
									<span className="text-amber-600 dark:text-amber-400 text-xl">💡</span>
									<p className="text-amber-800 dark:text-amber-200 font-medium">
										<strong>NOTE:</strong> On Zeffy's payment screen, feel free to enter '0' if you prefer not to
										donate—there's no obligation.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Raffle Form */}
				<div className="max-w-4xl mx-auto">
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
						<div className="bg-gradient-to-r from-orange-500 to-amber-600 px-6 py-4">
							<h3 className="text-xl font-semibold text-white text-center">Enter the Raffle</h3>
						</div>
						<div className="p-2">
							<div className="relative overflow-hidden rounded-lg" style={{ height: "600px" }}>
								<iframe
									title="Donation form powered by Zeffy"
									className="absolute inset-0 w-full h-full border-0"
									src="https://www.zeffy.com/embed/ticketing/hum-sub-diwali-2025-raffle-sponsored-by-lufthansa"
									allow="payment"
									allowTransparency={true}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="text-center mt-8 text-gray-600 dark:text-gray-400">
					<p className="text-sm">Good luck to all participants! 🍀</p>
				</div>
			</div>
		</div>
	)
}
