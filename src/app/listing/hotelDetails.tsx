import CommonTabs from "@/components/commonTabs";
import { MapPinIcon, UserIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Policies from "./tabs/policies";
import GenetalInfo from "./tabs/genetalInfo";
import Address from "./tabs/address";
import CheckInandOut from "./tabs/check-in-out";
import Device from "./tabs/device";
import GuideBook from "./tabs/guideBook";
import Picture from "./tabs/picture";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { id: 1, name: "General Information", href: "#", current: false },
  { id: 2, name: "Address", href: "#", current: false },
  { id: 3, name: "Check-in & Check-out", href: "#", current: false },
  { id: 4, name: "Guidebook", href: "#", current: false },
  { id: 5, name: "Policies & Custom fields", href: "#", current: false },
  { id: 6, name: "Pictures", href: "#", current: false },
  { id: 7, name: "Devices", href: "#", current: false },
];

export default function HotelDetail({ selectedItem }: any) {
  console.log(selectedItem, "selectedItem");
  const [enabled, setEnabled] = useState(true);
  const [initialTabValue, setInitialTabValue] = useState(tabs[0]);
  const [renderTabs, setRenderTabs] = useState(tabs.slice(0, 5));
  const [lastRenderedIndex, setLastRenderedIndex] = useState(4);
  const [isToggle, setIsToggle] = useState(false);
  const [iconPosition, setIconPosition] = useState("right");

  useEffect(() => {
  
  }, [ renderTabs]);
  useEffect(() => {
  }, [ initialTabValue]);

  function DynamicContentUi() {
    return (
      <>
        <div className="md:flex md:items-center md:justify-between py-2">
          <div className="min-w-0 flex-1">
            <div className="pt-1.5">
              <h1 className="text-2xl font-bold text-gray-900">
                {initialTabValue.name}
              </h1>
              <p className="text-sm font-medium text-gray-500">
                Description,wifi &more
              </p>
            </div>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              type="button"
              className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Publish
            </button>
          </div>
        </div>
        <div className="border border-b text-gray-600"></div>
      </>
    );
  }

  const handleItemClick = (item: any) => {
    console.log("Hotel-details", item);
    // Handle the selected item here in the parent component
  };

  const handleTabClick = (item: any) => {
    setInitialTabValue(item);
    console.log("Selected handleTabClick:", item);
    // Handle the selected item here in the parent component
  };

  const renderNextTabs = (item: any) => {
    const nextIndex = lastRenderedIndex + 5;
    const nextRenderTabs = tabs.slice(item, nextIndex + 1);
    setRenderTabs(nextRenderTabs);
    setLastRenderedIndex(nextIndex);
  };

  function toggleSwitch() {
    return (
      <div className="flex justify-between  w-[350px] h-auto ring-1 ring-inset ring-gray-300 rounded-md  ">
        <button
          type="button"
          onClick={() => setEnabled(!enabled)}
          className={classNames(
            enabled ? " bg-indigo-600 text-white" : "bg-white text-gray-600",

            "inline-flex items-center my-2 mx-2  rounded-md px-2 py-1  text-sm font-semibold  shadow-sm  "
          )}
        >
          Listing Information
        </button>
        <button
          type="button"
          onClick={() => setEnabled(!enabled)}
          className={classNames(
            !enabled ? " bg-indigo-600 text-white" : "bg-white text-gray-600",
            "inline-flex items-center my-2 mx-2  rounded-md  px-3 py-1 text-sm font-semibold  shadow-sm  "
          )}
        >
          Automatted Message
        </button>
      </div>
    );
  }
  const handleToggleChange = () => {
    setIsToggle(!isToggle); // Toggle the state
  };
  function boardPassToggle() {
    return (
      <div className="flex my-2 mr-1">
        <div className="text-xs text-red-500">
          This property is currently disabled & will not recive experiences &
          guest boaring pass
        </div>
        <Switch
          checked={isToggle}
          onChange={handleToggleChange}
          className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute h-full w-full rounded-md bg-white"
          />
          <span
            aria-hidden="true"
            className={classNames(
              isToggle ? "bg-indigo-600" : "bg-gray-200",
              "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
            )}
          />
          <span
            aria-hidden="true"
            className={classNames(
              isToggle ? "translate-x-5" : "translate-x-0",
              "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
            )}
          />
        </Switch>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-5 bg-white p-4 mt-4 h-[600px] overflow-y-auto">
        <div className="col-span-4 mb-8">
          <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
            <Image
              src={selectedItem?.imageUrl}
              alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
              className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              width={500}
              height={500}
            />

            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="font-semibold text-white">
                  <a href="#">
                    <span className="absolute inset-0" />
                    {selectedItem?.name}
                  </a>
                </h3>
                <div className="flex items-center">
                  <MapPinIcon
                    className="block h-4 w-4 text-white hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <p
                    aria-hidden="true"
                    className="mt-1 text-sm pl-2 text-white"
                  >
                    {selectedItem?.address}
                  </p>
                </div>
                <div className="mt-2 text-sm pl-2 text-white underline">
                  {" "}
                  preview Boarding Pass
                </div>
                <div className="flex items-center mt-2">
                  <UserIcon
                    className="block h-5 w-5 text-white hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <p
                    aria-hidden="true"
                    className="mt-1 text-sm pl-2 text-white"
                  >
                    4
                  </p>
                </div>
              </div>
            </div>
          </div>
          {boardPassToggle()}
        </div>

        <div className="col-span-8 ">
          <div className="p-4">
            {toggleSwitch()}
            {enabled ? (
              <div className="">
                {" "}
                <CommonTabs
                  tab={renderTabs}
                  onClick={handleTabClick}
                  iconClick={renderNextTabs}
                  iconPosition={iconPosition}
                />
                {DynamicContentUi()}
                {initialTabValue.id === 2 ? (
                  <Address />
                ) : initialTabValue.id === 3 ? (
                  <CheckInandOut />
                ) : initialTabValue.id === 4 ? (
                  <GuideBook />
                ) : initialTabValue.id === 5 ? (
                  <Policies />
                ) : initialTabValue.id === 6 ? (
                  <Picture />
                ) : initialTabValue.id === 7 ? (
                  <Device />
                ) : (
                  <GenetalInfo selectedItem={selectedItem} />
                )}
              </div>
            ) : (
              <p className="flex items-center w-full h-96">
                No automatted message...
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
