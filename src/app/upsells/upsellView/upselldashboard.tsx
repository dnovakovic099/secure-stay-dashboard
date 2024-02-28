"use client";

import { useState, Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import {
  PlusIcon,
  Bars4Icon,
  ArrowRightIcon,
  TrashIcon,
  LinkIcon,
  XCircleIcon,
  CircleStackIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import ManageUpsell from "../upsellstabdata/manageupsell";
import UpsellOrder from "../upsellstabdata/upsellorder";
import Pagination from "@/components/commonPagination";
import { Toaster, toast } from "react-hot-toast";
import { envConfig } from "@/utility/environment";
import { CommonDialog } from "@/components/commonDailogBox";
import Loader from "../loading";
import { useRouter } from "next/navigation";
import CommonPopup from "@/components/commonPopup";
import { Card } from "../createupsells/cardComponent";

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
  const router = useRouter();
  const [totalData, setTotalData] = useState(14);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(totalData / limit);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [upsells, setUpsells] = useState<Upsell[]>([]);
  const [title, setTitle] = useState("");
  const [activeTab, setActiveTab] = useState("manageUpsells");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<(() => void) | null>(null);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isPopupOpen, setPopupOpen] = useState(false);

  // Handler to open the popup
  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  // Handler to close the popup
  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    fetchData(currentPage, limit, title);
  }, [currentPage, limit]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchDataSearch(currentPage, limit, title);
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [title]);

  useEffect(() => {
    if (totalData > 14) {
      setTotalPages(Math.ceil(totalData / limit));
    }
  }, [totalData, limit]);

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
      setIsLoading(true);
      const result: any = await handleApiCallFetch(apiUrl, params);
      setIsLoading(false);
      // Handle successful data fetch
      setUpsells(result.data);
      setTotalData(result.length);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error occured");
      // Handle error
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCardClick = (item: any) => {
    router.push("/upsells/createupsells?template_id=${item.title}", item);
  };

  const handleCreateUpsell = () => {
    router.push("/upsells/createupsells");
  };

  const handleRequest = async (method: string, uri: string, data?: any) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/${uri}`;
      setIsLoading(true);

      const response = await axios({
        method,
        url: apiUrl,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Handle the successful response here
      fetchData(currentPage, limit, title);
      setIsLoading(false);
      setSelectAll(false);
      setSelectedRows([]);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
      // Handle errors here
      console.error("Error making request:", error.message);
    }
  };

  const handleDialogAction = () => {
    if (dialogAction) {
      dialogAction();
      setDialogOpen(false);
      setDialogAction(null);
      setDialogMessage("");
    }
  };

  const openDialog = (action: () => void, message: string) => {
    setDialogAction(() => action);
    setDialogMessage(message);
    setDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedRows.length === 0 || selectedRows === null) {
      toast.error("Please select upsells");
      return;
    }

    openDialog(
      () =>
        handleRequest("POST", `upsell/delete-multiple`, {
          upSellIds: selectedRows,
        }),
      "Are you sure you want to delete all selected upsells?"
    );
  };

  const handleActivate = () => {
    if (selectedRows.length === 0 || selectedRows === null) {
      toast.error("Please select upsells");
      return;
    }

    openDialog(
      () =>
        handleRequest("PUT", "upsell/update-multiple-status", {
          upSellId: selectedRows,
          status: 1,
        }),
      "Are you sure you want to activate all selected upsells?"
    );
  };

  const handleDeactivate = () => {
    if (selectedRows.length === 0 || selectedRows === null) {
      toast.error("Please select upsells");
      return;
    }

    openDialog(
      () =>
        handleRequest("PUT", "upsell/update-multiple-status", {
          upSellId: selectedRows,
          status: 0,
        }),
      "Are you sure you want to deactivate all selected upsells?"
    );
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
    let upsellStatus: any;
    const updatedUpsells = [...upsells];
    updatedUpsells.map((upsell, i) => {
      if (upsell.upSellId === index) {
        upsellStatus = !upsell.status;
      }
    });

    console.log(updatedUpsells);

    // updatedUpsells[index].status = updatedUpsells[index].status === 1 ? 0 : 1;
    // setUpsells(updatedUpsells);
    // handleRequest("PUT", "upsell/update-multiple-status", {
    //   upSellId: [index],
    //   status: upsellStatus,
    // });

    openDialog(
      () =>
        handleRequest("PUT", "upsell/update-multiple-status", {
          upSellId: [index],
          status: upsellStatus,
        }),
      upsellStatus
        ? "Are you sure you want to enable this Upsell for all rentals?"
        : "Are you sure you want to disable this Upsell for all rentals?"
    );
  };

  const renderTabContent = () => {
    if (activeTab === "manageUpsells") {
      return (
        <div>
          <ManageUpsell
            upsells={upsells}
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            handleRowCheckboxChange={handleRowCheckboxChange}
            handleToggle={handleToggle}
            selectedRows={selectedRows}
          />

          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      );
    } else if (activeTab === "upsellOrders") {
      return <UpsellOrder />;
    } else if (activeTab === "upsellRequest") {
      return <div className="mt-5">This is the content for upsell request</div>;
    }

    return null;
  };

  const fetchDataSearch = async (
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
      setIsLoading(false);
      toast.error("Error occured");
      // Handle error
    }
  };

  const sampleImageUrl =
    "https://placehold.co/200x400/?text=Build+your%0Aown+upsells";

  const sampleTitle = "Start from Blank";
  const sampleDescription = "Lorem ipsum ";

  const data: any[] = [
    // { imageUrl: 'https://placekitten.com/300/200', title: 'Card 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: Math.random() * 100 },
    // { imageUrl: 'https://placehouse.com/300/200', title: 'Card 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: Math.random() * 100 },
  ];

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center  mr-auto bg-gray-100">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="w-[100%] bg-white px-5 py-2 gap-10">
            <div className="mb-2 mt-2 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold">
                  Upsells - <span>{totalData}</span>
                </h1>
              </div>

              {/* here */}
              <div className="flex justify-start space-x-1 w-[50%] mt-1 bg-gray-200 p-1 rounded-md">
                {[
                  {
                    label: "Manage Upsells",
                    icon: <Bars4Icon className="w-4 h-4" />,
                    tab: "manageUpsells",
                  },
                  {
                    label: "Upsell Orders",
                    icon: <ArrowRightIcon className="w-3 h-3" />,
                    tab: "upsellOrders",
                  },
                  {
                    label: "Upsell Request",
                    icon: <ArrowPathRoundedSquareIcon className="w-3 h-3" />,
                    tab: "upsellRequest",
                  },
                ].map(({ label, tab }) => (
                  <div
                    key={tab}
                    className={`flex items-center justify-center w-full h-10 bg-gray-200 text-gray-700 rounded-md cursor-pointer transition-transform ${
                      activeTab === tab
                        ? "bg-white text-black shadow-md"
                        : "hover:shadow-lg hover:scale-105"
                    }`}
                    onClick={() => handleTabClick(tab)}
                  >
                    <div className="flex items-center space-x-2">
                      {/* {icon} */}
                      <h2 className="text-xs font-bold">{label}</h2>
                    </div>
                  </div>
                ))}
              </div>
              {/* here */}

              <div className="flex items-center space-x-4">
                {/* Search Bar */}
                {/* <input  ******change here*****
                  type="text"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 placeholder-gray-500"
                  placeholder="Search..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                /> */}

                {/* Filter Icon */}
                <div className="relative sm:mt-0 sm:ml-4">
                  <label className="flex justify-items-center relative">
                    <select
                      className="block appearance-none w-full sm:w-32border-2 border-black text-black py-2 px-2 pr-8 rounded-md leading-tight focus:outline-none focus:border-blue-500"
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
                    <CircleStackIcon className="w-5 h-5 text-gray-500 absolute top-1/2 right-3 transform -translate-y-1/2" />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-row  justify-between w-[100%] bg-white px-5 py-2 ">
              <div>
                {activeTab === "manageUpsells" && (
                  <div className="flex justify-start items-center mt-2 gap-5 ml-auto">
                    <button
                      className="text-white px-4 py-1 rounded-full hover:bg-blue-600 transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-700"
                      onClick={handleOpenPopup}
                    >
                      <PlusIcon className="ml-2 w-4 h-4 font-extrabold" />{" "}
                      Create Upsell
                    </button>
                    <div>
                      <Popover className="relative">
                        {({ open, close }) => (
                          <>
                            <Popover.Button
                              className={`
                          ${open ? "text-white" : "text-white/90"}
                          group inline-flex items-center justify-center rounded-full bg-gray-400 w-8 h-8 text-base font-bold hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
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
                                        onClick={() => {
                                          item.onclick();
                                          close(); // Close the Popover after the button is clicked
                                        }}
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
          <div className="w-[100%] rounded-lg px-5">
            <div className="col-span-2 mt-1 ml-2 mr-2">
              {renderTabContent()}
            </div>
          </div>
        </div>
      )}

      <CommonDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setDialogAction(null);
          setDialogMessage("");
        }}
        onYes={handleDialogAction}
        message={dialogMessage}
      />

      <CommonPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Create Upsell"
        disableCloseIcon={false}
        heightwidth="max-w-[100%] max-h-[100%]"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-1">
          <div key={0} onClick={() => handleCreateUpsell()}>
            <Card
              imageUrl={sampleImageUrl}
              title={sampleTitle}
              description={sampleDescription}
            />
          </div>

          {data.map((item, index) => (
            <div key={index} onClick={() => handleCardClick(item)}>
              <Card {...item} />
            </div>
          ))}
        </div>
      </CommonPopup>
    </div>
  );
};

export default UpsellDashboard;
