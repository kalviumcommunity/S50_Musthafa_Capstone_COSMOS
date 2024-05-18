import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BHAM from "../../Assets/BHAM.png";

function Stars({ setSelectedNews }) {
  const navigate = useNavigate();
  const [showAnswerIndex, setShowAnswerIndex] = useState(-1);

  const ProfileClick = (index) => {
    setShowAnswerIndex(showAnswerIndex === index ? -1 : index);
  };

  const selectedNews = (e) => {
    setSelectedNews(e);
    navigate("/selenews");
  };

  const newsData = [
    {
      imageUrl: `https://www.nasa.gov/wp-content/uploads/2024/04/stsci-01hrcmdf63etnvd4h43ezq4gb2.jpg?resize=2000,2000`,
      title: `How NASA’s Roman Telescope Will Measure Ages of Stars`,
      description: `Guessing your age might be a popular carnival game, but for astronomers it’s a real challenge to determine the ages of stars. Once a star like our Sun has settled into steady nuclear fusion, or the mature phase of its life, it changes little for billions of years. One exception to that rule is the star’s rotation period – how quickly it spins. By measuring the rotation periods of hundreds of thousands of stars, NASA’s Nancy Grace Roman Space Telescope promises to bring new understandings of stellar populations in our Milky Way galaxy after it launches by May 2027.

      Stars are born spinning rapidly. However, stars of our Sun’s mass or smaller will gradually slow down over billions of years. That slowdown is caused by interactions between a stream of charged particles known as the stellar wind and the star’s own magnetic field. The interactions remove angular momentum, causing the star to spin more slowly, much like an ice skater will slow down when they extend their arms.
      
      This effect, called magnetic braking, varies depending on the strength of the star’s magnetic field. Faster-spinning stars have stronger magnetic fields, which causes them to slow down more rapidly. Due to the influence of these magnetic fields, after about one billion years stars of the same mass and age will spin at the same rate. Therefore, if you know a star’s mass and rotation rate, you potentially can estimate its age. By knowing the ages of a large population of stars, we can study how our galaxy formed and evolved over time.
      `,
      datePosted: "13/03/2024",
    },
    {
      imageUrl: `https://science.nasa.gov/wp-content/uploads/2024/04/browndwarf-watermark.png?w=1536&format=webp`,
      title: `A Solar Neighborhood Census, Thanks to NASA Citizen Science`,
      description: `To take a census of nearby cosmic objects, sending out a survey won’t work. Scientists need to use many telescopes with different specializations to chart what is in the general neighborhood of the Sun.
      Looking to understand more about our neighbors and how they came to be, scientists collaborate with citizen scientists, volunteers from around the world. They have helped professional scientists create a new census of more than 3,500 cosmic objects through the Backyard Worlds: Planet 9 citizen science project.
      A new study in The Astrophysical Journal shows the results of that census within 65 light-years of the Sun. Researchers found that there are four times more stars than brown dwarfs in this area, but that low-mass objects are more common than high-mass objects.
      When researchers organized the objects in the census by mass, they found three different masses at which the frequency of objects suddenly changed. This indicates that there are different physical effects responsible for creating the different kinds of objects.
      “There is something about the process of star formation buried in those data,” said J. Davy Kirkpatrick, lead author of the study and research scientist at Caltech’s IPAC (Infrared Processing and Analysis Center) in Pasadena, California. “We have another clue of how it works.”`,
      datePosted: "24/12/2024",
    },
    {
      imageUrl: `https://science.nasa.gov/wp-content/uploads/2024/04/flwo-m101-sn2023ixf.jpg?w=1536&format=webp`,
      title: `NASA’s Chandra Releases Doubleheader of Blockbuster Hits`,
      description: `After a month of observations, starting when visible light telescopes first saw SN 2023ixf, Fermi had not detected gamma rays.
      “Unfortunately, seeing no gamma rays doesn’t mean there are no cosmic rays,” said co-author Matthieu Renaud, an astrophysicist at the Montpellier Universe and Particles Laboratory, part of the National Center for Scientific Research in France. “We have to go through all the underlying hypotheses regarding acceleration mechanisms and environmental conditions in order to convert the absence of gamma rays into an upper limit for cosmic ray production.”
      The researchers propose a few scenarios that may have affected Fermi’s ability to see gamma rays from the event, like the way the explosion distributed debris and the density of material surrounding the star.
      Fermi’s observations provide the first opportunity to study conditions right after the supernova explosion. Additional observations of SN 2023ixf at other wavelengths, new simulations and models based on this event, and future studies of other young supernovae will help astronomers home in on the mysterious sources of the universe’s cosmic rays.
      Fermi is an astrophysics and particle physics partnership managed by Goddard. Fermi was developed in collaboration with the U.S. Department of Energy, with important contributions from academic institutions and partners in France, Germany, Italy, Japan, Sweden, and the United States.
      `,
      datePosted: "3/01/2024",
    },
    {
      imageUrl: `https://science.nasa.gov/wp-content/uploads/2023/09/Sun_Emits_Flare.jpeg?w=1536&format=webp`,
      title: `NASA’s Fermi Mission Sees No Gamma Rays from Nearby Supernova`,
      description: `A nearby supernova in 2023 offered astrophysicists an excellent opportunity to test ideas about how these types of explosions boost particles, called cosmic rays, to near light-speed. But surprisingly, NASA’s Fermi Gamma-ray Space Telescope detected none of the high-energy gamma-ray light those particles should produce.
      On May 18, 2023, a supernova erupted in the nearby Pinwheel galaxy (Messier 101), located about 22 million light-years away in the constellation Ursa Major. The event, named SN 2023ixf, is the most luminous nearby supernova discovered since Fermi launched in 2008.
      “Astrophysicists previously estimated that supernovae convert about 10% of their total energy into cosmic ray acceleration,” said Guillem Martí-Devesa, a researcher at the University of Trieste in Italy. “But we have never observed this process directly. With the new observations of SN 2023ixf, our calculations result in an energy conversion as low as 1% within a few days after the explosion. This doesn’t rule out supernovae as cosmic ray factories, but it does mean we have more to learn about their production.”`,
      datePosted: "03/09/2024",
    },
  ];

  const discovermore = [
    {
      title: "GALAXIES",
      imageUrl:
        "https://images.pexels.com/photos/821644/pexels-photo-821644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "SOLAR SYSTEM",
      imageUrl: "https://cdn.mos.cms.futurecdn.net/v5n22xGyNNHLzSnSArbrVH.jpg",
    },
    {
      title: "NEBULAS",
      imageUrl:
        "https://bsmedia.business-standard.com/_media/bs/img/about-page/thumb/464_464/1605599664.jpg",
    },
    {
      title: "BLACK HOLE",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/330px-Black_hole_-_Messier_87_crop_max_res.jpg",
    },
  ];

  const discoverTopics = (e) => {
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
      case "BLACK HOLE":
        navigate("/blackholes");
        break;
      default:
        break;
    }
  };

  const data = [
    {
      question: "What are stars made of?",
      answer:
        "Stars are primarily composed of hydrogen and helium, with trace amounts of other elements.",
    },
    {
      question: "How do stars form?",
      answer:
        "Stars form from massive clouds of gas and dust called nebulae. Gravitational forces cause the material in the nebulae to condense and heat up, eventually triggering nuclear fusion and the birth of a star.",
    },
    {
      question: "What are the 7 main types of stars ?",
      answer:
        "There are seven main types of stars: O, B, A, F, G, K and M. The O stars are the bright, hot, blue stars and the M stars are the dimmer, cooler, red stars. A common mnemonic for remembering the order of the classifications is: 'Oh Be A Fine Girl, Kiss Me.",
    },
    {
      question: "What defines a star?",
      answer:
        "A star is any massive self-luminous celestial body of gas that shines by radiation derived from its internal energy sources. Of the tens of billions of trillions of stars in the observable universe, only a very small percentage are visible to the naked eye.",
    },
    {
      question: "What are stars made of? ?",
      answer:
        "Stars are giant balls of hot gas - mostly hydrogen, with some helium and small amounts of other elements. Every star has its own life cycle, ranging from a few million to trillions of years, and its properties change as it ages.",
    },
    {
      question: "What is the smallest star? ",
      answer:
        "In 2017, an international team of astronomers announced the discovery of a so-called red dwarf star that's so small it barely functions as a star. Code-named EBLM J0555-57Ab and lying some 600 light-years away, it's similar in size to the planet Saturn.",
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
            onClick={() => discoverTopics("profile")}
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
          className="w-full mt-10 flex items-end bg-no-repeat max-h-screen"
          style={{
            backgroundImage: `url(https://science.nasa.gov/wp-content/uploads/2023/09/star-banner.webp?w=1600)`,
          }}
        >
          <h2 className="text-6xl mt-96 mb-14 ml-10 font-poppins text-white font-bold">
            What is Star ?
          </h2>
        </div>

        <div className="flex justify-center">
          <div className="w-3/4">
            <p className="text-xl text-white mt-7 leading-8">
              A star is a luminous spheroid of plasma held together by
              self-gravity.The nearest star to Earth is the Sun. Many other
              stars are visible to the naked eye at night; their immense
              distances from Earth make them appear as fixed points of light.
              The most prominent stars have been categorised into constellations
              and asterisms, and many of the brightest stars have proper names.
              Astronomers have assembled star catalogues that identify the known
              stars and provide standardized stellar designations. The
              observable universe contains an estimated 10^22 to 10^24 stars.
              Only about 4,000 of these stars are visible to the naked eye—all
              within the Milky Way galaxy.
            </p>
            <h2 className="text-5xl mt-20 font-poppins text-white font-bold">
              BIRTH
            </h2>
            <p className="text-xl text-white mt-7 leading-8">
              Stars form in large clouds of gas and dust called molecular
              clouds. Molecular clouds range from 1,000 to 10 million times the
              mass of the Sun and can span as much as hundreds of light-years.
              Molecular clouds are cold which causes gas to clump, creating
              high-density pockets. Some of these clumps can collide with each
              other or collect more matter, strengthening their gravitational
              force as their mass grows. Eventually, gravity causes some of
              these clumps to collapse. When this happens, friction causes the
              material to heat up, which eventually leads to the development of
              a protostar – a baby star. Batches of stars that have recently
              formed from molecular clouds are often called stellar clusters,
              and molecular clouds full of stellar clusters are called stellar
              nurseries.
            </p>
            <div className="flex mt-10 justify-center">
              <img
                className="w-3/4"
                src="https://science.nasa.gov/wp-content/uploads/2023/09/Carina_Nebula-1.jpeg?w=1536&format=webp"
                alt=""
              />
            </div>

            <h2 className="text-5xl mt-20 font-poppins text-white font-bold">
              LIFE
            </h2>
            <p className="text-xl text-white mt-7 leading-8">
              At first, most of the protostar’s energy comes from heat released
              by its initial collapse. After millions of years, immense
              pressures and temperatures in the star’s core squeeze the nuclei
              of hydrogen atoms together to form helium, a process called
              nuclear fusion. Nuclear fusion releases energy, which heats the
              star and prevents it from further collapsing under the force of
              gravity.
            </p>
            <div className="flex mt-10 justify-center">
              <img
                className="w-2/4"
                src="https://science.nasa.gov/wp-content/uploads/2023/09/Sun_Emits_Flare.jpeg?w=1536&format=webp"
                alt=""
              />
            </div>
            <p className="text-xl text-white mt-7 leading-8">
              Astronomers call stars that are stably undergoing nuclear fusion
              of hydrogen into helium main sequence stars. This is the longest
              phase of a star’s life. The star’s luminosity, size, and
              temperature will slowly change over millions or billions of years
              during this phase. Our Sun is roughly midway through its main
              sequence stage.
              <br />
              <br />A star’sgas provides its fuel, and its mass determines how
              rapidly it runs through its supply, with lower-mass stars burning
              longer, dimmer, and cooler than very massive stars. More massive
              stars must burn fuel at a higher rate to generate the energy that
              keeps them from collapsing under their own weight. Some low-mass
              stars will shine for trillions of years – longer than the universe
              has currently existed – while some massive stars will live for
              only a few million years.
            </p>

            <h2 className="text-5xl mt-20 font-poppins text-white font-bold">
              DEATH
            </h2>
            <p className="text-xl text-white mt-7 leading-8">
              At the beginning of the end of a star’s life, its core runs out of
              hydrogen to convert into helium. The energy produced by fusion
              creates pressure inside the star that balances gravity’s tendency
              to pull matter together, so the core starts to collapse. But
              squeezing the core also increases its temperature and pressure,
              making the star slowly puff up. However, the details of the late
              stages of the star’s death depend strongly on its mass.
              <br />
              <br />A low-mass star’s atmosphere will keep expanding until it
              becomes a subgiant or giant star while fusion converts helium into
              carbon in the core. (This will be the fate of our Sun, in several
              billion years.) Some giants become unstable and pulsate,
              periodically inflating and ejecting some of their atmospheres.
              Eventually, all the star’s outer layers blow away, creating an
              expanding cloud of dust and gas called a planetary nebula.
            </p>
            <div className="flex mt-10 justify-center">
              <img
                className="w-2/4"
                src="https://cdn.britannica.com/92/124492-050-047F11FB/image-Kepler-Nova-Keplers-Supernova-Chandra-X-ray.jpg"
                alt=""
              />
            </div>
            <p className="text-xl text-white mt-7 leading-8">
              All that’s left of the star is its core, now called a white dwarf,
              a roughly Earth-sized stellar cinder that gradually cools over
              billions of years.
              <br />
              <br />
              A high-mass star goes further. Fusion converts carbon into heavier
              elements like oxygen, neon, and magnesium, which will become
              future fuel for the core. For the largest stars, this chain
              continues until silicon fuses into iron. These processes produce
              energy that keeps the core from collapsing, but each new fuel buys
              it less and less time. The whole process takes just a few million
              years. By the time silicon fuses into iron, the star runs out of
              fuel in a matter of days. The next step would be fusing iron into
              some heavier element but doing so requires energy instead of
              releasing it.
              <br />
              <br />
              The star’s iron core collapses until forces between the nuclei
              push the brakes, then it rebounds. This change creates a shock
              wave that travels outward through the star. The result is a huge
              explosion called a supernova. The core survives as an incredibly
              dense remnant, either a neutron star or a black hole. Material
              cast into the cosmos by supernovae and other stellar events will
              enrich future molecular clouds and become incorporated into the
              next generation of stars.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl text-white font-bold mt-40">
            Related galaxy news
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
                    <p className="line-clamp-4 text-lg leading-8 mt-2">
                      {news.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
              className="h-96 w-80 bg-black cursor-pointer border-gray-700 border flex items-end bg-cover bg-no-repeat"
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

export default Stars;
