import React, { useEffect, useState } from "react";
import TransactionCard from "../components/TransactionCard";
import TransactionList from "../components/TransactionList";
import { getTransactions, getSummary } from "../services/transactionService";
import { getCategories } from "../services/categoryService";
import { getSetting } from "../services/settingsService";
import {
  getFinancialMonthRangeBySettings,
  getNextFinancialMonth,
  getPreviousFinancialMonth,
  formatMonthRange
} from "../utils/dateUtils";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    spent: 0,
    remaining: 0,
  });
  const [categories, setCategories] = useState([]);
  const [dateRange, setDateRange] = useState(() => {
    const payDayType = getSetting('payDayType') || 'fixed';
    const payDay = getSetting('payDay') || 1;
    return getFinancialMonthRangeBySettings(new Date(), payDayType, payDay);
  });

  const loadData = async () => {
    setTransactions(await getTransactions(dateRange.start, dateRange.end));
    setSummary(await getSummary(dateRange.start, dateRange.end));
    setCategories(await getCategories());
  };

  useEffect(() => {
    loadData();
  }, [dateRange]);

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

      <TransactionList
        transactions={transactions}
        categories={categories}
        onUpdate={loadData}
      />
    </div>
  );
};

export default Dashboard;
