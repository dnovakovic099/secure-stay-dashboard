"use client";
import React, { useEffect, useState } from "react";
import SeamLockInfo from "./seamLockInfo";
import { envConfig } from "@/utility/environment";
import axios from "axios";
import toast from "react-hot-toast";
import SifelyLockInfo from "./sifelyLockInfo";
import axiosInstance from "@/auth/axiosInstance";

interface listing {
  listingId: number;
  id: number;
  name: string;
  externalListingName: string;
  address: string;
  price: number;
  guestsIncluded: number;
  priceForExtraPerson: number;
  currencyCode: string;
  images: Array<image>;
}

interface image {
  id: number;
  caption: string;
  vrboCaption: string;
  airbnbCaption: string;
  url: string;
  sortOrder: number;
}
const LockInfo = ({ lockType, lockId }: any) => {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState<number[]>([]);
  const [selection, setSelection] = useState(false);
  const [connectedListings, setConnectedListings] = useState<listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<listing[]>([]);
  const [operation, setOperation] = useState(false);

  const handleEditClick = async (e: any) => {
    e.stopPropagation();
    setSelection((prev) => !prev);
    setOperation(true);
  };

  const handleChange = (value: number) => {
    if (selectedListing.includes(value)) {
      setSelectedListing([]);
    } else {
      setSelectedListing([value]);
    }
  };

  useEffect(() => {
    if (selection) {
      setFilteredListings(listings);
    } else {
      setFilteredListings(connectedListings);
    }
  }, [selection]);

  const getDeviceListings = async () => {
    const apiUrl = `${envConfig.backendUrl}/device/getlistings/${lockId}`;
    const result = await axiosInstance.get(apiUrl);

    if (result.status == 200 && result.data?.success) {
      const arr = [result.data?.data];
      setConnectedListings(arr);
      setFilteredListings(arr);

      setSelectedListing((prev) => [...prev, result.data?.data?.id]);
    }
  };
  const fetchListings = async () => {
    try {
      const apiUrl = `${envConfig.backendUrl}/listing/getlistings`;
      const res = await axiosInstance.get(apiUrl);

      if (res.status == 200) {
        const listings = res.data.listings;
        setListings(listings);
      }
    } catch (error) {
      toast.error("Could not fetch listings");
    }
  };

  const saveDeviceLockInfo = async () => {
    if (!operation) return;

    try {
      const apiUrl = `${envConfig.backendUrl}/device/savelocklistinginfo`;
      const res = await axiosInstance.post(apiUrl, {
        deviceId: lockId,
        listingId: selectedListing[0] ? selectedListing[0] : null,
        deviceType: lockType,
      });

      if (res.status == 201 && res.data?.success) {
        toast.success(res.data?.message);
        setSelection(false);
        getDeviceListings();
        setOperation(false);
      }
    } catch (error: any) {
      if (error?.response?.status == 400) {
        toast.error(error?.response?.data?.message);
      } else if (error?.response?.status == 409) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Error saving lock detail");
      }
    }
  };

  useEffect(() => {
    fetchListings();
    getDeviceListings();
  }, []);

  if (lockType == "Seam")
    return (
      <div className="flex justify-between gap-1 px-6 py-6 bg-[#f5f7f8] min-h-full max-h-full">
        <div className="w-full bg-white flex flex-col p-5 rounded-lg shadow-2xl">
          {/* <div className="flex justify-between p-4 text-center"> */}
          {/* <div className="flex justify-between text-xs tracking-normal leading-4 text-center border-b border-solid border-b-slate-200 mt-auto"> */}
          <SeamLockInfo
            lockId={lockId}
            listings={listings}
            connectedListings={connectedListings}
            handleEditClick={handleEditClick}
            filteredListings={filteredListings}
            selection={selection}
            handleChange={handleChange}
            selectedListing={selectedListing}
            saveDeviceLockInfo={saveDeviceLockInfo}
          />
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    );

  if (lockType == "Sifely")
    return (
      <div className="flex justify-between gap-1 px-6 py-6 bg-[#f5f7f8] min-h-full max-h-full">
        <div className="w-full bg-white flex flex-col p-5 rounded-lg shadow-2xl">
          <SifelyLockInfo
            lockId={lockId}
            listings={listings}
            connectedListings={connectedListings}
            handleEditClick={handleEditClick}
            filteredListings={filteredListings}
            selection={selection}
            handleChange={handleChange}
            selectedListing={selectedListing}
            saveDeviceLockInfo={saveDeviceLockInfo}
          />
        </div>
      </div>
    );

  return <div>Not found</div>;
};

export default LockInfo;

{
  /* <div className="flex justify-between gap-1 px-6 py-6 bg-[#f5f7f8] min-h-full max-h-full">
  <div className="w-full bg-white flex flex-col p-5 rounded-lg shadow-2xl">
    <div className="flex justify-between p-4 text-center">
      <div className="flex justify-between text-xs tracking-normal leading-4 text-center border-b border-solid border-b-slate-200 mt-auto">
        <div
          className={`inline-flex items-center px-3 py-2 text-xs font-medium focus:outline-none transition duration-300 cursor-pointer ${
            activeButton === "seamLock"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 border-b-2 border-gray-300"
          }`}
          onClick={() => handleButtonClick("seamLock")}
          style={{ fontSize: "20px" }}
        >
          Seam Locks
        </div>
        <div
          className={`inline-flex items-center px-3 py-2 text-xs font-medium focus:outline-none transition duration-300 cursor-pointer ${
            activeButton === "sifelyLocks"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 border-b-2 border-gray-300"
          }`}
          onClick={() => handleButtonClick("sifelyLocks")}
          style={{ fontSize: "20px" }}
        >
          Sifely Locks
        </div>
      </div>

      {activeTab === "seamLock" && (
        <div
          className="flex gap-2.5 justify-between px-5 py-2.5 text-sm font-medium tracking-normal leading-5 text-white whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 cursor-pointer w-40 h-12"
          onClick={createConnectWebView}
        >
          {isLoading ? (
            <div className="grow my-auto">Processing...</div>
          ) : (
            <div className="grow my-auto">
              <span className="text-xl">+</span> Add seam locks
            </div>
          )}
        </div>
      )}
      {activeTab === "sifelyLocks" && (
        <div
          className="flex gap-2.5 justify-between px-5 py-2.5 text-sm font-medium tracking-normal leading-5 text-white whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 cursor-pointer w-40 h-12"
          onClick={() => setShowModal(true)}
        >
          {isLoading ? (
            <div className="grow my-auto">Processing...</div>
          ) : (
            <div className="grow my-auto">
              <span className="text-xl">+</span> Add sifely locks
            </div>
          )}
        </div>
      )}
    </div>
    <div className="p-2">
      {activeTab === "seamLock" ? (
        <SeamLock />
      ) : (
        <>
          <CommonPopup
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            // children={<Form closeModal={closeModal} getSifelyLocks={getSifelyLocks}/>}
            disableCloseIcon={false}
            heightwidth="100rem"
          >
            <Form closeModal={closeModal} fetchSifelyLocks={fetchSifelyLocks} />
          </CommonPopup>
          <SifelyLock />
        </>
      )}
    </div>
  </div>
</div>; */
}
