import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SelectedNews({ setSelectedNews, selectedNews }) {
  const handleNewsClick = (e) => {
    setSelectedNews(e);
  };

  const [relatedNewsData, setRelatedNewsData] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchRelatedNews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/news/getRelatedNews/${selectedNews.topic}`
        );
        console.log(response.data);
        setRelatedNewsData(response.data);
      } catch (err) {
        console.log("Error while fetching related News", err);
      }
    };

    fetchRelatedNews();
  }, [selectedNews]);

  return (
    <>
      <div className="p-10">
        <nav className="flex px-10 items-center justify-between py-3 bg-gray-100">
          <ul className="flex gap-10">
            <li
              className=" cursor-pointer"
              onClick={() => ProfileClick("HomePage")}
            >
              HOME
            </li>
            <li
              className=" cursor-pointer"
              onClick={() => ProfileClick("news")}
            >
              NEWS
            </li>
          </ul>
          <div>
            <input
              className="w-96 h-10 rounded-sm bg-white outline-none border pl-3 font-poppins tracking-wide"
              placeholder="Search more news"
              type="text"
            />
          </div>
          <div
            onClick={() => ProfileClick("profile")}
            className="flex items-center gap-3 justify-between cursor-pointer bg-gray-200 px-3 py-2 rounded-xl"
          >
            <div className="rounded">
              <img
                className="rounded-lg h-8"
                src="https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220"
              />
            </div>
            <div className="font-poppins text-sm">Musthafa</div>
          </div>
        </nav>
        <div className="flex">
          <div className="mt-10">
            <h2 className="text-5xl font-bold w-full mb-4">
              {selectedNews.title}
            </h2>
            <div className="gap-10">
              <div className="w-full flex justify-center py-6">
                <img src={selectedNews.imageUrl} alt="" className="h-3/4 w-3/4" />
              </div>
              <div className="text-2xl font-light">
                <p className="">{selectedNews.description}</p>
              </div>
            </div>
          </div>
          <div className="px-10">
            <h2 className="text-3xl font-semibold mt-14">RELATED NEWS</h2>
            <div className="grid gap-10 mt-8">
              {relatedNewsData &&
                relatedNewsData.map((news, index) => (
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
        </div>
      </div>
    </>
  );
}

export default SelectedNews;
