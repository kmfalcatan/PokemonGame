import "../assets/css/dashboard.css";
import PokemonImg from "../assets/img/pokemonImg.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function Dashboard() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pokemonData, setPokemonData] = useState(null);
  const [prevPokemonData, setPrevPokemonData] = useState(null);
  const [savedTeams, setSavedTeams] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=500");
        const data = await res.json();
        setPokemonList(data.results.map(p => p.name));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/teams");
        setSavedTeams(await res.json());
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/matches")
      .then(res => {
        console.log("Raw match results:", res.data.map(m => m.result));
        setMatches(res.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!pokemonList.length) return;
    const iv = setInterval(() => {
      setCurrentIndex(i => (i + 1) % pokemonList.length);
    }, 4000);
    return () => clearInterval(iv);
  }, [pokemonList]);

  useEffect(() => {
    if (!pokemonList.length) return;
    (async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonList[currentIndex]}`
        );
        setPrevPokemonData(pokemonData);
        setPokemonData(await res.json());
      } catch (err) {
        console.error(err);
      }
    })();
  }, [currentIndex, pokemonList]);

  const displayData = pokemonData || prevPokemonData;
  if (!displayData) return <p>Loading...</p>;

  const { name, id, types, sprites } = displayData;
  const primaryType = types[0].type.name;
  const typeColors = {
    normal: "#A8A77A", fire: "#F08030", water: "#6890F0",
    electric: "#F8D030", grass: "#78C850", ice: "#98D8D8",
    fighting: "#C03028", poison: "#A040A0", ground: "#E0C068",
    flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
    rock: "#B8A038", ghost: "#705898", dragon: "#7038F8",
    dark: "#705848", steel: "#B8B8D0", fairy: "#F0B6BC",
  };
  const backgroundColor = typeColors[primaryType] || "#F5F5F5";

  const resultCounts = matches.reduce(
    (acc, m) => {
      const r = m.result;
      if (r === "win" || r === "loss" || r === "tie") {
        acc[r] = (acc[r] || 0) + 1;
      } else {
        acc.other = (acc.other || 0) + 1;
      }
      return acc;
    },
    { win: 0, loss: 0, tie: 0, other: 0 }
  );

  const pieData = [
    { name: "Wins",   value: resultCounts.win },
    { name: "Losses", value: resultCounts.loss },
    { name: "Ties",   value: resultCounts.tie },
    ...(resultCounts.other > 0
      ? [{ name: "Other", value: resultCounts.other }]
      : []),
  ];

  const COLORS = ["#76c7c0", "#f08030", "#999", "#ccc"];

  return (
    <div className="dashboardContainer">
      <div className="subDashboardContainer" data-aos="fade" data-aos-delay="300">
        {/* Featured Pokémon */}
        <div className="favContainer">
          <div className="subFavContainer">
            <div className="fav" style={{ backgroundColor }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={name}
                  className="favInner"
                  initial={{ x: "10%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-10%", opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="pokemonNameContainer">
                    <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
                  </div>
                  <div className="pokeId">
                    <p>#{id.toString().padStart(3, "0")}</p>
                  </div>
                  <div className="typeContainer">
                    {types.map((t, i) => (
                      <div key={i} className="subTypeContainer">
                        <p>
                          {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="pokemonImgContainer">
                    <img
                      className="pokemonImg"
                      src={
                        sprites.other["official-artwork"].front_default || PokemonImg
                      }
                      alt={name}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="titleContainer"><p>Pokémons</p></div>
          </div>

          {/* Pie Graph */}
          <div className="displayTeamContainer">
            <div className="subHistoryDisplayContainer">
              {matches.length ? (
                <PieChart width={120} height={120}>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {pieData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, name) => [`${v}`, name]} />
                </PieChart>
              ) : (
                <p>Loading graph…</p>
              )}
            </div>
            <div className="titleContainer"><p>Chart</p></div>
          </div>
        </div>

        {/* Teams */}
        <div className="historyDisplayContainer">
          <div className="subDisplayTeamContainer">
            <div className="display">
              {savedTeams.map((team, ti) => (
                <div className="display" key={ti}>
                  <div className="teamNumberContainer">
                    <p>Team #{ti + 1}</p>
                  </div>
                  <div className="teams">
                    {team.team.map((p, pi) => {
                      const bg = typeColors[p.types[0].type.name] || "#ccc";
                      return (
                        <div
                          className="subTeams"
                          key={pi}
                          style={{ backgroundColor: bg }}
                        >
                          <img
                            src={
                              p.sprites.other["official-artwork"].front_default ||
                              p.sprites.front_default
                            }
                            alt={p.name}
                            className="pokemonImg"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="titleContainer"><p>Teams</p></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
