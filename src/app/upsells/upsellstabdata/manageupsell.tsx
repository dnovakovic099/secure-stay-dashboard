"use client";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import {
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { Upsell } from "../upsellView/upselldashboard";
import UpSellListing from "./upSellListing";
import { useRouter } from "next/navigation";

interface ManageUpsellProps {
  upsells: Upsell[];
  totalData: number;
  numberOfActive: number;
  selectAll: boolean;
  handleSelectAll: () => void;
  handleRowCheckboxChange: (index: number) => void;
  handleToggle: (index: number) => void;
  selectedRows: number[];
  // Add other necessary props
}
const ManageUpsell: React.FC<ManageUpsellProps> = ({
  upsells,
  totalData,
  numberOfActive,
  selectAll,
  handleSelectAll,
  handleRowCheckboxChange,
  handleToggle,
  selectedRows,
  //   ...otherProps
}) => {
  const router = useRouter();

  const handleEditUpsell = (data: any) => {
    // Navigate to the desired screen in a new tab
    router.push(`/upsells/createupsells?upsell_id=${data}`);
  };

  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const handleToggleRow = (index: number) => {
    const newExpandedRows = [...expandedRows];
    if (newExpandedRows.includes(index)) {
      newExpandedRows.splice(newExpandedRows.indexOf(index), 1);
    } else {
      newExpandedRows.push(index);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="max-h-[65vh] rounded-md overflow-y-scroll">
      <table
        className="w-full bg-transparent border-separate"
        style={{
          borderSpacing: "0 4px",
          alignItems: "baseline",
        }}
      >
        <thead className="h-[39px] bg-white text-black lg:table-header-group w-full sticky top-0 z-10">
          {" "}
          <tr className=" text-black items-center">
            <th className="rounded-l w-[59px]">
              <div className="flex items-center justify-end pl-[5px] gap-[6px] pr-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-black"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </div>
            </th>
            <th className="text-start text-[10px] uppercase leading-[11px] font-bold text-[#222222] w-60">
              Title
            </th>
            <th className="text-start text-[10px] uppercase leading-[11px] font-bold text-[#222222] w-36">
              Price
            </th>
            <th className="text-start text-[10px] uppercase leading-[11px] font-bold text-[#222222] w-56">
              Period
            </th>
            <th className="text-start text-[10px] uppercase leading-[11px] font-bold text-[#222222] w-36">
              Availability
            </th>
            <th className="text-start text-[10px] uppercase leading-[11px] font-bold text-[#222222] w-40">
              Active Properties
            </th>
            <th className="text-start text-[10px] uppercase leading-[11px] font-bold text-[#222222] w-28">
              Status
            </th>
            <th className="text-start text-[10px] uppercase leading-[11px] font-bold text-[#222222] rounded-r">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y">
          {upsells?.map((upsell, index) => (
            <>
              <tr
                key={upsell.upSellId}
                className={`transition-all h-[54px] duration-300 ease-in-out mb-1 hover:bg-[#FBF9FF] overflow-hidden md:table-row lg:table-row ${
                  selectedRows.includes(upsell.upSellId) || !upsell.status
                    ? "bg-[#FBF9FF]"
                    : ""
                } ${expandedRows.includes(index) ? "bg-gray-100" : ""}`}
                style={{ position: "relative" }}
              >
                <td className="rounded-l">
                  <div className="flex justify-between items-center pl-[5px] gap-[6px] pr-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_9473_1864)">
                        <path
                          d="M6.66663 4.16671C6.66663 4.38772 6.75442 4.59968 6.9107 4.75596C7.06698 4.91224 7.27895 5.00004 7.49996 5.00004C7.72097 5.00004 7.93293 4.91224 8.08921 4.75596C8.2455 4.59968 8.33329 4.38772 8.33329 4.16671C8.33329 3.94569 8.2455 3.73373 8.08921 3.57745C7.93293 3.42117 7.72097 3.33337 7.49996 3.33337C7.27895 3.33337 7.06698 3.42117 6.9107 3.57745C6.75442 3.73373 6.66663 3.94569 6.66663 4.16671Z"
                          stroke="#72767A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.66663 9.99996C6.66663 10.221 6.75442 10.4329 6.9107 10.5892C7.06698 10.7455 7.27895 10.8333 7.49996 10.8333C7.72097 10.8333 7.93293 10.7455 8.08921 10.5892C8.2455 10.4329 8.33329 10.221 8.33329 9.99996C8.33329 9.77895 8.2455 9.56698 8.08921 9.4107C7.93293 9.25442 7.72097 9.16663 7.49996 9.16663C7.27895 9.16663 7.06698 9.25442 6.9107 9.4107C6.75442 9.56698 6.66663 9.77895 6.66663 9.99996Z"
                          stroke="#72767A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.66663 15.8333C6.66663 16.0543 6.75442 16.2663 6.9107 16.4226C7.06698 16.5789 7.27895 16.6667 7.49996 16.6667C7.72097 16.6667 7.93293 16.5789 8.08921 16.4226C8.2455 16.2663 8.33329 16.0543 8.33329 15.8333C8.33329 15.6123 8.2455 15.4004 8.08921 15.2441C7.93293 15.0878 7.72097 15 7.49996 15C7.27895 15 7.06698 15.0878 6.9107 15.2441C6.75442 15.4004 6.66663 15.6123 6.66663 15.8333Z"
                          stroke="#72767A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.6666 4.16671C11.6666 4.38772 11.7544 4.59968 11.9107 4.75596C12.067 4.91224 12.2789 5.00004 12.5 5.00004C12.721 5.00004 12.9329 4.91224 13.0892 4.75596C13.2455 4.59968 13.3333 4.38772 13.3333 4.16671C13.3333 3.94569 13.2455 3.73373 13.0892 3.57745C12.9329 3.42117 12.721 3.33337 12.5 3.33337C12.2789 3.33337 12.067 3.42117 11.9107 3.57745C11.7544 3.73373 11.6666 3.94569 11.6666 4.16671Z"
                          stroke="#72767A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.6666 9.99996C11.6666 10.221 11.7544 10.4329 11.9107 10.5892C12.067 10.7455 12.2789 10.8333 12.5 10.8333C12.721 10.8333 12.9329 10.7455 13.0892 10.5892C13.2455 10.4329 13.3333 10.221 13.3333 9.99996C13.3333 9.77895 13.2455 9.56698 13.0892 9.4107C12.9329 9.25442 12.721 9.16663 12.5 9.16663C12.2789 9.16663 12.067 9.25442 11.9107 9.4107C11.7544 9.56698 11.6666 9.77895 11.6666 9.99996Z"
                          stroke="#72767A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.6666 15.8333C11.6666 16.0543 11.7544 16.2663 11.9107 16.4226C12.067 16.5789 12.2789 16.6667 12.5 16.6667C12.721 16.6667 12.9329 16.5789 13.0892 16.4226C13.2455 16.2663 13.3333 16.0543 13.3333 15.8333C13.3333 15.6123 13.2455 15.4004 13.0892 15.2441C12.9329 15.0878 12.721 15 12.5 15C12.2789 15 12.067 15.0878 11.9107 15.2441C11.7544 15.4004 11.6666 15.6123 11.6666 15.8333Z"
                          stroke="#72767A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_9473_1864">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={selectedRows.includes(upsell.upSellId)}
                      onChange={() => handleRowCheckboxChange(upsell.upSellId)}
                    />
                  </div>
                </td>

                <td className="text-start text-sm text-[#222222] font-medium">
                  {upsell.title}
                </td>
                <td className="text-start text-sm text-[#222222] font-medium">
                  {upsell.price}
                </td>
                <td className="text-start text-sm text-[#222222] font-medium">
                  {upsell.timePeriod}
                </td>
                <td className="text-start text-sm text-[#222222] font-medium">
                  {upsell.availability}
                </td>
                <td className="text-sm font-medium text-[#077AF1]">
                  {numberOfActive}/{totalData}
                </td>
                <td className="whitespace-nowrap">
                  <Switch
                    checked={upsell.status === 1}
                    onChange={() => handleToggle(upsell.upSellId)}
                    className={`${
                      upsell.status === 1 ? "bg-[#28B323]" : "bg-[#DDE2E4]"
                    }
                    relative inline-flex h-5 w-10 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        upsell.status === 1 ? "translate-x-5" : "translate-x-o"
                      }
                      pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </td>

                <td className="rounded-r">
                  <button
                    className="text-gray-700 hover:text-indigo-800 focus:outline-none transition-all duration-300 text-3xl"
                    onClick={() => {
                      handleEditUpsell(upsell.upSellId);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_9473_1883)">
                        <path
                          d="M3.33325 16.6666H6.66659L15.4166 7.91663C15.6355 7.69776 15.8091 7.43793 15.9275 7.15196C16.046 6.86599 16.1069 6.5595 16.1069 6.24997C16.1069 5.94044 16.046 5.63394 15.9275 5.34797C15.8091 5.06201 15.6355 4.80217 15.4166 4.5833C15.1977 4.36443 14.9379 4.19081 14.6519 4.07236C14.3659 3.95391 14.0594 3.89294 13.7499 3.89294C13.4404 3.89294 13.1339 3.95391 12.8479 4.07236C12.562 4.19081 12.3021 4.36443 12.0833 4.5833L3.33325 13.3333V16.6666Z"
                          stroke="#828282"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.25 5.41663L14.5833 8.74996"
                          stroke="#828282"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_9473_1883">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>

                  <button
                    className="hover:text-indigo-800 focus:outline-none transition-all duration-300 text-sm border-2 ml-5 rounded-full bg-gray-200"
                    onClick={() => handleToggleRow(index)}
                  >
                    {expandedRows.includes(index) ? (
                      /* Arrow pointing upwards when expanded */
                      <ChevronUpIcon className="w-4 h-4 text-black font-black" />
                    ) : (
                      /* Arrow pointing downwards when collapsed */
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8" clip-path="url(#clip0_9473_1860)">
                          <path
                            d="M4.5 6.75L9 11.25L13.5 6.75"
                            stroke="#222222"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_9473_1860">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                  </button>
                </td>
              </tr>
              <tr className="lg:hidden md:hidden">
                <td colSpan={7}>
                  <div className="bg-gradient-to-r from-indigo-100 to-purple-200 rounded-md  shadow-md mb-2 relative">
                    {/* Card Content */}
                    <div>
                      <button
                        style={{
                          position: "absolute",
                          bottom: "-15px",
                          right: 0,
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "#fff",
                          borderRadius: "40%/ 20%", // Adjusted for a circular shape
                          padding: "4px", // Adjusted for smaller padding
                          boxShadow: "none",
                          width: "24px", // Adjusted for a smaller width
                          height: "24px", // Adjusted for a smaller height
                        }}
                        className="bg-indigo-500 text-white rounded-bl-2xl p-2 hover:bg-indigo-700 focus:outline-none transition-all duration-300 text-sm pl-2"
                        onClick={() => handleToggleRow(index)}
                      >
                        {expandedRows.includes(index) ? (
                          <ArrowUpIcon className="w-4 h-4 text-blue-500" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 text-blue-500" />
                        )}
                      </button>

                      <div style={{ position: "relative" }}>
                        <button
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                          }}
                          className="bg-indigo-500 text-white rounded-bl-2xl p-2 hover:bg-indigo-700 focus:outline-none transition-all duration-300 text-lg pl-2"
                          onClick={() => {
                            handleEditUpsell(index);
                          }}
                        >
                          <PencilIcon
                            className="w-4 h-4 text-white"
                            style={{ color: "white" }}
                          />
                        </button>
                      </div>
                      <div className="px-6 py-2 md:px-20">
                        <div className="flex justify-between items-center gap-3 mt-2 mr-1">
                          <div>
                            <div>
                              <p className="text-sm  text-black">Title</p>
                              <div className="flex flex-row gap-2 mt-1">
                                <input
                                  type="checkbox"
                                  className="form-checkbox h-5 w-5 text-blue-500"
                                  checked={selectedRows.includes(
                                    upsell.upSellId
                                  )}
                                  onChange={() =>
                                    handleRowCheckboxChange(upsell.upSellId)
                                  }
                                />
                                <h3 className="text-md font-extrabold text-black">
                                  {upsell.title}
                                </h3>
                              </div>
                            </div>
                            <div className="mt-1">
                              <p className="text-sm  text-black ">Period</p>
                              <p className="text-md font-bold text-black">
                                {upsell.timePeriod}
                              </p>
                            </div>
                            <div className="mt-1">
                              {/* <p className="text-sm  text-black ">
                                        Active Properties
                                      </p>
                                      <p className="text-md font-bold text-black">
                                        {upsell.isActive}
                                      </p> */}
                            </div>
                          </div>
                          <div>
                            <div>
                              <p className="text-sm  text-black ">Price</p>
                              <p className="text-md font-bold text-black">
                                {upsell.price}
                              </p>
                            </div>
                            <div className="mt-1">
                              <p className="text-sm  text-black ">
                                Availability
                              </p>
                              <p className="text-md font-bold text-black">
                                {upsell.availability}
                              </p>
                            </div>
                            <div className="mt-1">
                              <p className="text-sm  text-black ">Status</p>
                              <Switch
                                checked={upsell.status === 1}
                                onChange={() => handleToggle(upsell.upSellId)}
                                className={`${
                                  upsell.status === 1
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                } relative inline-flex h-6 w-12 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                              >
                                <span className="sr-only">Use setting</span>
                                <span
                                  aria-hidden="true"
                                  className={`${
                                    upsell.status === 1
                                      ? "translate-x-6"
                                      : "translate-x-o"
                                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                                <span
                                  className={`absolute inset-0 flex items-center justify-between text-xs ${
                                    upsell.status === 0
                                      ? "text-white"
                                      : "text-white"
                                  }`}
                                >
                                  ON
                                  <span className="text-xs">
                                    {upsell.status === 1 ? "" : "OFF"}
                                  </span>
                                </span>
                              </Switch>
                            </div>
                          </div>
                        </div>
                        {/* Include other details as needed */}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              {expandedRows.includes(index) && (
                <tr>
                  <td colSpan={7} className="w-full pl-10">
                    <UpSellListing upsellid={upsell.upSellId} />
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUpsell;
