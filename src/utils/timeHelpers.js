export function formatTimeForInput(time) {
    if (!time) return "";
    return String(time).slice(0, 5);
}

export function formatTimeRange(start, end) {
    const startFormatted = start ? String(start).slice(0, 5) : "";
    const endFormatted = end ? String(end).slice(0, 5) : "";

    if (startFormatted && endFormatted) {
        return `${startFormatted} - ${endFormatted}`;
    }

    return startFormatted || "";
}