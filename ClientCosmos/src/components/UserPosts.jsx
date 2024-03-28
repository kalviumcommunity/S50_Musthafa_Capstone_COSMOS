import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserPosts() {
  const navigate = useNavigate();
  const [shuffledPosts, setShuffledPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set loading to true

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts`)
      .then((response) => {
        const shuffledArray = shuffleArray(response.data);
        setShuffledPosts(shuffledArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      });
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const NavigateFun = () => {
    navigate("/HomePage");
  };

  return (
    <div className="bg-white h-max">
      {/* navbar */}
      <nav className="flex bg-white z-50 pr-28 fixed w-screen pl-20 py-10 justify-between">
        <h1 className="text-4xl font-poppins font-bold">USER POSTS</h1>
        <div className="flex bg-slate-100 w-2/4 rounded-lg shadow-sm">
          <input
            type="text"
            id="hs-trailing-button-add-on-with-icon"
            name="hs-trailing-button-add-on-with-icon"
            placeholder="Search here"
            className="py-3 px-4 z-50 block w-full shadow-lg rounded-s-lg text-sm focus:z-10 disabled:opacity-50 bg-white disabled:pointer-events-none dark:bg-white outline-none"
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
      </nav>
      {/* Side bar */}
      <div className="flex ">
        <div className="ml-20 fixed top-32 h-fit py-16 mt-5 items-center flex justify-center px-14 shadow-lg border w-fit">
          <div className="">
            <button
              onClick={NavigateFun}
              className="text-center my-5 tracking-wider py-3 rounded-sm w-full hover:shadow-md duration-300 border"
            >
              HOME
            </button>
            <button className="text-center my-5 tracking-wider py-3 rounded-sm w-full hover:shadow-md duration-300   border ">
              TRENDING
            </button>
            <button className="text-center my-5 tracking-wider py-3 rounded-sm w-full hover:shadow-md duration-300   border ">
              LATEST
            </button>
            <button className="text-center my-5 tracking-wider py-3 rounded-sm w-full hover:shadow-md duration-300   border">
              SAVED
            </button>
          </div>
        </div>

        {/* posts */}

        <div className="px-32 ml-96 mt-28 h-screen">
          {loading ? (
            <div className="mt-10 h-screen w-screen">
              <div className="w-2/4 border-2 h-3/5  rounded-lg">
                <h1 className="font-bold h-10 bg-gray-200 rounded-lg m-10 font-poppins tracking-wider text-2xl">
                  
                </h1>

                <div className="flex items-center mx-10 bg-gray-200 rounded-lg gap-5 h-3/5 m-10 justify-end">

                </div>
              </div>
            </div>
          ) : shuffledPosts.length > 0 ? (
            shuffledPosts.map((post, index) => (
              <div key={index} className="m-6 p-10  shadow-lg">
                <h1 className="font-bold font-poppins tracking-wider text-2xl">
                  LOREM
                </h1>
                <img className="mt-2 w-full" src={post.image} alt="" />
                <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
                <p className="line-clamp-3 text-xl w-96 font-light mt-2">
                  {post.description}
                </p>

                <div className="flex items-center gap-5 justify-end">
                  <label className="ui-bookmark">
                    <input type="checkbox" />
                    <div className="bookmark z-0">
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
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </label>

                  <label className="custom-container">
                    <input type="checkbox" />
                    <div className="custom-bookmark z-0">
                      <svg viewBox="0 0 32 32">
                        <g>
                          <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
                        </g>
                      </svg>
                    </div>
                  </label>
                </div>
              </div>
            ))
          ) : (
            <div className="">No posts found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPosts;
