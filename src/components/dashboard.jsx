import "../assets/css/dashboard.css";
import Pokemon from "../assets/img/pokemonImg.svg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Star from "../assets/img/star.svg"


function Dashboard() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return(
    <div className="dashboardContainer">
      <div className="subDashboardContainer">
        <div className="favContainer">
          <div className="subFavContainer" data-aos="fade">
            <div className="fav">
              <div className="pokemonNameContainer">
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

              <div className="pokemonImgContainer">
                <img className="pokemonImg" src={Pokemon} alt="" />
              </div>
            </div>

            <div className="titleContainer">
              <p>Favorite</p>
            </div>
          </div>

          <div className="displayTeamContainer" data-aos="fade" data-aos-delay="300">
            <div className="subDisplayTeamContainer">
              <div className="display">
                <div className="teamNumberContainer">
                  <p>Team #1</p>
                </div>

                <div className="teams">
                  <div className="subTeams">

                  </div>
                  
                  <div className="subTeams">

                  </div>
                  
                  <div className="subTeams">

                  </div>
                  
                  <div className="subTeams">

                  </div>
                  
                  <div className="subTeams">

                  </div>
                  
                  <div className="subTeams">

                  </div>
                </div>
              </div>
            </div>

            <div className="titleContainer">
              <p>Team</p>
            </div>
          </div>
        </div>

        <div className="historyDisplayContainer" data-aos="fade" data-aos-delay="600" data-aos-offset="50">
          <div className="subHistoryDisplayContainer">
            <div className="history">
              <div className="historyDisplayText">
                <p>Team</p>
              </div>
              
              <div className="historyDisplayText">
                <p>Battle Record</p>
              </div>
            </div>
          
            <div className="historyDisplay">
              <div className="historyDisplay1">
                <div className="subHistoryDisplay">
                  <div className="subTeams1">

                  </div>
                </div>

                <div className="battleHistory">
                  <p>Loss</p>
                </div>
              </div>

              <div className="historyDisplay2">
                <div className="subHistoryDisplay">
                  <div className="subTeams1">

                  </div>
                </div>

                <div className="battleHistory">
                  <p>Win</p>
                </div>
              </div>
            </div>
          </div> 

          <div className="titleContainer">
            <p>History</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;