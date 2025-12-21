import React, { useState } from "react";
import { addTransaction } from "../services/transactionService";

const TransactionCard = ({ categories, onSaved }) => {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!amount || (type === "expense" && !category)) return;

    const transaction = {
      type,
      category: type === "expense" ? category : "Income",
      amount: Number(amount),
      date: new Date().toISOString(),
    };

    await addTransaction(transaction);
    onSaved(transaction);

    setAmount("");
    setCategory("");
  };

  return (
    <div className="card">
      <h3>Add Transaction</h3>

      <form onSubmit={submit} className="form-row">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {type === "expense" && (
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        )}

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default TransactionCard;
