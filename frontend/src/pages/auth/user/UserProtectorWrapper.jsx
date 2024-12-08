import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import axios from "axios";
const UserProtectorWrapper = ({ children }) => {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [token]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FiLoader className="animate-spin h-10 w-10 text-gray-800" />
      </div>
    );
  }

  return <>{children}</>;
};

export default UserProtectorWrapper;
