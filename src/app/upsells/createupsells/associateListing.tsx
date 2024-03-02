"use client";

import { useState, Fragment } from "react";
import { Switch } from "@headlessui/react";
import { LinkIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Popover, Transition } from "@headlessui/react";
import Pagination from "@/components/commonPagination";
import { Property } from "./page";


interface ToggleSwitchCardProps {
  property: Property;
  handleToggle: (id: number) => void;
}

interface AdditionalContentProps {
  attachedProperties: Property[];
  setAttachedProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  fetchListingData: () => void;
}

// Functional component for the toggle switch card
const ToggleSwitchCard: React.FC<ToggleSwitchCardProps> = ({
  property,
  handleToggle,
}) => {
  return (
    <div className="bg-white px-4 py-2 rounded-lg shadow-md mb-4 max-w-screen-xl flex items-center gap-5">
      <div>
        <Switch
          checked={property.status === 1}
          onChange={() => handleToggle(property.id)}
          className={`${
            property.status === 1 ? "bg-green-500" : "bg-gray-400"
          } relative inline-flex h-5 w-10 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${
              property.status === 1 ? "translate-x-5" : "translate-x-0"
            } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
          <span
            className={`absolute inset-0 flex items-center justify-between text-xs ${
              property.status === 0 ? "text-white" : "text-white"
            }`}
          >
          
            <span className="text-xs">
              {property.status === 1 ? "" : ""}
            </span>
          </span>
        </Switch>
      </div>

      <div className="ml-4 mr-4 flex flex-col">
        <h2 className="text-[13px] font-semibold">{property.name}</h2>
        <p className="text-gray-500 text-xs">{property.id}</p>
        <p className="text-gray-500 text-xs">{property.address}</p>
      </div>
    </div>
  );
};

// Main component
const AdditionalContent: React.FC<AdditionalContentProps> = ({
  attachedProperties,
  setAttachedProperties,
  fetchListingData,
}) => {
  const [totalData, setTotalData] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [totalPages, setTotalPages] = useState(totalData / limit);
  const [searchTerm, setSearchTerm] = useState("");

  // Updated handleToggleAllOn and handleToggleAllOff functions
  const handleToggleAllOn = () => {
    setAttachedProperties((prevProperties) =>
      prevProperties?.map((property) => ({ ...property, status: 1 }))
    );
  };

  const handleToggleAllOff = () => {
    setAttachedProperties((prevProperties) =>
      prevProperties?.map((property) => ({ ...property, status: 0 }))
    );
  };

  const solutions = [
    {
      name: "Dethach All",
      icon: XCircleIcon,
      onclick: handleToggleAllOff,
    },
  ];

  const handleToggle = (id: number) => {
    setAttachedProperties((prevProperties) =>
      prevProperties?.map((property) =>
        property.id === id
          ? { ...property, status: property.status === 1 ? 0 : 1 }
          : property
      )
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container p-4 max-w-screen-xl">
      <>
        <div className="mb-4 grid grid-cols-1 sm:grid sm:grid-cols-2 gap-10 space-x-2 ">
          <div className="overflow-hidden ">
            <input
              type="text"
              placeholder="Search by name or id"
              className="w-full  border border-gray-700 p-2 h-[35px] rounded-full focus:outline-none shadow-lg focus:border-blue-500 placeholder-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-row gap-2 ">
            <button
              onClick={handleToggleAllOn}
              className="bg-green-500 text-white px-2 py-1 rounded-md flex h-[35px]  gap-2 items-center space-x-1 text-xs"
            >
              <LinkIcon className="h-5 w-5 text-xs" />
              Attach All
            </button>
            <div className="ml-5">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={`
    ${open ? "text-white" : "text-white/90"}
    group inline-flex items-center justify-center rounded-full bg-gray-500 w-8 h-8 text-base font-bold hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                      style={{ borderRadius: "50%" }}
                    >
                      <span className="mb-2">...</span>
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
                      <Popover.Panel className="absolute right-1 z-20 mt-2 w-screen max-w-40 translate-x-1 transform px-4 sm:px-0 lg:max-w-1sm">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                          <div className="relative grid gap-1 bg-white p-2 lg:grid-cols-1">
                            {solutions?.map((item) => (
                              <button
                                key={item.name}
                                onClick={item.onclick}
                                className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                              >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                  <item.icon
                                    aria-hidden="true"
                                    className="h-6 w-6 text-black"
                                  />
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
                  </>
                )}
              </Popover>
            </div>
          </div>
        </div>

        {attachedProperties
          .filter((property) =>
            property.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((property) => (
            <ToggleSwitchCard
              key={property.id}
              property={property}
              handleToggle={handleToggle}
            />
          ))}
        <div className="flex justify-center mt-4 overflow-hidden">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </>
    </div>
  );
};

export default AdditionalContent;
