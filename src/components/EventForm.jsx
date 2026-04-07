"use client"

export default function EventForm({ action, event, initialDate })    {
    
    return (
        <div className="calendar-card">
            <div className="calendar-content">
                <h1 className="">{event ? "Edit Event" : "New Event"}</h1>

                <form action={action} className="flex flex-col gap-4">
                    {event?.id && (
                        <input type="hidden" name="id" value={event.id} />
                    )}
                    <div className="">
                        <label htmlFor="event_date">Date:</label>
                        <input
                            id="event_date"
                            type="date"
                            name="event_date"
                            defaultValue={event?.event_date || initialDate || ""}
                            required
                        />
                    </div>

                    <div className="">
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Event title"
                            defaultValue={event?.title || ""}
                            required
                        />
                    </div>

                    <div className="">
                        <fieldset>
                            <legend>Time:</legend>
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="start_time">Start:</label>
                                    <input
                                        id="start_time"
                                        type="time"
                                        name="start_time"
                                        defaultValue={event?.start_time || ""}
                                    />

                                    <label htmlFor="end_time">End:</label>
                                    <input
                                        id="end_time"
                                        type="time"
                                        name="end_time"
                                        defaultValue={event?.end_time || ""}
                                    />
                                </div>
                        </fieldset>
                    </div>

                    <div className="">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            defaultValue={event?.description || ""}
                        />
                    </div>

                    <button type="submit" className="">
                        {event ? "Update Event" : "Create Event"}
                    </button>

                </form>
            </div>
        </div>
    )
}