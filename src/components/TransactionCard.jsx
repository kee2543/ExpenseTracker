import React, { useState } from "react";
import { addTransaction } from "../services/transactionService";
import { formatDateForInput } from "../utils/dateUtils";

const TransactionCard = ({ categories, onTransactionSaved }) => {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(formatDateForInput(new Date()));
  const [note, setNote] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!amount || (type === "expense" && !category)) return;

    const transaction = {
      type,
      category: type === "expense" ? category : "Income",
      amount: Number(amount),
      date: new Date(date).toISOString(),
      note,
    };

    await addTransaction(transaction);
    onTransactionSaved(transaction);

    setAmount("");
    setCategory("");
    setNote("");
    setDate(formatDateForInput(new Date()));
  };

  return (
    <div className="card">
      <h3>Add Transaction</h3>

      <form onSubmit={submit}>
        <div className="form-row">
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {type === "expense" && (
          <div className="form-row">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-row">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="form-row">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-row">
          <button type="submit" className="btn-minimal" style={{ width: '100%' }}>Add Transaction</button>
        </div>
      </form>
    </div>
  );
};

export default TransactionCard;
