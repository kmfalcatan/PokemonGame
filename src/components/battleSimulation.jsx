import "../assets/css/battleSimulation.css";
import PokemonImg from "../assets/img/pokemonImg.svg";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import { useEffect, useState } from "react";

function BattleSimulation() {
  const [games, setGames] = useState([]);
  const [opponentPokemon, setOpponentPokemon] = useState([]);
  const [playerPokemon, setPlayerPokemon] = useState([]);

  useEffect(() => {
    // Fetch games data from JSON server
    axios.get("http://localhost:5000/games").then((res) => {
      setGames(res.data);
    });
    AOS.init(); // AOS animation init
  }, []);

  // Set player Pokémon based on the latest game
  useEffect(() => {
    if (games.length > 0) {
      const latestGame = games[games.length - 1];
      const selected = latestGame.selectedPokemons || [];
      setPlayerPokemon(selected);
    }
  }, [games]);

  // Generate random opponent Pokémon excluding player's Pokémon
  useEffect(() => {
    const generateOpponentTeam = async () => {
      if (playerPokemon.length === 0) return;

      const playerNames = playerPokemon.map(p => p.name);
      const generatedOpponent = [];
      const usedNames = new Set(playerNames);

      while (generatedOpponent.length < 6) {
        const randomId = Math.floor(Math.random() * 898) + 1;
        try {
          const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
          if (!usedNames.has(data.name)) {
            generatedOpponent.push(data);
            usedNames.add(data.name);
          }
        } catch (error) {
          console.error("Failed to fetch opponent Pokémon:", error);
        }
      }

      setOpponentPokemon(generatedOpponent);
    };

    generateOpponentTeam();
  }, [playerPokemon]);

  // Type colors for background
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

  // Function to get background color based on Pokémon's type
  const getTypeBackgroundColor = (types) => {
    const primaryType = types[0]?.type?.name;
    return typeColors[primaryType] || "#FFFFFF"; // Default white if type is unknown
  };
  
  return (
    <div className="battleSimulationContainer" data-aos="fade" data-aos-delay="300">
      <div className="pokemonHeaderContainer">
        <div className="subPokemonHeaderContainer">
          <div className="pokemonHeader">
            {games.length > 0 && games[games.length - 1].selectedPokemons.map((pokemon, index) => {
              const primaryType = pokemon.types?.[0]?.type?.name;
              const bgColor = typeColors[primaryType] || "#ccc"; // fallback to gray if type not found

              return (
                <div
                  className="subPokemonHeader"
                  key={`${games[games.length - 1].id}-${index}`}
                  style={{ backgroundColor: bgColor }}
                >
                  <img
                    src={pokemon.sprites?.other?.["official-artwork"]?.front_default || PokemonImg}
                    alt={pokemon.forms?.[0]?.name || "pokemon"}
                    className="pokemonImg6"
                  />
                </div>
              );
            })}
          </div>

          <div className="roundContainer">
            <p>Round</p>
            <p className="roundNumber">2</p>
          </div>
          
          <div className="pokemonHeader1">
      {Array.isArray(opponentPokemon) && opponentPokemon.map((pokemon, index) => (
        <div
          key={index}
          className="subPokemonHeader"
          style={{
            backgroundColor: getTypeBackgroundColor(pokemon.types),
          }}
        >
          <img
            src={pokemon.sprites?.other?.["official-artwork"]?.front_default || PokemonImg}
            alt={pokemon.name || "pokemon"}
            className="pokemonImg9"
          />
        </div>
      ))}
    </div>

        </div>


        <div className="scoreContainer">
          <div className="subScoreContainer">
            <div className="score">

            </div>
            
            <div className="score">

            </div>
            
            <div className="score">

            </div>
            
            <div className="score">

            </div>
            
            <div className="score">

            </div>
            
            <div className="score">

            </div>
          </div>
          
          <div className="subScoreContainer1">

          </div>
          
          <div className="subScoreContainer2">
            <div className="score">

            </div>
            
            <div className="score">

            </div>
            
            <div className="score">

            </div>
            
            <div className="score">

            </div>
            
            <div className="score">

            </div>
            
            <div className="score">

            </div>
          </div>
        </div>
      </div>

      <div className="battleSimulation">
  <div className="subBattleSimulation">
    {/* Player's Pokémon Info (use the first one or current turn logic) */}
    {Array.isArray(playerPokemon) && playerPokemon[0] && (
      <>
        <div className="displayPokemonContainer4">
          <div className="subDisplayPokemonContainer4">
            <div className="displayPokemon4">
              <img
                className="pokemonImg"
                src={playerPokemon[0].sprites?.other?.["official-artwork"]?.front_default || PokemonImg}
                alt={playerPokemon[0].name}
              />
            </div>
            <div className="pokemonNameContainer4">
              <p className="pokemonName4"
              style={{
                backgroundColor: getTypeBackgroundColor(playerPokemon[0].types), // for player
              }}
              >{playerPokemon[0].name}</p>
            </div>
          </div>
        </div>

        <div className="pokemonInfoContainer6">
          <div className="subPokemonInfoContainer4">
            <p>HP</p>
            <p>Attack</p>
            <p>Defense</p>
            <p>Speed</p>
            <p>Sp.Attack</p>
            <p>Sp.Defense</p>
            <p>ID</p>
            <p>Height</p>
            <p>Weight</p>
            <p>Type</p>
            <p>Abilities</p>
          </div>

          <div className="subPokemonInfoContainer5">
            <p>{playerPokemon[0].stats?.[0]?.base_stat}</p>
            <p>{playerPokemon[0].stats?.[1]?.base_stat}</p>
            <p>{playerPokemon[0].stats?.[2]?.base_stat}</p>
            <p>{playerPokemon[0].stats?.[5]?.base_stat}</p>
            <p>{playerPokemon[0].stats?.[3]?.base_stat}</p>
            <p>{playerPokemon[0].stats?.[4]?.base_stat}</p>
            <p>{playerPokemon[0].id}</p>
            <p>{(playerPokemon[0].height * 10).toFixed(2)} cm</p>
            <p>{(playerPokemon[0].weight / 10).toFixed(2)} kg</p>
            <p>{playerPokemon[0].types?.map((type) => type.type.name).join(", ")}</p>
            <p>{playerPokemon[0].abilities?.map((ability) => ability.ability.name).join(", ")}</p>
          </div>
        </div>
      </>
    )}
  </div>

  <div className="subBattleSimulation1">
    <p className="status">Fight</p>
    <div className="buttonContainer3">
      <button className="start">Start</button>
      <button className="start" onClick={() => navigate("/dashboard")}>Cancel</button>
    </div>
  </div>

  <div className="subBattleSimulation">
    {/* Opponent's Pokémon Info */}
    {Array.isArray(opponentPokemon) && opponentPokemon[0] && (
      <>
        <div className="displayPokemonContainer4">
          <div className="subDisplayPokemonContainer4">
            <div className="displayPokemon4">
              <img
                className="pokemonImg"
                src={opponentPokemon[0].sprites?.other?.["official-artwork"]?.front_default || PokemonImg}
                alt={opponentPokemon[0].name}
              />
            </div>
            <div className="pokemonNameContainer4">
              <p className="pokemonName4"
              style={{
                backgroundColor: getTypeBackgroundColor(playerPokemon[0].types), // for player
              }}
              >{opponentPokemon[0].name}</p>
            </div>
          </div>
        </div>

        <div className="pokemonInfoContainer4">
          <div className="subPokemonInfoContainer6">
            <p>{opponentPokemon[0].stats?.[0]?.base_stat}</p>
            <p>{opponentPokemon[0].stats?.[1]?.base_stat}</p>
            <p>{opponentPokemon[0].stats?.[2]?.base_stat}</p>
            <p>{opponentPokemon[0].stats?.[5]?.base_stat}</p>
            <p>{opponentPokemon[0].stats?.[3]?.base_stat}</p>
            <p>{opponentPokemon[0].stats?.[4]?.base_stat}</p>
            <p>{opponentPokemon[0].id}</p>
            <p>{(opponentPokemon[0].height * 10).toFixed(2)} cm</p>
            <p>{(opponentPokemon[0].weight / 10).toFixed(2)} kg</p>
            <p>{opponentPokemon[0].types?.map((type) => type.type.name).join(", ")}</p>
            <p>{opponentPokemon[0].abilities?.map((ability) => ability.ability.name).join(", ")}</p>
          </div>

          <div className="subPokemonInfoContainer7">
            <p>HP</p>
            <p>Attack</p>
            <p>Defense</p>
            <p>Speed</p>
            <p>Sp.Attack</p>
            <p>Sp.Defense</p>
            <p>ID</p>
            <p>Height</p>
            <p>Weight</p>
            <p>Type</p>
            <p>Abilities</p>
          </div>
        </div>
      </>
    )}
  </div>
</div>


      <div className="resultContainer">
        <div className="subResultContainer">
          <div className="resultText">
            <p>You Won!!</p>
          </div>

          <div className="resultPointsContainer">
            <div className="subResultPointsContainer">
              <div className="result">
                <p>Exp:</p>
                <p>+20</p>
              </div>
            </div>

            <div className="subResultPointsContainer">
              <div className="result">
                <p>Points:</p>
                <p>0</p>
              </div>
            </div>
          </div>

          <div className="addPointsContainer">
            <div className="subAddPointsContainer">
              <div className="addLvlContainer">
                <div className="subAddLvlContainer">

                </div>
              </div>
            </div>

            <div className="pointsTextContainer">
              <p>Lvl: 3</p>
              <p>50/100</p>
            </div>
          </div>

          <div className="buttonContainer5">
            <div className="subButtonContainer5">
              <button className="button5">Play Again</button>
              <button className="button5">Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BattleSimulation;