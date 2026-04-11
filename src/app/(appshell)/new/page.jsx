import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import EventForm from "@/components/EventForm";

export default async function NewEvent({ searchParams})  {
    const userId = "test-user"
    const params = await searchParams
    const initialDate = params?.date || ""

    async function handleSubmit(rawFormData)    {
        "use server"   
        const { event_date, title, start_time, end_time, description} =  Object.fromEntries(rawFormData)

        const eventDate = event_date || null
        const startTime = start_time || null
        const endTime = end_time || null
    
    await db.query(
        `
        INSERT INTO calendar_events (user_id, event_date, title, start_time, end_time, description)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [ userId, eventDate, title, startTime, endTime, description]
    )
    revalidatePath("/")
    redirect("/")
    }

    return(
        <EventForm
            action={handleSubmit}
            initialDate= {initialDate}
        />
    )
}


