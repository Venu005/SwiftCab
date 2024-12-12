import React, { useRef, useState } from "react";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { RiArrowDownWideLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { LocationSearchPanel } from "../../components/LocationSearchPanel";
import carImage from "../../assets/car.png";
import { VehiclePanel } from "../../components/VehiclePanel";
import { ConfrimRide } from "../../components/ConfrimRide";
import { LookingForDriver } from "../../components/LookingForDriver";
import { WaitingForDriver } from "../../components/WaitingForDriver";
export const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const handlePickupChange = (e) => {
    setPickup(e.target.value);
  };
  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
  };
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 20,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: 0,
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        className="w-16 absolute left-5 top-5 "
      />
      <div className="h-screen w-screen">
        {/* change later */}
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full mt-5 ">
        <div className="h-[30%] p-6 relative bg-white">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="opacity-0 absolute top-6 right-6 text-2xl"
          >
            <RiArrowDownWideLine />
          </h5>

          <h4 className="text-2xl font-semibold mb-3"> Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="relative">
              <SlLocationPin className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500 text-xl" />
              <input
                onClick={() => setPanelOpen(true)}
                value={pickup}
                onChange={handlePickupChange}
                className="bg-[#eeee] rounded-xl text-base px-12 py-2 mb-5 w-[300px]"
                placeholder="Add a pickup location"
              />
            </div>
            <div className="relative">
              <MdOutlineAddLocationAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
              <input
                onClick={() => setPanelOpen(true)}
                value={destination}
                onChange={handleDestinationChange}
                className="bg-[#eeee] rounded-xl text-base pl-10 pr-4 py-2 w-[300px]"
                placeholder="Enter your destination"
              />
            </div>
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      {/** this is forn showig the charges for cabs */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-6 py-12"
      >
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-6 py-12"
      >
        <ConfrimRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-6 py-12"
      >
        <LookingForDriver />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-6 py-12"
      >
        <WaitingForDriver
          waitingForDriver={waitingForDriver}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};
