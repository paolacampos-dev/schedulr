**creating the calendar**

new Date(year, month, day): creates a specific date using year, month, and day

- currentMonth + 1 = moves to the next month
- if day=0 one day before the 1st; day=1 first day of the month
- getDay() and getDate() are methods of JS's Date object:
  - date.getDay() --> returns the day of the week (0=Sunday, 1=Monday, ..., 6=Saturday)
  - date.getDate() --> returns the day of the month (1-31)
- startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 (shift everything back by 1)
  Index: 0 1 2 3 4 5 6
  Day: Mon Tue Wed Thu Fri Sat Sun

- const days = Array.from({ length: daysInMonth }, (\_, i) => i + 1)
  ==> Create and array from 1 to daysInMonth:  
   const days = [];
  for (let i = 0; i < daysInMonth; i++) {
  days.push(i + 1);
  }

- padstart(2, "0") --> 2 means at least two characters long, "0" if its shorter, fill it with zeros on the left

---

- ARRAYS METHODS:
  .filter() --> ARRAY METHOD: Creates a new array with only the items that pass a condition (goes trough all items)
  array.filter((item, index)=> {return condition})
  .map()
  .find() --> returns the first item that matches a condition
  .reduce() --> combine all into one result
  .slice(start, end) --> start: where to begin (included), end:where to stop (not included)

---

**const eventDate = new Date(event.event_date).toISOString().split("T")[0]**
It converts a date into this format: YYYY-MM-DD 1. Create a Date object: new Date(event.event_date)
(Takes DB value (e.g. "2026-04-10") and turns it into a JavaScript Date object) 2. Convert to ISO string .toISOString()--> Gives full date + time: 2026-04-10T00:00:00.000Z 3. Split the string .split("T") Breaks it into: ["2026-04-10", "00:00:00.000Z"] 4. Take first part [0] --> Keeps only:"2026-04-10" --> the eventDate = "2026-04-10"

---

**&&**
"condition && something" --> if is true returns something, if is false return nothing.
