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

const NavBar = () => {
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

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  // Handler to close the popup
  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleCardClick = (item: any) => {
    router.push("/upsells/createupsells?template_id=${item.title}", item);
  };

  const handleCreateUpsell = () => {
    router.push("/upsells/createupsells");
  };

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

  const sampleImageUrl =
    "https://placehold.co/200x400/?text=Build+your%0Aown+upsells";

  const sampleTitle = "Start from Blank";
  const sampleDescription = "Lorem ipsum ";

  const data: any[] = [
    // { imageUrl: 'https://placekitten.com/300/200', title: 'Card 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: Math.random() * 100 },
    // { imageUrl: 'https://placehouse.com/300/200', title: 'Card 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: Math.random() * 100 },
  ];

  return (
    <div className="flex items-center bg-[#141B37] h-12">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center sm:w-1/5 border-r border-white pl-3 h-6">
          <img
            src="/assets/securestay.png "
            className="flex items-center h-10"
          />
        </div>

        <div className="flex items-center justify-between py-1 px-7 w-4/5 h-10">
          <div className="">
            <input
              type="text"
              className="px-3 py-2 h-8 bg-blue-950 text-gray-300 text-sm rounded-md focus:outline-none focus:border-blue-500 transition duration-300 placeholder-gray-300"
              placeholder="Search upsells here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-5 ml-auto">
            <div className="flex items-center gap-5 ml-auto">
              <button
                className="text-white px-4 py-1 rounded-full hover:bg-blue-600 transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-700"
                onClick={handleOpenPopup}
              >
                <PlusIcon className="ml-2 w-4 h-4 font-extrabold" /> Create
                Upsell
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
          </div>
        </div>
      </div>
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

export default NavBar;
