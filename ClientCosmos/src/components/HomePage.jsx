import React, { useState, useEffect } from "react";
import LOGO from "../Assets/LOGO.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import WHAM from "../Assets/WHAM.png";
import BHAM from "../Assets/BHAM.png";
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

  const onClick = (e) => {
    if (e === "signup") {
      navigate("/signup");
    } else if (e === "login") {
      navigate("/login");
    }
  };

  const ProfileClick = (e) => {
    switch (e) {
      case "profile":
        // Navigate to the user's profile page
        navigate("/profile");
        break;
      case "explore":
        // Navigate to the explore topics page
        navigate("/explore");
        break;
      case "communities":
        // Navigate to the communities page
        navigate("/communities");
        break;
      case "userPosts":
        // Navigate to the user's posts page
        navigate("/userPosts");
        break;
      default:
        break;
    }
  };

  return (
    <>
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
              // onClick={ProfileClick}
              // className="flex gap-3   items-center cursor-pointer"
              >
                {/* <img
                  src="https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
                  className="border rounded-full w-10"
                  alt=""
                />
                <h1 className="text-black text-xl">{userData.username}</h1> */}
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
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle " />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="drawer-button">
              <img
                src={WHAM}
                className="w-9 drawer-button mt-10 cursor-pointer"
                alt=""
              />
            </label>
          </div>
          <div className="drawer-side ">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="menu pt-10 p-7 w-80 min-h-full bg-white flex items-center text-base-content">
              <li className="w-full" onClick={() => ProfileClick("profile")}>
                <div className="w-full text-black bg-white shadow-lg hover:bg-gray-950 hover:text-white">
                  <div className="w-full  rounded-md p-4 ">
                    {/* Profile picture */}
                    <img
                      className="w-16 h-16 rounded-full mx-auto mb-2"
                      src="https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
                      alt="Profile"
                    />

                    {/* Name */}
                    <h2 className="text-center  font-semibold text-lg mb-2">
                      John Doe
                    </h2>
                  </div>
                  <p className="text-sm line-clamp-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </p>
                </div>
              </li>
              <div className="mt-14 text-start text-black w-full">
                <h2 className="font-poppins font-semibold text-3xl">EXPLORE</h2>
              </div>
              <li
                className="mt-5 w-full"
                onClick={() => ProfileClick("explore")}
              >
                <button className=" text-black font-poppins mt-4 py-3 border shadow-md rounded-sm">
                  EXPLORE TOPICS
                </button>
              </li>
              <li
                className="w-full"
                onClick={() => ProfileClick("communities")}
              >
                <button className=" text-black font-poppins mt-4 py-3 border shadow-md rounded-sm">
                  COMMUNITIES
                </button>
              </li>
              <li className=" w-full" onClick={() => ProfileClick("userPosts")}>
                <button className=" text-black font-poppins mt-4 py-3 px-5 border shadow-md rounded-sm">
                  USER POSTS
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
