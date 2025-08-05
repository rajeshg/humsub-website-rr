import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { Button } from "~/components/ui/button"

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
					<div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-1 pb-5 shadow-lg">
						<div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
							<div className="text-4xl sm:text-5xl mb-3">🎉✨</div>
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
								Win 2 Round-Trip Lufthansa Tickets
							</h2>
							<p className="text-lg text-gray-600 dark:text-gray-300">Valued at $2,500 each</p>
						</div>

						<Raffle2025Button />
					</div>
				</div>

				{/* Content Section */}
				<div className="max-w-3xl mx-auto mb-8">
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
						<div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
							<div className="text-center mb-6">
								<p className="text-lg font-medium text-gray-900 dark:text-white">
									Presented by Lufthansa | In Partnership with Hum Sub
								</p>
							</div>

							<div className="">
								<p className="text-lg">
									Celebrate Diwali with a chance to fly anywhere Lufthansa flies!<sup>*</sup>
									<br/>
									<ul>
										<li>🎟️ $50 per raffle ticket</li>
										<li>💡 $100 = 2 tickets = double the chances!</li>
									</ul>
								</p>
								<p className="text-lg">
									Don't miss out — let the skies be part of your celebration! 🛫🌟 <br/>
									<span className="text-sm">* Terms apply.</span>
								</p>
							</div>

							<Raffle2025Button />

							<div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-4 mt-6">
								<div className="flex space-x-2 place-items-center">
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

				<div className="max-w-3xl mx-auto mb-8">
				<h3>Raffle FAQs</h3>
				<Accordion type="single" collapsible defaultValue="item-1" className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger className="font-semibold text-left">
							Do we have to pay extra fee to Zeffy to buy raffle ticket?
							</AccordionTrigger>
						<AccordionContent>
							<p>There are no required additional fees to purchase a raffle ticket via Zeffy. You have the option to enter '0' on the payment page if you do not wish to make a donation. Please note that any donation amount goes solely to Zeffy.</p>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger className="font-semibold text-left">
							How many raffles will there be and what is the value of each ticket?
						</AccordionTrigger>
						<AccordionContent>
							<p>There will be 2 raffles, one for each ticket. Each ticket is deemed to be of $2500 value.</p>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger className="font-semibold text-left">
							What do the winners receive and how can they use it?
						</AccordionTrigger>
						<AccordionContent>
							<p>Winners will receive a voucher that they can use however they want, for themselves or a family member. We don't control that.</p>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-4">
						<AccordionTrigger className="font-semibold text-left">
							Is it possible to buy more than one ticket to increase my odds of winning?
						</AccordionTrigger>
						<AccordionContent>
							<p>Yes, it is possible to buy more than one ticket to increase your chances of winning.</p>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-5">
						<AccordionTrigger className="font-semibold text-left">
							How are the winners picked?
						</AccordionTrigger>
						<AccordionContent>
							<p>
								On the event day, raffle buyers will have to visit the Hum Sub Information booth and collect their physical
								raffle ticket with their code on it. They keep one half of the raffle ticket with themselves and drop it in a
								container. Winners will be picked at 2 separate occasions throughout the day.
							</p>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-6">
						<AccordionTrigger className="font-semibold text-left">
							Do winners have to be physically present on event day?
						</AccordionTrigger>
						<AccordionContent>
							<p>
								Either the winner or someone they delegate (with the actual raffle ticket) can claim the prize. The important
								thing is they need to present the actual winning raffle ticket to claim. If no one claims, it will be opened
								up and another raffle is taken.
							</p>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				</div>

				{/* Footer */}
				<div className="text-center mt-8 text-gray-600 dark:text-gray-400">
					<p className="text-sm">Good luck to all participants! 🍀</p>
				</div>
			</div>
		</div>
	)
}

function Raffle2025Button() {
	return (
		<div className="flex justify-center mt-6">	
			<Button
				asChild
				size={"lg"}
				className="mx-auto"
				// className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 text-white font-extrabold text-xl shadow-xl hover:from-orange-700 hover:to-yellow-500 transition-all duration-200 border-2 border-amber-300 dark:border-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-800"
			>
				<a
					href="https://www.zeffy.com/embed/ticketing/hum-sub-diwali-2025-raffle-sponsored-by-lufthansa"
					target="_blank"
					rel="noopener noreferrer"
					className="no-underline"
				>
					<span>Buy Raffle Tickets Now</span>
				</a>
			</Button>
		</div>
	)
}