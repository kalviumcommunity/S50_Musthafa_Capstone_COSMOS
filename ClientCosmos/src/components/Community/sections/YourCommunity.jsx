import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { ShimmerPostItem } from "react-shimmer-effects";
import useUserData from "../../utils/UserData";

function YourCommunity({ selectedChat, setSelectedChat, setCommunityChatID }) {
  const [userCommunities, setUserCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserData();

  useEffect(() => {
    if (user?._id) {
      fetchUserCommunities();
    }
  }, [user?._id]);

  const fetchUserCommunities = async () => {
    setSelectedChat("");
    try {
      const response = await axios.get(
        `https://s50-musthafa-capstone-cosmos.onrender.com/community/mycommunities/${user._id}`
      );
      setUserCommunities(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const SelectCommunityChat = (id) => {
    setCommunityChatID(id);
    setSelectedChat(id);
  };

  return (
    <>
      <div className="p-2">
        <div>
          {loading ? (
            <div className="p-2">
              {[...Array(3)].map((_, index) => (
                <ShimmerPostItem
                  key={index}
                  card
                  title
                  cta
                  imageType="thumbnail"
                  imageWidth={80}
                  imageHeight={80}
                  contentCenter
                />
              ))}
            </div>
          ) : userCommunities.length === 0 ? (
            <div className="text-center h-96 flex items-center text-2xl font-bold font-poppins text-gray-700">
              You haven't joined any communities yet
            </div>
          ) : (
            userCommunities.map((communityItem, index) => (
              <div
                onClick={() => SelectCommunityChat(communityItem._id)}
                className={`flex hover:bg-gray-100 hover:cursor-pointer duration-300 py-2 px-6 gap-4 items-center rounded-md ${
                  selectedChat === communityItem._id
                    ? "bg-gray-400 hover:bg-gray-400"
                    : ""
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
          )}
        </div>
      </div>
    </>
  );
}

export default YourCommunity;
