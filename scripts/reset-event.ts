import fs from "node:fs"
import path from "node:path"

// This script runs under `tsx` which provides a global fetch in Node.
// It intentionally does not include a node-fetch fallback.

async function main() {
	const root = process.cwd()
	const resultsPath = path.join(root, "results.json")
	if (!fs.existsSync(resultsPath)) {
		console.error("results.json not found in project root")
		process.exit(1)
	}

	const itemsRaw = fs.readFileSync(resultsPath, "utf-8")
	let items: unknown[]
	try {
		items = JSON.parse(itemsRaw) as unknown[]
		if (!Array.isArray(items)) {
			console.error("results.json does not contain a top-level array")
			process.exit(1)
		}
	} catch (parseErr) {
		console.error("Failed to parse results.json:", parseErr)
		process.exit(1)
	}

	const payload = {
		name: "Hum Sub Diwali 2025",
		startDate: "2025-10-11T09:00:00Z",
		endDate: null,
		items,
	}

	// allow CLI override: tsx scripts/reset-event.ts <url> <authToken>
	const cliUrl = process.argv[2]
	const cliAuth = process.argv[3]
	const url = cliUrl || "https://humsub.org/api/durable/resetEvent"
	const headers: Record<string, string> = { "Content-Type": "application/json" }
	if (cliAuth) headers.Authorization = `Bearer ${cliAuth}`

	try {
		const res = await fetch(url, {
			method: "POST",
			headers,
			body: JSON.stringify(payload),
		})

		const text = await res.text()
		// Attempt to parse JSON body, otherwise print raw text
		let parsed: unknown = text
		try {
			parsed = JSON.parse(text)
		} catch {
			/* keep raw text */
		}
		// Use console.error only for error status; otherwise print minimal info
		if (res.status >= 400) {
			console.error("Reset failed", res.status, parsed)
			process.exit(1)
		}
	process.stdout.write(`${JSON.stringify({ status: res.status, body: parsed }, null, 2)}\n`)
	} catch (err) {
		console.error("Request failed:", err)
		process.exit(1)
	}
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
