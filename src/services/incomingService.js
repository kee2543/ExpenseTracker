import { db } from "../db/database";
import { getFinancialMonthStart, getFinancialMonthEnd } from "../utils/dateUtils";

// ADD
export const addIncome = async (income) => {
  await db.income.add(income);
};

// UPDATE ✅
export const updateIncome = async (id, updates) => {
  await db.income.update(id, updates);
};

// DELETE
export const deleteIncome = async (id) => {
  await db.income.delete(id);
};

export const getIncomeForCurrentMonth = async (currentDate = new Date()) => {
  const start = getFinancialMonthStart(currentDate);
  const end = getFinancialMonthEnd(currentDate);
  return db.income
    .where("date")
    .between(start.toISOString(), end.toISOString(), true, true)
    .toArray();
};
