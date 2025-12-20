// src/services/summaryService.js
import { getExpensesForCurrentMonth } from "./expenseService.js";
import { getIncomeForCurrentMonth } from "./incomingService.js";

/**
 * Returns summary for current month
 * income: total income
 * totalSpent: total expense
 * remaining: income - expense
 */
export const getSummaryForCurrentMonth = async () => {
  const expenses = await getExpensesForCurrentMonth();
  const income = await getIncomeForCurrentMonth();

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const totalIncome = income.reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const remaining = totalIncome - totalSpent;

  return {
    income: totalIncome,
    totalSpent,
    remaining,
  };
};

/**
 * Returns data suitable for PieChart
 * [{ name, value, percentage }]
 */
export const getCategoryPieData = async () => {
  const expenses = await getExpensesForCurrentMonth();

  // Get all categories
  const categoriesSet = new Set(expenses.map((e) => e.categoryId));
  const categoryTotals = Array.from(categoriesSet).map((catId) => {
    const total = expenses
      .filter((e) => e.categoryId === catId)
      .reduce((sum, e) => sum + Number(e.amount || 0), 0);
    return { categoryId: catId, total };
  });

  const grandTotal = categoryTotals.reduce((sum, c) => sum + c.total, 0);

  const pieData = categoryTotals.map((c) => ({
    name: c.categoryId, // optionally, you can map ID → name using categories DB
    value: c.total,
    percentage: grandTotal > 0 ? Number(((c.total / grandTotal) * 100).toFixed(1)) : 0,
  }));

  return pieData;
};
