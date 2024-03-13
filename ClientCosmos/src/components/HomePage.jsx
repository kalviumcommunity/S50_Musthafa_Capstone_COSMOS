import React from "react";
import LOGO from "../Assets/LOGO.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const onClick = (e) => {
    if (e == "signup") {
      navigate("/signup");
    } else if (e == "login") {
      navigate("/login");
    }
  };

  return (
    <>
      <nav className="bg-black flex items-center justify-between p-5">
        <img src={LOGO} className="w-72" alt="" />
        <input
          className="h-10 w-96 outline-none pl-4 rounded-sm text-md hover:shadow-sm hover:duration-300 hover:shadow-white"
          type="text"
        />
        <div className="flex gap-10">
          <button
            onClick={() => onClick("login")}
            className="w-28 rounded py-2 my-2 bg-white font-medium "
          >
            Login
          </button>
          <button
            onClick={() => onClick("signup")}
            className="w-28 rounded py-2 my-2 bg-white font-medium "
          >
            Sign UP
          </button>
        </div>
      </nav>
    </>
  );
}

export default HomePage;
