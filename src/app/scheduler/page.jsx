import { db } from "@/utils/dbConnection";
import Link from "next/link";
import { formatDateForDisplay } from "@/utils/dateHelpers";

export default async function Scheduler({ searchParams }) {
    const userId = "test-user";
    const view = searchParams?.view || "month";
    
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
    const emptyDays = Array.from({ length: startOffset })
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    

    const eventsResult = await db.query(
        `
        SELECT *
        FROM calendar_events
        WHERE user_id = $1
        ORDER BY event_date ASC, start_time ASC
        `,
        [userId]
    );

    const events = eventsResult.rows;

    return (
        <div>
            <div>
                <Link href="/scheduler?view=month">Month</Link>
                <Link href="/scheduler?view=list">List</Link>
                <Link href="/scheduler/new">+ New Event</Link>
            </div>

            {view === "list" ? (
                <div>
                    <h1>Events</h1>

                    {events.length === 0 ? (
                        <p>No events yet</p>
                    ) : (
                        <ul>
                            {events.map((event) => (
                                <li key={event.id}>
                                    <Link href={`/scheduler/new?date=${event.event_date}`}>
                                        <h3>{event.title}</h3>
                                        <p>{formatDateForDisplay(event.event_date)}</p>
                                        <p>{event.start_time ? String(event.start_time) : ""}</p>
                                        <p>{event.end_time ? String(event.end_time) : ""}</p>
                                        <p>{event.description}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ) : (
                <div>
                    <h1>Month View</h1>
                    <div className="calendar-grid">
                        {weekDays.map((dayName) => (
                            <div key={dayName} className="calendar-weekday">
                                {dayName}
                            </div>
                        ))}

                        {emptyDays.map((_, index) => (
                            <div key={`empty-${index}`} className="calendar-empty"></div>
                        ))}

                        {days.map((day) => {
                            const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

                            const dayEvents = events.filter((event) => {
                            const eventDate = new Date(event.event_date).toISOString().split("T")[0]
                            return eventDate === dateString
                            }
                        )

                            return (
                                <Link 
                                    href={`/scheduler/day/${dateString}`}
                                    key={day} 
                                    className="calendar-day"
                                >
                                    <strong>{day}</strong>
                                    {dayEvents.map((event) => {
                                        const start = event.start_time
                                            ? String(event.start_time).slice(0, 5)
                                            : ""

                                        const end = event.end_time
                                            ? String(event.end_time).slice(0, 5)
                                            : ""

                                        const timeRange =
                                            start && end
                                            ? `${start}-${end}`
                                            : start || "" 
    
                                        return (
                                            <p key={event.id} className="calendar-event">
                                                {timeRange && (
                                                <span className="event-time">{timeRange}</span>
                                                )}{" "}
                                                {event.title}
                                            </p>
                                        )
                                    })}
                                    
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}