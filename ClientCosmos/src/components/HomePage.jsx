import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import WHAM from "../Assets/WHAM.png";
import EARTH from "../Assets/EARTH.jpg";
import SOLARSYSTEM from "../Assets/SOLARSYSTEM1.webp";
import commenticon from "../Assets/commenticon.png";
import useUserData from "./utils/UserData";

function HomePage({ setSelectedNews }) {
  const { valid, userData, loading, setLoading } = useUserData();
  const navigate = useNavigate();
  const [apod, setAPOD] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [isLogoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [userposts, setUserposts] = useState(false);

  const selectedNews = (e) => {
    setSelectedNews(e);
    navigate("/selenews");
  };

  useEffect(() => {
    const fetchAstronomicPictureOfTheDay = async () => {
      try {
        const response = await axios.get(
          "https://s50-musthafa-capstone-cosmos.onrender.com/news/apod"
        );
        setAPOD(response.data);
      } catch (err) {
        console.log("Error while fetching APOD", err);
      }
    };

    const fetchNewsData = async () => {
      try {
        const response = await axios.get(
          "https://s50-musthafa-capstone-cosmos.onrender.com/news/getrandomnews"
        );
        setNewsData(response.data);
      } catch (err) {
        console.log("Error while fetching the news data", err);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          "https://s50-musthafa-capstone-cosmos.onrender.com/posts/getrandomposts"
        );
        setUserposts(response.data);
      } catch (err) {
        console.log("Error while fetching userPosts", err);
      }
    };

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    fetchAstronomicPictureOfTheDay();
    fetchNewsData();
    fetchUserPosts();
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
      case "SOLAR SYSTEM":
        navigate("/solarsystem");
        break;
      case "STARS":
        navigate("/stars");
        break;
      case "GALAXIES":
        navigate("/galaxies");
        break;
      case "NEBULAE":
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
    await axios
      .get("http://localhost:3000/auth/logout")
      .then((res) => {
        setLogoutPopupOpen(false);
        if (res.status === 200) {
          Cookies.remove("token");
          Cookies.remove("passwordisthere");
          window.location.reload();
        } else {
          console.error("Error while logging out:", response.data);
        }
      })
      .catch((err) => {
        console.log("Error while loggin out", err);
      });
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
      case "chats":
        navigate("/chats");
        break;
      case "news":
        navigate("/news");
        break;
      case "settings":
        navigate("/settings");
        break;
      case "logout":
        LogOut();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isLogoutPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLogoutPopupOpen]);

  const topics = [
    {
      name: "SOLAR SYSTEM",
      imageUrl: SOLARSYSTEM,
    },
    {
      name: "STARS",
      imageUrl: "https://cdn.mos.cms.futurecdn.net/xKkFJqojdSd8vJuvCLs5mU.jpg",
    },
    {
      name: "GALAXIES",
      imageUrl:
        "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "NEBULAE",
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

  const handleLogout = () => {
    setLogoutPopupOpen(true);
  };

  const handleCancel = () => {
    setLogoutPopupOpen(false);
  };

  return (
    <>
      {isLogoutPopupOpen && (
        <div>
          <div className="overlay"></div>
          <div className="border logout-popup p-5 rounded flex flex-col justify-around text-center">
            <h2 className="text-xl mb-5 font-poppins">
              Are you sure you want to logout ?
            </h2>
            <div className="flex justify-evenly">
              <button
                className="py-2 px-5  bg-black text-white  tracking-wider "
                onClick={() => LogOut()}
              >
                Yes
              </button>
              <button
                className="py-2 px-5  border  text-black  hover:bg-gray-50"
                onClick={handleCancel}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-black  py-10 px-10">
        <nav className="flex px-10 items-center justify-between py-3 bg-gray-100">
          <div className="w-full">
            <ul className="flex gap-5">
              <li
                className="text-lg font-poppins cursor-pointer hover:scale-105 duration-300 px-5"
                onClick={() => {
                  window.location.reload();
                }}
              >
                HOME
              </li>
              <li
                className="text-lg font-poppins cursor-pointer hover:scale-105 duration-300 px-5"
                onClick={() => ProfileClick("news")}
              >
                NEWS
              </li>
              <li
                className="text-lg font-poppins cursor-pointer hover:scale-105 duration-300 px-5"
                onClick={() => ProfileClick("userPosts")}
              >
                POSTS
              </li>
              <li
                className="text-lg font-poppins cursor-pointer hover:scale-105 duration-300 px-5"
                onClick={() => ProfileClick("chats")}
              >
                CHATS
              </li>
            </ul>
          </div>
          <div className="flex gap-10">
            {valid ? (
              <div
                onClick={() => ProfileClick("profile")}
                className="flex items-center gap-3 justify-between cursor-pointer bg-gray-200 px-3 py-2 rounded-xl"
              >
                <div className="rounded">
                  <img
                    className="rounded-lg w-12 h-8"
                    src={userData?.profilePic}
                  />
                </div>
                <div className="font-poppins text-sm">{userData?.name}</div>
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

            <ul className="menu pt-10 p-7 w-[20vw] min-h-full z-50 bg-white flex items-center text-base-content">
              <li className="w-full" onClick={() => ProfileClick("profile")}>
                <div className="w-full  text-black flex gap-5  shadow-lg hover:bg-gray-300">
                  <img
                    className="w-16 h-16 rounded-lg mb-2"
                    src={userData?.profilePic}
                    alt="Profile"
                  />
                  <h2 className="text-center  font-semibold text-lg mb-2">
                    {userData?.name}
                  </h2>
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
                onClick={() => ProfileClick("chats")}
              >
                <button className=" text-black font-poppins mt-4 py-3 border shadow-md rounded-sm">
                  CHATS
                </button>
              </li>
              <li className="w-full" onClick={() => ProfileClick("settings")}>
                <button className=" text-black font-poppins mt-4 py-3 border shadow-md rounded-sm">
                  SETTINGS
                </button>
              </li>
              <li className="w-full" onClick={() => handleLogout()}>
                <button className=" text-black font-poppins mt-4 py-3 border shadow-md rounded-sm">
                  LOGOUT
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Astronimc picture of the day */}
        {apod.length != 0 ? (
          <div>
            <h1 className="text-3xl mt-7 text-white font-bold font-poppins">
              ASTRONOMIC PICTURE OF THE DAY
            </h1>
            <div className="flex justify-center">
              <div className="">
                <h2 className="text-2xl mt-8 text-white">
                  Title - <strong>{apod.title}</strong>
                </h2>
                <div className="w-[50vw]">
                  {apod.media_type === "image" ? (
                    <img className="mt-5" src={apod.hdurl} alt={apod.title} />
                  ) : (
                    <iframe
                      className="mt-5 h-lvh w-full"
                      src={apod.url}
                      title={apod.title}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
                <div className="mt-2 flex justify-between">
                  <p className="font-light text-white">Credits : NASA</p>
                  <p className="font-light text-white">Date : {apod.date}</p>
                </div>
              </div>
            </div>
            <p className="font-light mt-6 text-white">
              <strong>Explanation :</strong> {apod.explanation}
            </p>
          </div>
        ) : (
          <></>
        )}

        {/* latest news */}
        {newsData.length === 0 ? (
          <></>
        ) : (
          <div className="mt-10">
            <h2 className="text-3xl mt-7 text-white font-bold font-poppins">
              LATEST NEWS
            </h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mt-7">
              {newsData.map((news, index) => (
                <div
                  key={index}
                  onClick={() => selectedNews(news)}
                  className="bg-white cursor-pointer overflow-auto  hover:rounded-md duration-500"
                >
                  <img className="w-full h-52" src={news.imageUrl} alt="" />
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
        )}

        {/* userPosts  */}
        {userposts.length === 4 ? (
          <div className="mt-14">
            <h2 className="text-3xl mt-7 text-white font-bold font-poppins">
              USER POSTS
            </h2>
            <div className="flex gap-5 mt-7">
              {userposts &&
                userposts.map((post, index) => {
                  return (
                    <div
                      key={index}
                      className="p-5 w-96 border text-white rounded-sm hover:cursor-pointer"
                      onClick={() => {
                        navigate("/userPosts");
                      }}
                    >
                      <div
                        className="bg-cover h-80"
                        style={{
                          backgroundPosition: "center",
                          backgroundImage: `url(${post.image})`,
                        }}
                      ></div>
                      <h2 className="font-poppins line-clamp-1">
                        {post.caption}
                      </h2>
                      <div className="flex items-center gap-2">
                        <div className="flex justify-center items-center gap-1">
                          <label className="ui-bookmark">
                            <input type="checkbox" checked />
                            <div className="bookmark z-0">
                              <svg
                                viewBox="0 0 16 16"
                                style={{ marginTop: "4px" }}
                                className="bi bi-heart-fill mt-10"
                                height="20"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                                  fillRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          </label>
                          <h2 className="text-sm font-light">
                            {post.likes.length} Likes
                          </h2>
                        </div>
                        <div className="flex justify-center text-sm font-light items-center gap-1">
                          <img src={commenticon} className="w-5" alt="" />
                          <h2>{post.comments.length} Comments</h2>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* topics  */}
        <div className="mt-20">
          <h2 className="text-3xl mt-7 text-white font-bold font-poppins">
            EXPLORE TOPICS
          </h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 mb-16 gap-10 mt-10">
            {topics.map((topic, index) => (
              <div
                key={index}
                onClick={() => NavigateTopics(topic.name)}
                className="relative h-36 z-10 shadow-sm cursor-pointer rounded-sm text-2xl font-bold bg-cover text-white pl-2 pt-24 transition duration-300 transform hover:scale-105"
                style={{
                  backgroundImage: `url(${topic.imageUrl})`,
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black opacity-40 transition duration-200 hover:opacity-0"></div>
                <div className="relative z-10">{topic.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* footer about */}
      <footer className="bg-black  text-white px-20 py-8">
        <div className=" grid grid-cols-2 w-full">
          <div className=" md:mb-0">
            <h3 className="text-lg font-bold">Follow</h3>
            <div className="mt-4">
              <h1 className="text-lg">Visit Us</h1>
              <div className="font-light">
                <p>
                  30 Lamb's Conduit Street
                  <br />
                  Bloomsbury, London
                  <br />
                  WC1N 3LE
                </p>
                <p>
                  <a
                    href="mailto:musthafacp0007@gmail.com"
                    className="underline"
                  >
                    musthafacp0007@gmail.com
                  </a>
                </p>
                <p>+91 90 3797 2149</p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex items-center">
              <ul className="flex flex-wrap text-lg font-semibold">
                <li className="mr-6">
                  <Link
                    onClick={() => {
                      window.location.reload();
                    }}
                    className="hover:text-gray-300"
                  >
                    Home
                  </Link>
                </li>
                <li className="mr-6">
                  <Link to="/about" className="hover:text-gray-300">
                    About Us
                  </Link>
                </li>
                <li className="mr-6">
                  <a
                    href="https://www.linkedin.com/in/musthafa-cp-312b59287"
                    className="hover:text-gray-300"
                  >
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
            <h3 className="text-lg mb-2 mt-4 font-bold">Journal</h3>

            <p className="font-light">
              Join us on this celestial journey as we embark on a quest to
              unravel the mysteries of the cosmos together. Welcome aboard!
            </p>

            <div className="mt-2">
              <p className="text-sm">
                &copy; 2024 40 Musthafa cp. Powered by NASA
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
