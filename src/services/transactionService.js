import { db } from "../db/database";

// Add a transaction (income or expense)
export const addTransaction = async (transaction) => {
  try {
    await db.transactions.add(transaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};

// Get all transactions, optionally filtered by date range
export const getTransactions = async (startDate = null, endDate = null) => {
  if (!db.transactions) return [];

  if (startDate && endDate) {
    const transactions = await db.transactions
      .where('date')
      .between(startDate.toISOString(), endDate.toISOString(), true, true)
      .toArray();
    return transactions.sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id);
  }

  const transactions = await db.transactions.toArray();
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id);
};


export const getSummary = async (startDate = null, endDate = null) => {
  const all = await getTransactions(startDate, endDate);

  let income = 0;
  let spent = 0;

  all.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else spent += t.amount;
  });

  return {
    income,
    spent,
    remaining: income - spent
  };
};

// Update a transaction
export const updateTransaction = async (id, updates) => {
  try {
    await db.transactions.update(id, updates);
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

// Delete a transaction
export const deleteTransaction = async (id) => {
  try {
    await db.transactions.delete(id);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};
