import { redirect } from "react-router"

export const loader = () => {
  return redirect("https://www.zeffy.com/en-US/ticketing/hum-sub-diwali--2026")
}

export default function MembershipSignupRedirect() {
  // This component will never render because of the redirect
  return null
}
