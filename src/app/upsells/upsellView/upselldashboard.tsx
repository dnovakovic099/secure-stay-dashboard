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
  ArrowDownOnSquareStackIcon,
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

  useEffect(() => {
    fetchData(currentPage, limit, title);
  }, [currentPage, limit]);

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

  const [showOptions, setShowOptions] = useState(false);

  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center  mr-auto bg-gray-100">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="w-[100%] bg-white px-5 py-2 gap-10">
            <div className="w-full mb-2 mt-2 flex justify-between items-center">
              <div className="w-[65%] flex justify-between items-center">
                <div className="w-1/4">
                  <h1 className="text-2xl font-semibold">
                    Upsells - <span>{totalData}</span>
                  </h1>
                </div>

                {/* here */}
                <div className="flex space-x-1 bg-gray-100 w-[70%] p-1 rounded-md">
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
                      className={`flex items-center justify-center w-full h-10 bg-gray-100 rounded-md cursor-pointer transition-transform ${
                        activeTab === tab
                          ? "bg-white text-black shadow-md"
                          : "hover:shadow-lg hover:scale-105 text-gray-500"
                      }`}
                      onClick={() => handleTabClick(tab)}
                    >
                      <div className="flex items-center space-x-2">
                        {/* {icon} */}
                        <h2 className="text-xs font-semibold">{label}</h2>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* here */}

              <div className="flex items-center space-x-4">
                {/* Search Bar */}

                {/* Filter Icon */}
                <div className="relative sm:mt-0 sm:ml-4 bg-gray-100 rounded-md py-1 px-3">
                  <label
                    className="flex justify-between items-center relative gap-2 h-10 cursor-pointer"
                    onClick={handleClick}
                  >
                    <ArrowDownOnSquareStackIcon className="w-5 h-5 text-black" />
                    <span className="text-black">customize</span>
                    {/* {showOptions && (
                      <select
                        className="absolute z-40 top-full left-0 w-full sm:w-32 border-2 border-black text-black py-2 px-2 pr-8 rounded-md leading-tight focus:outline-none focus:border-blue-500"
                        data-te-select-init
                        data-te-select-clear-button="true"
                        value={limit}
                        onChange={(e) => setLimit(parseInt(e.target.value, 10))}
                      >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                      </select>
                    )} */}
                  </label>
                </div>
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
    </div>
  );
};

export default UpsellDashboard;
