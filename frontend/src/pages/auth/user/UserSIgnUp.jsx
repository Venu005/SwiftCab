import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
export const UserSignUp = () => {
  const [passwordVisible, setPasswordVisble] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserdata] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisble(!passwordVisible);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserdata({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });

    // at lst once submission happens set email and password to null
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber-logo"
        />

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3 className="text-lg font-medium mb-4">What is your name</h3>
          <div className="flex gap-x-3 mb-4 ">
            <input
              value={firstName}
              onChange={handleFirstNameChange}
              type="text"
              placeholder="First Name"
              required
              className="bg-[#eeee] w-1/2 px-4 py-2 border  text-lg rounded-lg mb-3 "
            />
            <input
              value={lastName}
              onChange={handleLastNameChange}
              type="text"
              placeholder="Last Name"
              className="bg-[#eeee] w-1/2 px-4 py-2 border  text-lg rounded-lg mb-3 "
            />
          </div>
          <h3 className="text-lg font-medium mb-3">Enter your email</h3>
          <input
            value={email}
            onChange={handleEmailChange}
            type="email"
            placeholder="xyz@email.com"
            required
            className="bg-[#eeee]  px-4 py-2 border w-full text-lg rounded-lg mb-3 "
          />

          <h3 className="text-lg font-medium mb-3 mt-4">Enter your password</h3>
          <div className="relative ">
            <input
              value={password}
              onChange={handlePasswordChange}
              type={passwordVisible ? "text" : "password"}
              placeholder="password"
              required
              className="bg-[#eeee]  rounded-lg px-4 py-2 border w-full text-lg "
              style={{ fontFamily: passwordVisible ? "monospace" : "initial" }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-black text-white flex items-center justify-center w-full py-3 rounded-lg mt-5 text-lg"
          >
            Continue
          </button>
          <div className="flex items-center justify-center gap-x-1 mt-5 text-sm text-slate-500 ">
            <p className="">Already have an account?</p>
            <Link to={"/login"} className="underline hover:text-blue-600">
              {" "}
              Sign in
            </Link>
          </div>
        </form>
      </div>
      <div>
        <Link
          to={"/captain-signup"}
          className="bg-green-500 text-white flex items-center justify-center w-full py-3 rounded-lg mt-5 text-lg gap-x-1"
        >
          Sign up as Captain
          <GiFullMotorcycleHelmet />
        </Link>
      </div>
    </div>
  );
};
