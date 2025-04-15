import { Icon } from "@iconify-icon/react"
import { Link } from "react-router"

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
		<article
			className={
				"card h-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-base-100 dark:bg-slate-800/70 border-t-4 border-primary dark:border-amber-400"
			}
		>
			<figure className="relative max-h-60 overflow-hidden">
				<img
					src={imageUrl}
					alt={title}
					width={400}
					height={225}
					className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
				/>
				{isPast && (
					<div className="absolute inset-0 bg-base-300/60 dark:bg-slate-900/70 flex items-center justify-center">
						<Badge variant={"destructive"}>Past Event</Badge>
					</div>
				)}
			</figure>

			<div className="card-body p-4">
				<h3 className="card-title line-clamp-2 !my-0">{title}</h3>

				<div className="mt-2 space-y-2 text-sm">
					<div className="flex items-center gap-2">
						<Icon icon="mdi:calendar" className="text-primary dark:text-amber-300 flex-shrink-0" />
						<span className="text-base-content/80 dark:text-slate-300">{dateRange}</span>
					</div>

					<div className="flex items-center gap-2">
						<Icon icon="mdi:map-marker" className="text-primary dark:text-amber-300 flex-shrink-0" />
						<span className="text-base-content/80 dark:text-slate-300 line-clamp-1">{location}</span>
					</div>
				</div>

				<div className="card-actions justify-end mt-4">
					<Link to={`/event/${slug}`} className="btn btn-sm btn-primary dark:btn-secondary">
						{isPast ? "View Details" : "Learn More"}
					</Link>
				</div>
			</div>
		</article>
	)
}
