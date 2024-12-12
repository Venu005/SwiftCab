import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
export const VehiclePanel = ({ setVehiclePanel, setConfirmRidePanel }) => {
  return (
    <div>
      <RiArrowDownWideLine
        onClick={() => {
          setVehiclePanel(false);
          setConfirmRidePanel(false);
        }}
        className="text-3xl p-1 text-center w-[93%] mb-5 absolute top-0"
      />

      <h3 className="text-2xl font-semibold mb-2">Choose a vehicle</h3>
      <div
        onClick={() => {
          setConfirmRidePanel(true);
        }}
        className="flex border-2 rounded-xl mb-2 active:border-black w-full p-5 items-center justify-between"
      >
        <img
          src={"https://mobile-content.uber.com/launch-experience/ride.png"}
          alt="cab"
          className="h-20 "
        />
        <div className="w-1/2">
          <h4 className="font-medium text-lg flex gap-x-2">
            Uber Go{" "}
            <span>
              <FaUser />
            </span>
            4
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">Affordable rate</p>
        </div>
        <h2 className="text-2xl font-semibold mr-2">193 </h2>
      </div>

      <div
        onClick={() => {
          setConfirmRidePanel(true);
        }}
        className="flex border-2 rounded-xl mb-2  active:border-black w-full p-5 items-center justify-between"
      >
        <img
          src={
            "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          }
          alt="cab"
          className="h-14 "
        />
        <div className="w-1/2">
          <h4 className="font-medium text-lg flex gap-x-2">
            Uber Moto
            <span>
              <FaUser />
            </span>
            1
          </h4>
          <h5 className="font-medium text-sm">5 mins away</h5>
          <p className="font-normal text-xs text-gray-600">Cheapest</p>
        </div>
        <h2 className="text-2xl font-semibold mr-2">93 </h2>
      </div>

      <div
        onClick={() => {
          setConfirmRidePanel(true);
        }}
        className="flex border-2 rounded-xl mb-2  active:border-black w-full p-5 items-center justify-between"
      >
        <img
          src={
            "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          }
          alt="cab"
          className="h-14 "
        />
        <div className="w-1/2">
          <h4 className="font-medium text-lg flex gap-x-2">
            Uber Auto{" "}
            <span>
              <FaUser />
            </span>
            3
          </h4>
          <h5 className="font-medium text-sm">1 min away</h5>
          <p className="font-normal text-xs text-gray-600">Affordable rate</p>
        </div>
        <h2 className="text-2xl font-semibold mr-2">150</h2>
      </div>
    </div>
  );
};
