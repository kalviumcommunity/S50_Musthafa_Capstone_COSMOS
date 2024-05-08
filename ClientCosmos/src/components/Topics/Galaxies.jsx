import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BHAM from "../../Assets/BHAM.png";

function Galaxies({setSelectedNews}) {
  const navigate = useNavigate();
  const [showAnswerIndex, setShowAnswerIndex] = useState(-1);

  const selectedNews = (e) => {
    setSelectedNews(e);
    navigate("/selenews");
  };


  const ProfileClick = (index) => {
    setShowAnswerIndex(showAnswerIndex === index ? -1 : index);
  };

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

  const data = [
    {
      question: "What are galaxies?",
      answer:
        "Galaxies are vast systems of stars, gas, dust, and dark matter held together by gravity. They come in different shapes and sizes and contain billions to trillions of stars.",
    },
    {
      question: "How do galaxies form?",
      answer:
        "Galaxies form through the gravitational collapse of gas and dust in the early universe. Over time, smaller galaxies merge to form larger ones, contributing to the diversity of galaxy shapes and sizes.",
    },
    {
      question: "What are the different types of galaxies?",
      answer:
        "There are several types of galaxies, including spiral galaxies, elliptical galaxies, and irregular galaxies. Spiral galaxies have a distinct spiral structure, elliptical galaxies are more rounded in shape, and irregular galaxies have no definite shape.",
    },
    {
      question: "What is the Milky Way?",
      answer:
        "The Milky Way is the galaxy that contains our solar system. It is a barred spiral galaxy with a central bulge and spiral arms extending from it.",
    },
    {
      question: "How many galaxies are there in the universe?",
      answer:
        "There are estimated to be billions to trillions of galaxies in the observable universe. The exact number is difficult to determine due to the vastness of space.",
    },
    {
      question: "What do galaxies tell us about the universe?",
      answer:
        "Studying galaxies can provide insights into the formation, evolution, and structure of the universe. They contain valuable information about the distribution of matter and the dynamics of cosmic processes.",
    },
  ];

  const discovermore = [
    {
      title: "BLACK HOLE",
      imageUrl:
        "https://assets.newatlas.com/dims4/default/942c058/2147483647/strip/true/crop/3240x2160+300+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F89%2F8e%2Fd8cd992244949347b56b2b77fc97%2Fblack-hole-disc.jpg",
    },
    {
      title: "NEBULAS",
      imageUrl:
        "https://www.nasa.gov/wp-content/uploads/2022/10/stsci-01gfnn3pwjmy4rqxkz585bc4qh.png",
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

  return (
    <div className="bg-black">
      <div className="px-10 py-10">
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

        <h2 className="text-6xl font-bold text-white mt-10">GALAXIES</h2>

        <h2 className="text-white mt-7 leading-9">
          Galaxies consist of stars, planets, and vast clouds of gas and dust,
          all bound together by gravity. The largest contain trillions of stars
          and can be more than a million light-years across. The smallest can
          contain a few thousand stars and span just a few hundred light-years.
          Most large galaxies have supermassive black holes at their centers,
          some with billions of times the Sun’s mass. Galaxies come in a variety
          of shapes, mostly spirals and ellipticals, as well as those with less
          orderly appearances, usually dubbed irregular. Most galaxies are
          between 10 billion and 13.6 billion years old. Some are almost as old
          as the universe itself, which formed around 13.8 billion years ago.
          Astronomers think the youngest known galaxy formed approximately 500
          million years ago. Galaxies can organize into groups of about 100 or
          fewer members held together by their mutual gravity. Larger
          structures, called clusters, may contain thousands of galaxies. Groups
          and clusters can be arranged in superclusters, which are not
          gravitationally bound. Superclusters, empty voids, “walls” of
          galaxies, and other large-scale structures make up the cosmic web of
          matter in the universe.
        </h2>
        <iframe
          width="650"
          height="450"
          className="mt-10"
          src="https://www.youtube.com/embed/VXcnG06GmcY?si=OrGhhs0eX_4lhqA8"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>

        <p className="text-white mt-7 leading-8">
          Galaxies are the visible foundation of the universe; each one a
          collection of stars, planets, gas, dust, and dark matter held together
          by gravity. Hubble’s observations give us insight into how galaxies
          form, grow, and evolve through time. Credit: NASA's Goddard Space
          Flight Center; Lead Producer: Miranda Chabot; Lead Writer: Andrea
          Gianopoulos
        </p>

        <h2 className="text-5xl font-bold mt-16 text-white">Our Milky Way</h2>
        <p className="text-white mt-10 leading-9">
          Our home galaxy is called the Milky Way. It’s a spiral galaxy with a
          disk of stars spanning more than 100,000 light-years. Earth is located
          along one of the galaxy’s spiral arms, about halfway from the center.
          Our solar system takes about 240 million years to orbit the Milky Way
          just once.
        </p>
        <div className="flex justify-center mt-6">
          <img
            src="https://science.nasa.gov/wp-content/uploads/2023/09/Milky_Way_illustration-1.jpeg?w=1536&format=webp"
            alt=""
          />
        </div>

        <div className="text-white mt-10 leading-9">
          From our perspective on Earth, the Milky Way looks like a faint, milky
          band of light arcing across the entire sky, which is how it got its
          name. This feature marks the central disk of our home galaxy seen edge
          on. The Milky Way sits in a neighborhood with over 50 other galaxies
          called the Local Group. Its members range in size from dwarf galaxies
          (smaller galaxies with up to a few billion stars) to Andromeda, our
          nearest large galactic neighbor. The Local Group sits just off the
          edge of the Virgo cluster and is part of the Laniakea supercluster.
        </div>
        <h2 className="text-4xl font-poppins text-white mt-14">
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

        <div>
          <h2 className="text-4xl text-white font-bold mt-10">
            Related galaxy newses
          </h2>

          <div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mt-10">
              {newsData.map((news, index) => (
                <div
                  key={index}
                  onClick={() => selectedNews(news)}
                  className="bg-white cursor-pointer overflow-auto duration-500"
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
        </div>
        <h2 className="text-4xl text-white font-bold mt-10">
          Discover More Topics
        </h2>
        <div className="mt-7 flex max-w-screen overflow-x-auto gap-11">
          {discovermore.map((item, index) => (
            <div
              key={index}
              className="h-96 w-80 bg-black border-gray-700 border flex items-end bg-cover bg-no-repeat"
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

export default Galaxies;
