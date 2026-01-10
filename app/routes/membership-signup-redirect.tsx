import { redirect } from "react-router"

export const loader = () => {
  return redirect("https://www.zeffy.com/en-US/ticketing/hum-sub-annual-membership")
}

export default function MembershipSignupRedirect() {
  // This component will never render because of the redirect
  return null
}
