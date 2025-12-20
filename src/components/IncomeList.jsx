import React, { useState } from "react";
import {
  updateIncome,
  deleteIncome,
} from "../services/incomingService";

const IncomeList = ({ income = [], onChange }) => {
  const [editingId, setEditingId] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const startEdit = (item) => {
    setEditingId(item.id);
    setAmount(item.amount);
    setNote(item.note || "");
  };

  const saveEdit = async (id) => {
    await updateIncome(id, {
      amount: Number(amount),
      note,
    });
    setEditingId(null);
    onChange();
  };

  const remove = async (id) => {
    await deleteIncome(id);
    onChange();
  };

  return (
    <div>
      <h3>Income</h3>

      {income.length === 0 ? (
        <p>No income added</p>
      ) : (
        income.map((item) => (
          <div key={item.id} className="list-item">
            {editingId === item.id ? (
              <>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <input
                  placeholder="Note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <button onClick={() => saveEdit(item.id)}>💾</button>
                <button onClick={() => setEditingId(null)}>❌</button>
              </>
            ) : (
              <>
                <span className="item-name">
                  ₹{item.amount} {item.note && `• ${item.note}`}
                </span>
                <div className="item-actions">
                  <button onClick={() => startEdit(item)}>✏️</button>
                  <button onClick={() => remove(item.id)}>🗑️</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default IncomeList;
