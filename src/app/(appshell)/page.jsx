import { db } from "@/utils/dbConnection";
import Link from "next/link";
import { formatDateForDisplay } from "@/utils/dateHelpers";


export default async function Scheduler({ searchParams }) {
    const userId = "test-user";

    const today = new Date()

    const params = await searchParams
    const view = params?.view || "month";

    const year = params?.year ? Number(params.year) : today.getFullYear()
    const month = params?.month ? Number(params.month) : today.getMonth()

    let currentMonth = month
    let currentYear = year
    if (currentMonth < 0) {
        currentMonth = 11
        currentYear -= 1
    }
    if (currentMonth > 11) {
        currentMonth = 0
        currentYear += 1
    }
    
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const emptyDays = Array.from({ length: startOffset })
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

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
            {view === "list"  ? (
        <div className="page-container">
                {events.length === 0 ? (
                    <p>No events yet</p>
                ) : (
                    <div className="events-card">
                        <h1 className="events-heading">Events</h1>
                        <ul className="events-list">
                            {events.map((event) => (
                                <li key={event.id} className="event-item">
                                    <Link href={`/new?date=${event.event_date}`} className="event-row">
                                        <h3 className="event-title">{event.title}</h3>
                                        <p className="event-date">
                                            {formatDateForDisplay(event.event_date)}
                                        </p>
                                        <div className="event-time">
                                            {event.start_time && <span>{String(event.start_time)}</span>}
                                            {event.end_time && <span> - {String(event.end_time)}</span>}
                                        </div>
                                        {event.description && (
                                            <p className="event-description">{event.description}</p>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
        </div>
    ) : (
                <div>
                    <div className="calendar-nav">
                        <Link 
                            href={`/?view=month&month=${currentMonth - 1}&year=${currentYear}`}
                            className="nav-arrow"
                        >
                            ←
                        </Link>
                        <h1>{months[currentMonth]} {currentYear}</h1>
                        <Link 
                            href={`/?view=month&month=${currentMonth + 1}&year=${currentYear}`}
                            className="nav-arrow"
                        >
                            →
                        </Link>
                    </div>
                    <hr></hr>
                    <div className="calendar-wrapper">
                        <div className="calendar-grid">
                            {weekDays.map((dayName, index) => {
                                const isSaturday = index === 5 
                                const isSunday = index === 6

                                return (
                                    <div
                                        key={dayName}
                                        className={`calendar-weekday ${isSaturday ? "saturday-label" : ""} ${isSunday ? "sunday-label" : ""}`}
                                    >
                                        {dayName}
                                    </div>
                                )
                            })}

                            {emptyDays.map((_, index) => (
                                <div key={`empty-${index}`} className="calendar-empty"></div>
                            ))}

                            {days.map((day, index) => {
                                const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

                                const isToday =
                                    day === today.getDate() &&
                                    currentMonth === today.getMonth() &&
                                    currentYear === today.getFullYear()

                                const dayEvents = events.filter((event) => {
                                const eventDate = new Date(event.event_date).toISOString().split("T")[0]
                                return eventDate === dateString
                            })
                        
                            const visibleEvents = dayEvents.slice(0, 2)

                            const gridIndex = index + startOffset
                            const isSaturday = gridIndex % 7 === 5
                            const isSunday = gridIndex % 7 === 6
                            const isWeekend = isSaturday || isSunday
                            const isWeekday = !isWeekend

                                return (
                                    <Link 
                                        href={`/day/${dateString}`}
                                        key={day} 
                                        className={`calendar-day ${isToday ? "today" : ""} ${isWeekday ? "weekday" : ""} ${isSaturday ? "saturday" : ""} ${isSunday ? "sunday" : ""}`}
                                    >
                                        <strong>{day}</strong>

                                        <div className="calendar-events-text">
                                            {visibleEvents.map((event) => {
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
                                        </div>

                                        <div className="calendar-events-dots">
                                            {visibleEvents.map((event) => (
                                                <span key={event.id} className="event-dot"></span>
                                            ))}
                                        </div>

                                            {dayEvents.length > 2 && (
                                                <p className="more-events">+{dayEvents.length - 2} more</p>
                                            )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}