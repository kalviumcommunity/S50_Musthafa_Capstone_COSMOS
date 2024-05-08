import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import React from "react";
import ReactDOM from "react-dom";
import { Pane, FileUploader, FileCard } from "evergreen-ui";
import { imDB} from "../Firebase/firebase"
import { v4 } from "uuid"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function PostForm({ Modal, setModalOpen, mypostFetch }) {
  const [iv, setisv] = useState(false);
  const [files, setFiles] = React.useState([]);
  const [profile, setProfile] = useState([]);
  const [fileRejections, setFileRejections] = React.useState([]);
  const handleChange = React.useCallback((files) => setFiles([files[0]]), []);
  const handleRejected = React.useCallback(
    (fileRejections) => setFileRejections([fileRejections[0]]),
    []
  );
  const handleRemove = React.useCallback(() => {
    setFiles([]);
    setFileRejections([]);
  }, []);
  useEffect(() => {
    if (Modal == true) {
      document.getElementById("my_modal_3").showModal();
      setisv(true);
    } else {
      if (iv) {
        document.getElementById("my_modal_3").close();
        setisv(false);
      }
    }
  }, [Modal]);

  useEffect(() => {
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

  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const imgS = ref(imDB, `images${v4()}`);
      const uploadData = await uploadBytes(imgS, files[0]);
      const imageUrl = await getDownloadURL(uploadData.ref);
      
      console.log(imageUrl)
      const requestData = {
        ...data,
        image: imageUrl
      };

      setModalOpen(false);
      const response = await axios.post(
        "http://localhost:3000/posts/newpost",
        requestData,
        {
          headers: {
            "X-Profile": JSON.stringify(profile),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire({
        title: "You created a post successfully",
      });
      mypostFetch();
    } catch (error) {
      console.log(error);
    }
  };
  const closeModall = () => {
    setModalOpen(false);
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
              <Pane maxWidth={654}>
                <FileUploader
                  label="Upload File"
                  description="You can upload 1 file. File can be up to 50 MB."
                  maxSizeInBytes={50 * 1024 ** 2}
                  maxFiles={1}
                  onChange={handleChange}
                  onRejected={handleRejected}
                  renderFile={(file) => {
                    const { name, size, type } = file;
                    const fileRejection = fileRejections.find(
                      (fileRejection) => fileRejection.file === file
                    );
                    const { message } = fileRejection || {};
                    return (
                      <FileCard
                        key={name}
                        isInvalid={fileRejection != null}
                        name={name}
                        onRemove={handleRemove}
                        sizeInBytes={size}
                        type={type}
                        validationMessage={message}
                      />
                    );
                  }}
                  values={files}
                />
              </Pane>
              <p className="text-red-500 text-xs">
                {errors.image && (
                  <span className="error-message">{errors.image.message}</span>
                )}
              </p>
            </div>

            <div className="py-3 mt-2 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
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
              CREATE POST
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default PostForm;
