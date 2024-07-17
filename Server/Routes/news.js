const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const Apod = require("../Schemas/APOD");

const news = [
  {
    imageUrl:
      "https://cdn.mos.cms.futurecdn.net/jXP7m9jGGM2XPS74BHoJq3-1200-80.jpg.webp",
    title:
      "The James Webb Space Telescope is digging deep into the mysteries of gas planets",
    description:
      "Some of the senior researchers thought that it would never be possible to do this, but with some more rigorous tests for a few months, we confirmed that we have done it",
    datePosted: "13/03/2024",
    topic: "solar system", // Gas planets are part of the solar system
  },
  {
    imageUrl:
      "https://cdn.mos.cms.futurecdn.net/UsyVTcvivR63vNJx7NVf6D-970-80.jpg.webp",
    title: `SpaceX's Starship will go interstellar someday, Elon Musk says`,
    description: `A future iteration of Starship, which conducted its third-ever test flight last week, will go interstellar, according to SpaceX founder and CEO Elon Musk.
      "This Starship is designed to traverse our entire solar system and beyond to the cloud of objects surrounding us. A future Starship, much larger and more advanced, will travel to other star systems," Musk said via X early Monday morning (March 18).`,
    datePosted: "10/01/2024",
    topic: "solar system", // The focus is on Starship's potential interstellar travel starting from within our solar system
  },
  {
    imageUrl:
      "https://cdn.mos.cms.futurecdn.net/WgwHfgLumAtmUDDt98cU3J-650-80.jpg",
    title:
      "SpaceX launches 22 Starlink satellites from California in dusky evening liftoff",
    description: `A Falcon 9 rocket carrying 22 Starlink spacecraft lifted off tonight from California's Vandenberg Space Force Base at 10:28 p.m. EDT (7:28 p.m. local California time; 0228 GMT on March 19).
            The Falcon 9's first stage came back to Earth about 8.5 minutes after liftoff as planned. It landed vertically on the droneship "Of Course I Still Love You," which was stationed in the Pacific Ocean.`,
    datePosted: "13/03/2024",
    topic: "earth", // The launch and its operations are directly related to Earth
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
    topic: "solar system", // The Apollo-Soyuz mission is related to human spaceflight within our solar system
  },
  {
    imageUrl:
      "https://cdn.mos.cms.futurecdn.net/H83kYZPcHd9CTzemevak3S-650-80.jpg.webp",
    title:
      "Boeing begins fueling Starliner capsule ahead of 1st astronaut launch",
    description: `That mission, called Crew Flight Test (CFT), is currently scheduled to launch in early May atop a United Launch Alliance Atlas V rocket from Cape Canaveral Space Force Station, on Florida's Atlantic coast. It will send NASA astronauts Suni Williams and Butch Wilmore to the International Space Station (ISS) for a roughly 10-day stay.
      On Monday (March 18), Boeing announced that it had taken a significant step toward launch — beginning to load propellant into Starliner, a process that will take about two weeks.`,
    datePosted: "24/03/2024",
    topic: "earth", // The operations are related to launching from Earth
  },
  {
    imageUrl:
      "https://cdn.mos.cms.futurecdn.net/SEa7MkEdgghVtuk7Q69GL5-650-80.jpg.webp",
    title:
      "Virgin Galactic mothership loses alignment pin during space plane launch, FAA investigating",
    description:
      "Virgin Galactic lost a piece of hardware used to mate its VSS Unity suborbital space plane to its VMS Eve mothership aircraft during its most recent commercial spaceflight.",
    datePosted: "29/02/2024",
    topic: "earth", // The incident and investigation are related to operations on Earth
  },
  {
    imageUrl:
      "https://cdn.mos.cms.futurecdn.net/mgLWhyUtVNfEzyeDFUS9cV-650-80.jpg.webp",
    title: "SpaceX's evening Starlink launch wows West Coast skywatchers",
    description: `A SpaceX Falcon 9 rocket lifted off from Vandenberg Space Force Base on California's central coast Monday at 10:28 p.m. EDT (7:28 p.m. local time; 0228 GMT on March 19). The launch vehicle carried a batch of 22 Starlink satellites to add to SpaceX's ever-expanding wireless internet megaconstellation.In what's come to be known as the "jellyfish" effect, the dusk launch provided ideal conditions for the setting sun to light up the rocket's expanding engine plume against the darkening sky, as the vehicle climbed high into Earth's atmosphere.`,
    datePosted: "01/03/2024",
    topic: "earth", // The focus is on the launch and its visual impact as seen from Earth
  },
  {
    imageUrl:
      "https://cdn.mos.cms.futurecdn.net/m4rjHBXqmBQkrtRqS5y4Lc-650-80.jpg.webp",
    title:
      "China's space plane apparently deployed 6 'mysterious wingmen' in orbit",
    description: `China's reusable space plane just got a little more mysterious. Just four days after being launched on its third mission, China's Shenlong ("Divine Dragon") robotic space plane seems to have placed six objects into Earth orbit. Amateur spacecraft trackers around the world have been following the objects closely for days and have recorded emissions coming from some of them. The six mystery objects have been designated OBJECT A, B, C, D, E and F. According to satellite tracker and amateur astronomer Scott Tilley, OBJECT A appears to be emitting signals reminiscent of those emitted by objects that China's space plane has released on previous missions.`,
    datePosted: "29/02/2024",
    topic: "earth", // The operations and observations are related to Earth's orbit
  },
  {
    imageUrl:
      "https://www.nasa.gov/wp-content/uploads/2024/03/h1821.jpg?resize=2000,2000",
    title: "NASA's Chandra Identifies an Underachieving Black Hole",
    description:
      "This image shows a quasar, a rapidly growing supermassive black hole, which is not achieving what astronomers would expect from it, as reported in our latest press release. Data from NASA’s Chandra X-ray Observatory (blue) and radio data from the NSF's Karl G. Jansky's Very Large Array (red) reveal some of the evidence for this quasar's disappointing impact on its host galaxy.Known as H1821+643, this quasar is about 3.4 billion light-years from Earth. Quasars are a rare and extreme class of supermassive black holes that are furiously pulling material inwards, producing intense radiation and sometimes powerful jets. H1821+643 is the closest quasar to Earth in a cluster of galaxies.Quasars are different than other supermassive black holes in the centers of galaxy clusters in that they are pulling in more material at a higher rate. Astronomers have found that non-quasar black holes growing at moderate rates influence their surroundings by preventing the intergalactic hot gas from cooling down too much. This regulates the growth of stars around the black hole. The influence of quasars, however, is not as well known. This new study of H1821+643 that quasars — despite being so active — may be less important in driving the fate of their host galaxy and cluster than some scientists might expect.To reach this conclusion the team used Chandra to study the hot gas that H1821+643 and its host galaxy are shrouded in. The bright X-rays from the quasar, however, made it difficult to study the weaker X-rays from the hot gas. The researchers carefully removed the X-ray glare to reveal what the black hole's influence is, which is reflected in the new composite image showing X-rays from hot gas in the cluster surrounding the quasar. This allowed them to see that the quasar is actually having little effect on its surroundings.Using Chandra, the team found that the density of gas near the black hole in the center of the galaxy is much higher, and the gas temperatures much lower, than in regions farther away. Scientists expect the hot gas to behave like this when there is little or no energy input (which would typically come from outbursts from a black hole) to prevent the hot gas from cooling down and flowing towards the center of the cluster.",
    datePosted: "13/03/2024",
    topic: "black holes",
  },
  {
    imageUrl:
      "https://science.nasa.gov/wp-content/uploads/2024/05/black-hole-approach-1.jpg?w=1536&format=webp",
    title: `New NASA Black Hole Visualization Takes Viewers Beyond the Brink`,
    description: `People often ask about this, and simulating these difficult-to-imagine processes helps me connect the mathematics of relativity to actual consequences in the real universe,” said Jeremy Schnittman, an astrophysicist at NASA’s Goddard Space Flight Center in Greenbelt, Maryland, who created the visualizations. “So I simulated two different scenarios, one where a camera — a stand-in for a daring astronaut — just misses the event horizon and slingshots back out, and one where it crosses the boundary, sealing its fate.`,
    datePosted: "10/01/2024",
    topic: "black holes",
  },
  {
    imageUrl:
      "https://science.nasa.gov/wp-content/uploads/2024/01/lisa-2arms-gws-red2.png?w=1536&format=webp",
    title:
      "NASA Collaborating on European-led Gravitational Wave Observatory in Space",
    description: `The first space-based observatory designed to detect gravitational waves has passed a major review and will proceed to the construction of flight hardware. On Jan. 25, ESA (European Space Agency), announced the formal adoption of LISA, the Laser Interferometer Space Antenna, to its mission lineup, with launch slated for the mid-2030s. ESA leads the mission, with NASA serving as a collaborative partner.`,
    datePosted: "13/03/2024",
    topic: "stars",
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
    topic: "galaxies",
  },


  {
    imageUrl:
      "https://science.nasa.gov/wp-content/uploads/2024/04/hubble-ngc3783-potw2416a.jpg?w=1536&format=webp",
    title: "Hubble Captures a Bright Galactic and Stellar Duo ",
    description: `This image from the NASA/ESA Hubble Space Telescope features NGC 3783, a bright barred spiral galaxy about 130 million light-years from Earth that also lends its name to the eponymous NGC 3783 galaxy group. Like galaxy clusters, galaxy groups are aggregates of gravitationally bound galaxies. Galaxy groups, however, are less massive and contain fewer members than galaxy clusters do: whereas galaxy clusters can contain hundreds or even thousands of constituent galaxies, galaxy groups do not typically include more than 50. The Milky Way is actually part of a galaxy group, known as the Local Group, which also holds two other large galaxies (Andromeda and the Triangulum galaxy), as well as several dozen satellite and dwarf galaxies. The NGC 3783 galaxy group contains 47 galaxies. It also seems to be at a fairly early stage of its evolution, making it an interesting object to study. 

    While the focus of this image is the spiral galaxy NGC 3783, the eye is equally drawn to the very bright object in the lower right part of this image. This is the star HD 101274. The perspective in this image makes the star and the galaxy look like close companions, but this is an illusion. HD 101274 lies only about 1,530 light-years from Earth, it is about 85,000 times closer than NGC 3783. This explains how a single star can appear to outshine an entire galaxy! 
    
    NGC 3783 is a type-1 Seyfert galaxy, which is a galaxy with a bright central region. Hubble captures it in incredible detail, from its glowing central bar to its narrow, winding arms and the dust threaded through them, thanks to five separate images taken in different wavelengths of light. In fact, the galactic center is so bright that it exhibits diffraction spikes, normally only seen on stars such as HD 101274.`,
    datePosted: "13/03/2024",
    topic: "galaxies",
  },

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
    topic: "galaxies",
  },
  {
    imageUrl:
      "https://science.nasa.gov/wp-content/uploads/2024/04/hubble-ngc2217-potw2052a.jpg?w=1536&format=webp",
    title: `Hubble Spots a Magnificent Barred Galaxy`,
    description: `The magnificent central bar of NGC 2217 (also known as AM 0619-271) shines bright in the constellation of Canis Major (The Greater Dog), in this image taken by the NASA/ESA Hubble Space Telescope. Roughly 65 million light-years from Earth, this barred spiral galaxy is a similar size to our Milky Way at 100,000 light-years across. Many stars are concentrated in its central region forming the luminous bar, surrounded by a set of tightly wound spiral arms.
The central bar in these types of galaxies plays an important role in their evolution, helping to funnel gas from the disk into the middle of the galaxy. The transported gas and dust are then either formed into new stars or fed to the supermassive black hole at the galaxy's center. Weighing from a few hundred to over a billion times the mass of our Sun, supermassive black holes are present in almost all large galaxies.`,
    datePosted: "10/01/2024",
    topic: "galaxies",
  },

  {
    imageUrl:
      "https://science.nasa.gov/wp-content/uploads/2024/04/hubble-arp72-potw2414a.jpg?w=1536&format=webp",
    title: "Hubble Peers at Pair of Closely Interacting Galaxies",
    description: `This image from the NASA/ESA Hubble Space Telescope features Arp 72, a very selective galaxy group that only includes two galaxies interacting due to gravity: NGC 5996 (the large spiral galaxy) and NGC 5994 (its smaller companion, in the lower left of the image). Both galaxies lie approximately 160 million light-years from Earth, and their cores are separated from each other by a distance of about 67,000 light-years. The distance between the galaxies at their closest points is even smaller, closer to 40,000 light-years. While this might sound vast, in galactic separation terms it is really quite close. For comparison, the distance between the Milky Way and its nearest independent galactic neighbor Andromeda is around 2.5 million light-years. Alternatively, the distance between the Milky Way and its largest and brightest satellite galaxy, the Large Magellanic Cloud (satellite galaxies orbit around another galaxy), is about 162,000 light-years.

    Given this and the fact that NGC 5996 is roughly comparable in size to the Milky Way, it is not surprising that NGC 5996 and NGC 5994 — separated by only about 40,000 light-years — are interacting with one another. In fact, the interaction likely distorted NGC 5996’s spiral shape. It also prompted the formation of the very long and faint tail of stars and gas curving away from NGC 5996, up to the top right of the image. This ‘tidal tail’ is a common phenomenon that appears when galaxies closely interact and is visible in other Hubble images of interacting galaxies.`,
    datePosted: "02/02/2024",
    topic: "galaxies",
  },
  {
    imageUrl:
      "https://science.nasa.gov/wp-content/uploads/2024/05/webb-stsci-01hwqz51tykxttfapc9rq0fnje.png?w=1536&format=webp",
    title:
      "NASA’s Webb Hints at Possible Atmosphere Surrounding Rocky Exoplanet",
    description: `Researchers using NASA’s James Webb Space Telescope may have detected atmospheric gases surrounding 55 Cancri e, a hot rocky exoplanet 41 light-years from Earth. This is the best evidence to date for the existence of any rocky planet atmosphere outside our solar system. 

  Renyu Hu from NASA’s Jet Propulsion Laboratory (JPL) in Pasadena, California, is lead author on a paper published today in Nature. “Webb is pushing the frontiers of exoplanet characterization to rocky planets,” Hu said. “It is truly enabling a new type of science.”`,
    datePosted: "13/03/2024",
    topic: "stars",
  },
  {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzSZ6Fc8qz9r_Rrk3J8ABQ00YufNqxRfwtbg&s",
    title:
      "Juno spacecraft measures oxygen production on Jupiter's moon, Europa",
    description: `NASA's Juno spacecraft has directly measured charged oxygen and hydrogen molecules from the atmosphere of one of Jupiter's largest moons, Europa. According to a new study co-authored by SwRI scientists and led by Princeton University, these observations provide key constraints on the potential oxygenation of its subsurface ocean.`,
    datePosted: "13/03/2024",
    topic: "solar system",
  },
  {
    imageUrl: `https://www.nasa.gov/wp-content/uploads/2024/04/stsci-01hrcmdf63etnvd4h43ezq4gb2.jpg?resize=2000,2000`,
    title: `How NASA’s Roman Telescope Will Measure Ages of Stars`,
    description: `Guessing your age might be a popular carnival game, but for astronomers it’s a real challenge to determine the ages of stars. Once a star like our Sun has settled into steady nuclear fusion, or the mature phase of its life, it changes little for billions of years. One exception to that rule is the star’s rotation period – how quickly it spins. By measuring the rotation periods of hundreds of thousands of stars, NASA’s Nancy Grace Roman Space Telescope promises to bring new understandings of stellar populations in our Milky Way galaxy after it launches by May 2027.
  Stars are born spinning rapidly. However, stars of our Sun’s mass or smaller will gradually slow down over billions of years. That slowdown is caused by interactions between a stream of charged particles known as the stellar wind and the star’s own magnetic field. The interactions remove angular momentum, causing the star to spin more slowly, much like an ice skater will slow down when they extend their arms.
  This effect, called magnetic braking, varies depending on the strength of the star’s magnetic field. Faster-spinning stars have stronger magnetic fields, which causes them to slow down more rapidly. Due to the influence of these magnetic fields, after about one billion years stars of the same mass and age will spin at the same rate. Therefore, if you know a star’s mass and rotation rate, you potentially can estimate its age. By knowing the ages of a large population of stars, we can study how our galaxy formed and evolved over time.
  `,
    datePosted: "13/03/2024",
    topic: "stars",
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
    topic: "stars",
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
    topic: "stars",
  },
  {
    imageUrl: `https://science.nasa.gov/wp-content/uploads/2023/09/Sun_Emits_Flare.jpeg?w=1536&format=webp`,
    title: `NASA’s Fermi Mission Sees No Gamma Rays from Nearby Supernova`,
    description: `A nearby supernova in 2023 offered astrophysicists an excellent opportunity to test ideas about how these types of explosions boost particles, called cosmic rays, to near light-speed. But surprisingly, NASA’s Fermi Gamma-ray Space Telescope detected none of the high-energy gamma-ray light those particles should produce.
  On May 18, 2023, a supernova erupted in the nearby Pinwheel galaxy (Messier 101), located about 22 million light-years away in the constellation Ursa Major. The event, named SN 2023ixf, is the most luminous nearby supernova discovered since Fermi launched in 2008.
  “Astrophysicists previously estimated that supernovae convert about 10% of their total energy into cosmic ray acceleration,” said Guillem Martí-Devesa, a researcher at the University of Trieste in Italy. “But we have never observed this process directly. With the new observations of SN 2023ixf, our calculations result in an energy conversion as low as 1% within a few days after the explosion. This doesn’t rule out supernovae as cosmic ray factories, but it does mean we have more to learn about their production.”`,
    datePosted: "03/09/2024",
    topic: "stars",
  },
];

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Route to fetch all news
router.get("/getallnews", (req, res) => {
  try {
    const shuffledNews = shuffleArray(news);
    res.json(shuffledNews);
  } catch (error) {
    console.error("Error shuffling news:", error);
    res.status(500).json({ message: "Error shuffling news" });
  }
});

//to the homePage random 4 news
router.get("/getrandomnews", (req, res) => {
  const shuffledNews = [...news];
  shuffleArray(shuffledNews);

  const randomNews = shuffledNews.slice(0, 4);

  res.json(randomNews);
});

// // Get all latest news using API
// router.get("/latestnews/api", async (req, res) => {
//   const options = {
//     method: "GET",
//     url: "https://space-news.p.rapidapi.com/news/guardian",
//     headers: {
//       "x-rapidapi-key": "4d57f80c3cmsh220894b8060dac0p183d06jsn2765d1228c85",
//       "x-rapidapi-host": "space-news.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// });

// Astronomic picture of the day
router.get("/apod", async (req, res) => {
  const apiKey = "DEMO_KEY";
  const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  const todayDate = new Date().toISOString().split("T")[0];
  
  try {
    // Check if APOD data for today is already in the database
    let apod = await Apod.findOne({ date: todayDate });
    if (apod) {
      // If found, return the APOD data
      return res.json(apod);
    }
    
    // If not found, fetch it from the NASA API
    const response = await axios.get(apodUrl);
    const apodData = response.data;

    // Create a new APOD document and save it to the database
    const newApod = new Apod(apodData);
    await newApod.save();
    
    // Return the newly saved APOD data
    res.json(newApod);
    
  } catch (error) {
    console.error("Error fetching APOD:", error.response ? error.response.data : error.message);
    res.status(500).json({
      message: "Error fetching APOD",
      error: error.response ? error.response.data : error.message,
    });
  }
});

router.get("/fetchAllAods", async (req, res) => {
  try {
    const apods = await Apod.find();
    res.json(apods);
  } catch (err) {
    console.error("Error while fetching all APODs:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getRelatedNews/:topic", async (req, res) => {
  const topic = req.params.topic;

  try {
    const filteredNews = news.filter((article) => {
      return article.topic === topic;
    });

    shuffleArray(filteredNews);

    const relatedNews = filteredNews.slice(0, 4);
    res.json(relatedNews);
  } catch (error) {
    console.error("Error fetching related news:", error);
    res.status(500).json({ message: "Error fetching related news" });
  }
});

module.exports = router;
