import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Navigation from "./components/Navigation";
import { getSetting, updateSetting } from "./services/settingsService";

import "./styles/dashboard.css";

const App = () => {
  const [dark, setDark] = useState(() => getSetting('theme') === 'dark');

  // Apply dark mode to body and persist to localStorage
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    updateSetting('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route
          path="/settings"
          element={<Settings dark={dark} setDark={setDark} />}
        />
      </Routes>
      <Navigation />
    </BrowserRouter>
  );
};

export default App;
