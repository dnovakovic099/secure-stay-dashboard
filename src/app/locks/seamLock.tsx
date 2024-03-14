"use client";
import { envConfig } from "@/utility/environment";
import { DeviceTable, SeamProvider } from "@seamapi/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import axiosInstance from "@/auth/axiosInstance";

const SeamLock = () => {
  const [clientSessionToken, setClientSessionToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const createConnectWebView = async () => {
    try {
      setIsLoading(true);
      const apiUrl = `${envConfig.backendUrl}/device/seam/createconnectwebview`;
      const response = await axiosInstance.get(apiUrl);

      if (response.status == 200 && response.data?.success) {
        const url = response.data?.data?.url;
        setIsLoading(false);
        window.open(url, "_blank");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleClick = (lockId: any) => {
    router.push(`/locks/Seam/${lockId}`);
  };

  useEffect(() => {
    fetchClientSessionToken();
  }, []);

  return (
    <div className="p-2">
      <div className="flex justify-between pr-2 items-center">
        <h1 className="text-xl font-semibold ml-4">Seam Locks</h1>
        <button
          onClick={createConnectWebView}
          className="flex items-center px-2 py-2 h-[40px] text-white text-sm rounded-md focus:outline-none transition duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-purple-900 hover:to-purple-800 focus:to-purple-800"
        >
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              <PlusIcon className="text-white  h-4 w-4" />
              Add seam locks
            </>
          )}
        </button>
      </div>
      <div>
        <SeamProvider clientSessionToken={clientSessionToken}>
          <DeviceTable
            heading={null}
            disableSearch
            preventDefaultOnDeviceClick
            onDeviceClick={(deviceId) => handleClick(deviceId)}
          />
        </SeamProvider>
      </div>
    </div>
  );
};

export default SeamLock;
