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

// Get all transactions
export const getTransactions = async () => {
  if (!db.transactions) return [];
  return await db.transactions.toArray();
};


export const getSummary = async () => {
  const all = await db.transactions.toArray();

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
