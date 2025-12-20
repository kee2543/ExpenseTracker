import React from "react";
import { useState } from "react";
import { addExpense } from "../services/expenseService";

export default function ExpenseForm({ categories, onSaved }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const saveExpense = async () => {
    if (!name || !amount || !categoryId) return;

    await addExpense({
      id: crypto.randomUUID(),
      name,
      amount: Number(amount),
      categoryId,
      date: new Date().toISOString(),
    });

    setName("");
    setAmount("");
    setCategoryId("");
    onSaved();
  };

  return (
    <div>
      <h3>Add Expense</h3>

      <input placeholder="Expense name" value={name}
        onChange={e => setName(e.target.value)} />

      <input type="number" placeholder="Amount" value={amount}
        onChange={e => setAmount(e.target.value)} />

      <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <button onClick={saveExpense}>Save</button>
    </div>
  );
}
