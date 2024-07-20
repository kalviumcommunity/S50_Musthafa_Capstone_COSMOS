import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BHAM from "../../Assets/BHAM.png";
import Cookies from "js-cookie";
import axios from "axios";
import useUserData from "../utils/UserData";

function Galaxies({ setSelectedNews }) {
  const navigate = useNavigate();
  const [showAnswerIndex, setShowAnswerIndex] = useState(-1);

  const { userData } = useUserData();
  const selectedNews = (e) => {
    setSelectedNews(e);
    navigate("/selenews");
  };

  const ProfileClick = (index) => {
    setShowAnswerIndex(showAnswerIndex === index ? -1 : index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      case "NEBULAE":
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
        <nav className="flex px-10 items-center bg-gray-200 justify-between py-3">
          <ul className="flex gap-10 text-lg ml-6">
            <li
              onClick={() => discoverTopics("HOME")}
              className="cursor-pointer hover:scale-105 duration-300"
            >
              HOME
            </li>
            <li
              onClick={() => discoverTopics("SOLAR SYSTEM")}
              className="cursor-pointer hover:scale-105 duration-300"
            >
              SOLAR SYSTEM
            </li>
            <li
              onClick={() => discoverTopics("STARS")}
              className="cursor-pointer hover:scale-105 duration-300"
            >
              STARS
            </li>
            <li
              onClick={() => discoverTopics("NEBULAE")}
              className="cursor-pointer hover:scale-105 duration-300"
            >
              NEBULAE
            </li>
            <li
              onClick={() => discoverTopics("BLACK HOLE")}
              className="cursor-pointer hover:scale-105 duration-300"
            >
              BLACK HOLE
            </li>
          </ul>
          <div className="flex items-center gap-3 justify-between cursor-pointer bg-gray-300 px-3 py-2 rounded-xl">
            <div onClick={() => discoverTopics("profile")} className="rounded">
              <img
                className="rounded-lg h-8"
                src={userData?.profilePic}
                alt="Profile"
              />
            </div>
            <div className="font-poppins text-sm">{userData?.name}</div>
          </div>
        </nav>

        <div
          className="w-full mt-10 flex items-end bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-7xl mt-96 mb-14 ml-10 font-poppins text-white font-bold">
            GALAXIES
          </h2>
        </div>

        <h2 className="text-white text-xl font-light mt-7 leading-9">
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

        <div>
          <h2 className="text-xl mt-10 text-white font-light">
            Here is a video that provides a comprehensive overview of galaxies.
          </h2>
          <iframe
            width="650"
            height="450"
            className=""
            src="https://www.youtube.com/embed/VXcnG06GmcY?si=OrGhhs0eX_4lhqA8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p className="text-xl text-white font-light">Credits - Nasa</p>
        </div>

        <h2 className="text-5xl text-white font-bold mt-16">Our Milky Way</h2>
        <p className="text-xl text-white font-light mt-10 leading-9">
          Our home galaxy is called the Milky Way. It’s a spiral galaxy with a
          disk of stars spanning more than 100,000 light-years. Earth is located
          along one of the galaxy’s spiral arms, about halfway from the center.
          Our solar system takes about 240 million years to orbit the Milky Way
          just once.
        </p>
        <div className="flex justify-center mt-6">
          <img
            className="w-2/4"
            src="https://science.nasa.gov/wp-content/uploads/2023/09/Milky_Way_illustration-1.jpeg?w=1536&format=webp"
            alt="Milky Way"
          />
        </div>

        <p className="text-xl text-white font-light mt-10 leading-9">
          From our perspective on Earth, the Milky Way looks like a faint, milky
          band of light arcing across the entire sky, which is how it got its
          name. This feature marks the central disk of our home galaxy seen edge
          on. The Milky Way sits in a neighborhood with over 50 other galaxies
          called the Local Group. Its members range in size from dwarf galaxies
          (smaller galaxies with up to a few billion stars) to Andromeda, our
          nearest large galactic neighbor. The Local Group sits just off the
          edge of the Virgo cluster and is part of the Laniakea supercluster.
        </p>

        <div>
          <h2 className="text-5xl text-white font-bold mt-16">
            Galaxy Formation and Evolution
          </h2>
          <div className="flex justify-center">
            <img
              className="w-2/4"
              src="https://www.researchgate.net/publication/363529923/figure/fig2/AS:11431281124900565@1678137342065/Modern-concept-of-the-formation-and-evolution-of-giant-elliptical-galaxies-Illustration.ppm"
              alt=""
            />
          </div>
          <p className="text-xl text-white font-light mt-10 leading-9">
            Galaxies form and evolve through a combination of processes,
            including the merging of smaller protogalaxies, the accretion of
            gas, and interactions with other galaxies. The earliest galaxies
            formed from density fluctuations in the early universe, leading to
            the formation of stars and star clusters. Over billions of years,
            these star clusters merged to form the galaxies we see today. Galaxy
            collisions and mergers are common and play a significant role in
            shaping galaxies. For example, the Milky Way has absorbed several
            smaller galaxies over its history and will continue to do so in the
            future.
          </p>
        </div>

        <h2 className="text-5xl text-white font-bold mt-16">
          Dark Matter and Galaxies
        </h2>
        <div className="flex justify-center">
          <img
            className=" w-2/4"
            src="https://science.nasa.gov/wp-content/uploads/2023/04/macs_j1149-2223-jpg.webp?w=1536&format=webp"
            alt=""
          />
        </div>
        <p className="text-xl text-white font-light mt-10 leading-9">
          Large galaxy clusters contain both dark matter and normal matter. The
          immense gravity of all this material warps the space around the
          cluster, causing the light from objects located behind the cluster to
          be distorted and magnified. This phenomenon is called gravitational
          lensing. This sketch shows paths of light from a distant galaxy that
          is being gravitationally lensed by a foreground cluster.
        </p>

        <div className="text-white font-light text-xl mt-10 leading-9">
          <h2 className="text-5xl font-bold">
            Galaxy Interactions and Collisions
          </h2>
          <p className="mt-5">
            Galaxy interactions and collisions are common events in the universe
            and play a crucial role in shaping galaxies. When galaxies pass
            close to each other, their mutual gravitational attraction can cause
            them to interact, distorting their shapes and triggering star
            formation. These interactions can result in various outcomes, such
            as the merging of galaxies to form a single, larger galaxy or the
            creation of tidal tails, which are streams of stars and gas pulled
            out from the galaxies.
          </p>
          <div className="flex justify-center mt-6">
            <img
              className="w-2/4"
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEipW195Y7N-FvZs0o3q3thwRHsUSLdPMjJeZN-vdJN_YMaorjiFFB4zXZQNTo-YXpCfB-oGa2kj6MrRKxwA852PZY6UMT3PLehCtgBPSt-e9u5yy5MxOR2WKQ3pS1O18vcL4kxnyNCZqiw/s1600/ngc4676.jpg"
              alt="Irregular Galaxy"
            />
          </div>
          <p className="mt-5">
            One of the most famous examples of interacting galaxies is the
            Antennae Galaxies (NGC 4038 and NGC 4039), which are in the process
            of merging. Their collision has created a spectacular array of new
            stars and star clusters. Another well-known interaction is between
            the Milky Way and the Andromeda Galaxy, which are expected to merge
            in about 4.5 billion years.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-5xl font-bold text-white">
            Essential Galaxy Facts
          </h2>
          <ul className="text-white grid grid-cols-3 mt-6 text-center">
            <li className="p-10">
              <h2 className="text-2xl font-semibold">NEAREST</h2>
              <p className="mt-2 font-light">
                The closest galaxy to the Milky Way is the Andromeda Galaxy,
                located about 2.537 million light-years away.
              </p>
            </li>
            <li className="p-10">
              <h2 className="text-2xl font-semibold">FARTHEST</h2>
              <p className="mt-2 font-light">
                The most distant known galaxy, GN-z11, is approximately 13.4
                billion light-years away from Earth.
              </p>
            </li>
            <li className="p-10">
              <h2 className="text-2xl font-semibold">BIGGEST</h2>
              <p className="mt-2 font-light">
                IC 1101 is the largest known galaxy, with a diameter of about 6
                million light-years, containing up to 100 trillion stars.
              </p>
            </li>
            <li className="p-10">
              <h2 className="text-2xl font-semibold">SMALLEST</h2>
              <p className="mt-2 font-light">
                Segue 2 is one of the smallest known galaxies, with a mere 1,000
                stars and a diameter of about 110 light-years.
              </p>
            </li>
            <li className="p-10">
              <h2 className="text-2xl font-semibold">SHAPE</h2>
              <p className="mt-2 font-light">
                Galaxies come in various shapes: spiral (like the Milky Way),
                elliptical, and irregular. Their shape often depends on their
                age and interactions.
              </p>
            </li>
            <li className="p-10">
              <h2 className="text-2xl font-semibold">COLLISIONS</h2>
              <p className="mt-2 font-light">
                Galaxies can collide and merge, creating larger galaxies. The
                Milky Way is expected to collide with the Andromeda Galaxy in
                about 4.5 billion years.
              </p>
            </li>
            <li className="p-10">
              <h2 className="text-2xl font-semibold">DARK MATTER</h2>
              <p className="mt-2 font-light">
                Galaxies are thought to be surrounded by dark matter, an
                invisible substance that makes up about 85% of the total mass of
                the universe.
              </p>
            </li>
            <li className="p-10">
              <h2 className="text-2xl font-semibold">STAR FORMATION</h2>
              <p className="mt-2 font-light">
                Star formation occurs in galaxies, especially in spiral arms.
                The rate of star formation can vary widely between different
                types of galaxies.
              </p>
            </li>
            <li className="p-10">
              <h2 className="text-2xl font-semibold">
                SUPER-MASSIVE BLACK HOLES
              </h2>
              <p className="mt-2 font-light">
                Most galaxies, including the Milky Way, have super-massive black
                holes at their centers. The one at the center of our galaxy is
                called Sagittarius A*.
              </p>
            </li>
          </ul>
        </div>

        <h2 className="text-5xl text-white font-bold mt-16">
          Types of Galaxies
        </h2>
        <div className="px-20">
          <p className="text-xl text-white font-light mt-10 leading-9">
            Galaxies come in various shapes and sizes, typically categorized
            into three main types: spiral, elliptical, and irregular.
          </p>
          <div className="mt-6">
            <h3 className="text-4xl text-white font-bold mt-10">
              Spiral Galaxies
            </h3>
            <p className="text-xl text-white font-light mt-5 leading-9">
              Spiral galaxies, like the Milky Way, have a flat, rotating disk
              containing stars, gas, and dust, along with a central
              concentration of stars known as the bulge. The disk is often
              organized into spiral arms that extend from the center. These arms
              are sites of active star formation and are brighter than the
              surrounding disk. Spiral galaxies are classified into two
              subcategories: normal spirals (designated with an "S") and barred
              spirals (designated with an "SB"), which have a central bar-shaped
              structure made of stars.
            </p>
            <div className="flex justify-center mt-6">
              <img
                className="w-2/4"
                src="https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRIl-T0A7cDIftdsm7mM7Odh0nkVAFud6G0wauDhZ0j3F7Eqfi4y-av6IkTnpqm1BCy"
                alt="Spiral Galaxy"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-4xl text-white font-bold mt-10">
              Elliptical Galaxies
            </h3>
            <p className="text-xl text-white font-light mt-5 leading-9">
              Elliptical galaxies have an ellipsoidal shape and a smooth, nearly
              featureless appearance. They range in shape from nearly spherical
              to highly elongated and contain older, low-mass stars with little
              gas and dust, resulting in minimal new star formation. Elliptical
              galaxies are designated with an "E" followed by a number
              indicating their degree of elongation (e.g., E0 for nearly
              spherical to E7 for highly elongated).
            </p>
            <div className="flex justify-center mt-6">
              <img
                className="w-2/4"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Ob-sGZqtiSK_N_mOJRZxCXmvQMLmYFoFng&s"
                alt="Elliptical Galaxy"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-4xl text-white font-bold mt-10">
              Irregular Galaxies
            </h3>
            <p className="text-xl text-white font-light mt-5 leading-9">
              Irregular galaxies do not have a distinct shape like spiral or
              elliptical galaxies. They are often chaotic in appearance, with no
              central bulge or spiral arms. Irregular galaxies are rich in gas
              and dust, making them sites of active star formation. They are
              usually smaller and less massive than spiral and elliptical
              galaxies. Examples include the Large and Small Magellanic Clouds,
              which are satellite galaxies of the Milky Way.
            </p>
            <div className="flex justify-center mt-6">
              <img
                className="w-2/4"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG2ylM0TGKNgZHkzhyl-SK9xONGEoQxJzyWA&s"
                alt="Irregular Galaxy"
              />
            </div>
          </div>

          <div>
            <h2 className="text-5xl text-white font-bold mt-16">
              Current Research and Discoveries
            </h2>
            <p className="text-xl text-white font-light mt-10 leading-9">
              Current research in galaxy formation and evolution focuses on
              understanding the role of dark matter, the impact of supermassive
              black holes on galaxy dynamics, and the processes that drive star
              formation. Observatories such as the Hubble Space Telescope, the
              James Webb Space Telescope, and ground-based telescopes provide
              critical data for these studies. Recent discoveries include the
              detection of the most distant galaxies, the observation of galaxy
              mergers, and insights into the behavior of dark matter.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl text-white font-bold mt-10">
            Related galaxy newses
          </h2>

          <div>
            <div className="grid gap-10 mt-10">
              {newsData.map((news, index) => (
                <div
                  key={index}
                  onClick={() => selectedNews(news)}
                  className="border-gray-700 border text-white  cursor-pointer flex overflow-auto duration-500"
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
        <h2 className="text-4xl text-white font-bold mt-40">
          Discover More Topics
        </h2>
        <div className="mt-7 flex max-w-screen  overflow-x-auto gap-11">
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

export default Galaxies;
