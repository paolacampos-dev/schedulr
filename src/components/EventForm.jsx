"use client"

import { formatDateForInput } from "@/utils/dateHelpers"
import { formatTimeForInput } from "@/utils/timeHelpers"

export default function EventForm({ action, event, initialDate })    {
    
    return (
        <div className="page-center">
            <div className="form-wrapper">
                <h1 className="form-title">{event ? "Edit Event" : "New Event"}</h1>
                <div className="calendar-card">
                    <div className="calendar-content">
                    
                        <form action={action} className="flex flex-col gap-4">
                            {event?.id && (
                                <input type="hidden" name="id" value={event.id} />
                            )}
                            <div className="form-section">
                                <label htmlFor="event_date">Date:</label>
                                <input
                                    id="event_date"
                                    type="date"
                                    name="event_date"
                                    defaultValue={event?.event_date ? formatDateForInput(event.event_date) : initialDate || ""}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-section">
                                <label htmlFor="title">Title:</label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="Event title"
                                    defaultValue={event?.title || ""}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-section">
                                <fieldset>
                                    <legend>Time:</legend>
                                        <div className="time-row">
                                            <div className="time-field">
                                                <label htmlFor="start_time">Start:</label>
                                                <input
                                                    id="start_time"
                                                    type="time"
                                                    name="start_time"
                                                    defaultValue={formatTimeForInput(event?.start_time) || ""}
                                                    className="form-input"
                                                />
                                            </div>
                                            <div className="time-field">
                                                <label htmlFor="end_time">End:</label>
                                                <input
                                                    id="end_time"
                                                    type="time"
                                                    name="end_time"
                                                    defaultValue={formatTimeForInput(event?.end_time) || ""}
                                                    className="form-input"
                                                />
                                            </div>   
                                        </div>
                                </fieldset>
                            </div>

                            <div className="form-section">
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Description"
                                    defaultValue={event?.description || ""}
                                    className="form-input"
                                />
                            </div>

                            <button type="submit" className="new-button">
                                {event ? "Update Event" : "Create Event"}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}