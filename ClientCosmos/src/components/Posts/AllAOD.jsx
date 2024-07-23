import axios from "axios";
import React, { useEffect, useState } from "react";
import { ShimmerPostItem } from "react-shimmer-effects";

function AllAOD() {
  const [AODS, setAODS] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchALLAODs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/news/fetchAllAods"
        );
        setAODS(response.data);
        setLoading(false);
      } catch (err) {
        console.log("Error while fetching AOD's", err);
        setLoading(false);
      }
    };

    fetchALLAODs();
  }, []);

  return (
    <div className="bg-white mt-5 shadow-lg">
      {loading ? (
        <div>
          {[...Array(3)].map((_, index) => (
            <ShimmerPostItem
              key={index}
              card
              title
              cta
              imageType="thumbnail"
              imageWidth={700}
              imageHeight={300}
              contentCenter
            />
          ))}
        </div>
      ) : (
        AODS.reverse().map((apod, index) => (
          <div key={index} className="mt-5 border px-7 py-5">
            <h2 className="text-2xl font-bold">{apod.title}</h2>
            <div className="flex justify-center w-full">
              <div className="w-full">
                {apod.media_type === "image" ? (
                  <img className="mt-5" src={apod.hdurl} alt={apod.title} />
                ) : (
                  <div className=" w-full">
                    <iframe
                      className="mt-5 h-[40vh] w-full"
                      src={apod.url}
                      title={apod.title}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <div className="mt-2 flex justify-between">
                  <p className="font-light">Credits: NASA</p>
                  <p className="font-light">Date: {apod.date}</p>
                </div>
              </div>
            </div>
            <p className="font-light mt-6">
              <strong>Explanation:</strong> {apod.explanation}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default AllAOD;
