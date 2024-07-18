import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShimmerCategoryItem } from "react-shimmer-effects";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Community({
  setCommunityJoinId,
  CommunityJoinid,
  setActiveButton,
  setCommunityChatID,
  selectedChat,
  setSelectedChat,
}) {
  const [communityData, setCommunityData] = useState(null);
  const [userData, setUserData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isJoinPopUp, setIsJoinPopUp] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const response = await axios.post(
          "https://s50-musthafa-capstone-cosmos.onrender.com/users/tokenvalidate",
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

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const response = await axios.get(
          `https://s50-musthafa-capstone-cosmos.onrender.com/community/${CommunityJoinid}`
        );
        setCommunityData(response.data);
      } catch (error) {
        console.error("Error fetching community data:", error);
      }
    };

    const fetchCommunityChatData = async () => {
      try {
        const response = await axios.get(
          `https://s50-musthafa-capstone-cosmos.onrender.com/chat/${CommunityJoinid}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching community data:", error);
      }
    };

    fetchCommunityData();
    fetchCommunityChatData();
    fetchData();
  }, [CommunityJoinid]);

  const goBack = () => {
    setCommunityJoinId("");
    setSelectedChat("");
  };

  const JoiningtoCommunity = async () => {
    const data = {
      userId: userData._id,
      communityid: CommunityJoinid,
    };
    try {
      const response = await axios.post(
        "https://s50-musthafa-capstone-cosmos.onrender.com/community/join",
        data
      );
      console.log(response.data);
      setIsJoinPopUp(true)
    } catch (err) {
      console.log("Error while joining", err);
    }
  };

  if (!communityData) {
    return (
      <>
        <div className="px-6">
          <nav className="px-10 cursor-pointer flex  items-center pt-7 border-b-2">
            <ShimmerCategoryItem
              hasImage
              imageType="circular"
              imageWidth={80}
              imageHeight={80}
              title
            />
            <ShimmerCategoryItem />
          </nav>

          <div className="myPosts pb-7 overflow-auto">
            <div className="w-2/4 mt-10">
              <ShimmerCategoryItem
                hasImage
                imageType="circular"
                imageWidth={50}
                imageHeight={50}
                title
              />
            </div>
            <div className="w-3/4 mt-10">
              <ShimmerCategoryItem
                hasImage
                imageType="circular"
                imageWidth={50}
                imageHeight={50}
                title
              />
            </div>
            <div className="w-1/4 mt-10">
              <ShimmerCategoryItem
                hasImage
                imageType="circular"
                imageWidth={50}
                imageHeight={50}
                title
              />
            </div>
            <div className="w-2/4 mt-10">
              <ShimmerCategoryItem
                hasImage
                imageType="circular"
                imageWidth={50}
                imageHeight={50}
                title
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  const CLoseTheTab = () => {
    setCommunityJoinId("");
    setSelectedChat("");
  };

  const handleCancel = () => {
    setIsJoinPopUp(false)
  }

  const Joined = () => {
    setActiveButton("YOURS");
    setCommunityJoinId("");
    setCommunityChatID(CommunityJoinid);
  }

  return (
    <>
      <div className="">
        <ToastContainer position="top-center" />
        {isJoinPopUp && (
          <div>
            <div className="overlay"></div>
            <div className="border logout-popup w-fit p-5 rounded flex flex-col justify-around text-center">
              <h2 className="text-xl mb-2 font-poppins">
                You joined the community {communityData.name}
              </h2>
              <div className="flex justify-end">
                <button
                  className="py-2 px-5  bg-black text-white tracking-wider "
                  onClick={() => Joined()}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="px-6">
          <nav className="pl-5 pr-10 cursor-pointer flex justify-between items-center py-4 border-b-2">
            <div className="flex items-center gap-5 ">
              <button
                onClick={() => goBack()}
                className="flex hover:bg-gray-300 duration-500 rounded-full p-2 items-center"
              >
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-7 h-7 transform rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    ></path>
                  </svg>
                </span>
                <img
                  className="w-14 rounded-full h-14"
                  src={communityData.communityprofile}
                  alt=""
                />
              </button>

              <h2 className="text-2xl font-semibold">{communityData.name}</h2>
            </div>
            <div className="text-end flex items-center cursor-pointer">
              <svg
                onClick={() => CLoseTheTab()}
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </nav>
          <div className="h-[60vh] myPosts pb-7 overflow-auto">
            {messages
              .filter((msg) => msg.name && msg.message && msg.date)
              .map((msg, index) => (
                <div
                  key={index}
                  className={`chat ${
                    msg.name === userData.name ? "chat-end" : "chat-start"
                  }`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src={msg.profile_picture} alt="Avatar" />
                    </div>
                  </div>
                  <div
                    className={`chat-bubble shadow-lg py-4 ${
                      msg.name === userData.name
                        ? "text-white bg-gray-900"
                        : "bg-white text-black"
                    }`}
                  >
                    <p className="font-semibold font-poppins">{msg.name}</p>
                    <p className="font-light">{msg.message}</p>
                    <div className="text-gray-400 text-end text-sm">
                      {new Date(msg.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div
            onClick={() => JoiningtoCommunity()}
            className="bg-black font-bold text-white cursor-pointer text-xl flex justify-center py-5"
          >
            JOIN
          </div>
        </div>
      </div>
    </>
  );
}

export default Community;
