import { useState } from "react";
import Image from "next/image";

import Address from "./tabs/Address";
import Policies from "./tabs/Policies";
import GuideBook from "./tabs/Guidebook";
import Automated from "./tabs/Automated";
import Information from "./tabs/Information";
import CheckInandOut from "./tabs/Check-in-out";

import classNames from "classnames";
import { Switch } from "@headlessui/react";
import { MapPinIcon, UserIcon } from "@heroicons/react/20/solid";

export default function HotelDetail({ selectedItem }: any) {
  const [isToggle, setIsToggle] = useState(false);
  const [activeButton, setActiveButton] = useState<String>("listing");
  const [activeTab, setActiveTab] = useState<String | Boolean>("information");

  const handleButtonClick = (buttonName: string) => {
    if (activeButton !== buttonName) {
      setActiveButton(buttonName);
      setActiveTab(buttonName === "listing" ? "information" : "automated");
    }
  };

  const handleTabSwitch = (tabName: string) => {
    if (activeTab !== tabName) {
      setActiveTab(tabName);
    }
  };

  const handleToggleChange = () => {
    setIsToggle(!isToggle);
  };
  // <div className="w-full mt-2 m-6 flex gap-8 p-4 rounded-md bg-white shadow-lg relative">

  return (
    <div className="m-6 flex gap-8 p-4 rounded-md bg-white shadow-lg relative">
      <div className="flex flex-col gap-4">
        <div className="relative rounded-lg overflow-hidden h-[55vh] w-[26vw]">
          <div className="group aspect-w-2 aspect-h-1 overflow-hidden">
            <Image
              src={selectedItem.images[0]?.url}
              alt="Hotel Image"
              layout="fill"
              objectFit="cover"
              className="object-cover transition duration-300 ease-in-out transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 rounded-lg" />
          </div>

          <div className="absolute bottom-0 left-0 p-6 text-white bg-transparent w-full">
            <button className="p-2 px-6 text-sm bg-white text-black rounded-full shadow-md">
              Hotel
            </button>
            <h3 className="font-semibold my-2 text-2xl text-white">
              {selectedItem?.name}
            </h3>
            <div className="flex items-center text-white">
              <MapPinIcon className="block h-4 w-4 text-white hover:text-gray-500" />
              <p className="mt-1 ml-2 text-sm">{selectedItem?.address}</p>
            </div>
            <div className="flex justify-between items-center mt-2 text-white">
              <div className="text-sm underline cursor-pointer text-orange-300">
                Preview Boarding Pass
              </div>
              <div className="flex items-center p-2 rounded-lg">
                <UserIcon className="block h-5 w-5 text-white hover:text-gray-500" />
                <p className="mt-1 text-sm pl-2">{selectedItem.guests}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={classNames(
            "flex items-center justify-between p-4 gap-5 rounded-md",
            isToggle ? "bg-green-50" : "bg-red-50"
          )}
        >
          <p
            className={classNames(
              "text-sm",
              isToggle ? "text-green-900" : "text-red-900"
            )}
          >
            This property is currently disabled and will not receive experiences
            & guest boarding pass.
          </p>
          <div
            className={`flex items-center p-1 rounded-full ${
              isToggle ? "bg-indigo-500" : "bg-gray-300"
            }`}
          >
            <Switch
              checked={isToggle}
              onChange={handleToggleChange}
              className="relative inline-flex items-center justify-center w-8 h-4 cursor-pointer focus:outline-none"
            >
              <span
                className={`absolute left-0 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                  isToggle
                    ? "translate-x-full bg-indigo-600"
                    : "translate-x-0 bg-gray-400"
                }`}
              />
            </Switch>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="inline-block">
          <button
            type="button"
            onClick={() => handleButtonClick("listing")}
            className={`inline-flex items-center px-3 py-2 text-base font-medium focus:outline-none transition duration-300 ${
              activeButton === "listing"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 border-b-2 border-gray-300"
            }`}
          >
            Listing Information
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick("automated")}
            className={`inline-flex items-center px-3 py-2 text-base font-medium focus:outline-none transition duration-300 ${
              activeButton === "automated"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 border-b-2 border-gray-300"
            }`}
          >
            Automated Message
          </button>
        </div>

        {activeButton === "listing" && (
          <div className="my-6">
            <div className="bg-slate-50 rounded-md p-1">
              <div className="flex justify-between">
                <button
                  id="1"
                  className={classNames(
                    "px-4 py-2 rounded-md cursor-pointer text-sm font-semibold text-gray-800 hover:bg-white hover:shadow-md transition duration-300",
                    activeTab === "information" && "bg-white shadow-md"
                  )}
                  onClick={() => handleTabSwitch("information")}
                >
                  General Information
                </button>
                <button
                  id="2"
                  className={classNames(
                    "px-4 py-2 rounded-md cursor-pointer text-sm font-semibold text-gray-800 hover:bg-white hover:shadow-md transition duration-300",
                    activeTab === "address" && "bg-white shadow-md"
                  )}
                  onClick={() => handleTabSwitch("address")}
                >
                  Address
                </button>
                <button
                  id="3"
                  className={classNames(
                    "px-4 py-2 rounded-md cursor-pointer text-sm font-semibold text-gray-800 hover:bg-white hover:shadow-md transition duration-300",
                    activeTab === "C&C" && "bg-white shadow-md"
                  )}
                  onClick={() => handleTabSwitch("C&C")}
                >
                  Check-in & Check-out
                </button>
                <button
                  id="4"
                  className={classNames(
                    "px-4 py-2 rounded-md cursor-pointer text-sm font-semibold text-gray-800 hover:bg-white hover:shadow-md transition duration-300",
                    activeTab === "guidebook" && "bg-white shadow-md"
                  )}
                  onClick={() => handleTabSwitch("guidebook")}
                >
                  Guidebook
                </button>
                <button
                  id="5"
                  className={classNames(
                    "px-4 py-2 rounded-md cursor-pointer text-sm font-semibold text-gray-800 hover:bg-white hover:shadow-md transition duration-300",
                    activeTab === "P&C" && "bg-white shadow-md "
                  )}
                  onClick={() => handleTabSwitch("P&C")}
                >
                  Policies & Custom Fields
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Render Automated content when activeButton is 'automated' */}
        {activeButton === "automated" && <Automated isToggle={isToggle} />}

        {/* Render content based on activeTab */}
        {activeTab === "information" && (
          <Information selectedItem={selectedItem} />
        )}
        {activeTab === "address" && <Address selectedItem={selectedItem} />}
        {activeTab === "C&C" && <CheckInandOut />}
        {activeTab === "guidebook" && <GuideBook />}
        {activeTab === "P&C" && <Policies />}
      </div>
    </div>
  );
}
