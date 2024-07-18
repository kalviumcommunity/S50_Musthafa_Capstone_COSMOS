import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HelpIcon from "../../Assets/helpIcon.png";
import PassIcon from "../../Assets/passIcon.png";
import AccountIcon from "../../Assets/accountIcon.png";
import HomeIcon from "../../Assets/homeIcon.png";
import editicon from "../../Assets/editicon.png";

function Help() {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">COSMOS Help Center</h1>
      <p className="mb-6 text-lg">
        Welcome to the COSMOS Help Center. Explore space-related topics, chat
        through communities, and share pictures you've taken. For any assistance
        or inquiries, please reach out to us.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
      <ul className="space-y-2">
        <li>
          <h2 className="text-lg font-semibold">CREATOR</h2>
          <h2>MUHAMMED MUSTHAFA CP</h2>
        </li>
        <li>
          <h2 className="text-lg font-semibold">EMAIL</h2>
          <a href="mailto:musthafacp0007@gmail.com" className="text-blue-600">
            musthafacp0007@gmail.com
          </a>
        </li>
      </ul>
    </div>
  );
}

function Account({ userData, setDeleteAccountPopUp, GoogleAuth }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        `https://s50-musthafa-capstone-cosmos.onrender.com/users/changepassword/${userData.user_id}`,
        {
          currentPassword,
          newPassword,
        }
      );

      console.log(response.data);
      if (response.data.success) {
        setErrorMessage("");
        setSuccessMessage("Password changed successfully");
        setIsEditing(false);
        setCurrentPassword("");
        setNewPassword("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 4000);
      } else {
        console.log(response.data);
        setErrorMessage("Current password is incorrect");
        setIsEditing(false);
        setCurrentPassword("");
        setNewPassword("");
        setTimeout(() => {
          setErrorMessage("");
        }, 4000);
      }
    } catch (error) {
      console.log("Error while changing the password", error);
      setErrorMessage("An error occurred while changing the password.");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Account Details</h2>
      {userData ? (
        <div className="p-4">
          <div>
            <h2 className="text-lg font-semibold font-poppins">Name</h2>
            <input
              type="text"
              className="w-2/4 bg-white outline-none border rounded-sm py-2 px-3"
              value={userData.name}
              disabled
            />
          </div>
          <div className="mt-5">
            <h2 className="text-lg font-semibold font-poppins">Email</h2>
            <input
              type="text"
              className="w-2/4 bg-white outline-none border rounded-sm py-2 px-3"
              value={userData.email}
              disabled
            />
          </div>
          <hr className="w-full mt-10" />

          {GoogleAuth && (
            <>
              <div className="mt-6">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-2xl font-bold">Change Password</h2>
                  <img
                    className="w-4 h-4 cursor-pointer"
                    src={editicon}
                    alt="Edit Icon"
                    onClick={() => setIsEditing(!isEditing)}
                  />
                </div>
                <div>
                  {errorMessage && (
                    <div className="bg-red-600 w-full py-3 text-center text-white font-semibold mb-4">
                      {errorMessage}
                    </div>
                  )}
                  {successMessage && (
                    <div className="bg-green-600 w-full py-3 text-center text-white font-semibold mb-4">
                      {successMessage}
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <div className="w-2/4">
                    <h2 className="text-lg text-gray-400 font-poppins">
                      Current Password
                    </h2>
                    <input
                      type="password"
                      placeholder="........"
                      className={`bg-white w-full outline-none py-2 px-3 border ${
                        isEditing ? "border-2 border-black" : ""
                      }`}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="w-2/4">
                    <h2 className="text-lg text-gray-400 font-poppins">
                      New Password
                    </h2>
                    <input
                      type="password"
                      placeholder="........"
                      className={`bg-white w-full outline-none py-2 px-3 border ${
                        isEditing ? "border-2 border-black" : ""
                      }`}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                {isEditing && (
                  <div className="mt-4">
                    <button
                      onClick={handleChangePassword}
                      className="px-5 py-2 bg-blue-600 text-white"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          <div>
            <button
              onClick={() => {
                setDeleteAccountPopUp(true);
              }}
              className="px-5 py-2 bg-red-600 mt-6 text-white"
            >
              Delete Account
            </button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

function Settings() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [selectedFun, setSelectedFun] = useState("Account");
  const [DeleteAccountPopUp, setDeleteAccountPopUp] = useState(false);
  const [askPassWord, setAskPassWord] = useState(false);
  const [password, setPassWord] = useState("");
  const [GoogleAuth, setGoogleAuth] = useState(true);
  const [passwordInvalid, setPasswordInvalid] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigateProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      const googleAuth = Cookies.get("passwordisthere");
      if (googleAuth) {
        setGoogleAuth(false);
      }

      if (token) {
        try {
          const response = await axios.post(
            "https://s50-musthafa-capstone-cosmos.onrender.com/users/tokenvalidate",
            { token }
          );
          const { user } = response.data;
          if (user) {
            getUserdata(user._id);
          }
        } catch (error) {
          Cookies.remove("token");
          console.error("Error in post request", error.response.data.error);
        }
      } else {
        console.log("Token is not there");
      }
    };

    fetchData();
  }, []);

  const getUserdata = async (id) => {
    try {
      const response = await axios.get(
        `https://s50-musthafa-capstone-cosmos.onrender.com/users/getAsingleUser/${id}`
      );
      setUserData(response.data);
    } catch (err) {
      console.log("Error while getting the profile data", err);
    }
  };

  const DeleteAccount = async () => {
    try {
      const response = await axios.delete(
        `https://s50-musthafa-capstone-cosmos.onrender.com/users/deleteMyAccount/${userData._id}`
      );
      Cookies.remove("token");
      Cookies.remove("passwordisthere");
      navigate("/HomePage");
      setDeleteAccountPopUp(false);
    } catch (err) {
      console.log("Error while deleting the Account", err);
    }
  };

  const handleCancel = () => {
    setAskPassWord(false);
    setDeleteAccountPopUp(false);
  };

  const AskPassword = () => {
    if (GoogleAuth) {
      setAskPassWord(true);
    } else {
      DeleteAccount();
    }
  };

  const CheckPassWord = async () => {
    try {
      const response = await axios.post(
        `https://s50-musthafa-capstone-cosmos.onrender.com/users/checkPassword/${userData.user_id}`,
        { password }
      );
      if (response.data.message == "Password is correct") {
        DeleteAccount();
      } else {
        setPasswordInvalid(response.data.message);
      }
    } catch (err) {
      console.log("Error while checking Password", err);
    }
  };

  return (
    <>
      {DeleteAccountPopUp && (
        <div>
          <div className="overlay"></div>
          <div className="border logout-popup p-10 rounded flex flex-col justify-around text-center">
            <h2 className="text-xl mb-3 font-poppins">
              Are you sure you want to delete this account ?
            </h2>
            {passwordInvalid.length != 0 && (
              <div className="bg-red-500 rounded-sm py-2 px-3 mb-4 text-white w-full">
                {passwordInvalid}
              </div>
            )}
            {askPassWord ? (
              <div>
                <input
                  type="text"
                  className="bg-white px-3 py-2 w-full outline-none border font-light"
                  placeholder="Please enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassWord(e.target.value);
                  }}
                />
                <div className="mt-4 flex gap-4 justify-center">
                  <button
                    className="px-4 py-2 bg-black text-white"
                    onClick={() => CheckPassWord()}
                  >
                    Submit
                  </button>
                  <button className="px-4 py-2 border" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-evenly">
                <button
                  className="px-4 py-2 bg-black text-white"
                  onClick={() => AskPassword()}
                >
                  Delete
                </button>
                <button className="px-4 py-2 border" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="h-screen w-screen px-10 py-10">
        <nav className="flex px-10 items-center bg-gray-200 justify-between py-3">
          <h2 className="text-4xl font font-bold tracking-widest">SETTINGS</h2>
          <div className="flex items-center gap-20">
            <div className="flex items-center gap-3 justify-between cursor-pointer bg-gray-300 px-3 py-2 rounded-xl">
              <div onClick={navigateProfile} className="rounded">
                <img
                  className="rounded-lg h-8"
                  src={userData?.profilePic}
                  alt="Profile"
                />
              </div>
              <div className="font-poppins text-sm">{userData?.name}</div>
            </div>
          </div>
        </nav>
        <div className="flex h-[70vh]">
          <div className="flex flex-col gap-2 w-64 px-2 border-r-2 mt-10">
            <button
              onClick={() => {
                navigate("/HomePage");
              }}
              className="w-full py-2 px-3 border rounded-sm hover:bg-gray-200 flex gap-2 items-center cursor-pointer"
            >
              <img className="w-4" src={HomeIcon} alt="Home" />
              <h2>HOME</h2>
            </button>
            <button
              onClick={() => setSelectedFun("Account")}
              className="w-full py-2 px-3 border rounded-sm hover:bg-gray-200 flex gap-2 items-center cursor-pointer"
            >
              <img className="w-4" src={AccountIcon} alt="Account" />
              <h2>ACCOUNT</h2>
            </button>
            <button
              onClick={() => setSelectedFun("Help")}
              className="w-full py-2 px-3 border rounded-sm hover:bg-gray-200 flex gap-2 items-center cursor-pointer"
            >
              <img className="w-4" src={HelpIcon} alt="Help" />
              <h2>HELP</h2>
            </button>
          </div>
          <div className="w-full h-full mt-10">
            {selectedFun === "Account" && (
              <Account
                setDeleteAccountPopUp={setDeleteAccountPopUp}
                userData={userData}
                GoogleAuth={GoogleAuth}
              />
            )}
            {selectedFun === "Help" && <Help />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
