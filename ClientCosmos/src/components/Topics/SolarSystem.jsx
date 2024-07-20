import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BHAM from "../../Assets/BHAM.png";
import Cookies from "js-cookie";
import axios from "axios";
import useUserData from "../utils/UserData";

function SolarSystem({ setSelectedNews }) {
  const [showAnswerIndex, setShowAnswerIndex] = useState(-1);
  const navigate = useNavigate();
  const { userData } = useUserData();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ProfileClick = (index) => {
    setShowAnswerIndex(showAnswerIndex === index ? -1 : index);
  };

  const selectedNews = (e) => {
    setSelectedNews(e);
    navigate("/selenews");
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

  const planets = [
    {
      name: "MERCURY",
      image:
        "https://cdn.mos.cms.futurecdn.net/fjbeeRiPRQjQNhizwy7cWX-1200-80.jpg",
    },
    {
      name: "VENUS",
      image:
        "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRtqGYOVmn7rlUHM47dO2MUGjjqp-NkClqUJ7QIxAwGAulcM5kvScQrZSkfglqd92ua",
    },
    {
      name: "EARTH",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/1024px-The_Blue_Marble_%28remastered%29.jpg",
    },
    {
      name: "MARS",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png",
    },
    {
      name: "JUPITER",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Jupiter_New_Horizons.jpg/290px-Jupiter_New_Horizons.jpg",
    },
    {
      name: "SATURN",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/800px-Saturn_during_Equinox.jpg",
    },
    {
      name: "URANUS",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/69/Uranus_Voyager2_color_calibrated.png",
    },
    {
      name: "NEPTUNE",
      image:
        "https://cdn.mos.cms.futurecdn.net/PezBzd9Fehsq9XWgWMauVV-1200-80.jpg",
    },
  ];

  const discovermore = [
    {
      title: "NEBULAS",
      imageUrl:
        "https://www.nasa.gov/wp-content/uploads/2022/10/stsci-01gfnn3pwjmy4rqxkz585bc4qh.png",
    },
    {
      title: "BLACK HOLE",
      imageUrl:
        "https://assets.newatlas.com/dims4/default/942c058/2147483647/strip/true/crop/3240x2160+300+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F89%2F8e%2Fd8cd992244949347b56b2b77fc97%2Fblack-hole-disc.jpg",
    },
    {
      title: "GALAXIES",
      imageUrl:
        "https://images.pexels.com/photos/821644/pexels-photo-821644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "STARS",
      imageUrl:
        "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2dldHR5aW1hZ2VzLTE0MDYxNzQxMjEuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoiMTIwMCJ9fX0=",
    },
  ];

  const newsData = [
    {
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcCKnOT1Ia80k8D_tp0iJbxq8QI6OH1iQwNKkoBmAa8A&s",
      title: "Venus has almost no water: A new study may reveal why",
      description: `The new study fills in a big gap in what the researchers call "the water story on Venus." Using computer simulations, the team found that hydrogen atoms in the planet's atmosphere go whizzing into space through a process known as "dissociative recombination" -- causing Venus to lose roughly twice as much water every day compared to previous estimates.`,
      datePosted: "13/03/2024",
    },
    {
      imageUrl:
        "data:image/jpeg;base64,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",
      title: "Astronomers uncover methane emission on a cold brown dwarf",
      description: `Using new observations from the James Webb Space Telescope (JWST), astronomers have discovered methane emission on a brown dwarf, an unexpected finding for such a cold and isolated world. Published in the journal Nature, the findings suggest that this brown dwarf might generate aurorae similar to those seen on our own planet as well as on Jupiter and Saturn.`,
      datePosted: "13/03/2024",
    },
    {
      imageUrl:
        "https://science.nasa.gov/wp-content/uploads/2024/05/webb-stsci-01hwqz51tykxttfapc9rq0fnje.png?w=1536&format=webp",
      title:
        "NASA’s Webb Hints at Possible Atmosphere Surrounding Rocky Exoplanet",
      description: `Researchers using NASA’s James Webb Space Telescope may have detected atmospheric gases surrounding 55 Cancri e, a hot rocky exoplanet 41 light-years from Earth. This is the best evidence to date for the existence of any rocky planet atmosphere outside our solar system. 

      Renyu Hu from NASA’s Jet Propulsion Laboratory (JPL) in Pasadena, California, is lead author on a paper published today in Nature. “Webb is pushing the frontiers of exoplanet characterization to rocky planets,” Hu said. “It is truly enabling a new type of science.”
      
      `,
      datePosted: "13/03/2024",
    },
    {
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzSZ6Fc8qz9r_Rrk3J8ABQ00YufNqxRfwtbg&s",
      title:
        "Juno spacecraft measures oxygen production on Jupiter's moon, Europa",
      description: `NASA's Juno spacecraft has directly measured charged oxygen and hydrogen molecules from the atmosphere of one of Jupiter's largest moons, Europa. According to a new study co-authored by SwRI scientists and led by Princeton University, these observations provide key constraints on the potential oxygenation of its subsurface ocean.      `,
      datePosted: "13/03/2024",
    },
  ];

  const discoverTopics = (e) => {
    switch (e) {
      case "profile":
        navigate("/profile");
        break;
      case "HOME":
        navigate("/HomePage");
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
    <>
      <div className="py-10 px-10 bg-black">
        <nav className="flex px-10 items-center bg-gray-200 justify-between py-3 ">
          <ul className="flex gap-10 text-lg ml-6">
            <li
              onClick={() => discoverTopics("HOME")}
              className=" cursor-pointer hover:scale-105 duration-300"
            >
              HOME
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

        <div
          className="h-screen bg-cover mt-10"
          style={{
            backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/f/fb/Solar_System_true_color_%28captions%29.jpg)`,
          }}
        ></div>

        <div>
          <h2 className="text-6xl font-bold text-white mt-10">Overview</h2>

          <p className="text-xl font-light text-white mt-7 leading-10">
            The solar system has one star, eight planets, five dwarf planets, at
            least 290 moons, more than 1.3 million asteroids, and about 3,900
            comets. It is located in an outer spiral arm of the Milky Way galaxy
            called the Orion Arm, or Orion Spur. Our solar system orbits the
            center of the galaxy at about 515,000 mph (828,000 kph). It takes
            about 230 million years to complete one orbit around the galactic
            center.
          </p>
          <img
            className="my-10"
            src="https://science.nasa.gov/wp-content/uploads/2023/07/pia06890-our-solar-system-banner-1920x640-1.jpg?w=4096&format=jpeg"
            alt=""
          />
          <p className="text-xl font-light text-white mt-7 leading-10">
            We call it the solar system because it is made up of our star, the
            Sun, and everything bound to it by gravity – the planets Mercury,
            Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune; dwarf
            planets Pluto, Ceres, Makemake, Haumea, and Eris – along with
            hundreds of moons; and millions of asteroids, comets, and
            meteoroids.
          </p>
        </div>

        <div>
          <h2 className="text-5xl mt-10 font-bold text-white">The Sun</h2>
          <div className="flex justify-center mt-10">
            <iframe
              width="950"
              height="600"
              src="https://eyes.nasa.gov/apps/solar-system/#/sun?embed=true"
              frameborder="0"
            ></iframe>
          </div>
          <p className="text-xl font-light text-white mt-7 leading-10">
            The Sun is the star at the center of our solar system. It's a nearly
            perfect sphere of hot plasma, primarily composed of hydrogen and
            helium. It's about 4.6 billion years old and is the most important
            source of energy for life on Earth. The Sun's immense gravity holds
            the solar system together, and its energy fuels processes such as
            photosynthesis and weather patterns. It's also the primary driver of
            Earth's climate and weather systems.
          </p>
        </div>

        <div>
          <h2 className="text-5xl mt-10 font-bold text-white">Planets</h2>

          <p className="text-xl font-light text-white mt-7 leading-10">
            Planets are large celestial bodies that orbit stars and do not
            produce light of their own but instead reflect the light of their
            parent star. In our solar system, there are eight recognized
            planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and
            Neptune. These planets vary in size, composition, and
            characteristics.
          </p>
          <div className="w-full flex myPosts overflow-x-auto h-96 mt-16">
            {planets.map((planet, index) => (
              <div
                key={index}
                className="h-full flex items-end bg-cover bg-blue-600"
                style={{ backgroundImage: `url(${planet.image})` }}
              >
                <div className="w-72">
                  <h2 className="text-3xl text-white mb-7 ml-5 font-bold ">
                    {planet.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-5xl mt-10 font-bold text-white">
            Moons (Natural Satellites)
          </h2>

          <p className="text-xl font-light text-white mt-7 leading-10">
            Moons, also known as natural satellites, are objects that orbit
            planets, dwarf planets, or even other moons. They are held in orbit
            by the gravitational force exerted by the larger body they orbit.
            Moons vary widely in size, composition, and surface features.
          </p>

          <h2 className="text-4xl mt-10 font-bold text-white">
            Types of Moons
          </h2>
          <ul>
            <li className="text-xl font-light text-white mt-7 leading-10">
              <span className="font-bold">Regular Moons : </span> These are
              moons that orbit their parent planet in a relatively circular and
              stable orbit. Examples include Earth's moon (Luna) and Jupiter's
              largest moons, like Io, Europa, Ganymede, and Callisto.
            </li>
            <li className="text-xl font-light text-white mt-7 leading-10">
              <span className="font-bold">Irregular Moons : </span> These moons
              have more eccentric orbits and are often captured asteroids or
              debris. They may have irregular shapes and are generally smaller
              compared to regular moons. An example is Phobos and Deimos, the
              two moons of Mars.
            </li>
          </ul>

          <h2 className="text-4xl mt-20 text-white font-poppins">
            Essential Moon Facts
          </h2>
          <ul className="text-white">
            <li className="mt-6">
              <h2 className="text-2xl font-semibold">LARGEST</h2>
              <p className="mt-2 text-xl font-light">
                Ganymede, the largest moon of Jupiter and the largest moon in
                the solar system.
              </p>
            </li>
            <li className="mt-6">
              <h2 className="text-2xl font-semibold">Smallest Moon</h2>
              <p className="mt-2 text-xl font-light">
                Some of the smallest moons in the solar system include some of
                the irregular moons of the gas giants, which are often less than
                a few kilometers in diameter.
              </p>
            </li>

            <li className="mt-6">
              <h2 className="text-2xl font-semi-bold">Notable Moons</h2>
              <p className="mt-2 text-xl font-light">
                Apart from Earth's moon, other notable moons include Titan, the
                largest moon of Saturn and the only moon in the solar system
                with a significant atmosphere, and Io, one of the most
                volcanically active bodies in the solar system, also orbiting
                Jupiter.
              </p>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-5xl mt-10 font-bold text-white">Asteroids</h2>
          <div className="flex justify-center">
            <img
              className="w-2/4"
              src="https://th-thumbnailer.cdn-si-edu.com/moAtK8DFsqJjY4Xmo0_9KR1fz1M=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/26/95/269501a4-6bc9-41ad-8bd9-5cb990becb4e/eros.jpg"
              alt=""
            />
          </div>
          <p className="text-xl font-light text-white mt-7 leading-10">
            Asteroids are rocky objects that orbit the Sun, primarily found in
            the asteroid belt, which is situated between the orbits of Mars and
            Jupiter. They are remnants from the early formation of the solar
            system, often considered as leftover building blocks that never
            coalesced into planets. Asteroids vary greatly in size, shape,
            composition, and orbital characteristics.
          </p>
        </div>
        <div>
          <h2 className="text-5xl mt-10 font-bold text-white">Comets</h2>
          <div className="flex justify-center">
            <img
              className="w-2/4 mt-14"
              src="https://smd-cms.nasa.gov/wp-content/uploads/2023/07/Giotto_halley_br.jpg"
              alt=""
            />
          </div>
          <p className="text-xl font-light text-white mt-7 leading-10">
            Asteroids are rocky objects that orbit the Sun, primarily found in
            the asteroid belt, which is situated between the orbits of Mars and
            Jupiter. They are remnants from the early formation of the solar
            system, often considered as leftover building blocks that never
            coalesced into planets. Asteroids vary greatly in size, shape,
            composition, and orbital characteristics.
          </p>
        </div>
        <div>
          <h2 className="text-5xl mt-10 font-bold text-white">Dwarf Planets</h2>
          <div className="flex justify-center">
            <img
              className="w-2/4 mt-14"
              src="https://science.nasa.gov/wp-content/uploads/2023/07/dwarf-planets.jpg?w=1920"
              alt=""
            />
          </div>
          <p className="text-xl font-light text-white mt-7 leading-10">
            Celestial bodies that orbit the Sun and are massive enough to be
            roughly spherical in shape but have not cleared their orbits of
            other debris. Pluto, formerly considered the ninth planet, was
            reclassified as a dwarf planet in 2006. Other examples include Eris,
            Haumea, and Makemake.
          </p>
        </div>
        <div>
          <h2 className="text-5xl mt-10 font-bold text-white">
            Kuiper Belt and Oort Cloud
          </h2>
          <div className="flex justify-center">
            <img
              className="w-2/4 mt-14"
              src="https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2014/12/kuiper_belt_and_oort_cloud_in_context/15106869-6-eng-GB/Kuiper_Belt_and_Oort_Cloud_in_context.jpg"
              alt=""
            />
          </div>
          <p className="text-xl font-light text-white mt-7 leading-10">
            The Kuiper Belt is a doughnut-shaped region of icy bodies extending
            far beyond the orbit of Neptune. It is home to Pluto and Arrokoth.
            Both worlds were visited by NASA's New Horizons spacecraft. There
            may be millions of other icy worlds in the Kuiper Belt that were
            left over from the formation of our solar system. Scientists call
            these worlds Kuiper Belt objects (KBOs), or trans-Neptunian objects
            (TNOs). Trans-Neptunian objects are objects in our solar system that
            have an orbit beyond Neptune.
          </p>
        </div>

        <div>
          <h2 className="text-5xl text-white font-bold mt-10">
            Related solarsystem newses
          </h2>

          <div>
            <div className="grid gap-10 mt-10">
              {newsData.map((news, index) => (
                <div
                  key={index}
                  onClick={() => selectedNews(news)}
                  className="border-gray-700 border text-white cursor-pointer flex overflow-auto duration-500"
                >
                  <img className="w-64 h-64" src={news.imageUrl} alt="" />
                  <div className="my-3 mx-5">
                    <h2 className="text-3xl mt-3 font-semibold line-clamp-2 font-poppins">
                      {news.title}
                    </h2>
                    <p className="line-clamp-4 font-light text-lg leading-8 mt-2">
                      {news.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
                  <p className="text-white font-light">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 className="text-4xl text-white font-bold mt-40">
          Discover More Topics
        </h2>
        <div className="mt-7 flex max-w-screen overflow-x-auto gap-11">
          {discovermore.map((item, index) => (
            <div
              key={index}
              onClick={() => discoverTopics(item.title)}
              className="h-96 cursor-pointer w-80 bg-black border-gray-700 border flex items-end bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${item.imageUrl})`,
              }}
            >
              <h2 className="text-3xl font-bold text-white mb-7 pl-5">
                {item.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SolarSystem;
