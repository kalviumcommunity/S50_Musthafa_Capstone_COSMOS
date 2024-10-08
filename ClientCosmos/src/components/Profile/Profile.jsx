import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PostForm from "../Forms/PostForm";
import axios from "axios";
import commenticon from "../../Assets/commenticon.png";
import { ShimmerPostItem } from "react-shimmer-effects";
import { useNavigate } from "react-router-dom";
import PostEditForm from "../Forms/PostEditForm";
import PostComments from "../Comment/PostComments";
import { imDB } from "../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { MoonLoader } from "react-spinners";
import useUserData from "../utils/UserData";
import { toast, ToastContainer } from "react-toastify";

function Profile() {
  const { userData, setUserData } = useUserData();
  const [myPosts, setMyPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [bioText, setBioText] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentModal, setCommentModal] = useState(false);
  const [commentPostID, setcommentPostID] = useState("");
  const [profilePicChanging, setprofilePicChanging] = useState(false);
  const [deletePostId, setDeletePostId] = useState(null);
  const [selectedComp, setselectedComp] = useState("POSTS");
  const [DeletePostPopUp, setDeletePostPopUp] = useState(false);

  const navigate = useNavigate();

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `https://s50-musthafa-capstone-cosmos.onrender.com/users/editBio/${userData._id}`,
        { bioText }
      );
      if (response) {
        console.log(response.data);
        setBioText(response.data.bio);
        setEditMode(false);
        window.location.reload();
      } else {
        console.log("Response is not there");
      }
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  const handleChange = (e) => {
    setBioText(e.target.value);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  useEffect(() => {
    if (userData?._id) {
      setBioText(userData.bio);
      mypostFetch();
    }
  }, [userData]);

  const openModal = () => {
    setModalOpen(true);
  };

  const openEditModal = (post) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  };

  const mypostFetch = async () => {
    const id = userData._id;
    if (!id) {
      console.error("User ID is undefined or null.");
      return;
    }
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

  const DeleteMyPost = async () => {
    await axios
      .delete(
        `https://s50-musthafa-capstone-cosmos.onrender.com/posts/${deletePostId}`
      )
      .then((res) => {
        console.log(res.data);
        setDeletePostPopUp(false);
        mypostFetch();
      })
      .catch((err) => {
        console.log("Error while deleting the Post", err);
      });
  };

  const navigateBack = () => {
    navigate("/HomePage");
  };

  const toggleCommentModal = (post) => {
    setcommentPostID(post);
    setCommentModal(!commentModal);
  };

  const handleFileChange = async (event) => {
    setprofilePicChanging(true);
    const file = event.target.files[0];
    const imgS = ref(imDB, `images${v4()}`);
    const uploadData = await uploadBytes(imgS, file);
    const imageUrl = await getDownloadURL(uploadData.ref);

    console.log(imageUrl);

    if (imageUrl) {
      try {
        const response = await axios.patch(
          `https://s50-musthafa-capstone-cosmos.onrender.com/users/updateProfilePic/${userData._id}`,
          { imageUrl }
        );
        console.log(response.data);
        setprofilePicChanging(false);
        window.location.reload();
      } catch (err) {
        console.log("Error while updating the profile picture", err);
      }
    }
  };

  const handleCheckboxChange = async (event, postId) => {
    const action = event.target.checked ? "liked" : "unliked";
    console.log(`Post ID: ${postId}, Action: ${action}`);
    const userId = userData._id;

    try {
      const response = await axios.post(
        `https://s50-musthafa-capstone-cosmos.onrender.com/posts/like/${postId}`,
        {
          userId: userId,
          action: action,
        }
      );
      toast.success(response.data.message);
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

  useEffect(() => {
    if (DeletePostPopUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [DeletePostPopUp]);

  const handleLogout = (e) => {
    setDeletePostId(e);
    setDeletePostPopUp(true);
  };

  const handleCancel = () => {
    setDeletePostId(null);
    setDeletePostPopUp(false);
  };

  return (
    <>
      {DeletePostPopUp && (
        <div>
          <div className="overlay"></div>
          <div className="border logout-popup p-5 rounded flex flex-col justify-around text-center">
            <h2 className="text-xl mb-5 font-poppins">
              Are you sure you want to delete this post ?
            </h2>
            <div className="flex justify-evenly">
              <button
                className="py-2 px-5  bg-black text-white  tracking-wider "
                onClick={() => DeleteMyPost()}
              >
                Delete
              </button>
              <button
                className="py-2 px-5 border  text-black  tracking-wider hover:bg-gray-50"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full h-screen flex flex-col lg:flex-row">
        <ToastContainer />
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
              PROFILE
            </h2>
          </div>
          <div className="grid justify-center text-center">
            <div className="grid justify-center">
              <input
                type="file"
                id="file-input"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label htmlFor="file-input">
                {profilePicChanging ? (
                  <div className="w-52 h-52 border items-center grid justify-center rounded-full">
                    <MoonLoader
                      color="#000000"
                      size={50}
                      speedMultiplier={0.6}
                    />
                  </div>
                ) : (
                  <div
                    className="w-52 h-52 bg-cover hover:cursor-pointer hover:grayscale rounded-full"
                    style={{
                      backgroundImage: `url(${
                        userData?.profilePic ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      })`,
                      backgroundPosition: "center",
                    }}
                  ></div>
                )}
              </label>
            </div>
            <h2 className="text-3xl  font font-bold tracking-widest my-3">
              {userData?.name || "Guest"}
            </h2>
          </div>
          <div className="lg:overflow-auto myPosts lg:h-72">
            <div className="my-5">
              <h2 className="text-lg tracking-wider">NAME</h2>
              <input
                type="text"
                className="w-full font-light border mt-2 p-3 outline-none bg-white rounded-md"
                disabled
                value={userData?.name || "Guest"}
              />
            </div>
            <div>
              <div className="flex justify-between">
                <h2 className="text-lg tracking-wider">MY BIO</h2>
                <button onClick={editMode ? handleSaveClick : handleEditClick}>
                  {editMode ? "SUBMIT" : "EDIT"}
                </button>
              </div>
              <textarea
                disabled={!editMode}
                className="w-full h-28 myPosts font-light border mt-2 p-3 outline-none bg-white rounded-md"
                value={bioText}
                onChange={handleChange}
              />
            </div>
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
                YOUR POSTS
              </h2>
            </div>
            {userData ? (
              <button
                onClick={openModal}
                className="py-2 px-4 text-lg  text-white font-semibold rounded-sm bg-black tracking-wider duration-500"
              >
                Create Post
              </button>
            ) : (
              <div>
                <button onClick={() => navigate("/login")} className="py-2 px-4 text-lg  text-white rounded-sm bg-black tracking-wider duration-500">
                  Login
                </button>
              </div>
            )}
          </div>

          <div className="overflow-auto h-[85vh] myPosts">
            {myPosts.length === 0 && !Loading ? (
              <div className="text-center text-3xl font-bold font-poppins mt-40 mb-40 lg:mb-0 lg:mt-64 text-gray-700">
                You haven't posted yet
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
                            <a
                              className="rounded-sm tracking-wider"
                              onClick={() => openEditModal(post)}
                            >
                              EDIT
                            </a>
                          </li>
                          <li>
                            <a
                              className="rounded-sm tracking-wider"
                              onClick={() => handleLogout(post._id)}
                            >
                              DELETE
                            </a>
                          </li>
                        </ul>
                      </div>
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

        {modalOpen && !editModalOpen && (
          <PostForm
            Modal={modalOpen}
            setModalOpen={setModalOpen}
            mypostFetch={mypostFetch}
          />
        )}
        {editModalOpen && !modalOpen && (
          <PostEditForm
            EditModal={editModalOpen}
            setEditModalOpen={setEditModalOpen}
            mypostFetch={mypostFetch}
            post={selectedPost}
          />
        )}
      </div>
    </>
  );
}

export default Profile;
