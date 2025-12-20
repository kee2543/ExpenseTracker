import React, { useState } from "react";
import { addExpense } from "../services/expenseService";

const ExpenseForm = ({ categories, onSaved }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const submit = async () => {
    if (!name || !amount || !categoryId) return;
    await addExpense({
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

      <div className="form-row">
        <input
          placeholder="Expense name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="form-row">
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
        <button onClick={submit}>Add</button>
      </div>
    </div>
  );
};

export default ExpenseForm;
