'use client';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import React from 'react';

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

const ConnectedListings = ({
    lockId,
    lockType,
    connectedListings,
    handleEditClick,
    filteredListings,
    selection,
    handleChange,
    selectedListing }: any) => {

    return (
        <>
            <div
                // onClick={() => setShowConnectedListings((prev) => !prev)}
                className={`px-6 mr-4 ${lockType == 'Seam' ? 'mt-14' : 'mt-4'} bg-gray-100 mb-2 py-3 rounded-md cursor-pointer select-none flex justify-between items-center transition duration-300 ease-in-out transform`}
            >
                <p className="text-gray-700 font-semibold text-sm">
                    Connected Listings <span className="text-slate-400">({connectedListings.length})</span >
                </p>
                <div className="">
                    <button
                        onClick={(e) => handleEditClick(e)}
                        className="outline outline-2 outline-indigo-600  bg-white p-1 rounded-md"><PencilSquareIcon className="text-indigo-800  h-4 w-5" /></button>
                    <>
                    </>
                </div>
            </div>
            <div className='h-screen overflow-y-auto mr-4'>
                {
                    filteredListings.length > 0 && filteredListings?.map((listing: listing) => (
                        <div
                            key={listing.listingId}
                            className="flex items-center gap-4 p-3 w-[95%] mr-4 cursor-pointer select-none border-b hover:bg-[#f1f3f4] rounded-md  bg-white  transition-transform transform"
                        >
                            {
                                selection &&
                                <input
                                    type="checkbox"
                                    onChange={() => handleChange(listing.id)}
                                    checked={selectedListing?.includes(listing.id)}
                                    className="size-4 border rounded cursor-pointer focus:ring focus:border-indigo-300"
                                />
                            }
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
                                    {listing?.name.substring(0, 50) + "..."}
                                </h5>
                                <small className="text-xs text-gray-600">
                                    {listing?.address.substring(0, 50) + "..."}
                                </small>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default ConnectedListings;