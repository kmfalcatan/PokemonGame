import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/battle.css";
import Back from "../assets/img/back.svg";
import PokemonImg from "../assets/img/pokemonImg.svg";
import Remove from "../assets/img/x.svg";
import InfoIcon from "../assets/img/info.svg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from "sweetalert2"; // SweetAlert2 for confirmation
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Styles for toast notifications

function Battle() {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [savedTeams, setSavedTeams] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // to hold selected Pokémon details
  const pokemonInfoRef = useRef(null);

  const handleStartBattle = async () => {
    if (selectedTeam.length !== 6) {
      toast.warning("You must select exactly 6 Pokémon to start a battle!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      return;
    }
  
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Once you proceed, the selected Pokémon will be saved for the battle!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, start the battle!",
      cancelButtonText: "Cancel",
    });
  
    if (result.isConfirmed) {
      const gameData = {
        gameName: `Game #${Date.now()}`,
        selectedPokemons: selectedTeam,
      };
  
      try {
        const response = await fetch("http://localhost:5000/games", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gameData),
        });
  
        const responseData = await response.json();
        if (response.ok) {
          toast.success("Game setup saved successfully! Battle starting...", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
          });
          navigate("/battleSimulation");
        } else {
          toast.error("Failed to save game. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
          });
        }
      } catch (error) {
        toast.error("Error saving game. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    } else {
      toast.info("Battle cancelled.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };    
    
  const handleScrollToTop = () => {
    console.log(pokemonInfoRef.current); // Check if the ref is correct
    if (pokemonInfoRef.current) {
      pokemonInfoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };


  const handleRemovePokemon = (pokemonId) => {
    setSelectedTeam((prevTeam) => prevTeam.filter((pokemon) => pokemon.id !== pokemonId));
  };

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
  };  

  const handleSelectPokemon = (pokemon) => {
    if (selectedTeam.length >= 6) {
      toast.info("You can only select up to 6 Pokémon!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      return;
    }
  
    if (!selectedTeam.some((selected) => selected.id === pokemon.id)) {
      setSelectedTeam((prevTeam) => {
        const updatedTeam = [...prevTeam, pokemon];
        console.log("Updated selectedTeam:", updatedTeam);
        return updatedTeam;
      });
    }
  
    setSelectedPokemon(pokemon);
    setShowInfo(true);
  };
   

  useEffect(() => {
    // Fetch Pokémon details (adjust to your API endpoint)
    const fetchPokemons = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await res.json();
        const promises = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        const results = await Promise.all(promises);
        setPokemonDetails(results);
      } catch (err) {
        console.error("Error fetching Pokémon details:", err);
      }
    };

    fetchPokemons();
  }, []);

useEffect(() => {
  const fetchDetails = async () => {
    const promises = pokemonList.map(pokemon =>
      fetch(pokemon.url).then(res => res.json())
    );
    try {
      const results = await Promise.all(promises);
      setPokemonDetails(results);
    } catch (err) {
      console.error("Error fetching Pokémon details:", err);
    }
  };

  if (pokemonList.length > 0) {
    fetchDetails();
  }
}, [pokemonList]);


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
  const fetchTeams = async () => {
    try {
      const res = await fetch("http://localhost:5000/teams");
      const data = await res.json();
      setSavedTeams(data);
    } catch (err) {
      console.error("Failed to fetch saved teams", err);
    }
  };

  fetchTeams();
}, []);


  // Automatically show info on desktop (1025px and above)
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1025) {
        setShowInfo(true); // show info by default on desktop
      } else {
        setShowInfo(false); // hide on smaller screens
      }
    };

    checkScreenSize(); // initial check

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
    
      useEffect(() => {
        AOS.init({
          duration: 1000,
          once: false,
        });
      }, []);

  return (
    <>
      <ToastContainer/>
      <div className="battleContainer" data-aos="fade" data-aos-delay="300"  ref={pokemonInfoRef}>
      <div className="battleHeaderContainer">
        <div className="subBattleHeaderContainer">
          <img
            className="backIcon"
            onClick={() => navigate("/dashboard")}
            src={Back}
            alt="Back"
          />
        </div>
      </div>

      <div className="subBattleContainer">
        <div className="battleTextContainer">
          <p>Choose your team</p>
        </div>

        <div className="displayPokeminInfoContainer">
          <div className="teamDisplayContainer">
            <div className="subTeamDisplayContainer">
              <div className="display9">
                {savedTeams.map((teamData, teamIndex) => (
                  <div className="display click" key={teamIndex} onClick={() => handleSelectTeam(teamData.team)}>
                    <div className="teamNumberContainer">
                      <p>Team #{teamIndex + 1}</p>
                    </div>

                    <div className="teams">
                      {teamData.team.map((pokemon, pokeIndex) => {
                        const primaryType = pokemon.types?.[0]?.type?.name;
                        const bgColor = typeColors[primaryType] || "#ccc";

                        return (
                          <div className="subTeams" key={pokeIndex} style={{ backgroundColor: bgColor }}>
                            <img
                              src={
                                pokemon.sprites?.other?.["official-artwork"]?.front_default ||
                                pokemon.sprites?.front_default
                              }
                              alt={pokemon.name}
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
          </div>

          <div className="displayPokemon1">
            <div className="containerOfPokemon">
              <div className="subDisplayPokemon1" style={{ position: "relative" }}>
                {selectedPokemon && selectedPokemon.sprites && (
                  <img
                    className="pokemonImg"
                    src={
                      selectedPokemon.sprites.other["official-artwork"]?.front_default ||
                      selectedPokemon.sprites.front_default
                    }
                    alt={selectedPokemon.name}
                  />
                )}
              </div>

              <div
                className="nameContainer1">
                <div className="subNameContainer1"
                style={{
                  backgroundColor:
                    selectedPokemon && selectedPokemon.types.length > 0
                      ? typeColors[selectedPokemon.types[0].type.name] || "#ddd"
                      : "#F5F7FA", boxShadow: "0px 0px 0px #F5F7FA" // Default color if no types available
                }}
              >
                  {selectedPokemon && <p>{selectedPokemon.name}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="displayPokemon1">
            {selectedPokemon && (
              <div className="pokemonInfoContainer3">
                <div className="aboutPokemonContainer1">
                  <div className="subAboutPokemonContainer">
                    <p className="fade-in-section fade-in-delay-1">ID</p>
                    <p className="fade-in-section fade-in-delay-2">Weight</p>
                    <p className="fade-in-section fade-in-delay-3">Height</p>
                    <p className="fade-in-section fade-in-delay-4">Types</p>
                    <p className="fade-in-section fade-in-delay-5">Abilities</p>
                  </div>

                  <div className="subAboutPokemonContainer1">
                    <p className="fade-in-section fade-in-delay-1">#{selectedPokemon.id}</p>
                    <p className="fade-in-section fade-in-delay-2">{selectedPokemon.weight}kg</p>
                    <p className="fade-in-section fade-in-delay-3">{selectedPokemon.height}cm</p>

                    <div className="type4">
                      {selectedPokemon.types.map((type, idx) => {
                        const bgColor = typeColors[type.type.name] || "#ddd"; // Default color if type not found
                        return (
                          <p
                            key={idx}
                            className="typeContainer3 fade-in-section fade-in-delay-4"
                            style={{
                              backgroundColor: bgColor,
                              boxShadow: `0px 0px 10px ${bgColor}`,
                            }}
                          >
                            {type.type.name}
                          </p>
                        );
                      })}
                    </div>

                    <div className="type4">
                      {selectedPokemon.abilities.map((ability, idx) => {
                        const bgColor = "#ddd"; // Default color for abilities (can customize further if needed)
                        return (
                          <p
                            key={idx}
                            className="typeContainer3 fade-in-section fade-in-delay-4"
                            style={{
                              backgroundColor: bgColor,
                              boxShadow: `0px 0px 10px ${bgColor}`,
                            }}
                          >
                            {ability.ability.name}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="basicStatsContainer1">
                  <div className="subBasicStatsContainer">
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
              </div>
            )}
          </div>
        </div>

        <div className="selectedTeamContainer">
          <div className="subSelectedTeamContainer1">
            {selectedTeam.length === 0 ? (
              <p style={{ color: "#aaa", textAlign: "center" }}>No team selected</p>
            ) : (
              selectedTeam.map((pokemon, index) => {
                const primaryType = pokemon.types?.[0]?.type?.name;
                const bgColor = typeColors[primaryType] || "#ccc";

                return (
                  <div className="selectedTeam6" key={index} style={{ backgroundColor: bgColor }}>
                    <div className="removeContainer">
                    <img
                                src={Remove}
                                alt="Remove"
                                className="removePokemon"
                                onClick={() => handleRemovePokemon(pokemon.id)}
                              />
                    </div>
                    <img
                      className="pokemonImg"
                      src={
                        pokemon.sprites?.other?.["official-artwork"]?.front_default ||
                        pokemon.sprites?.front_default
                      }
                      alt={pokemon.name}
                    />
                  </div>
                );
              })
            )}
          </div>
          
          <div className="gameStartButtonContainer">
            <button className="startButton" onClick={handleStartBattle}>
              Start Battle
            </button>
          </div>

          <p className="select0">Select a Pokemon</p>
        </div>

        <div className="browsContainer">
      {pokemonDetails.map((pokemon, index) => {
        const primaryType = pokemon.types?.[0]?.type?.name;
        const bgColor = typeColors[primaryType] || "#ccc";

        return (
          <div
            className="subPokemons"
            key={index}
            style={{ backgroundColor: bgColor }}
            onClick={() => {
              handleSelectPokemon(pokemon); // Add click handler to select the Pokémon
              handleScrollToTop(); // Scroll to the Pokémon info section
            }}
          >
            <div className="pokeInfoContainer">
              <div className="pokemonName">
                <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
              </div>

              <div className="pokeId">
                <p>#{pokemon.id.toString().padStart(3, "0")}</p>
              </div>

              <div className="typeContainer1">
                {pokemon.types.map((typeObj, idx) => (
                  <div className="subTypeContainer" key={idx}>
                    <p>{typeObj.type.name.charAt(0).toUpperCase() + typeObj.type.name.slice(1)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pokemonImgContainer1">
              <img
                className="pokemonImg"
                src={
                  pokemon.sprites.other["official-artwork"].front_default ||
                  pokemon.sprites.front_default
                }
                alt={pokemon.name}
              />
            </div>
          </div>
        );
      })}
        </div>
      </div>
    </div>
    </>
  );
}

export default Battle;
