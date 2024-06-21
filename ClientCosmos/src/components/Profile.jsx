import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PostForm from "./Forms/PostForm";
import axios from "axios";
import commenticon from "../Assets/commenticon.png";
import swal from "sweetalert";
import { ShimmerPostItem } from "react-shimmer-effects";
import { useNavigate } from "react-router-dom";
import PostEditForm from "./Forms/PostEditForm";
import PostComments from "./PostComments";
import { imDB } from "./Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Profile() {
  const [userData, setUserData] = useState("");
  const [myPosts, setMyPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [bioText, setBioText] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentModal, setCommentModal] = useState(false);
  const [commentPostID, setcommentPostID] = useState("");

  const navigate = useNavigate();

  const handleSaveClick = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/editBio/${userData._id}`,
        { bioText }
      );
      if (response) {
        console.log(response.data);
        setBioText(response.data.bio);
        setEditMode(false);
        window.relaod;
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

  const getUserdata = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      setBioText(response.data.bio);
      setUserData(response.data);
    } catch (err) {
      console.log("Error while getting the profile data", err);
    }
  };

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
          if (user) {
            getUserdata(user._id);
          }
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
    if (userData._id) {
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
        `http://localhost:3000/posts/getmyposts/${id}`
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
  
  const DeleteMyPost = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:3000/posts/${postId}`)
          .then((res) => {
            console.log(res.data);
            mypostFetch();
          })
          .catch((err) => {
            console.log("Error while deleting the Post", err);
          });
        swal("Poof! Your post has been deleted!", {
          icon: "success",
        });
      }
    });
  };

  const navigateBack = () => {
    navigate("/HomePage");
  };

  const toggleCommentModal = (post) => {
    setcommentPostID(post);
    setCommentModal(!commentModal);
  };

  const [image, setImage] = useState(
    "https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220"
  );

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const imgS = ref(storage, `images/${uuidv4()}`);
    const uploadData = await uploadBytes(imgS, file);
    const imageUrl = await getDownloadURL(uploadData.ref);

    if (imageUrl) {
      try {
        const response = await axios.patch(
          `http://localhost:3000/users/updateProfilePic/${userData._id}`,
          { imageUrl }
        );
        console.log(response.data);
      } catch (err) {
        console.log("Error while updating the profile picture", err);
      }
    }
  };

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
              PROFILE
            </h2>
          </div>
          <div className="grid justify-center text-center">
            <div>
              <input
                type="file"
                id="file-input"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label htmlFor="file-input">
                <div
                  className="w-52 h-52 bg-cover hover:cursor-pointer hover:grayscale rounded-full"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                ></div>
              </label>
            </div>
            <h2 className="text-3xl  font font-bold tracking-widest my-3">
              {userData.username}
            </h2>
          </div>
          <div className="lg:overflow-auto myPosts lg:h-72">
            <div className="my-5">
              <h2 className="text-lg tracking-wider">NAME</h2>

              <input
                type="text"
                className="w-full font-light border mt-2 p-3 outline-none bg-white rounded-md"
                disabled
                value={userData.name}
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
        <div className="w-full lg:mt-0 myPosts mt-10 lg:overflow-auto bg-gray-200 px-10">
          <div className="z-50 w-full flex justify-between items-center px-5">
            <h2 className="text-4xl font-bold tracking-widest my-8">
              YOUR POSTS
            </h2>
            <button
              onClick={openModal}
              className="text-lg tracking-wider border bg-white shadow-lg px-5 py-2 h-fit"
            >
              Create Post
            </button>
          </div>

          <div className="overflow-auto myPosts">
            {myPosts.length === 0 && !Loading ? (
              <div className="text-center text-3xl font-bold font-poppins mt-40 mb-40 lg:mb-0 lg:mt-64 text-gray-700">
                You Hav'nt posted yet
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
                        {post.username}
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
                              onClick={() => DeleteMyPost(post._id)}
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
