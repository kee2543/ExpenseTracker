// You can fill this JSON manually or import from an external file
export const indianHolidays = [
  "2025-01-01", // New Year
  "2025-01-26", // Republic Day
  "2025-08-15", // Independence Day
  "2025-10-02", // Gandhi Jayanti
  "2025-12-25"  // Christmas
  // Add more holidays as needed
];

// Check if a date is an Indian public holiday
export const isIndianHoliday = (date) => {
  const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD
  return indianHolidays.includes(dateStr);
};
