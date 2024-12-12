import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
export const LookingForDriver = () => {
  return (
    <div>
      {/* <RiArrowDownWideLine
        onClick={() => {
          setConfirmRidePanel(false);
        }}
        className="text-3xl p-1 text-center w-[93%] mb-5 absolute top-0"
      /> */}

      <h3 className="text-2xl font-semibold mb-2">
        {" "}
        Waiting for captains to accept{" "}
      </h3>
      <div className=" flex gap-2 justify-between flex-col items-center">
        <img
          src={"https://mobile-content.uber.com/launch-experience/ride.png"}
          alt="cab"
          className="h-28"
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2">
            <FaLocationDot className="text-lg" />
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">location in country</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <FaLocationDot className="text-lg" />
            <div>
              <h3 className="text-lg font-medium">Drop</h3>
              <p className="text-sm -mt-1 text-gray-600">location in country</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
            <MdOutlineAttachMoney className="text-lg" />
            <div>
              <h3 className="text-lg font-medium">Cash</h3>
              <p className="text-sm -mt-1 text-gray-600">$25</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

