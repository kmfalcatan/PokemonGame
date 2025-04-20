import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/PokemonModal.css";
import Back from "../assets/img/back.svg";
import Next from "../assets/img/next.svg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import PokemonImg from "../assets/img/pokemonImg.svg";
import PlusIcon from "../assets/img/plus.svg"; // Add your plus icon
import MinusIcon from "../assets/img/minus.svg"; // Add your minus icon

function PokemonModal() {
  const statValues = [70, 80, 60, 75, 85, 65]; // dummy values
  const navigate = useNavigate();
  const [isUpgradeMode, setIsUpgradeMode] = useState(false);

  // ✅ Auto-redirect on small screens
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

  const handleUpgradeClick = () => {
    setIsUpgradeMode(!isUpgradeMode);
  };

  // Stats list
  const stats = ["hp", "attact", "defense", "speed", "spAttact", "speedDefense"];
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className="pokemonModalContainer" data-aos="fade">
      <div className="modalHeaderContainer">
        <div className="subModalHeaderContainer">
          <img className="backIcon" onClick={() => navigate("/pokemons")} src={Back} alt="Back" />
        </div>
      </div>

      <div className="statsPokemonContainer">
        <div className="statsTextContainer">
          <p>Stats of Charizard</p>
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
              <p className="fade-in-section fade-in-delay-1">#001</p>
              <p className="fade-in-section fade-in-delay-2">80cm</p>
              <p className="fade-in-section fade-in-delay-3">60kg</p>
              <div className="type4">
                <p className="typeContainer3 fade-in-section fade-in-delay-4">Dragon</p>
                <p className="typeContainer3 fade-in-section fade-in-delay-4">Dragon</p>
                <p className="typeContainer3 fade-in-section fade-in-delay-4">Dragon</p>
              </div>

              <div className="type4">
                <p className="typeContainer3 fade-in-section fade-in-delay-5">Dragon</p>
                <p className="typeContainer3 fade-in-section fade-in-delay-5">Dragon</p>
                <p className="typeContainer3 fade-in-section fade-in-delay-5">Dragon</p>
              </div>
            </div>
          </div>

          <div className="pokemonImageContainer">
            <img className="pokemonImg" src={PokemonImg} alt="Charizard" />
          </div>

          <div className="statsPokemonContainer1">
            <div className="subAboutPokemonContainer">
              <p className="fade-in-section fade-in-delay-1">HP</p>
              <p className="fade-in-section fade-in-delay-2">Attack</p>
              <p className="fade-in-section fade-in-delay-3">Defense</p>
              <p className="fade-in-section fade-in-delay-4">Speed</p>
              <p className="fade-in-section fade-in-delay-5">Sp.Attack</p>
              <p className="fade-in-section fade-in-delay-6">Sp.Defense</p>
              <p className="fade-in-section fade-in-delay-7">Points: 6</p>
            </div>

            <div className="subAboutPokemonContainer1">
              {stats.map((stat, index) => (
                <div key={stat} className={`basic ${stat} fade-in-section fade-in-delay-${index + 1}`}>
                  <div className="subBasic">
                    <div className="subBasic1" style={{ width: `${statValues[index]}%` }}>22</div>
                  </div>
                  {isUpgradeMode && (
                    <div className="upgradeControls">
                      <img src={MinusIcon} alt="Minus" className="upgradeIcon" />
                      <img src={PlusIcon} alt="Plus" className="upgradeIcon" />
                    </div>
                  )}
                </div>
              ))}
              <div className="basic fade-in-section fade-in-delay-7">
                <button className="upgradeButton" onClick={handleUpgradeClick}>
                  {isUpgradeMode ? "Save" : "Upgrade"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="statsTextContainer1">
          <div className="nextContainer">
            <img className="backIcon" src={Back} alt="Back" />
          </div>

          <div className="subStatsTextContainer1">
            <p>Charizard</p>
          </div>

          <div className="nextContainer">
            <img className="backIcon" src={Next} alt="Next" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
