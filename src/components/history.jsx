import "../assets/css/history.css"
import { useEffect, useState } from "react"
import axios from "axios"

function History() {
  const [matches, setMatches] = useState([])
  const [pokemonBackgrounds, setPokemonBackgrounds] = useState({}) 

  useEffect(() => {
    axios
      .get("http://localhost:5000/matches")
      .then(res => {
        const uniqueMap = new Map()
        for (let m of res.data) {
          const playerKey = m.playerTeam.sort().join(",")
          const opponentKey = m.opponentTeam.sort().join(",")
          const key = `${playerKey}_${opponentKey}` 
  
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, m)
          }
        }
  
        const unique = Array.from(uniqueMap.values())
        unique.sort((a, b) => new Date(b.date) - new Date(a.date))
        setMatches(unique)
      })
      .catch(err => console.error("Failed to load history:", err))
  }, [])

  const getPokemonBackground = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    axios.get(url).then((response) => {
      const types = response.data.types.map((type) => type.type.name)
      const typeColors = {
        normal: "#A8A77A", fire: "#F08030", water: "#6890F0", electric: "#F8D030",
        grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0",
        ground: "#E0C068", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
        rock: "#B8A038", ghost: "#705898", dragon: "#7038F8", dark: "#705848",
        steel: "#B8B8D0", fairy: "#F0B6BC",
      }
      
      for (let type of types) {
        if (typeColors[type]) {
          setPokemonBackgrounds((prevState) => ({
            ...prevState,
            [name]: typeColors[type] 
          }))
          break
        }
      }
    })
  }

  return (
    <div className="historyContainer">
      <div className="subHistoryContainer1" data-aos="fade" data-aos-delay="300">
        <div className="subHistoryContainer">
          <div className="textHistoryContainer"><p>Teams</p></div>
          <div className="textHistoryContainer1"><p className="text1">Status</p></div>
        </div>

        {matches.map(match => (
          <div key={match.id} className={`recordContainer ${match.result}`}>
            <div className="subRecordContainer">

              {/* Player team */}
              <div className="playerPokemonContainer">
                {match.playerTeam.map(name => {
                  const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
                  return (
                    <div key={name} className="subTeams10" style={{ backgroundColor: pokemonBackgrounds[name] || 'transparent' }}>
                      <img
                        src={`${url}.svg`.replace(
                          "/pokemon/",
                          "/sprites/other/official-artwork/"
                        )}
                        className="pokemonImg9"
                        onError={e => {
                          axios.get(url).then(r => {
                            e.target.src = r.data.sprites.front_default
                          })
                        }}
                        onLoad={() => getPokemonBackground(name)} 
                      />
                    </div>
                  )
                })}
              </div>

              <p className="vsText">VS</p>

              {/* Opponent team */}
              <div className="opponentPokemonContainer">
                {match.opponentTeam.map(name => {
                  const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
                  return (
                    <div key={name} className="subTeams10" style={{ backgroundColor: pokemonBackgrounds[name] || 'transparent' }}>
                      <img
                        src={`${url}.svg`.replace(
                          "/pokemon/",
                          "/sprites/other/official-artwork/"
                        )}
                        className="pokemonImg9"
                        onError={e => {
                          axios.get(url).then(r => {
                            e.target.src = r.data.sprites.front_default
                          })
                        }}
                        onLoad={() => getPokemonBackground(name)} 
                      />
                    </div>
                  )
                })}
              </div>

              <p className="date">
                {new Date(match.date).toLocaleDateString("en-US")}
              </p>
            </div>

            <div className="pointsContainer">
              <p className="text1">
                {match.result === "win" ? "Win" : match.result === "lose" ? "Lose" : "Tie"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History
