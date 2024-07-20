import React, { useEffect, useState } from "react";
import commenticon from "../../Assets/commenticon.png";
import { ShimmerPostItem } from "react-shimmer-effects";
import PostComments from "../Comment/PostComments";
import axios from "axios";

function UserPosts({ userData, setUserData }) {
  const [shuffledPosts, setShuffledPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentModal, setCommentModal] = useState(false);
  const [commentPostID, setcommentPostID] = useState("");

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
    return shuffledArray;
  };

  const handleCheckboxChange = async (event, postId) => {
    const action = event.target.checked ? "liked" : "unliked";
    const userId = userData._id;

    try {
      const response = await axios.post(
        `http://localhost:3000/posts/like/${postId}`,
        {
          userId: userId,
          action: action,
        }
      );
      console.log("Post updated:", response.data);

      // Update the local state immediately
      const updatedPosts = shuffledPosts.map((post) => {
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
      setShuffledPosts(updatedPosts);
    } catch (error) {
      console.error(
        "Error updating post:",
        error.response?.data || error.message
      );
    }
  };

  const toggleCommentModal = (post) => {
    setcommentPostID(post);
    setCommentModal(!commentModal);
  };

  const savePostsHandleChange = async (event, postId) => {
    const action = event.target.checked ? "saved" : "unsaved";
    const userId = userData._id;

    try {
      const response = await axios.post(
        `http://localhost:3000/users/saveThePost/${userId}`,
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

  return (
    <div>
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
              className="bg-white border mt-5 px-7 py-5 shadow-lg"
            >
              <div className="flex justify-between">
                <h1 className="font-bold font-poppins tracking-wider text-2xl">
                  {post.name}
                </h1>
              </div>

              <img className="mt-2 w-full" src={post.image} alt="" />
              <h2 className="text-xl font-semibold mt-2">{post.caption}</h2>

              <div className="flex items-center justify-between mt-3 gap-5">
                {/* <div className="flex gap-4">
                  <label className="ui-bookmark">
                    <input
                      type="checkbox"
                      onChange={(event) =>
                        handleCheckboxChange(event, post._id)
                      }
                      checked={post.likes.includes(userData._id)}
                    />
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
                    <h2 className="text-center">{post.likes.length}</h2>
                  </label>

                  <div className="drawer mt-1 cursor-pointer drawer-end w-fit">
                    <input
                      id="my-drawer-4"
                      type="checkbox"
                      className="drawer-toggle"
                    />
                    <div
                      onClick={() => toggleCommentModal(post._id)}
                      className="drawer-content flex z-30"
                    >
                      <img src={commenticon} className="w-6" alt="" />
                      <h2>Comments</h2>
                    </div>
                  </div>
                </div> */}
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
                    onChange={(event) => savePostsHandleChange(event, post._id)}
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
      <PostComments
        post_id={commentPostID}
        userData={userData}
        commentModal={commentModal}
        toggleCommentModal={toggleCommentModal}
      />
    </div>
  );
}

export default UserPosts;
