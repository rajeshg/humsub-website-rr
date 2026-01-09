import { env } from "cloudflare:workers"
import { ImageResponse } from "@takumi-rs/image-response/wasm"
// @ts-ignore - wasm import
import wasmModule from "@takumi-rs/wasm/takumi_wasm_bg.wasm"
import type { Route } from "./+types/og"

async function getFont(fontName: string) {
	// Try to get from KV first
	const cachedFont = await env.KV.get(`font-${fontName}`, { type: "arrayBuffer" })
	if (cachedFont) {
		return cachedFont
	}

	// Fallback to fetching from CDN (Google Fonts)
	const response = await fetch(
		"https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
	)
	const fontBuffer = await response.arrayBuffer()

	// Cache in KV for 30 days
	await env.KV.put(`font-${fontName}`, fontBuffer, { expirationTtl: 60 * 60 * 24 * 30 })

	return fontBuffer
}

export async function loader({ request }: Route.LoaderArgs) {
	const { searchParams } = new URL(request.url)
	const title = searchParams.get("title") || "Hum Sub"
	const date = searchParams.get("date") || ""
	const location = searchParams.get("location") || "Triangle Area of North Carolina"

	// Dynamic font sizing based on title length
	const titleLength = title.length
	let titleFontSize = 90
	let titleLineHeight = 1.05

	if (titleLength > 80) {
		titleFontSize = 50
		titleLineHeight = 1.2
	} else if (titleLength > 50) {
		titleFontSize = 60
		titleLineHeight = 1.15
	} else if (titleLength > 30) {
		titleFontSize = 75
		titleLineHeight = 1.1
	}

	const fontData = await getFont("Inter-Bold")

	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				justifyContent: "flex-start",
				backgroundColor: "#020617",
				backgroundImage:
					"radial-gradient(circle at 0% 0%, #334155 0%, transparent 50%), radial-gradient(circle at 100% 100%, #1e293b 0%, transparent 50%)",
				padding: "80px",
				fontFamily: "Inter",
				color: "white",
			}}
		>
			{/* Branding & Info Column */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					height: "100%",
				}}
			>
				{/* Hum Sub Header */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						marginBottom: "40px",
					}}
				>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<span style={{ fontSize: "36px", fontWeight: "bold", color: "#f8fafc", lineHeight: 1 }}>Hum Sub</span>
						<span
							style={{
								fontSize: "16px",
								color: "#94a3b8",
								textTransform: "uppercase",
								letterSpacing: "0.1em",
								marginTop: "4px",
							}}
						>
							Celebrating 25 Years
						</span>
					</div>
				</div>

				{/* Title Area - Aligned with logo left edge */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						flexGrow: 1,
						justifyContent: "center",
						width: "100%",
					}}
				>
					<div
						style={{
							fontSize: `${titleFontSize}px`,
							fontWeight: "bold",
							lineHeight: titleLineHeight,
							color: "#ffffff",
							margin: 0,
							padding: 0,
							maxWidth: "900px",
							textAlign: "left",
							marginLeft: "-4px",
						}}
					>
						{title}
					</div>
					{date && (
						<div
							style={{
								fontSize: "36px",
								color: "#fb923c",
								fontWeight: "bold",
								marginTop: "20px",
								marginBottom: "20px",
								marginLeft: "-2px",
							}}
						>
							{date}
						</div>
					)}
				</div>

				{/* Left-Aligned Metadata Footer - Aligned with logo left edge */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						borderTop: "1px solid rgba(255, 255, 255, 0.1)",
						paddingTop: "20px",
						width: "100%",
					}}
				>
					<div style={{ fontSize: "24px", color: "#cbd5e1", fontWeight: "500", marginBottom: "8px" }}>{location}</div>
					<div style={{ fontSize: "20px", color: "#64748b", fontWeight: "bold" }}>humsub.org</div>
				</div>
			</div>

			{/* Slogan Button - anchored to bottom right - hide for very long titles */}
			{titleLength <= 80 && (
				<div
					style={{
						position: "absolute",
						bottom: "80px",
						right: "80px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						background: "linear-gradient(to right, #f97316, #fbbf24)",
						padding: "16px 40px",
						borderRadius: "100px",
						color: "white",
						fontSize: "20px",
						fontWeight: "bold",
						boxShadow: "0 20px 25px -5px rgba(249, 115, 22, 0.3)",
					}}
				>
					Bringing Communities Together
				</div>
			)}
		</div>,
		{
			width: 1200,
			height: 630,
			module: wasmModule,
			fonts: [
				{
					name: "Inter",
					data: new Uint8Array(fontData as ArrayBuffer),
					weight: 700,
					style: "normal",
				},
			],
		}
	)
}
