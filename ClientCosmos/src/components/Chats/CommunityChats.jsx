import React, { useEffect, useRef, useState } from "react";
import userchaticon from "../../Assets/userW.png";
import groupchaticon from "../../Assets/group-chatW.png";
import home from "../../Assets/homeW.png";
import more from "../../Assets/more.png";
import useUserData from "../utils/UserData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { Drawer, Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useForm } from "react-hook-form";
import { Pane, FileUploader, FileCard } from "evergreen-ui";
import { imDB } from "../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

function Chats() {
  const { userData } = useUserData();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [selectedSection, setSelectedSection] = useState("ALL");
  const [isJoinPopUp, setIsJoinPopUp] = useState(false);
  const [communityData, setCommunityData] = useState(false);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const { register, handleSubmit } = useForm();
  const [communityCreationLoading, setCommunityCreationLoading] =
    useState(false);
  const [fileRejections, setFileRejections] = useState([]);

  const handleChange = React.useCallback((files) => setFiles([files[0]]), []);
  const handleRejected = React.useCallback(
    (fileRejections) => setFileRejections([fileRejections[0]]),
    []
  );

  const handleRemove = React.useCallback(() => {
    setFiles([]);
    setFileRejections([]);
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCommunitySelect = (community) => {
    setSelectedCommunity(community);
    setMessages([]);
  };

  const fetchAllCommunities = async () => {
    try {
      const response = await axios.get(
        `https://s50-musthafa-capstone-cosmos.onrender.com/community/getAll/${userData?._id}`
      );
      setCommunities(response.data);
    } catch (error) {
      console.error("Error fetching communities:", error);
    }
  };

  const fetchMyCommunities = async () => {
    try {
      const response = await axios.get(
        `https://s50-musthafa-capstone-cosmos.onrender.com/community/mycommunities/${userData?._id}`
      );
      setCommunities(response.data);
    } catch (error) {
      console.error("Error fetching communities:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      if (selectedSection === "ALL") {
        fetchAllCommunities();
      } else {
        fetchMyCommunities();
      }
    }
  }, [selectedSection, userData]);

  useEffect(() => {
    const newSocket = io("https://s50-musthafa-capstone-cosmos.onrender.com", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (selectedCommunity && socket) {
      socket.emit("joinCommunity", selectedCommunity._id);

      socket.on("communityMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `https://s50-musthafa-capstone-cosmos.onrender.com/chat/${selectedCommunity._id}`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
      fetchTheCommunityData();

      return () => {
        socket.off("communityMessage");
      };
    }
  }, [selectedCommunity, socket]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messagePayload = {
        name: userData.name,
        message: newMessage,
        date: new Date(),
        profile_picture: userData.profilePic,
        communityId: selectedCommunity._id,
      };

      socket.emit("communityMessage", messagePayload);
      setNewMessage("");

      const updatedCommunities = communities.map((community) =>
        community._id === selectedCommunity._id
          ? { ...community, latestMessageTime: new Date() }
          : community
      );

      updatedCommunities.sort(
        (a, b) => (b.latestMessageTime || 0) - (a.latestMessageTime || 0)
      );
      setCommunities(updatedCommunities);
    }
  };

  const fetchTheCommunityData = async () => {
    try {
      const response = await axios.get(
        `https://s50-musthafa-capstone-cosmos.onrender.com/community/details/${selectedCommunity._id}`
      );
      setCommunityData(response.data);
    } catch (error) {
      console.error("Error fetching community data:", error);
    }
  };

  const handleJoinCommunity = async () => {
    const data = {
      userId: userData._id,
      communityid: selectedCommunity._id,
    };
    try {
      const response = await axios.post(
        "https://s50-musthafa-capstone-cosmos.onrender.com/community/join",
        data
      );
      console.log(response.data);
      setIsJoinPopUp(true);
    } catch (err) {
      console.log("Error while joining", err);
    }
  };

  const closeModalPP = () => {
    document.getElementById("my_modal_1").close();
  };

  const onSubmit = async (data) => {
    setCommunityCreationLoading(true);
    try {
      const id = userData._id;
      const imgS = ref(imDB, `images${v4()}`);
      const uploadData = await uploadBytes(imgS, files[0]);
      const imageUrl = await getDownloadURL(uploadData.ref);

      const requestData = {
        ...data,
        creator: id,
        communityprofile: imageUrl,
      };

      const response = await axios.post(
        "https://s50-musthafa-capstone-cosmos.onrender.com/community/create",
        requestData
      );

      const { community, message } = response.data;
      console.log(community);
      setSelectedSection("YOURS");
      setCommunityCreationLoading(false);
      setSelectedCommunity(community);
      closeModalPP();
    } catch (error) {
      console.error("Error creating community:", error);
    }
  };

  const Joined = () => {
    setIsJoinPopUp(false);
    navigate("/Chats");
  };

  const EnableTheDetails = () => {
    setOpen(true);
  };

  const DeleteCommunity = async () => {
    try {
      const response = await axios.delete(
        `https://s50-musthafa-capstone-cosmos.onrender.com/community/delete/${communityData._id}`
      );
      window.location.reload();
    } catch (err) {
      console.log("Error while deleting the community");
    }
  };

  const ExitCommunity = async () => {
    const userID = userData._id;
    try {
      const response = await axios.post(
        `https://s50-musthafa-capstone-cosmos.onrender.com/community/exit`,
        {
          userId: userID,
          communityId: communityData._id,
        }
      );
      window.location.reload();
    } catch (err) {
      console.log("Error while exiting the community", err);
    }
  };

  // Searching part
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAndFilterCommunities = async () => {
      try {
        let response;
        if (selectedSection === "ALL") {
          response = await axios.get(
            `https://s50-musthafa-capstone-cosmos.onrender.com/community/getAll/${userData?._id}`
          );
        } else {
          response = await axios.get(
            `https://s50-musthafa-capstone-cosmos.onrender.com/community/mycommunities/${userData?._id}`
          );
        }

        const allCommunities = response.data;
        const filtered = allCommunities.filter((community) =>
          community.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCommunities(filtered);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    if (userData) {
      fetchAndFilterCommunities();
    }
  }, [searchTerm, selectedSection, userData]);

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row">
      {isJoinPopUp && (
        <div>
          <div className="overlay"></div>
          <div className="border logout-popup w-fit p-5 rounded flex flex-col justify-around text-center">
            <h2 className="text-xl mb-2 font-poppins">
              You joined the community {selectedCommunity.name}
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
      <ul className="lg:h-full flex lg:flex-col items-center gap-5 lg:gap-20 bg-black py-2 lg:py-10 px-4">
        <li>
          <img
            className="cursor-pointer w-6"
            onClick={() => navigate("/HomePage")}
            src={home}
            alt="Home"
          />
        </li>
        <li>
          <img
            className="cursor-pointer w-6"
            src={userchaticon}
            alt="User Chat"
            onClick={() => navigate("/Chats")}
          />
        </li>
        <li>
          <img
            className="cursor-pointer w-10"
            src={groupchaticon}
            alt="Group Chat"
            onClick={() => navigate("/CommunityChats")}
          />
        </li>
      </ul>

      {/* Main Content */}
      <div className="w-full h-full flex flex-col">
        <nav className="flex justify-between items-center px-4 lg:px-10 py-3 shadow-gray-200 shadow-md w-full bg-white">
          <div className="w-full">
            <input
              type="text"
              className="bg-white outline-none border py-2 rounded-xl w-full lg:w-[30vw] px-3 font-light"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <div
              onClick={() => navigate("/profile")}
              className="cursor-pointer flex items-center hover:border-gray-400 rounded-md py-1 px-3 duration-300 border border-transparent gap-2 lg:gap-6"
            >
              <div className="flex flex-col items-center">
                <h2 className="font-bold text-start">
                  {userData?.name || "Guest"}
                </h2>
                <p className="text-xs -mt-3 text-end">Online</p>
              </div>
              <div
                className="w-10 lg:w-12 h-10 lg:h-12 bg-cover rounded-full"
                style={{
                  backgroundImage: `url(${
                    userData?.profilePic || userchaticon
                  })`,
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
          </div>
        </nav>

        {/* Chat Window */}
        <div className="flex flex-col lg:flex-row h-full">
          <div className="w-full lg:w-[45vh] shadow-md shadow-gray-600 p-2 h-[30vh] lg:h-full overflow-y-auto bg-white">
            <Drawer backdrop={true} open={open} onClose={() => setOpen(false)}>
              <div className="w-full h-full p-4 bg-white rounded-lg shadow-lg overflow-auto">
                <h2 className="text-3xl font-bold mb-2 text-gray-800">
                  {communityData?.name}
                </h2>
                <div className="flex justify-center">
                  <div
                    className="bg-cover w-48 h-48 rounded-md mb-4"
                    style={{
                      backgroundImage: `url(${communityData?.communityprofile})`,
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
                <p className="text-gray-700 mb-4">
                  {communityData?.description}
                </p>
                <div className="h-[45vh] overflow-auto myPosts">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Members
                  </h3>
                  {communityData?.members?.length ? (
                    <ul className="space-y-1">
                      {communityData.members.map((member, index) => (
                        <li
                          key={index}
                          className="text-gray-600 w-full flex items-center gap-3 py-2 px-3 border"
                        >
                          <div
                            className="w-12 h-12 bg-cover"
                            style={{
                              backgroundImage: `url(${member.profilePic})`,
                              backgroundPosition: "center",
                            }}
                          ></div>
                          <h2 className="font-semibold tracking-wide">
                            {member.name}
                          </h2>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No members yet.</p>
                  )}
                </div>
                <div>
                  {userData?._id == communityData?.creator ? (
                    <button
                      onClick={() => DeleteCommunity()}
                      className="bg-red-500 px-3 py-2 rounded-sm text-white"
                    >
                      Delete Community
                    </button>
                  ) : (
                    <button
                      onClick={() => ExitCommunity()}
                      className="bg-red-500 px-3 py-2 rounded-sm text-white"
                    >
                      Exit Community
                    </button>
                  )}
                </div>
              </div>
            </Drawer>
            <div className="flex flex-col justify-between h-[83vh]">
              <div className="w-full flex items-center justify-center gap-2 mb-4">
                <button
                  onClick={() => setSelectedSection("ALL")}
                  className={`py-2 ${
                    selectedSection === "ALL"
                      ? "bg-black border-none transition duration-500 text-white"
                      : ""
                  } font-thin tracking-wider border w-full `}
                >
                  ALL
                </button>
                <button
                  onClick={() => setSelectedSection("YOURS")}
                  className={`py-2 ${
                    selectedSection === "YOURS"
                      ? "bg-black border-none transition duration-500 text-white"
                      : ""
                  } font-thin border tracking-wider w-full `}
                >
                  YOURS
                </button>
              </div>
              <div className="overflow-auto myPosts h-full">
                {communities.length > 0 ? (
                  communities.map((community) => (
                    <div
                      key={community._id}
                      onClick={() => handleCommunitySelect(community)}
                      className={`w-full cursor-pointer hover:bg-gray-100 duration-300 rounded-lg px-7 py-2 flex items-center gap-4 ${
                        selectedCommunity?._id === community._id
                          ? "bg-gray-200"
                          : ""
                      }`}
                    >
                      <div
                        className="w-10 bg-cover lg:w-12 h-10 lg:h-12 rounded-full"
                        style={{
                          backgroundImage: `url(${community.communityprofile})`,
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <h2 className="text-sm lg:text-base">{community.name}</h2>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex justify-center">
                    <p className="text-gray-600 text-2xl mt-44 tracking-wider text-center w-full">No communities found.</p>
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                  className="w-full bg-black text-white tracking-wider py-2"
                >
                  CREATE COMMUNITY
                </button>
              </div>
            </div>
          </div>

          <div className="myPosts mt-0">
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box myPosts h-fit bg-white">
                <div className="modal-action mt-0">
                  <form method="dialog">
                    <button className="">✕</button>
                  </form>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-3xl tracking-wider">
                    CREATE YOUR COMMUNITY
                  </h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="py-8">
                  <h2 className="font-light text-sm mb-1">Community name</h2>
                  <input
                    {...register("name")}
                    className="bg-white pl-3 font-light rounded-md mb-5 border outline-none w-full h-10"
                    type="text"
                  />
                  <h2 className="font-light text-sm mb-1">
                    Community Description
                  </h2>
                  <input
                    {...register("description")}
                    className="bg-white pl-3 font-light rounded-md mb-5 border outline-none w-full h-10"
                    type="text"
                  />
                  <h2 className="font-light text-sm mb-1">Community profile</h2>
                  <Pane maxWidth={654}>
                    <FileUploader
                      maxSizeInBytes={50 * 1024 ** 2}
                      maxFiles={1}
                      onChange={handleChange}
                      onRejected={handleRejected}
                      renderFile={(file) => {
                        const { name, size, type } = file;
                        const fileRejection = fileRejections.find(
                          (fileRejection) => fileRejection.file === file
                        );
                        const { message } = fileRejection || {};
                        return (
                          <FileCard
                            key={name}
                            isInvalid={fileRejection != null}
                            name={name}
                            onRemove={handleRemove}
                            sizeInBytes={size}
                            type={type}
                            validationMessage={message}
                          />
                        );
                      }}
                      values={files}
                    />
                  </Pane>

                  <button
                    type="submit"
                    className="bg-black flex justify-center items-center w-full mt-7 h-10 rounded-md text-white"
                  >
                    {communityCreationLoading ? (
                      <div>
                        <PulseLoader color="#ffffff" size={11} />
                      </div>
                    ) : (
                      <h2>CREATE</h2>
                    )}
                  </button>
                </form>
              </div>
            </dialog>
          </div>

          {/* Chat Area */}
          <div className="w-full flex flex-col h-full">
            {selectedCommunity ? (
              <>
                <nav className="w-full cursor-pointer hover:bg-slate-300 duration-300 flex justify-between items-center px-4 lg:px-10 py-3 bg-slate-200">
                  <div className="flex items-center gap-3">
                    <>
                      <div className="flex justify-center gap-2">
                        <span className="flex items-center">
                          <svg
                            onClick={() => setSelectedCommunity(null)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-7 h-7 hover:bg-slate-400 rounded-md duration-300 transform rotate-180"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                            ></path>
                          </svg>
                        </span>
                        <div
                          className="w-10 lg:w-12 h-10 lg:h-12 bg-cover rounded-full"
                          style={{
                            backgroundImage: `url(${selectedCommunity.communityprofile})`,
                            backgroundPosition: "center",
                          }}
                        ></div>
                      </div>
                      <h2 className="text-sm lg:text-base">
                        {selectedCommunity.name}
                      </h2>
                    </>
                  </div>
                  <div>
                    <img
                      onClick={() => EnableTheDetails()}
                      className="cursor-pointer hover:bg-slate-400 duration-500 rounded-full h-7 lg:h-9"
                      src={more}
                      alt="More Options"
                    />
                  </div>
                </nav>

                <div className=" p-3 h-[69vh] myPosts overflow-y-auto">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex mb-2 ${
                        message?.name === userData.name
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex items-start gap-2.5 ${
                          message?.name === userData.name
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        <img
                          className="w-8 h-8 rounded-full"
                          src={
                            message?.name === userData.name
                              ? userData.profilePic
                              : message?.profile_picture
                          }
                          alt="profile"
                        />
                        <div
                          className={`flex flex-col w-full max-w-[320px] leading-1.5 px-4 py-3  ${
                            message?.name === userData.name
                              ? "bg-gray-700 text-white rounded-s-xl rounded-e-xl"
                              : "bg-gray-100 text-black rounded-e-xl rounded-s-xl"
                          }`}
                        >
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold">
                              {message?.name === userData.name
                                ? "You"
                                : message?.name}
                            </span>
                          </div>
                          <p className="text-sm font-normal py-2.5">
                            {message?.message}
                          </p>
                          <span className="text-sm text-end font-normal text-gray-500 dark:text-gray-400">
                            {new Date(message?.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div ref={messagesEndRef} />
                </div>

                <div className="w-full px-4 lg:px-6 py-2 flex items-center gap-2">
                  {selectedCommunity?.members.includes(userData._id) ? (
                    <>
                      <input
                        type="text"
                        className="flex-grow font-light bg-white px-4 py-2 outline-none border rounded-sm"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-gray-600 text-white rounded-sm px-4 py-2 duration-300 hover:bg-gray-900"
                      >
                        Send
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleJoinCommunity}
                      className="bg-gray-500 font-bold tracking-widest text-white rounded-sm px-4 py-2 w-full duration-300 hover:bg-gray-700"
                    >
                      JOIN
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 text-2xl tracking-wider font-bold">
                  Select a community to start chatting
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;
