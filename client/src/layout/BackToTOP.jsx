import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

const BackToTop = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 400);
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        padding: 10,
        borderRadius: 5,
        zIndex: 1000,
      }}
      animate={{
        opacity: isScrolled ? 1 : 0,
      }}
    >
      <FontAwesomeIcon className="h-10 w-10 " style={{color:"#FFD43B", backgroundColor:"black", borderRadius:"50%"}} icon={faCircleArrowUp} />
    </motion.button>
  );
};

export default BackToTop;