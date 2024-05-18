import React, { useEffect, useState } from "react";
import logo from "../../Assets/COSMOS.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { Pane, FileUploader, FileCard } from "evergreen-ui";
import { imDB } from "../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Communities() {
  const [userData, setUserData] = useState([]);
  const { register, handleSubmit } = useForm();
  const [files, setFiles] = React.useState([]);
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

  const navigate = useNavigate();

  const onClickAll = () => {
    navigate("/allcommunities");
  };

  const onClickYours = () => {
    navigate("/mycommunities");
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
          setUserData(user);
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

  const onSubmit = async (data) => {
    try {
      const id = userData._id;

      const imgS = ref(imDB, `images${v4()}`);
      const uploadData = await uploadBytes(imgS, files[0]);
      const imageUrl = await getDownloadURL(uploadData.ref);

      const requestData = {
        ...data,
        creator: id,
        communityprofile: imageUrl,
      };

      console.log(data);

      const response = await axios.post(
        "http://localhost:3000/community/create",
        requestData
      );
      window.location.reload();
    } catch (error) {
      console.error("Error creating community:", error);
    }
  };

  return (
    <>
      <nav className="bg-black px-4 md:px-20 pt-14">
        <div className="flex justify-between">
          <img src={logo} className="h-12" alt="" />
          <button
            className="py-2 px-4 bg-white"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            New Community
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-white">
              <div className="modal-action mt-0">
                <form method="dialog">
                  <button className="">✕</button>
                </form>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-3xl tracking-wider">
                  CREATE YOUR COMMUNITY
                </h3>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="py-10">
                <h2 className="font-light text-sm mb-1">Community name</h2>
                <input
                  {...register("name")}
                  className="bg-white pl-3 font-light rounded-md mb-5 border outline-none w-full h-10"
                  type="text"
                />
                <h2 className="font-light text-sm mb-1">
                  Community Description
                </h2>
                <input
                  {...register("description")}
                  className="bg-white pl-3 font-light rounded-md mb-5 border outline-none w-full h-10"
                  type="text"
                />
                <h2 className="font-light text-sm mb-1">Community profile</h2>
                <Pane maxWidth={654}>
                  <FileUploader
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

                <button
                  type="submit"
                  className="bg-black w-full mt-7 h-10 rounded-md text-white"
                >
                  CREATE
                </button>
              </form>
            </div>
          </dialog>
        </div>
        <div className="flex bg-slate-100 w-full md:w-2/5 mt-4 md:mt-9 rounded-lg shadow-sm">
          <input
            type="text"
            id="hs-trailing-button-add-on-with-icon"
            name="hs-trailing-button-add-on-with-icon"
            placeholder="Search for the Community"
            className="py-3 px-4 z-50 block w-full shadow-lg rounded-s-lg text-sm focus:z-10 disabled:opacity-50 bg-white disabled:pointer-events-none dark:bg-white outline-none"
          />
          <button
            type="button"
            className="w-[2.875rem] h-[2.875rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-black text-white hover:bg-gray-800 duration-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
        <div className="flex justify-center gap-5 mt-4 md:mt-8">
          <button
            onClick={() => onClickAll()}
            className={`text-xl duration-500 px-5 py-2 font-poppins border-b-4 border-transparent font-medium text-white`}
          >
            ALL
          </button>
          <button
            onClick={() => onClickYours()}
            className={`text-xl duration-500 px-5 py-2 font-poppins border-b-4 border-transparent font-medium text-white`}
          >
            YOURS
          </button>
        </div>
      </nav>
    </>
  );
}

export default Communities;
