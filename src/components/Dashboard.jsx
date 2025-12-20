import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { getExpensesForCurrentMonth } from "../services/expenseService.js";
import { getIncomeForCurrentMonth } from "../services/incomingService.js";
import { getSummaryForCurrentMonth, getCategoryPieData } from "../services/summaryService.js";
import { getCategories } from "../services/categoryService.js";

import ExpenseForm from "./ExpenseForm.jsx";
import ExpenseList from "./ExpenseList.jsx";
import IncomeForm from "./IncomeForm.jsx";
import IncomeList from "./IncomeList.jsx";
import CategoryManager from "./CategoryManager.jsx";

import "../styles/dashboard.css";
import useTheme from "../hooks/useTheme";

const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0", "#009688"];

const Dashboard = () => {
  const { dark, toggleTheme } = useTheme();
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [income, setIncome] = useState([]);
  const [summary, setSummary] = useState({ income: 0, totalSpent: 0, remaining: 0 });
  const [pieData, setPieData] = useState([]);

  const fetchData = async () => {
    const [expenseData, categoryData, incomeData, summaryData, pieChartData] = await Promise.all([
      getExpensesForCurrentMonth(),
      getCategories(),
      getIncomeForCurrentMonth(),
      getSummaryForCurrentMonth(),
      getCategoryPieData(),
    ]);

    setExpenses(expenseData);
    setCategories(categoryData);
    setIncome(incomeData);
    setSummary(summaryData);

    // Map categoryId → name
    const pieWithNames = pieChartData.map((p) => {
      const category = categoryData.find((c) => c.id === p.name);
      return {
        ...p,
        name: category ? category.name : "Unknown",
      };
    });
    setPieData(pieWithNames);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ background: "#fff", border: "1px solid #ccc", padding: "5px" }}>
          <p>{data.name}</p>
          <p>Amount: ₹{data.value}</p>
          <p>Percentage: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard">
      <h2>Expense Dashboard</h2>
      <button style={{ float: "right", marginBottom: "10px" }} onClick={toggleTheme}>
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* SUMMARY */}
      <div className="card summary">
        <div className="income">
          <p>Income</p>
          <strong>₹{summary.income}</strong>
        </div>
        <div className="spent">
          <p>Spent</p>
          <strong>₹{summary.totalSpent}</strong>
        </div>
        <div className="remaining">
          <p>Left</p>
          <strong>₹{summary.remaining}</strong>
        </div>
      </div>

      {/* INCOME */}
      <div className="card">
        <IncomeForm onSaved={fetchData} />
        <IncomeList income={income} onChange={fetchData} />
      </div>

      {/* EXPENSES */}
      <div className="card">
        <ExpenseForm categories={categories} onSaved={fetchData} />
        <ExpenseList expenses={expenses} onChange={fetchData} />
      </div>

      {/* CATEGORIES */}
      <div className="card">
        <CategoryManager />
      </div>

      {/* PIE CHART */}
      <div className="card">
        <h3>Spending Breakdown</h3>
        {pieData.length > 0 ? (
          <PieChart width={320} height={260}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, value, percent }) => `${name}: ₹${value} (${(percent * 100).toFixed(1)}%)`}
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
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
