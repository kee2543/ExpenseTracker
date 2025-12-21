import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import "./styles/dashboard.css";

const App = () => {
  const [dark, setDark] = useState(false);

  // Apply dark mode to body
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
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
    </BrowserRouter>
  );
};

export default App;
