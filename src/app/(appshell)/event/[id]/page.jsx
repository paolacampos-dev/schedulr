import { db } from "@/utils/dbConnection";
import EventCard from "@/components/EventCard";
import Link from "next/link";
import deleteEvent from "@/actions/deleteEvent";


export default async function Eventpage ({ params })    {
    const { id } = await params

    const eventResult = await db.query(
        `SELECT *
        FROM calendar_events
        WHERE id = $1
        LIMIT 1
        `,
        [id]
    )
    const event = eventResult.rows[0]

    if(!event)  {
        return <p>Nothing Schedule yet</p>
    }

    return  (
        <div className="page-container">
            <div className="events-card">
                <EventCard event={event} />
                    <div className="actions">
                        <Link href={`/event/${event.id}/edit`}>Edit</Link>
                            <form action={deleteEvent}>
                                <input type="hidden" name="id" value={event.id}/>
                                <input type="hidden" name="date" value={event.event_date}/>
                    
                                <button type="submit">Delete</button>
                            </form>
                    </div>
            </div>
        </div>
    )
}

