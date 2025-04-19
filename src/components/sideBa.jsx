import "../assets/css/sideBar.css";
import "../assets/css/profile.css";
import { useNavigate } from "react-router-dom";
import Dashboard from "../assets/img/dashboard.svg";
import Battle from "../assets/img/battle.svg";
import Pokemon from "../assets/img/pokemon.svg";
import Team from "../assets/img/team.svg";
import History from "../assets/img/history.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function SideBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      const section = document.getElementById(id.toLowerCase());
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 600);
  };

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/${path.toLowerCase()}`);
    toggleMenu(); // close menu after navigation
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className="subSidebarContainer" data-aos="fade">
      {/* Header and Hamburger Menu */}
      <div className="headerContainer">
      <div
        className={`menubarContainer ${menuOpen ? "change" : ""}`}
        onClick={toggleMenu}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ clipPath: "circle(0% at 0% 0%)", opacity: 0 }}
            animate={{
              clipPath: "circle(150% at 0% 0%)",
              opacity: 1,
            }}
            exit={{
              clipPath: "circle(0% at 0% 0%)",
              opacity: 0,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="subMenubarContainer"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.6,
                    staggerChildren: 0.1,
                  },
                },
              }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {["Dashboard", "Battle", "Pokemons", "Team", "History"].map((id) => (
                <motion.button
                  key={id}
                  onClick={() => handleNavigation(id)}
                  className="button2"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {id}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

      {/* Sidebar */}
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

      {/* Profile Container */}
      <div className="profileContainer">
        <div className="upgradePointsContainer">
          <p className="points">
            Points: <span>9</span>
          </p>
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
                  <div className="indicator"></div>
                </div>
              </div>

              <div className="numberContainer">
                <p>50/100</p>
              </div>
            </div>
          </div>

          <div className="profilePicContainer">
            <div className="subProfilePicContainer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
