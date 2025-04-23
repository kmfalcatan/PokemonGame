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
  const [round, setRound] = useState(0);
  const [statusText, setStatusText] = useState("Fight");
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();
  const [isBattleStarted, setIsBattleStarted] = useState(false);


  useEffect(() => {
    axios.get("http://localhost:5000/games").then((res) => {
      setGames(res.data);
    });
    AOS.init();
  }, []);

  useEffect(() => {
    if (games.length > 0) {
      const latestGame = games[games.length - 1];
      const selected = latestGame.selectedPokemons || [];
      setPlayerPokemon(selected);
    }
  }, [games]);

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

  const typeColors = {
    normal: "#A8A77A", fire: "#F08030", water: "#6890F0", electric: "#F8D030",
    grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0",
    ground: "#E0C068", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
    rock: "#B8A038", ghost: "#705898", dragon: "#7038F8", dark: "#705848",
    steel: "#B8B8D0", fairy: "#F0B6BC",
  };

  const getTypeBackgroundColor = (types) => {
    const primaryType = types[0]?.type?.name;
    return typeColors[primaryType] || "#FFFFFF";
  };

  const getScoreColor = (result) => {
    if (result === "win") return "#4CAF50";
    if (result === "lose") return "#F44336";
    return "#FFC107";
  };

  const startBattle = async () => {
    if (round >= 6 || playerPokemon.length < 6 || opponentPokemon.length < 6) return;
  
    setIsBattleStarted(true); // Set battle as started
  
    // Start the countdown
    const countdown = ["3", "2", "1"];
    for (let i = 0; i < countdown.length; i++) {
      setStatusText(countdown[i]);
      await new Promise(res => setTimeout(res, 500)); // 500ms delay between countdown
    }
  
    // Battle begins after countdown
    setStatusText("Fighting...");
    await new Promise(res => setTimeout(res, 1000)); // 1 second before battle starts
  
    // Function to process each round automatically
    const autoFight = async (currentRound) => {
      if (currentRound >= 6) {
        setStatusText("Battle Over");
        return; // Stop after 6 rounds
      }
  
      const player = playerPokemon[currentRound];
      const opponent = opponentPokemon[currentRound];
  
      const playerStats = {
        hp: player.stats[0].base_stat,
        attack: player.stats[1].base_stat,
        speed: player.stats[5].base_stat,
      };
      const opponentStats = {
        hp: opponent.stats[0].base_stat,
        attack: opponent.stats[1].base_stat,
        speed: opponent.stats[5].base_stat,
      };
  
      let playerPoints = 0, opponentPoints = 0;
      ["hp", "attack", "speed"].forEach(stat => {
        if (playerStats[stat] > opponentStats[stat]) playerPoints++;
        else if (playerStats[stat] < opponentStats[stat]) opponentPoints++;
      });
  
      const result = playerPoints > opponentPoints ? "win" : playerPoints < opponentPoints ? "lose" : "tie";
  
      setScores(prev => [...prev, result]);
      setRound(prev => prev + 1);
      setStatusText(result === "win" ? `${player.name} Wins!` : result === "lose" ? `${opponent.name} Wins!` : "It's a Tie!");
  
      // Delay for next round (you can adjust this time)
      await new Promise(res => setTimeout(res, 2000)); // 2 seconds delay before next round
      autoFight(currentRound + 1); // Automatically proceed to next round
    };
  
    // Start automatic rounds after countdown
    autoFight(round);
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
                    className="pokemonImg9"
                  />
                </div>
              );
            })}
          </div>

          <div className="roundContainer">
            <p>Round</p>
            <p className="roundNumber">{round + 1}</p> {/* Display current round (round + 1) */}
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
          {scores.map((result, idx) => (
            <div key={idx} className="score" style={{ backgroundColor: getScoreColor(result) }} />
          ))}
        </div>
        <div className="subScoreContainer1" />
        <div className="subScoreContainer2">
          {scores.map((result, idx) => {
            const opponentResult = result === "win" ? "lose" : result === "lose" ? "win" : "tie";
            return (
              <div key={idx} className="score" style={{ backgroundColor: getScoreColor(opponentResult) }} />
            );
          })}
        </div>
      </div>
      </div>

      <div className="battleSimulation">
        <div className="subBattleSimulation">
          {playerPokemon[round] && (
            <>
              <div className="displayPokemonContainer4">
                <div className="subDisplayPokemonContainer4">
                  <div className="displayPokemon4">
                    <img
                      className="pokemonImg"
                      src={playerPokemon[round].sprites?.other?.["official-artwork"]?.front_default || PokemonImg}
                      alt={playerPokemon[round].name}
                    />
                  </div>
                  <div className="pokemonNameContainer4">
                    <p className="pokemonName4"
                      style={{ backgroundColor: getTypeBackgroundColor(playerPokemon[round].types) }}
                    >
                      {playerPokemon[round].name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pokemonInfoContainer6">
                <div className="subPokemonInfoContainer4">
                  <p>HP</p><p>Attack</p><p>Defense</p><p>Speed</p>
                  <p>Sp.Attack</p><p>Sp.Defense</p><p>ID</p><p>Height</p><p>Weight</p>
                  <p>Type</p><p>Abilities</p>
                </div>
                <div className="subPokemonInfoContainer5">
                  <p>{playerPokemon[round].stats?.[0]?.base_stat}</p>
                  <p>{playerPokemon[round].stats?.[1]?.base_stat}</p>
                  <p>{playerPokemon[round].stats?.[2]?.base_stat}</p>
                  <p>{playerPokemon[round].stats?.[5]?.base_stat}</p>
                  <p>{playerPokemon[round].stats?.[3]?.base_stat}</p>
                  <p>{playerPokemon[round].stats?.[4]?.base_stat}</p>
                  <p>{playerPokemon[round].id}</p>
                  <p>{(playerPokemon[round].height * 10).toFixed(2)} cm</p>
                  <p>{(playerPokemon[round].weight / 10).toFixed(2)} kg</p>
                  <p>{playerPokemon[round].types?.map(t => t.type.name).join(", ")}</p>
                  <p>{playerPokemon[round].abilities?.map(a => a.ability.name).join(", ")}</p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="subBattleSimulation1">
    <p className="status">{statusText}</p>
    <div className="buttonContainer3">
    <button className="start" onClick={startBattle}>Start</button>
      {!isBattleStarted && (  // Show buttons only if battle hasn't started
        <>
          <button className="start" onClick={() => navigate("/battle")}>Cancel</button>
        </>
      )}
    </div>
  </div>

        <div className="subBattleSimulation">
          {opponentPokemon[round] && (
            <>
              <div className="displayPokemonContainer4">
                <div className="subDisplayPokemonContainer4">
                  <div className="displayPokemon4">
                    <img
                      className="pokemonImg"
                      src={opponentPokemon[round].sprites?.other?.["official-artwork"]?.front_default || PokemonImg}
                      alt={opponentPokemon[round].name}
                    />
                  </div>
                  <div className="pokemonNameContainer4">
                    <p className="pokemonName4"
                      style={{ backgroundColor: getTypeBackgroundColor(opponentPokemon[round].types) }}
                    >
                      {opponentPokemon[round].name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pokemonInfoContainer4">
                <div className="subPokemonInfoContainer6">
                  <p>{opponentPokemon[round].stats?.[0]?.base_stat}</p>
                  <p>{opponentPokemon[round].stats?.[1]?.base_stat}</p>
                  <p>{opponentPokemon[round].stats?.[2]?.base_stat}</p>
                  <p>{opponentPokemon[round].stats?.[5]?.base_stat}</p>
                  <p>{opponentPokemon[round].stats?.[3]?.base_stat}</p>
                  <p>{opponentPokemon[round].stats?.[4]?.base_stat}</p>
                  <p>{opponentPokemon[round].id}</p>
                  <p>{(opponentPokemon[round].height * 10).toFixed(2)} cm</p>
                  <p>{(opponentPokemon[round].weight / 10).toFixed(2)} kg</p>
                  <p>{opponentPokemon[round].types?.map(t => t.type.name).join(", ")}</p>
                  <p>{opponentPokemon[round].abilities?.map(a => a.ability.name).join(", ")}</p>
                </div>

                <div className="subPokemonInfoContainer7">
                  <p>HP</p><p>Attack</p><p>Defense</p><p>Speed</p>
                  <p>Sp.Attack</p><p>Sp.Defense</p><p>ID</p><p>Height</p><p>Weight</p>
                  <p>Type</p><p>Abilities</p>
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