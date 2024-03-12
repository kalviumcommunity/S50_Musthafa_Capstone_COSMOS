import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import COSMOS from "../../Assets/COSMOS.png";
import GOOGLE from "../../Assets/GOOGLE.png";

import APPLE from "../../Assets/APPLE.png";
import FACEBOOK from "../../Assets/FACEBOOK.png";


function SignupForm() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState([]);

  const onSubmit = async (data) => {
    setData(data);
  };

  return (
    <>
      <div className="flex items-center justify-center bg-black h-screen w-screen ">
        <div className="flex gap-72 px-40 justify-between">
          <div>
            <img src={COSMOS} className="h-14" alt="" />
            <div className="flex gap-16 mt-28">
              <img className="rounded-full w-14"  src={GOOGLE} alt="google" />
              <img className="rounded-full w-14" src={FACEBOOK} alt="facebook" />
              <img className="rounded-full w-14" src={APPLE} alt="apple" />
            </div>

            <h1 className="text-white font-bold text-xl mt-10">Sign up with Email</h1>
            <h1 className="text-white mt-2">
              Already have an account
              <span onClick={onClick} className="text-undeline cursor-pointer ml-2 underline">
                Sign in
              </span>
            </h1>
          </div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex justify-center items-center p-10 h-fit bg-white w-fit flex-col  text-white"
            >
                <div className="text-start w-full">
                    <h2 className="text-black text-start text-3xl font-bold">CREATE AN <br /> ACCOUNT </h2>
                </div>
              <div className="">
                <input
                  className="duration-500 border-black hover:shadow-2xl mt-8 outline-none  w-96 py-2 pl-4 rounded-sm bg-white text-cyan-900 border-b-2"
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
                  placeholder="Enter your Name"
                />
                <p className="text-red-500 text-xs">
                  {errors.name && (
                    <span className="error-message">{errors.name.message}</span>
                  )}
                </p>
              </div>

              <div className="">
                <input
                  className="duration-500 border-black hover:shadow-2xl  mt-8 outline-none  w-96 py-2 pl-4 rounded-sm bg-white text-cyan-900 border-b-2"
                  {...register("username", {
                    required: "username is required",
                    minLength: {
                      value: 5,
                      message: "Minimum length is 5 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Maximum length is 20 characters",
                    },
                  })}
                  placeholder="Enter your username"
                />
                <p className="text-red-500 text-xs ">
                  {errors.username && (
                    <span className="error-message">
                      {errors.username.message}
                    </span>
                  )}
                </p>
              </div>

              <div className="">
                <input
                  className="duration-500 border-black hover:shadow-2xl mt-8 outline-none  w-96 py-2 pl-4 rounded-sm bg-white text-cyan-900 border-b-2"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                      message: "Invalid email",
                    },
                  })}
                  placeholder="Enter your Email"
                />
                <p className="text-red-500 text-xs ">
                  {errors.email && (
                    <span className="error-message">
                      {errors.email.message}
                    </span>
                  )}
                </p>
              </div>

              <div className="">
                <input
                  className="duration-500 border-black hover:shadow-2xl mt-8 outline-none  w-96 py-2 pl-4 rounded-sm bg-white text-cyan-900 border-b-2"
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
                  placeholder="Enter your Password"
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
              <div className="flex gap-5">
                <button
                  onClick={() => {
                    navigate("/Homepage");
                  }}
                  className="bg-black duration-500 mt-10 px-10 py-2 hover:bg-gray-900 text-white p-10-15 border-none border-radius-4px cursor-pointer text-base"
                >
                  GO BACK
                </button>
                <button
                  type="submit"
                  className="bg-black duration-500 mt-10 px-10 py-2 hover:bg-gray-900 text-white p-10-15 border-none border-radius-4px cursor-pointer text-base"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
