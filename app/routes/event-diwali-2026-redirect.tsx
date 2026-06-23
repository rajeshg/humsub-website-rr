import { redirect } from "react-router"

export const loader = () => redirect("/hum-sub-diwali-2026", { status: 301 })

export default function Catch() {
  return null
}
