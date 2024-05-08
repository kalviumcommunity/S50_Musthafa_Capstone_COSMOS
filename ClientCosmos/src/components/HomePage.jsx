import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import WHAM from "../Assets/WHAM.png";
import EARTH from "../Assets/EARTH.jpg";
import SOLARSYSTEM from "../Assets/SOLARSYSTEM1.webp";

function HomePage({ setSelectedNews }) {
  const navigate = useNavigate();
  const [valid, setValid] = useState("");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const newsData = [
    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/jXP7m9jGGM2XPS74BHoJq3-1200-80.jpg.webp",
      title:
        "The James Webb Space Telescope is digging deep into the mysteries of gas planets",
      description:
        "Some of the senior researchers thought that it would never be possible to do this, but with some more rigorous tests for a few months, we confirmed that we have done it",
      datePosted: "13/03/2024",
    },
    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/UsyVTcvivR63vNJx7NVf6D-970-80.jpg.webp",
      title: `SpaceX's Starship will go interstellar someday, Elon Musk says`,
      description: `A future iteration of Starship, which conducted its third-ever test flight last week, will go interstellar, according to SpaceX founder and CEO Elon Musk.
          "This Starship is designed to traverse our entire solar system and beyond to the cloud of objects surrounding us. A future Starship, much larger and more advanced, will travel to other star systems," Musk said via X early Monday morning (March 18).`,
      datePosted: "10/01/2024",
    },

    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/WgwHfgLumAtmUDDt98cU3J-650-80.jpg",
      title:
        "SpaceX launches 22 Starlink satellites from California in dusky evening liftoff ",
      description: `A Falcon 9 rocket carrying 22 Starlink spacecraft lifted off tonight from California's Vandenberg Space Force Base at 10:28 p.m. EDT (7:28 p.m. local California time; 0228 GMT on March 19).
                The Falcon 9's first stage came back to Earth about 8.5 minutes after liftoff as planned. It landed vertically on the droneship "Of Course I Still Love You," which was stationed in the Pacific Ocean.`,
      datePosted: "13/03/2024",
    },
    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/vjqUkRzRofzvfL5HxE8rdB-650-80.jpg.webp",
      title:
        "Thomas Stafford, NASA astronaut who led Apollo-Soyuz joint mission, dies at 93",
      description: `Former NASA astronaut Thomas Stafford, who flew to the moon before leading the first international space mission carried out by the United States and Russia, has died at the age of 93.
          Stafford's death on Monday (March 18) came after an extended illness, according to Max Ary, director of the Stafford Air and Space Museum in Oklahoma.
          `,
      datePosted: "02/02/2024",
    },
  ];

  const selectedNews = (e) => {
    setSelectedNews(e);
    navigate("/selenews");
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
          setUser(user);
          setValid(valid);
        } catch (error) {
          Cookies.remove("token");
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

  const NavigateTopics = (e) => {
    switch (e) {
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
      case "NEBULAS":
        navigate("/nebulas");
        break;
      case "BLACK HOLES":
        navigate("/blackholes");
        break;
      default:
        break;
    }
  };

  const LogOut = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/logout");
      console.log(response.data);
      if (response.status === 200) {
        Cookies.remove("token");
        window.location.reload();
      } else {
        console.error("Error while logging out:", response.data);
      }
    } catch (err) {
      console.error("Error while logging out", err);
    }
  };

  const ProfileClick = (e) => {
    switch (e) {
      case "profile":
        navigate("/profile");
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
      case "logout":
        LogOut();
        break;
      default:
        break;
    }
  };

  const topics = [
    {
      name: "HOME",
      imageUrl: EARTH,
    },
    {
      name: "SOLAR SYSTEM",
      imageUrl: SOLARSYSTEM,
    },
    {
      name: "STARS",
      imageUrl:
        "https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "GALAXIES",
      imageUrl:
        "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "NEBULAS",
      imageUrl:
        "https://media.istockphoto.com/id/1351809486/photo/abstract-deep-space-nebula-background.jpg?b=1&s=612x612&w=0&k=20&c=v3xgQPFBKo6d_EO9Qqb5jGb7k7vPCkba6NsZEPZdwZQ=",
    },
    {
      name: "BLACK HOLES",
      imageUrl:
        "https://s.yimg.com/zb/imgv1/b58b6f08-f6a8-36cd-8731-39ced65a2b75/t_500x300",
    },
  ];

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
      <div className="bg-black  py-10 px-10">
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
                className="w-[2.875rem] h-[2.875rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-black text-white hover:bg-gray-800 duration-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
              <div
                onClick={() => ProfileClick("profile")}
                className="flex items-center gap-3 justify-between cursor-pointer bg-gray-200 px-3 py-2 rounded-xl"
              >
                <div className="rounded">
                  <img
                    className="rounded-lg h-8"
                    src="https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220"
                  />
                </div>
                <div className="font-poppins text-sm">{user.name}</div>
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
                <div className="w-full text-black bg-white shadow-lg hover:bg-gray-100">
                  <div className="w-full  rounded-md p-4 ">
                    {/* Profile picture */}
                    <img
                      className="w-16 h-16 rounded-full mx-auto mb-2"
                      src="https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220"
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
              <li className="dropdown mt-5 w-full dropdown-right">
                <button className=" text-black flex justify-between w-full font-poppins mt-4 py-3 border shadow-md rounded-sm">
                  <span>EXPLORE TOPICS</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      ></path>
                    </svg>
                  </span>
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-white text-black rounded-sm w-52"
                >
                  {topics.map((topic, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => NavigateTopics(topic.name)}
                      >
                        <a className="hover:shadow-md rounded-sm duration-200">
                          {topic.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
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
              <li className="w-full" onClick={() => ProfileClick("logout")}>
                <button className=" text-black font-poppins mt-4 py-3 border shadow-md rounded-sm">
                  LOGOUT
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-3xl mt-7 text-white font-bold font-poppins">
            LATEST NEWS
          </h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mt-10">
            {newsData.map((news, index) => (
              <div
                key={index}
                onClick={() => selectedNews(news)}
                className="bg-white cursor-pointer overflow-auto  hover:rounded-md duration-500"
              >
                <img className="" src={news.imageUrl} alt="" />
                <div className="my-3 mx-5">
                  <h2 className="text-xl font-semibold line-clamp-2 font-poppins">
                    {news.title}
                  </h2>
                  <p className="line-clamp-3">{news.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl mt-7 text-white font-bold font-poppins">
            EXPLORE TOPICS
          </h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 mb-16 gap-10 mt-10">
            {topics.map((topic, index) => (
              <div
                key={index}
                onClick={() => NavigateTopics(topic.name)}
                className="h-36 shadow-sm cursor-pointer rounded-sm text-2xl font-bold bg-cover text-white pl-2 pt-24 transition duration-300 transform hover:scale-110"
                style={{ backgroundImage: `url(${topic.imageUrl})` }}
              >
                {topic.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="bg-black pt-20 text-white py-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <ul className="flex flex-wrap text-sm">
              <li className="mr-6">
                <Link to="" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li className="mr-6">
                <Link to="/about" className="hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li className="mr-6">
                <Link to="" className="hover:text-gray-300">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li className="mr-6">
                <Link to="" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li className="mr-6">
                <a href="" className="hover:text-gray-300">
                  Linkedin
                </a>
              </li>
              <li className="mr-6">
                <Link to="/about" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-sm text-center mt-4">
          &copy; Copyright 2023 Musthafa
        </div>

        <div className="text-sm text-center py-4">
          A project by Muhammed Musthafa CP
        </div>
      </footer>
    </>
  );
}

export default HomePage;
