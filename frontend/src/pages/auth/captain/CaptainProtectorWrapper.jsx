import React, { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../../../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
const CaptainProtectorWrapper = ({ children }) => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          setCaptain(data.captain);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FiLoader className="animate-spin h-10 w-10 text-gray-800" />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default CaptainProtectorWrapper;
