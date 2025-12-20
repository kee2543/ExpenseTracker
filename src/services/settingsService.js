import { db } from '../db/database';
import { getFinancialMonthStart, getFinancialMonthEnd } from "../utils/dateUtils";


export const setMonthlyIncome = async amount => {
    await db.settings.put({ key: 'monthlyIncome', value: amount });
};

export const getMonthlyIncome = async (currentDate = new Date()) => {
    // Sum all income records for the current month
    const start = getFinancialMonthStart(currentDate);
    const end = getFinancialMonthEnd(currentDate);
    const incomeRecords = await db.income
        .where("date")
        .between(start.toISOString(), end.toISOString(), true, true)
        .toArray();
    return incomeRecords.reduce((sum, i) => sum + (i.amount || 0), 0);
};