const { db } = require('../db/database');

const setMonthlyIncome = async amount => {
await db.settings.put({ key: 'monthlyIncome', value: amount });
};

const getMonthlyIncome = async () => {
const entry = await db.settings.get('monthlyIncome');
return entry ? entry.value : 0;
};

module.exports = { setMonthlyIncome, getMonthlyIncome };