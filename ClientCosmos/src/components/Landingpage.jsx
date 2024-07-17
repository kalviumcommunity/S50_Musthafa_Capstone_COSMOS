import React from "react";
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
      <motion.div className="h-screen w-screen flex flex-col items-center relative">
        <video
          src="https://firebasestorage.googleapis.com/v0/b/cosmos-16de1.appspot.com/o/73477-548608749.mp4?alt=media&token=0c0d36bc-6fe4-446e-9e89-7a81933ecf75"
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="relative z-10 mt-24 flex flex-col items-center justify-center">
          <div className="text-center flex justify-center">
            <h2 className="text-4xl w-3/4 sm:text-6xl md:text-8xl lg:text-9xl z-10 font-poppins font-bold text-gray-100">
              THE COSMOS
            </h2>
          </div>
          <div className="w-full">

          <button
            onClick={onClick}
            className="mt-14 w-full py-3 px-5 rounded tracking-wider text-lg sm:text-xl md:text-2xl font-poppins bg-transparent backdrop-blur-sm border duration-500 text-white"
          >
            Let's Explore
          </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Landingpage;
