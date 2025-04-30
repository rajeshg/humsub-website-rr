import { useEffect, useState } from "react"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

export default function YoutubeGallery() {
	const [videos, setVideos] = useState<string[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 12

	useEffect(() => {
		async function fetchVideos() {
			try {
				setLoading(true)
				const response = await fetch("/api/youtube")

				if (!response.ok) {
					throw new Error("Failed to fetch videos")
				}

				const data = (await response.json()) as { videos?: string[] }
				setVideos(data.videos || [])
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred")
			} finally {
				setLoading(false)
			}
		}

		fetchVideos()
	}, [])

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
	}

	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const currentVideos = videos.slice(startIndex, endIndex)
	const totalPages = Math.ceil(videos.length / itemsPerPage)

	return (
		<div className="prose p-4 flex flex-col gap-2 max-w-5xl mx-auto">
			<h2 className="mb-2">Hum Sub - Youtube Gallery</h2>

			{loading && <div className="text-center">Loading videos...</div>}

			{error && (
				<div className="text-red-500 text-center">
					Error:
					{error}
				</div>
			)}

			{!loading && !error && (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{currentVideos.map((videoId) => (
							<div key={videoId} className="border rounded-md overflow-hidden shadow-md aspect-video">
								<LiteYouTubeEmbed id={videoId} title="Hum Sub Video" noCookie={true} />
							</div>
						))}
					</div>

					<div className="flex justify-center mt-8 gap-2">
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							type="button"
							disabled={currentPage === 1}
							className="px-4 py-2 border rounded disabled:opacity-50"
						>
							Previous
						</button>

						<span className="flex items-center px-4">
							Page {currentPage} of {totalPages}
						</span>

						<button
							onClick={() => handlePageChange(currentPage + 1)}
							type="button"
							disabled={currentPage === totalPages}
							className="px-4 py-2 border rounded disabled:opacity-50"
						>
							Next
						</button>
					</div>
				</>
			)}
		</div>
	)
}
