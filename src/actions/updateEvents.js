"use server"

import  { db } from "@/utils/dbConnection"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function UpdateEvent(formData) {
    const id = formData.get("id")

    const {event_date, title, start_time, end_time, description} =  Object.fromEntries(formData)
    const eventDate = event_date || null
    const startTime = start_time || null
    const endTime = end_time || null

    await db.query(
        `
        UPDATE calendar_events
        SET event_date = $1, 
            title = $2, 
            start_time = $3, 
            end_time = $4, 
            description = $5
            WHERE id = $6
        `,
        [eventDate, title, startTime, endTime, description || null, id]
    )
    revalidatePath("/")

    const formattedDate = new Date(eventDate).toISOString().split("T")[0]
    redirect(`/day/${formattedDate}`)   
}