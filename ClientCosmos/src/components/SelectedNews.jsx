import React from "react";
import { useNavigate } from "react-router-dom";

function SelectedNews({ setSelectedNews, selectedNews }) {
  const handleNewsClick = (e) => {
    setSelectedNews(e);
  };
  const navigate = useNavigate()
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
        "https://cdn.mos.cms.futurecdn.net/Brhpn3fsSvibkMvQCcQwua-1200-80.jpg",
      title: "Solving the mystery of gas giant formation",
      description:
        "The James Webb Space Telescope (JWST) has investigated gas flowing from a protoplanetary disk surrounding an infant star, an outflow known as 'disk winds.' The observations could help scientists better understand how gas giants like Jupiter and Saturn are born. The team behind the study focused the JWST on a young, low-mass star called T Cha, located around 350 light-years from Earth. This star is known to have a large gap in the protoplanetary disk that swirls around it. Gaps like this indicate a budding young planet is moving around the star, gathering material. By studying how gas escapes from this disk, the team could learn what conditions favor the formation of gas giants and what conditions favor the formation of rocky planets like Earth. 'Rocky planets very close to the star will have very little or no atmosphere [like Mercury], as it will be stripped away by the sun's high energy photons — similar to photoevaporation,' Naman Bajaj, lead author of the new disk-wind analysis and a scientist with the University of Arizona's Lunar and Planetary Science Laboratory, told Space.com. 'For gas giants, if they happen to form close to the star, it is possible that they find a balance between their gas and the sun's energy.'",
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
    }
    ,
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

  const ProfileClick = (e) => {
    switch (e) {
      case "profile":
        navigate("/profile");
        break;
      case "news":
        navigate("/news");
        break;
      case "HomePage":
        navigate("/HomePage");
        break;
      default:
        break;
    }
  };


  return (
    <>
      <div className="p-10">
        <nav className="flex px-10 items-center justify-between py-3 bg-gray-100">
          <ul className="flex gap-10">
            <li className=" cursor-pointer" onClick={ () => ProfileClick("HomePage")}>HOME</li>
            <li className=" cursor-pointer" onClick={ () => ProfileClick("news")}>NEWS</li>
          </ul> 
          <div>
            <input className="w-96 h-10 rounded-sm bg-white outline-none border pl-3 font-poppins tracking-wide" placeholder="Search more news" type="text" />
          </div>
          <div onClick={() => ProfileClick("profile")} className="flex items-center gap-3 justify-between cursor-pointer bg-gray-200 px-3 py-2 rounded-xl">
            <div className="rounded">
              <img
                className="rounded-lg h-8"
                src="https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220"
              />
            </div>
            <div className="font-poppins text-sm">
              Musthafa
            </div>
          </div>
        </nav>
        <div className="mt-10">
          <h2 className="text-5xl font-bold w-full mb-4">
            {selectedNews.title}
          </h2>
          <div className="flex gap-10 mt-10">
            <img src={selectedNews.imageUrl} alt="" className="h-96" />
            <div className="text-2xl font-light">
              <p className="">{selectedNews.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-10">
      <h2 className="text-3xl font-semibold mt-14">RELATED NEWS</h2>
      <div className="grid grid-cols-3 gap-10 mt-8">
        {relatedNewsData.map((news, index) => (
          <li
            key={index}
            onClick={() => handleNewsClick(news)}
            className="flex flex-col lg:flex-row lg:w-96 items-start lg:items-center mb-4"
          >
            <img
              src={news.imageUrl}
              alt={`Related News Image ${index + 1}`}
              className="w-full lg:w-36 h-32 lg:mr-4"
            />
            <div className="lg:w-full">
              <h4 className="text-md font-semibold line-clamp-2">
                {news.title}
              </h4>
              <p className="text-gray-700 font-light line-clamp-3">
                {news.description}
              </p>
            </div>
          </li>
        ))}
      </div>
      </div>
      
    </>
  );
}

export default SelectedNews;
