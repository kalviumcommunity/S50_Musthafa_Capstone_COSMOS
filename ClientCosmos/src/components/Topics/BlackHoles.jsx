import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import WHAM from "../Assets/WHAM.png";
import BHAM from "../../Assets/BHAM.png";
import blackhole from "../../Assets/blackhole.webp";
import Cookies from "js-cookie";
import axios from "axios";

function BlackHoles({ setSelectedNews }) {
  const [showAnswerIndex, setShowAnswerIndex] = useState(-1);

  const navigate = useNavigate();
  const ProfileClick = (index) => {
    setShowAnswerIndex(showAnswerIndex === index ? -1 : index);
  };

  const [userData, setUserData] = useState(null);

  const getUserdata = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/getAsingleUser/${id}`
      );
      setUserData(response.data);
    } catch (err) {
      console.log("Error while getting the profile data", err);
    }
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
          if (user) {
            getUserdata(user._id);
          }
        } catch (error) {
          Cookies.remove("token");
          console.error("Error in post request", error.response.data.error);
        }
      } else {
        console.log("Token is not there");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = [
    {
      question: "What is inside the black hole ?",
      answer:
        "Black holes have two parts. There is the event horizon, which you can think of as the surface, though it's simply the point where the gravity gets too strong for anything to escape. And then, at the center, is the singularity. That's the word we use to describe a point that is infinitely small and infinitely dense.",
    },
    {
      question: "Is black hole a danger?",
      answer:
        "So, can this or any other black hole pose a threat to Earth? Not really. According to NASA, no black hole is close enough to be a danger to us. Plus, the sun is not massive enough to explode to form a black hole.",
    },
    {
      question: "What causes a black hole ?",
      answer:
        "Stellar black holes form when the center of a very massive star collapses in upon itself. This collapse also causes a supernova, or an exploding star, that blasts part of the star into space. Scientists think supermassive black holes formed at the same time as the galaxy they are in.",
    },
    {
      question: "Where is black hole in Earth ?",
      answer:
        "The nearest known black hole, called Gaia BH1, is about 1,500 light-years away.",
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
      case "EARTH":
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

  const discovermore = [
    {
      title: "GALAXIES",
      imageUrl:
        "https://images.pexels.com/photos/821644/pexels-photo-821644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NEBULAS",
      imageUrl:
        "https://bsmedia.business-standard.com/_media/bs/img/about-page/thumb/464_464/1605599664.jpg",
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

  const newsData = [
    {
      imageUrl:
        "https://www.nasa.gov/wp-content/uploads/2024/03/h1821.jpg?resize=2000,2000",
      title: "NASA's Chandra Identifies an Underachieving Black Hole",
      description:
        "This image shows a quasar, a rapidly growing supermassive black hole, which is not achieving what astronomers would expect from it, as reported in our latest press release. Data from NASA’s Chandra X-ray Observatory (blue) and radio data from the NSF's Karl G. Jansky's Very Large Array (red) reveal some of the evidence for this quasar's disappointing impact on its host galaxy.Known as H1821+643, this quasar is about 3.4 billion light-years from Earth. Quasars are a rare and extreme class of supermassive black holes that are furiously pulling material inwards, producing intense radiation and sometimes powerful jets. H1821+643 is the closest quasar to Earth in a cluster of galaxies.Quasars are different than other supermassive black holes in the centers of galaxy clusters in that they are pulling in more material at a higher rate. Astronomers have found that non-quasar black holes growing at moderate rates influence their surroundings by preventing the intergalactic hot gas from cooling down too much. This regulates the growth of stars around the black hole. The influence of quasars, however, is not as well known. This new study of H1821+643 that quasars — despite being so active — may be less important in driving the fate of their host galaxy and cluster than some scientists might expect.To reach this conclusion the team used Chandra to study the hot gas that H1821+643 and its host galaxy are shrouded in. The bright X-rays from the quasar, however, made it difficult to study the weaker X-rays from the hot gas. The researchers carefully removed the X-ray glare to reveal what the black hole's influence is, which is reflected in the new composite image showing X-rays from hot gas in the cluster surrounding the quasar. This allowed them to see that the quasar is actually having little effect on its surroundings.Using Chandra, the team found that the density of gas near the black hole in the center of the galaxy is much higher, and the gas temperatures much lower, than in regions farther away. Scientists expect the hot gas to behave like this when there is little or no energy input (which would typically come from outbursts from a black hole) to prevent the hot gas from cooling down and flowing towards the center of the cluster.",
      datePosted: "13/03/2024",
    },
    {
      imageUrl:
        "https://science.nasa.gov/wp-content/uploads/2024/05/black-hole-approach-1.jpg?w=1536&format=webp",
      title: `New NASA Black Hole Visualization Takes Viewers Beyond the Brink`,
      description: `People often ask about this, and simulating these difficult-to-imagine processes helps me connect the mathematics of relativity to actual consequences in the real universe,” said Jeremy Schnittman, an astrophysicist at NASA’s Goddard Space Flight Center in Greenbelt, Maryland, who created the visualizations. “So I simulated two different scenarios, one where a camera — a stand-in for a daring astronaut — just misses the event horizon and slingshots back out, and one where it crosses the boundary, sealing its fate.`,
      datePosted: "10/01/2024",
    },

    {
      imageUrl:
        "https://science.nasa.gov/wp-content/uploads/2024/01/lisa-2arms-gws-red2.png?w=1536&format=webp",
      title:
        "NASA Collaborating on European-led Gravitational Wave Observatory in Space",
      description: `The first space-based observatory designed to detect gravitational waves has passed a major review and will proceed to the construction of flight hardware. On Jan. 25, ESA (European Space Agency), announced the formal adoption of LISA, the Laser Interferometer Space Antenna, to its mission lineup, with launch slated for the mid-2030s. ESA leads the mission, with NASA serving as a collaborative partner.`,
      datePosted: "13/03/2024",
    },
    {
      imageUrl:
        "https://science.nasa.gov/wp-content/uploads/2024/01/hubble-frb20220610a-stsci-01hk5hccqvnaf5pqrgma4nkn0g.png?w=1536&format=webp",
      title: "Hubble Finds Weird Home of Farthest Fast Radio Burst",
      description: `Astronomers using NASA's Hubble Space Telescope have found a rare event in an oddball place.

      It's called a fast radio burst (FRB), a fleeting blast of energy that can – for a few milliseconds – outshine an entire galaxy. Hundreds of FRBs have been detected over the past few years. They pop off all over the sky like camera flashes at a stadium event, but the sources behind these intense bursts of radiation remain uncertain.
      
      This new FRB is particularly weird because it erupted halfway across the universe, making it the farthest and most powerful example detected to date.
      
      And if that's not strange enough, it just got weirder based on the follow-up Hubble observations made after its discovery. The FRB flashed in what seems like an unlikely place: a collection of galaxies that existed when the universe was only 5 billion years old. The large majority of previous FRBs have been found in isolated galaxies.
      
      FRB 20220610A was first detected on June 10, 2022, by the Australian Square Kilometer Array Pathfinder (ASKAP) radio telescope in Western Australia. The European Southern Observatory's Very Large Telescope in Chile confirmed that the FRB came from a distant place. The FRB was four times more energetic than closer FRBs.`,
      datePosted: "02/02/2024",
    },
  ];

  const selectedNews = (e) => {
    setSelectedNews(e);
    navigate("/selenews");
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
              onClick={() => discoverTopics("EARTH")}
              className=" cursor-pointer hover:scale-105 duration-300"
            >
              EARTH
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
              onClick={() => discoverTopics("NEBULAS")}
              className=" cursor-pointer hover:scale-105 duration-300"
            >
              NEBULAE
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
          className="w-full mt-10 flex items-end bg-no-repeat max-h-screen"
          style={{
            backgroundImage: `url(${blackhole})`,
          }}
        >
          <h2 className="text-6xl mt-96 mb-14 ml-10 font-poppins text-white font-bold">
            What is Black Hole ?
          </h2>
        </div>

        <div className="mx-auto px-4 pb-12">
          <div className="my-5">
            <p className="text-xl font-light text-white  ">
              A black hole is a region of spacetime where gravity is so strong
              that nothing, not even light and other electromagnetic waves, is
              capable of possessing enough energy to escape it.
            </p>
          </div>
          <div className="mb-10">
            <h2 className="text-4xl mb-5 font-semibold mt-6 text-white">
              Einstein's theory of blackhole
            </h2>
            <p className="text-xl font-light text-white  ">
              Einstein's theory of general relativity predicts that a
              sufficiently compact mass can deform spacetime to form a black
              hole. The boundary of no escape is called the event horizon. A
              black hole has a great effect on the fate and circumstances of an
              object crossing it, but it has no locally detectable features
              according to general relativity. In many ways, a black hole acts
              like an ideal black body, as it reflects no light. Quantum field
              theory in curved spacetime predicts that event horizons emit
              Hawking radiation, with the same spectrum as a black body of a
              temperature inversely proportional to its mass. This temperature
              is of the order of billionths of a kelvin for stellar black holes,
              making it essentially impossible to observe directly.
            </p>
          </div>

          <div className="mb-6">
            <div className="mb-4">
              <h2 className="font-semibold text-4xl text-white my-3">
                Event Horizon
              </h2>
              <div className="flex justify-center my-4">
                <img
                  src="https://www.syfy.com/sites/syfy/files/styles/scale_600/public/blackhole_diagram.jpg"
                  alt=""
                />
              </div>

              <p className="font-light text-white text-xl  ">
                The boundary surrounding a black hole is called the event
                horizon. Once an object crosses this boundary, it cannot escape
                the black hole's gravitational pull. The event horizon is often
                described as the point of no return.
              </p>
            </div>
            <div className="mb-4">
              <h2 className="font-semibold text-4xl text-white my-3">
                Singularity
              </h2>
              <div className="flex justify-center my-4">
                <img
                  src="https://www.researchgate.net/profile/Jose-Collazos-Rozo/publication/370901965/figure/fig3/AS:11431281159967675@1684562028991/Illustration-of-a-black-hole-we-can-appreciate-the-event-horizon-and-singularity.jpg"
                  alt=""
                />
              </div>
              <p className="font-light text-white text-xl  ">
                At the very center of a black hole lies a singularity, a point
                where matter is thought to be infinitely dense and the
                gravitational forces are infinitely strong. The laws of physics
                as we currently understand them break down at this point.
              </p>
            </div>
            <div className="mb-6">
              <h2 className="font-semibold text-4xl text-white">Formation</h2>
              <div className="flex justify-center my-4">
                <img
                  className="w-2/4 "
                  src="https://cdn.britannica.com/50/62750-050-C12B4D5F/evolution.jpg"
                  alt=""
                />
              </div>
              <p className="font-light text-white text-xl  ">
                Black holes can form in several ways. The most common process is
                through the collapse of a massive star after it has exhausted
                its nuclear fuel. This type of black hole is known as a stellar
                black hole. Other types include supermassive black holes, which
                are found at the centers of galaxies, and primordial black
                holes, which are hypothesized to have formed in the early
                universe.
              </p>
            </div>
            <div className="mb-4">
              <h2 className="font-semibold text-4xl text-white">Detection</h2>
              <div className="my-4 flex justify-center">
                <img
                  className="w-2/4"
                  src="https://news.stanford.edu/__data/assets/image/0023/42746/ATT00001.png"
                  alt=""
                />
              </div>
              <p className="font-light text-white text-xl  ">
                Although black holes cannot be observed directly (since light
                cannot escape them), their presence can be inferred by observing
                the behavior of nearby objects. For instance, scientists can
                detect X-rays emitted by material as it is heated and
                accelerated while falling into a black hole, or they can observe
                the gravitational effects on nearby stars and gas clouds.
              </p>
            </div>

            <h2 className="text-4xl mt-7 font-semibold text-white mb-6">
              Types of Black Holes:
            </h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-900 text-white text-xl">
                    <th className="py-4 px-6 text-left">Name</th>
                    <th className="py-4 px-6 text-left">Explanation</th>
                    <th className="py-4 px-6 text-center">Image</th>
                  </tr>
                </thead>
                <tbody className="text-white text-xl font-light">
                  <tr>
                    <td className="py-4 px-6">Stellar Black Holes</td>
                    <td className="py-4 px-6">
                      Formed by the gravitational collapse of a massive star
                      after a supernova.
                    </td>
                    <td className="py-4 px-6 text-center">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBeDW0jdejnBt60bdb_wiGvCKEkiqt3xoRQ&s"
                        alt="Stellar Black Hole"
                        className="w-44"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6">Supermassive Black Holes</td>
                    <td className="py-4 px-6">
                      Found at the centers of galaxies, including our own Milky
                      Way. They contain millions to billions of times the mass
                      of our sun.
                    </td>
                    <td className="py-4 px-6 text-center">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmz1Ov6RTb-NQy2pU-9jbpv64rdvoxQBU4bA&s"
                        alt="Supermassive Black Hole"
                        className="w-44"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6">Intermediate Black Holes</td>
                    <td className="py-4 px-6">
                      A potential class that lies between stellar and
                      supermassive black holes, though their existence is still
                      a subject of research.
                    </td>
                    <td className="py-4 px-6 text-center">
                      <img
                        src="https://www.astronomy.com/wp-content/uploads/sites/2/2023/02/image_4606e47TucanaeBlackHole.jpg"
                        alt="Intermediate Black Hole"
                        className="w-44"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6">Primordial Black Holes</td>
                    <td className="py-4 px-6">
                      Hypothetical black holes that might have formed soon after
                      the Big Bang.
                    </td>
                    <td className="py-4 px-6 text-center">
                      <img
                        src="https://www.astronomy.com/uploads/2021/09/BlackHole-6.jpg"
                        alt="Primordial Black Hole"
                        className="w-44"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-4 mt-3 ">
              <h2 className="font-semibold text-4xl my-5 text-white">
                Hawking Radiationw-44
              </h2>
              <p className="font-light text-white text-xl  ">
                Theoretical physicist Stephen Hawking proposed that black holes
                can emit radiation due to quantum effects near the event
                horizon. This radiation, known as Hawking radiation, could cause
                black holes to lose mass and eventually evaporate over time.
              </p>
            </div>
            <div className="mb-4 mt-3 ">
              <h2 className="font-semibold text-4xl my-5 text-white">
                Impact on Time
              </h2>
              <p className="font-light text-white text-xl  ">
                According to Einstein's theory of general relativity, the
                immense gravitational pull of a black hole significantly warps
                spacetime. This warping causes time to pass differently near a
                black hole compared to regions far from its influence. An
                observer near a black hole would experience time more slowly
                relative to an observer far away.
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-4xl my-7 text-white">
                Role in the Universe
              </h2>
              <p className="font-light text-white text-xl  ">
                Black holes play a crucial role in the dynamics of galaxies.
                Supermassive black holes, in particular, are believed to
                influence the formation and evolution of galaxies through their
                gravitational interactions and energetic phenomena such as jets
                and outflows.
              </p>
            </div>
          </div>

          <div>
            <p className="mt-7 font-light text-white  ">
              Here's a video for Exploring the Enigmatic World of Black Holes: A
              Scientific Journey
            </p>
            <iframe
              className="mt-3"
              width="650"
              height="450"
              src="https://www.youtube.com/embed/kOEDG3j1bjs?si=sZG9O5PgntbaoiH1"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>

          <div className="mt-10">
            <h2 className="text-4xl text-white font-poppins">
              Essential Black hole Facts
            </h2>
            <ul className="text-white grid grid-cols-3 mt-10 text-center">
              <li className="p-10">
                <h2 className="text-2xl font-semibold">FARTHEST</h2>
                <p className="mt-2">
                  The nearest known black hole, called Gaia BH1, is about 1,500
                  light-years away.
                </p>
              </li>
              <li className="p-10">
                <h2 className="text-2xl font-semibold">CLOSEST</h2>
                <p className="mt-2">
                  The most distant black hole detected, at the center of a
                  galaxy called QSO J0313-1806, is around 13 billion light-years
                  away.
                </p>
              </li>

              <li className="p-10">
                <h2 className="text-2xl font-semi-bold">BIGGEST</h2>
                <p className="mt-2">
                  The most massive black hole observed, TON 618, tips the scales
                  at 66 billion times the Sun’s mass.
                </p>
              </li>
              <li className="p-10">
                <h2 className="text-2xl font-semi-bold">SMALLEST</h2>
                <p className="mt-2">
                  The lightest-known black hole is only 3.8 times the Sun’s
                  mass. It’s paired up with a star.
                </p>
              </li>
              <li className="p-10">
                <h2 className="text-2xl font-semi-bold">SPAGHETTIFICATION</h2>
                <p className="mt-2">
                  A real term that describes what happens when matter gets too
                  close to a black hole. It’s squeezed horizontally and
                  stretched vertically, resembling a noodle.
                </p>
              </li>
              <li className="p-10">
                <h2 className="text-2xl font-semi-bold">SPIN</h2>
                <p className="mt-2">
                  All black holes spin. The fastest-known – named GRS 1915+105 –
                  clocks in at over 1,000 rotations per second.
                </p>
              </li>
              <li className="p-10">
                <h2 className="text-2xl font-semi-bold">GRAVITY'S THE SAME</h2>
                <p className="mt-2">
                  If you replaced the Sun with a black hole of the same mass,
                  the solar system would get a lot colder, but the planets would
                  stay in their orbits.
                </p>
              </li>
              <li className="p-10">
                <h2 className="text-2xl font-semi-bold">STAR BOOMS</h2>
                <p className="mt-2">
                  One type of black hole is born when massive stars run out of
                  fuel and explode in supernovae.
                </p>
              </li>
              <li className="p-10">
                <h2 className="text-2xl font-semi-bold">NOT SO RARE</h2>
                <p className="mt-2">
                  Most Milky Way-sized galaxies have monster black holes at
                  their centers. Our is called Sagittarius A* (pronounced
                  ey-star), and it’s 4 million times the Sun’s mass.
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-4xl text-white font-bold mt-10">
              Related Balck hole News
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
                      <p className="line-clamp-4  font-light text-lg leading-8 mt-2">
                        {news.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-4xl mt-14 font-poppins text-white">
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
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAACnp6cxMTHm5ubp6emSkpLi4uKHh4eVlZWJiYklJSXg4OCzs7Pk5OTs7Ow7OzspKSk1NTUoKCguLi6dnZ3a2to9PT3Pz88JCQlOTk5eXl7x8fEbGxugoKB4eHgdHR0TExPGxsa/v78O9zwiAAAJeklEQVR4nM3d6XbbOAwGUMZu0kmcZZK4nbRN9/d/x5FsyxYlEMTyccHvHEX3gBAoiZTDlSy+fhH+Ya3Y3gn/MMj+7Gd464v48iFsZH8pE/4MIbw5zgce+8fhjGREkfCfMMbnfrK4uz6ckYgoER6BA/G788RQsb8+nZGEKBDehSnuX90nh4jt4/mMBMS88CZc4v4X4AS98fw4O6M8MSucA0N4/I04R1fsrqMzyhJzwhg4ZHEHOlFr7D8szihHzAiXwOFy05a4/bg6owyRF35aHW4YqC2Ju0fijHgiK6SAIVy3u6K+XpNnxBI54Q/ycEMWt+ATl8aWymCOyAg3icOF8HEPP3lJ7Nc1KCCmhWlgCB9a1OJueRWVEZNCDjgQ62dx1SaExJSQBw4DtXYtEm1CRkwIc8CBWHeg7nLAJJEW5oFD06hJ3NFtQkIkhRLg0DT+LYqaR3aIMkRKKAMOl5taxP298IwoIiGUAoeBWudyQ07VxMS1UA4M4emlAvCZbxM54kqoAQ4D9b/iQGENJolLoQ44EEtn8VkHXBMXQi1wGKhla5GdqomIsVAPHC43Ja+oe/lFJkWMhBZg0aaxlbYJhjgX2oBDFktNwwVTtTxxJrQCQ3gvQxRN1bLEi9AOLFSLyjaRIp6FHmCRWhRP1TLESegDFpjAKaZqPPEkpJ+qaQI8gVNN1VhiAAHBA9XYJuLYXIQIIHQC94wAnogBBhwGKqppGKZqdGyOQhQQ1jSY56La2IzC1JNtS0BqEVKDU2yuwlfg4SATOPNUjY5vYfYSGxHumylYDR7jdqxDLNE5UKFDdAQerqVgoqdpOKdqyxiAx37YzUB1T9XiGIGnOQ2YaM1i5uWLNg7AaV7aRS3ia3AmRBMtAxXcJj5dxUL0QNX3RccdPRW303Ev9/hYonoCB5yqjXEGzp/TNK1FcJu4uRx5/qwNnEVNLZZoE4TwvMwSE4qm8YptEzfzY8fPvMEDVfraxvVUbR230cEX7y2aTODUL1/4iIGrd08NJnDwuwleiCbmr6imly/puFkef/0OGHu5ydYieKq2AlLv8cFNg5/dgKdqyyFKC8FZfOdqETxVW2cwsZ4GnMX0QE0up7QFBUysicJmMTlHBc9FSWBqXVuVplG4TfDCGhO45/I1yAnRA3Vdi+CpWgrIrBEGX26WWXyucJHJCMs2jQptIi9E1+L8iroteLukEJarxRp9UCQs1TTqtAmRsEwtvj5Bj8pmML93DVyL40B9qVeDEiF+Alf6flAtRNfi17oZFO0DxmYRG3mgai93fyEAyvbjYwcqLvg2oRF2mkVJBsXfxeiRKANKhR0ShUCxsLtaFNWgSthZFqUZ1Ai7IsqBGmFHRAVQJeyGqAHqhJ0QVUClsAuiDqgVdtA0xG3CKGyeRWUGDcLGRDXQIGxK1AMtwoa1qK1Bq7BZFg0ZNAobEU1Ao7DJQLUMUbuwAdGWQbuwOtEKtAsr16IZ6BBWzaKxBp3Cilm0Z9AnrJZFRwadwkpEF9AprEL0Ab3CCkQn0C0sTvQC/cLCRDcQICxK9AMRwoJEABAiLEZEADFC4mO8iPiU/8eCwAiLZBGSQZiwABEEhAnhRBQQJ/yOXcr1DvscM0q4x64XHYioj8GAhC/YpVxjMJsYVIERgvcPHgP0NT+IcIetwSnY3TbiQAjBS5ov8YQYqAAheEnzPBCf9PELwUua4wDUolsI3vmyjHf357W8woJD9BjupuEUgjcpk0RnFn1C8M4XOpy16BKCvyeTJLquqB4hePdZOly16BCCv2XBEh0D1S6sUoNTOL5yaxZWG6LHsA9UqxD8PZl8mL8DZxRWrMEprE3DJgR8IdZAtLV+k7ByDU5h+5kCi/C1DdD4wUKDsOjtEh+WWtQLwfsHdWG4JVYLq7eJOPRNQysEf09GH+qv3CqFVadqdGhrUSds1CbiUA5UlbBxDU6haxoaYcM2EYdqoCqETdtEHJoJnFwI/uyYLxS1KBbuegJqvnIrFXZTg1OIv3IrFHbRJuKQTuBkwk7aRBzCWhQJm0/V6JBN4CTCJnf0khA1DYGwqzYRh2Sg5oWg33wpE4IJXFYIbhPX37Azo/wELicET9Xut1e7z9AjZptGRgiuwftxpdMvLDFXi7wQ3CY+fj8c9Qs4i3zTYIXgO/rP5wO/QY/Lv7bhhOCp2tvvy6H/QI/M1iIjBE/V/nyZH/wv9NhcLaaF4JcvfxaHxxKZV6hJIXiqtgSiiekJXEoIrsG/xL94gP6H5GubhBC8ToYCwomJLNJC8FSNBqKJiQkcKQRP1VJANJFuGpQQPFV7SAL9P/AaB9k0CCF4qsYB4VkkZjdrIXiqxgPRWSQWTq+E4DaRA6KJ63U3SyH4Y/55IJy4bBoLIbhNSIBo4rJpxELwcsrNlSxwv2Y7xmKxZiQE16AUiCbGtTgXvmIbvRx4Bf3J3sWdxkwIbhO6HaC30P89bxoXIXjVvXaLK3aj7awWz0Jwm9Dv4cUSL3PUSQhuEz/UQPRAPTeNkxC888W2CxubxWm3zVHYuAbLEE9N4yAE3w/a99GXqMVRWO83X7KB3RF+aBoBvknZAyzx2zYBvUnZByzw2zYBvMXV/6EA9E9MBuwBvRnEZ/EmQO/OEEAs8WG80uCIGCCS+HDsFigi7GMdsFocnzEcOj6GiMrgGJgsHh6iHGdtCCISiCEenxKdZt5+IhaIGKinx2DT3ZOXiAb6szg95zvfAfuIeKCXeH6QeXmK4SGWAPqIlye1sydRdiKuTcRhr8XZo+j500QrsUwGx7Bmcf6sPXoibCOWA1qJ0cuE+Km+hVgSaCPGb0sWb2b0xLJASy0uXgct365piaWB+iwu33et3pDqiOWBWuLqhd76LbeGWKpNxKEZqOs3lsRKBTmxRgbHkGeReCVLrTaREmsB5Vmk3jmTK4ZkxHpAaRbJl+r0qi8JsU4NTiHJIr1qILFyL0+smcEx8llMLItIrb7MEWsD81lMrftIrqDliXWH6DF4YnJhS3oVNEdsAeSJ6ZU7zEr2NLENkCMyS5O43QgpYv0anCJ1ueHWXrE7SmhiqwyOQWeRXVzG7wqiiO0yOAZF5FfPZXZ2rYktMzjGmphZHpjbnbcktgauibn1j9kdljER8zF/X9ypgIJdsnNi+wyOcacBSnY6bzoDzomCJbqS3eqbzoAXomQNsuiLA5vOgBNRtMha9tWITWfAI1G2ilz45Y9NZ8CRKAOKv97yzXwqpUJ6Rv8DtlyJUd7yr3UAAAAASUVORK5CYII="
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
                className="h-96 w-80 bg-black border-gray-700 border cursor-pointer flex items-end bg-cover bg-no-repeat"
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
    </>
  );
}

export default BlackHoles;
