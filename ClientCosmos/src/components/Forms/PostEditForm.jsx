import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import React from "react";
import useUserData from "../utils/UserData";

function PostEditForm({ EditModal, setEditModalOpen, mypostFetch, post }) {
  const [iv, setisv] = useState(false);
  const { user } = useUserData();

  useEffect(() => {
    if (EditModal == true) {
      document.getElementById("my_modal_3").showModal();
      setisv(true);
    } else {
      if (iv) {
        document.getElementById("my_modal_3").close();
        setisv(false);
      }
    }
  }, [EditModal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (post) {
      setValue("caption", post.caption);
      setValue("topic", post.topic);
    }
  }, [post, setValue]);

  const onSubmit = async (data) => {
    try {
      setEditModalOpen(false);
      const response = await axios.put(
        `http://localhost:3000/posts/${post._id}`,
        data,
        {
          headers: {
            "X-Profile": JSON.stringify(user),
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        console.log(response);
        Swal.fire({
          title: "You updated the post successfully",
        });
      }
      mypostFetch();
    } catch (error) {
      console.log(error);
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
              onClick={() => closeModall()}
            >
              ✕
            </button>

            <h2 className="text-3xl tracking-widest font-bold">
              UPDATE YOUR POST
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
                className="  py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-white border "
                {...register("caption", {
                  required: "caption is required",
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
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-white border "
                required
                {...register("topic")}
              >
                <option value="home">EARTH</option>
                <option value="solarsystem">SOLAR SYSTEM</option>
                <option value="star">STARS</option>
                <option value="galaxies">GALAXIES</option>
                <option value="supernova">SUPER NOVA</option>
                <option value="nebula">NEBULAS</option>
                <option value="blackHole">BLACK HOLE</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 mt-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-black text-white hover:bg-gray-900 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
