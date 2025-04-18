import "../assets/css/profile.css"

function Profile() {
  return(
    <div className="profileContainer">
      <div className="upgradePointsContainer">
        <p>Upgrade Points: <span>9</span></p>
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
  );
}

export default Profile;