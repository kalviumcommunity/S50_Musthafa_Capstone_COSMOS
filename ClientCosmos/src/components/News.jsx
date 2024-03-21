import React, { useState } from "react";

function News() {
  const [clickedNews, setClickedNews] = useState(null);

  const relatedNewsData = [
    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/cMDRA3454bGvfZASbxviZe-1200-80.jpg",
      title: "NASA's James Webb Space Telescope mission — Live updates",
      description:
        "An avalanche of images from the magnificent James Webb Space Telescope is set to be unleashed onto the world today after a taster glimpse into the deepest universe was unveiled on Monday (July 11) by U.S. President Joe Biden. Scientists and space enthusiasts alike have been virtually star-struck by Webb's sharp gaze and the plethora of distant objects the telescope revealed. But the best is yet to come during the official image release that is set to commence at 10:30 a.m. EDT (1430 GMT) today (July 12), which you can watch here at Space.com courtesy of NASA. The space agency has previously hinted which celestial objects space fans can look forward to seeing in these images. On Friday (July 8), the agency announced that the reveal will include views of the Carina and Southern Ring nebulas, as well as Stephan's Quintet of closely packed galaxies. Also on the agenda is observations of an exoplanet called WASP-96 b, although JWST won't be offering an image of the distant world. Instead, scientists will share a spectrum of the planet, which splits light by wavelength, offering insight into the chemical composition.",
    },
    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/Brhpn3fsSvibkMvQCcQwua-1200-80.jpg",
      title: "Solving the mystery of gas giant formation",
      description:
        "The James Webb Space Telescope (JWST) has investigated gas flowing from a protoplanetary disk surrounding an infant star, an outflow known as 'disk winds.' The observations could help scientists better understand how gas giants like Jupiter and Saturn are born. The team behind the study focused the JWST on a young, low-mass star called T Cha, located around 350 light-years from Earth. This star is known to have a large gap in the protoplanetary disk that swirls around it. Gaps like this indicate a budding young planet is moving around the star, gathering material. By studying how gas escapes from this disk, the team could learn what conditions favor the formation of gas giants and what conditions favor the formation of rocky planets like Earth. 'Rocky planets very close to the star will have very little or no atmosphere [like Mercury], as it will be stripped away by the sun's high energy photons — similar to photoevaporation,' Naman Bajaj, lead author of the new disk-wind analysis and a scientist with the University of Arizona's Lunar and Planetary Science Laboratory, told Space.com. 'For gas giants, if they happen to form close to the star, it is possible that they find a balance between their gas and the sun's energy.'",
    },
    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/HepKNzwBcapZinddKy2STE-1200-80.png.webp",
      title: "THAT'S COOL! ICY INGREDIENTS FOR LIFE SWIRL AROUND INFANT STARS",
      description: `Astronomers have used the James Webb Space Telescope to spot several of the building blocks of stars, planets, and even life in ice form swirling around two infant stars, or "protostars." 
                The complex organic molecules (COMs) spotted range from relatively simple molecules to complex compounds. Some of the familiar compounds spotted around the protostars IRAS 2A and IRAS23385 include ethanol, which we call alcohol on Earth, acetic acid found in vinegar, and formic acid, the compound that makes bee stings and ant bites painful.
                The discovery of the compounds around IRAS 2A is particularly interesting because these protostars, a lot like the sun, would have 4.6 billion years ago in its infancy before the formation of the planets. That means the discovery of these icy compounds may help confirm that the vital ingredients for life were delivered to Earth by comet bombardments.
                "This finding contributes to one of the long-standing questions in astrochemistry," team leader and Leiden University researcher Will Rocha said in a statement. "What is the origin of COMs in space? Are they made in the gas phase or in ice? The detection of COMs in ices suggests that solid-phase chemical reactions on the surfaces of cold dust grains can build complex kinds of molecules.`,
    },
    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/KzZyykRHhUFUr2m3U33o7M-1200-80.jpg.webp",
      title: "HOW DO SOME BALCK HOLES GET SO BIG?",
      description: `Using the James Webb Space Telescope (JWST) researchers identified a population of supermassive black hole-powered quasars that could help explain how such objects grew to sizes equivalent to millions or billions of times that of the sun.

            The relatively small quasars, which were identified as tiny red dots of light, represent a transitional stage on the road to becoming truly gigantic supermassive black holes. This means that this quasar population could fill a mass gap, the existence of which has perplexed scientists.
            
            "One issue with quasars is that some of them seem to be overly massive, too massive given the age of the universe at which the quasars are observed," Jorryt Matthee, lead author of the study and an assistant professor at the Institute of Science and Technology Austria, said in a statement. "We call them the 'problematic quasars.'"`,
    },
  ];

  const AllNews = [
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
    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/H83kYZPcHd9CTzemevak3S-650-80.jpg.webp",
      title:
        "Boeing begins fueling Starliner capsule ahead of 1st astronaut launch",
      description: `That mission, called Crew Flight Test (CFT), is currently scheduled to launch in early May atop a United Launch Alliance Atlas V rocket from Cape Canaveral Space Force Station, on Florida's Atlantic coast. It will send NASA astronauts Suni Williams and Butch Wilmore to the International Space Station (ISS) for a roughly 10-day stay.
          On Monday (March 18), Boeing announced that it had taken a significant step toward launch — beginning to load propellant into Starliner, a process that will take about two weeks.`,
      datePosted: "24/03/2024",
    },
    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/SEa7MkEdgghVtuk7Q69GL5-650-80.jpg.webp",
      title:
        "Virgin Galactic mothership loses alignment pin during space plane launch, FAA investigating",
      description:
        "Virgin Galactic lost a piece of hardware used to mate its VSS Unity suborbital space plane to its VMS Eve mothership aircraft during its most recent commercial spaceflight.",
      datePosted: "29/02/2024",
    },
    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/mgLWhyUtVNfEzyeDFUS9cV-650-80.jpg.webp",
      title: "SpaceX's evening Starlink launch wows West Coast skywatchers",
      description: `A SpaceX Falcon 9 rocket lifted off from Vandenberg Space Force Base on California's central coast Monday at 10:28 p.m. EDT (7:28 p.m. local time; 0228 GMT on March 19). The launch vehicle carried a batch of 22 Starlink satellites to add to SpaceX's ever-expanding wireless internet megaconstellation.In what's come to be known as the "jellyfish" effect, the dusk launch provided ideal conditions for the setting sun to light up the rocket's expanding engine plume against the darkening sky, as the vehicle climbed high into Earth's atmosphere.`,
      datePosted: "01/03/2024",
    },
    {
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/m4rjHBXqmBQkrtRqS5y4Lc-650-80.jpg.webp",
      title:
        "China's space plane apparently deployed 6 'mysterious wingmen' in orbit",
      description: `China's reusable space plane just got a little more mysterious. Just four days after being launched on its third mission, China's Shenlong ("Divine Dragon") robotic space plane seems to have placed six objects into Earth orbit. Amateur spacecraft trackers around the world have been following the objects closely for days and have recorded emissions coming from some of them. The six mystery objects have been designated OBJECT A, B, C, D, E and F. According to satellite tracker and amateur astronomer Scott Tilley, OBJECT A appears to be emitting signals reminiscent of those emitted by objects that China's space plane has released on previous missions. `,
      datePosted: "29/02/2024",
    },
  ];

  const handleNewsClick = (news) => {
    setClickedNews(news);
  };

  return (
    <>
      <nav className="flex px-10 items-center justify-between w-full py-2">
        <div className="w-full pl-10">
          <h2 className="text-4xl font-poppins font-semibold cursor-pointer">
            NEWS UPDATES
          </h2>
        </div>
        <div className="w-full">
          <div className="flex  w-3/4 my-6 rounded-lg shadow-sm">
            <input
              type="text"
              id="hs-trailing-button-add-on-with-icon"
              name="hs-trailing-button-add-on-with-icon"
              placeholder="Search here"
              className="py-3 border px-4 block w-full shadow-lg rounded-s-lg text-sm focus:z-10 disabled:opacity-50 bg-white disabled:pointer-events-none dark:bg-white outline-none"
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
      </nav>

      {/* NEWS PAGE */}
      {!clickedNews ? (
        <>
          <div className="">
            <div className="m-10 grid grid-cols-4 gap-7">
              {AllNews.map((detail, index) => (
                <div
                  key={index}
                  className="hover:shadow-lg duration-300 border text-white cursor-pointer rounded-xl"
                  onClick={() => handleNewsClick(detail)}
                >
                  <div className="w-full rounded-lg shadow-inner">
                    <img className="rounded-lg" src={detail.imageUrl} alt="" />
                  </div>
                  <div className="p-5 w-full">
                    <p className="text-black text-lg line-clamp-2 font-semibold">
                      {detail.title}
                    </p>
                    <p className="text-gray-800 mt-2 line-clamp-2">
                      {detail.description}
                    </p>
                    <p className="text-sm text-gray-600 w-full text-right mt-4">
                      Posted on {detail.datePosted}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex">
          <div className=" w-3/5 mx-10 p-10">
            <h2 className="text-3xl mb-4">{clickedNews.title}</h2>
            <img src={clickedNews.imageUrl} alt="" className="w-full" />
            <div className="text-lg  font-normal mt-6">
              <p className="">{clickedNews.description}</p>
            </div>
          </div>
          <div className="mx-10 py-10">
            {/* Render other related news items */}
            <h3 className="text-2xl font-medium font-poppins mb-4">
              Related News
            </h3>
            <ul className="">
              {relatedNewsData.map((news, index) => (
                <li
                  key={index}
                  onClick={() => handleNewsClick(news)}
                  className="flex w-96 items-center mb-4"
                >
                  <img
                    src={news.imageUrl}
                    alt={`Related News Image ${index + 1}`}
                    className="w-36 h-32 mr-4"
                  />
                  <div>
                    <h4 className="text-md font-semibold line-clamp-2">
                      {news.title}
                    </h4>
                    <p className="text-gray-700 font-light line-clamp-3">
                      {news.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default News;
