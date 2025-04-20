import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/pokemon.css";
import Star from "../assets/img/star.svg";
import "../assets/css/dashboard.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import PokemonImg from "../assets/img/pokemonImg.svg";
import Back from "../assets/img/back.svg";

function Pokemon() {
  const [showTeam, setShowTeam] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAddTeamClick = () => {
    setShowTeam(!showTeam);
  };

  const handlePokemonClick = () => {
    if (window.innerWidth <= 1024) {
      setShowModal(true); // mobile/tablet: show modal
    } else {
      navigate("/pokemonModal"); // desktop: redirect
    }
  };

  // ✅ Auto-redirect on resize if modal is showing and size changes
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
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className="pokemonContainer" data-aos="fade">
      <div className="subPokemonContainer">
        <div className="searchContainer">
          <input className="search" type="text" placeholder="Search a pokemon..." />
          <button className="addButton" onClick={handleAddTeamClick}>
            {showTeam ? "Save Team" : "Add Team"}
          </button>
        </div>

        <div
          className={`selectedTeamContainer transition ${
            showTeam ? "slide-fade-in" : "slide-fade-out"
          }`}
        >
          <div className="subSelectedTeamContainer">
            <div className="selectedTeam">
              {/* display selected pokemon team */}
            </div>
          </div>
        </div>

        <div className="pokemons">
          <div className="subPokemons" onClick={handlePokemonClick}>
            <div className="pokeInfoContainer">
              <div className="pokemonName">
                <p>Charizard</p>
                <img className="star1" src={Star} alt="Star" />
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

      {showModal && (
        <div className="pokemonInfoModalContainer">
          <div className="subPokemonInfoModalContainer">
            <div className="backContainer">
              <div className="backIconContainer" onClick={() => setShowModal(false)}>
                <img className="backIcon" src={Back} alt="Back" />
              </div>

              <div className="pokemonIdContainer">
                <p>#001</p>
              </div>
            </div>

            <div className="pokemonNameContainer1">
              <p>Bulbasaur</p>
            </div>

            <div className="pokemonTypeContainer">
              <div className="subPokemonTypeContainer">
                <p>Fire</p>
              </div>
            </div>

            <div className="pokemonInfo">
              <div className="subPokemonInfo">
                <img className="pokemonImg" src={PokemonImg} alt="Charizard" />
              </div>

              <div className="infoButtonContainer">
                <div className="subInfoButtonContainer">
                  <p
                    className={`infoButton ${
                      activeTab === "about" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("about")}
                  >
                    About
                  </p>
                  <p
                    className={`infoButton ${
                      activeTab === "stats" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("stats")}
                  >
                    Basic Stats
                  </p>

                  <div
                    className="tab-indicator"
                    style={{
                      transform:
                        activeTab === "about"
                          ? "translateX(0%)"
                          : "translateX(100%)",
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
                    <div className="about1">
                      <p className="fade-in-section fade-in-delay-1">6.5kg</p>
                      <p className="fade-in-section fade-in-delay-2">70cm</p>
                      <p className="fade-in-section fade-in-delay-3">Fire</p>
                      <p className="fade-in-section fade-in-delay-4">Flying</p>
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
                      <p className="fade-in-section fade-in-delay-7">Points: 6</p>
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
                      <div className="basic fade-in-section fade-in-delay-7">
                        <button className="upgradeButton">Upgrade</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pokemon;
