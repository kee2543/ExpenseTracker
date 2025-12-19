import { isIndianHoliday } from "./holidayUtils.js";

// Check if a date is a weekend
export const isWeekend = (date) => {
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  return day === 0 || day === 6;
};

// Check if a date is a working day
export const isWorkingDay = (date) => {
  return !isWeekend(date) && !isIndianHoliday(date);
};

// Get the start date of the financial month based on pay day
export const getFinancialMonthStart = (payDay, currentDate = new Date()) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  let start = new Date(year, month, payDay);

  // If current date is before payDay, start is previous month
  if (currentDate < start) {
    start = new Date(year, month - 1, payDay);
  }

  return start;
};

// Get the end date of the financial month based on pay day
export const getFinancialMonthEnd = (payDay, currentDate = new Date()) => {
  const start = getFinancialMonthStart(payDay, currentDate);
  let nextMonth = new Date(start.getFullYear(), start.getMonth() + 1, payDay);

  // Go backwards to find the second last working day
  let end = new Date(nextMonth.getTime() - 1 * 24 * 60 * 60 * 1000); // One day before next pay day
  let workingDaysCount = 0;

  while (workingDaysCount < 2) {
    if (isWorkingDay(end)) {
      workingDaysCount++;
    }
    if (workingDaysCount < 2) {
      end.setDate(end.getDate() - 1);
    }
  }

  return end;
};
