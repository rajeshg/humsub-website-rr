import { useMemo } from "react"
import { Button } from "~/components/ui/button"
import imageCollections from "~/lib/image-manifest.json"

interface ImageData {
	name: string
	path: string
	folder: string
}

interface ImagePickerProps {
	onSelectImage: (imagePath: string) => void
	onClearSelection: () => void
}

export function ImagePicker({ onSelectImage, onClearSelection }: ImagePickerProps) {
	// Combine all images from all folders (memoized to keep stable references)
	const images: ImageData[] = useMemo(() => [...imageCollections.filler, ...imageCollections.specialpromo], [])

	const handleSelectImage = (imagePath: string) => {
		onSelectImage(imagePath)
	}

	return (
		<div className="space-y-4">
			<div className="flex gap-2">
				<Button variant="outline" size="sm" onClick={onClearSelection}>
					Clear Selection
				</Button>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				{images.map((imageData) => (
					<div key={imageData.path} className="relative group">
						<button
							type="button"
							onClick={() => handleSelectImage(imageData.path)}
							className="aspect-video bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
						>
							<img src={imageData.path} alt={imageData.name} className="w-full h-full object-cover" loading="lazy" />
						</button>

						{/* Folder indicator */}
						<div
							className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
								imageData.folder === "filler" ? "bg-blue-500 text-white" : "bg-purple-500 text-white"
							}`}
						>
							{imageData.folder === "filler" ? "Filler" : "Promo"}
						</div>

						{/* Filename overlay */}
						<div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
							{imageData.name}
						</div>
					</div>
				))}
			</div>

			{images.length === 0 && <div className="text-center text-gray-500 py-8">No images available</div>}
		</div>
	)
}
