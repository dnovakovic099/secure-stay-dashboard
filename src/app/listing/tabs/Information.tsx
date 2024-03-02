import React, { useState } from 'react';
import { GoPencil } from 'react-icons/go';
import { IoChevronDownOutline, IoLockOpenOutline } from 'react-icons/io5';
import { HiPencil } from 'react-icons/hi';
import { PiBuildingsLight } from 'react-icons/pi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPeople } from 'react-icons/go';
import { FaWifi } from 'react-icons/fa';

const Information = ({ selectedItem }: any) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 mx-2">
      <div className="bg-white px-1 flex items-center justify-between rounded-md">
        <div className="flex flex-col">
          <p className="text-xs font-medium text-gray-500 uppercase">Name</p>
          <h1 className="text-lg font-semibold text-gray-900 mt-1 line-clamp-1 w-[450px]">
            {selectedItem?.name}
          </h1>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-300"
          >
            <IoChevronDownOutline className="h-5 w-5 mr-1 text-gray-500" />
            <span className="text-gray-500">English</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-800 border border-gray-300 rounded-md bg-purple-100 hover:bg-purple-200 transition duration-300"
          >
            <GoPencil className="h-5 w-5 mr-1 text-indigo-500" />
            <span className="text-indigo-500">Edit</span>
          </button>
        </div>
      </div>
      <div className="bg-white px-1 rounded-md">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500">Description</p>
          <p className="text-md text-gray-800 mt-1 line-clamp-2">
            {selectedItem.description}
          </p>
          <p onClick={handleOpen} className="cursor-pointer text-blue-600 mt-1">
            Show all
          </p>
          {open && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
              <div className="w-[80vw] md:w-[60vw] max-h-[80vh] bg-white p-8 rounded-lg shadow-lg overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                    General Information
                  </h2>
                  <button
                    onClick={handleClose}
                    className="p-2 text-lg text-gray-800 hover:text-gray-600 focus:outline-none"
                  >
                    &#x2715;
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 uppercase">
                    Name
                  </p>
                  <h1 className="text-lg md:text-xl font-bold text-gray-900 mt-1">
                    {selectedItem?.name}
                  </h1>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 uppercase">
                    Description
                  </p>
                  <p className="text-base text-gray-800 mt-2 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-b my-4 border-gray-100"></div>

      <div className="grid grid-cols-3 gap-3">
        <div className="h-20 border rounded-xl flex items-center gap-4 px-5 bg-white transition duration-300">
          <div className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-full text-dark">
            <HiPencil className="text-xl" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 font-light mb-1">Nickname</p>
            <p className="text-md text-gray-800 font-[500]">
              {selectedItem.internalListingName}
            </p>
          </div>
        </div>

        <div className="h-20 border rounded-xl flex items-center gap-4 px-5 bg-white transition duration-300">
          <div className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-full text-dark">
            <PiBuildingsLight className="text-xl" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 font-light mb-1">
              Property type
            </p>
            <p className="text-md text-gray-800 font-[500]">
              {selectedItem.propertyType}
            </p>
          </div>
        </div>

        <div className="h-20 border rounded-xl flex items-center gap-4 px-5 bg-white transition duration-300">
          <div className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-full text-dark">
            <BsCurrencyDollar className="text-xl" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 font-light mb-1">Currency</p>
            <p className="text-md text-gray-800 font-[500]">
              {selectedItem.currencyCode}
            </p>
          </div>
        </div>

        <div className="h-20 border rounded-xl flex items-center gap-4 px-5 bg-white transition duration-300">
          <div className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-full text-dark">
            <FaWifi className="text-xl" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 font-light mb-1">
              Wifi Network
            </p>
            <p className="text-md text-gray-800 font-[500]">
              {selectedItem.wifiUsername === ''
                ? '(NO WIFI)'
                : selectedItem.wifiUsername}
            </p>
          </div>
        </div>

        <div className="h-20 border rounded-xl flex items-center gap-4 px-5 bg-white transition duration-300">
          <div className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-full text-dark">
            <IoLockOpenOutline className="text-xl" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 font-light mb-1">
              Wifi Password
            </p>
            <p className="text-md text-gray-800 font-[500]">
              {selectedItem.wifiPassword === ''
                ? '(NO PASSWORD)'
                : selectedItem.wifiPassword}
            </p>
          </div>
        </div>

        <div className="h-20 border rounded-xl flex items-center gap-4 px-5 bg-white transition duration-300">
          <div className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-full text-dark">
            <GoPeople className="text-xl" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 font-light mb-1">Guests</p>
            <p className="text-md text-gray-800 font-[500]">
              {selectedItem.guests}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
