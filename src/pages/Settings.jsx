import React from "react";
import CategoryManager from "../components/CategoryManager";

const Settings = ({ dark, setDark }) => {
  return (
    <div className="dashboard">
      <div className="card">
        <h3>Appearance</h3>

        <div className="form-row">
          <span>Theme</span>
          <button onClick={() => setDark(!dark)}>
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>

      <div className="card">
        <CategoryManager />
      </div>
    </div>
  );
};

export default Settings;
