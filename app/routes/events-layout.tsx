import { Outlet } from "react-router"

export default function Events() {
	return (
		<>
			<title>Events | Hum Sub</title>
			<meta name="description" content="Upcoming events and activities at Hum Sub" />
			<Outlet />
		</>
	)
}
