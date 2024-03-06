"use client";

import { useState, Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import { TrashIcon, LinkIcon, XCircleIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { toast } from "react-hot-toast";
import { envConfig } from "@/utility/environment";
import { CommonDialog } from "@/components/commonDailogBox";
import { useRouter } from "next/navigation";
import CommonPopup from "@/components/commonPopup";
import { Card } from "../createupsells/cardComponent";
import { Upsell } from "../page";

// export interface Upsell {
//   availability: string;
//   description: string;
//   image: string | null;
//   isActive: boolean;
//   price: string;
//   status: number;
//   timePeriod: string;
//   title: string;
//   upSellId: number;
// }

interface navBarProps {
  upsells: Upsell[];
  setUpsells: any;
  selectedRows: number[];
  setSelectedRows: any;
  totalData: number;
  setTotalData: any;
}

const NavBar: React.FC<navBarProps> = ({
  upsells,
  setUpsells,
  selectedRows,
  setSelectedRows,
  totalData,
  setTotalData,
}) => {
  const router = useRouter();
  // const [totalData, setTotalData] = useState(14);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectAll, setSelectAll] = useState(false);
  // const [selectedRows, setSelectedRows] = useState<number[]>([]);
  // const [upsells, setUpsells] = useState<Upsell[]>([]);
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

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchDataSearch(currentPage, limit, title);
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [title]);

  const data: any[] = [
    {
      imageUrl: "https://placekitten.com/300/200",
      title: "Card 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: Math.random() * 100,
    },
    {
      imageUrl: "https://placekitten.com/96/140",
      title: "Card 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: Math.random() * 100,
    },
    {
      imageUrl: "https://placekitten.com/200/138",
      title: "Card 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: Math.random() * 100,
    },
    {
      imageUrl: "https://placekitten.com/96/139",
      title: "Card 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: Math.random() * 100,
    },
    {
      imageUrl: "https://placekitten.com/96/140",
      title: "Card 5",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: Math.random() * 100,
    },
    {
      imageUrl: "https://placekitten.com/300/200",
      title: "Card 6",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: Math.random() * 100,
    },
    {
      imageUrl: "https://placekitten.com/96/140",
      title: "Card 7",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: Math.random() * 100,
    },
    {
      imageUrl: "https://placekitten.com/200/139",
      title: "Card 8",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: Math.random() * 100,
    },
    {
      imageUrl: "https://placekitten.com/200/139",
      title: "Card 9",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: Math.random() * 100,
    },
    {
      imageUrl: "https://placekitten.com/408/287",
      title: "Card 10",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: Math.random() * 100,
    },
    {
      imageUrl: "https://placekitten.com/200/286",
      title: "Card 11",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: Math.random() * 100,
    },
  ];

  return (
    <div className="flex items-center bg-[#141B37] h-[60px] min-w-[1440px]">
      <div className="flex justify-between items-center w-full px-5 py-2">
        <div className="flex items-center justify-between min-w-[200px]">
          <img
            src="/assets/securestay.png "
            className="flex items-center h-11"
          />
          <svg
            width="1"
            height="24"
            viewBox="0 0 1 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0.5"
              y1="2.3677e-08"
              x2="0.499999"
              y2="24"
              stroke="#1F284D"
            />
          </svg>
        </div>

        <div className="flex items-center justify-between flex-grow pl-5 py-[2px]">
          <div className="flex items-center justify-between bg-[#1F284D] w-[400px] h-10 px-3 py-[10px] rounded-lg">
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.0258 13.8473L18.5947 17.4162L17.4162 18.5947L13.8473 15.0258C12.564 16.0525 10.9366 16.6666 9.16663 16.6666C5.02663 16.6666 1.66663 13.3066 1.66663 9.16663C1.66663 5.02663 5.02663 1.66663 9.16663 1.66663C13.3066 1.66663 16.6666 5.02663 16.6666 9.16663C16.6666 10.9366 16.0525 12.564 15.0258 13.8473ZM13.3539 13.229C14.3729 12.1788 15 10.7463 15 9.16663C15 5.94371 12.3895 3.33329 9.16663 3.33329C5.94371 3.33329 3.33329 5.94371 3.33329 9.16663C3.33329 12.3895 5.94371 15 9.16663 15C10.7463 15 12.1788 14.3729 13.229 13.3539L13.3539 13.229Z"
                  fill="#DBD4E5"
                />
              </svg>
              <input
                type="text"
                className="h-5 bg-[#1F284D] text-[#DBD4E5] text-sm rounded-md focus:outline-none"
                placeholder="Search upsells here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.33333 15H11.6667V13.3333H8.33333V15ZM2.5 5V6.66667H17.5V5H2.5ZM5 10.8333H15V9.16667H5V10.8333Z"
                fill="#DBD4E5"
              />
            </svg>
          </div>

          <div className="flex items-center ml-auto h-10">
            <div className="flex items-center gap-[10px] ml-auto">
              <button
                className="flex items-center gap-[10px] px-5 py-[10px] h-10 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 bg-gradient-to-r from-[#9E49F2] to-[#7000FF]"
                onClick={handleOpenPopup}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_9473_1844)">
                    <path
                      d="M10 4.16663V15.8333"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.16675 10H15.8334"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_9473_1844">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Create Upsell
              </button>
              <div className="flex items-center h-10">
                <Popover className="relative h-10">
                  {({ open, close }) => (
                    <>
                      <Popover.Button>
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="40" height="40" rx="8" fill="#1F284D" />
                          <g clipPath="url(#clip0_9473_1818)">
                            <path
                              d="M19.3333 20C19.3333 20.1769 19.4035 20.3464 19.5285 20.4714C19.6535 20.5965 19.8231 20.6667 19.9999 20.6667C20.1767 20.6667 20.3463 20.5965 20.4713 20.4714C20.5963 20.3464 20.6666 20.1769 20.6666 20C20.6666 19.8232 20.5963 19.6537 20.4713 19.5286C20.3463 19.4036 20.1767 19.3334 19.9999 19.3334C19.8231 19.3334 19.6535 19.4036 19.5285 19.5286C19.4035 19.6537 19.3333 19.8232 19.3333 20Z"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M19.3333 24.6667C19.3333 24.8435 19.4035 25.013 19.5285 25.1381C19.6535 25.2631 19.8231 25.3333 19.9999 25.3333C20.1767 25.3333 20.3463 25.2631 20.4713 25.1381C20.5963 25.013 20.6666 24.8435 20.6666 24.6667C20.6666 24.4899 20.5963 24.3203 20.4713 24.1953C20.3463 24.0702 20.1767 24 19.9999 24C19.8231 24 19.6535 24.0702 19.5285 24.1953C19.4035 24.3203 19.3333 24.4899 19.3333 24.6667Z"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M19.3333 15.3333C19.3333 15.5101 19.4035 15.6797 19.5285 15.8047C19.6535 15.9297 19.8231 16 19.9999 16C20.1767 16 20.3463 15.9297 20.4713 15.8047C20.5963 15.6797 20.6666 15.5101 20.6666 15.3333C20.6666 15.1565 20.5963 14.9869 20.4713 14.8619C20.3463 14.7369 20.1767 14.6666 19.9999 14.6666C19.8231 14.6666 19.6535 14.7369 19.5285 14.8619C19.4035 14.9869 19.3333 15.1565 19.3333 15.3333Z"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_9473_1818">
                              <rect
                                width="16"
                                height="16"
                                fill="white"
                                transform="translate(12 12)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2">
          <div key={0} onClick={() => handleCreateUpsell()}>
            <div className="w-[126px] items-center cursor-pointer">
              <div className="flex flex-col justify-center items-center gap-2 w-[126px] h-40 px-6 border border-[#6E3FF3] rounded-lg bg-gradient-to-r from-[#FFFFFF99] to-[#7000FF20]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.6">
                    <path
                      d="M8 16L16.7201 15.2733C19.4486 15.046 20.0611 14.45 20.3635 11.7289L21 6"
                      stroke="#4B4364"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 6H6.5M22 6H19.5"
                      stroke="#4B4364"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.5 6H16.5M13 9.5V2.5"
                      stroke="#4B4364"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 22C7.10457 22 8 21.1046 8 20C8 18.8954 7.10457 18 6 18C4.89543 18 4 18.8954 4 20C4 21.1046 4.89543 22 6 22Z"
                      stroke="#4B4364"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M17 22C18.1046 22 19 21.1046 19 20C19 18.8954 18.1046 18 17 18C15.8954 18 15 18.8954 15 20C15 21.1046 15.8954 22 17 22Z"
                      stroke="#4B4364"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 20H15"
                      stroke="#4B4364"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18"
                      stroke="#4B4364"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
                <p className="text-center text-[10px] leading-[14px] font-medium text-[#4B4364]">
                  Build your own upsell
                </p>
              </div>
            </div>
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
