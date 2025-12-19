import { db } from "../db/database";

// Add a new expense with name and amount
export const addExpense = async (expense) => {
    return await db.expenses.add({
        id: crypto.randomUUID(),
        name: expense.name,
        amount: Number(expense.amount),
        categoryId: expense.categoryId,
        date: expense.date,
        note: expense.note || ""
    });
};

// Get expenses between two dates
export const getExpensesBetween = async (start, end) => {
    return await db.expenses
    .where("date")
    .between(start, end, true, true)
    .toArray();
};

// Delete expense by id
export const deleteExpense = async (id) => {
    return await db.expenses.delete(id);
};

// Update an existing expense
export const updateExpense = async (id, updatedExpense) => {
    return await db.expenses.update(id, {
        name: updatedExpense.name,
        amount: Number(updatedExpense.amount),
        categoryId: updatedExpense.categoryId,
        date: updatedExpense.date,
        note: updatedExpense.note || ""
    });
};
