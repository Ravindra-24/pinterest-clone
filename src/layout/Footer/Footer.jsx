import React from "react";
import { motion } from "framer-motion";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1" />
        <div className="wave" id="wave2" />
        <div className="wave" id="wave3" />
        <div className="wave" id="wave4" />
      </div>
      <ul className="social-icon">
        <li className="social-icon__item">
          <a className="social-icon__link" target="__blank" href="https://github.com/Ravindra-24">
          <box-icon name='github' type='logo' ></box-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" target="__blank" href="https://twitter.com/RavindraPa88686">
          <box-icon name='twitter' type='logo' ></box-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" target="__blank" href="https://www.linkedin.com/in/ravindra-shrimant-pawar/">
          <box-icon type='logo' name='linkedin-square'></box-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" target="__blank" href="https://www.instagram.com/ravindra_pawar_24/">
          <box-icon name='instagram' type='logo' ></box-icon>
          </a>
        </li>
      </ul>
      <ul className="menu">
        <motion.li onClick={scrollToTop} className="menu__item">
          <Link className="menu__link" to={"/"}>
            Home
          </Link>
        </motion.li>
        <motion.li onClick={scrollToTop} className="menu__item">
          <Link className="menu__link" to={"/about"}>
            About
          </Link>
        </motion.li>
        {/* <li className="menu__item">
          <Link className="menu__link" to={}>
            Services
          </Link>
        </li> */}
        <li className="menu__item">
          <a className="menu__link" target="__blank" href="https://portofolio-ravindra-24.vercel.app/">
            Portfolio
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" target="__blank" href="https://portofolio-blond-gamma.vercel.app/contact">
            Contact
          </a>
        </li>
      </ul>
      <p>©2022 PIN | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
