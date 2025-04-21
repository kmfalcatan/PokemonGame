import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import LandingPage from "./components/landingPage";
import Dashboard from "./components/dashboard";
import Sidebar from "./components/sideBa";
import History from "./components/history";
import Team from "./components/team";
import Pokemon from "./components/pokemon";
import PokemonModal from "./components/pokemonModal";
import Battle from "./components/battle";
import BattleSimulation from "./components/battleSimulation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Layout content={<Dashboard />} />} />
        <Route path="/pokemons" element={<Layout content={<Pokemon />} />} />
        <Route path="/team" element={<Layout content={<Team />} />} />
        <Route path="/history" element={<Layout content={<History />} />} />

        <Route path="/battle" element={<Battle/>} />

        <Route path="/battleSimulation" element={<BattleSimulation />} />

        {/* No Sidebar for PokemonModal */}
        <Route path="/pokemonModal" element={<PokemonModal />} />

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
