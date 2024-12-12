import React from "react";
import { MdLocationPin } from "react-icons/md";

export const LocationSearchPanel = ({ setPanelOpen,setVehiclePanel }) => {
  const locations = [
    "Mumbai, Maharashtra",
    "Delhi, Delhi",
    "Bangalore, Karnataka",
    "Chennai, Tamil Nadu",
  ];
  return (
    <div>
      {locations.map((location, index) => (
        <div
          key={index}
          onClick={() => {
            setVehiclePanel(true);
            setPanelOpen(false);
          }}
          className="border-2 flex gap-4 items-center rounded-xl p-3 my-2 border-gray-100 active:border-black justify-start "
        >
          <h2 className="bg-[#eeee] h-8 flex items-center justify-center w-12 rounded-full">
            <MdLocationPin />
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};
