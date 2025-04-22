import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/css/PokemonModal.css";
import Back from "../assets/img/back.svg";
import Next from "../assets/img/next.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import PokemonImg from "../assets/img/pokemonImg.svg";

function PokemonModal() {
  const typeColors = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
  };

  const statKeys = ["hp", "attack", "defense", "speed", "special-attack", "special-defense"];
  const navigate = useNavigate();
  const location = useLocation();
  const { pokemon: initialPokemon } = location.state || {};

  const [pokemon, setPokemon] = useState(initialPokemon);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        navigate(-1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  useEffect(() => {
    if (!pokemon) {
      navigate("/pokemons");
    }
  }, [pokemon, navigate]);

  const fetchPokemonById = async (id) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error("Pokémon not found");
      const data = await res.json();
      setPokemon(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    fetchPokemonById(pokemon.id + 1);
  };

  const handleBack = () => {
    if (pokemon.id > 1) {
      fetchPokemonById(pokemon.id - 1);
    }
  };

  if (!pokemon) return null;

  const primaryType = pokemon.types[0]?.type.name.toLowerCase();
  const themeColor = typeColors[primaryType] || "#ccc";

  return (
    <div className="pokemonModalContainer" data-aos="fade">
      <div key={pokemon.id} className="pokemonModalContainer">
        <div className="modalHeaderContainer" style={{ backgroundColor: themeColor }}>
          <div className="subModalHeaderContainer">
            <img className="backIcon" onClick={() => navigate("/pokemons")} src={Back} alt="Back" />
          </div>
        </div>

        <div className="statsPokemonContainer">
          <div className="statsTextContainer">
            <p>Stats of {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
          </div>

          <div className="subStatsPokemonContainer">
            <div className="aboutPokemonContainer">
              <div className="subAboutPokemonContainer">
                <p className="fade-in-section fade-in-delay-1">ID</p>
                <p className="fade-in-section fade-in-delay-2">Weight</p>
                <p className="fade-in-section fade-in-delay-3">Height</p>
                <p className="fade-in-section fade-in-delay-4">Types</p>
                <p className="fade-in-section fade-in-delay-5">Abilities</p>
              </div>

              <div className="subAboutPokemonContainer1">
                <p className="fade-in-section fade-in-delay-1">
                  #{pokemon.id.toString().padStart(3, "0")}
                </p>
                <p className="fade-in-section fade-in-delay-2">{pokemon.weight}kg</p>
                <p className="fade-in-section fade-in-delay-3">{pokemon.height}cm</p>

                <div className="type4">
                  {pokemon.types.map((typeObj, idx) => {
                    const typeName = typeObj.type.name.toLowerCase();
                    const bgColor = typeColors[typeName] || "#ccc";

                    return (
                      <p
                        key={idx}
                        className="typeContainer3 fade-in-section fade-in-delay-4"
                        style={{
                          backgroundColor: bgColor,
                          boxShadow: `0px 0px 10px ${bgColor}`,
                        }}
                      >
                        {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
                      </p>
                    );
                  })}
                </div>

                <div className="type4">
                  {pokemon.abilities.map((ab, idx) => (
                    <p
                      key={idx}
                      className="typeContainer3 fade-in-section fade-in-delay-5"
                      style={{
                        backgroundColor: themeColor,
                        boxShadow: `0px 0px 10px ${themeColor}`,
                      }}
                    >
                      {ab.ability.name.charAt(0).toUpperCase() + ab.ability.name.slice(1)}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="pokemonImageContainer">
              <img
                className="pokemonImg"
                src={pokemon.sprites.other["official-artwork"].front_default || PokemonImg}
                alt={pokemon.name}
              />
            </div>

            <div className="statsPokemonContainer1">
              <div className="subAboutPokemonContainer">
                <p className="fade-in-section fade-in-delay-1">HP</p>
                <p className="fade-in-section fade-in-delay-2">Attack</p>
                <p className="fade-in-section fade-in-delay-3">Defense</p>
                <p className="fade-in-section fade-in-delay-4">Speed</p>
                <p className="fade-in-section fade-in-delay-5">Sp.Attack</p>
                <p className="fade-in-section fade-in-delay-6">Sp.Defense</p>
              </div>

              <div className="subAboutPokemonContainer1">
                {statKeys.map((stat, index) => {
                  const statObj = pokemon.stats.find((s) => s.stat.name === stat);
                  const statValue = statObj ? statObj.base_stat : 0;

                  return (
                    <div
                      key={stat}
                      className={`basic ${stat} fade-in-section fade-in-delay-${index + 1}`}
                    >
                      <div className="subBasic">
                        <div
                          className="subBasic1"
                          style={{
                            width: `${statValue}%`,
                            backgroundColor: themeColor,
                          }}
                        >
                          {statValue}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="statsTextContainer1">
            <div className="nextContainer">
              <img className="backIcon" src={Back} alt="Previous" onClick={handleBack} />
            </div>

            <div className="subStatsTextContainer1" style={{ backgroundColor: themeColor }}>
              <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
            </div>

            <div className="nextContainer">
              <img className="backIcon" src={Next} alt="Next" onClick={handleNext} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
