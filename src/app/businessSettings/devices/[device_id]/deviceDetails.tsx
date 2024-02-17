"use client";
import { DeviceDetails, SeamProvider } from "@seamapi/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { envConfig } from "@/utility/environment";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";

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

const DeviceInfo = ({ device_id }: any) => {
  const [clientSessionToken, setClientSessionToken] = useState("");
  const [listings, setListings] = useState([])
  const [showListings, setShowListings] = useState(false)
  const [selectedListing, setSelectedListing] = useState<listing | null>(null);

  const router = useRouter()

  const getToken = async () => {
    const apiUrl = `${envConfig.backendUrl}/device/getclientsessiontoken`
    const res = await axios.get(apiUrl);
    if (res.status == 200) {
      setClientSessionToken(res.data.token);
    }
  };

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
    getToken();
    getListings();
  }, []);

  return (
    <div>
      {/* <Toaster /> */}
      <div className="flex justify-between px-2">
        <h2 className="text-xl font-bold text-blue-900">Device details</h2>
        <div className="flex gap-2">
          <button
            onClick={() => router.back()}
            type="button"
            className="rounded-full bg-gray-400 w-16 px-2 py-1 text-xs  text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => saveDeviceLockInfo()}
            className={`rounded-full bg-gray-400 w-16 px-2 py-1 text-xs  text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800`}
          >
            Save
          </button>
        </div>
      </div>

      <div>
        <SeamProvider clientSessionToken={clientSessionToken}>
          <DeviceDetails className="" disableResourceIds deviceId={device_id} />
        </SeamProvider>
        <div onClick={() => setShowListings((prev) => !prev)} className="px-6 bg-slate-200 py-2 rounded-md cursor-pointer select-none flex justify-between">
          <p className="text-slate-500 font-medium text-sm">Listings</p>
          {showListings ?
            (<ChevronUpIcon height={20} width={20} />)
            :
            (<ChevronDownIcon height={20} width={20} />)}
        </div>
        {showListings && listings.map((listing: listing) => (
          <div className="flex gap-4 p-4 items-center cursor-pointer select-none" onClick={() => setSelectedListing(listing)}>
            <input type="checkbox" checked={selectedListing?.id == listing.id} name="" id="" className="w-[20px] h-[20px] cursor-pointer" />
            <img
              src={listing.images[0].url}
              height={70}
              width={70}
              className="rounded-md"
            />
            <div>
              <h5 className="font-medium text-base">{listing?.name.substring(0, 40) + '...'}</h5>
              <small className="text-slate-400">{listing?.address}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceInfo;
