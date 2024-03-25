"use client";
import React, { useEffect, useState } from "react";
import ConnectedListings from "./connectedListings";
import { useRouter } from "next/navigation";
import { Battery100Icon, Battery50Icon } from "@heroicons/react/20/solid";
import { envConfig } from "@/utility/environment";
import axios from "axios";
import toast from "react-hot-toast";
import SifelyLockAccessCodes from "./sifelyLockAccessCodes";
import axiosInstance from "@/auth/axiosInstance";

interface DeviceInfo {
  lockName: string;
  lockAlias: string;
  modelNum: string;
  electricQuantity: number;
  noKeyPwd: number;
  lockMac: string;
  openDirection: number;
  accessToken: string;
}
const deviceInfoObj = {
  lockName: "",
  lockAlias: "",
  modelNum: "",
  electricQuantity: 0,
  noKeyPwd: 0,
  lockMac: "",
  openDirection: 0,
  accessToken: "",
};

const SifelyLockInfo = ({
  lockId,
  listings,
  connectedListings,
  handleEditClick,
  filteredListings,
  selection,
  handleChange,
  selectedListing,
  saveDeviceLockInfo,
}: any) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(deviceInfoObj);
  const [activeButton, setActiveButton] = useState("Device Details");
  const [activeTab, setActiveTab] = useState("Device Details");
  const [passCodes, setPassCodes] = useState([]);

  const getDeviceInfo = async () => {
    try {
      const apiUrl = `${envConfig.backendUrl}/device/sifely/lockinfo/${lockId}`;
      const result = await axiosInstance.get(apiUrl);

      if (result.status == 200 && result.data?.success) {
        setDeviceInfo(result.data?.data);
      }
    } catch (error) {
      toast.error("Could not fetch lock info");
    }
  };

  const fetchPassCodes = async () => {
    try {
      const apiUrl = `${envConfig.backendUrl}/device/sifely/getpasscodes?lockId=${lockId}&accessToken=${deviceInfo?.accessToken}`;
      const result = await axiosInstance.get(apiUrl);
      if (result.status == 200 && result.data?.success) {
        setPassCodes(result.data?.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleButtonClick = (buttonName: string) => {
    if (activeButton !== buttonName) {
      setActiveButton(buttonName);
      setActiveTab(
        buttonName === "Device Details"
          ? "Device Details"
          : "Connected Listings"
      );
    }
  };

  useEffect(() => {
    fetchPassCodes();
  }, [deviceInfo]);

  useEffect(() => {
    getDeviceInfo();
  }, []);

  const router = useRouter();

  return (
    <div className="bg-white">
      <div className="flex justify-between p-4 text-center">
        <div className="flex justify-between text-xs tracking-normal leading-4 text-center border-b border-solid border-b-slate-200 mt-auto">
          <div
            className={`inline-flex items-center px-3 py-2 text-xs font-medium focus:outline-none transition duration-300 cursor-pointer ${
              activeButton === "Device Details"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 border-b-2 border-gray-300"
            }`}
            onClick={() => handleButtonClick("Device Details")}
            style={{ fontSize: "20px" }}
          >
            Device Details
          </div>
          <div
            className={`inline-flex items-center px-3 py-2 text-xs font-medium focus:outline-none transition duration-300 cursor-pointer ${
              activeButton === "Connected Listings"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 border-b-2 border-gray-300"
            }`}
            onClick={() => handleButtonClick("Connected Listings")}
            style={{ fontSize: "20px" }}
          >
            Connected Listings
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/locks")}
            className="flexitems-center text-sm px-5 py-2 h-[40px] text-white rounded-md focus:outline-none transition duration-300 ease-in-out bg-red-700"
          >
            Cancel
          </button>
          <button
            onClick={saveDeviceLockInfo}
            className="flex items-center px-5 py-2 h-[40px] text-white rounded-md focus:outline-none transition duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-purple-900 hover:to-purple-800 focus:to-purple-800"
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex h-[636px] overflow-y-auto scrollbar-hide text-black ml-10 mr-10">
        {activeTab === "Device Details" && (
          <div className="px-2 w-full">
            <div className="h-14 flex items-center justify-center relative mx-4">
              <span className="text-gray-600 text-sm leading-7">Device</span>
            </div>
            <div className="flex items-center bg-gray-100  gap-4 mt-4 p-4 mx-5 px-3 rounded-md">
              <div className="flex items-center ">
                <div className="w-16 h-16 overflow-hidden rounded-full mr-2">
                  <img
                    src="https://www.schlage.com/content/dam/sch-us/homepage-refresh/smart-lock.png"
                    alt=""
                    className="object-scale-down w-full h-full rounded-full"
                  />
                </div>
              </div>
              <div className="w-8/1">
                <div className="flex gap-1 items-center">
                  <p className="text-xl font-semibold text-gray-800 uppercase">
                    {deviceInfo?.lockAlias}
                  </p>
                </div>
                <div className="flex flex-col mt-1 text-gray-500 gap-1">
                  <div className="flex items-center gap-1">
                    <small>Power: </small>
                    {deviceInfo.electricQuantity > 80 ? (
                      <Battery100Icon color="green" width={16} height={16} />
                    ) : (
                      <Battery50Icon color="green" width={16} height={16} />
                    )}
                    <small className="text-green-600">{`${deviceInfo?.electricQuantity}%`}</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white w-[92%] mx-auto mt-2 mb-3">
              <hr className="border-t border-gray-300 my-3" />
              <div className="flex items-center ml-4 mt-3">
                <p className="text-xs text-gray-500">Mac Address:</p>
                <p className="text-sm text-black font-semibold ml-2">
                  {deviceInfo.lockMac}
                </p>
              </div>
              <div className="flex items-center ml-4 mt-3">
                <p className="text-xs text-gray-500">Open Direction:</p>
                <p className="text-sm text-black font-semibold ml-2">
                  {deviceInfo.openDirection === 1
                    ? "Left Open"
                    : deviceInfo.openDirection === 2
                    ? "Right Open"
                    : "Unknown"}
                </p>
              </div>
            </div>

            <SifelyLockAccessCodes
              fetchPassCodes={fetchPassCodes}
              passCodes={passCodes}
              deviceId={lockId}
              accessToken={deviceInfo.accessToken}
            />
          </div>
        )}
        {activeTab === "Connected Listings" && (
          <div className="w-full mt-8">
            <ConnectedListings
              lockType="Sifely"
              lockId={lockId}
              listings={listings}
              connectedListings={connectedListings}
              handleEditClick={handleEditClick}
              filteredListings={filteredListings}
              selection={selection}
              handleChange={handleChange}
              selectedListing={selectedListing}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SifelyLockInfo;
