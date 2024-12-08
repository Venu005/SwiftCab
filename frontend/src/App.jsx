import React from "react";
import { Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { UserLogin } from "./pages/auth/user/UserLogin";
import { UserSignUp } from "./pages/auth/user/UserSIgnUp";
import { CaptainLogin } from "./pages/auth/captain/CaptainLogin";
import { CaptainSignUp } from "./pages/auth/captain/CaptainSignUp";
import { Home } from "./pages/functionality/Home";
import UserProtectorWrapper from "./pages/auth/user/UserProtectorWrapper";
import UserLogOut from "./pages/auth/user/UserLogOut";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route
          path="/home"
          element={
            <UserProtectorWrapper>
              <Home />
            </UserProtectorWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectorWrapper>
              <UserLogOut />
            </UserProtectorWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
