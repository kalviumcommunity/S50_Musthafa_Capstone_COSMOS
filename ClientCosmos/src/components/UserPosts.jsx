import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import commenticon from "../Assets/commenticon.png";
import Cookies from "js-cookie";

function UserPosts() {
  const navigate = useNavigate();
  const [shuffledPosts, setShuffledPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [yourComment, setYourComment] = useState([]);
  const [ pid, setpId ] = useState("")

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
        const postsWithBase64Images = response.data
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

  const NavigateFun = () => {
    navigate("/HomePage");
  };
  const takeComment = (e) => {
    setYourComment(e.target.value);
  };

  const profilepic =
    "https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220";


  const AddComment = (e) => {
    const com = {
      postid: pid,
      comment: yourComment,
      name: userData.username,
      profilepic: profilepic,
    };

    axios
      .post("http://localhost:3000/posts/addcomment", com)
      .then((response) => {
        console.log("Comment added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });

    setYourComment("");
  };

  const commentsClick = (e) => {
    setpId(e._id)
    axios
      .get(`http://localhost:3000/posts/getcomments`, {
        headers: {
          postid: e._id
        }
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
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
                <h1 className="font-bold h-10 bg-gray-200 rounded-lg m-10 font-poppins tracking-wider text-2xl"></h1>

                <div className="flex items-center mx-10 bg-gray-200 rounded-lg gap-5 h-3/5 m-10 justify-end"></div>
              </div>
            </div>
          ) : shuffledPosts.length > 0 ? (
            shuffledPosts.map((post, index) => (
              <div key={index} className="mx-6 mt-6 p-10 mb-20 shadow-2xl">
                <div className="flex justify-between">
                  <h1 className="font-bold font-poppins tracking-wider text-2xl">
                    {post.username}
                  </h1>
                </div>
                <img className="mt-2 w-full" src={post.image} alt="" />
                <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
                <p className="text-xl font-light mt-2">{post.description}</p>

                <div className="flex items-center justify-between mt-3 gap-5">
                  <div className="flex gap-4 items-center">
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

                    <div className="drawer drawer-end w-fit ">
                      <input
                        id="my-drawer-4"
                        type="checkbox"
                        className="drawer-toggle"
                      />
                      <div
                        onClick={() => commentsClick(post)}
                        className="drawer-content z-30 w-fit"
                      >
                        <label htmlFor="my-drawer-4" className="cursor-pointer">
                          <img src={commenticon} className="w-6" alt="" />
                        </label>
                      </div>
                      <div className="drawer-side z-50">
                        <label
                          htmlFor="my-drawer-4"
                          aria-label="close sidebar"
                          className="drawer-overlay"
                        ></label>
                        <ul className="menu p-4 w-2/4 min-h-full bg-gray-900 text-base-content">
                          {/* Sidebar content here */}
                          <h2 className="text-3xl text-white tracking-wider font-bold p-10">
                            COMMENTS
                          </h2>
                          <div className="px-20">
                            <div className="flex bg-white rounded-lg outline-none text-black px-3 py-3 w-full justify-between">
                              <input
                                required
                                placeholder="Comment here..."
                                value={yourComment}
                                onChange={takeComment}
                                type="text"
                                id="messageInput"
                                className="w-full bg-transparent outline-none  pl-4"
                              />
                              <button
                                id="sendButton"
                                className="flex items-center justify-center"
                                onClick={() => AddComment(post._id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 664 663"
                                  className="h-6"
                                >
                                  <path
                                    fill="none"
                                    d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                                  ></path>
                                  <path
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="33.67"
                                    stroke="#6c6c6c"
                                    d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="mx-7 mt-6 h-96 overflow-auto myPosts">
                            {comments.map((comment , index ) => {
                              return (
                                <div key={index} className="bg-gray-100 text-black p-5 mb-6">
                                  <div className="flex gap-4 items-center">
                                    <img
                                      className="w-10 h-10 rounded-full"
                                      src={comment.profilepic}
                                      alt=""
                                    />
                                    <h2 className="text-xl font-semibold">
                                      {comment.name}
                                    </h2>
                                  </div>

                                  <h2 className="mt-3">{comment.comment}</h2>
                                </div>
                              );
                            })}
                          </div>
                        </ul>
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
          ) : (
            <div className="mt-32 ml-40 w-96 h-96 text-end text-3xl font-bold tracking-wide">
              NO POST FOUND
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPosts;
