import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import axios from "axios";
import { UserDataContext } from "../../../context/UserContext";
export const UserLogin = () => {
  const [passwordVisible, setPasswordVisble] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserdata] = useState({});
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisble(!passwordVisible);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );
    if (res.status === 200) {
      const data = res.data.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
    // at lst once submission happens set email and password to null
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
            <p className="">Don&apos;t have an account?</p>
            <Link to={"/signup"} className="underline hover:text-blue-600">
              {" "}
              Sign up
            </Link>
          </div>
        </form>
      </div>
      <div>
        <Link
          to={"/captain-login"}
          className="bg-green-500 text-white flex items-center justify-center w-full py-3 rounded-lg mt-5 text-lg gap-x-1"
        >
          Sign in as Captain
          <GiFullMotorcycleHelmet />
        </Link>
      </div>
    </div>
  );
};
