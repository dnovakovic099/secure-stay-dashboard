"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { envConfig } from "@/utility/environment";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import SeamDeviceInfo from "./seamDeviceInfo";
import SifelyDeviceInfo from "./sifelyDeviceInfo";

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

interface DeviceInfo {
  lockName: string;
  modelNum: string;
}

const DeviceInfo = ({ device_type, device_id }: any) => {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState<number[]>([]);
  const [connectedListings, setConnectedListings] = useState<listing[]>([]);
  const [showConnectedListings, setShowConnectedListings] = useState(false);
  const [selection, setSelection] = useState(false);
  const [filteredListings, setFilteredListings] = useState<listing[]>([]);

  const router = useRouter();


  useEffect(() => {
    getListings();
    getDeviceListings();
  }, []);

  const getListings = async () => {
    const apiUrl = `${envConfig.backendUrl}/listing/getlistings`;
    const res = await axios.get(apiUrl);
    if (res.status == 200) {
      const listings = res.data.listings;
      setListings(listings);
    }
  };

  const saveDeviceLockInfo = async () => {
    const apiUrl = `${envConfig.backendUrl}/device/savelocklistinginfo`;

    const res = await axios.post(apiUrl, {
      device_id,
      listing_id: selectedListing[0] ? selectedListing[0] : null,
    });

    if (res.status == 200) {
      if (res.data.success) {
        toast.success(res.data.message)
      } else {
        toast.error(res.data.message)
      }
      setSelection(false);
      getDeviceListings();
    }

  };

  const getDeviceListings = async () => {

    const apiUrl = `${envConfig.backendUrl}/device/getlistings/${device_id}`;
    const result = await axios.get(apiUrl);

    if (result.status == 200) {

      setConnectedListings(result.data);
      setFilteredListings(result.data);

      let arr: number[] = [];
      result.data.map((res: listing) => {
        arr.push(res.listingId);
      });

      setSelectedListing(arr);
    }
  };

  const handleChange = (value: number) => {
    if (selectedListing.includes(value)) {
      setSelectedListing([]);
    } else {
      setSelectedListing([value]);
    }
  };

  const handleEditClick = async (e: any) => {
    e.stopPropagation();
    setSelection(true);
    setFilteredListings(listings);
  };


  return (
    <div className="bg-white rounded-md h-[100%] p-4">
      {/* <Toaster /> */}
      <div className="flex justify-between px-2">
        <h2 className="text-xl font-bold text-indigo-600">Device Details</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              localStorage.setItem("locksPressed", "false"); // Set the desired value
              router.back();
            }}
            type="button"
            className="rounded-md bg-red-600 w-16 px-2 py-1 text-xs  text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => saveDeviceLockInfo()}
            className={`rounded-md bg-indigo-600 w-16 px-2 py-1 text-xs  text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800`}
          >
            Save
          </button>
        </div>
      </div>

      <div>
        {device_type == "seam" && <SeamDeviceInfo device_id={device_id} />}
        {device_type == "sifely" && <SifelyDeviceInfo device_id={device_id} />}
        <div
          onClick={() => setShowConnectedListings((prev) => !prev)}
          className="px-6 w-[91%] mx-auto bg-indigo-100 mb-5 py-3 rounded-md cursor-pointer select-none flex justify-between items-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          <p className="text-gray-700 font-semibold text-sm">
            Connected Listings {`(${connectedListings.length})`}
          </p>
          <div className="flex items-center gap-4">
            {showConnectedListings ? (
              <>
                <button
                  onClick={(e) => handleEditClick(e)}
                  className={`rounded-full flex items-center gap-1 bg-indigo-600 px-3 py-1 text-sm text-white shadow-md focus:outline-none focus:ring focus:border-indigo-300`}
                >
                  <PencilSquareIcon height={16} width={16} />
                  <span>Edit</span>
                </button>
                <ChevronUpIcon height={20} width={20} />
              </>
            ) : (
              <ChevronDownIcon height={20} width={20} />
            )}
          </div>
        </div>

        <div>
          {showConnectedListings &&
            filteredListings?.map((listing: listing) => (
              <div
                key={listing.listingId}
                className="flex items-center gap-4 p-3 w-[85%] mx-auto mt-3 cursor-pointer select-none border rounded-md hover:shadow-md bg-white shadow-lg transition-transform transform hover:scale-105"
              >
                {
                  selection &&
                  <input
                    type="checkbox"
                    onChange={() => handleChange(listing.listingId)}
                    checked={selectedListing?.includes(listing.listingId)}
                    className="w-4 h-4 border rounded cursor-pointer focus:ring focus:border-indigo-300"
                  />
                }
                <img
                  src={listing.images[0].url}
                  alt={listing.name}
                  height={40}
                  width={40}
                  className="rounded-md object-cover border-2 border-indigo-500"
                />
                <div className="flex flex-col">
                  <h5 className="font-semibold text-sm text-indigo-800">
                    {listing?.name.substring(0, 30) + "..."}
                  </h5>
                  <small className="text-xs text-gray-600">
                    {listing?.address.substring(0, 30) + "..."}
                  </small>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceInfo;
