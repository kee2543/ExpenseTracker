import { isIndianHoliday } from "./holidayUtils.js";

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

export {
  isWeekend,
  isWorkingDay,
  getLastWorkingDayOfMonth,
  getFinancialMonthStart,
  getFinancialMonthEnd,
};

/**
 * Get the financial month range based on a pay day.
 * If payDay is 25, then the financial month runs from the 25th of the previous month
 * to the 24th of the current month.
 * 
 * @param {Date} referenceDate - The date to calculate the financial month for
 * @param {number} payDay - The day of the month that marks the start of the financial month (1-31)
 * @returns {{start: Date, end: Date}} - Start and end dates of the financial month
 */
export const getFinancialMonthRange = (referenceDate, payDay = 1) => {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const day = referenceDate.getDate();

  // Helper to get days in a month
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();

  // Clamp payDay to the valid days in each month
  const clampDay = (p, days) => Math.min(p, days);

  let startDate, endDate;

  const effectivePayDay = clampDay(payDay, getDaysInMonth(year, month));

  if (day >= effectivePayDay) {
    // Current financial month
    startDate = new Date(year, month, effectivePayDay);

    // Ends in next month
    const nextMonthDays = getDaysInMonth(year, month + 1);
    const nextEffectiveDay = clampDay(payDay, nextMonthDays);
    endDate = new Date(year, month + 1, nextEffectiveDay - 1);
  } else {
    // Previous financial month
    const prevMonthDays = getDaysInMonth(year, month - 1);
    const prevEffectiveDay = clampDay(payDay, prevMonthDays);

    startDate = new Date(year, month - 1, prevEffectiveDay);

    // Ends in current month
    endDate = new Date(year, month, effectivePayDay - 1);
  }

  // Set time to start/end of day
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  return { start: startDate, end: endDate };
};

/**
 * Navigate to the next financial month
 */
export const getNextFinancialMonth = (currentStart, payDay) => {
  if (payDay === 'lastWorkingDay') {
    const currentRange = getFinancialMonthRangeBySettings(currentStart, 'lastWorkingDay');
    const nextStart = new Date(currentRange.end);
    nextStart.setDate(nextStart.getDate() + 1);
    return getFinancialMonthRangeBySettings(nextStart, 'lastWorkingDay');
  }

  // Fixed Day logic
  const currentRange = getFinancialMonthRange(currentStart, payDay);
  const nextStart = new Date(currentRange.end);
  nextStart.setDate(nextStart.getDate() + 1);
  return getFinancialMonthRange(nextStart, payDay);
};

/**
 * Navigate to the previous financial month
 */
export const getPreviousFinancialMonth = (currentStart, payDay) => {
  if (payDay === 'lastWorkingDay') {
    const prevRef = new Date(currentStart);
    prevRef.setDate(prevRef.getDate() - 1);
    return getFinancialMonthRangeBySettings(prevRef, 'lastWorkingDay');
  }

  const prevRef = new Date(currentStart);
  prevRef.setDate(prevRef.getDate() - 1);
  return getFinancialMonthRange(prevRef, payDay);
};

/**
 * Format a date as YYYY-MM-DD for input[type="date"]
 */
export const formatDateForInput = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Format a date range for display
 */
export const formatMonthRange = (start, end) => {
  const options = { month: 'short', day: 'numeric' };
  const startStr = start.toLocaleDateString('en-US', options);
  const endStr = end.toLocaleDateString('en-US', options);
  return `${startStr} - ${endStr}`;
};

/**
 * Get month and year for display
 */
export const getMonthYearDisplay = (date) => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

/**
 * Get financial month range based on pay day settings
 * Supports both fixed day and last working day options
 */
export const getFinancialMonthRangeBySettings = (referenceDate, payDayType, payDay) => {
  if (payDayType === 'lastWorkingDay') {
    // Use existing last working day logic
    const year = referenceDate.getFullYear();
    const month = referenceDate.getMonth();
    const currentMonthLastWorkingDay = getLastWorkingDayOfMonth(year, month);

    // If we're past the last working day of current month, we're in next financial month
    if (referenceDate >= currentMonthLastWorkingDay) {
      // Financial month: current month's last working day to next month's last working day - 1
      const startDate = new Date(currentMonthLastWorkingDay);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(year, month + 1, 0); // Last day of next month
      const nextMonthLastWorkingDay = getLastWorkingDayOfMonth(year, month + 1);
      const end = new Date(nextMonthLastWorkingDay);
      end.setDate(end.getDate() - 1);
      end.setHours(23, 59, 59, 999);

      return { start: startDate, end: end };
    } else {
      // We're before this month's last working day, so in previous financial month
      const prevMonthLastWorkingDay = getLastWorkingDayOfMonth(
        month === 0 ? year - 1 : year,
        month === 0 ? 11 : month - 1
      );
      const startDate = new Date(prevMonthLastWorkingDay);
      startDate.setHours(0, 0, 0, 0);

      const end = new Date(currentMonthLastWorkingDay);
      end.setDate(end.getDate() - 1);
      end.setHours(23, 59, 59, 999);

      return { start: startDate, end: end };
    }
  } else {
    // Use fixed day logic
    return getFinancialMonthRange(referenceDate, payDay);
  }
};
