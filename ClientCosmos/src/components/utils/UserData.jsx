import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useUserData = () => {
  const [user, setUser] = useState(null);
  const [valid, setValid] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserdata = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/getAsingleUser/${id}`
      );
      setUserData(response.data);
    } catch (err) {
      console.log("Error while getting the profile data", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(Cookies.get("token"));
      try {
        const response = await axios.post(
          "https://s50-musthafa-capstone-cosmos.onrender.com/users/tokenvalidate",
          {},
          { withCredentials: true }
        );
        console.log(response.data);
        const { user, valid } = response.data;
        setUser(user);
        if (user) {
          getUserdata(user._id);
        }
        setValid(valid);
      } catch (error) {
        Cookies.remove("token");
        Cookies.remove("passwordisthere");
        console.error("Error in post request", error.response.data);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { user, valid, userData, loading, error, setLoading, setUserData };
};

export default useUserData;
