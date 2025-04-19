import "../assets/css/pokemon.css"
import Star from "../assets/img/star.svg"
import "../assets/css/dashboard.css"
import PokemonImg from "../assets/img/pokemonImg.svg";

function Pokemon() {
  return(
    <div className="pokemonContainer">
      <div className="subPokemonContainer">
        <div className="searchContainer">
          <input className="search" type="text" />
          <button className="addButton">Add Team</button>
        </div>

        <div className="selectedTeamContainer">
          <div className="subSelectedTeamContainer">
            <div className="selectedTeam">
              {/* display pokemon */}
            </div>
          </div>
        </div>

        <div className="pokemons">
          <div className="subPokemons">
            <div className="pokeInfoContainer">
              <div className="pokemonName">
                <p>Charizard</p>
                <img className="star" src={Star} alt="" />
              </div>

              <div className="pokeId">
                <p>#001</p>
              </div>

              <div className="typeContainer">
                <div className="subTypeContainer">
                  <p>Fire</p>
                </div>
              </div>

              <div className="typeContainer">
                <div className="subTypeContainer">
                  <p>Flying</p>
                </div>
              </div>
            </div>
            
            <div className="pokemonImgContainer1">
              <img className="pokemonImg" src={PokemonImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;