import React from "react";
import BG from "../Assets/BG.png";
import LOGO from "../Assets/LOGO.png";
import { useNavigate } from 'react-router-dom'

function Landingpage() {

    const navigate = useNavigate();

    const onClick = () => {
        navigate("/HomePage")
    }
  return (
    <>
      <div
        className="h-screen w-screen flex justify-center items-center"
        style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover" }}
      >
        <img className="w-2/4" src={LOGO} alt="" />
        <br />
        <button onClick={onClick} className="bg-white text-xl font-mono py-3 px-8 rounded shadow-lg duration-300">Get started</button>
      </div>
    </>
  );
}

export default Landingpage;
