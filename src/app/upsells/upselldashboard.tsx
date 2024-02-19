"use client";

import { useState, Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  Bars4Icon,
  ArrowRightIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";

import ManageUpsell from "./manageupsell";
import UpsellOrder from "./upsellorder";
import Pagination from "@/components/commonPagination";
import { Toaster, toast } from "react-hot-toast";
import CommonPopup from "@/components/commonPopup";
import { envConfig } from "@/utility/environment";

interface Upsell {
  title: string;
  price: number;
  period: string;
  availability: string;
  activeProperties: string;
  status: string;
}

const UpsellDashboard: React.FC = () => {
  const currentPage = 1;
  const totalPages = 10;

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const apiUrl = `your-api-url`; // Replace with your API endpoint
      const params = {
        // Define your fetch parameters (method, headers, etc.)
      };

      const result = await handleApiCallFetch(apiUrl, params);
      toast.success("meesage is succesfull");
      // Handle successful data fetch
      // setUpsellsData(resuls);
    } catch (error) {
      toast.error("Error occured");
      // Handle error
      // setUpsellsData(error);
    }
  };

  const handlePageChange = (page: number) => {
    // Add logic to handle page change
    console.log(`Page changed to ${page}`);
    // Update state or trigger data fetching based on the selected page
  };

  const handleCreateUpsell = () => {
    // Navigate to the desired screen in a new tab
    window.open("/upsells/createupsells", "_blank", "noopener,noreferrer");
  };

  const handlePostRequest = async (uri: String, postData: any) => {
    console.log(postData);

    try {
      const apiUrl = `${envConfig.backendUrl}/${uri}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        toast.error("Network response was not ok");
        throw new Error("Network response was not ok");
      }

      // Handle the successful response here
      const responseData = await response.json();
      toast.success("This is a success message!");
      console.log("Response data:", responseData);
    } catch (error: any) {
      toast.error("Error making POST request:", error.message);
      // Handle errors here
      console.error("Error making POST request:", error.message);
    }
  };

  const handleDelete = () => {
    if (selectedRows.size === 0 || selectedRows === null) {
      toast.error("Please selcect data first");
      return;
    }
    handlePostRequest("delete api", { id: selectedRows });
    console.log("Delete is clicked");
  };

  const handleActivate = () => {
    if (selectedRows.size === 0 || selectedRows === null) {
      toast.error("Please selcect data first");
      return;
    }
    handlePostRequest("activated api", { id: selectedRows });
    console.log("Delete is clicked");
  };

  const handleDeactivate = () => {
    <CommonPopup />;
    if (selectedRows.size === 0 || selectedRows === null) {
      toast.error("Please selcect data first");
      return;
    }
    handlePostRequest("deactivate api", { id: selectedRows });
    console.log("Delete is clicked");
  };

  const solutions = [
    {
      name: "Delete Upsell",
      icon: IconOne,
      onclick: handleDelete,
    },
    {
      name: "Activate Upsell",
      icon: IconOne,
      onclick: handleActivate,
    },
    {
      name: "Deactivate Upsell",
      icon: IconOne,
      onclick: handleDeactivate,
    },
  ];

  const [activeTab, setActiveTab] = useState("manageUpsells");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const [upsells, setUpsells] = useState<Upsell[]>([
    {
      title: "Pool Heating",
      price: 100,
      period: "Per Booking – Onetime",
      availability: "Always",
      activeProperties: "9/21",
      status: "ON",
    },
    {
      title: "Late Check-IN",
      price: 100,
      period: "Per Booking Onetime",
      availability: "Always",
      activeProperties: "9/21",
      status: "ON",
    },
    {
      title: "Early Check-in",
      price: 150,
      period: "Per Booking Onetime",
      availability: "Always",
      activeProperties: "16/21",
      status: "OFF",
    },
    {
      title: "Late Check-out",
      price: 50,
      period: "Per Booking Onetime",
      availability: "Always",
      activeProperties: "12/23",
      status: "ON",
    },
    {
      title: "Pool Heating",
      price: 100,
      period: "Per Booking Onetime",
      availability: "Always",
      activeProperties: "9/21",
      status: "OFF",
    },
    {
      title: "Pool Heating",
      price: 100,
      period: "Per Booking Onetime",
      availability: "Always",
      activeProperties: "9/21",
      status: "OFF",
    },
    {
      title: "Pool Heating",
      price: 100,
      period: "Per Booking Onetime",
      availability: "Always",
      activeProperties: "9/21",
      status: "ON",
    },
    {
      title: "Early Check-in",
      price: 150,
      period: "Per Booking Onetime",
      availability: "Always",
      activeProperties: "16/21",
      status: "ON",
    },
    {
      title: "Late Check-out",
      price: 50,
      period: "Per Booking Onetime",
      availability: "Always",
      activeProperties: "12/23",
      status: "ON",
    },
    {
      title: "Pool Heating",
      price: 100,
      period: "Per Booking Onetime",
      availability: "Always",
      activeProperties: "9/21",
      status: "ON",
    },
  ]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allRows = upsells.map((_, index) => index);
    setSelectedRows(selectAll ? new Set() : new Set(allRows));
  };

  const handleRowCheckboxChange = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleToggle = (index: number) => {
    const updatedUpsells = [...upsells];
    updatedUpsells[index].status =
      updatedUpsells[index].status === "ON" ? "OFF" : "ON";
    setUpsells(updatedUpsells);
  };

  const renderTabContent = () => {
    if (activeTab === "manageUpsells") {
      return (
        <ManageUpsell
          upsells={upsells}
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
          handleRowCheckboxChange={handleRowCheckboxChange}
          handleToggle={handleToggle}
          selectedRows={selectedRows}
        />
      );
    } else if (activeTab === "upsellOrders") {
      return <UpsellOrder />;
    }
    return null;
  };

  function IconOne() {
    return (
      <svg
        width="25"
        height="25"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
          stroke="#FB923C"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
      </svg>
    );
  }
  return (
    <div className="flex flex-col justify-center p-10 h-[100%] rounded-md ml-auto mr-auto bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-6xl rounded-lg p-10 bg-white shadow-md">
        <div className="grid grid-cols-2 gap-10">
          <div className="grid grid-rows-2">
            <div className="flex justify-start items-center gap-2">
              <h1 className="text-2xl font-bold text-blue-700">Upsells</h1>
              <h2 className="flex justify-start mt-1 text-gray-500">
                <QuestionMarkCircleIcon className="w-6 h-6" />
              </h2>
            </div>
            <p className="text-blue-400 sm:whitespace-nowrap !important">
              View & manage your upsells
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-start sm:flex-row  items-stretch gap-5 focus:border-blue-300 transition">
          <div className="flex items-center border-2 shadow-md p-2 px-5 max-w-md bg-white rounded-full focus:border-blue-300 transition w-full sm:w-auto">
            <div className="flex items-center w-full sm:w-64">
              <input
                type="text"
                className="w-full border-none focus:outline-none bg-white focus:border-blue-300 transition"
                placeholder="Search by keywords"
              />
              <div className="ml-2 w-4 h-4 font-extrabold">
                <MagnifyingGlassIcon className="text-blue-800" />
              </div>
            </div>
          </div>

          {/* Other elements you want to keep in the same line */}
          <div className="flex justify-between items-center w-full gap-5">
            <div className="sm:mt-0 sm:flex items-center">
              {activeTab === "upsellOrders" && (
                <button className="bg-blue-500 text-white px-4 py-1.5 rounded-3xl border-2 border-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-2">
                  Export
                </button>
              )}
              <div className="relative  sm:mt-0 sm:ml-4">
                <select
                  className="block appearance-none w-full sm:w-32  bg-white border-2 border-gray-500 text-gray-700 py-2 px-4 pr-8 rounded-3xl leading-tight focus:outline-none focus:border-blue-500"
                  data-te-select-init
                  data-te-select-clear-button="true"
                >
                  <option value="1">10</option>
                  <option value="2">20</option>
                  <option value="4">100</option>
                  <option value="5">500</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 7l5 5 5-5H5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              {activeTab === "manageUpsells" && (
                <div className="flex justify-between items-center gap-5 ml-auto">
                  <button
                    className="bg-blue-700  text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 flex items-center gap-2"
                    onClick={handleCreateUpsell}
                  >
                    <PlusIcon className="ml-2 w-4 h-4 font-extrabold" /> Create
                    Upsell
                  </button>
                  <div>
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
                            <Popover.Panel className="absolute right-1 z-20 mt-2 w-screen max-w-sm translate-x-1 transform px-4 sm:px-0 lg:max-w-sm">
                              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                <div className="relative grid gap-1 bg-white p-2 lg:grid-cols-1">
                                  {solutions.map((item) => (
                                    <button
                                      key={item.name}
                                      className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                                      onClick={item.onclick}
                                    >
                                      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                        <item.icon aria-hidden="true" />
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
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-4 justify-center center gap-4">
          <div
            className={`flex items-center justify-center w-full h-14 bg-gray-300 text-gray-700 rounded-md cursor-pointer hover:shadow-lg transform hover:scale-105 transition-transform ${
              activeTab === "manageUpsells"
                ? "border-b-4 border-white bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                : "bg-gray-300 text-gray-700 "
            }`}
            onClick={() => handleTabClick("manageUpsells")}
          >
            <div className="flex items-center gap-x-3">
              <Bars4Icon className="w-6 h-6" />
              <h2 className="text-lg font-bold">Manage Upsells</h2>
            </div>
          </div>

          <div
            className={`flex items-center justify-center w-full h-14 bg-gray-300 text-gray-700 rounded-md cursor-pointer hover:shadow-lg transform hover:scale-105 transition-transform ${
              activeTab === "upsellOrders"
                ? "border-b-4 border-white bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                : "bg-gray-300 text-gray-700 "
            }`}
            onClick={() => handleTabClick("upsellOrders")}
          >
            <div className="flex items-center gap-x-3">
              <ArrowRightIcon className="w-4 h-4" />
              <h2 className="text-lg font-bold">Upsell Orders</h2>
            </div>
          </div>
          <div className="col-span-2">{renderTabContent()}</div>
        </div>

        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UpsellDashboard;
