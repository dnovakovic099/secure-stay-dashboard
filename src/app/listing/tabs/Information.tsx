/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { IoLockOpenOutline } from 'react-icons/io5';
import { HiPencil } from 'react-icons/hi';
import { PiBuildingsLight } from 'react-icons/pi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPeople } from 'react-icons/go';
import { IoWifi } from 'react-icons/io5';

const Information = ({ selectedItem }: any) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-start px-0.5 mt-9 w-full whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col text-sm leading-5 text-zinc-500">
          <div>Name</div>
          <h1 className="text-lg font-semibold text-gray-900 mt-1 overflow-hidden overflow-ellipsis w-[450px]">
            {selectedItem?.name}
          </h1>
        </div>
        <div className="flex gap-2 font-medium">
          <div className="flex gap-3 justify-between px-4 py-3 text-xs tracking-normal leading-5 rounded-lg border border-solid border-slate-200 text-neutral-800">
            <div className="my-auto">English</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb29289a62f8b6cc3faaa17aabe5832a9c3b3fdd31ecbc4a99d2dc16f5422865?"
              className="w-4 aspect-square"
              alt="icon"
            />
          </div>
          <div className="flex gap-1.5 justify-between px-3.5 py-2.5 text-sm tracking-normal leading-5 text-violet-700 bg-violet-50 rounded-lg">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/946ebe34024cfe2077c295057815be27068edc985ae6a0d0ff9dfad3adb27f49?"
              className="w-5 aspect-square"
              alt="icon"
            />
            <div className="my-auto">Edit</div>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-10 text-sm text-gray-600">Description</div>
        <div className="mt-3.5 text-base leading-7 text-neutral-800 max-md:max-w-full line-clamp-2">
          {selectedItem.description}
        </div>
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
      <div className="shrink-0 mt-7 h-px bg-slate-200 max-md:max-w-full" />
      <div className="grid grid-cols-3 gap-3 justify-between px-px mt-7 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <div className="flex items-center gap-3 justify-between py-4 pr-16 pl-4 rounded-xl border border-solid border-slate-200 max-md:pr-5">
          <div className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-full text-dark">
            <HiPencil className="text-xl" />
          </div>
          <div className="flex flex-col flex-1 self-start">
            <div className="text-xs leading-4 text-zinc-500">Nickname</div>
            <div className="mt-3 text-sm font-medium tracking-normal leading-7 text-neutral-800">
              {selectedItem.internalListingName}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-between px-4 py-4 rounded-xl border border-solid border-slate-200">
          <div className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-full text-dark">
            <PiBuildingsLight className="text-xl" />
          </div>
          <div className="flex flex-col flex-1 self-start">
            <div className="text-xs leading-4 text-zinc-500">Property Type</div>
            <div className="mt-3 text-sm font-medium tracking-normal leading-7 text-neutral-800">
              {selectedItem.propertyType}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-between py-4  pl-4 rounded-xl border border-solid border-slate-200 max-md:pr-5">
          <div className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-full text-dark">
            <BsCurrencyDollar className="text-xl" />
          </div>
          <div className="flex flex-col flex-1 my-auto">
            <div className="text-xs leading-4 text-zinc-500">Currency</div>
            <div className="mt-2.5 text-sm font-medium tracking-normal leading-7 text-neutral-800">
              {selectedItem.currencyCode}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-between px-4 py-4 rounded-xl border border-solid border-slate-200">
          <div className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-full text-dark">
            <IoWifi className="text-xl" />
          </div>
          <div className="flex flex-col flex-1 self-start">
            <div className="text-xs leading-4 text-zinc-500">Wifi Password</div>
            <div className="mt-3 text-sm font-medium tracking-normal leading-7 text-neutral-800">
              {selectedItem.wifiUsername === ''
                ? '(NO WIFI)'
                : selectedItem.wifiUsername}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-between px-4 py-4 rounded-xl border border-solid border-slate-200">
          <div className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-full text-dark">
            <IoLockOpenOutline className="text-xl" />
          </div>
          <div className="flex flex-col flex-1 self-start">
            <div className="text-xs leading-4 text-zinc-500">Wifi Password</div>
            <div className="mt-3 text-sm font-medium tracking-normal leading-7 text-neutral-800">
              {selectedItem.wifiPassword === ''
                ? '(NO PASSWORD)'
                : selectedItem.wifiPassword}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-between py-4 pr-20 pl-4 whitespace-nowrap rounded-xl border border-solid border-slate-200 max-md:pr-5">
          <div className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-full text-dark">
            <GoPeople className="text-xl" />
          </div>
          <div className="flex flex-col flex-1 my-auto">
            <div className="text-xs leading-4 text-zinc-500">Guestes</div>
            <div className="mt-3.5 text-sm font-medium tracking-normal leading-7 text-neutral-800">
              {selectedItem.guests}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
