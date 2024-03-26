import React, { useState, useEffect } from "react";
import settingsIcon from "../Assets/settings.png";
import editIcon from "../Assets/icon.png";
import Cookies from "js-cookie";
import PostForm from "./Forms/PostForm";

function Profile() {
  const [userData, setUserData] = useState("");
  const [bgImage, setBgImage] = useState("");
  const imageObject = [
    {
      id: "image_1",
      link: "https://images.pexels.com/photos/2538107/pexels-photo-2538107.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "image_2",
      link: "https://images.pexels.com/photos/3805983/pexels-photo-3805983.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "image_3",
      link: "https://images.pexels.com/photos/574116/pexels-photo-574116.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "image_4",
      link: "https://images.pexels.com/photos/713664/pexels-photo-713664.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "image_5",
      link: "https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "image_6",
      link: "https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "image_7",
      link: "https://images.pexels.com/photos/1694000/pexels-photo-1694000.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % imageObject.length;
      setBgImage(imageObject[currentIndex].link);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedUserData = Cookies.get("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div class="relative">
        <div class="bg-cover bg-center absolute bg-black -z-50 w-screen md:h-64"></div>
        <div class="flex flex-col md:flex-row">
          <div class="flex flex-col bg-white px-10 shadow-xl rounded-sm absolute top-24 left-5 md:left-28 w-11/12 md:w-fit justify-center items-center text-center">
            <img
              src="https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
              class="w-36 my-10"
              alt=""
            />
            <h2 class="font-bold font-poppins mb-11 text-3xl">ALEXIA</h2>
            <button class="text-white flex items-center w-56 justify-center gap-3 rounded mb-6 py-2 bg-black font-poppins tracking-wider">
              <img src={editIcon} class="w-5" alt="" />
              Edit Profile
            </button>
            <button class="text-white font-poppins tracking-wider mb-11 flex items-center w-56 justify-center gap-3 rounded py-2 bg-black">
              <img src={settingsIcon} class="w-5" alt="" />
              Settings
            </button>
          </div>
          <div class="absolute px-5 md:px-10 h-auto md:h-96 overflow-auto right-0 md:right-16 top-72 md:b-0">
            <h2 class="text-3xl font font-bold tracking-widest my-5">
              YOUR POSTS
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-9">
              <div class="w-full md:w-64 shadow-xl">
                <img
                  class="w-full h-44"
                  src="https://images.pexels.com/photos/6444367/pexels-photo-6444367.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
                <div class="mx-3 my-4">
                  <h1 class="text-xl font-semibold font-poppins">LOREM</h1>
                  <p class="line-clamp-2 font-poppins">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    eiusmod tempor incididunt ut labore et dolore magna
                  </p>
                </div>
              </div>
              <div class="w-full md:w-64 flex flex-col items-center shadow-xl">
                <h1 class="mt-20 font-semibold text-2xl tracking-wide">
                  CREATE A POST
                </h1>
                <button
                  title="Add New"
                  onClick={openModal}
                  class="group cursor-pointer mt-5 w-fit h-fit outline-none hover:rotate-90 duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 24 24"
                    class="stroke-black fill-none group-active:stroke-zinc-200 group-active:fill-black group-active:duration-0 duration-300"
                  >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      strokeWidth="1.5"
                    ></path>
                    <path d="M8 12H16" strokeWidth="1.5"></path>
                    <path d="M12 16V8" strokeWidth="1.5"></path>
                  </svg>
                </button>
                <PostForm Modal={modalOpen} setModalOpen={setModalOpen} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
