import React from "react";

const TransactionList = ({ transactions }) => {
  if (!transactions.length) return <p>No transactions yet.</p>;

  return (
    <div className="card">
      <h3>Transactions</h3>
      {transactions.map((tx) => (
        <div key={tx.id} className="list-item">
          <span className="item-name">
            {tx.category} ({tx.type})
          </span>
          <span>{tx.amount}</span>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
