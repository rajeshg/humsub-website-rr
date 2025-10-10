import { useEffect, useState } from "react"
import { Spinner } from "~/components/spinner"

interface ImageDisplayProps {
	imagePath: string | null
	isCollection?: boolean
	collectionInterval?: number
	collectionLastRotation?: number
	now?: number
}

export function ImageDisplay({
	imagePath,
	isCollection,
	collectionInterval,
	collectionLastRotation,
	now,
}: ImageDisplayProps) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [countdown, setCountdown] = useState<number | null>(null)

	useEffect(() => {
		if (!imagePath) return

		setLoading(true)
		setError(false)

		const img = new Image()
		img.onload = () => setLoading(false)
		img.onerror = () => {
			setLoading(false)
			setError(true)
		}
		img.src = imagePath
	}, [imagePath])

	// Countdown timer for collection mode
	useEffect(() => {
		if (!isCollection || !collectionInterval || !collectionLastRotation || !now) {
			setCountdown(null)
			return
		}

		const updateCountdown = () => {
			const nextRotation = collectionLastRotation + collectionInterval * 1000
			const remaining = Math.max(0, Math.ceil((nextRotation - now) / 1000))
			setCountdown(remaining)
		}

		updateCountdown()

		// Update countdown every second
		const interval = setInterval(updateCountdown, 1000)

		return () => clearInterval(interval)
	}, [isCollection, collectionInterval, collectionLastRotation, now])

	if (!imagePath) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-gray-500">No image selected</p>
			</div>
		)
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center h-full">
				<Spinner className="w-12 h-12" />
			</div>
		)
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-red-500">Failed to load image</p>
			</div>
		)
	}

	return (
		<div className="w-full h-full relative bg-black/10 overflow-hidden">
			{/* center and constrain the image strictly inside the container */}
			<div className="w-full h-full flex items-center justify-center">
				<img
					src={imagePath}
					alt="Stage display"
					className="max-w-full max-h-full object-contain transition-opacity duration-1000"
				/>
			</div>
			{isCollection && (
				<div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">Collection Mode</div>
			)}
			{isCollection && countdown !== null && (
				<div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-lg font-mono font-bold">
					{countdown}s
				</div>
			)}
		</div>
	)
}
