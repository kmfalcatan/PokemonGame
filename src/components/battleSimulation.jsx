import "../assets/css/battleSimulation.css";
import PokemonImg from "../assets/img/pokemonImg.svg";

function BattleSimulation() {
  return(
    <div className="battleSimulationContainer">
      <div className="pokemonHeaderContainer">
        <div className="subPokemonHeaderContainer">
          <div className="pokemonHeader">
            <div className="subPokemonHeader">

            </div>
          </div>

          <div className="roundContainer">
            <p>Round</p>
            <p className="roundNumber">2</p>
          </div>
          
          <div className="pokemonHeader1">
            <div className="subPokemonHeader">

            </div>
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
          <div className="displayPokemonContainer4">
            <div className="subDisplayPokemonContainer4">
              <div className="displayPokemon4">
                <img className="pokemonImg" src={PokemonImg} alt="Charizard" />
              </div>

              <div className="pokemonNameContainer4">
                <p className="pokemonName4">Charizard</p>
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
        </div>
        
        <div className="subBattleSimulation1">
          <p className="status">Fight</p>
          <div className="buttonContainer3">
            <button className="start">Start</button>
            <button className="start">Cancel</button>
          </div>
        </div>
        
        <div className="subBattleSimulation">
          <div className="displayPokemonContainer4">
            <div className="subDisplayPokemonContainer4">
              <div className="displayPokemon4">
                <img className="pokemonImg" src={PokemonImg} alt="Charizard" />
              </div>

              <div className="pokemonNameContainer4">
                <p className="pokemonName4">Charizard</p>
              </div>
            </div>
          </div>

          <div className="pokemonInfoContainer5">

          </div>
          
          <div className="pokemonInfoContainer4">
            <div className="subPokemonInfoContainer6">
              <p>100</p>
              <p>88</p>
              <p>77</p>
              <p>55</p>
              <p>23</p>
              <p>11</p>
              <p>#001</p>
              <p>30cm</p>
              <p>20kg</p>
              <p>Dragon</p>
              <p>Flying</p>
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
        </div>
      </div>
    </div>
  );
}

export default BattleSimulation;