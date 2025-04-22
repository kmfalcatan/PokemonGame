import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/pokemon.css";
import "../assets/css/dashboard.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Remove from "../assets/img/x.svg";
import PokemonImg from "../assets/img/pokemonImg.svg";
import Back from "../assets/img/back.svg";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Pokemon() {
  const [showTeam, setShowTeam] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showUpgradeIcons, setShowUpgradeIcons] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data = await res.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (poke) => {
            const res = await fetch(poke.url);
            return await res.json();
          })
        );

        setPokemons(pokemonDetails);
      } catch (err) {
        console.error("Failed to fetch Pokémon", err);
      }
    };

    fetchAllPokemon();
  }, []);

  const handleAddTeamClick = async () => {
    if (!showTeam) {
      setShowTeam(true);
    } else {
      if (selectedTeam.length === 6) {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "Do you want to save this team?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes, save it!",
          cancelButtonText: "Cancel",
        });
  
        if (result.isConfirmed) {
          try {
            const teamData = {
              team: selectedTeam, // Full Pokémon info included
            };
  
            const response = await fetch("http://localhost:5000/teams", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(teamData),
            });
  
            if (response.ok) {
              toast.success("Team saved successfully!", {
                position: "top-right",
                autoClose: 3000,
              });
              setSelectedTeam([]);
              setShowTeam(false);
            } else {
              toast.error("Failed to save team.", {
                position: "top-right",
                autoClose: 3000,
              });
            }
          } catch (error) {
            console.error("Save error:", error);
            toast.error("An error occurred while saving the team.", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        }
      } else {
        toast.warn("You must select exactly 6 Pokémon to save a team.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };  

  const handleCancelTeam = () => {
    setSelectedTeam([]);
    setShowTeam(false);
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    if (window.innerWidth <= 1024) {
      setShowModal(true);
    } else {
      navigate("/pokemonModal", { state: { pokemon } });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (showModal && window.innerWidth > 1024) {
        setShowModal(false);
        navigate("/pokemonModal");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showModal, navigate]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddPokemonToTeam = (pokemon) => {
    if (selectedTeam.length >= 6) {
      toast.warn("You can only select up to 6 Pokémon!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
  
    if (!selectedTeam.some((poke) => poke.id === pokemon.id)) {
      setSelectedTeam((prevTeam) => [...prevTeam, pokemon]);
    }
  };

  const handleRemovePokemonFromTeam = (pokemonId) => {
    setSelectedTeam((prevTeam) => prevTeam.filter((poke) => poke.id !== pokemonId));
  };

  return (
    <>
    <ToastContainer />
      <div className="pokemonContainer" data-aos="fade">
      <div className="subPokemonContainer">
        <div className="searchContainer">
          <input
            className="search"
            type="text"
            placeholder="Search a pokemon..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="saveButton9">
            <button className="addButton" onClick={handleAddTeamClick}>
              {showTeam ? "Save Team" : "Add Team"}
            </button>

            {showTeam && (
              <button className="addButton" onClick={handleCancelTeam}>
                Cancel
              </button>
            )}
          </div>
        </div>

        {showTeam && selectedTeam.length > 0 && (
          <div className="selectedTeamContainer6" data-aos="fade">
            <div className="subSelectedTeamContainer6">
              {selectedTeam.map((pokemon, index) => {
                const primaryType = pokemon.types[0]?.type.name;
                const bgColor = typeColors[primaryType] || "#ccc";

                return (
                  <div
                    key={index}
                    className="selectedTeam6"
                    style={{ backgroundColor: bgColor }}
                  >
                    <div
                      className="removeContainer"
                      onClick={() => handleRemovePokemonFromTeam(pokemon.id)}
                    >
                      <img src={Remove} alt="Remove" />
                    </div>
                    <div className="pokemonImageContainer">
                      <img
                        src={pokemon.sprites.other?.["official-artwork"]?.front_default || Pokemon}
                        alt={pokemon.name}
                        className="pokemonImg6"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {showTeam && selectedTeam.length === 0 && (
          <p className="select8">Select a team</p>
        )}

        <div className="pokemons">
          {pokemons
            .filter((poke) => poke.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((poke, index) => {
              const primaryType = poke.types[0]?.type.name;
              const bgColor = typeColors[primaryType] || "#ccc";

              return (
                <div
                    className="subPokemons"
                    key={index}
                    onClick={() => {
                      if (showTeam) {
                        handleAddPokemonToTeam(poke);
                      } else {
                        handlePokemonClick(poke);
                      }
                    }}
                    style={{ backgroundColor: bgColor }}
                  >
                  <div className="pokeInfoContainer">
                    <div className="pokemonName">
                      <p>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</p>
                    </div>
                    <div className="pokeId">
                      <p>#{poke.id.toString().padStart(3, "0")}</p>
                    </div>
                    {poke.types.map((typeObj, idx) => (
                      <div className="typeContainer1" key={idx}>
                        <div className="subTypeContainer">
                          <p>
                            {typeObj.type.name.charAt(0).toUpperCase() +
                              typeObj.type.name.slice(1)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pokemonImgContainer1">
                    <img
                      className="pokemonImg"
                      src={poke.sprites.other["official-artwork"].front_default || Pokemon}
                      alt={poke.name}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {showModal && selectedPokemon && (
        <div className="pokemonInfoModalContainer">
          <div
            className="subPokemonInfoModalContainer"
            style={{
              backgroundColor:
                typeColors[selectedPokemon.types[0]?.type.name] || "#ccc",
            }}
          >

            <div className="backContainer">
              <div className="backIconContainer" onClick={() => setShowModal(false)}>
                <img className="backIcon" src={Back} alt="Back" />
              </div>
              <div className="pokemonIdContainer">
                <p>#{selectedPokemon.id.toString().padStart(3, "0")}</p>
              </div>
            </div>

            <div className="pokemonNameContainer1">
              <p>
                {selectedPokemon.name.charAt(0).toUpperCase() +
                  selectedPokemon.name.slice(1)}
              </p>
            </div>

            <div className="pokemonTypeContainer">
              {selectedPokemon.types.map((typeObj, idx) => (
                <div className="subPokemonTypeContainer" key={idx}>
                  <p>
                    {typeObj.type.name.charAt(0).toUpperCase() +
                      typeObj.type.name.slice(1)}
                  </p>
                </div>
              ))}
            </div>

            <div className="pokemonInfo">
              <div className="subPokemonInfo">
                <img
                  className="pokemonImg"
                  src={selectedPokemon.sprites.front_default || PokemonImg}
                  alt={selectedPokemon.name}
                />
              </div>

              <div className="infoButtonContainer">
                <div className="subInfoButtonContainer">
                  <p
                    className={`infoButton ${activeTab === "about" ? "active" : ""}`}
                    onClick={() => setActiveTab("about")}
                  >
                    About
                  </p>
                  <p
                    className={`infoButton ${activeTab === "stats" ? "active" : ""}`}
                    onClick={() => setActiveTab("stats")}
                  >
                    Basic Stats
                  </p>

                  <div
                    className="tab-indicator"
                    style={{
                      transform:
                        activeTab === "about" ? "translateX(0%)" : "translateX(100%)",
                    }}
                  ></div>
                </div>
              </div>

              {activeTab === "about" && (
                <div className="aboutContainer">
                  <div className="subAboutContainer">
                    <div className="about">
                    <p className="fade-in-section fade-in-delay-1">Weight</p>
                    <p className="fade-in-section fade-in-delay-2">Height</p>
                    <p className="fade-in-section fade-in-delay-3">Types</p>
                    <p className="fade-in-section fade-in-delay-4">Abilities</p>
                    </div>
                    <div className="about1 fade-in-section fade-in-delay-1">
                      <p className="fade-in-section fade-in-delay-1">{selectedPokemon.weight / 10} kg</p>
                      <p className="fade-in-section fade-in-delay-2">{selectedPokemon.height / 10} m</p>
                      {selectedPokemon.types.map((typeObj, idx) => (
                        <p className="fade-in-section fade-in-delay-3" key={idx}>
                          {typeObj.type.name.charAt(0).toUpperCase() +
                            typeObj.type.name.slice(1)}
                        </p>
                      ))}
                      {selectedPokemon.abilities.map((abilityObj, idx) => (
                        <p className="fade-in-section fade-in-delay-4" key={idx}>
                          {abilityObj.ability.name.charAt(0).toUpperCase() +
                            abilityObj.ability.name.slice(1)}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "stats" && (
                <div className="basicStatsContainer">
                  <div className="subBasicStatsContainer">
                    <div className="basicStats">
                      <p className="fade-in-section fade-in-delay-1">HP</p>
                      <p className="fade-in-section fade-in-delay-2">Attack</p>
                      <p className="fade-in-section fade-in-delay-3">Defense</p>
                      <p className="fade-in-section fade-in-delay-4">Speed</p>
                      <p className="fade-in-section fade-in-delay-5">Sp.Attack</p>
                      <p className="fade-in-section fade-in-delay-6">Sp.Defense</p>
                    </div>

                    <div className="basicStats1 fade-in-section fade-in-delay-1">
                      {selectedPokemon.stats.map((stat, idx) => (
                        <div className="basic" key={idx}>
                          <div className="subBasic">
                            <div
                              className="subBasic1"
                              style={{
                                width: `${Math.min(stat.base_stat, 100)}%`,
                                backgroundColor: typeColors[selectedPokemon.types[0]?.type.name] || "#ccc"
                              }}
                            >
                              <p className="statNumber">{stat.base_stat}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  );
}

export default Pokemon;
