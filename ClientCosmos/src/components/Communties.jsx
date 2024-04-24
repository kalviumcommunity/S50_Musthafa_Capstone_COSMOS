import React, { useState } from "react";
import logo from "../Assets/COSMOS.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";

function Communities() {
  const [showAll, setShowAll] = useState(true);
  const [showOneCommunity, setShowOneCommunity] = useState(false);
  const { register, handleSubmit } = useForm();

  const onClickAll = () => {
    setShowAll(true);
    setShowOneCommunity(false);
  };

  const onClickYours = () => {
    setShowAll(false);
    setShowOneCommunity(false);
  };

  const onClickCommunity = () => {
    setShowOneCommunity(true);
  };
  const communities = [
    {
      dpURL:
        "https://images.pexels.com/photos/6039245/pexels-photo-6039245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bio: "",
      name: "",
    },
    {
      dpURL:
        "https://images.pexels.com/photos/41951/solar-system-emergence-spitzer-telescope-telescope-41951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bio: "",
      name: "",
    },
    {
      dpURL:
        "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bio: "",
      name: "",
    },
    {
      dpURL:
        "https://images.pexels.com/photos/3279307/pexels-photo-3279307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bio: "",
      name: "",
    },
    {
      dpURL:
        "https://images.pexels.com/photos/3180831/pexels-photo-3180831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bio: "",
      name: "",
    },
    {
      dpURL:
        "https://images.pexels.com/photos/2538107/pexels-photo-2538107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bio: "",
      name: "",
    },
  ];

  const onSubmit = async (data) => {
    try {
      const userData = Cookies.get("userData");
      if (!userData) {
        console.error('User data not found in cookies');
        return;
      }
  
      const id = JSON.parse(userData)._id;
      // console.log()
      const response = await axios.post('http://localhost:3000/community/create', {
        ...data,
        creator: id
      });

      const {message , community} = response.data
      console.log(community);
    } catch (error) {
      console.error('Error creating community:', error);
    }
  };
  return (
    <>
      <nav className="bg-black px-4 md:px-20 pt-14">
        <div className="flex justify-between">
          <img src={logo} className="h-12" alt="" />
          <button
            className="py-2 px-4 bg-white"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            New Community
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-white">
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
              <form onSubmit={handleSubmit(onSubmit)} className="py-10">
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
                <input
                  {...register("communityprofile")}
                  className="bg-white pl-3 font-light rounded-md border outline-none w-full h-10"
                  type="text"
                />
                <button
                  type="submit"
                  className="bg-black w-full mt-7 h-10 rounded-md text-white"
                >
                  CREATE
                </button>
              </form>
            </div>
          </dialog>
        </div>
        <div className="flex bg-slate-100 w-full md:w-2/5 mt-4 md:mt-9 rounded-lg shadow-sm">
          <input
            type="text"
            id="hs-trailing-button-add-on-with-icon"
            name="hs-trailing-button-add-on-with-icon"
            placeholder="Search for the Community"
            className="py-3 px-4 z-50 block w-full shadow-lg rounded-s-lg text-sm focus:z-10 disabled:opacity-50 bg-white disabled:pointer-events-none dark:bg-white outline-none"
          />
          <button
            type="button"
            className="w-[2.875rem] h-[2.875rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-black text-white hover:bg-gray-800 duration-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
        <div className="flex justify-center gap-5 mt-4 md:mt-8">
          <button
            onClick={onClickAll}
            className={`text-xl duration-500 px-5 py-2 font-poppins border-b-4 border-transparent font-mediam text-white ${
              showAll ? "border-b-4 border-white" : ""
            } hover:border-white`}
          >
            ALL
          </button>
          <button
            onClick={onClickYours}
            className={`text-xl duration-500 px-5 py-2 font-poppins border-b-4 border-transparent font-mediam text-white ${
              !showAll ? "border-b-4 border-white" : ""
            } hover:border-white`}
          >
            YOURS
          </button>
        </div>
      </nav>
      {showAll ? (
        <div className="p-4 md:p-14">
          <h2 className="text-4xl tracking-wide font-bold">
            BROWSE BY THE TOPIC
          </h2>
          <div className="pt-4 md:pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
            {communities.map((community, index) => (
              <Link
                to="/community"
                onClick={onClickCommunity}
                className="card card-compact grid items-end rounded-sm bg-cover w-full bg-black text-white cursor-pointer duration-300 hover:shadow-2xl"
                key={index}
              >
                <figure>
                  <div className="w-full h-52">
                    <img src={community.dpURL} alt="DP" className="w-full" />
                  </div>
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-xl">LOREM</h2>
                  <p className="line-clamp-2">
                    Lorem ipsum dolor si lore dolores voluptate quam
                    dignissimos? Quis, accusamus quas!
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 md:p-14">
          {" "}
          {/* Adjust padding for smaller screens */}
          <h2 className="text-4xl tracking-wide font-bold">YOUR COMMUNITIES</h2>
          <div className="pt-4 md:pt-10 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-10">
            {" "}
            {/* Adjust grid layout for smaller screens */}
            {/* Add your communities rendering here */}
            <Link
              to="/community"
              onClick={onClickCommunity}
              className="card card-compact grid items-end rounded-sm bg-cover w-full bg-black text-white cursor-pointer duration-300 hover:shadow-2xl"
            >
              <figure>
                <div className="w-full h-52">
                  <img
                    src="https://images.pexels.com/photos/586056/pexels-photo-586056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="DP"
                    className="w-full"
                  />
                </div>
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl">LOREM</h2>
                <p className="line-clamp-2">
                  Lorem ipsum dolor si lore dolores voluptate quam dignissimos?
                  Quis, accusamus quas!
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Communities;
