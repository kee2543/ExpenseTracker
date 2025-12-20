import React, { useState } from "react";
import { addIncome } from "../services/incomingService";

const IncomeForm = ({ onSaved }) => {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !source) return;

    await addIncome({
      amount: Number(amount),
      source,
      date: new Date().toISOString(),
    });

    setAmount("");
    setSource("");
    onSaved();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add Income</h3>

      <div className="form-row">
        <input
          className="form-control"
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <input
          className="form-control"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default IncomeForm;
