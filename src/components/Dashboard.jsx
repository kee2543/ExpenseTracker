import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { getExpensesForCurrentMonth } from "../services/expenseService";
import { getIncomeForCurrentMonth } from "../services/incomingService";
import { getSummaryForCurrentMonth } from "../services/summaryService";
import { getCategories } from "../services/categoryService";

import ExpenseForm from "./ExpenseForm.jsx";
import ExpenseList from "./ExpenseList.jsx";
import IncomeForm from "./IncomeForm.jsx";
import IncomeList from "./IncomeList.jsx";
import CategoryManager from "./CategoryManager.jsx";

import "../styles/dashboard.css";
import useTheme from "../hooks/useTheme";

const COLORS = [
  "#4CAF50",
  "#2196F3",
  "#FF9800",
  "#E91E63",
  "#9C27B0",
  "#009688",
];

const Dashboard = () => {
  const { dark, toggleTheme } = useTheme();
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [income, setIncome] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    totalSpent: 0,
    remaining: 0,
  });

  const fetchData = async () => {
    setExpenses(await getExpensesForCurrentMonth());
    setCategories(await getCategories());
    setIncome(await getIncomeForCurrentMonth());
    setSummary(await getSummaryForCurrentMonth());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pieData = categories
    .map((cat) => {
      const total = expenses
        .filter((e) => e.categoryId === cat.id)
        .reduce((sum, e) => sum + e.amount, 0);
      return { name: cat.name, value: total };
    })
    .filter((d) => d.value > 0);

  return (
    <div className={`dashboard ${dark ? "dark" : ""}`}>
      <div className="dashboard-header">
        <h2>Expense Dashboard</h2>
        <button onClick={toggleTheme}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>

      {/* SUMMARY ROW */}
      <div className="summary-row">
        <div className="summary-box income">
          <p>Income</p>
          <strong>₹{summary.income}</strong>
        </div>

        <div className="summary-box spent">
          <p>Spent</p>
          <strong>₹{summary.totalSpent}</strong>
        </div>

        <div className="summary-box remaining">
          <p>Left</p>
          <strong>₹{summary.remaining}</strong>
        </div>
      </div>

      {/* INCOME */}
      <div className="card">
        <IncomeForm onSaved={fetchData} />
        <IncomeList income={income} onChange={fetchData} />
      </div>

      {/* EXPENSE */}
      <div className="card">
        <ExpenseForm categories={categories} onSaved={fetchData} />
        <ExpenseList expenses={expenses} onChange={fetchData} />
      </div>

      {/* CATEGORY */}
      <div className="card">
        <CategoryManager />
      </div>

      {/* PIE */}
      <div className="card">
        <h3>Spending Breakdown</h3>
        {pieData.length > 0 ? (
          <PieChart width={320} height={260}>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, value, percent }) =>
                `${name}: ₹${value} (${(percent * 100).toFixed(1)}%)`
              }
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p>No expenses yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
