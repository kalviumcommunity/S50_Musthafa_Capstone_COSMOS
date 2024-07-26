import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShimmerPostItem } from "react-shimmer-effects";
import Cookies from "js-cookie";
import useUserData from "../../utils/UserData";

function AllCommunity({ selectedChat, setSelectedChat , setCommunityJoinId }) {
  const [communities, setCommunities] = useState([]);
  const { user } = useUserData();

  useEffect(() => {
    if (user) {
      fetchCommunities();
    }
  }, [user]);

  const fetchCommunities = async () => {
    setSelectedChat("")
    try {
      const response = await axios.get(
        `https://s50-musthafa-capstone-cosmos.onrender.com/community/getAll/${user._id}`
      );
      setCommunities(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const setIdToJoin = (Commid) => {
    setSelectedChat(Commid)
    setCommunityJoinId(Commid)
  }

  return (
    <>
      <div className="p-2">
        <div>
          {communities.length > 0 ? (
            communities.map((communityItem, index) => (
              <div
                onClick={() => setIdToJoin(communityItem._id)}
                className={`flex hover:bg-gray-100 hover:cursor-pointer duration-300 py-2 px-6 gap-4 items-center rounded-md ${
                  selectedChat === communityItem._id ? "bg-gray-400 hover:bg-gray-400" : ""
                }`}
                key={index}
              >
                <img
                  src={communityItem.communityprofile}
                  alt="DP"
                  className="h-16 w-16 rounded-full"
                />
                <div>
                  <h2 className="text-xl line-clamp-1">{communityItem.name}</h2>
                  <p className="line-clamp-1">{communityItem.description}</p>
                </div>
              </div>
            ))
          ) : communities.length === 0 ? (
            <div className="text-center h-96 flex items-center text-2xl font-bold font-poppins text-gray-700">
              There is no communities created
            </div>
          ) : (
            <>
              {/* <ShimmerPostItem
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
              /> */}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AllCommunity;
