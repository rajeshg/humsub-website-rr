import { Icon } from '@iconify-icon/react';
import { dateRangeFormatter } from "~/routes/events-home";


export default function EventCard({ title, slug, startDate, endDate, location, imageUrl, isPast }: {title: string; slug: string; startDate: Date; endDate?: Date; location: string; imageUrl: string; isPast?: boolean}) {
 return (
    <article className={`card h-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${isPast ? 'bg-base-100 dark:bg-slate-800/70' : 'bg-base-100 dark:bg-slate-800 border-t-4 border-primary dark:border-amber-400'}`}>
    <figure className="relative h-48 overflow-hidden">
      <img 
        src={imageUrl} 
        alt={title} 
        width={400} 
        height={225}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      {isPast && (
        <div className="absolute inset-0 bg-base-300/60 dark:bg-slate-900/70 flex items-center justify-center">
          <span className="badge badge-lg bg-base-300 dark:bg-slate-700 text-base-content dark:text-slate-200">Past Event</span>
        </div>
      )}
    </figure>
    
    <div className="card-body p-4">
      <h3 className="card-title text-lg font-bold line-clamp-2">
        {title}
      </h3>
      
      <div className="mt-2 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:calendar" className="w-4 h-4 text-primary dark:text-amber-300 flex-shrink-0" />
          <span className="text-base-content/80 dark:text-slate-300">
              {dateRangeFormatter(startDate, endDate)}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Icon icon="mdi:map-marker" className="w-4 h-4 text-primary dark:text-amber-300 flex-shrink-0" />
          <span className="text-base-content/80 dark:text-slate-300 line-clamp-1">{location}</span>
        </div>
      </div>
      
      <div className="card-actions justify-end mt-4">
        <a href={`/events/${slug}`} className="btn btn-sm btn-primary dark:btn-secondary">
          {isPast ? 'View Details' : 'Learn More'}
        </a>
      </div>
    </div>
  </article>
 )
}