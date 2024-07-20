import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PostComments({ post_id, userData, commentModal, toggleCommentModal }) {
  const [yourComment, setYourComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      if (post_id !== "") {
        const response = await axios.get(
          `http://localhost:3000/posts/getAllComments/${post_id}`
        );
        console.log(response.data);
        setComments(response.data);
      }
    } catch (err) {
      console.log("Error while fetching comments", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post_id]);

  const AddComment = async () => {
    if (yourComment != "") {
      const newComment = {
        postid: post_id,
        comment: yourComment,
        name: userData.name,
        profilepic: userData.profilePic,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/posts/addcomment",
          newComment
        );
        console.log("Comment added successfully:", response.data);
        setComments((prevComments) => [...prevComments, newComment]);
        // fetchComments()
        toast.success("Comment added successfully!");
      } catch (error) {
        console.error("Error adding comment:", error);
        toast.error("Error adding comment. Please try again.");
      }
      setYourComment("");
    }
  };

  const takeComment = (e) => {
    setYourComment(e.target.value);
  };

  return (
    <div className="flex items-center justify-between mt-3">
      <ToastContainer position="top-center" />
      <div className="flex gap-4 items-center">
        <div className="drawer drawer-end w-fit ">
          <input
            id="my-drawer-4"
            type="checkbox"
            className="drawer-toggle"
            checked={commentModal}
            onChange={toggleCommentModal}
          />
          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
              onClick={toggleCommentModal}
            ></label>
            <ul className="menu bg-white p-4 w-2/4 min-h-full  text-base-content">
              <div className="flex items-center justify-between px-4 py-5">
                <h2 className="text-3xl  text-black tracking-wider font-bold">
                  COMMENTS
                </h2>
                <button
                  type="button"
                  className="btn btn-md text-lg  btn-circle btn-ghost text-black"
                  onClick={toggleCommentModal}
                >
                  ✕
                </button>
              </div>
              <div className="mx-7 h-[76vh] overflow-auto myPosts">
                {comments &&
                  comments
                    .slice()
                    .reverse()
                    .map((comment, index) => (
                      <>
                        <div key={index} className="text-black my-5">
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
                        <hr />
                      </>
                    ))}
              </div>
              <div className="px-5">
                <div className="flex mt-5 justify-center">
                  <input
                    type="text"
                    className="w-full bg-white pl-3 py-2 border outline-none font-light text-black"
                    placeholder="Share your thoughts"
                    value={yourComment}
                    onChange={takeComment}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && yourComment != "") {
                        AddComment();
                      }
                    }}
                  />
                  <button
                    className={`px-5 py-2 text-white transition-colors duration-300 ${
                      yourComment === "" ? "bg-black" : "bg-blue-600"
                    }`}
                    onClick={AddComment}
                  >
                    SEND
                  </button>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostComments;
