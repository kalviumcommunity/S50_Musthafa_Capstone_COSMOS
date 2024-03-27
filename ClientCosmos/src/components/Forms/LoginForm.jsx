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

function LoginForm() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const onClick = () => {
    navigate("/signup");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.post(
            "http://localhost:3000/users/tokenvalidate",
            { token }
          );
          console.log(response.data);
          navigate("/HomePage");
        } catch (error) {
          console.error("Error in post request", error.response.data.error);
        }
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/getone",
        data
      );

      const { user, token } = response.data;
      const serializedUser = JSON.stringify(user);

      Cookies.set("token", token);
      Cookies.set("userData", serializedUser);

      navigate("/HomePage");
    } catch (error) {
      console.error("Error in post request", error.response.data.error);
      setApiError(error.response.data.error);
    }
  };

  const toLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <>
      <>
        <div className="flex lg:pt-32 pt-10 justify-center bg-black h-screen w-screen overflow-auto">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 w-full px-6 lg:px-40 justify-between">
            <div className="lg:mr-10 w-full lg:96">
              <img src={COSMOS} className="h-12" alt="" />
              <div className="buttons-container  sm:mt-16 w-full flex flex-col justify-start mt-20 gap-5">
                <div
                  onClick={() => toLogin()}
                  className="google-login-button gap-5 bg-white flex items-center justify-center rounded-2xl px-6 py-4 shadow-lg cursor-pointer "
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
                  <span>Log in with Google</span>
                </div>

                <div className="apple-login-button gap-5  flex items-center justify-center rounded-2xl px-6 py-4 shadow-lg cursor-pointer bg-white">
                  <svg
                    className="apple-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    width="1.6em"
                    height="1.6em"
                  >
                    <path
                      fill="currentColor"
                      d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"
                    />
                  </svg>
                  <span>Log in with Apple</span>
                </div>
                <div className="facebook-login-button flex items-center justify-center rounded-2xl px-6 py-4 shadow-lg cursor-pointer bg-blue-600 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mr-3"
                  >
                    <path
                      fill="currentColor"
                      d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z"
                    ></path>
                  </svg>
                  <span>Log in with Facebook</span>
                </div>
              </div>
            </div>
            <div className="flex items-center lg:h-96">
              <h2 className="text-2xl text-white font-extralight mt-10 lg:mt-1 text-center w-full">
                OR
              </h2>
            </div>
            <div className="lg:ml-10 w-full flex justify-center mt-10 lg:mt-0">
              {/* Form Content */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex justify-center mb-10 items-center p-10 h-fit bg-white w-fit flex-col  "
              >
                <div className="text-start w-full">
                  <h2 className="text-black font-poppins text-start text-3xl font-bold">
                    LOGIN
                  </h2>
                  <h1 className="text-lg">
                    New User?
                    <span
                      onClick={onClick}
                      className="cursor-pointer ml-3 font-poppins underline"
                    >
                      Create an account
                    </span>
                  </h1>
                  {apiError && (
                    <p className="text-red-500 text-xs">{apiError}</p>
                  )}
                </div>
                <div className="w-full">
                  <p className="font-light mt-8 p-[-4] text-black">Email</p>
                  <input
                    className="duration-500 border-black hover:shadow-2xl  outline-none  w-full py-2 pl-4 rounded-sm bg-white text-cyan-900 border-b-2"
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
                      <span className="error-message">
                        {errors.email.message}
                      </span>
                    )}
                  </p>
                </div>

                <div className="w-full">
                  <p className="font-light mt-8 p-[-4] text-black">Password</p>
                  <input
                    className="duration-500 border-black hover:shadow-2xl  outline-none  w-full py-2 pl-4 rounded-sm bg-white text-cyan-900 border-b-2"
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
                    type="password"
                  />
                  <p className="text-red-500 text-xs">
                    {errors.password && (
                      <span className="error-message">
                        {errors.password.message}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex mt-10 gap-5">
                  <button
                    onClick={() => {
                      navigate("/Homepage");
                    }}
                    className="bg-black duration-500  px-9 py-2 hover:bg-gray-900 text-white cursor-pointer"
                  >
                    GO BACK
                  </button>
                  <button
                    type="submit"
                    className="bg-black duration-500  px-9 py-2 hover:bg-gray-900 text-white cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default LoginForm;
