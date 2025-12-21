import React, { useState } from "react";
import { addIncome } from "../services/incomingService";

const IncomeForm = ({ onSaved }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount) return;

    await addIncome({
      amount: Number(amount),
      date: new Date().toISOString(),
    });

    setAmount("");
    onSaved(); // 🔥 THIS WAS MISSING OR NOT FIRING
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="number"
          placeholder="Income amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default IncomeForm;
