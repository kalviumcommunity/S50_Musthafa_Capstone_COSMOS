import React from "react";
import exampleIMG2 from "../Assets/exampleimg2.webp";

import exampleIMG3 from "../Assets/exampleimg3.jpeg";
import exampleIMG4 from "../Assets/exampleimg4.jpg";
import exampleIMG5 from "../Assets/exampleimg5.jpeg";

function UserPosts() {
  const posts = [
    {
      id: 1,
      title: "ALEXA",
      image: exampleIMG2,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et dolore magna",
    },
    {
      id: 2,
      title: "ALEXA",
      image: exampleIMG5,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et dolore magna",
    },
    {
      id: 3,
      title: "ALEXA",
      image: exampleIMG3,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et dolore magna",
    },
    {
      id: 4,
      title: "ALEXA",
      image: exampleIMG4,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et dolore magna",
    },
  ];

  return (
    <div className="">
      <nav className="flex bg-white pr-28 fixed w-screen pl-20 py-10 justify-between">
        <h1 className="text-4xl font-poppins font-bold">USER POSTS</h1>
        <div className="flex bg-slate-100 w-2/4 rounded-lg shadow-sm">
          <input
            type="text"
            id="hs-trailing-button-add-on-with-icon"
            name="hs-trailing-button-add-on-with-icon"
            placeholder="Search here"
            className="py-3 px-4 block w-full shadow-lg rounded-s-lg text-sm focus:z-10 disabled:opacity-50 bg-white disabled:pointer-events-none dark:bg-white outline-none"
          />
          <button
            type="button"
            className="w-[2.875rem] h-[2.875rem]  flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-black text-white hover:bg-gray-800 duration-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
      </nav>
      <div className="flex ">
        <div className="ml-20 fixed top-32 h-fit py-16 mt-5 items-center flex justify-center px-20 shadow-lg border w-fit">
          <div className="">
            <button className="text-center my-5 py-3 rounded-sm w-full  bg-black text-white shadow-md ">
              Home
            </button>
            <button className="text-center my-5 py-3 rounded-sm w-full  bg-black text-white shadow-md ">
              Trending
            </button>
            <button className="text-center my-5 py-3 rounded-sm w-full  bg-black text-white shadow-md ">
              Latest
            </button>
            <button className="text-center my-5 py-3 rounded-sm w-full  bg-black text-white shadow-md">
              Saved
            </button>
          </div>
        </div>
        <div className="pl-48 ml-96 mt-28 h-screen">
          {posts.map((post) => (
            <div key={post.id} className="m-6 p-10  shadow-lg">
              <h1 className="font-bold font-poppins tracking-wider text-2xl">
                {post.title}
              </h1>
              <img className="w-96 mt-2" src={post.image} alt="" />
              <h2 className="text-xl font-semibold mt-2">LOREM</h2>
              <p className="line-clamp-3 text-xl w-96 font-light mt-2">
                {post.content}
              </p>
              <div className="flex items-center gap-5 justify-end">
                <label className="ui-bookmark">
                  <input type="checkbox" />
                  <div className="bookmark -z-50">
                    <svg
                      viewBox="0 0 16 16"
                      style={{ marginTop: "4px" }}
                      className="bi bi-heart-fill mt-10"
                      height="25"
                      width="25"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </label>

                <label className="custom-container">
                  <input type="checkbox" />
                  <div className="custom-bookmark -z-50">
                    <svg viewBox="0 0 32 32">
                      <g>
                        <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
                      </g>
                    </svg>
                  </div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserPosts;
