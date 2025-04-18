import "../assets/css/sideBar.css"
import "../assets/css/profile.css"
import { useNavigate } from "react-router-dom";
import Dashboard from "../assets/img/dashboard.svg";
import Battle from "../assets/img/battle.svg"
import Pokemon from "../assets/img/pokemon.svg"
import Team from "../assets/img/team.svg"
import History from "../assets/img/history.svg"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

function SideBar() {
  const navigate = useNavigate();
  
    useEffect(() => {
      AOS.init({
        duration: 1000,
        once: false,
      });
    }, []);

  return(
    <div className="subSidebarContainer" data-aos="fade">
      <div className="headerContainer">
        
      </div>

      <div className="sidebar">
        <div className="welcomeTrainerContainer">
          <p className="welcome">Welcome Trainer</p>
        </div>

        <div className="buttonContainer">
          <div className="subButtonContainer">
            <div className="textButton" onClick={() => navigate("/dashboard")}>
              <p className="text">Dashboard</p>
            </div>

            <div className="iconContainer">
              <img className="icon" src={Dashboard} alt="" />
            </div>
          </div>

          <div className="subButtonContainer">
            <div className="textButton" onClick={() => navigate("/battle")}>
              <p className="text">Battle</p>
            </div>

            <div className="iconContainer">
              <img className="icon" src={Battle} alt="" />
            </div>
          </div>

          <div className="subButtonContainer">
            <div className="textButton" onClick={() => navigate("/pokemons")}>
              <p className="text">Pokemons</p>
            </div>

            <div className="iconContainer">
              <img src={Pokemon} className="icon" alt="" />
            </div>
          </div>

          <div className="subButtonContainer">
            <div className="textButton" onClick={() => navigate("/team")}>
              <p className="text">Team</p>
            </div>

            <div className="iconContainer">
              <img src={Team} className="icon" alt="" />
            </div>
          </div>

          <div className="subButtonContainer">
            <div className="textButton" onClick={() => navigate("/history")}>
              <p className="text">History</p>
            </div>

            <div className="iconContainer">
              <img src={History} className="icon" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="profileContainer">
      <div className="upgradePointsContainer">
        <p className="points">Points: <span>9</span></p>
      </div>

      <div className="subProfileContainer">
        <div className="infoContainer">
          <div className="nameContainer">
            <p>Khriz</p>
          </div>

          <div className="levelContainer">
            <div className="subLevelContianer">
              <p>Lvl 3</p>
            </div>

            <div className="levelIndicator">
              <div className="subLevelIndicator">
                <div className="indicator">

                </div>
              </div>
            </div>

            <div className="numberContainer">
              <p>50/100</p>
            </div>
          </div>
        </div>

        <div className="profilePicContainer">
          <div className="subProfilePicContainer">

          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SideBar;