import React, { useEffect, useState } from "react";
import { getTransactions, getSummary } from "../services/transactionService";
import { getSetting } from "../services/settingsService";
import {
  getFinancialMonthRangeBySettings,
  getNextFinancialMonth,
  getPreviousFinancialMonth,
  formatMonthRange
} from "../utils/dateUtils";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B9D'];

const Reports = () => {
  const [summary, setSummary] = useState({
    income: 0,
    spent: 0,
    remaining: 0,
  });

  const [categoryData, setCategoryData] = useState([]);
  const [dateRange, setDateRange] = useState(() => {
    const payDayType = getSetting('payDayType') || 'fixed';
    const payDay = getSetting('payDay') || 1;
    return getFinancialMonthRangeBySettings(new Date(), payDayType, payDay);
  });

  useEffect(() => {
    loadReports();
  }, [dateRange]);

  const loadReports = async () => {
    const summaryResult = await getSummary(dateRange.start, dateRange.end);
    const transactions = await getTransactions(dateRange.start, dateRange.end);

    // Calculate category-wise expenses
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryMap = {};

    expenses.forEach(expense => {
      const cat = expense.category || 'Uncategorized';
      if (!categoryMap[cat]) {
        categoryMap[cat] = 0;
      }
      categoryMap[cat] += expense.amount;
    });

    const totalSpent = summaryResult.spent;
    const categoryResult = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
      percentage: totalSpent > 0 ? Number(((value / totalSpent) * 100).toFixed(1)) : 0,
    }));

    setSummary(summaryResult);
    setCategoryData(categoryResult);
  };

  const handlePreviousMonth = () => {
    const payDayType = getSetting('payDayType') || 'fixed';
    const payDay = getSetting('payDay') || 1;
    setDateRange(getPreviousFinancialMonth(dateRange.start, payDayType === 'lastWorkingDay' ? 'lastWorkingDay' : payDay));
  };

  const handleNextMonth = () => {
    const payDayType = getSetting('payDayType') || 'fixed';
    const payDay = getSetting('payDay') || 1;
    setDateRange(getNextFinancialMonth(dateRange.start, payDayType === 'lastWorkingDay' ? 'lastWorkingDay' : payDay));
  };

  const handleCurrentMonth = () => {
    const payDayType = getSetting('payDayType') || 'fixed';
    const payDay = getSetting('payDay') || 1;
    setDateRange(getFinancialMonthRangeBySettings(new Date(), payDayType, payDay));
  };

  return (
    <div className="dashboard">
      {/* MONTH NAVIGATION */}
      {/* MONTH NAVIGATION */}
      <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <button className="month-nav-btn" onClick={handlePreviousMonth}>←</button>
          <span style={{ fontWeight: '600', fontSize: '15px' }}>
            {formatMonthRange(dateRange.start, dateRange.end)}
          </span>
          <button className="month-nav-btn" onClick={handleNextMonth}>→</button>
        </div>
        <button className="current-month-btn" onClick={handleCurrentMonth}>Current Month</button>
      </div>

      <h2 style={{ marginLeft: '16px' }}>Reports</h2>

      {/* Summary Section */}
      <div className="summary-row">
        <div className="summary-box income">
          <p>Total Income</p>
          <strong>₹ {summary.income}</strong>
        </div>

        <div className="summary-box spent">
          <p>Total Expense</p>
          <strong>₹ {summary.spent}</strong>
        </div>

        <div className="summary-box remaining">
          <p>Balance</p>
          <strong>₹ {summary.remaining}</strong>
        </div>
      </div>

      {/* Pie Chart */}
      {categoryData.length > 0 && (
        <div className="card" style={{ margin: "0 16px 16px" }}>
          <h3>Expense Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Category-wise Expense */}
      <div className="card" style={{ margin: "0 16px" }}>
        <h3>Expense by Category</h3>

        {categoryData.length === 0 ? (
          <p>No expense data available</p>
        ) : (
          <table width="100%" border="0" cellPadding="0">
            <thead>
              <tr>
                <th>Category</th>
                <th style={{ textAlign: "right" }}>Amount</th>
                <th style={{ textAlign: "right" }}>%</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      width: '10px',
                      height: '10px',
                      backgroundColor: COLORS[index % COLORS.length],
                      marginRight: '8px',
                      borderRadius: '50%'
                    }}></span>
                    {item.name}
                  </td>
                  <td style={{ textAlign: "right", fontWeight: "600" }}>₹ {item.value}</td>
                  <td style={{ textAlign: "right", opacity: 0.7 }}>{item.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reports;
