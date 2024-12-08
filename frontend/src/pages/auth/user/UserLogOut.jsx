import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserLogOut = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    });

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800">YOU ARE LOGGED OUT</h1>
    </div>
  );
};

export default UserLogOut;
