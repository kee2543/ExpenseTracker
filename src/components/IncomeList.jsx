import React from "react";
import { useState } from "react";
import { updateIncome, deleteIncome } from "../services/incomingService";

export default function IncomeList({ income, onChange }) {
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const startEdit = (i) => {
    setEditingId(i.id);
    setName(i.name);
    setAmount(i.amount);
  };

  const saveEdit = async (id) => {
    await updateIncome(id, {
      name,
      amount: Number(amount),
    });
    setEditingId(null);
    onChange();
  };

  return (
    <div>
      <h3>Income</h3>

      {income.map((i) => (
        <div key={i.id}>
          {editingId === i.id ? (
            <>
              <input value={name} onChange={(e) => setName(e.target.value)} />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button onClick={() => saveEdit(i.id)}>💾</button>
            </>
          ) : (
            <>
              {i.name} – ₹{i.amount}
              <button onClick={() => startEdit(i)}>✏️</button>
            </>
          )}

          <button
            onClick={async () => {
              await deleteIncome(i.id);
              onChange();
            }}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}
