import React, { useContext, useState } from "react";
import "./Navbar.css";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import ProjectLogo from "../ProjectLogo";
import "boxicons";
import { useDispatch, useSelector } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import { NavLink } from "react-router-dom";
import { LoginButton, SignupButton } from "../Buttons/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faHouse,
  faRightFromBracket,
  faSearch,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";
import { SearchContext } from "../../context/searchContext";

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const { toggleSearchModal } = useContext(SearchContext);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
console.log(auth)
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();
    if (latest > prev && latest > 250) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    if (window.location.pathname === "/") {
      if (latest > 200) {
        document.getElementById("nav-header").classList.add("blur-effect");
      } else {
        document.getElementById("nav-header").classList.remove("blur-effect");
      }
    } else {
      document.getElementById("nav-header").classList.add("blur-effect");
    }
  });

  const handleLogout = () => {
    googleLogout();
    dispatch({ type: "LOGOUT" });
  };

  const handleNavLinkClick = () => {
    const checkBox = document.getElementById("check");
    if (checkBox.checked) {
      checkBox.checked = false;
    }
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
        className="nav-header"
        id="nav-header"
      >
        <span href="#" className="logo">
          <ProjectLogo />
        </span>

        <input type="checkbox" id="check" />

        <label htmlFor="check" className="icons">
          <box-icon
            type="regular"
            color="white"
            size="md"
            name="menu"
            id="menu-icon"
          ></box-icon>
          <box-icon
            type="regular"
            color="white"
            size="md"
            name="x"
            id="close-icon"
          ></box-icon>
        </label>
        {auth.loaded && auth.token && (
          <NavLink
            to={`/user/${auth?.user?.id}`}
            className="nav-avatar flex mr-10"
          >
            <Avatar auth={auth} height={6} width={6} />
          </NavLink>
        )}
        <div className="navbar" id="navbar">
          <NavLink to={"/"} className="nav-items" onClick={() => handleNavLinkClick()}>
            <FontAwesomeIcon
              icon={faHouse}
              className="mr-2 "
              activeclassname="active"
            />
            Home
          </NavLink>
          <NavLink to={"/about"} className="nav-items" onClick={() => handleNavLinkClick()}>
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="mr-2 "
              activeclassname="active"
            />
            About Us
          </NavLink>
          <button onClick={() => toggleSearchModal()} className="nav-items">
            <span onClick={() => handleNavLinkClick()}>
            <FontAwesomeIcon
              icon={faSearch}
              className="mr-2 "
              activeclassname="active"
            />
            Search</span>
          </button>
          {auth.loaded && auth.token ? (
            <>
              <NavLink
                activeclassname="active-nav-item"
                to={`/user/${auth?.user?.id}`}
                className="nav-items"
                onClick={() => handleNavLinkClick()}
              >
                <Avatar auth={auth} height={6} width={6} />
                Profile
              </NavLink>
              <NavLink to="/create-post" className="nav-items" onClick={() => handleNavLinkClick()}>
                <FontAwesomeIcon
                  icon={faUpload}
                  className="mr-2 "
                  activeclassname="active"
                />
                Upload
              </NavLink>
              <button
                className="nav-items bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white py-1 px-2 rounded"
                type="button"
                onClick={handleLogout}
              >
                <span className="flex justify-between items-center" onClick={() => handleNavLinkClick()}>
                  Logout{" "}
                  <FontAwesomeIcon icon={faRightFromBracket} className="ml-2" />
                </span>
              </button>
            </>
          ) : (
            <>
              <span className="nav-items" onClick={() => handleNavLinkClick()}>
                <LoginButton />
              </span>
              <span className="nav-items" onClick={() => handleNavLinkClick()}>
                <SignupButton />
              </span>
            </>
          )}
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
