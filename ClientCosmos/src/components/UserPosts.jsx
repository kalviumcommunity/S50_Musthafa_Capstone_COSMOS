import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import commenticon from "../Assets/commenticon.png";
import Cookies from "js-cookie";
import { ShimmerPostItem } from "react-shimmer-effects";
import PostComments from "./PostComments";

function UserPosts() {
  const navigate = useNavigate();
  const [shuffledPosts, setShuffledPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentModal, setCommentModal] = useState(false);
  const [commentPostID, setcommentPostID] = useState("");
  const [userData, setUserData] = useState("");

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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts`)
      .then((response) => {
        const postsWithBase64Images = response.data;
        const shuffledArray = shuffleArray(postsWithBase64Images);
        setShuffledPosts(shuffledArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
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
    return array;
  };

  const LikeThePost = (e) => {
    console.log(e);
  };

  const toggleCommentModal = (post) => {
    setcommentPostID(post);
    setCommentModal(!commentModal);
  };

  return (
    <>
      <div className="">
        <div className="px-10">
          <nav className="flex px-10 py-6 bg-gray-100 justify-between mt-7 items-center gap-3">
            <div className="flex items-center">
              <h2 className="text-4xl  font font-bold tracking-widest">
                USER POSTS
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
              <li className="cursor-pointer">TRENDING</li>
              <li className="curser-pointer">SAVED</li>
            </ul>
          </nav>

          <div className="flex gap-20">
            <div className="flex ml-20 justify-center mt-10">
              <div className="w-64">
                <h2 className="text-center text-xl font-poppins">
                  Suggested users
                </h2>
                <ul className="m-2 mt-7 overflow-auto myPosts rounded-md h-96">
                  <li className="items-center gap-4 py-3 rounded-md flex pl-6 w-full border mt-2 hover:shadow-lg duration-300 cursor-pointer">
                    <img
                      className="rounded-full w-14 h-14"
                      src="https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220"
                      alt=""
                    />
                    <h2 className="text-xl font-poppins">sura__pp</h2>
                  </li>
                  <li className="items-center gap-4 py-3 rounded-md flex pl-6 w-full border mt-2 hover:shadow-lg duration-300 cursor-pointer">
                    <img
                      className="rounded-full w-14 h-14"
                      src="https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220"
                      alt=""
                    />
                    <h2 className="text-xl font-poppins">sura__pp</h2>
                  </li>
                  <li className="items-center gap-4 py-3 rounded-md flex pl-6 w-full border mt-2 hover:shadow-lg duration-300 cursor-pointer">
                    <img
                      className="rounded-full w-14 h-14"
                      src="https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220"
                      alt=""
                    />
                    <h2 className="text-xl font-poppins">sura__pp</h2>
                  </li>
                  <li className="items-center gap-4 py-3 rounded-md flex pl-6 w-full border mt-2 hover:shadow-lg duration-300 cursor-pointer">
                    <img
                      className="rounded-full w-14 h-14"
                      src="https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220"
                      alt=""
                    />
                    <h2 className="text-xl font-poppins">sura__pp</h2>
                  </li>
                  <li className="items-center gap-4 py-3 rounded-md flex pl-6 w-full border mt-2 hover:shadow-lg duration-300 cursor-pointer">
                    <img
                      className="rounded-full w-14 h-14"
                      src="https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220"
                      alt=""
                    />
                    <h2 className="text-xl font-poppins">sura__pp</h2>
                  </li>
                  <li className="items-center gap-4 py-3 rounded-md flex pl-6 w-full border mt-2 hover:shadow-lg duration-300 cursor-pointer">
                    <img
                      className="rounded-full w-14 h-14"
                      src="https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220"
                      alt=""
                    />
                    <h2 className="text-xl font-poppins">sura__pp</h2>
                  </li>
                  <li className="items-center gap-4 py-3 rounded-md flex pl-6 w-full border mt-2 hover:shadow-lg duration-300 cursor-pointer">
                    <img
                      className="rounded-full w-14 h-14"
                      src="https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220"
                      alt=""
                    />
                    <h2 className="text-xl font-poppins">sura__pp</h2>
                  </li>
                  <li className="items-center gap-4 py-3 rounded-md flex pl-6 w-full border mt-2 hover:shadow-lg duration-300 cursor-pointer">
                    <img
                      className="rounded-full w-14 h-14"
                      src="https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220"
                      alt=""
                    />
                    <h2 className="text-xl font-poppins">sura__pp</h2>
                  </li>
                </ul>
              </div>
            </div>
            <div className="overflow-auto h-[81.7vh] ml-20 w-[40vw] myPosts">
              {shuffledPosts.length === 0 && !loading ? (
                <div className="text-center text-3xl font-bold font-poppins mt-40 mb-40 lg:mb-0 lg:mt-64 text-gray-700">
                  There is no Post
                </div>
              ) : loading ? (
                <div className="">
                  {[...Array(3)].map((_, index) => (
                    <ShimmerPostItem
                      key={index}
                      card
                      title
                      cta
                      imageType="thumbnail"
                      imageWidth={700}
                      imageHeight={300}
                      contentCenter
                    />
                  ))}
                </div>
              ) : (
                shuffledPosts
                  .slice()
                  .reverse()
                  .map((post, index) => (
                    <div
                      key={index}
                      className="bg-white border mt-5 px-7  py-5 shadow-lg"
                    >
                      <div className="flex justify-between">
                        <h1 className="font-bold font-poppins tracking-wider text-2xl">
                          {post.username}
                        </h1>
                      </div>

                      <img className="mt-2 w-full" src={post.image} alt="" />
                      <h2 className="text-xl font-semibold mt-2">
                        {post.caption}
                      </h2>

                      <div className="flex items-center justify-between mt-3 gap-5">
                        <div className="flex gap-4 items-center">
                          <label className="ui-bookmark" onClick={() => LikeThePost(post._id)}>
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

                          <div className="drawer drawer-end w-fit ">
                            <input
                              id="my-drawer-4"
                              type="checkbox"
                              className="drawer-toggle"
                            />
                            <div
                              onClick={() => toggleCommentModal(post._id)}
                              className="drawer-content z-30 w-fit"
                            >
                              <img src={commenticon} className="w-6" alt="" />
                            </div>
                          </div>
                        </div>

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
              )}
            </div>
          </div>
        </div>
        <PostComments
          post_id={commentPostID}
          userData={userData}
          commentModal={commentModal}
          toggleCommentModal={toggleCommentModal}
        />
      </div>
    </>
  );
}

export default UserPosts;
