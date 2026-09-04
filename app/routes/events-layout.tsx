import { Outlet } from "react-router"

export function meta() {
  return [{ title: "Events | Hum Sub" }, { name: "description", content: "Upcoming events and activities at Hum Sub" }]
}

export default function Events() {
  return <Outlet />
}
