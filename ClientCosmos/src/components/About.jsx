import { motion } from "framer-motion";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Rating } from "primereact/rating";
import { formatDistanceToNow } from "date-fns";
import { useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";

function About() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [userData, setUserData] = useState(null);
  const { register, handleSubmit } = useForm();
  const [reviewUpdation, setreviewUpdation] = useState(false);

  const onSubmit = async (data) => {
    setreviewUpdation(true);
    const review = {
      profilePic: userData.profilePic,
      name: userData.name,
      comment: data.review,
    };

    try {
      const response = await axios.post(
        "https://s50-musthafa-capstone-cosmos.onrender.com/review/newreview",
        { review }
      );
      if (response.data && response.data._id) {
        setreviewUpdation(false);
        setReviews((prevReviews) => {
          const MAX_REVIEWS = 4;
          const updatedReviews =
            prevReviews.length >= MAX_REVIEWS
              ? prevReviews.slice(1)
              : prevReviews;
          return [...updatedReviews, response.data];
        });
      } else {
        console.error("Error: Expected review data from the API");
      }
    } catch (error) {
      alert("Error adding review");
    }
  };

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

  const ProfileClick = (e) => {
    switch (e) {
      case "profile":
        navigate("/profile");
        break;
      case "communities":
        navigate("/communities");
        break;
      case "userPosts":
        navigate("/userPosts");
        break;
      case "news":
        navigate("/news");
        break;
      case "settings":
        navigate("/settings");
        break;
      case "logout":
        LogOut();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "https://s50-musthafa-capstone-cosmos.onrender.com/review/randomreviews"
        );
        if (Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          console.error("Error: Expected an array from the API");
        }
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };

    const fetchData = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.post(
            "https://s50-musthafa-capstone-cosmos.onrender.com/users/tokenvalidate",
            { token }
          );
          const { user } = response.data;
          if (user) {
            setUserData(user);
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
    fetchReviews();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div className="bg-gradient-to-r text-lg px-10 pt-10 from-black via-gray-900 to-black text-white min-h-screen">
      <nav className="flex px-10 items-center justify-between py-3 text-white bg-gray-900 shadow-2xl">
        <div className="w-full">
          <ul className="flex gap-5">
            <li
              className="text-lg font-poppins cursor-pointer hover:scale-105 duration-300 px-5"
              onClick={() => {
                navigate("/HomePage")
              }}
            >
              HOME
            </li>
            <li
              className="text-lg font-poppins cursor-pointer hover:scale-105 duration-300 px-5"
              onClick={() => ProfileClick("news")}
            >
              NEWS
            </li>
            <li
              className="text-lg font-poppins cursor-pointer hover:scale-105 duration-300 px-5"
              onClick={() => ProfileClick("userPosts")}
            >
              POSTS
            </li>
            <li
              className="text-lg font-poppins cursor-pointer hover:scale-105 duration-300 px-5"
              onClick={() => ProfileClick("communities")}
            >
              COMMUNITIES
            </li>
          </ul>
        </div>
        <div className="flex gap-10">
          <div
            onClick={() => ProfileClick("profile")}
            className="flex items-center gap-3 justify-between cursor-pointer border px-3 py-2 rounded-xl"
          >
            <div className="rounded">
              <img className="rounded-lg w-12 h-8" src={userData?.profilePic} />
            </div>
            <div className="font-poppins text-sm">{userData?.name}</div>
          </div>
        </div>
      </nav>
      <div className="px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 tracking-widest text-center">
          ABOUT US
        </h1>
        <div className="flex justify-center">
          <p className="mb-8 font-light text-center w-4/5">
            Welcome to our celestial haven, where the wonders of the cosmos
            converge! Founded by Muhammed Musthafa, a passionate enthusiast of
            the universe's mysteries, this website is a labor of love dedicated
            to all things astronomical. Whether you're an avid stargazer, a
            seasoned astronomer, or someone who simply marvels at the night sky,
            our platform offers a wealth of information and resources to fuel
            your cosmic curiosity.
            <br />
            <br />
            At the heart of our mission is the desire to make the vast and often
            complex field of astronomy accessible to everyone. We believe that
            the beauty and grandeur of the universe should be shared and
            celebrated, inspiring awe and wonder in people of all ages and
            backgrounds. Our content spans a wide range of topics, from the
            latest discoveries in space science to detailed explorations of
            celestial objects like black holes, galaxies, and star systems.
          </p>
        </div>

        <h2 className="text-4xl font-bold mb-4 tracking-wider text-center">
          OUR AIM
        </h2>
        <div className="flex justify-center">
          <p className="mb-8 font-light w-4/5 text-center">
            We are committed to providing high-quality, scientifically accurate,
            and engaging content. Our articles are meticulously researched and
            written to ensure that you receive the most up-to-date and reliable
            information. In addition to written content, we also offer
            multimedia resources, including stunning images, educational videos,
            and interactive features that bring the cosmos to life.
          </p>
        </div>

        <h2 className="text-4xl font-bold mb-4 tracking-wider text-center">
          WHAT WE OFFER
        </h2>
        <div className="flex justify-center">
          <p className="mb-8 font-light w-4/5 text-center">
            Our community is at the core of what we do. We encourage our
            visitors to join in the conversation, share their own astronomical
            experiences, and learn from one another. Whether you're looking to
            deepen your knowledge, find answers to your burning questions, or
            simply enjoy the beauty of the universe, you'll find a welcoming and
            supportive environment here.
            <br />
            <br />
            Explore our comprehensive database of astronomical phenomena, stay
            updated with the latest space missions and discoveries, and immerse
            yourself in the wonder of the cosmos. Together, let's embark on a
            journey through the stars, uncovering the secrets of the universe
            one discovery at a time.
          </p>
        </div>

        <h2 className="text-4xl text-center w-full font-bold mb-4 tracking-wider">
          REVIEWS
        </h2>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="border px-4 py-2 mr-10 rounded"
          >
            Add Review
          </button>
        </div>

        <div className="flex justify-center">
          <div className="w-full">
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box w-full bg-white text-black rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-2xl tracking-wider">
                    ADD YOUR REVIEW
                  </h3>
                  <div className="modal-action mt-0">
                    <form method="dialog">
                      <button className="w-fit h-fit">✕</button>
                    </form>
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <input
                    {...register("review")}
                    className="bg-gray-200 pl-3 font-light rounded-md mb-5 border outline-none w-full h-10"
                    type="text"
                    placeholder="Type here.."
                  />
                  <button
                    type="submit"
                    className="bg-black w-full h-10 rounded-md text-white flex justify-center items-center"
                  >
                    {reviewUpdation ? (
                      <PulseLoader color="#ffffff" size={11} />
                    ) : (
                      <h2 className="font-semibold tracking-wider">
                        ADD REVIEW
                      </h2>
                    )}
                  </button>
                </form>
              </div>
            </dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-10 gap-6 mt-8">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="p-5 border h-full rounded-lg bg-transparent backdrop-blur-sm text-white"
              >
                <div className="flex gap-2 items-center mb-4">
                  <img
                    src={review.profilePic}
                    alt={`${review.name}'s profile`}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-bold">{review.name}</p>
                    {/* <Rating
                      value={review.rating}
                      readOnly
                      stars={5}
                      cancel={false}
                    /> */}
                  </div>
                </div>
                <p className="mb-4">{review.comment}</p>
                <div className=" flex items-end">
                  <p className="text-sm text-gray-400">
                    {formatDistanceToNow(new Date(review.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="w-[97vw]">
              <p className="text-white font-light italic text-center">
                No reviews yet. Be the first to add a review!
              </p>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-black text-white px-20 py-8">
        <div className=" grid grid-cols-2 w-full">
          <div className=" md:mb-0">
            <h3 className="text-lg font-bold">Follow</h3>
            <div className="mt-4">
              <h1 className="text-lg">Visit Us</h1>
              <div className="font-light">
                <p>
                  30 Lamb's Conduit Street
                  <br />
                  Bloomsbury, London
                  <br />
                  WC1N 3LE
                </p>
                <p>
                  <a
                    href="mailto:musthafacp0007@gmail.com"
                    className="underline"
                  >
                    musthafacp0007@gmail.com
                  </a>
                </p>
                <p>+91 90 3797 2149</p>
              </div>
            </div>
          </div>
          <div className="">
            <h3 className="text-lg mb-2 font-bold">Journal</h3>
            <p className="font-light">
              Join us on this celestial journey as we embark on a quest to
              unravel the mysteries of the cosmos together. Welcome aboard!
            </p>

            <div className="mt-2">
              <p className="text-sm">
                &copy; 2024 40 Musthafa cp. Powered by NASA
              </p>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

export default About;
