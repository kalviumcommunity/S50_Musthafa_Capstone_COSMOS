import React, { useState, useEffect } from "react";
import LOGO from "../Assets/LOGO.png";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Cookies from "js-cookie";

function HomePage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const storedUserData = Cookies.get("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onClick = (e) => {
    if (e === "signup") {
      
      navigate("/signup");
    } else if (e === "login") {
      navigate("/login");
    }
  };

  const ProfileClick = () => {
    navigate("/profile")
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="fade-in">
          <nav className="bg-black flex items-center justify-between p-5">
            <img src={LOGO} className="w-72" alt="" />
            <input
              className="h-10 w-96 outline-none pl-4 rounded-sm text-md hover:shadow-sm hover:duration-300 hover:shadow-white"
              type="text"
              placeholder="Search Here"
            />
            <div className="flex pr-16 gap-10">
              { userData ? (
                <div onClick={ProfileClick} className="flex gap-5 items-center cursor-pointer">
                    <img
                    src="https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
                    className="border rounded-full w-10"
                    alt=""
                  />
                  <h1 className="text-white text-xl">{userData.username}</h1>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => onClick("login")}
                    className="w-28 rounded py-2 my-2 bg-white font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => onClick("signup")}
                    className="w-28 rounded py-2 my-2 bg-white font-medium"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default HomePage;
