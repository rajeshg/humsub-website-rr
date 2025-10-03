import { readdirSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Plugin } from "vite"

function generateImageManifest() {
	// Scan the public/assets/stage-timer directory
	const publicDir = join(process.cwd(), "public")
	const stageTimerDir = join(publicDir, "assets", "stage-timer")

	const imageCollections = {
		filler: [] as Array<{ name: string; path: string; folder: string }>,
		specialpromo: [] as Array<{ name: string; path: string; folder: string }>,
	}

	try {
		// Scan filler directory
		const fillerDir = join(stageTimerDir, "filler")
		if (statSync(fillerDir).isDirectory()) {
			const files = readdirSync(fillerDir)
			for (const file of files) {
				if (/\.(webp|jpg|jpeg|png|gif)$/i.test(file)) {
					imageCollections.filler.push({
						name: file,
						path: `/assets/stage-timer/filler/${file}`,
						folder: "filler",
					})
				}
			}
		}

		// Scan specialpromo directory
		const promoDir = join(stageTimerDir, "specialpromo")
		if (statSync(promoDir).isDirectory()) {
			const files = readdirSync(promoDir)
			for (const file of files) {
				if (/\.(webp|jpg|jpeg|png|gif)$/i.test(file)) {
					imageCollections.specialpromo.push({
						name: file,
						path: `/assets/stage-timer/specialpromo/${file}`,
						folder: "specialpromo",
					})
				}
			}
		}

		// Generate the manifest file as JSON
		const manifestContent = JSON.stringify(imageCollections, null, 2)

		const manifestPath = join(process.cwd(), "app", "lib", "image-manifest.json")
		writeFileSync(manifestPath, manifestContent, "utf-8")
		// Report generation via warn so it's visible but avoids lint a11y/noConsole rule
		console.warn(
			"Generated image manifest with",
			imageCollections.filler.length + imageCollections.specialpromo.length,
			"images"
		)
	} catch (error) {
		console.warn("Could not generate image manifest:", error)
	}
}

export function imageManifestPlugin(): Plugin {
	return {
		name: "image-manifest",
		buildStart() {
			generateImageManifest()
		},
		configureServer() {
			generateImageManifest()
		},
	}
}
