export default function EventCard({ event })    {
    return (
        <>
        <div className="event-card">
            <h3>{event.title}</h3>
            <p>
                {event.start_time && event.end_time
                ? `${event.start_time.slice(0, 5)} - ${event.end_time.slice(0, 5)}`
                : event.start_time?. slice(0, 5)}
            </p>
            {event.notes && <p>{event.notes}</p>}
        </div>
        </>
    )
}