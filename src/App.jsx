import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import LandingPage from "./components/landingPage";
import Dashboard from "./components/dashboard";
import Sidebar from "./components/sideBa";
import History from "./components/history";
import Team from "./components/team";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Layout content={<Dashboard />} />} />
        <Route path="/battle" element={<Layout content={<div>History Page</div>} />} />
        <Route path="/pokemons" element={<Layout content={<div>Pokemons Page</div>} />} />
        <Route path="/team" element={<Layout content={<Team/>} />} />
        <Route path="/history" element={<Layout content={<History/>} />} />

        {/* Redirect unknown URLs to landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

// This Layout wraps Sidebar + the main content
const Layout = ({ content }) => (
  <div className="sidebarContainer">
    <Sidebar />
    {content}
  </div>
);

export default App;
