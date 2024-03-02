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
      deviceId: device_id,
      listingId: selectedListing[0] ? selectedListing[0] : null,
      deviceType: device_type,
    });

    if (res.status == 200) {
      if (res.data?.success) {
        toast.success(res.data?.message);
      } else {
        toast.error(res.data?.message);
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
    setSelection((prev) => !prev);
  };

  useEffect(() => {
    if (selection) {
      setFilteredListings(listings);
    } else {
      setFilteredListings(connectedListings);
    }
  }, [selection]);

  return (
    <div className="bg-white rounded-md  p-4">
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
        {device_type == "Seam" && <SeamDeviceInfo device_id={device_id} />}
        {device_type == "Sifely" && <SifelyDeviceInfo device_id={device_id} />}
        <div
          onClick={() => setShowConnectedListings((prev) => !prev)}
          className="px-6 w-[91%] mx-auto bg-gray-100 mb-2 py-3 rounded-md cursor-pointer select-none flex justify-between items-center transition duration-300 ease-in-out transform"
        >
          <p className="text-gray-700 font-semibold text-sm">
            Connected Listings{" "}
            <span className="text-slate-400">
              ({connectedListings?.length})
            </span>
          </p>
          <div className="">
            <button
              onClick={(e) => handleEditClick(e)}
              className="outline outline-2 outline-indigo-600  bg-white p-1 rounded-md"
            >
              <PencilSquareIcon className="text-indigo-800  h-4 w-5" />
            </button>
            <></>
          </div>
        </div>

        <div>
          {filteredListings?.map((listing: listing) => (
            <div
              key={listing.listingId}
              className="flex items-center gap-4 p-3  w-[90%] mx-auto cursor-pointer select-none border-b hover:bg-[#f1f3f4] rounded-md  bg-white  transition-transform transform"
            >
              {selection && (
                <input
                  type="checkbox"
                  onChange={() => handleChange(listing.listingId)}
                  checked={selectedListing?.includes(listing.listingId)}
                  className="size-4 border rounded cursor-pointer focus:ring focus:border-indigo-300"
                />
              )}
              <div className=" overflow-hidden">
                <img
                  src={listing.images[0].url}
                  alt={listing.name}
                  height={40}
                  width={80}
                  className="rounded-md h-12"
                />
              </div>
              <div className="flex flex-col">
                <h5 className="font-semibold text-sm ">
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
