const { db } = require('../db/database');
const { getFinancialMonthStart, getFinancialMonthEnd } = require('../utils/dateUtils.js');


const addIncome = async ({ id, name, amount, date }) => {
await db.incoming.add({ id, name, amount, date });
};


const getIncomeForCurrentMonth = async (currentDate = new Date()) => {
const start = getFinancialMonthStart(currentDate);
const end = getFinancialMonthEnd(currentDate);


return await db.incoming
.where('date')
.between(start.toISOString(), end.toISOString(), true, true)
.toArray();
};


module.exports = { addIncome, getIncomeForCurrentMonth };