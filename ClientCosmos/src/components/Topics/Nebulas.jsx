import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BHAM from "../../Assets/BHAM.png";
import Cookies from "js-cookie";
import axios from "axios";
import useUserData from "../utils/UserData";

function Nebulas({ setSelectedNews }) {
  const navigate = useNavigate();
  const [showAnswerIndex, setShowAnswerIndex] = useState(-1);
  const {  userData } = useUserData();
  
  const ProfileClick = (index) => {
    setShowAnswerIndex(showAnswerIndex === index ? -1 : index);
  };
  const selectedNews = (e) => {
    setSelectedNews(e);
    navigate("/selenews");
  };
  

  const discoverTopics = (e) => {
    switch (e) {
      case "profile":
        navigate("/profile");
        break;
      case "HOME":
        navigate("/HomePage");
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

  const newsData = [
    {
      imageUrl:
        "https://science.nasa.gov/wp-content/uploads/2024/05/hubble-ngc4951-1ok-flatcrop-final.jpg?w=1536&format=webp",
      title: "Hubble Views a Galaxy with a Voracious Black Hole",
      description: `Bright, starry spiral arms surround an active galactic center in this new NASA Hubble Space Telescope image of the galaxy NGC 4951.

Located in the Virgo constellation, NGC 4951 is located roughly 50 million light-years away from Earth. It’s classified as a Seyfert galaxy, which means that it’s an extremely energetic type of galaxy with an active galactic nucleus (AGN). However, Seyfert galaxies are unique from other sorts of AGNs because the galaxy itself can still be clearly seen – different types of AGNs are so bright that it’s nearly impossible to observe the actual galaxy that they reside within.

AGNs like NGC 4951 are powered by supermassive black holes. As matter whirls into the black hole, it generates radiation across the entire electromagnetic spectrum, making the AGN shine brightly.

Hubble helped prove that supermassive black holes exist at the core of almost every galaxy in our universe. Before the telescope launched into low-Earth orbit in 1990, astronomers only theorized about their existence. The mission verified their existence by observing the undeniable effects of black holes, like jets of material ejecting from black holes and disks of gas and dust revolving around those black holes at very high speeds.

These observations of NGC 4951 were taken to provide valuable data for astronomers studying how galaxies evolve, with a particular focus on the star formation process. Hubble gathered this information, which is being combined with observations with the James Webb Space Telescope (JWST) to support a JWST Treasury program. Treasury programs collect observations that focus on the potential to solve multiple scientific problems with a single, coherent dataset and enable a variety of compelling scientific investigations.`,
      datePosted: "13/03/2024",
    },
    {
      imageUrl:
        "https://science.nasa.gov/wp-content/uploads/2024/04/hubble-ngc2217-potw2052a.jpg?w=1536&format=webp",
      title: `Hubble Spots a Magnificent Barred Galaxy`,
      description: `A future iteration of Starship, which conducted its third-ever test flight last week, will go interstellar, according to SpaceX founder and CEO Elon Musk.
The magnificent central bar of NGC 2217 (also known as AM 0619-271) shines bright in the constellation of Canis Major (The Greater Dog), in this image taken by the NASA/ESA Hubble Space Telescope. Roughly 65 million light-years from Earth, this barred spiral galaxy is a similar size to our Milky Way at 100,000 light-years across. Many stars are concentrated in its central region forming the luminous bar, surrounded by a set of tightly wound spiral arms.
The central bar in these types of galaxies plays an important role in their evolution, helping to funnel gas from the disk into the middle of the galaxy. The transported gas and dust are then either formed into new stars or fed to the supermassive black hole at the galaxy's center. Weighing from a few hundred to over a billion times the mass of our Sun, supermassive black holes are present in almost all large galaxies.`,
      datePosted: "10/01/2024",
    },

    {
      imageUrl:
        "https://science.nasa.gov/wp-content/uploads/2024/04/hubble-ngc3783-potw2416a.jpg?w=1536&format=webp",
      title: "Hubble Captures a Bright Galactic and Stellar Duo ",
      description: `This image from the NASA/ESA Hubble Space Telescope features NGC 3783, a bright barred spiral galaxy about 130 million light-years from Earth that also lends its name to the eponymous NGC 3783 galaxy group. Like galaxy clusters, galaxy groups are aggregates of gravitationally bound galaxies. Galaxy groups, however, are less massive and contain fewer members than galaxy clusters do: whereas galaxy clusters can contain hundreds or even thousands of constituent galaxies, galaxy groups do not typically include more than 50. The Milky Way is actually part of a galaxy group, known as the Local Group, which also holds two other large galaxies (Andromeda and the Triangulum galaxy), as well as several dozen satellite and dwarf galaxies. The NGC 3783 galaxy group contains 47 galaxies. It also seems to be at a fairly early stage of its evolution, making it an interesting object to study. 

      While the focus of this image is the spiral galaxy NGC 3783, the eye is equally drawn to the very bright object in the lower right part of this image. This is the star HD 101274. The perspective in this image makes the star and the galaxy look like close companions, but this is an illusion. HD 101274 lies only about 1,530 light-years from Earth, it is about 85,000 times closer than NGC 3783. This explains how a single star can appear to outshine an entire galaxy! 
      
      NGC 3783 is a type-1 Seyfert galaxy, which is a galaxy with a bright central region. Hubble captures it in incredible detail, from its glowing central bar to its narrow, winding arms and the dust threaded through them, thanks to five separate images taken in different wavelengths of light. In fact, the galactic center is so bright that it exhibits diffraction spikes, normally only seen on stars such as HD 101274.`,
      datePosted: "13/03/2024",
    },
    {
      imageUrl:
        "https://science.nasa.gov/wp-content/uploads/2024/04/hubble-arp72-potw2414a.jpg?w=1536&format=webp",
      title: "Hubble Peers at Pair of Closely Interacting Galaxies",
      description: `FThis image from the NASA/ESA Hubble Space Telescope features Arp 72, a very selective galaxy group that only includes two galaxies interacting due to gravity: NGC 5996 (the large spiral galaxy) and NGC 5994 (its smaller companion, in the lower left of the image). Both galaxies lie approximately 160 million light-years from Earth, and their cores are separated from each other by a distance of about 67,000 light-years. The distance between the galaxies at their closest points is even smaller, closer to 40,000 light-years. While this might sound vast, in galactic separation terms it is really quite close. For comparison, the distance between the Milky Way and its nearest independent galactic neighbor Andromeda is around 2.5 million light-years. Alternatively, the distance between the Milky Way and its largest and brightest satellite galaxy, the Large Magellanic Cloud (satellite galaxies orbit around another galaxy), is about 162,000 light-years.

      Given this and the fact that NGC 5996 is roughly comparable in size to the Milky Way, it is not surprising that NGC 5996 and NGC 5994 — separated by only about 40,000 light-years — are interacting with one another. In fact, the interaction likely distorted NGC 5996’s spiral shape. It also prompted the formation of the very long and faint tail of stars and gas curving away from NGC 5996, up to the top right of the image. This ‘tidal tail’ is a common phenomenon that appears when galaxies closely interact and is visible in other Hubble images of interacting galaxies. `,
      datePosted: "02/02/2024",
    },
  ];

  const data = [
    {
      question: "What are nebulas?",
      answer:
        "Nebulas are vast clouds of dust and gas in space. They can be regions where new stars are forming or the remnants of dead or dying stars.",
    },
    {
      question: "How are nebulas formed?",
      answer:
        "Nebulas are formed from the remnants of supernova explosions or by the gravitational collapse of gas and dust in space.",
    },
    {
      question: "What are the different types of nebulas?",
      answer:
        "There are several types of nebulas, including emission nebulae, reflection nebulae, and dark nebulae. Each type has unique characteristics and is formed under different conditions.",
    },
    {
      question: "What is the Orion Nebula?",
      answer:
        "The Orion Nebula is a famous emission nebula located in the constellation Orion. It is one of the brightest nebulae visible to the naked eye and is a region of active star formation.",
    },
    {
      question: "What do nebulas tell us about the universe?",
      answer:
        "Studying nebulas can provide valuable insights into the processes of star formation, the life cycles of stars, and the chemical composition of the universe.",
    },
    {
      question: "Are nebulas dangerous?",
      answer:
        "Nebulas are not dangerous to humans. While some nebulas may contain radiation or other hazards, they are typically so far away from Earth that they pose no threat.",
    },
  ];

  const discovermore = [
    {
      title: "GALAXIES",
      imageUrl:
        "https://images.pexels.com/photos/821644/pexels-photo-821644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "BLACK HOLE",
      imageUrl:
        "https://science.nasa.gov/wp-content/uploads/2023/06/blackhole-binary-mainsequence-jpg.webp?w=1536&format=webp",
    },
    {
      title: "STARS",
      imageUrl:
        "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2dldHR5aW1hZ2VzLTE0MDYxNzQxMjEuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoiMTIwMCJ9fX0=",
    },
    {
      title: "SOLAR SYSTEM",
      imageUrl: "https://cdn.mos.cms.futurecdn.net/v5n22xGyNNHLzSnSArbrVH.jpg",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black">
      <div className="px-10 py-10">
        <nav className="flex px-10 items-center bg-gray-200 justify-between py-3 ">
          <ul className="flex gap-10 text-lg ml-6">
            <li
              onClick={() => discoverTopics("HOME")}
              className=" cursor-pointer hover:scale-105 duration-300"
            >
              HOME
            </li>
            <li
              onClick={() => discoverTopics("SOLAR SYSTEM")}
              className=" cursor-pointer hover:scale-105 duration-300"
            >
              SOLAR SYSTEM
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

        <div className="flex justify-center mt-20 mb-10">
          <img
            className="w-2/4"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hs-2009-25-e-full.jpg/800px-Hs-2009-25-e-full.jpg"
            alt=""
          />
        </div>
        <h2 className="text-6xl font-bold text-white">Overview</h2>

        <p className="text-xl font-light text-white mt-7 leading-10">
          Delve into the captivating realms of space where beauty and mystery
          intertwine – nebulae. These celestial phenomena, characterized by
          their stunning displays of light and color, are among the most
          mesmerizing sights in the cosmos. Join us on a journey to unravel the
          secrets of these cosmic clouds and uncover the wonders they hold.
        </p>

        <h2 className="text-6xl font-bold text-white mt-10">
          What are Nebulae ?
        </h2>

        <p className="text-xl font-light text-white mt-7 leading-10">
          Nebulae are vast clouds of gas and dust scattered throughout galaxies,
          ranging in size from just a few light-years across to hundreds of
          light-years. They serve as stellar nurseries, where new stars are
          born, and as the graves of old stars, where they cast off their outer
          layers in spectacular displays of cosmic recycling.
        </p>

        <div className="mx-auto mt-8">
          <h2 className="text-5xl text-white font-bold mb-4">
            Types of Nebulae
          </h2>
          <div className="flex justify-center">
            <div className="grid mt-12 gap-6 w-3/4">
              <div className="">
                <h3 className="text-4xl font-semibold mb-2 text-white">
                  Emission Nebulae
                </h3>
                <div className="flex justify-center">
                  <img
                    className="w-2/4 my-10"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Ring_Nebula.jpg/330px-Ring_Nebula.jpg"
                    alt=""
                  />
                </div>
                <p className="text-xl font-light text-white mt-7 leading-10">
                  These nebulae glow brightly as a result of radiation from
                  nearby stars, often appearing red or pink due to the presence
                  of hydrogen gas.
                </p>
              </div>
              <div className="">
                <h3 className="text-4xl mt-10 font-semibold mb-2 text-white">
                  Reflection Nebulae
                </h3>
                <div className="flex justify-center">
                  <img
                    className="w-2/4 my-10"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJPmTqXPzt38ioIQ-3eouFZk6KD1yuptLHizyAJN-WUw&s"
                    alt=""
                  />
                </div>
                <p className="text-xl font-light text-white mt-7 leading-10">
                  These nebulae shine by reflecting the light of nearby stars,
                  appearing blue because they scatter shorter wavelengths of
                  light more effectively than longer ones.
                </p>
              </div>
              <div className="">
                <h3 className="text-4xl mt-10 font-semibold mb-2 text-white">
                  Dark Nebulae
                </h3>
                <div className="flex justify-center">
                  <img
                    className="w-2/4 my-10"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/All_Quiet_in_the_Nursery%3F.jpg/495px-All_Quiet_in_the_Nursery%3F.jpg"
                    alt=""
                  />
                </div>
                <p className="text-xl font-light text-white mt-7 leading-10">
                  Also known as absorption nebulae, these clouds of gas and dust
                  block the light from objects behind them, creating striking
                  silhouettes against the backdrop of space.
                </p>
              </div>
              <div className="">
                <h3 className="text-4xl mt-10 font-semibold mb-2 text-white">
                  Planetary Nebulae
                </h3>
                <div className="flex justify-center">
                  <img
                    className="w-2/4 my-10"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/NGC_6326_by_Hubble_Space_Telescope.jpg/330px-NGC_6326_by_Hubble_Space_Telescope.jpg"
                    alt=""
                  />
                </div>
                <p className="text-xl font-light text-white mt-7 leading-10">
                  Despite their name, these nebulae have nothing to do with
                  planets. They are formed when dying stars shed their outer
                  layers, creating intricate and often symmetrical structures.
                </p>
              </div>
              <div className="">
                <h3 className="text-4xl mt-10 font-semibold mb-2 text-white">
                  Supernova Remnants
                </h3>
                <div className="flex justify-center">
                  <img
                    className="w-2/4 my-10"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/450px-Crab_Nebula.jpg"
                    alt=""
                  />
                </div>
                <p className="text-xl font-light text-white mt-7 leading-10">
                  The remnants of massive stars that have exploded in supernova
                  events, these nebulae are crucial to our understanding of
                  stellar evolution and the dispersal of elements throughout the
                  universe.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-5xl mt-10 font-bold mb-2 text-white">
            Formation and Evolution:
          </h2>
          <p className="text-xl font-light text-white mt-7 leading-10">
            Nebulae, those captivating cosmic clouds, come into existence
            through a variety of intricate processes, each contributing to their
            awe-inspiring beauty and scientific significance.
            <br />
            <br />
            Firstly, the gravitational collapse of massive gas clouds initiates
            the birth of nebulae. These clouds, often composed primarily of
            hydrogen gas with traces of other elements, gradually coalesce under
            the influence of gravity. As the gas particles draw closer together,
            their gravitational potential energy is converted into heat, raising
            the temperature within the cloud. Eventually, this process triggers
            the onset of nuclear fusion in the core, marking the birth of a new
            star. Surrounding this nascent star, the remaining gas and dust form
            a nebula, acting as a stellar nursery where the star's siblings may
            also form.
            <br />
            <br />
            Additionally, shockwaves from supernova explosions play a crucial
            role in the formation of nebulae. When a massive star reaches the
            end of its life cycle, it undergoes a catastrophic explosion known
            as a supernova. The immense energy released in this explosion sends
            shockwaves rippling through the surrounding interstellar medium,
            compressing gas and dust clouds and triggering their collapse. These
            shockwaves can also induce the formation of new stars within the
            nebula, further enriching its complexity.
          </p>
        </div>

        <div>
          <h2 className="text-5xl mt-10 font-bold mb-2 text-white">
            Notable Nebulae:
          </h2>
          <div className="flex justify-center">
            <ul className="text-xl font-light text-white mt-7 px-20 grid gap-10 leading-10">
              <li className="flex justify-between ">
                The Orion Nebula : Located in the constellation of Orion, this
                emission nebula is one of the brightest and most well-known in
                the night sky, visible even to the naked eye.
                <img
                  className="w-40"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg/450px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg"
                  alt=""
                />
              </li>
              <li className="flex justify-between ">
                The Crab Nebula : This supernova remnant, located in the
                constellation of Taurus, is the result of a supernova observed
                by Chinese astronomers in 1054 AD. It remains one of the most
                studied objects in the sky.
                <img
                  className="w-40"
                  src="https://d2pn8kiwq2w21t.cloudfront.net/original_images/1-Webb_Crab_Nebula-resize.webp"
                  alt=""
                />
              </li>
              <li className="flex justify-between ">
                The Eagle Nebula : Famous for its "Pillars of Creation," this
                emission nebula in the constellation of Serpens is a stellar
                nursery where new stars are actively forming.
                <img
                  className="w-40"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Eagle_Nebula_from_ESO.jpg/450px-Eagle_Nebula_from_ESO.jpg"
                  alt=""
                />
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-5xl text-white font-bold mt-10">
            Related Nebulae newses
          </h2>
          <div>
            <div className="grid gap-10 mt-10">
              {newsData.map((news, index) => (
                <div
                  key={index}
                  onClick={() => selectedNews(news)}
                  className="border-gray-700 border text-white cursor-pointer flex overflow-auto duration-500"
                >
                  <img className="w-72 h-64" src={news.imageUrl} alt="" />
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

        <h2 className="text-4xl font-poppins text-white mt-24">
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

        <h2 className="text-4xl text-white font-bold mt-10">
          Discover More Topics
        </h2>
        <div className="mt-7 flex max-w-screen overflow-x-auto gap-11">
          {discovermore.map((item, index) => (
            <div
              key={index}
              onClick={() => discoverTopics(item.title)}
              className="h-96 w-80 bg-black border-gray-700 cursor-pointer border flex items-end bg-cover bg-no-repeat"
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
    </div>
  );
}

export default Nebulas;
