import React, { useState, useEffect } from "react";
import settingsIcon from "../Assets/settings.png";
import editIcon from "../Assets/icon.png";
import Cookies from "js-cookie";
import PostForm from "./Forms/PostForm";
import exampleIMG2 from "../Assets/exampleimg2.webp";
import exampleIMG3 from "../Assets/exampleimg3.jpeg";
import exampleIMG4 from "../Assets/exampleimg4.jpg";
import exampleIMG5 from "../Assets/exampleimg5.jpeg";
import THREEDOT from "../Assets/THREEDOT.png";
import axios from "axios";

function Profile() {
  const [userData, setUserData] = useState("");
  const [myPosts, seMyPosts] = useState([]);

  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const storedUserData = Cookies.get("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
    mypostFetch()
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const mypostFetch = () => {
    const storedProfile = Cookies.get("profile");
    if (storedProfile) {
      const parsedUserData = JSON.parse(storedProfile);
      const id = parsedUserData._id;
      axios
        .get(`http://localhost:3000/posts/getmyposts/${id}`)
        .then((response) => {
          seMyPosts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  };

  return (
    <>
      <div className="w-screen h-screen  flex">
        <div className="w-3/4 px-10">
          <h2 className="text-4xl  font font-bold tracking-widest my-8">PROFILE</h2>
          <div className="w-full mt-14 flex flex-col items-center">
            <div
              className="w-52 h-52 bg-green-300 bg-cover rounded-full"
              style={{
                backgroundImage: `url(https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220)`,
              }}
            ></div>
            <h2 className="text-3xl  font font-bold tracking-widest my-3">
              {userData.username}
            </h2>
          </div>
          <div className="overflow-auto myPosts h-72">
            <div className="my-5">
              <h2 className="text-lg tracking-wider">NAME</h2>
              <input
                type="text"
                className="w-full font-light border mt-2 p-3 outline-none bg-white rounded-md"
                disabled
                value={userData.name}
              />
            </div>
            <h2 className="text-lg tracking-wider">MY BIO</h2>
            <div className="w-full myPosts font-light border mt-2 p-3 outline-none bg-white rounded-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Ut iusto
              debitis necessitatibus tempora, placeat porro veritatis quod
              similique! Aliquid iusto autem earum illum delectus
              necessitatibus, est voluptatum maiores tempore esse.
            </div>
          </div>
        </div>
        <div className="w-full overflow-auto bg-gray-200 px-10">
          <div className="z-50 w-full flex justify-between items-center px-5">
            <h2 class="text-4xl font-bold tracking-widest my-8">YOUR POSTS</h2>
            <button
              onClick={openModal}
              className="text-lg tracking-wider border bg-white shadow-lg px-5 py-2 h-fit"
            >
              Create Post
            </button>
          </div>

          <div className=" overflow-auto myPosts">
            {myPosts
              .slice()
              .reverse()
              .map((post, index) => (
                <div
                  key={index}
                  className="m-6 px-10 pb-10 bg-white  shadow-lg"
                >
                  <div className="flex pt-7 justify-between">
                    <h1 className="font-bold font-poppins tracking-wider text-2xl">
                      {userData.username}
                    </h1>

                    <div className="dropdown dropdown-end">
                      <img
                        src="https://seekicon.com/free-icon-download/three-dots-vertical_1.png"
                        tabIndex={0}
                        role="button"
                        className="text-end flex cursor-pointer w-4"
                      />
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 bg-white shadow-lg rounded-sm w-52"
                      >
                        <li>
                          <a className="rounded-sm tracking-wider">EDIT</a>
                        </li>
                        <li>
                          <a className="rounded-sm tracking-wider">DELETE</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <img className="mt-2 w-full" src={post.image} alt="" />
                  <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
                  <p className=" text-xl font-light mt-2">{post.description}</p>

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
              ))}
          </div>
        </div>
        <PostForm Modal={modalOpen} setModalOpen={setModalOpen} mypostFetch={mypostFetch}/>
      </div>
    </>
  );
}

export default Profile;
