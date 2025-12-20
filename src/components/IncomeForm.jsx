import React from "react";
import { useState } from "react";
import { addIncome } from "../services/incomingService";

export default function IncomeForm({ onSaved }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const save = async () => {
    if (!name || !amount) return;

    await addIncome({
      id: crypto.randomUUID(),
      name,
      amount: Number(amount),
      date: new Date().toISOString(),
    });

    setName("");
    setAmount("");
    onSaved();
  };

  return (
    <div>
      <h3>Add Income</h3>

      <input placeholder="Income source"
        value={name} onChange={e => setName(e.target.value)} />

      <input type="number" placeholder="Amount"
        value={amount} onChange={e => setAmount(e.target.value)} />

      <button onClick={save}>Save</button>
    </div>
  );
}
