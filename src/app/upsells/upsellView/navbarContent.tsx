// NavbarProvider.tsx
"use client";
import { Popover, Transition } from "@headlessui/react";
import {
  BarsArrowDownIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import React, { Fragment } from "react";

interface NavbarProviderProps {
  limit: number;
  onLimitChange: (limit: number) => void;
  actionItems: Array<{
    name: string;
    icon: React.ComponentType;
    onclick: () => void;
  }>;
  handleOpenPopup: () => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const NavbarProvider = ({
  limit,
  onLimitChange,
  actionItems,
  handleOpenPopup,
  title,
  setTitle,
}: NavbarProviderProps) => {
  return (
    <div className="flex items-center justify-between text-white w-[100%] bg-[#141B37] h-[50px]">
      <div className="relative flex items-center">
        <MagnifyingGlassIcon className="w-4 h-4 absolute left-3text-gray-400 ml-2" />
        <input
          type="text"
          placeholder="Search..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-10 py-1 mr-2 text-white bg-[#1F284D]  rounded-md focus:outline-none focus:border-indigo-500"
        />

        <div className="relative sm:mt-0 sm:ml-4">
          <label className="flex justify-items-center relative select-all">
            <select
              className="block appearance-none w-full sm:w-32border-2 bg-[#1F284D]  border-black text-white py-2 px-2 pr-8 rounded-md leading-tight focus:outline-none focus:border-blue-500"
              data-te-select-init
              data-te-select-clear-button="true"
              value={limit}
              onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
            >
              <option value="10">10</option>
              <option value="20">25</option>
              <option value="100">50</option>
              <option value="500">100</option>
            </select>
            <BarsArrowDownIcon className="w-5 h-5 text-gray-500 absolute top-1/2 right-3 transform -translate-y-1/2" />
          </label>
        </div>
      </div>

      <div className="flex justify-start gap-4">
        <button
          className="flex items-center px-5 py-2 h-[40px] text-white rounded-md focus:outline-none transition duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-purple-900 hover:to-purple-800 focus:to-purple-800"
          onClick={handleOpenPopup}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create upsell
        </button>
        {/* <button className="flex items-center px-5 py-2 text-white rounded-md focus:outline-none transition duration-300 ease-in-out bg-[#1F284D] hover:to-purple-800 focus:to-purple-800"> */}
        <Popover className=" ">
          {({ open, close }) => (
            <div>
              <Popover.Button
                className={`
${open ? "text-white" : "text-white/90"}
group inline-flex items-center justify-center px-2 py-2 h-[40px] w-[40px] bg-[#1F284D]  text-base font-bold hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
              >
                <div>
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </div>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-5"
              >
                <Popover.Panel className="absolute right-1 z-20 mt-2 w-screen max-w-sm translate-x-1 transform px-4 sm:px-0 lg:max-w-sm">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                    <div className="relative grid gap-1 bg-white p-2 lg:grid-cols-1">
                      {actionItems.map((item) => (
                        <button
                          key={item.name}
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                          onClick={() => {
                            item.onclick();
                            close();
                          }}
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                            <div className="w-8 h-8 text-red-700">
                              <item.icon />
                            </div>
                          </div>
                          <div className="ml-2">
                            <p className="text-sm font-medium text-gray-900">
                              {item.name}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          )}
        </Popover>
      </div>
    </div>
  );
};
