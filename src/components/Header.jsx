"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation"

export default function Header()  {
    const searchParams = useSearchParams()
    const view = searchParams.get("view") || "month"

    return(
        <div className="scheduler-toolbar">
            <div className="view-toggle">
                <Link
                    href="/scheduler?view=month"
                    className={`toggle-btn ${view === "month" ? "active" : ""}`}
                >
                    Month
                </Link>
                <Link
                    href="/scheduler?view=list"
                    className={`toggle-btn ${view === "list" ? "active" : ""}`}
                >
                    List
                </Link>
            </div>
            <Link href= "/scheduler/new" className="new-btn">
                + New Event
            </Link>
        </div>

    )
}