import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { UserLogin } from "./pages/auth/user/UserLogin";
import { UserSignUp } from "./pages/auth/user/UserSIgnUp";
import { CaptainLogin } from "./pages/auth/captain/CaptainLogin";
import { CaptainSignUp } from "./pages/auth/captain/CaptainSignUp";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
      </Routes>
    </div>
  );
};

export default App;
