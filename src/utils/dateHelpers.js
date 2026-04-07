export function formatDateForInput(date) {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
}

export function formatDateForDisplay(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
}