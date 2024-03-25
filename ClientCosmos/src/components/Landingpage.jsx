import React from "react";
import BG from "../Assets/BG.png";
import LOGO from "../Assets/LOGO.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Landingpage() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/HomePage");
  };
  return (
    <>
      <motion.div
        className="h-screen w-screen flex flex-col  items-center"
        style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover" }}
      >
        <img className="w-2/4 mt-44" src={LOGO} alt="" />
        <button
          onClick={onClick}
          className="mt-14 py-3 px-5 rounded font-poppins tracking-wider font-medium bg-white"
        >
          Lets Explore
        </button>
      </motion.div>
    </>
  );
}

export default Landingpage;
