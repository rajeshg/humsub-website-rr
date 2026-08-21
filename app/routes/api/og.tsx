import { ImageResponse } from "takumi-js/response"
import { HUMSUB_LOGO_BASE64 } from "~/lib/humsub-logo"
import type { Route } from "./+types/og"

function b64ToArrayBuffer(b64: string): ArrayBuffer {
  const bin = atob(b64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return bytes.buffer
}

const LOGO_DATA = b64ToArrayBuffer(HUMSUB_LOGO_BASE64)

export async function loader({ request }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") || "Hum Sub"
  const date = searchParams.get("date") || ""
  const location = searchParams.get("location") || "Triangle Area of North Carolina"

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
        padding: "56px",
        fontFamily: "system-ui, sans-serif",
        color: "white",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
          <img
            src="humsub-logo"
            alt=""
            style={{ width: "96px", height: "64px", objectFit: "contain", marginRight: "20px" }}
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
          bottom: "56px",
          right: "56px",
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
      images: [{ src: "humsub-logo", data: LOGO_DATA }],
    }
  )
}
