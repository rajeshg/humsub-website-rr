import { Icon } from "@iconify-icon/react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

// Define contact info type
interface ContactInfo {
	title: string
	name: string
	phone: string
	email: string
}

export default function ContactUs() {
	// Officers data
	const officers: ContactInfo[] = [
		{
			title: "President",
			name: "Sachin Joshi",
			phone: "919-371-4470, Option 1, Sub Option 1",
			email: "president@humsub.net",
		},
		{
			title: "Vice President",
			name: "Amardeep Bajaj",
			phone: "919-371-4470, Option 1, Sub Option 2",
			email: "vicepresident@humsub.net",
		},
		{
			title: "Treasurer",
			name: "Kaajal Nanavati",
			phone: "919-371-4470, Option 1, Sub Option 3",
			email: "treasurer@humsub.net",
		},
		{
			title: "Secretary",
			name: "Ekta Bhatia",
			phone: "919-371-4470, Option 1, Sub Option 4",
			email: "secretary@humsub.net",
		},
	]

	// Committees data
	const committees: ContactInfo[] = [
		{
			title: "Cultural Programs",
			name: "Vandana Pawar",
			phone: "919-371-4470, Option 2, Sub Option 1",
			email: "cultural_programs@humsub.net",
		},
		{
			title: "Vendor",
			name: "Dipendra Lamichhane",
			phone: "919-371-4470, Option 2, Sub Option 2",
			email: "vendor@humsub.net",
		},
		{
			title: "Marketing/Social Media",
			name: "Rajesh Gollapudi",
			phone: "919-371-4470, Option 2, Sub Option 3",
			email: "socialmedia@humsub.net",
		},
		{
			title: "Sponsorship and Grants",
			name: "Amardeep Bajaj",
			phone: "919-371-4470, Option 2, Sub Option 4",
			email: "sponsorship@humsub.net",
		},
		{
			title: "VIP Liaison",
			name: "Sachin Joshi",
			phone: "919-371-4470, Option 2, Sub Option 5",
			email: "president@humsub.net",
		},
		{
			title: "Exhibition",
			name: "Usha Sankar",
			phone: "919-371-4470, Option 2, Sub Option 6",
			email: "exhibition@humsub.net",
		},
		{
			title: "Professional",
			name: "Narendra Kalyankar",
			phone: "919-371-4470, Option 2, Sub Option 8",
			email: "professional@humsub.net",
		},
		{
			title: "Youth Ambassador",
			name: "Ekta Bhatia",
			phone: "919-371-4470, Option 2, Sub Option 9",
			email: "youthambassadors@humsub.net",
		},
		{
			title: "Youth Achievement Award",
			name: "Padmaja Sharma",
			phone: "919-371-4470, Option 2, Sub Option 10",
			email: "youthaward@humsub.net",
		},
		{
			title: "Special Events",
			name: "Sachin Joshi",
			phone: "919-371-4470, Option 2, Sub Option 5",
			email: "special_events@humsub.net",
		},
	]

	return (
		<>
			<title>Contact Us | Hum Sub</title>
			<h1>Contact Us</h1>
			<h2 className="text-2xl font-bold mb-4">Officers</h2>
			<p className="text-sm mb-4 text-muted-foreground">Main Phone: 919-371-4470, Option 1</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{officers.map((officer) => (
					<Card key={officer.title} className="not-prose">
						<CardHeader>
							<CardTitle>{officer.title}</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground space-y-1">
							<div className="font-semibold text-card-foreground">{officer.name}</div>
							<div className="flex items-center gap-2">
								<Icon icon="lucide:phone" aria-hidden="true" className="w-4 h-4" />
								<span>{officer.phone}</span>
							</div>
							<div className="flex items-center gap-2">
								<Icon icon="lucide:mail" aria-hidden="true" className="w-4 h-4" />
								<span>{officer.email}</span>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<h2 className="text-2xl font-bold mt-8 mb-4">Committees</h2>
			<p className="text-sm mb-4 text-muted-foreground">Main Phone: 919-371-4470, Option 2</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{committees.map((committee) => (
					<Card key={committee.title} className="not-prose">
						<CardHeader>
							<CardTitle>{committee.title}</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground space-y-1">
							<div className="font-semibold text-card-foreground">{committee.name}</div>
							<div className="flex items-center gap-2">
								<Icon icon="lucide:phone" aria-hidden="true" className="w-4 h-4" />
								<span>{committee.phone}</span>
							</div>
							<div className="flex items-center gap-2">
								<Icon icon="lucide:mail" aria-hidden="true" className="w-4 h-4" />
								<span>{committee.email}</span>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	)
}
