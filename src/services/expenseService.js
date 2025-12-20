import { db } from "../db/database";
import { getFinancialMonthStart, getFinancialMonthEnd } from "../utils/dateUtils";

// ADD
export const addExpense = async (expense) => {
  await db.expenses.add(expense);
};

// UPDATE ✅
export const updateExpense = async (id, updates) => {
  await db.expenses.update(id, updates);
};

// DELETE
export const deleteExpense = async (id) => {
  await db.expenses.delete(id);
};

// READ (financial month)
export const getExpensesForCurrentMonth = async (currentDate = new Date()) => {
  const start = getFinancialMonthStart(currentDate);
  const end = getFinancialMonthEnd(currentDate);
  return db.expenses
    .where("date")
    .between(start.toISOString(), end.toISOString(), true, true)
    .toArray();
};
