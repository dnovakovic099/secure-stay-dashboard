"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { envConfig } from "@/utility/environment";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import SeamDeviceInfo from "./seamDeviceInfo";
import SifelyDeviceInfo from "./sifelyDeviceInfo";

interface listing {
  listingId: number,
  id: number,
  name: string,
  externalListingName: string,
  address: string,
  price: number,
  guestsIncluded: number,
  priceForExtraPerson: number
  currencyCode: string
  images: Array<image>
}

interface image {
  id: number,
  caption: string,
  vrboCaption: string,
  airbnbCaption: string,
  url: string,
  sortOrder: number
}

interface DeviceInfo {
  lockName: string,
  modelNum: string
}

const DeviceInfo = ({ device_type, device_id }: any) => {
  const [listings, setListings] = useState([])
  const [showListings, setShowListings] = useState(false)
  const [selectedListing, setSelectedListing] = useState<listing | null>(null);

  const router = useRouter()

  const getListings = async () => {
    const apiUrl = `${envConfig.backendUrl}/listing/getlistings`
    const res = await axios.get(apiUrl)
    if (res.status == 200) {
      const listings = res.data.listings
      setListings(listings)
    }
  }

  const saveDeviceLockInfo = async () => {
    const apiUrl = `${envConfig.backendUrl}/device/savelocklistinginfo`
    const listing_id = selectedListing?.listingId
    if (!listing_id) {
      toast.error('Please select a listing')
      return
    }
    const res = await axios.post(apiUrl, { lock_id: device_id, listing_id })
    if (res.status == 200) {
      toast.success(res.data.message)
    }
  }

  useEffect(() => {
    getListings();
  }, []);

  return (
    <div className="bg-gray-100 rounded-md min-h-[682px] p-4">
      {/* <Toaster /> */}
      <div className="flex justify-between px-2">
        <h2 className="text-xl font-bold text-indigo-600">Device Details</h2>
        <div className="flex gap-2">
          <button
            onClick={() => router.back()}
            type="button"
            className="rounded-full bg-red-600 w-16 px-2 py-1 text-xs  text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => saveDeviceLockInfo()}
            className={`rounded-full bg-indigo-600 w-16 px-2 py-1 text-xs  text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800`}
          >
            Save
          </button>
        </div>
      </div>

      <div>
        {
          device_type == 'seam' && <SeamDeviceInfo device_id={device_id} />
        }
        {
          device_type == 'sifely' && <SifelyDeviceInfo device_id={device_id} />
        }

        <div onClick={() => setShowListings((prev) => !prev)} className="px-6 w-[91%] ml-6 bg-indigo-100 mb-5 py-2 rounded-md cursor-pointer select-none flex justify-between">
          <p className="text-gray-500 font-medium text-sm">Listings</p>
          {showListings ?
            (<ChevronUpIcon height={20} width={20} />)
            :
            (<ChevronDownIcon height={20} width={20} />)}
        </div>
        {showListings && listings.map((listing: listing) => (
          <div className="flex gap-4 px-4 py-2 w-[85%] ml-3 items-center cursor-pointer select-none" onClick={() => setSelectedListing(listing)}>
            <input type="checkbox" checked={selectedListing?.id == listing.id} name="" id="" className="w-[17px] h-[17px] cursor-pointer" />
            <img
              src={listing.images[0].url}
              height={60}
              width={60}
              className="rounded-md"
            />
            <div>
              <h5 className="font-medium text-sm">{listing?.name.substring(0, 40) + '...'}</h5>
              <small className="text-slate-400 text-xs">{listing?.address.substring(0,40)+'...'}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceInfo;
