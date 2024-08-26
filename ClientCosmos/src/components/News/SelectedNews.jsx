import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserData from "../utils/UserData";
import { ShimmerThumbnail } from "react-shimmer-effects";

function SelectedNews({ setSelectedNews, selectedNews }) {
  const { userData } = useUserData();
  const [loading, setLoading] = useState(true);
  const [relatedNewsData, setRelatedNewsData] = useState([]);
  const navigate = useNavigate();

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedNews]);

  useEffect(() => {
    const fetchRelatedNews = async () => {
      try {
        const response = await axios.get(
          `https://s50-musthafa-capstone-cosmos.onrender.com/news/getRelatedNews/${selectedNews.topic}`
        );
        setRelatedNewsData(response.data);
      } catch (err) {
        console.log("Error while fetching related News", err);
      }
    };

    fetchRelatedNews();
  }, [selectedNews]);

  const ProfileClick = (route) => {
    switch (route) {
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
            <li
              className="cursor-pointer"
              onClick={() => ProfileClick("HomePage")}
            >
              HOME
            </li>
            <li className="cursor-pointer" onClick={() => ProfileClick("news")}>
              NEWS
            </li>
          </ul>
          <div
            onClick={() => ProfileClick("profile")}
            className="flex items-center gap-3 justify-between cursor-pointer bg-gray-200 px-3 py-2 rounded-xl"
          >
            <div className="rounded">
              <img
                className="rounded-lg h-8"
                src={userData?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt="Profile"
              />
            </div>
            <div className="font-poppins text-sm">{userData?.name || "Guest"}</div>
          </div>
        </nav>

        {loading ? (
          <div className="w-full flex gap-10 mt-10" id="gallery">
            <div className="w-3/4">
              <ShimmerThumbnail height={100} rounded />
              <ShimmerThumbnail height={380} rounded />
            </div>
            <div className="w-1/4">
              <ShimmerThumbnail height={100} rounded />
              <ShimmerThumbnail height={100} rounded />
              <ShimmerThumbnail height={100} rounded />
              <ShimmerThumbnail height={100} rounded />
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="mt-10">
              <h2 className="text-5xl font-bold w-full mb-4">
                {selectedNews.title}
              </h2>
              <div className="gap-10">
                <div className="w-full flex justify-center py-6">
                  <div
                    style={{
                      backgroundImage: `url(${selectedNews.imageUrl})`,
                      backgroundPosition: "center",
                    }}
                    className="w-[60vw] bg-slate-500 bg-cover h-[60vh]"
                  ></div>
                </div>
                <div className="text-2xl font-light">
                  <p>{selectedNews.description}</p>
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
                      className="flex flex-col lg:flex-row lg:w-96 items-start lg:items-center mb-4 cursor-pointer"
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
        )}
      </div>
    </>
  );
}

export default SelectedNews;
