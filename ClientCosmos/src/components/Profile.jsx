import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PostForm from "./Forms/PostForm";
import axios from "axios";
import commenticon from "../Assets/commenticon.png";
import swal from "sweetalert";

function Profile() {
  const [userData, setUserData] = useState("");
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const storedUserData = Cookies.get("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
    mypostFetch();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [yourComment, setYourComment] = useState([]);

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
          setMyPosts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  };

  const DeleteMyPost = (e) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:3000/posts/${e}`)
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
  const takeComment = (e) => {
    setYourComment(e.target.value);
  };

  const Edit = () => {};

  const profilepic =
    "https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220";
  const AddComment = (e) => {
    console.log(e);
    const com = {
      postid: e,
      comment: yourComment,
      name: userData.username,
      profilepic: profilepic,
    };

    axios
      .post("http://localhost:3000/posts/addcomment", com)
      .then((response) => {
        console.log("Comment added successfully:", response.data);
        window.relaod;
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });

    setYourComment("");
  };

  const commentsClick = (e) => {
    setComments(e.comments);
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col lg:flex-row">
        <div className="lg:w-3/4 w-full lg:block grid justify-center  px-10">
          <h2 className="text-4xl  font font-bold tracking-widest my-8">
            PROFILE
          </h2>
          <div className="w-full mt-8 flex flex-col items-center">
            <div
              className="w-52 h-52 bg-cover rounded-full"
              style={{
                backgroundImage: `url(https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220)`,
              }}
            ></div>
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
            <h2 className="text-lg tracking-wider">MY BIO</h2>
            <div className="w-full myPosts font-light border mt-2 p-3 outline-none bg-white rounded-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Ut iusto
              debitis necessitatibus tempora, placeat porro veritatis quod
              similique! Aliquid iusto autem earum illum delectus
              necessitatibus, est voluptatum maiores tempore esse.
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
            {myPosts.length === 0 ? (
              <div className="text-center text-3xl font-bold font-poppins mt-40 mb-40 lg:mb-0 lg:mt-64 text-gray-700">
                You Hav'nt posted yet
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
                            <a className="rounded-sm tracking-wider">EDIT</a>
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
                    <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
                    <p className=" text-xl font-light mt-2">
                      {post.description}
                    </p>

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
                            <label
                              htmlFor="my-drawer-4"
                              className="cursor-pointer"
                            >
                              <img src={commenticon} className="w-6" alt="" />
                            </label>
                          </div>
                          <div className="drawer-side z-50">
                            <label
                              htmlFor="my-drawer-4"
                              aria-label="close sidebar"
                              className="drawer-overlay"
                            ></label>
                            <ul className="menu p-4 w-2/4 min-h-full bg-black text-base-content">
                              <h2 className="text-3xl text-white tracking-wider font-bold p-10">
                                COMMENTS
                              </h2>

                              <div className="flex bg-white rounded-lg outline-none text-black mx-10 px-3 py-3 justify-between">
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
                              <div className="mx-7 mt-6 h-96 overflow-auto myPosts">
                                {comments.map((comment) => {
                                  return (
                                    <div className="bg-gray-100 text-black p-5 mb-6">
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

                                      <h2 className="mt-3">
                                        {comment.comment}
                                      </h2>
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
            )}
          </div>
        </div>
        <PostForm
          Modal={modalOpen}
          setModalOpen={setModalOpen}
          mypostFetch={mypostFetch}
        />
      </div>
    </>
  );
}

export default Profile;
