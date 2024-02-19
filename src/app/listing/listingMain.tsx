import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  BarsArrowDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import HotelListing from "./hotelList";
import HotelDetail from "./hotelDetails";
import axios, { AxiosResponse } from 'axios'
import toast from "react-hot-toast";
import { envConfig } from "@/utility/environment";
import handleApiCallFetch from "@/components/handleApiCallFetch";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const projects = [
  {
    id: 1,
    name: "Sun Set Hotel & villas",
    address: "2/123 Sunset Street,Paradise,Ice Land",
    nickName: "Triple S Retreat",
    bgColor: "bg-pink-600",
    imageUrl:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Royal Oasis Hotel",

    address: "2/123 Royal Street,Paradise,Nobia City",
    nickName: "Royal Oasis",
    bgColor: "bg-purple-600",
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Emerald Resort",
    address: "2/123 Emerald  Street,Paradise,Nobia City",
    nickName: "Emerald Resort",
    bgColor: "bg-yellow-500",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Modern Villas",
    address: "2/123 Modern Street,Paradise,New York",
    nickName: "Modern Villas special",

    bgColor: "bg-green-500",
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "Sun Set Hotel & villas",
    address: "2/123 Sunset Street,Paradise,Ice Land",
    nickName: "Sun Set Hotel",

    bgColor: "bg-pink-600",
    imageUrl:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    name: "Royal Oasis Hotel",
    nickName: "Royal Oasis",

    address: "2/123 Royal Street,Paradise,Nobia City",

    bgColor: "bg-purple-600",
    imageUrl:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    name: "Emerald Resort",
    address: "2/123 Emerald  Street,Paradise,Nobia City",
    nickName: "Emerald",

    bgColor: "bg-yellow-500",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    name: "Modern Villas",
    address: "2/123 Modern Street,Paradise,New York",
    nickName: "Modern",

    bgColor: "bg-green-500",
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ListingMain = () => {
  const [selectedItem, setSelectedItem] = useState();
  const [listdata, setListdata] = useState<any[]>([]);
  useEffect(() => {
    getHostawayListFromDb();
  }, [])

  const getHostawayListFromDb = async () => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var params = { method: 'GET', headers: headers }
    try {
      const apiUrl = `${envConfig.backendUrl}/listing/getlistings`;
      const response: any = await handleApiCallFetch(apiUrl, params);
      console.log("response", response);
      if (response && response.success) {
        console.log("response getlistings:", response.listings);
        formattResponse(response.listings);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const formattResponse = (AllData: any) => {
    const formattedData = AllData.map((data: any) => ({
      id: data && data.id ? data.id : "",
      name: data.name ? data.name : '',
      address: data && data.address ? data.address : '',
      nickName: data.name ? data.name : '',
      bgColor: "bg-pink-600",
      imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      // imageUrl: data && data.images && data.images[0] && data.images[0].url ? data.images[0].url : '',

    }));
    setListdata(formattedData);
  };

  const syncHostawayListings = async () => {
    try {
      const apiUrl = `${envConfig.backendUrl}/listing/synchostawaylistings`
      const axiosPromise: Promise<AxiosResponse<any>> = axios.get(apiUrl);
      const responsePromise: Promise<any> = axiosPromise.then(response => response.data);
      toast.promise(responsePromise, {
        loading: 'Syncing listings with hostaway listing Please wait!',
        success: 'Listing synced successfully!',
        error: 'Something went wrong!',
      });
      return
    } catch (error) {
      console.log(error)
    }
  }
  function userSearchUi() {
    return (
      <div className=" border-gray-600 sm:flex">
        <div>
          <div className="flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Open options</span>
                    <BarsArrowDownIcon className="h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className=" absolute w-52 right-0 z-10 mt-2 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Guests with pending actions
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Cheking-In-Today
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Cheking-Out-Today
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Guests-In-House
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <input
                type="text"
                name="desktop-search-candidate"
                id="desktop-search-candidate"
                className="w-full rounded-md border-0 py-1.5 pl-10 pr-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:text-indigo-600"
                placeholder="Search..."
              // onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="m-5">
      <div className="sticky  top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
        <div className=" flex flex-1 justify-between px-6">
          <div className="flex flex-1">
            <div
              className={classNames(
                "ml-0",
                "text-lg md:text-2xl lg:text-2xl font-bold m-auto flex"
              )}
            >
              <div>Listings</div>
              <div className="pl-10 text-lg md:text-xl lg:text-2xl font-normal m-auto flex">
                {" "}
                {userSearchUi()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => syncHostawayListings()}
              className={classNames(
                "flex flex-row whitespace-nowrap",
                "bg-indigo-600 pr-4 text-sm text-white",
                "font-semibold py-1.5 px-2.5 border border-indigo-600 rounded items-center"
              )}
            >
              <PlusIcon
                className="text-white mr-4 flex-shrink-0 h-6 w-6"
                aria-hidden="true"
              />
              Fetch Listings
            </button>
            <button
              className={classNames(
                "flex flex-row whitespace-nowrap",
                "bg-indigo-600 pr-4 text-sm text-white",
                "font-semibold py-1.5 px-2.5 border border-indigo-600 rounded items-center"
              )}
            // onClick={() => handleButtonClick("create")}
            >
              <PlusIcon
                className="text-white mr-4 flex-shrink-0 h-6 w-6"
                aria-hidden="true"
              />
              Create listing group
            </button>
          </div>
        </div>
      </div>

      {projects && (
        <HotelListing projects={listdata} setSelectedItem={setSelectedItem} />
      )}
      {selectedItem && <HotelDetail selectedItem={selectedItem} />}
    </div>
  );
};

export default ListingMain;
