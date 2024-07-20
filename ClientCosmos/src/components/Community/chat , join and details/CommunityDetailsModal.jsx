import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import useUserData from "../../utils/UserData";

function CommunityDetailsModal({ isOpen, closeModal, communityID }) {
  useEffect(() => {
    if (isOpen) {
      document.getElementById("modal").showModal();
    } else {
      document.getElementById("modal").close();
    }
  }, [isOpen]);

  const [communityData, setCommunityData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { user } = useUserData();

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
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/community/details/${communityID}?page=${page}`
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

  useEffect(() => {
    fetchCommunityData();
  }, [page]);

  const goBack = () => {
    navigate(`/communities`);
  };

  const ExitCommunity = async () => {
    const userID = user._id;
    try {
      const response = await axios.post(`http://localhost:3000/community/exit`, {
        userId: userID,
        communityId: communityID,
      });
      console.log(response);
      window.location.reload()
      navigate(`/communities`);
    } catch (err) {
      console.log("Error while exiting the community", err);
    }
  };

  return (
    <dialog id="modal" className="modal">
      <div className="modal-box bg-white modalBox">
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </button>
        {communityData ? (
          <>
            <div className="grid justify-center">
              <div className="flex justify-center">
                <img
                  className="rounded-full w-24 h-24"
                  src={communityData.communityprofile}
                  alt=""
                />
              </div>
              <h2 className="text-2xl mt-2 font-semibold text-center">
                {communityData.name}
              </h2>
              <h2 className="text-xl mt-2 font-semibold text-center">
                {communityData.description}
              </h2>
            </div>
            <h2 className="pt-2 text-lg">Members</h2>
            <ul className=" overflow-auto h-64 mt-2 myPosts">
              {communityData.members.map((member, index) => {
                return (
                  <li
                    ref={lastMemberRef}
                    key={index}
                    className="py-2 duration-100 cursor-pointer w-96"
                  >
                    <div className="flex items-center">
                      <img
                        className="w-11 h-11 rounded-full mr-4"
                        src={member.profilePic}
                        alt=""
                      />
                      <div>
                        <span className="">{member.name}</span>
                        <p className="line-clamp-1">{member.bio}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <p>Loading community data...</p>
        )}
        <div className="mt-5">
          <button
            type="button"
            className="px-4 py-2 mr-4 text-sm tracking-wide text-white bg-red-500 rounded-sm hover:bg-red-600 duration-300"
            onClick={ExitCommunity}
          >
            Exit Community
          </button>
          {/* <button
            type="button"
            className="px-4 py-2 text-sm tracking-wide text-white bg-yellow-500 rounded-sm duration-300 hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
            onClick={() => {
              console.log("Reporting community...");
            }}
          >
            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
            Report
          </button> */}
        </div>
      </div>
    </dialog>
  );
}

export default CommunityDetailsModal;
