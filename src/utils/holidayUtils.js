const indianHolidays = [
  "2025-01-01", // New Year
  "2025-01-26", // Republic Day
  "2025-08-15", // Independence Day
  "2025-10-02", // Gandhi Jayanti
  "2025-12-25"  // Christmas
];

const isIndianHoliday = (date) => {
  const dateStr = date.toISOString().split("T")[0];
  return indianHolidays.includes(dateStr);
};

module.exports = { indianHolidays, isIndianHoliday };
