import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const profilepic =
    "https://tse2.mm.bing.net/th?id=OIP.TVzo903QcUOlnjHHyeWrDQHaE6&pid=Api&P=0&h=220";
  
  const AddComment = async () => {
    const com = {
      postid: post_id,
      comment: yourComment,
      name: userData.username,
      profilepic: profilepic,
    };

    try {
      const response = await axios.post("http://localhost:3000/posts/addcomment", com);
      console.log("Comment added successfully:", response.data);
      fetchComments();
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Error adding comment. Please try again.");
    }

    setYourComment("");
  };

  const takeComment = (e) => {
    setYourComment(e.target.value);
  };

  return (
    <div className="flex items-center justify-between mt-3 gap-5">
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
            <ul className="menu p-4 w-2/4 min-h-full bg-black text-base-content">
              <div className="flex justify-between">
                <h2 className="text-3xl text-white tracking-wider font-bold p-10">
                  COMMENTS
                </h2>
                <button
                  className="text-xl cursor-pointer p-10"
                  onClick={toggleCommentModal}
                >
                   GO BACK  
                </button>
              </div>

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
                  onClick={() => AddComment()}
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
                {comments &&
                  comments.map((comment, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 text-black p-5 mb-6"
                    >
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
                  ))}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostComments;
