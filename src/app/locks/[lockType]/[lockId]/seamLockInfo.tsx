"use client";
import { envConfig } from "@/utility/environment";
import { DeviceDetails, SeamProvider } from "@seamapi/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConnectedListings from "./connectedListings";
import { useRouter } from "next/navigation";
import axiosInstance from "@/auth/axiosInstance";
import LoadingSpinner from "@/components/LoadingSpinner";

const SeamLockInfo = ({
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
  const [clientSessionToken, setClientSessionToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("Device Details");
  const [activeTab, setActiveTab] = useState("Device Details");
  const router = useRouter();

  const fetchClientSessionToken = async () => {
    try {
      setIsLoading(true);
      const apiUrl = `${envConfig.backendUrl}/device/seam/getclientsessiontoken`;
      const response = await axiosInstance.get(apiUrl);

      if (response.status == 200 && response.data?.success) {
        setClientSessionToken(response.data?.data?.token);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong fetching clientsessiontoken");
    } finally {
      setIsLoading(false);
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
    fetchClientSessionToken();
  }, []);

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
            {isLoading && <LoadingSpinner />}
            <SeamProvider clientSessionToken={clientSessionToken}>
              <DeviceDetails deviceId={lockId} />
            </SeamProvider>
          </div>
        )}
        {activeTab === "Connected Listings" && (
          <div className="w-full">
            {isLoading && <LoadingSpinner />}

            <ConnectedListings
              lockType="Seam"
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

export default SeamLockInfo;
