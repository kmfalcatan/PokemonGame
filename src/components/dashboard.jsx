import "../assets/css/dashboard.css";
import PokemonImg from "../assets/img/pokemonImg.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Dashboard() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pokemonData, setPokemonData] = useState(null);
  const [prevPokemonData, setPrevPokemonData] = useState(null);

  // AOS init
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  // Fetch Pokémon list
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await res.json();
        setPokemonList(data.results.map(p => p.name));
      } catch (err) {
        console.error("Error fetching Pokémon list:", err);
      }
    };
    fetchPokemonList();
  }, []);

  // Fetch individual Pokémon data
  useEffect(() => {
    if (pokemonList.length === 0) return;

    const fetchPokemonData = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonList[currentIndex]}`);
        const data = await res.json();
        setPrevPokemonData(pokemonData); // Store current as previous before updating
        setPokemonData(data);
      } catch (err) {
        console.error("Error fetching Pokémon:", err);
      }
    };
    fetchPokemonData();
  }, [currentIndex, pokemonList]);

  // Auto-cycle Pokémon
  useEffect(() => {
    if (pokemonList.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % pokemonList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [pokemonList]);

  const displayData = pokemonData || prevPokemonData;

  if (!displayData) return <p>Loading...</p>;

  const { name, id, types, sprites } = displayData;
  const primaryType = types?.[0]?.type.name || "normal";

  // Mapping of Pokémon types to background colors
  const typeColors = {
    normal: "#A8A77A",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#F0B6BC",
  };

  const backgroundColor = typeColors[primaryType] || "#F5F5F5";

  return (
    <div className="dashboardContainer">
      <div className="subDashboardContainer" data-aos="fide" data-aos-delay="300">
        <div className="favContainer">
          <div className="subFavContainer">
            <div
              className="fav"
              style={{ backgroundColor }}
            >
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
                    {types.map((typeObj, idx) => (
                      <div key={idx} className="subTypeContainer">
                        <p>{typeObj.type.name.charAt(0).toUpperCase() + typeObj.type.name.slice(1)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pokemonImgContainer">
                    <img
                      className="pokemonImg"
                      src={sprites?.other?.["official-artwork"]?.front_default || PokemonImg}
                      alt={name}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="titleContainer">
              <p>Pokémons</p>
            </div>
          </div>

          {/* Team display stays unchanged */}
          <div className="displayTeamContainer">
            <div className="subDisplayTeamContainer">
              <div className="display">
                <div className="teamNumberContainer">
                  <p>Team #1</p>
                </div>
                <div className="teams">
                  {Array(6).fill(0).map((_, idx) => (
                    <div className="subTeams" key={idx}></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="titleContainer">
              <p>Team</p>
            </div>
          </div>
        </div>

        {/* History stays unchanged */}
        <div className="historyDisplayContainer">
          <div className="subHistoryDisplayContainer">
            <div className="history">
              <div className="historyDisplayText">
                <p>Team</p>
              </div>
              <div className="historyDisplayText">
                <p>Status</p>
              </div>
            </div>

            <div className="historyDisplay">
              <div className="historyDisplay1">
                <div className="subHistoryDisplay">
                  <div className="subTeams1"></div>
                </div>
                <div className="battleHistory">
                  <p>Loss</p>
                </div>
              </div>
            </div>
          </div>
          <div className="titleContainer">
            <p>History</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
