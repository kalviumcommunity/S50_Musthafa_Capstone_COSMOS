import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

function CommunityDetails() {
  const { id } = useParams();

  const [communityData, setCommunityData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const observer = useRef();

  const lastMemberRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const fetchCommunityData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/community/details/${id}?page=${page}`
      );
      setCommunityData((prevData) => {
        if (prevData) {
          return {
            ...response.data,
            members: [...prevData.members, ...response.data.members],
          };
        } else {
          return response.data;
        }
      });

      setHasMore(response.data.members.length > 0);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching community data:", error);
    }
  };

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

  useEffect(() => {
    fetchCommunityData();
    fetchData();
  }, [page]);

  const goBack = () => {
    navigate(`/communitychat/${id}`);
  };

  return (
    <div className="bg-black text-white">
      <div className="relative h-72 mx-auto">
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          style={{
            backgroundImage: `url(${
              communityData?.communityprofile ||
              "https://via.placeholder.com/150"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="relative z-10 flex h-full items-end py-8">
          <h1 className="text-5xl ml-4 font-semibold text-white">
            {communityData?.name}
          </h1>
        </div>
      </div>
      <div className="px-10 py-5">
        <div className="">
          <h1 className=" text-2xl font-semibold">DESCRIPTION</h1>
          <p className="mt-2 text-lg">{communityData?.description}</p>
        </div>
        
        <h2 className="text-2xl font-semibold mt-3 mb-4">Members</h2>
        <ul>
          {communityData &&
            communityData.members.map((member, index) => {
              if (communityData.members.length === index + 1) {
                return (
                  <li
                    ref={lastMemberRef}
                    key={index}
                    className="mb-2 hover:border p-5 duration-100 cursor-pointer w-96"
                  >
                    <div className="flex items-center">
                      <img
                        className="w-11 h-11 rounded-full mr-4"
                        src="https://via.placeholder.com/100"
                        alt=""
                      />
                      <div>
                        <span className="text-base">{member.name}</span>
                        <p className="text-gray-100 line-clamp-1">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              } else {
                return (
                  <li
                    key={index}
                    className="mb-2 hover:border p-5 duration-100 cursor-pointer w-96"
                  >
                    <div className="flex items-center">
                      <img
                        className="w-11 h-11 rounded-full mr-4"
                        src="https://via.placeholder.com/100"
                        alt=""
                      />
                      <div>
                        <span className="text-base">{member.name}</span>
                        <p className="text-gray-100 line-clamp-1">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              }
            })}
        </ul>
        <div className="mt-10 mb-20">
          <button
            type="button"
            className="px-4 py-2 mr-4 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
            onClick={() => {
              console.log("Exiting community...");
            }}
          >
            Exit Community
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
            onClick={() => {
              console.log("Reporting community...");
            }}
          >
            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />{" "}
            Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommunityDetails;
