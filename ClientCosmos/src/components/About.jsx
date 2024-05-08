import { motion } from "framer-motion";
import React from "react";
import WHAM from "../Assets/WHAM.png";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  const topics = [
    "HOME",
    "SOLAR SYSTEM",
    "STARS",
    "GALAXIES",
    "NEBULAS",
    "BLACK HOLES",
  ];
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
  const ProfileClick = (e) => {
    switch (e) {
      case "Home":
        navigate("/HomePage");
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

  return (
    <motion.div
      className="bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 tracking-widest text-center">
          ABOUT US
        </h1>
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle " />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="drawer-button">
              <img
                src={WHAM}
                className="w-9 drawer-button mt-5 ml-10 cursor-pointer"
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
              <li className="mt-5 w-full" onClick={() => ProfileClick("Home")}>
                <button className=" text-black font-poppins mt-4 py-3 px-5 border shadow-md rounded-sm">
                  HOME
                </button>
              </li>
              <li className="dropdown  w-full dropdown-right">
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
                      <li onClick={() => NavigateTopics(topic)}>
                        <a
                          key={index}
                          className="hover:shadow-md rounded-sm duration-200"
                        >
                          {topic}
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
            </ul>
          </div>
        </div>
        <div className="flex justify-center ">
          <p className="mb-6 mt-10 text-center w-4/5">
            Welcome to our celestial haven, where the wonders of the cosmos
            converge! Founded by Muhammed Musthafa, a passionate enthusiast of
            the universe's mysteries, this website is a labor of love dedicated
            to all things astronomical.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-2 mt-8 tracking-wider text-center">
          OUR AIM
        </h2>
        <div className="flex justify-center ">
          <p className="mb-6 w-4/5 text-center">
            At the heart of our endeavor lies a simple yet profound mission: to
            cultivate a vibrant platform for fellow astronomy aficionados.
            Whether you're an amateur stargazer or a seasoned astrophysicist, we
            aspire to be your go-to destination for exploring the cosmos in all
            its breathtaking grandeur.
          </p>
        </div>
        <h2 className="text-3xl font-bold mb-2  mt-9 tracking-wider text-center">
          What We Offer
        </h2>
        <div className="flex justify-center ">
          <p className="mb-6 w-4/5 text-center">
            From the familiar embrace of our own solar system to the
            mind-boggling expanse of distant galaxies, we strive to provide
            comprehensive insights into every facet of the universe. Dive into
            the intricate dance of stars, marvel at the enigmatic beauty of
            nebulas, ponder the unfathomable depths of black holes, and witness
            the cataclysmic spectacle of supernovas.
          </p>
        </div>
        <div></div>
        <h2 className=" font-bold mb-2 text-center text-3xl mt-8">
          Contact Us
        </h2>
        <div className="flex justify-center">
          <p className="mb-4">
            For inquiries, suggestions, or just to share your own cosmic
            musings, feel free to reach out to us:
          </p>
        </div>
        <div className="grid justify-center">
          <ul className="mb-6 text-center">
            <li>
              <strong>Name:</strong> Muhammed Musthafa
            </li>
            <li>
              <strong>Phone:</strong> 9037972149
            </li>
            <li>
              <strong>Email:</strong> musthafacp0007@gmail.com
            </li>
          </ul>
        </div>

        <p className="text-center mb-10 mt-10 text-">
          Join us on this celestial journey as we embark on a quest to unravel
          the mysteries of the cosmos together. Welcome aboard!
        </p>
      </div>
    </motion.div>
  );
}

export default About;
