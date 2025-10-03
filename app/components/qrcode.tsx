import { QRCodeSVG } from "qrcode.react"

export function QRCodeDisplay({ text }: { text: string }) {
	return <QRCodeSVG value={text} />
}
