import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Earth({ setSelectedNews }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate()

  const [userData, setUserData] = useState(null);

  const getUserdata = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/getAsingleUser/${id}`
      );
      setUserData(response.data);
    } catch (err) {
      console.log("Error while getting the profile data", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.post(
            "http://localhost:3000/users/tokenvalidate",
            { token }
          );
          const { user, valid } = response.data;
          if (user) {
            getUserdata(user._id);
          }
        } catch (error) {
          Cookies.remove("token");
          console.error("Error in post request", error.response.data.error);
        }
      } else {
        console.log("Token is not there");
      }
    };

    fetchData();
  }, []);

  const discoverTopics = (e) => {
    switch (e) {
      case "profile":
        navigate("/profile");
        break;
      case "HOME":
        navigate("/earth");
        break;
      case "SOLAR SYSTEM":
        navigate("/solarsystem");
        break;
      case "STARS":
        navigate("/stars");
        break;
      case "GALAXIES":
        navigate("/galaxies");
        break;
      case "SUPERNOVAS":
        navigate("/supernovas");
        break;
      case "NEBULAS":
        navigate("/nebulas");
        break;
      case "BLACK HOLE":
        navigate("/blackholes");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <nav className="flex px-10 items-center bg-gray-200 justify-between py-3 ">
        <ul className="flex gap-10 text-lg ml-6">
          <li
            onClick={() => discoverTopics("HOME")}
            className=" cursor-pointer hover:scale-105 duration-300"
          >
            HOME
          </li>
          <li
            onClick={() => discoverTopics("EARTH")}
            className=" cursor-pointer hover:scale-105 duration-300"
          >
            EARTH
          </li>
          <li
            onClick={() => discoverTopics("STARS")}
            className=" cursor-pointer hover:scale-105 duration-300"
          >
            STARS
          </li>
          <li
            onClick={() => discoverTopics("GALAXIES")}
            className=" cursor-pointer hover:scale-105 duration-300"
          >
            GALAXIES
          </li>
          <li
            onClick={() => discoverTopics("NEBULAS")}
            className=" cursor-pointer hover:scale-105 duration-300"
          >
            NEBULAE
          </li>
          <li
            onClick={() => discoverTopics("BLACK HOLE")}
            className=" cursor-pointer hover:scale-105 duration-300"
          >
            BLACK HOLE
          </li>
        </ul>
        <div className="flex items-center gap-3 justify-between cursor-pointer bg-gray-300 px-3 py-2 rounded-xl">
          <div onClick={() => discoverTopics("profile")} className="rounded">
            <img className="rounded-lg h-8" src={userData?.profilePic} />
          </div>
          <div className="font-poppins text-sm">{userData?.name}</div>
        </div>
      </nav>
    </div>
  );
}

export default Earth;
