// CommunityChat.js
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShimmerCategoryItem } from "react-shimmer-effects";
import Cookies from "js-cookie";
import io from "socket.io-client";
import CommunityDetailsModal from "./CommunityDetailsModal";
import useUserData from "../../utils/UserData";

function CommunityChat({
  id,
  setCommunityChatID,
  selectedChat,
  setSelectedChat,
}) {
  const [communityData, setCommunityData] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const { userData } = useUserData();

  const messagesEndRef = useRef(null);

  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("joinCommunity", id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Listen for incoming messages
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, [id]);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/community/${id}`
        );
        setCommunityData(response.data);
      } catch (error) {
        console.error("Error fetching community data:", error);
      }
    };

    const fetchCommunityChatData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/chat/${id}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching community data:", error);
      }
    };

    fetchCommunityData();
    fetchCommunityChatData();
  }, [id]);

  const sendMessage = () => {
    if (message !== "") {
      const newMessage = {
        name: userData.name,
        message: message,
        date: new Date(),
        profile_picture: userData.profilePic,
        communityId: id,
      };

      socket.emit("message", newMessage);
      setMessage("");
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!communityData) {
    return (
      <div className="px-6 h-screen">
        <nav className="px-10 cursor-pointer flex items-center py-6 border-b-2">
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
        </div>
        <div className="cursor-pointer text-xl py-5">
          <ShimmerCategoryItem
            hasImage
            imageType="thumbnail"
            imageWidth={1400}
            imageHeight={100}
          />
        </div>
      </div>
    );
  }

  const ShowCommunityDetails = (id) => {
    setModalOpen(true);
  };

  return (
    <>
      <div className="px-6">
        <div
          onClick={() => ShowCommunityDetails(id)}
          className="pl-5 pr-10 cursor-pointer flex justify-between items-center py-2 border-b-2"
        >
          <div className="flex items-center gap-2">
            <div
              onClick={() => {
                setCommunityChatID("");
                setSelectedChat("");
              }}
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
                className="w-10 rounded-full h-10"
                src={communityData.communityprofile}
                alt=""
              />
            </div>
            <h2 className="text-xl font-semibold">{communityData.name}</h2>
          </div>
          <img
            src="https://seekicon.com/free-icon-download/three-dots-vertical_1.png"
            className="text-end flex cursor-pointer h-5"
          />
        </div>
        <div className="h-[66vh] myPosts pb-7 overflow-auto">
          {messages
            .filter((msg) => msg.name && msg.message && msg.date)
            .map((msg, index) => (
              <div
                key={index}
                className={`chat ${
                  msg.name === userData?.name ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src={msg.profile_picture} alt="Avatar" />
                  </div>
                </div>
                <div
                  className={`chat-bubble shadow-lg py-4 ${
                    msg.name === userData?.name
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
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex">
          <input
            type="text"
            value={message}
            placeholder="Type a message"
            className="bg-white outline-none py-3 pl-4 px-3 font-light border w-full"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            onClick={() => sendMessage()}
            className={`py-3 pl-4 px-3 font-light border text-white transition-colors duration-300 ${
              message === "" ? "bg-black" : "bg-blue-600"
            }`}
          >
            SEND
          </button>
        </div>
      </div>
      <CommunityDetailsModal
        communityID={id}
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
      />
    </>
  );
}

export default CommunityChat;
