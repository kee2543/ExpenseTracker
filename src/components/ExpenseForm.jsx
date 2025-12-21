import React, { useState } from "react";
import { addExpense } from "../services/expenseService";

const ExpenseForm = ({ categories, onSaved }) => {
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !categoryId) return;

    await addExpense({
      amount: Number(amount),
      categoryId,
      date: new Date().toISOString(),
    });

    setAmount("");
    setCategoryId("");
    onSaved(); // 🔥 REQUIRED
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="number"
          placeholder="Expense amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
