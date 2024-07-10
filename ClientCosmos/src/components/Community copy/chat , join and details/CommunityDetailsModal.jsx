import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

function CommunityDetailsModal({ isOpen, closeModal, communityID }) {
  useEffect(() => {
    if (isOpen) {
      document.getElementById("modal").showModal();
    } else {
      document.getElementById("modal").close();
    }
  }, [isOpen]);

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
    navigate(`/communities`);
  };

  const ExitCommunity = () => {
    const userID = userData._id;

    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willExit) => {
      if (willExit) {
        axios
          .post(`http://localhost:3000/community/exit`, {
            userId: userID,
            communityId: communityID,
          })
          .then((res) => {
            console.log(res.data);
            navigate("/communities");
            swal("Poof! You've successfully exited!", {
              icon: "success",
            });
          })
          .catch((err) => {
            console.log("Error while exiting the community", err);
            swal("Error while exiting the community", {
              icon: "error",
            });
          });
      }
    });
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
                  className="rounded-full w-44 h-44"
                  src={communityData.communityprofile}
                  alt=""
                />
              </div>
              <h2 className="text-3xl mt-2 font-semibold text-center">
                {communityData.name}
              </h2>
              <h2 className="text-xl mt-2 font-semibold text-center">
                {communityData.description}
              </h2>
            </div>
            <h2 className="pl-5 pt-2 text-lg">Members</h2>
            <ul className=" overflow-auto h-64">
              {communityData.members.map((member, index) => {
                return (
                  <li
                    ref={lastMemberRef}
                    key={index}
                    className="p-5 duration-100 cursor-pointer w-96"
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
            className="px-4 py-2 mr-4 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
            onClick={ExitCommunity}
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
            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
            Report
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default CommunityDetailsModal;