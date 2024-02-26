"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DeviceTable, SeamProvider } from "@seamapi/react";
import { useRouter } from "next/navigation";
import { envConfig } from "@/utility/environment";
import Form from "./form";
import CommonPopup from "@/components/commonPopup";
import {
  Battery50Icon,
  Battery100Icon,
  PlusIcon,
  LinkIcon,
} from "@heroicons/react/20/solid";

const DeviceList = ({ children }: any) => {
  const router = useRouter();
  const [clientSessionToken, setClientSessionToken] = useState("");
  const [sifelyLocks, setSifelyLocks] = useState<object[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locksPressed, setLockedPress] = useState(false);

  const getToken = async () => {
    const apiUrl = `${envConfig.backendUrl}/device/getclientsessiontoken`;
    const res = await axios.get(apiUrl);
    if (res.status == 200) {
      setClientSessionToken(res.data.token);
    }
  };

  const getSifelyLocks = async () => {
    const accessToken = localStorage.getItem("sifely_access_token");

    if (!accessToken || accessToken == "") {
      setSifelyLocks(null);
      return;
    }

    setIsLoading(true);

    const apiUrl = `${envConfig.backendUrl}/device/sifely/locklist`;
    const result = await axios.post(apiUrl, {
      accessToken,
      pageNo: 1,
      pageSize: 100,
    });

    setIsLoading(false);
    setSifelyLocks(result.data.list);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getToken();
    getSifelyLocks();
  }, []);

  useEffect(() => {
    // This effect will run when the component mounts
    // Check if there is a saved state in local storage
    const savedLocksPressed = localStorage.getItem("locksPressed");

    if (savedLocksPressed) {
      setLockedPress(savedLocksPressed === "true");
    }

    const handleBeforeUnload = () => {
      // Remove local storage data on page close
      localStorage.removeItem("locksPressed");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Cleanup the event listener
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleDeviceClick = (device_id: any) => {
    setLockedPress(true);
    localStorage.setItem("locksPressed", "true");
    router.push(`/businessSettings/devices/Seam/${device_id}`);
  };

  const handleClick = (lockId: any) => {
    setLockedPress((prevLockedPress) => !prevLockedPress);
    localStorage.setItem("locksPressed", "true");
    router.push(`/businessSettings/devices/Sifely/${lockId}`);
  };

  return (
    <div className="h-[100%] w-[100%] bg-gray-300">
      <CommonPopup
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        children={<Form closeModal={closeModal} getSifelyLocks={getSifelyLocks}/>}
        disableCloseIcon={false}
        heightwidth="100rem"
      />

      <div className="flex flex-row gap-[0.05rem] h-[100%] ">
        {/* column 1 */}
        <div
          className={`flex-1 bg-white py-2 px-4 rounded-md ${locksPressed ? "w-1/2" : "w-full"
            }`}
        >
          <div className="flex justify-between px-4 mt-1">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">
              Smart Home Devices
            </h2>
            <div className="flex  gap-2">
              {/* Updated button styles */}
              <button
                type="button"
                onClick={() => router.push("/businessSettings/addDevices")}
                className="rounded-md flex items-center h-7 bg-indigo-500 px-2 py-1 text-xs text-white shadow-md hover:bg-blue-600 focus:outline-none"
              >
                <PlusIcon className="text-white  h-4 w-4" />
                Add Devices
              </button>

              <button
                type="button"
                className="rounded-lg flex items-center h-7 bg-indigo-500 px-2 py-1 text-xs text-white shadow-md hover:bg-blue-600 focus:outline-none"
              >
                <LinkIcon className="text-white mr-2 h-4 w-4" />
                Pair Devices
              </button>
            </div>
          </div>

          <div
            className={` ${locksPressed ? "" : "flex justify-start"} gap-10 mt-1 h-[90%] overflow-y-auto`}
          >
            {" "}
            {/* Device List here */}
            <SeamProvider clientSessionToken={clientSessionToken}>
              <DeviceTable
                preventDefaultOnDeviceClick
                onDeviceClick={handleDeviceClick}
                className="w-[564px] h-auto"
                disableSearch
              />
            </SeamProvider>
            <div className="p-4 w-full bg-gray-50 rounded-md">
              <h4 className="text-black text-xl font-bold mb-4">
                Sifely Locks
              </h4>

              {sifelyLocks === null ? (
                <div className="text-center p-4">
                  {!isLoading ? (
                    <>
                      <span className="text-gray-500 mr-4">
                        Sign in to your Sifely account
                      </span>
                      <span
                        onClick={() => setShowModal(true)}
                        className="text-indigo-700 underline cursor-pointer"
                      >
                        click here
                      </span>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              ) : (
                <ul className="text-slate-700 text-base font-medium mt-4">
                  <>
                    {
                      (sifelyLocks && sifelyLocks.length == 0) &&
                      <div>
                        <p className="text-slate-400 text-center mt-32">Sorry, no devices were found</p>
                      </div>
                    }
                    {sifelyLocks?.map((lock: any) => (
                      <li
                        onClick={() => handleClick(lock.lockId)}
                        className="p-2 rounded-md font-normal text-sm text-justify hover:bg-slate-100 flex items-center gap-4 justify-between border-b-2 shadow-md mb-2 cursor-pointer transition-all duration-300"
                      >
                        <div className="flex justify-start gap-5 mx-5">
                          <div>
                            <img
                              src="https://www.schlage.com/content/dam/sch-us/homepage-refresh/smart-lock.png"
                              alt=""
                              width={27}
                              height={27}
                              className="rounded-md"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h1 className="font-medium text-base text-black">
                              {lock.lockName}
                            </h1>
                            <p className="text-xs text-slate-500">
                              {lock.lockAlias}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col ml-4 items-baseline text-slate-500">
                          <span className="text-xs">Mac: {lock.lockMac}</span>
                          <span className="text-xs flex items-center gap-2">
                            {lock.electricQuantity > 80 ? (
                              <Battery100Icon
                                color="green"
                                width={20}
                                height={20}
                              />
                            ) : (
                              <Battery50Icon
                                color="green"
                                width={20}
                                height={20}
                              />
                            )}
                            <span>
                              {lock.electricQuantity < 20 ? "Low" : "Good"} (
                              {lock.electricQuantity}%)
                            </span>
                          </span>
                        </div>
                      </li>
                    ))}
                  </>
                </ul>
              )}
            </div>
          </div>
        </div>
        {/* column 2 - Device Details */}
        {locksPressed && (
          <div className=" overflow-y-auto w-[50%] bg-white">{children}</div>
        )}
      </div>
    </div>
  );
};

export default DeviceList;
