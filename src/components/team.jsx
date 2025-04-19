import "../assets/css/team.css"
import Edit from "../assets/img/edit.svg"
import Trash from "../assets/img/trash.svg"

function Team(){
  return(
    <div className="teamContainer"data-aos="fade" data-aos-delay="300">
      <div className="subTeamContainer"> 
        <div className="team">
          <div className="teamText">
            <p>Team #1</p>
          </div>

          <div className="teamPokemonContainer">
            <div className="subTeamPokomonContainer">
              <div className="pokemonTeam">

              </div>
            </div>

            <div className="editContainer">
              <div className="subEditContainer">
                <img className="editIcon" src={Edit} alt="" />
              </div>

              
              <div className="subEditContainer">
                <img className="editIcon" src={Trash} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="team">
          <div className="teamText">
            <p>Team #1</p>
          </div>

          <div className="teamPokemonContainer">
            <div className="subTeamPokomonContainer">
              <div className="pokemonTeam">

              </div>
            </div>

            <div className="editContainer">
              <div className="subEditContainer">
                <img className="editIcon" src={Edit} alt="" />
              </div>

              
              <div className="subEditContainer">
                <img className="editIcon" src={Trash} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;