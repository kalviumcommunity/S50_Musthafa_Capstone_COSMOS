import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function PostForm({Modal, setModalOpen}) {
  const [iv, setisv] = useState(false);

  useEffect(()=>{
    if (Modal == true) {
      document.getElementById("my_modal_3").showModal();
      setisv(true);
    } else {
        if(iv){
          document.getElementById("my_modal_3").close();
          setisv(false);
        }
    }
  }, [Modal])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("http://localhost:3000/posts", data);
      console.log("Post created successfully:", response.data);
      setModalOpen(false)
      Swal.fire({
        title: "You created a post succussfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const closeModall = () => {
    setModalOpen(false)
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
              CREATE A POST
            </h2>

            <div className="mt-5">
              <label htmlFor="title" className="block text-sm mb-2 text-black">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="  py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-white border "
                {...register("title", {
                  required: "Title is required",
                })}
              />
              <p className="text-red-500 text-xs">
                {errors.title && (
                  <span className="error-message">{errors.title.message}</span>
                )}
              </p>
            </div>

            <div className="mt-3">
              <label
                htmlFor="description"
                className="block text-sm mb-2 text-black"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-white border "
                {...register("description", {
                  required: "Description is required",
                })}
              />
              <p className="text-red-500 text-xs">
                {errors.description && (
                  <span className="error-message">
                    {errors.description.message}
                  </span>
                )}
              </p>
            </div>

            <div className="mt-3">
              <label
                htmlFor="imageLink"
                className="block text-sm mb-2 text-black"
              >
                Image Link
              </label>
              <input
                type="text"
                id="imageLink"
                name="imageLink"
                className="  py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-white border "
                {...register("image")}
              />
              <p className="text-red-500 text-xs">
                {errors.image && (
                  <span className="error-message">{errors.image.message}</span>
                )}
              </p>
            </div>

            <div class="py-3 mt-2 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
              Or
            </div>

            <div className="mt-2">
              <label htmlFor="video" className="block text-sm mb-2 text-black">
                Video Link
              </label>
              <input
                type="text"
                id="videoLink"
                name="video"
                className="  py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-white border "
                {...register("video")}
              />
              <p className="text-red-500 text-xs">
                {errors.video && (
                  <span className="error-message">{errors.video.message}</span>
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
                {/* <option className="text-gray-200" value="" disabled selected>
                  Select a topic
                </option> */}
                <option value="home">EARTH</option>
                <option value="solarsystem">SOLAR SYSTEM</option>
                <option value="star">STARS</option>
                <option value="galaxies">GALAXIES</option>
                <option value="supernova">SUPER NOVA</option>
                <option value="nebula">NEBULA</option>
                <option value="blackHole">NEBULAS</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 mt-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-black text-white hover:bg-gray-900 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              CREATE POST
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default PostForm;
