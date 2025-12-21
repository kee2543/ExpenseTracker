import React, { useState, useEffect } from "react";
import CategoryManager from "../components/CategoryManager";
import { getSetting, updateSetting } from "../services/settingsService";

const Settings = ({ dark, setDark }) => {
  const [payDayType, setPayDayType] = useState('fixed'); // 'fixed' or 'lastWorkingDay'
  const [payDay, setPayDay] = useState(1);

  useEffect(() => {
    const savedType = getSetting('payDayType') || 'fixed';
    const savedDay = getSetting('payDay') || 1;
    setPayDayType(savedType);
    setPayDay(savedDay);
  }, []);

  const handlePayDayTypeChange = (type) => {
    setPayDayType(type);
    updateSetting('payDayType', type);
  };

  const handlePayDayChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 31) {
      setPayDay(value);
      updateSetting('payDay', value);
    }
  };

  return (
    <div className="dashboard">
      <div className="card">
        <h3>Appearance</h3>

        <div className="form-row">
          <span>Theme</span>
          <button className="btn-minimal" onClick={() => setDark(!dark)}>
            {dark ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Financial Settings</h3>

        <div className="setting-section">
          <div className="setting-label">Pay Day Type</div>

          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="payDayType"
                value="fixed"
                checked={payDayType === 'fixed'}
                onChange={() => handlePayDayTypeChange('fixed')}
              />
              <span>Fixed Day of Month</span>
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="payDayType"
                value="lastWorkingDay"
                checked={payDayType === 'lastWorkingDay'}
                onChange={() => handlePayDayTypeChange('lastWorkingDay')}
              />
              <span>Last Working Day of Month</span>
            </label>
          </div>
        </div>

        {payDayType === 'fixed' && (
          <div className="form-row" style={{ marginTop: '16px' }}>
            <span>Pay Day (1-31)</span>
            <input
              type="number"
              min="1"
              max="31"
              value={payDay}
              onChange={handlePayDayChange}
              style={{ maxWidth: '80px' }}
            />
          </div>
        )}
      </div>

      <div className="card">
        <CategoryManager />
      </div>
    </div>
  );
};

export default Settings;
