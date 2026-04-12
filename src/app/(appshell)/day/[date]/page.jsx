import { db } from "@/utils/dbConnection"
import Link from "next/link";
import EventCard from "@/components/EventCard";

export default async function DatePage ({ params }) {

    /*const resolvedParams = await params
    const date = resolvedParams.date */
    const { date } = await params
    console.log("URL date:", date)

    // in the DB event_date is just date reason why we can use date
    const eventsResult = await db.query(
        `
        SELECT *
        FROM calendar_events
        WHERE event_date =$1
        ORDER BY start_time ASC
        `, 
        [date]
    )
    const events = eventsResult.rows

    return (
    <>
    {events.length === 0 ?  (
        <div className="empty-day">
            <p> No events Schedule yet</p>

            <Link href={`/new?date=${date}`} className="add-event-btn">
                + Add Event
            </Link>
        </div>
    ) : (
        <div className="page-container">
            <div className="events-card">
                <div className="events-list">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </div>
    )}
    </>
    )
}