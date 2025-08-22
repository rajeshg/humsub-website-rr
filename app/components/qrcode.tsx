import QRCode from "qrcode-svg"

export function QRCodeDisplay({ text }: { text: string }) {
	const qr = new QRCode({ content: text || "https://humsub.org", padding: 2, width: 200, height: 200 })
	// biome-ignore lint/security/noDangerouslySetInnerHtml: needed for QR code rendering
	return <div dangerouslySetInnerHTML={{ __html: qr.svg() }} />
}
