import React, { useEffect, useState } from "react";
import logo from "../../Assets/COSMOS.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { Pane, FileUploader, FileCard } from "evergreen-ui";
import { imDB } from "../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import AllCommunities from "./sections/AllCommunity";
import YourCommunity from "./sections/YourCommunity";
import CommunityJoin from "./chat , join and details/CommunityJoin";
import CommunityChat from "./chat , join and details/CommunityChat";
import { PulseLoader } from "react-spinners";

function Communities() {
  const [userData, setUserData] = useState([]);
  const { register, handleSubmit } = useForm();
  const [CommunityJoinid, setCommunityJoinId] = useState("");
  const [CommunityChatID, setCommunityChatID] = useState("");
  const [files, setFiles] = useState([]);
  const [fileRejections, setFileRejections] = useState([]);
  const [activeButton, setActiveButton] = useState("ALL");
  const [selectedChat, setSelectedChat] = useState("");
  const [communityCreationLoading, setCommunityCreationLoading] = useState(false);

  const handleChange = React.useCallback((files) => setFiles([files[0]]), []);
  const handleRejected = React.useCallback(
    (fileRejections) => setFileRejections([fileRejections[0]]),
    []
  );

  const handleRemove = React.useCallback(() => {
    setFiles([]);
    setFileRejections([]);
  }, []);

  const navigate = useNavigate();

  const onClickAll = () => {
    setActiveButton("ALL");
    setCommunityJoinId("");
    setCommunityChatID("");
  };

  const onClickYours = () => {
    setActiveButton("YOURS");
    setCommunityJoinId("");
    setCommunityChatID("");
  };

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

  const onSubmit = async (data) => {
    setCommunityCreationLoading(true)
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

      console.log(data);

      const response = await axios.post(
        "http://localhost:3000/community/create",
        requestData
      );
      window.location.reload();
    } catch (error) {
      console.error("Error creating community:", error);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="h-screen w-2/6 border-r-2">
          <div className="flex items-center cursor-pointer gap-2 pb-4 pt-6 px-5">
            <span
              className="mr-2"
              onClick={() => {
                navigate("/HomePage");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-9 h-9 transform rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                ></path>
              </svg>
            </span>
            <h2 className="text-4xl font-bold">COMMUNITIES</h2>
          </div>
          <div className="flex py-3 px-5 rounded-lg justify-evenly">
            <button
              onClick={onClickAll}
              className={`duration-500 w-full py-2 font-poppins font-medium ${
                activeButton === "ALL"
                  ? "bg-black text-white"
                  : "text-black hover:bg-gray-200"
              }`}
            >
              ALL
            </button>
            <button
              onClick={onClickYours}
              className={` duration-500 w-full py-2 font-poppins font-medium ${
                activeButton === "YOURS"
                  ? "bg-black text-white"
                  : "text-black hover:bg-gray-200"
              }`}
            >
              YOURS
            </button>
          </div>

          <div className="pb-2 overflow-auto myPosts h-[70vh]">
            {activeButton === "ALL" ? (
              <AllCommunities
                setSelectedChat={setSelectedChat}
                selectedChat={selectedChat}
                setCommunityJoinId={setCommunityJoinId}
              />
            ) : (
              <YourCommunity
                setSelectedChat={setSelectedChat}
                selectedChat={selectedChat}
                setCommunityChatID={setCommunityChatID}
              />
            )}
          </div>
          <div className="px-5">
            <button
              onClick={() => document.getElementById("my_modal_1").showModal()}
              className=" bg-black text-white w-full py-3 font-semibold"
            >
              CREATE A NEW COMMUNITY
            </button>
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
                    className="bg-black w-full mt-7 h-10 rounded-md text-white"
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
        </div>
        <div className="w-dvw h-screen">
          {activeButton === "ALL" ? (
            CommunityJoinid ? (
              <CommunityJoin
                setSelectedChat={setSelectedChat}
                selectedChat={selectedChat}
                setActiveButton={setActiveButton}
                setCommunityJoinId={setCommunityJoinId}
                CommunityJoinid={CommunityJoinid}
                setCommunityChatID={setCommunityChatID}
              />
            ) : (
              <div className="text-3xl font-bold text-center h-full items-center flex justify-center">
                SELECT ANY COMMUNITY TO JOIN
              </div>
            )
          ) : activeButton === "YOURS" ? (
            CommunityChatID ? (
              <CommunityChat
                setSelectedChat={setSelectedChat}
                selectedChat={selectedChat}
                setCommunityChatID={setCommunityChatID}
                id={CommunityChatID}
              />
            ) : (
              <div className="text-3xl font-bold text-center h-full items-center flex justify-center">
                SELECT ANY COMMUNITY TO CHAT
              </div>
            )
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Communities;
