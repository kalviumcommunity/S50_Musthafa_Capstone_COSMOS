import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import WHAM from "../Assets/WHAM.png";

function HomePage() {
  const navigate = useNavigate();

  const [valid, setValid] = useState("");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true); 

  const newsData = [
    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/RMH4iPBHsybrCo3WhDSfhF-650-80.jpg.webp",
      title: `Helping build instrument for Japanese Mars mission 'a favorite time' for new NASA astronaut (exclusive)`,
      content: `A new NASA astronaut already has a space mission ready for launch, but (spoiler alert!) he won't be on the rocket.
      NASA astronaut Andre Douglas, and a large international team, worked on the Martian Moons Exploration (MMX) mission,
       which is slated lift off in late 2026. Douglas played a role in creating a key Mars instrument while he was employed at Johns
        Hopkins University Applied Physics Laboratory (APL) in Baltimore, prior to joining NASA.`,
    },
    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/fHyEPhgy7R2Pkhx8DrXyrb-1200-80.jpg.webp",
      title: "China launches satellite to support future moon missions",
      content: `China launched a satellite toward the moon this week to help support the country's lunar ambitions.
                On Tuesday (March 19), a Long March 8 rocket took off from the Wenchang Satellite Launch Center on 
                the southern Chinese island of Hainan carrying the Queqiao-2 satellite. The spacecraft is what's known
                 as a relay satellite, meaning it will help pass messages back and forth between China's Chang'e moon 
                 spacecraft, as well as other vehicles on the lunar surface, and mission controllers on Earth.`,
    },
    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/ifG9uaGvRi7HsdAaQwL9vb-650-80.jpg.webp",
      title: "1 in 12 stars might have swallowed a planet",
      content: `About one in every 12 stars may have swallowed a planet, a new study finds.
      Previous research had discovered that some distant stars possess unusual levels of elements,
      such as iron, which one would expect to make up rocky worlds such as Earth. This and other evidence
      suggested that stars may sometimes ingest planets, but much remained uncertain about how often that might happen.
      One way to uncover more about planetary ingestion is to look at two stars born at the same time.
      Such twins should have a virtually identical composition, as they are both born from the same parent cloud of gas and dust.
      Any major chemical differences between these so-called "co-natal" stars may thus be a sign that one devoured a world.
      `,
    },
    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/o3egecNDBubCJmmEbLT3Db-1200-80.jpg.webp",
      title: "Total solar eclipse 2024: Live updates",
      content: "A total solar eclipse is coming to North America.",
    },
  ];


  useEffect(() => {
    const userDataString = Cookies.get("userData");
    let userData = "";

    try {
      userData = JSON.parse(userDataString);
    } catch (error) {
      console.error("Error parsing userData:", error);
    }
    setUser(userData);

    const fetchData = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.post(
            "http://localhost:3000/users/tokenvalidate",
            { token }
          );
          setValid(response.data.valid);
        } catch (error) {
          console.error("Error in post request", error.response.data.error);
        }
      } else {
        console.log("Token is not there");
      }
    };

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    fetchData();

    return () => clearTimeout(timer);
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
        navigate("/profile");
        break;
      case "explore":
        navigate("/explore");
        break;
      case "communities":
        navigate("/communities");
        break;
      case "userPosts":
        navigate("/userPosts");
        break;
      case "news":
        navigate("/news");
        break;
      default:
        break;
    }
  };

  // Render loading screen while loading is true
  if (loading) {
    return (
      <div className="w-screen h-screen bg-black grid justify-center items-center">
        <div className="loading-container">
          <div className="loader">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-black w-screen py-10 px-10 h-screen">
        <nav className="flex px-10 items-center justify-between py-3 bg-gray-100">
          <div className="w-full">
            <div className="flex bg-slate-100 w-2/4 rounded-lg shadow-sm">
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
            {valid ? (
              <div></div>
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
                <div className="w-full text-black bg-white shadow-lg hover:bg-gray-100">
                  <div className="w-full  rounded-md p-4 ">
                    {/* Profile picture */}
                    <img
                      className="w-16 h-16 rounded-full mx-auto mb-2"
                      src="https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
                      alt="Profile"
                    />

                    {/* Name */}
                    <h2 className="text-center  font-semibold text-lg mb-2">
                      {user.name}
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
              <li className=" w-full" onClick={() => ProfileClick("userPosts")}>
                <button className=" text-black font-poppins mt-4 py-3 px-5 border shadow-md rounded-sm">
                  USER POSTS
                </button>
              </li>
              <li className=" w-full" onClick={() => ProfileClick("news")}>
                <button className=" text-black font-poppins mt-4 py-3 px-5 border shadow-md rounded-sm">
                  NEWS
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
            </ul>
          </div>
        </div>
        <div className="">
          <h2 className="text-3xl mt-7 text-white font-bold font-poppins">
            LATEST NEWS
          </h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mt-10">
            {newsData.map((news, index) => (
              <div
                key={index}
                onClick={() => ProfileClick("news")}
                className="bg-white cursor-pointer duration-500"
              >
                <img className="" src={news.imageUrl} alt="" />
                <div className="my-3 mx-5">
                  <h2 className="text-xl font-semibold line-clamp-2 font-poppins">
                    {news.title}
                  </h2>
                  <p className="line-clamp-3">{news.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
