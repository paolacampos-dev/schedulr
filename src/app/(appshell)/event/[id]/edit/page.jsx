import EventForm from "@/components/EventForm"
import { UpdateEvent } from "@/actions/updateEvents"
import { db } from "@/utils/dbConnection"


export default async function Editpage({ params })   {
    const { id } = await params
    const initialDate = await params?.date || ""

    const query = await db.query(
        `
        SELECT *
        FROM calendar_events
        WHERE id = $1
        `,
        [id]
    )
    const event = query.rows[0]

    return (
        <>
                <div className="events-card">
                    <EventForm 
                        action={UpdateEvent} 
                        event={event} 
                        initialDate= {initialDate}/>
                </div>
        </>
    )
}