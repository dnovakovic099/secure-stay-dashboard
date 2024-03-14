"use client";
import { envConfig } from "@/utility/environment";
import { DeviceDetails, SeamProvider } from "@seamapi/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ConnectedListings from "./connectedListings";
import { useRouter } from "next/navigation";
import axiosInstance from "@/auth/axiosInstance";

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

  const router = useRouter();

  const fetchClientSessionToken = async () => {
    try {
      const apiUrl = `${envConfig.backendUrl}/device/seam/getclientsessiontoken`;
      const response = await axiosInstance.get(apiUrl);

      if (response.status == 200 && response.data?.success) {
        setClientSessionToken(response.data?.data?.token);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong fetching clientsessiontoken");
    }
  };

  useEffect(() => {
    fetchClientSessionToken();
  }, []);

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center gap-4 pl-10 px-4 py-2">
        <h2 className="text-xl font-semibold">Device Details</h2>
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
      <div className="flex">
        <div className="px-2 w-1/2">
          <SeamProvider clientSessionToken={clientSessionToken}>
            <DeviceDetails deviceId={lockId} />
          </SeamProvider>
        </div>
        <div className="w-1/2">
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
      </div>
    </div>
  );
};

export default SeamLockInfo;
