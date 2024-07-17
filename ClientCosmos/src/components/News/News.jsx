import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function News({ setSelectedNews }) {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    const fetchAllNewses = async () => {
      try {
        const response = await axios.get(
          "https://s50-musthafa-capstone-cosmos.onrender.com/news/getallnews"
        );
        console.log(response.data);
        setNews(response.data);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    fetchAllNewses();
  }, []);

  useEffect(() => {
    const filtered = news.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(filtered);
  }, [searchTerm, news]);

  const handleNewsClick = (detail) => {
    setSelectedNews(detail);
    navigate("/selenews");
  };

  const navigateBack = () => {
    navigate("/HomePage");
  };

  return (
    <>
      <div className="px-6 py-10">
        <nav className="flex px-10 items-center justify-between bg-gray-100">
          <div className="w-full">
            <div className="flex items-center gap-3">
              <span
                className="mr-2 hover:cursor-pointer"
                onClick={navigateBack}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10 transform rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  ></path>
                </svg>
              </span>
              <h2 className="text-4xl font-bold tracking-widest">
                NEWS UPDATES
              </h2>
            </div>
          </div>
          <div className="w-full">
            <div className="flex w-3/4 my-6 rounded-lg shadow-sm">
              <input
                type="text"
                id="hs-trailing-button-add-on-with-icon"
                name="hs-trailing-button-add-on-with-icon"
                placeholder="Search here"
                className="py-3 border px-4 block w-full shadow-lg rounded-s-lg text-sm focus:z-10 disabled:opacity-50 bg-white disabled:pointer-events-none outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="button"
                className="w-[2.875rem] h-[2.875rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-black text-white hover:bg-gray-800 duration-500 disabled:opacity-50"
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
        <div className="">
          <div className="my-10 mx-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-7">
            {filteredNews &&
              filteredNews.map((detail, index) => (
                <div
                  key={index}
                  className="hover:shadow-lg duration-300 border text-white cursor-pointer rounded-xl"
                  onClick={() => handleNewsClick(detail)}
                >
                  <div className="w-full rounded-lg shadow-inner">
                    <img
                      className="rounded-lg w-full h-52"
                      src={detail.imageUrl}
                      alt=""
                    />
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
      </div>
    </>
  );
}

export default News;
