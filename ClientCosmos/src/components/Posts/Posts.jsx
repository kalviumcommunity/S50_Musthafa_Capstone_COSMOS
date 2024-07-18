import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserPosts from "./UserPosts";
import SavedPosts from "./SavedPosts";
import AllAOD from "./AllAOD";

function Posts() {
  const navigate = useNavigate();
  const [randomUsers, setRandomUsers] = useState([]);
  const [userData, setUserData] = useState("");
  const [activeTab, setActiveTab] = useState("userPosts");
  const getUserdata = async (id) => {
    try {
      const response = await axios.get(
        `https://s50-musthafa-capstone-cosmos.onrender.com/users/getAsingleUser/${id}`
      );
      setUserData(response.data);
    } catch (err) {
      console.log("Error while getting the profile data", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.post(
            "https://s50-musthafa-capstone-cosmos.onrender.com/users/tokenvalidate",
            { token }
          );
          const { valid, user } = response.data;
          if (user) {
            getUserdata(user._id);
          }
        } catch (error) {
          Cookies.remove("token");
          console.error("Error in post request", error);
        }
      } else {
        console.log("Token is not there");
      }
    };

    const fetchRandomUsers = async () => {
      try {
        const response = await axios.get(
          "https://s50-musthafa-capstone-cosmos.onrender.com/users/getusersforuserpost"
        );
        setRandomUsers(response.data);
      } catch (err) {
        console.log("Error while fetching the user data's");
      }
    };

    fetchRandomUsers();
    fetchData();
  }, []);

  return (
    <>
      <div className="">
        <div className="px-10">
          <nav className="flex px-10 py-6 bg-gray-100 justify-between mt-7 items-center gap-3">
            <div className="flex items-center">
              <h2 className="text-4xl font font-bold tracking-widest">
                {activeTab === "userPosts"
                  ? "USER POSTS"
                  : activeTab === "savedPosts"
                  ? "SAVED POSTS"
                  : "ASTRONOMIC PICTURES OF THE MONTH"}
              </h2>
            </div>
            <ul className="flex text-xl justify-evenly gap-10">
              <li
                className="cursor-pointer"
                onClick={() => {
                  navigate("/HomePage");
                }}
              >
                HOME
              </li>
              <li
                className={`cursor-pointer ${
                  activeTab === "userPosts" ? "font-bold" : ""
                }`}
                onClick={() => setActiveTab("userPosts")}
              >
                USER POSTS
              </li>
              <li
                className={`cursor-pointer ${
                  activeTab === "allAODS" ? "font-bold" : ""
                }`}
                onClick={() => setActiveTab("allAODS")}
              >
                AODS
              </li>
              <li
                className={`cursor-pointer ${
                  activeTab === "savedPosts" ? "font-bold" : ""
                }`}
                onClick={() => setActiveTab("savedPosts")}
              >
                SAVED
              </li>
            </ul>
          </nav>

          <div className="flex gap-20">
            <div className="flex ml-20 justify-center mt-10">
              <div className="w-64">
                <h2 className="text-center text-xl font-poppins">
                  Suggested users
                </h2>
                <ul className="m-2 mt-7 overflow-auto myPosts rounded-md h-96">
                  {randomUsers.map((user, index) => (
                    <li
                      key={index}
                      className="items-center gap-4 py-3 rounded-md flex pl-6 w-full border mt-2 hover:shadow-lg duration-300 cursor-pointer"
                    >
                      <img
                        className="rounded-full w-14 h-14"
                        src={user.profilePic}
                        alt=""
                      />
                      <h2 className="text-xl line-clamp-1 font-poppins">
                        {user.name}
                      </h2>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="overflow-auto h-[81.7vh] ml-20 w-[40vw] myPosts">
              {activeTab === "userPosts" && (
                <UserPosts userData={userData} setUserData={setUserData} />
              )}
              {activeTab === "savedPosts" && (
                <SavedPosts userData={userData} setUserData={setUserData} />
              )}
              {activeTab === "allAODS" && (
                <AllAOD userData={userData} setUserData={setUserData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Posts;
