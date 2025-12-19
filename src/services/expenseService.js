const { db } = require('../db/database');
const { getFinancialMonthStart, getFinancialMonthEnd } = require('../utils/dateUtils.js');

const getExpensesForCurrentMonth = async (currentDate = new Date()) => {
    const start = getFinancialMonthStart(currentDate);
    const end = getFinancialMonthEnd(currentDate);

    const expenses = await db.expenses
    .where('date')
    .between(start.toISOString(), end.toISOString(), true, true)
    .toArray();

    return expenses;
};

module.exports = { getExpensesForCurrentMonth };