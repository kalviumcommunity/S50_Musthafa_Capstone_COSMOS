import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function PostEditForm({ EditPost, EditModal, setEditModalOpen, mypostFetch }) {
  const [iv, setisv] = useState(false);
  const [profile, setProfile] = useState([]);
  const [caption, setCaption] = useState(EditPost.caption);
  const [topic, setTopic] = useState(EditPost.topic);

  useEffect(() => {
    if (EditModal) {
      document.getElementById("my_modal_3").showModal();
      setisv(true);
    } else {
      if (iv) {
        document.getElementById("my_modal_3").close();
        setisv(false);
      }
    }
  }, [EditModal, iv]);

  useEffect(() => {
    setCaption(EditPost.caption);
    setTopic(EditPost.topic);
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.post(
            "http://localhost:3000/users/tokenvalidate",
            { token }
          );
          const { user } = response.data;
          setProfile(user);
        } catch (error) {
          console.error("Error in post request", error);
        }
      } else {
        console.log("Token is not there");
      }
    };

    fetchData();
  }, [EditPost]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCaptionChange = (e) => {
    setCaption((prevCaption) => e.target.value);
  };

  const handleTopicChange = (e) => {
    setTopic((prevTopic) => e.target.value);
  };

  const onSubmit = async (data) => {
    try {
      const updatedPost = {
        ...EditPost,
        caption: data.caption,
        topic: data.topic,
      };

      await axios.put(
        `http://localhost:3000/posts/${EditPost._id}`,
        updatedPost
      );
      setEditModalOpen(false);
      mypostFetch();
      Swal.fire("Success", "Post updated successfully", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to update post", "error");
    }
  };

  const closeModall = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white modalBox">
          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModall}
            >
              ✕
            </button>

            <h2 className="text-3xl tracking-widest font-bold">
              EDIT YOUR POST
            </h2>

            <div className="mt-5">
              <label
                htmlFor="caption"
                className="block text-sm mb-2 text-black"
              >
                Caption
              </label>
              <input
                type="text"
                id="caption"
                name="caption"
                value={caption}
                onChange={handleCaptionChange}
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm bg-white border"
                {...register("caption", {
                  required: "Caption is required",
                })}
              />
              <p className="text-red-500 text-xs">
                {errors.caption && (
                  <span className="error-message">
                    {errors.caption.message}
                  </span>
                )}
              </p>
            </div>

            <div className="mt-3">
              <label htmlFor="topic" className="block text-sm mb-2 text-black">
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                value={topic}
                onChange={handleTopicChange}
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm bg-white border"
                {...register("topic")}
              >
                <option value="home">EARTH</option>
                <option value="solarsystem">SOLAR SYSTEM</option>
                <option value="star">STARS</option>
                <option value="galaxies">GALAXIES</option>
                <option value="supernova">SUPER NOVA</option>
                <option value="nebula">NEBULAE</option>
                <option value="blackHole">BLACK HOLE</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 mt-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-black text-white hover:bg-gray-900 duration-300"
            >
              UPDATE POST
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default PostEditForm;
