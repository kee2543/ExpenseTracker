import React from "react";
import { useState } from "react";
import { deleteExpense, updateExpense } from "../services/expenseService";

export default function ExpenseList({ expenses, onChange }) {
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setName(expense.name);
    setAmount(expense.amount);
  };

  const saveEdit = async (id) => {
    await updateExpense(id, {
      name,
      amount: Number(amount),
    });
    setEditingId(null);
    onChange();
  };

  return (
    <div>
      <h3>Expenses</h3>

      {expenses.length === 0 && <p>No expenses yet</p>}

      {expenses.map((e) => (
        <div className="list-item" key={e.id}>
          {editingId === e.id ? (
            <>
              <input
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <input
                type="number"
                value={amount}
                onChange={(ev) => setAmount(ev.target.value)}
              />
              <button onClick={() => saveEdit(e.id)}>💾</button>
            </>
          ) : (
            <>
              <span>{e.name}</span>
              <strong>₹{e.amount}</strong>

              <div>
                <button onClick={() => startEdit(e)}>✏️</button>
                <button
                  onClick={async () => {
                    await deleteExpense(e.id);
                    onChange();
                  }}
                >
                  ❌
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
