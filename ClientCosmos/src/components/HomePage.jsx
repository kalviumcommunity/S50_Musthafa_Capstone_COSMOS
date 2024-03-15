import React, { useState, useEffect } from "react";
import LOGO from "../Assets/LOGO.png";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Cookies from "js-cookie";
import WHAM from '../Assets/WHAM.png'
import BHAM from '../Assets/BHAM.png'
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
    navigate("/profile");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-black w-screen py-10 px-10 h-screen">
          <nav className="flex px-10 items-center justify-between py-3 bg-gray-100">
            {/* <img src={LOGO} className="w-72" alt="" /> */}
            <div>
              <div className="flex bg-slate-100 w-96 rounded-lg shadow-sm">
                <input
                  type="text"
                  id="hs-trailing-button-add-on-with-icon"
                  name="hs-trailing-button-add-on-with-icon"
                  placeholder="Search here"
                  className="py-3 px-4 block w-full shadow-lg rounded-s-lg text-sm focus:z-10 disabled:opacity-50 bg-white disabled:pointer-events-none dark:bg-white outline-none"
                />
                <button
                  type="button"
                  className="w-[2.875rem] h-[2.875rem]  flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-black text-white hover:bg-gray-800 duration-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex gap-10">
              {userData ? (
                <div
                  onClick={ProfileClick}
                  className="flex gap-3   items-center cursor-pointer"
                >
                  <img
                    src="https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
                    className="border rounded-full w-10"
                    alt=""
                  />
                  <h1 className="text-black text-xl">{userData.username}</h1>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => onClick("login")}
                    className="w-28 rounded-sm hover:shadow-md duration-500 py-2 my-2 bg-black font-poppins text-white "
                  >
                    Login
                  </button>
                  <button
                    onClick={() => onClick("signup")}
                    className="w-28 rounded-sm hover:shadow-md duration-500 py-2 my-2 bg-black font-poppins text-white "
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>
          <div>
                <img src={WHAM} className="w-9 mt-10 cursor-pointer" alt="" />
          </div>
        </div>

      )}
    </>
  );
}

export default HomePage;
