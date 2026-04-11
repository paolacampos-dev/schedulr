import { db } from "@/utils/dbConnection";
import EventCard from "@/components/EventCard";

export default async function Eventpage(params)    {
    const id = await params.id

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
        <EventCard key={event.id} evnet={event} />
            
        )
    }

