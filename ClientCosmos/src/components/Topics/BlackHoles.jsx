import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import WHAM from "../Assets/WHAM.png";
import BHAM from "../../Assets/BHAM.png";
import blackhole from "../../Assets/blackhole.webp"
function BlackHoles({ setSelectedNews }) {
  const [showAnswerIndex, setShowAnswerIndex] = useState(-1);

  const navigate = useNavigate();

  const ProfileClick = (index) => {
    setShowAnswerIndex(showAnswerIndex === index ? -1 : index);
  };

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
          <div className="mb-10">
            <p className="mt-7 text-xl text-white">
              Here's a video for Exploring the Enigmatic World of Black Holes: A
              Scientific Journey
            </p>
            <iframe
              className="mt-3"
              width="800"
              height="550"
              src="https://www.youtube.com/embed/kOEDG3j1bjs?si=sZG9O5PgntbaoiH1"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>

            <div className="flex mt-7 gap-8">
              <div className="mb-10">
                <p className="text-xl text-white">
                  A black hole is a region of spacetime where gravity is so
                  strong that nothing, including light and other electromagnetic
                  waves, is capable of possessing enough energy to escape it.
                  <span className="ml-2">
                    <a
                      href="https://en.wikipedia.org/wiki/Black_hole"
                      className="text-blue-500"
                    >
                      See more
                    </a>
                  </span>
                </p>
              </div>
            </div>

            <h2 className="text-4xl mb-5 font-semibold text-white">
              Einstein's theory of blackhole
            </h2>
            <p className="text-xl  text-white">
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
          <div>
            <h2 className="text-4xl text-white font-bold mt-10">
              Related Balck hole News
            </h2>

            <div>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mt-10">
                {newsData.map((news, index) => (
                  <div
                    key={index}
                    onClick={() => selectedNews(news)}
                    className="bg-white cursor-pointer overflow-auto duration-500"
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
          </div>
          <h2 className="text-4xl mt-14 font-poppins text-white">People also ask:</h2>
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
                    <p className="text-white mb-3">ANSWER</p>
                    <p className="text-white">{item.answer}</p>
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
    </>
  );
}

export default BlackHoles;
