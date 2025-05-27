import { Icon } from "@iconify-icon/react"
import { Link } from "react-router"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "./ui/badge"

export default function EventCard({
	title,
	slug,
	dateRange,
	location,
	imageUrl,
	isPast,
}: {
	title: string
	slug: string
	dateRange: string
	location: string
	imageUrl: string
	isPast?: boolean
}) {
	return (
		<Card className="h-full overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
			<div className="relative aspect-[16/9] overflow-hidden">
				<img src={imageUrl} alt={title} width={400} height={225} className="w-full h-full object-cover object-top" />
				{isPast && (
					<div className="absolute inset-0 bg-background/70 flex items-center justify-center">
						<Badge variant={"destructive"}>Past Event</Badge>
					</div>
				)}
			</div>

			<CardHeader className="p-4">
				<CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
			</CardHeader>

			<CardContent className="p-4 pt-0 flex-grow">
				<div className="space-y-2 text-sm">
					<div className="flex items-center gap-2">
						<Icon icon="mdi:calendar" className="text-primary flex-shrink-0" />
						<span className="text-muted-foreground">{dateRange}</span>
					</div>

					<div className="flex items-center gap-2">
						<Icon icon="mdi:map-marker" className="text-primary flex-shrink-0" />
						<span className="text-muted-foreground line-clamp-1">{location}</span>
					</div>
				</div>
			</CardContent>

			<CardFooter className="p-4 pt-0">
				<Button asChild size="sm" className="w-full">
					<Link to={`/event/${slug}`}>{isPast ? "View Details" : "Learn More"}</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
