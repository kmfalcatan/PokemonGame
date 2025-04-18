import "../assets/css/landingPage.css";
import Background from "../assets/img/pokemonBG.svg";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landingContainer">
      <img className="background" src={Background} alt="" />

      <div className="welcomeContainer">
        <div className="subWelcomeContainer">
          <p>Grab your Poké Balls… it’s time to become a Pokémon Trainer!</p>
          <button className="startButton" onClick={() => navigate("/dashboard")}>
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
