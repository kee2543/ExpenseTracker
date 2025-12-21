import React, { useState } from "react";
import { updateTransaction, deleteTransaction } from "../services/transactionService";
import { formatDateForInput } from "../utils/dateUtils";

const TransactionList = ({ transactions, categories, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  if (!transactions.length) return <p style={{ textAlign: 'center', opacity: 0.6, marginTop: '20px' }}>No transactions yet.</p>;

  const startEdit = (tx) => {
    setEditingId(tx.id);
    setEditForm({
      type: tx.type,
      category: tx.category,
      amount: tx.amount,
      note: tx.note || "",
      date: formatDateForInput(new Date(tx.date)),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (id) => {
    try {
      await updateTransaction(id, {
        ...editForm,
        amount: Number(editForm.amount),
        date: new Date(editForm.date).toISOString(),
      });
      setEditingId(null);
      setEditForm({});
      onUpdate();
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
        onUpdate();
      } catch (error) {
        console.error("Failed to delete transaction:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="card" style={{ padding: '0' }}>
      <h3 style={{ margin: '20px 20px 10px' }}>Recent Transactions</h3>

      <div className="transaction-list">
        {transactions.map((tx) => (
          <div key={tx.id} className="list-item">
            {editingId === tx.id ? (
              // EDIT MODE
              <div className="edit-mode-container" style={{ padding: '0 20px' }}>
                <div className="form-row">
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>

                {editForm.type === "expense" && (
                  <div className="form-row">
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    >
                      <option value="">Select category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="form-row">
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                    placeholder="Amount"
                  />
                </div>

                <div className="form-row">
                  <input
                    type="text"
                    value={editForm.note}
                    onChange={(e) => setEditForm({ ...editForm, note: e.target.value })}
                    placeholder="Note"
                  />
                </div>

                <div className="form-row">
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  />
                </div>

                <div className="form-row" style={{ gap: '10px' }}>
                  <button onClick={() => saveEdit(tx.id)} style={{ flex: 1 }}>Save</button>
                  <button onClick={cancelEdit} style={{ flex: 1, background: '#e0e0e0', color: '#333' }}>Cancel</button>
                </div>
              </div>
            ) : (
              // VIEW MODE
              <>

                <div className="item-content">
                  <div className="item-header">
                    <span className="category-name">
                      {tx.note || tx.category}
                    </span>
                    <span className={`amount ${tx.type}`}>
                      {tx.type === 'income' ? '+' : '-'} ₹{tx.amount}
                    </span>
                  </div>

                  <div className="item-meta">
                    {tx.note && (
                      <>
                        <span style={{ fontWeight: '500', color: '#525f7f' }}>{tx.category}</span>
                        <span> • </span>
                      </>
                    )}
                    <span className="date">{formatDate(tx.date)}</span>
                  </div>
                </div>

                <div className="item-actions-hover">
                  <button className="icon-btn edit" onClick={() => startEdit(tx)}>✏️</button>
                  <button className="icon-btn delete" onClick={() => handleDelete(tx.id)}>🗑️</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
