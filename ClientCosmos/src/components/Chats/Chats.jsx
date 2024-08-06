import React, { useEffect, useRef, useState } from "react";
import userchaticon from "../../Assets/userW.png";
import groupchaticon from "../../Assets/group-chatW.png";
import home from "../../Assets/homeW.png";
import more from "../../Assets/more.png";
import useUserData from "../utils/UserData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import "rsuite/dist/rsuite.min.css";

function Chats() {
  const { userData } = useUserData();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fetch users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/friends/${userData?._id}`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    if (userData) {
      fetchUsers();
    }
  }, [userData]);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket && selectedUser) {
      const fetchMessages = async () => {
        socket.emit("joinPersonalChat", {
          userId: userData._id,
          otherUserId: selectedUser._id,
        });

        socket.on("personalMessage", (receivedMessage) => {
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });

        try {
          const response = await axios.get(
            `http://localhost:3000/chat/personalMessages/${selectedUser._id}`,
            {
              params: {
                userData: JSON.stringify(userData),
              },
            }
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching personal messages:", error);
        }
      };

      fetchMessages();

      return () => socket.off("personalMessage");
    }
  }, [socket, selectedUser, userData]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && selectedUser) {
      const message = {
        senderId: userData._id,
        receiverId: selectedUser._id,
        text: newMessage.trim(),
        timestamp: new Date(),
      };

      socket.emit("personalMessage", message);
      setNewMessage("");

      setUsers((prevUsers) => {
        const filteredUsers = prevUsers.filter(
          (user) => user._id !== selectedUser._id
        );
        return [selectedUser, ...filteredUsers];
      });
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([]);
  };

  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
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
              <div>
                <h2 className="font-bold text-start">
                  {userData?.name || "Guest"}
                </h2>
                <p className="text-xs text-end">Online</p>
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
            {filteredUsers?.map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserSelect(user)}
                className={`w-full cursor-pointer hover:bg-gray-100 duration-300 rounded-lg px-7 py-2 flex items-center gap-4 ${
                  selectedUser && selectedUser._id === user._id
                    ? "bg-gray-200"
                    : ""
                }`}
              >
                <div
                  className="w-10 lg:w-12 h-10 lg:h-12 bg-cover rounded-full"
                  style={{
                    backgroundImage: `url(${user.profilePic || userchaticon})`,
                    backgroundPosition: "center",
                  }}
                ></div>
                <h2 className="text-sm lg:text-base">{user.name}</h2>
              </div>
            ))}
          </div>

          {/* Chat Area */}
          <div className="w-full flex flex-col h-full">
            {selectedUser ? (
              <>
                <nav className="w-full cursor-pointer hover:bg-slate-300 duration-300 flex justify-between items-center px-4 lg:px-10 py-3 bg-slate-200">
                  <div className="flex items-center gap-3">
                    <>
                      <div className="flex justify-center gap-2">
                        <span className="flex items-center">
                          <svg
                            onClick={() => setSelectedUser(null)}
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
                            backgroundImage: `url(${
                              selectedUser.profilePic || userchaticon
                            })`,
                            backgroundPosition: "center",
                          }}
                        ></div>
                      </div>
                      <h2 className="text-sm lg:text-base">
                        {selectedUser.name}
                      </h2>
                    </>
                  </div>
                  <div>
                    <img
                      className="cursor-pointer h-7 lg:h-9"
                      src={more}
                      alt="More Options"
                    />
                  </div>
                </nav>

                <div className="w-full h-full lg:h-[67vh] myPosts p-3 overflow-y-auto">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex mb-2 ${
                        message?.senderId === userData._id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex items-start gap-2.5 ${
                          message?.senderId === userData._id
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        <img
                          className="w-8 h-8 rounded-full"
                          src={
                            message?.senderId === userData._id
                              ? userData.profilePic
                              : selectedUser.profilePic
                          }
                          alt="profile"
                        />
                        <div
                          className={`flex flex-col w-full max-w-[320px] leading-1.5 px-4 py-3 border-gray-200 ${
                            message?.senderId === userData._id
                              ? "bg-gray-700 text-white rounded-s-xl rounded-e-xl"
                              : "bg-gray-100 text-black rounded-e-xl rounded-s-xl"
                          }`}
                        >
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold">
                              {message?.senderId === userData._id
                                ? "You"
                                : selectedUser.name}
                            </span>
                          </div>
                          <p className="text-sm font-normal py-2.5">
                            {message?.text}
                          </p>
                          <span className="text-sm text-end font-normal text-gray-500 dark:text-gray-400">
                            {new Date(message?.timestamp).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div ref={messagesEndRef} />
                </div>

                <div className="w-full px-4 lg:px-6 py-3 flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-grow font-light bg-white px-4 py-2 outline-none border rounded-sm"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-gray-600 text-white rounded-sm px-4 py-2 duration-300 hover:bg-gray-900"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <h2 className="text-lg lg:text-2xl text-center text-gray-400 font-semibold tracking-wider">
                  Select a user to start chatting
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;
