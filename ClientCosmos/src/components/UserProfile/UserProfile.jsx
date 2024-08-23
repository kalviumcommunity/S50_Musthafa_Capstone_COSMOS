import React, { useState, useEffect } from "react";
import axios from "axios";
import commenticon from "../../Assets/commenticon.png";
import { ShimmerPostItem } from "react-shimmer-effects";
import { useNavigate, useParams } from "react-router-dom";
import PostComments from "../Comment/PostComments";
import useUserData from "../utils/UserData";

function UserProfile() {
  const { userData } = useUserData();
  const { id } = useParams();
  const [myPosts, setMyPosts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [bioText, setBioText] = useState("");
  const [commentModal, setCommentModal] = useState(false);
  const [commentPostID, setcommentPostID] = useState("");
  const [userprofile, setuserprofile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchuserprofile = async () => {
      try {
        const response = await axios.get(
          `https://s50-musthafa-capstone-cosmos.onrender.com/users/getAsingleUser/${id}`
        );
        console.log(response.data);
        if (response.status === 200) {
          setuserprofile(response.data);
          setBioText(response.data.bio);
          mypostFetch();
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    if (id) {
      fetchuserprofile();
    }
  }, [id]);

  const mypostFetch = async () => {
    try {
      const response = await axios.get(
        `https://s50-musthafa-capstone-cosmos.onrender.com/posts/getmyposts/${id}`
      );
      if (response.status === 200) {
        setMyPosts(response.data);
        setLoading(false);
      } else {
        setLoading(false);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const navigateBack = () => {
    navigate("/HomePage");
  };

  const toggleCommentModal = (post) => {
    setcommentPostID(post);
    setCommentModal(!commentModal);
  };

  const handleCheckboxChange = async (event, postId) => {
    const action = event.target.checked ? "liked" : "unliked";
    const userId = userData._id;

    try {
      const response = await axios.post(
        `https://s50-musthafa-capstone-cosmos.onrender.com/posts/like/${postId}`,
        {
          userId: userId,
          action: action,
        }
      );
      console.log("Post updated:", response.data);

      // Update the local state immediately
      const updatedPosts = myPosts.map((post) => {
        if (post._id === postId) {
          if (action === "liked") {
            return {
              ...post,
              likes: [...post.likes, userId],
            };
          } else {
            return {
              ...post,
              likes: post.likes.filter((id) => id !== userId),
            };
          }
        }
        return post;
      });
      setMyPosts(updatedPosts);
    } catch (error) {
      console.error(
        "Error updating post:",
        error.response?.data || error.message
      );
    }
  };

  const savePostsHandleChange = async (event, postId) => {
    const action = event.target.checked ? "saved" : "unsaved";
    const userId = userData._id;

    try {
      const response = await axios.post(
        `https://s50-musthafa-capstone-cosmos.onrender.com/users/saveThePost/${userId}`,
        {
          postId: postId,
          action: action,
        }
      );
      console.log("User updated:", response.data);

      // Update the local state immediately
      const updatedUserData = {
        ...userData,
        saved_posts:
          action === "saved"
            ? [...userData.saved_posts, postId]
            : userData.saved_posts.filter((id) => id !== postId),
      };

      setUserData(updatedUserData);
    } catch (error) {
      console.error(
        "Error saving post:",
        error.response?.data || error.message
      );
    }
  };

  const sendMessage = async () => {
    navigate(`/chat`);
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col lg:flex-row">
        <div className="lg:w-3/4 w-full lg:block grid justify-center  px-10">
          <div className="flex items-center gap-3">
            <span
              className="mr-2 hover:cursor-pointer"
              onClick={() => navigateBack()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10 transform rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                ></path>
              </svg>
            </span>
            <h2 className="text-4xl  font font-bold tracking-widest my-8">
              {userprofile?.name}
            </h2>
          </div>
          <div className="grid justify-center text-center">
            <div className="grid justify-center">
              <div
                className="w-52 h-52 bg-cover rounded-full"
                style={{
                  backgroundImage: `url(${userprofile?.profilePic})`,
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <h2 className="text-3xl  font font-bold tracking-widest my-3">
              {userprofile?.name}
            </h2>
          </div>
          <div className="lg:overflow-auto myPosts lg:h-72">
            <div className="my-5">
              <h2 className="text-lg tracking-wider">NAME</h2>
              <input
                type="text"
                className="w-full font-light border mt-2 p-3 outline-none bg-white rounded-md"
                disabled
                value={userprofile?.name}
              />
            </div>
            { userprofile?.bio && <div>
              <h2 className="text-lg tracking-wider">BIO</h2>
              <input
                type="text"
                className="w-full font-light border mt-2 p-3 outline-none bg-white rounded-md"
                disabled
                value={userprofile?.bio}
              />
            </div>}
          </div>
        </div>
        <div className="w-full lg:mt-0 myPosts mt-10  bg-gray-200 px-10">
          <div className="z-50 w-full flex py-6 justify-between items-center px-5">
            <div className="flex gap-2 items-center">
              <h2
                className="text-4xl font-bold tracking-widest cursor-pointer"
                onClick={() => {
                  setselectedComp("POSTS");
                }}
              >
                POSTS
              </h2>
            </div>
          </div>

          <div className="overflow-auto h-[85vh] myPosts">
            {myPosts.length === 0 && !Loading ? (
              <div className="text-center text-3xl font-bold font-poppins mt-40 mb-40 lg:mb-0 lg:mt-64 text-gray-700">
                <span className="mr-2">{userprofile?.name}</span>
                havent posted anything yet
              </div>
            ) : Loading ? (
              <div className="">
                {[...Array(3)].map((_, index) => (
                  <ShimmerPostItem
                    key={index}
                    card
                    title
                    cta
                    imageType="thumbnail"
                    imageWidth={685}
                    imageHeight={300}
                    contentCenter
                  />
                ))}
              </div>
            ) : (
              myPosts
                .slice()
                .reverse()
                .map((post, index) => (
                  <div
                    key={index}
                    className="m-6 px-10 pb-10 bg-white  shadow-lg"
                  >
                    <div className="flex pt-7 justify-between">
                      <h1 className="font-bold font-poppins tracking-wider text-2xl">
                        {post.name}
                      </h1>
                    </div>

                    <img className="mt-2 w-full" src={post.image} alt="" />
                    <h2 className="text-xl font-semibold mt-2">
                      {post.caption}
                    </h2>

                    <div className="flex items-center justify-between mt-3 gap-5">
                      <div className="flex items-center gap-2">
                        <div className="flex justify-center items-center gap-1">
                          <label className="ui-bookmark">
                            <input
                              type="checkbox"
                              onChange={(event) =>
                                handleCheckboxChange(event, post._id)
                              }
                              checked={post.likes.includes(userData?._id)}
                            />
                            <div className="bookmark z-0">
                              <svg
                                viewBox="0 0 16 16"
                                style={{ marginTop: "4px" }}
                                className="bi bi-heart-fill mt-10"
                                height="20"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                                  fillRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          </label>
                          <h2 className="">{post.likes.length} Likes</h2>
                        </div>
                        <div className="flex drawer-content justify-center cursor-pointer  items-center gap-1">
                          <img
                            onClick={() => toggleCommentModal(post._id)}
                            src={commenticon}
                            className="w-5"
                            alt=""
                          />
                          <h2>{post.comments.length} Comments</h2>
                        </div>
                      </div>

                      <label className="custom-container">
                        <input
                          type="checkbox"
                          onChange={(event) =>
                            savePostsHandleChange(event, post._id)
                          }
                          checked={
                            userData?.saved_posts
                              ? userData?.saved_posts.includes(post._id)
                              : false
                          }
                        />
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

export default UserProfile;
