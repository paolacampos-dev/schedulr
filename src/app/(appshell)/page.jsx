import { db } from "@/utils/dbConnection";
import Link from "next/link";
import { buildDateString, formatDateForComparison } from "@/utils/dateHelpers";
import EventCard from "@/components/EventCard";
import { formatTimeRange } from "@/utils/timeHelpers";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default async function Scheduler({ searchParams }) {
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
    
    const eventsResult = await db.query(
        `
        SELECT *
        FROM calendar_events
        ORDER BY event_date ASC, start_time ASC
        `,
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
                        <div className="events-list">
                            {events.map((event) => ( 
                                <EventCard key={event.id} event={event}/>
                            ))}
                        </div>
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
                                const dateString = buildDateString(currentYear, currentMonth, day)

                                const isToday =
                                    day === today.getDate() &&
                                    currentMonth === today.getMonth() &&
                                    currentYear === today.getFullYear()

                                const dayEvents = events.filter(
                                    (event) => formatDateForComparison(event.event_date) === dateString
                                )

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
                                                const time = formatTimeRange(event.start_time, event.end_time)
                                                return (
                                                    <p key={event.id} className="calendar-event">
                                                        {time && (
                                                            <span className="event-time">{time}</span>
                                                        )}{" "}
                                                        {event.title}
                                                    </p>
                                                )
                                            })}
                                        </div>

                                        <div className="calendar-events-dots">
                                            {visibleEvents.map((event) => (
                                                <span key={event.id}className="event-dot"></span>
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