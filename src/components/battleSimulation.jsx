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
  const [isBattleStarted, setIsBattleStarted] = useState(false);
  const [finalResult, setFinalResult] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/games").then(res => setGames(res.data));
    AOS.init();
  }, []);

  useEffect(() => {
    if (games.length) {
      setPlayerPokemon(games[games.length - 1].selectedPokemons || []);
    }
  }, [games]);

  useEffect(() => {
    if (!playerPokemon.length) return;
    const used = new Set(playerPokemon.map(p => p.name));
    const team = [];
    (async () => {
      while (team.length < 6) {
        const id = Math.floor(Math.random() * 898) + 1;
        try {
          const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
          if (!used.has(data.name)) {
            team.push(data);
            used.add(data.name);
          }
        } catch {}
      }
      setOpponentPokemon(team);
    })();
  }, [playerPokemon]);


  const typeColors = {
    normal: "#A8A77A", fire: "#F08030", water: "#6890F0", electric: "#F8D030",
    grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0",
    ground: "#E0C068", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
    rock: "#B8A038", ghost: "#705898", dragon: "#7038F8", dark: "#705848",
    steel: "#B8B8D0", fairy: "#F0B6BC",
  };
  const getTypeBackgroundColor = types => typeColors[types?.[0]?.type?.name] || "#FFF";
  const getScoreColor = r => r === "win" ? "#4CAF50" : r === "lose" ? "#F44336" : "#FFC107";

  const startBattle = async () => {
    if (round >= 6 || playerPokemon.length < 6 || opponentPokemon.length < 6) return;
    setIsBattleStarted(true);

    for (let n of ["3", "2", "1"]) {
      setStatusText(n);
      await new Promise(r => setTimeout(r, 500));
    }
    setStatusText("Fighting...");
    await new Promise(r => setTimeout(r, 1000));

    const autoFight = async i => {
      if (i >= 6) {
        setStatusText("Battle Over");
        return;
      }
    
      const p = playerPokemon[i], o = opponentPokemon[i];
      const ps = { hp: p.stats[0].base_stat, attack: p.stats[1].base_stat, speed: p.stats[5].base_stat };
      const os = { hp: o.stats[0].base_stat, attack: o.stats[1].base_stat, speed: o.stats[5].base_stat };
    
      let pp = 0, op = 0;
      for (let stat of ["hp","attack","speed"]) {
        if (ps[stat] > os[stat]) pp++;
        else if (ps[stat] < os[stat]) op++;
      }
      const result = pp > op ? "win" : pp < op ? "lose" : "tie";
    
      setRound(i+1);
      setStatusText(
        result === "win"  ? `${p.name} Wins!` :
        result === "lose" ? `${o.name} Wins!` :
        "It's a Tie!"
      );
    
      setScores(prev => {
        const next = [...prev, result];
    
        if (i === 5) {
          const wins   = next.filter(x => x === "win").length;
          const losses = next.filter(x => x === "lose").length;
          const final  = wins > losses ? "You Won!!" :
                         losses > wins ? "You Lost" :
                         "It's a Tie!";
          setFinalResult(final);
    
          const history = {
            playerTeam:   playerPokemon.map(p => p.name),
            opponentTeam: opponentPokemon.map(p => p.name),
            date:         new Date().toISOString(),
            result:       wins > losses ? "win" : losses > wins ? "lose" : "tie"
          };
          axios.post("http://localhost:5000/matches", history)
            .catch(err => console.error("Save match failed:", err));
        }
    
        return next;
      });
    
      await new Promise(r => setTimeout(r, 2000));
      autoFight(i+1);
    };    

    autoFight(round);
  };

  return (
    <div className="battleSimulationContainer" data-aos="fade" data-aos-delay="300">
      <div className="pokemonHeaderContainer">
        <div className="subPokemonHeaderContainer">
          <div className="pokemonHeader">
            {games.length > 0 && games[games.length - 1].selectedPokemons.map((pokemon, index) => {
              const primaryType = pokemon.types?.[0]?.type?.name;
              const bgColor = typeColors[primaryType] || "#ccc"; 

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
            {!isBattleStarted && (  
              <>
                <button className="start" onClick={startBattle}>Start</button>
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


      {finalResult && (
        <div className="resultContainer">
          <div className="subResultContainer">
            <div className="resultText">
              <p>{finalResult}</p>
            </div>
            <div className="buttonContainer5">
              <div className="subButtonContainer5">
                <button className="button5" onClick={() => window.location.reload()}>Play Again</button>
                <button className="button5" onClick={() => navigate("/dashboard")}>Home</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BattleSimulation;