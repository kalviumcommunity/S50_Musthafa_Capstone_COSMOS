import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import COSMOS from "../../Assets/COSMOS.png";
import GOOGLE from "../../Assets/GOOGLE.png";
import APPLE from "../../Assets/APPLE.png";
import FACEBOOK from "../../Assets/FACEBOOK.png";
import Cookies from "js-cookie";
import "preline/preline";

function SignupForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const onClick = () => {
    navigate("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [alert, setAlert] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        data,
        {
          withCredentials: true,
        }
      );
      setAlert(false);
      if (response.status === 201) {
        navigate("/HomePage");
      }
      setApiError(null);
    } catch (error) {
      console.error("Error in post request", error);
      setAlert(true);
      setApiError(error.response.data.error);
    }
  };

  const GoogleSignUp = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <>
      <>
        {alert && apiError && (
          <div className="absolute flex justify-center items-center w-screen transition-transform transform translate-y-full">
            <div className="px-7 w-2/4 rounded-md py-2 bg-red-600 flex items-center justify-center text-center">
              <h2 className="text-xl text-white font-thin tracking-widest">
                {apiError}
              </h2>
            </div>
          </div>
        )}

        <div
          className="w-screen h-screen pl-36 bg-black grid items-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(https://wallpapers.com/images/featured/4k-space-9w27dqmc4nrs3xwd.jpg)`,
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center items-center p-10  bg-white rounded-tl-none rounded-bl-none shadow-xl rounded-3xl flex-col w-fit"
          >
            <div className="text-start w-full">
              <h2 className="text-black text-start text-3xl font-bold">
                CREATE AN <br /> ACCOUNT
              </h2>
            </div>

            <div className="w-full mt-6">
              <input
                type="text"
                className="bg-white border  outline-none w-full py-2 px-2 font-light"
                placeholder="Name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 5,
                    message: "Minimum length is 5 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum length is 20 characters",
                  },
                })}
              />
              <p className="text-red-500 text-xs">
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </p>
            </div>

            <div className="w-full mt-5">
              <input
                type="text"
                className="bg-white border  outline-none w-full py-2 px-2 font-light"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                    message: "Invalid email",
                  },
                })}
              />
              <p className="text-red-500 text-xs ">
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </p>
            </div>

            <div className="w-full mt-5">
              <input
                type="password"
                className="bg-white border  outline-none w-full py-2 px-2 font-light"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length is 4 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum length is 20 characters",
                  },
                })}
              />
              <p className="text-red-500 text-xs">
                {errors.password && (
                  <span className="error-message">
                    {errors.password.message}
                  </span>
                )}
              </p>
            </div>

            <div className="flex mt-6 w-full gap-5">
              <button
                type="submit"
                className="bg-black duration-500 w-full text-sm  py-2 font-semibold tracking-wider text-white cursor-pointer"
              >
                SIGN UP
              </button>
            </div>
            <div className="flex items-center mt-7 gap-3">
              <hr className="bg-blue-900 w-32" />
              OR
              <hr className="bg-blue-900 w-32" />
            </div>
            <div
              onClick={() => GoogleSignUp()}
              className="gap-5 bg-white border font-poppins flex items-center justify-center rounded-2xl w-full mt-7 py-4 cursor-pointer "
            >
              <svg
                className="google-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="1.6em"
                height="1.6em"
                version="1.1"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                          c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                          c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                          C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                          c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                          c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <span>Sign up with Google</span>
            </div>
            <div>
              <h1 className="mt-8 text-sm">
                HAVE AN ACCOUNT?
                <span
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="cursor-pointer font-semibold ml-1 font-poppins underline"
                >
                  SIGN IN
                </span>
              </h1>
            </div>
          </form>
        </div>
      </>
    </>
  );
}

export default SignupForm;
