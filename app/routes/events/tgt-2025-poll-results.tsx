// use loader to load data from https://script.google.com/macros/s/AKfycbzbqL8iOQ8hancGkzPqWJVbw8wgvyUExVhyeHIJTOMYbt-8k1QxnD1CZTG4t2ip95GfyQ/exec
import { useLoaderData } from "react-router"
type PollResponse = {
	Timestamp: string
	"Email Address": string
	"Who do you think should win Triangle Got Talent?": string
}

// Handle special grouping for Bollylavani performers
function processNomineeData(data: PollResponse[]): { counts: Record<string, number> } {
	const counts: Record<string, number> = {}

	// Count all votes with special grouping
	for (const row of data) {
		const nominee = row["Who do you think should win Triangle Got Talent?"]?.trim()
		if (nominee) {
			if (
				nominee === "Bollylavani (Vajale ki bara) - Anvi Rane - Folk/Fusion" ||
				nominee === "Bollylavani (Vajale ki bara) - Sachin Rane - Folk/Fusion"
			) {
				// Group both under Anvi Rane's name
				const groupedName = "Bollylavani (Vajale ki bara) - Anvi Rane - Folk/Fusion"
				counts[groupedName] = (counts[groupedName] || 0) + 1
			} else {
				counts[nominee] = (counts[nominee] || 0) + 1
			}
		}
	}

	return { counts }
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
				<div className="mb-6">
					<div className="flex items-center justify-between gap-4 flex-wrap">
						<div className="flex items-center gap-3">
							<div>
								<h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
									Triangle Got Talent 2025
								</h1>
								<p className="text-sm text-gray-600 dark:text-gray-400">Audience Choice Segment Results</p>
							</div>
						</div>
						<a
							className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
							href="https://docs.google.com/forms/d/e/1FAIpQLSeFH7EC0UaCtTL03JrUD8d8bpUQfyDoJP6HM1pBjUyJbRLmcg/viewform"
							target="_blank"
							rel="noreferrer"
						>
							Vote Now
						</a>
					</div>
				</div>

				{/* Results Block */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-200 dark:border-gray-700">
					{Array.isArray(data) && data.length > 0 ? (
						(() => {
							// Process nominee data with special grouping
							const { counts } = processNomineeData(data)

							const totalVotes = data.length
							const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])

							const top = sorted[0]
							const maxVotes = top?.[1] || 1

							// Determine leader color for Current Leader card
							const getLeaderColor = () => {
								if (!top) return "from-blue-500 to-purple-600"
								// Always use gold color for leader (1st place)
								return "from-yellow-400 to-orange-500"
							}

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
											<div className={`bg-gradient-to-br ${getLeaderColor()} rounded-lg p-6 text-white shadow-lg`}>
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

												return (
													<div
														key={nominee}
														className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
													>
														<div className="flex items-center justify-between mb-2">
															<div className="flex items-center space-x-2 flex-1 min-w-0">
																<div className="flex-shrink-0 w-7">
																	{index === 0 ? (
																		<div className="inline-flex w-7 h-7 rounded-full items-center justify-center text-white font-bold text-sm bg-yellow-500">
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
																		index === 0
																			? "bg-gradient-to-r from-yellow-400 to-yellow-600"
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
								Be the first to vote in Triangle Got Talent poll!
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
