const { getExpensesForCurrentMonth } = require('./expenseService.js');
const { getMonthlyIncome } = require('./settingsService.js');


const getSummaryForCurrentMonth = async (currentDate = new Date()) => {
    const expenses = await getExpensesForCurrentMonth(currentDate);
    const income = await getMonthlyIncome();
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const remaining = income - totalSpent;

    return { income, totalSpent, remaining };
};


module.exports = { getSummaryForCurrentMonth };