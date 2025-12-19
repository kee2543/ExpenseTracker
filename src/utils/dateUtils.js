const { isIndianHoliday } = require("./holidayUtils.js");

// Check if a date is a weekend
const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

// Check if a date is a working day
const isWorkingDay = (date) => !isWeekend(date) && !isIndianHoliday(date);

// Get the last working day of a given month
const getLastWorkingDayOfMonth = (year, month) => {
  let date = new Date(year, month + 1, 0); // last calendar day of month
  while (!isWorkingDay(date)) {
    date.setDate(date.getDate() - 1);
  }
  return date;
};

// Get financial month start = last working day of previous month
const getFinancialMonthStart = (currentDate = new Date()) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;

  return getLastWorkingDayOfMonth(prevMonthYear, prevMonth);
};

// Get financial month end = day before next pay day (last working day of current month)
const getFinancialMonthEnd = (currentDate = new Date()) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const nextPayDay = getLastWorkingDayOfMonth(year, month);

  const end = new Date(nextPayDay);
  end.setDate(end.getDate() - 1);

  return end;
};

module.exports = {
  isWeekend,
  isWorkingDay,
  getLastWorkingDayOfMonth,
  getFinancialMonthStart,
  getFinancialMonthEnd,
};
