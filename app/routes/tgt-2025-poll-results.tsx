// use loader to load data from https://script.google.com/macros/s/AKfycbzbqL8iOQ8hancGkzPqWJVbw8wgvyUExVhyeHIJTOMYbt-8k1QxnD1CZTG4t2ip95GfyQ/exec
import { useLoaderData } from "react-router"
type PollResponse = {
	Timestamp: string
	"Email Address": string
	"Who do you think should win Triangle Got Talent?": string
}

// Get all unique nominees from the poll data to ensure we show everyone
function getAllNominees(data: PollResponse[]): string[] {
	const nominees = new Set<string>()
	for (const row of data) {
		const nominee = row["Who do you think should win Triangle Got Talent?"]
		if (nominee?.trim()) {
			nominees.add(nominee.trim())
		}
	}
	return Array.from(nominees).sort()
}

export async function loader(): Promise<{ data: PollResponse[] }> {
	const response = await fetch(
		"https://script.google.com/macros/s/AKfycbzbqL8iOQ8hancGkzPqWJVbw8wgvyUExVhyeHIJTOMYbt-8k1QxnD1CZTG4t2ip95GfyQ/exec"
	)
	const data = (await response.json()) as unknown as PollResponse[]
	return { data }
}

export default function Poll() {
	const { data } = useLoaderData<typeof loader>()

	return (
		<div className="min-h-screen p-3 bg-background text-foreground">
			<title>TGT 2025 Poll | Hum Sub</title>

			<div className="w-full max-w-7xl mx-auto">
				{/* Header - Outside results block */}
				<div className="flex items-center justify-between mb-4 flex-wrap gap-2">
					<div className="flex items-center space-x-2">
						<img src="/assets/25yr-logo.png" alt="Hum Sub 25 Years Logo" className="w-12 h-12 object-contain" />
						<h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
							Triangle Got Talent 2025
						</h2>
					</div>
					<a
						className="inline-block bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 text-sm rounded-md shadow hover:brightness-105 transition"
						href="https://docs.google.com/forms/d/e/1FAIpQLSeFH7EC0UaCtTL03JrUD8d8bpUQfyDoJP6HM1pBjUyJbRLmcg/viewform"
						target="_blank"
						rel="noreferrer"
					>
						Vote now
					</a>
				</div>

				{/* Results Block */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-200 dark:border-gray-700">
					{Array.isArray(data) && data.length > 0 ? (
						(() => {
							// Get all unique nominees from responses
							const allNominees = getAllNominees(data)

							// Count votes per nominee
							const counts: Record<string, number> = {}
							for (const nominee of allNominees) {
								counts[nominee] = 0
							}
							for (const row of data) {
								const nominee = row["Who do you think should win Triangle Got Talent?"]?.trim()
								if (nominee && counts[nominee] !== undefined) {
									counts[nominee] += 1
								}
							}

							const totalVotes = data.length
							const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])

							const top = sorted[0]
							const maxVotes = top?.[1] || 1

							return (
								<div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4">
									{/* Left Column - Stats (40%) */}
									<div className="space-y-4">
										{/* Total Votes */}
										<div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white text-center shadow-lg">
											<div className="text-5xl font-bold mb-2">{totalVotes}</div>
											<div className="text-sm text-blue-100 uppercase tracking-wide">Total Votes Polled</div>
										</div>

										{/* Current Leader */}
										{top && (
											<div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-6 text-white shadow-lg">
												<div className="text-sm uppercase tracking-wide mb-2 opacity-90">Current Leader</div>
												<div className="font-bold text-xl mb-3 leading-tight" title={top[0]}>
													{top[0]}
												</div>
												<div className="flex items-end justify-between">
													<div>
														<div className="text-3xl font-bold">{top[1]}</div>
														<div className="text-sm opacity-90">votes</div>
													</div>
													<div className="text-3xl font-bold">{Math.round((top[1] / totalVotes) * 100)}%</div>
												</div>
											</div>
										)}

										{/* Last Updated */}
										<div className="text-center text-sm text-gray-500 dark:text-gray-400">
											Last updated: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
										</div>
									</div>

									{/* Right Column - All Nominees (60%) */}
									<div>
										<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">All Nominees</h3>
										{/* Grid adapts: 2 columns on 2xl screens, 1 column otherwise - no scrollbar needed */}
										<div className="grid grid-cols-1 2xl:grid-cols-2 gap-2.5">
											{sorted.map(([nominee, count], index) => {
												const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
												const barWidth = maxVotes > 0 ? Math.round((count / maxVotes) * 100) : 0
												const isTopThree = index < 3

												return (
													<div
														key={nominee}
														className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
													>
														<div className="flex items-center justify-between mb-2">
															<div className="flex items-center space-x-2 flex-1 min-w-0">
																<div className="flex-shrink-0 w-7">
																	{isTopThree ? (
																		<div
																			className={`inline-flex w-7 h-7 rounded-full items-center justify-center text-white font-bold text-sm ${
																				index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-amber-600"
																			}`}
																		>
																			{index + 1}
																		</div>
																	) : (
																		<span className="text-gray-400 dark:text-gray-500 text-sm font-medium pl-1">
																			{index + 1}
																		</span>
																	)}
																</div>
																<span
																	className="font-medium text-gray-900 dark:text-white text-sm leading-tight"
																	title={nominee}
																>
																	{nominee}
																</span>
															</div>
															<div className="text-right ml-3 flex-shrink-0 min-w-[70px]">
																<div className="text-lg font-bold text-gray-900 dark:text-white leading-none">
																	{count}
																</div>
																<div className="text-xs text-gray-500 dark:text-gray-400">{percentage}%</div>
															</div>
														</div>

														<div className="relative">
															<div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
																<div
																	className={`h-full rounded-full transition-all duration-1000 ease-out ${
																		isTopThree
																			? index === 0
																				? "bg-gradient-to-r from-yellow-400 to-orange-500"
																				: index === 1
																					? "bg-gradient-to-r from-gray-300 to-gray-400"
																					: "bg-gradient-to-r from-amber-600 to-amber-700"
																			: "bg-gradient-to-r from-blue-400 to-blue-500"
																	}`}
																	style={{ width: `${Math.max(3, barWidth)}%` }}
																></div>
															</div>
														</div>
													</div>
												)
											})}
										</div>
									</div>
								</div>
							)
						})()
					) : (
						<div className="text-center py-8">
							<div className="text-4xl mb-3">📊</div>
							<div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No votes yet</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Be the first to vote in the Triangle Got Talent poll!
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
