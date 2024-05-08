import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BHAM from "../../Assets/BHAM.png";

function SolarSystem() {
  const [showAnswerIndex, setShowAnswerIndex] = useState(-1);

  const navigate = useNavigate();

  const ProfileClick = (index) => {
    setShowAnswerIndex(showAnswerIndex === index ? -1 : index);
  };

  const data = [
    {
      question: "What are 9 planets in order?",
      answer:
        "In order of distance from the sun they are; Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Pluto, which until recently was considered to be the farthest planet, is now classified as a dwarf planet. Additional dwarf planets have been discovered farther from the Sun than Pluto.",
    },
    {
      question: "Are there 8 or 9 planets in the solar system?",
      answer:
        "Our solar system is made up of a star—the Sun—eight planets, 146 moons, a bunch of comets, asteroids and space rocks, ice, and several dwarf planets, such as Pluto. The eight planets are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Mercury is closest to the Sun. Neptune is the farthest.",
    },
  ];

  const Naviagtion = (e) => {
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
      case "BLACK HOLES":
        navigate("/blackholes");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="py-10 px-10 bg-black">
        <nav className="flex px-10 items-center bg-gray-200 justify-between py-3 ">
          <img src={BHAM} className="w-10 cursor-pointer" alt="" />
          <div className="w-full">
            <div className="flex bg-slate-100 w-2/4 ml-20 rounded-lg shadow-sm">
              <input
                type="text"
                id="hs-trailing-button-add-on-with-icon"
                name="hs-trailing-  button-add-on-with-icon"
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
          <div
            onClick={() => Naviagtion("profile")}
            className="flex items-center gap-3 justify-between cursor-pointer bg-gray-300 px-3 py-2 rounded-xl"
          >
            <div className="rounded">
              <img
                className="rounded-lg h-8"
                src="https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220"
              />
            </div>
            <div className="font-poppins text-sm">Musthafaaa</div>
          </div>
        </nav>

        <div
          className="h-screen bg-cover mt-10"
          style={{
            backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/f/fb/Solar_System_true_color_%28captions%29.jpg)`,
          }}
        ></div>

        <div className="mx-auto px-4 py-12">
          <div className="mb-10">
            <p className="text-xl text-white">
              The Solar System is the gravitationally bound system of the Sun
              and the objects that orbit it. It was formed 4.6 billion years ago
              when a dense region of a molecular cloud collapsed, forming the
              Sun and a protoplanetary disc.
              <span className="ml-2">
                <a
                  href="https://en.wikipedia.org/wiki/Solar_System"
                  className="text-blue-500"
                >
                  Know more
                </a>
              </span>
            </p>
          </div>
          <h2 className="text-white text-3xl font-poppins">Whats in the center of our solar system ?</h2>
          <p className="text-white text-xl mt-2"> 
            Sun is a star at the center of the solar system, primarily composed of
            hydrogen and helium. It provides light and heat through nuclear
            fusion reactions in its core.
          </p>
          {/* <div className="grid gap-8">
            <div className="space-y-4 bg-gray-100 rounded-lg shadow-md px-6 py-4">
              <p className="text-xl font-medium ">The Sun</p>
              <p>
                The star at the center of the solar system, primarily composed
                of hydrogen and helium. It provides light and heat through
                nuclear fusion reactions in its core.
              </p>
            </div>
            <div className="space-y-4 bg-gray-100 rounded-lg shadow-md px-6 py-4">
              <p className="text-xl font-medium ">Planets</p>
              <ul className=" list-disc  pl-4">
                <li>
                  <a href="">Mercury</a>
                </li>
                <li>
                  <a href="">Venus</a>
                </li>
                <li>
                  <a href="">Earth</a>
                </li>
                <li>
                  <a href="">Mars</a>
                </li>
                <li>
                  <a href="">Jupiter</a>
                </li>
                <li>
                  <a href="">Saturn</a>
                </li>
                <li>
                  <a href="">Uranus</a>
                </li>
                <li>
                  <a href="">Neptune</a>
                </li>
              </ul>
            </div>
            <div className="space-y-4 bg-gray-100 rounded-lg shadow-md px-6 py-4">
              <p className="text-xl font-medium ">Moons (Natural Satellites)</p>
              <p>
                Many planets in the solar system have moons orbiting around
                them. These moons vary in size and composition and can have
                complex geological features.
              </p>
            </div>
            <div className="space-y-4 bg-gray-100 rounded-lg shadow-md px-6 py-4">
              <p className="text-xl font-medium ">Asteroids</p>
              <p>
                Rocky objects that orbit the Sun, primarily found in the
                asteroid belt between Mars and Jupiter. They vary in size from
                tiny rocks to several hundred kilometers in diameter.
              </p>
            </div>
            <div className="space-y-4 bg-gray-100 rounded-lg shadow-md px-6 py-4">
              <p className="text-xl font-medium ">Comets</p>
              <p>
                Icy bodies that orbit the Sun in highly elliptical orbits. When
                they approach the Sun, they develop a visible coma (a fuzzy
                atmosphere) and sometimes a tail due to the heat of the Sun
                sublimating the ice and gases.
              </p>
            </div>
            <div className="space-y-4 bg-gray-100 rounded-lg shadow-md px-6 py-4">
              <p className="text-xl font-medium ">Dwarf Planets</p>
              <p>
                Celestial bodies that orbit the Sun and are massive enough to be
                roughly spherical in shape but have not cleared their orbits of
                other debris. Pluto, formerly considered the ninth planet, was
                reclassified as a dwarf planet in 2006. Other examples include
                Eris, Haumea, and Makemake.
              </p>
            </div>
            <div className="space-y-4 bg-gray-100 rounded-lg shadow-md px-6 py-4">
              <p className="text-xl font-medium ">Kuiper Belt and Oort Cloud</p>
              <p>
                Regions beyond the orbit of Neptune where many icy bodies,
                including dwarf planets and comets, are found. The Kuiper Belt
                is a disk-like region just beyond Neptune, while the Oort Cloud
                is a spherical shell of icy objects extending much farther from
                the Sun.
              </p>
            </div>
            <div className="space-y-4 bg-gray-100 rounded-lg shadow-md px-6 py-4">
              <p className="text-xl font-medium ">Formation</p>
              <p>
                The solar system formed approximately 4.6 billion years ago from
                a giant cloud of gas and dust called the solar nebula. Over
                time, gravity caused the material in the nebula to clump
                together, eventually forming the Sun and the various objects
                that make up the solar system.
              </p>
            </div>
          </div> */}
          <h2 className="text-4xl font-poppins mt-14 text-white">
            People also ask:
          </h2>

          <div className="">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 text-white px-10 py-4 text-xl w-full mt-5"
            >
              <div className="flex font-semibold justify-between">
                <h2>{item.question}</h2>
                <h2
                  className="cursor-pointer duration-500"
                  onClick={() => ProfileClick(index)}
                  style={{
                    transform:
                      showAnswerIndex === index
                        ? "rotate(180deg)"
                        : "rotate(45deg)",
                  }}
                >
                  <img
                    className="w-5"
                    src="data:image/png;base64,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"
                    alt=""
                  />
                </h2>
              </div>
              {showAnswerIndex === index && (
                <div className=" bg-gray-900 w-full mt-5">
                  <p className="text-white mb-3">ANSWER</p>
                  <p className="text-white">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        </div>
      </div>
    </>
  );
}

export default SolarSystem;
