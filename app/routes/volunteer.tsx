import { Button } from "~/components/ui/button"

export default function OurSponsors() {
	return (
		<div>
			<title>Volunteer | Hum Sub</title>
			<h1>Volunteer</h1>
			<img src="/assets/volunteers.jpeg" alt="volunteer" className="my-4 mx-auto md:max-w-2xl" />
			
			<p>
				Volunteers are the backbone of any organization. We at Hum Sub value, cherish, and appreciate volunteers in all
				age groups (minimum age of volunteer is 14; minimum age to register independently is 16) who support us during
				our events by giving us their time, talent, support, and hard work. It takes many hands and many hearts to
				complete our mission.
			</p>
			<p>
				By working together, great things can be accomplished. Unity provides a strength that is denied to the
				individual. At Hum Sub, our strength lies in our volunteer system. We encourage you to sign up for volunteer
				duties at our events Basant Bahar in the spring, Cary Diwali in the fall, and special events held by the Town of
				Cary, such as Lazy Daze, Spring Daze, Fest in the West festivals, and special events held to mark our milestone
				anniversaries. Please sign up with your details on our website and we will contact you to assign volunteer
				duties. We appreciate your devotion and cooperation.
			</p>
			<div className="mx-auto w-full text-center my-4">
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://portal.humsub.org/index.php/login/volunteer"
					className="inline-block w-full md:w-64 mt-2 no-underline"
				>
					<Button className="w-full">
						Sign up to volunteer
					</Button>
				</a>
			</div>
		</div>
	)
}
