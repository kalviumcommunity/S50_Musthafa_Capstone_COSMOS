import React, { useState } from "react";
import logo from "../Assets/COSMOS.png";
import Community from "./Community/Community";
import { Link } from "react-router-dom";
function Communities() {
  const [showAll, setShowAll] = useState(true);
  const [showOneCommunity, setShowOneCommunity] = useState(false);

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

  return (
    <>
      <nav className="bg-black px-20 pt-14">
        <img src={logo} className="h-12" alt="" />
        <div className="flex bg-slate-100 w-2/5 mt-9 rounded-lg shadow-sm">
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
        <div className="flex justify-center gap-5 mt-8">
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
        <div className="p-14">
          <h2 className="text-4xl tracking-wide font-bold">
            BROWSE BY THE TOPIC
          </h2>
          <div className="pt-10 grid grid-cols-4 gap-10">
            {communities.map(
              (
                community,
                index
              ) => (
                <Link
                  to="/community"
                  onClick={onClickCommunity}
                  className="card card-compact grid items-end rounded-sm bg-cover w-80 bg-black text-white cursor-pointer duration-300 hover:shadow-2xl"
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
              )
            )}
          </div>
        </div>
      ) : (
        <div className="p-14">
          <h2 className="text-4xl tracking-wide font-bold">YOUR COMMUNITIES</h2>
          <div className="pt-10 grid grid-cols-4 gap-10">
            <div className="card card-compact rounded-sm w-80 bg-black text-white cursor-pointer duration-300 hover:shadow-2xl">
              <figure>
                <img
                  src="https://images.pexels.com/photos/586056/pexels-photo-586056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="DP"
                  className="w-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl">LOREM</h2>
                <p className="line-clamp-2">
                  Lorem ipsum dolor si lore dolores voluptate quam dignissimos?
                  Quis, accusamus quas!
                </p>
              </div>
            </div>
            <div className="card card-compact rounded-sm w-80 bg-black text-white cursor-pointer duration-300 hover:shadow-2xl">
              <figure>
                <img
                  src="https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="DP"
                  className="w-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl">LOREM</h2>
                <p className="line-clamp-2">
                  Lorem ipsum dolor si lore dolores voluptate quam dignissimos?
                  Quis, accusamus quas!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Communities;
