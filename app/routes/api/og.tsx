import { env } from "cloudflare:workers"
import { ImageResponse } from "takumi-js/response"
import type { Route } from "./+types/og"

async function getFont(fontName: string): Promise<ArrayBuffer> {
  const cached = await env.KV.get(`font-${fontName}`, { type: "arrayBuffer" })
  if (cached) return cached

  const response = await fetch(
    "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
  )
  const buffer = await response.arrayBuffer()
  await env.KV.put(`font-${fontName}`, buffer, { expirationTtl: 60 * 60 * 24 * 30 })
  return buffer
}

async function getLogo(requestUrl: string): Promise<ArrayBuffer> {
  const cached = await env.KV.get("logo-humsub", { type: "arrayBuffer" })
  if (cached) return cached

  const logoUrl = new URL("/assets/humsub-logo.png", requestUrl).toString()
  const buffer = await fetch(logoUrl).then((res) => res.arrayBuffer())
  await env.KV.put("logo-humsub", buffer, { expirationTtl: 60 * 60 * 24 * 30 })
  return buffer
}

export async function loader({ request }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") || "Hum Sub"
  const date = searchParams.get("date") || ""
  const location = searchParams.get("location") || "Triangle Area of North Carolina"

  const [fontData, logoData] = await Promise.all([getFont("Inter-Bold"), getLogo(request.url)])

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        position: "relative",
        backgroundColor: "#020617",
        backgroundImage:
          "radial-gradient(circle at 0% 0%, #334155 0%, transparent 50%), radial-gradient(circle at 100% 100%, #1e293b 0%, transparent 50%)",
        padding: "80px",
        fontFamily: "Inter",
        color: "white",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "48px" }}>
          <img
            src="humsub-logo"
            alt=""
            style={{ width: "60px", height: "60px", objectFit: "contain", marginRight: "20px" }}
          />
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

        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center", width: "100%" }}>
          <div
            style={{
              fontSize: "96px",
              fontWeight: "bold",
              lineHeight: 1.05,
              color: "#ffffff",
              maxWidth: "920px",
              textAlign: "left",
              textFit: "shrink",
            }}
          >
            {title}
          </div>
          {date && (
            <div style={{ fontSize: "36px", color: "#fb923c", fontWeight: "bold", marginTop: "28px" }}>{date}</div>
          )}
        </div>

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

      <div
        style={{
          position: "absolute",
          bottom: "80px",
          right: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right, #f97316, #fbbf24)",
          padding: "14px 36px",
          borderRadius: "100px",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Bringing Communities Together
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      format: "png",
      fonts: [
        {
          name: "Inter",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
      images: [
        {
          src: "humsub-logo",
          data: logoData,
        },
      ],
    }
  )
}
