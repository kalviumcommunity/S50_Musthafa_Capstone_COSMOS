import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShimmerPostItem } from "react-shimmer-effects";
import Cookies from "js-cookie"
function AllCommunity() {
  const [userData, setUserData] = useState(null);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.post(
            "http://localhost:3000/users/tokenvalidate",
            { token }
          );
          const { valid, user } = response.data;
          setUserData(user);
        } catch (error) {
          Cookies.remove("token");
          console.error("Error in post request", error);
        }
      } else {
        console.log("Token is not there");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchCommunities();
    }
  }, [userData]);

  const fetchCommunities = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/community/getAll/${userData._id}`
      );
      setCommunities(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="p-4 md:p-14">
        <h2 className="text-4xl tracking-wide font-bold">
          BROWSE BY THE TOPIC
        </h2>
        <div className="pt-4 md:pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
          {communities.length > 0 ? (
            communities.map((communityItem, index) => (
              <Link
                to={`/communityjoin/${communityItem._id}`}
                className="card card-compact grid items-end rounded-sm bg-cover w-full bg-black text-white cursor-pointer duration-300 hover:shadow-2xl"
                key={index}
              >
                <figure>
                  <div className="w-full h-52">
                    <img
                      src={communityItem.communityprofile}
                      alt="DP"
                      className="w-full"
                    />
                  </div>
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-xl">{communityItem.name}</h2>
                  <p className="line-clamp-2">{communityItem.description}</p>
                </div>
              </Link>
            ))
          ) : (
            <>
              <ShimmerPostItem
                card
                title
                cta
                imageType="thumbnail"
                imageWidth={80}
                imageHeight={80}
                contentCenter
              />
              <ShimmerPostItem
                card
                title
                cta
                imageType="thumbnail"
                imageWidth={80}
                imageHeight={80}
                contentCenter
              />
              <ShimmerPostItem
                card
                title
                cta
                imageType="thumbnail"
                imageWidth={80}
                imageHeight={80}
                contentCenter
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AllCommunity;
