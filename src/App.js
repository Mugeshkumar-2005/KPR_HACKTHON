import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardScreen from "./pages/DashboardScreen";
import Profile from "./pages/Profile";
import Doctors from "./pages/Doctors";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardScreen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
    </Router>
  );
}

export default App;
