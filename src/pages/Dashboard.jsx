import React, { useEffect, useState } from "react";
import TransactionCard from "../components/TransactionCard";
import TransactionList from "../components/TransactionList";
import { getTransactions, getSummary } from "../services/transactionService";
import { getCategories } from "../services/categoryService";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    spent: 0,
    remaining: 0,
  });
  const [categories, setCategories] = useState([]);

  const loadData = async () => {
    setTransactions(await getTransactions());
    setSummary(await getSummary());
    setCategories(await getCategories());
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="dashboard">
      {/* SUMMARY */}
      <div className="summary-row">
        <div className="summary-box income">
          <p>Income</p>
          <strong>₹ {summary.income}</strong>
        </div>
        <div className="summary-box spent">
          <p>Spent</p>
          <strong>₹ {summary.spent}</strong>
        </div>
        <div className="summary-box remaining">
          <p>Left</p>
          <strong>₹ {summary.remaining}</strong>
        </div>
      </div>

      <TransactionCard
        categories={categories}
        onTransactionSaved={loadData}
      />

      <TransactionList transactions={transactions} />
    </div>
  );
};

export default Dashboard;
