"use client";

import { useState, Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
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
import CustomiseIcon from "../../assets/customize-icon.svg";
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
    <div className="flex flex-col justify-center h-[100%] w-[100%] rounded-md ml-1 mb-0">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white px-4 py-3 flex items-center basis-2">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold leading-6 font-poppins">
            Upsells — 14
          </p>
          <div
            className="inline-flex rounded-md shadow-sm bg-gray-100 ml-20"
            role="group"
          >
            <button
              onClick={() => handleTabClick("manageUpsells")}
              className={`px-6 py-1 ${
                activeTab === "manageUpsells"
                  ? " bg-white m-1 rounded-lg"
                  : " text-gray-500"
              }`}
            >
              Manage Upsells
            </button>
            <button
              className={`px-6 py-1 ${
                activeTab === "upsellOrders"
                  ? " bg-white m-1 rounded-lg"
                  : " text-gray-500"
              }`}
              onClick={() => handleTabClick("upsellOrders")}
            >
              Upsell Orders
            </button>
            <button className="px-6 py-1 text-gray-500">Upsell Requests</button>
          </div>
        </div>
        <div className="flex items-center justify-end grow">
          <button className="rounded-lg bg-gray-100 px-6 py-2 flex items-center">
            <Image
              src={CustomiseIcon}
              alt="icon"
              width={16}
              height={16}
              className="mr-1"
            />
            Customize
          </button>
        </div>
      </div>
      <div className="rounded-lg shadow-md px-4">
        <div className="grid grid-cols-2 mt-4 justify-center center gap-4">
          <div className="col-span-2">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default UpsellDashboard;
