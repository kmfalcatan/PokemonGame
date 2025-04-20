import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/battle.css";
import Back from "../assets/img/back.svg";
import PokemonImg from "../assets/img/pokemonImg.svg";
import Remove from "../assets/img/x.svg";
import InfoIcon from "../assets/img/info.svg";

function Battle() {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);

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

  const toggleInfo = () => {
    // Only toggle on mobile/tablet
    if (window.innerWidth < 1025) {
      setShowInfo((prev) => !prev);
    }
  };

  return (
    <div className="battleContainer">
      <div className="battleHeaderContainer">
        <div className="subBattleHeaderContainer">
          <img
            className="backIcon"
            onClick={() => navigate("/pokemons")}
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
              <div className="teamDisplay">
                <div className="subTeamTextDisplay">
                  <p>Team #1</p>
                </div>
                <div className="subTeamDisplay">
                  <div className="teamDisplay1"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="displayPokemon1">
          <div className="containerOfPokemon">
              <div className="subDisplayPokemon1" style={{ position: "relative" }}>
                <img className="pokemonImg" src={PokemonImg} alt="Charizard" />
                <img
                  className="infoIcon"
                  src={InfoIcon}
                  alt="Info"
                  onClick={toggleInfo}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "1rem",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                  }}
                />
              </div>

              <div className="nameContainer1">
                <div className="subNameContainer1">
                  <p>Charizard</p>
                </div>
              </div>
            </div>
          </div>

          <div className="displayPokemon1">
            {showInfo && (
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
                    <p className="fade-in-section fade-in-delay-1">#001</p>
                    <p className="fade-in-section fade-in-delay-2">80cm</p>
                    <p className="fade-in-section fade-in-delay-3">60kg</p>
                    <div className="type4">
                      <p className="typeContainer3 fade-in-section fade-in-delay-4">Dragon</p>
                      <p className="typeContainer3 fade-in-section fade-in-delay-4">Dragon</p>
                    </div>
                    <div className="type4">
                      <p className="typeContainer3 fade-in-section fade-in-delay-5">Dragon</p>
                      <p className="typeContainer3 fade-in-section fade-in-delay-5">Dragon</p>
                    </div>
                  </div>
                </div>

                <div className="basicStatsContainer1">
                  <div className="subBasicStatsContainer">
                    <div className="basicStats">
                      <p className="fade-in-section fade-in-delay-1">HP</p>
                      <p className="fade-in-section fade-in-delay-2">Attack</p>
                      <p className="fade-in-section fade-in-delay-3">Defense</p>
                      <p className="fade-in-section fade-in-delay-4">Speed</p>
                      <p className="fade-in-section fade-in-delay-5">Sp.Attack</p>
                      <p className="fade-in-section fade-in-delay-6">Sp.Defense</p>
                    </div>
                    <div className="basicStats1">
                      <div className="basic hp fade-in-section fade-in-delay-1">
                        <div className="subBasic">
                          <div className="subBasic1"></div>
                        </div>
                      </div>
                      <div className="basic attact fade-in-section fade-in-delay-2">
                        <div className="subBasic">
                          <div className="subBasic1"></div>
                        </div>
                      </div>
                      <div className="basic defense fade-in-section fade-in-delay-3">
                        <div className="subBasic">
                          <div className="subBasic1"></div>
                        </div>
                      </div>
                      <div className="basic speed fade-in-section fade-in-delay-4">
                        <div className="subBasic">
                          <div className="subBasic1"></div>
                        </div>
                      </div>
                      <div className="basic spAttact fade-in-section fade-in-delay-5">
                        <div className="subBasic">
                          <div className="subBasic1"></div>
                        </div>
                      </div>
                      <div className="basic speedDefense fade-in-section fade-in-delay-6">
                        <div className="subBasic">
                          <div className="subBasic1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="selectedTeamContainer">
          <div className="subSelectedTeamContainer1">
            <div className="selectedTeam1">
              <div className="removeContainer">
                <img src={Remove} alt="" />
              </div>
            </div>
          </div>

          <div className="gameStartButtonContainer">
            <button className="startButton">Start Battle</button>
          </div>
        </div>

        <div className="browsContainer">
          <div className="subPokemons">
            <div className="pokeInfoContainer">
              <div className="pokemonName">
                <p>Charizard</p>
                <input className="checkButton" type="checkbox" name="" id="" />
              </div>

              <div className="pokeId">
                <p>#001</p>
              </div>

              <div className="typeContainer1">
                <div className="subTypeContainer">
                  <p>Fire</p>
                </div>
              </div>

              <div className="typeContainer1">
                <div className="subTypeContainer">
                  <p>Flying</p>
                </div>
              </div>
            </div>

            <div className="pokemonImgContainer1">
              <img className="pokemonImg" src={PokemonImg} alt="Charizard" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Battle;
