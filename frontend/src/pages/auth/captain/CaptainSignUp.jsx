import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiUserHeartLine } from "react-icons/ri";
export const CaptainSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordVisible, setPasswordVisble] = useState(false);
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const togglePasswordVisibility = () => {
    setPasswordVisble(!passwordVisible);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
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
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-4">
            What&apos;s our Captain&apos;s name
          </h3>
          <div className="flex gap-4 mb-7">
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

          <h3 className="text-lg font-medium mb-4">
            What&apos;s our Captain&apos;s email
          </h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeee]  rounded-lg px-4 py-2 border w-full text-lg"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-4">Enter Password</h3>

          <div className="relative mb-3">
            <input
              className="bg-[#eeee]  rounded-lg px-4 py-2 border w-full text-lg"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type="password"
              placeholder="password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <h3 className="text-lg font-medium mb-4">Vehicle Information</h3>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeee] w-1/2 px-4 py-2 border  text-lg rounded-lg mb-3"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
            />
            <input
              required
              className="bg-[#eeee] w-1/2 px-4 py-2 border  text-lg rounded-lg mb-3"
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeee] w-1/2 px-4 py-2 border  text-lg rounded-lg mb-3"
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
            />
            <select
              required
              className="bg-[#eeee] w-1/2 px-4 py-2 border  text-lg rounded-lg mb-3"
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button className="bg-black text-white flex items-center justify-center w-full py-3 rounded-lg mt-5 text-lg">
            Create Captain Account
          </button>
        </form>
        <div className="flex items-center justify-center gap-x-1 mt-5 text-sm text-slate-500 ">
          <p className="">Already have an account?</p>
          <Link to={"/captain-login"} className="underline hover:text-blue-600">
            {" "}
            Sign in
          </Link>
        </div>
      </div>
      <div>
        <Link
          to={"/signup"}
          className="bg-emerald-500 text-white flex items-center justify-center w-full py-3 rounded-lg mt-5 text-lg gap-x-1"
        >
          Sign up as User
          <RiUserHeartLine className=" font-extrabold" />
        </Link>
      </div>
    </div>
  );
};
