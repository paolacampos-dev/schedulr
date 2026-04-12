"use server"

import { db } from "@/utils/dbConnection"
import { redirect } from "next/navigation"

export default async function deleteEvent (formData)    {
    const id = formData.get ("id")
    const date = formData.get("date")

    await db.query("DELETE FROM calendar_events WHERE id = $1", [id])

    const formattedDate = new Date(date).toISOString().split("T")[0]

    redirect(`/day/${formattedDate}`)
}