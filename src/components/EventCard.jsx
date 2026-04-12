import Link from "next/link"
import { formatDateForDisplay } from "@/utils/dateHelpers"
import { formatTimeRange } from "@/utils/timeHelpers"


export default function EventCard({ event }) {
    const time = formatTimeRange(event.start_time, event.end_time)

    return (
        <div className="event-item">
            <Link href={`/event/${event.id}`} className="event-row block">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-date">{formatDateForDisplay(event.event_date)}</p>
                {time && (<div className="event-time">{time}</div>)}
                {event.description && (
                        <p className="event-description">{event.description}</p>
                )}
            </Link>
        </div>
    )
}
