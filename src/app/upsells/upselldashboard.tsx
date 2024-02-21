"use client";

import { useState, Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  Bars4Icon,
  ArrowRightIcon,
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
  LinkIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import ManageUpsell from "./upsellstabdata/manageupsell";
import UpsellOrder from "./upsellstabdata/upsellorder";
import Pagination from "@/components/commonPagination";
import { Toaster, toast } from "react-hot-toast";
import CommonPopup from "@/components/commonPopup";
import { envConfig } from "@/utility/environment";

export interface Upsell {
  availability: string;
  description: string;
  image: string | null;
  isActive: boolean;
  price: string;
  status: number;
  timePeriod: string;
  title: string;
  upSellId: number;
}

const UpsellDashboard: React.FC = () => {
  const [totalData, setTotalData] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(totalData / limit);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [upsells, setUpsells] = useState<Upsell[]>([]);
  const [title, setTitle] = useState("");
  const [activeTab, setActiveTab] = useState("manageUpsells");

  useEffect(() => {
    fetchData(currentPage, limit, title);
    // setTotalPages(currentPage / limit);
  }, [currentPage, limit]);

  useEffect(() => {
    let timeoutId: any;

    const debounceApiCall = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchData(currentPage, limit, title);
      }, 500); // Adjust the debounce duration as needed
    };

    debounceApiCall();

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [title]);

  useEffect(() => {
    if (totalData > 10) {
      setTotalPages(Math.ceil(totalData / limit));

    }
  }, [totalData]);

  const fetchData = async (
    currentPage: number,
    limit: number,
    title: string
  ) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/upsell/upsellList?page=${currentPage}&limit=${limit}&title=${title}`; // Replace with your API endpoint
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const result: any = await handleApiCallFetch(apiUrl, params);
      // Handle successful data fetch
      setUpsells(result.data);
      setTotalData(result.length);
    } catch (error) {
      toast.error("Error occured");
      // Handle error
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateUpsell = () => {
    // Navigate to create screen in a new tab
    window.open("/upsells/createupsells", "_blank", "noopener,noreferrer");
  };

  const handleRequest = async (method: string, uri: string, data?: any) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/${uri}`;
      const response = await axios({
        method,
        url: apiUrl,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchData(currentPage, limit, title);
      // Handle the successful response here
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.message);
      // Handle errors here
      console.error("Error making request:", error.message);
    }
  };

  const handleDelete = () => {
    if (selectedRows.length === 0 || selectedRows === null) {
      toast.error("Please selcect data first");
      return;
    }
    handleRequest("POST", `upsell/delete-multiple`, {
      upSellIds: selectedRows,
    });
  };

  const handleActivate = () => {
    if (selectedRows.length === 0 || selectedRows === null) {
      toast.error("Please select data first");
      return;
    }
    handleRequest("PUT", "upsell/update-multiple-status", {
      upSellId: selectedRows,
      status: 1,
    });
  };

  const handleDeactivate = () => {
    <CommonPopup />;
    if (selectedRows.length === 0 || selectedRows === null) {
      toast.error("Please selcect data first");
      return;
    }
    handleRequest("PUT", "upsell/update-multiple-status", {
      upSellId: selectedRows,
      status: 0,
    });
  };

  const solutions = [
    {
      name: "Delete Upsell",
      icon: TrashIcon,
      onclick: handleDelete,
    },
    {
      name: "Activate Upsell",
      icon: LinkIcon,
      onclick: handleActivate,
    },
    {
      name: "Deactivate Upsell",
      icon: XCircleIcon,
      onclick: handleDeactivate,
    },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allRows = upsells.map((upsell, index) => upsell.upSellId);
    setSelectedRows(selectAll ? [] : allRows);
  };

  const handleRowCheckboxChange = (index: number) => {
    const newSelectedRows = [...selectedRows]; // Copy the array
    const selectedIndex = newSelectedRows.indexOf(index);

    if (selectedIndex !== -1) {
      newSelectedRows.splice(selectedIndex, 1); // Remove the index if it exists
    } else {
      newSelectedRows.push(index); // Add the index if it doesn't exist
    }

    setSelectedRows(newSelectedRows);
  };

  const handleToggle = (index: number) => {
    let upsellStatus;
    const updatedUpsells = [...upsells];
    updatedUpsells.map((upsell, i) => {
      if (upsell.upSellId === index) {
        upsell.status = upsell.status === 1 ? 0 : 1;
        upsellStatus = upsell.status;
      }
    });

    console.log(updatedUpsells);

    // updatedUpsells[index].status = updatedUpsells[index].status === 1 ? 0 : 1;
    setUpsells(updatedUpsells);
    handleRequest("PUT", "upsell/update-multiple-status", {
      upSellId: [index],
      status: upsellStatus,
    });
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                <label className="relative">
                  <select
                    className="block appearance-none w-full sm:w-32 bg-white border-2 border-gray-500 text-gray-700 py-2 px-4 pr-8 rounded-3xl leading-tight focus:outline-none focus:border-blue-500"
                    data-te-select-init
                    data-te-select-clear-button="true"
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value, 10))}
                  >
                    <option value="10">10</option>
                    <option value="20">25</option>
                    <option value="100">50</option>
                    <option value="500">100</option>
                  </select>
                  <ChevronDownIcon className="w-5 h-5 text-gray-500 absolute top-1/2 right-3 transform -translate-y-1/2" />
                </label>
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
                                        <item.icon
                                          aria-hidden="true"
                                          className="w-8 h-8 text-red-700"
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
