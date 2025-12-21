import React, { useEffect, useState } from "react";
import { getTransactions } from "../services/transactionService";

const Reports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const all = await getTransactions();
      const expenses = all.filter((t) => t.type === "expense");

      const total = expenses.reduce((s, e) => s + e.amount, 0);

      const grouped = {};
      expenses.forEach((e) => {
        grouped[e.category] = (grouped[e.category] || 0) + e.amount;
      });

      const formatted = Object.entries(grouped).map(([cat, amt]) => ({
        category: cat,
        amount: amt,
        percent: ((amt / total) * 100).toFixed(1),
      }));

      setData(formatted);
    };

    load();
  }, []);

  return (
    <div className="dashboard">
      <div className="card">
        <h2>Expense Report</h2>

        {data.length === 0 ? (
          <div className="no-data">No expenses</div>
        ) : (
          data.map((d) => (
            <div key={d.category} className="list-item">
              <span className="item-name">
                {d.category}
              </span>
              <strong>
                ₹ {d.amount} ({d.percent}%)
              </strong>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reports;
