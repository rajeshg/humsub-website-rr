import { Calendar, MapPin } from "lucide-react"
import { Link } from "react-router"
import { Button } from "~/components/ui/button"
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
    <div className="group h-full flex flex-col rounded-xl border border-muted bg-background shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          width={400}
          height={225}
          className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-110 ${isPast ? "grayscale opacity-70" : ""}`}
        />
        {isPast && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <Badge variant={"destructive"}>Past Event</Badge>
          </div>
        )}
      </div>
      <div className="px-4 pt-4 pb-2">
        <div className="line-clamp-2 text-xl font-bold text-primary mb-1">{title}</div>
      </div>
      <div className="px-4 pb-2 flex-grow">
        <div className="space-y-1 text-base">
          <div className="flex items-center gap-2">
            <Calendar className="text-primary flex-shrink-0 w-5 h-5" />
            <span className="font-semibold text-foreground">{dateRange}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-primary flex-shrink-0 w-5 h-5" />
            <span className="font-medium text-muted-foreground line-clamp-1">{location}</span>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Button asChild size="sm" className="w-full">
          <Link to={`/event/${slug}`}>{isPast ? "View Details" : "Learn More"}</Link>
        </Button>
      </div>
    </div>
  )
}
