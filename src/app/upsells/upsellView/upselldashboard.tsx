"use client";

import { useState, useEffect } from "react";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import {
  Bars4Icon,
  ArrowRightIcon,
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
import { Upsell } from "../page";

interface Option {
  value: number;
  label: string;
}

interface upsellDashboardProps {
  upsells: Upsell[];
  setUpsells: any;
  title: string;
  selectedRows: number[];
  setSelectedRows: any;
  handleRowCheckboxChange: (index: number) => void;
  totalData: number;
  setTotalData: any;
  selectAll: boolean;
  setSelectAll: any;
  limit: number;
  setLimit: any;
  currentPage: number;
  setCurrentPage: any;
  isLoading: number;
  setIsLoading: any;
}

const UpsellDashboard: React.FC<upsellDashboardProps> = ({
  upsells,
  setUpsells,
  title,
  selectedRows,
  setSelectedRows,
  handleRowCheckboxChange,
  totalData,
  setTotalData,
  selectAll,
  setSelectAll,
  limit,
  setLimit,
  currentPage,
  setCurrentPage,
  isLoading,
  setIsLoading,
}) => {
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("manageUpsells");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<(() => void) | null>(null);
  const [dialogMessage, setDialogMessage] = useState("");
  const [numberOfActive, setNumberOfActive] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    fetchData(currentPage, limit, title);
  }, [currentPage, limit]);

  useEffect(() => {
    if (totalData > limit) {
      setTotalPages(Math.ceil(totalData / limit));
    } else {
      setTotalPages(1);
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
      setNumberOfActive(result.totalActive);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error occured");
      // Handle error
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allRows = upsells.map((upsell, index) => upsell.upSellId);
    setSelectedRows(selectAll ? [] : allRows);
  };

  const handleToggle = (index: number) => {
    let upsellStatus: any;

    for (const upsell of upsells) {
      if (upsell.upSellId === index) {
        upsellStatus = upsell.status === 1 ? 0 : 1;
        break;
      }
    }

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
        <div className="p-5 pt-4 bg-[#F4F6F8]">
          <ManageUpsell
            upsells={upsells}
            totalData={totalData}
            numberOfActive={numberOfActive}
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            handleRowCheckboxChange={handleRowCheckboxChange}
            handleToggle={handleToggle}
            selectedRows={selectedRows}
          />

          <div className="flex justify-center">
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

  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  const options: Option[] = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 100, label: "100" },
    { value: 500, label: "500" },
  ];

  const handleChange = (value: number) => {
    setLimit(value);
    setShowOptions(false);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center  mr-auto bg-gray-100">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="w-[100%] h-16 bg-white px-5 py-3">
            <div className="w-full flex justify-between items-center">
              <div className="w-[671px] flex justify-between items-center">
                <div className="w-[119px]">
                  <h1 className="text-xl leading-5 font-medium">
                    Upsells - <span>{totalData}</span>
                  </h1>
                </div>
                <div className="flex bg-[#F4F6F8] w-[492px] h-10 p-[3px] rounded-lg">
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
                      className={`flex items-center justify-center w-full rounded-md cursor-pointer transition-transform ${
                        activeTab === tab
                          ? "bg-white text-black drop-shadow-sm"
                          : "text-[#72767A]"
                      }`}
                      onClick={() => handleTabClick(tab)}
                    >
                      <h2 className="text-sm font-normal">{label}</h2>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                {/* Filter Icon */}
                <div className="relative">
                  <div className="relative">
                    <button
                      className="flex justify-between items-center gap-2 px-5 py-[11px] text-[#222222] bg-[#F4F6F8] border border-[#E9ECF3] text-sm font-medium rounded-lg leading-tight focus:outline-none"
                      onClick={handleClick}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_9473_2200)">
                          <path
                            d="M8 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V8"
                            stroke="#222222"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 6.66663H14"
                            stroke="#222222"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.66675 2V14"
                            stroke="#222222"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.334 12.6667C11.334 13.0203 11.4745 13.3595 11.7245 13.6095C11.9746 13.8596 12.3137 14 12.6673 14C13.0209 14 13.3601 13.8596 13.6101 13.6095C13.8602 13.3595 14.0007 13.0203 14.0007 12.6667C14.0007 12.3131 13.8602 11.9739 13.6101 11.7239C13.3601 11.4739 13.0209 11.3334 12.6673 11.3334C12.3137 11.3334 11.9746 11.4739 11.7245 11.7239C11.4745 11.9739 11.334 12.3131 11.334 12.6667Z"
                            stroke="#222222"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.6672 10.3334V11.3334"
                            stroke="#222222"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.6672 14V15"
                            stroke="#222222"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14.688 11.5L13.822 12"
                            stroke="#222222"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.5134 13.3334L10.6467 13.8334"
                            stroke="#222222"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.6467 11.5L11.5134 12"
                            stroke="#222222"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.822 13.3334L14.6887 13.8334"
                            stroke="#222222"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_9473_2200">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="text-black">Customize</span>
                    </button>
                    {showOptions && (
                      <ul className="absolute top-full left-0 z-20 bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden">
                        {options.map((option) => (
                          <li
                            key={option.value}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            <button onClick={() => handleChange(option.value)}>
                              {option.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%]">{renderTabContent()}</div>
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
    </div>
  );
};

export default UpsellDashboard;
