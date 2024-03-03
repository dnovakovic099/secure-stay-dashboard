/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Image from "next/image";
import Address from "./tabs/Address";
import Photos from "./tabs/Photos";
import Policies from "./tabs/Policies";
import GuideBook from "./tabs/Guidebook";
import Automated from "./tabs/Automated";
import Information from "./tabs/Information";
import CheckInandOut from "./tabs/Check-in-out";
import classNames from "classnames";
import { Switch } from "@headlessui/react";

export default function HotelDetail({ selectedItem }: any) {
  const [isToggle, setIsToggle] = useState(true);
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

  return (
    <div className="m-6 flex flex-col px-5 py-6 bg-white rounded-lg shadow-2xl">
      <div className="max-md:max-w-full">
        <div className="h-[600px] flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[39%] max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden relative flex-col grow pt-12 text-xs leading-4 rounded-lg min-h-[420px] max-md:mt-8 max-md:max-w-full">
              <Image
                src={selectedItem.images[0]?.url}
                alt="Hotel Image"
                layout="fill"
                objectFit="cover"
                className="object-cover w-full h-full rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 rounded-lg" />

              <div className="flex relative flex-col px-5 pt-12 pb-5 mt-20 rounded-none max-md:mt-10 max-md:max-w-full">
                <div className="justify-center self-start px-5 py-3 mt-32 font-medium whitespace-nowrap bg-white aspect-[2.4] backdrop-blur-[37.5px] rounded-[54px] text-neutral-800 max-md:mt-10">
                  Hotel
                </div>
                <div className="mt-5 text-2xl font-semibold tracking-tight leading-6 text-white max-md:mr-1">
                  {selectedItem?.name}
                </div>
                <div className="flex gap-1.5 justify-between mt-2 text-white max-md:mr-1">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac374b392419786f54af9d15d05d5ac889781783766d83b0ae896f178b57f192?"
                    className="self-start w-4 aspect-square"
                    alt="icon"
                  />
                  <div className="flex-auto font-normal text-[14px]">
                    {selectedItem?.address}
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-between mt-4 w-full text-sm">
                  <div className="flex-auto text-orange-200 underline">
                    Preview Boarding Pass
                  </div>
                  <div className="flex gap-1 justify-between px-2 py-1.5 font-medium text-white whitespace-nowrap rounded backdrop-blur-[37.5px] bg-white bg-opacity-20">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c29bd124945507d6ad6e519a7f6d82ece258df0449d2c7ff01d1e41955eb4c7d?"
                      className="w-3.5 aspect-square"
                      alt="icon"
                    />
                    <div className="my-auto">{selectedItem?.guests}</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={classNames(
                "w-full flex gap-5 justify-between self-start py-4 pr-3 pl-5 mt-2.5 mr-0 text-xs leading-5  rounded-lg border  border-solid max-md:flex-wrap max-md:max-w-full",
                isToggle
                  ? "bg-green-50 border-green-100"
                  : "bg-pink-50 border-rose-50"
              )}
            >
              <div
                className={classNames(
                  "text-xs",
                  isToggle ? "text-green-900" : "text-red-900"
                )}
              >
                This property is currently disabled and will not receive
                experiences guest boarding passes.
              </div>
              <div
                className={`flex items-center px-1 rounded-3xl h-7 ${
                  isToggle ? "bg-indigo-500" : "bg-gray-300"
                }`}
              >
                <Switch
                  checked={isToggle}
                  onChange={handleToggleChange}
                  className="relative inline-flex items-center justify-center w-10 h-4 cursor-pointer focus:outline-none"
                >
                  <span
                    className={`absolute left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                      isToggle
                        ? "translate-x-full bg-indigo-600"
                        : "translate-x-0 bg-gray-400"
                    }`}
                  />
                </Switch>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[61%] max-md:ml-0 max-md:w-full">
            <div className="flex justify-between self-start text-xs tracking-normal leading-4 text-center border-b border-solid border-b-slate-200">
              <div
                className={`inline-flex items-center px-3 py-2 text-xs font-medium focus:outline-none transition duration-300 cursor-pointer ${
                  activeButton === "listing"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 border-b-2 border-gray-300"
                }`}
                onClick={() => handleButtonClick("listing")}
                style={{ fontSize: "16px" }}
              >
                Listing Information
              </div>
              <div
                className={`inline-flex items-center px-3 py-2 text-xs font-medium focus:outline-none transition duration-300 cursor-pointer ${
                  activeButton === "automated"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 border-b-2 border-gray-300"
                }`}
                onClick={() => handleButtonClick("automated")}
                style={{ fontSize: "16px" }}
              >
                Automated Message
              </div>
            </div>
            {activeButton === "listing" && (
              <div className="flex flex-col max-md:mt-8 max-md:max-w-full">
                <div className="flex gap-2 justify-between items-center p-1 mt-6 text-xs tracking-normal leading-4 text-center rounded-lg bg-slate-50 text-zinc-500 max-md:flex-wrap max-md:max-w-full">
                  <div
                    className={classNames(
                      "self-stretch p-2 rounded-md cursor-pointer grow justify-center text-neutral-800 hover:bg-white hover:shadow-md transition duration-300",
                      activeTab === "information" &&
                        "bg-white shadow-md rounded-md"
                    )}
                    onClick={() => handleTabSwitch("information")}
                  >
                    General Information
                  </div>
                  <div
                    className={classNames(
                      "self-stretch p-2 rounded-md cursor-pointer grow justify-center text-neutral-800 hover:bg-white hover:shadow-md transition duration-300",
                      activeTab === "address" && "bg-white shadow-md rounded-md"
                    )}
                    onClick={() => handleTabSwitch("address")}
                  >
                    Address
                  </div>
                  <div
                    className={classNames(
                      "self-stretch p-2 rounded-md cursor-pointer grow justify-center text-neutral-800 hover:bg-white hover:shadow-md transition duration-300",
                      activeTab === "C&C" && "bg-white shadow-md rounded-md"
                    )}
                    onClick={() => handleTabSwitch("C&C")}
                  >
                    Check-in & Check-out
                  </div>
                  <div
                    className={classNames(
                      "self-stretch p-2 rounded-md cursor-pointer grow justify-center text-neutral-800 hover:bg-white hover:shadow-md transition duration-300",
                      activeTab === "guidebook" &&
                        "bg-white shadow-md rounded-md"
                    )}
                    onClick={() => handleTabSwitch("guidebook")}
                  >
                    Guidebook
                  </div>
                  {/* <div
                    className={classNames(
                      'self-stretch p-2 rounded-md cursor-pointer grow justify-center text-neutral-800 hover:bg-white hover:shadow-md transition duration-300',
                      activeTab === 'images' && 'bg-white shadow-md rounded-md',
                    )}
                    onClick={() => handleTabSwitch('images')}
                  >
                    Photos
                  </div> */}

                  <div
                    className={classNames(
                      "self-stretch p-2 rounded-md cursor-pointer grow justify-center text-neutral-800 hover:bg-white hover:shadow-md transition duration-300",
                      activeTab === "P&C" && "bg-white shadow-md rounded-md"
                    )}
                    onClick={() => handleTabSwitch("P&C")}
                  >
                    Policies & Custom Fields
                  </div>
                </div>
                {activeTab === "information" && (
                  <Information selectedItem={selectedItem} />
                )}
                {activeTab === "address" && (
                  <Address selectedItem={selectedItem} />
                )}
              </div>
            )}

            {activeButton === "automated" && <Automated isToggle={isToggle} />}
            {activeTab === "C&C" && (
              <CheckInandOut selectedItem={selectedItem} />
            )}
            {activeTab === "guidebook" && <GuideBook />}
            {/* {activeTab === 'images' && <Photos selectedItem={selectedItem} />} */}
            {activeTab === "P&C" && <Policies />}
          </div>
        </div>
      </div>
    </div>
  );
}
