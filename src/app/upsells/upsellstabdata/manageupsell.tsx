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
    <div className="container mx-auto ">
      <div className="flex flex-col">
        <div className="-my-2 overflow-hidden sm:-mr-10 sm:-ml-7">
          <div className="py-4 align-middle inline-block min-w-full sm:px-4 lg:px-1">
            <div className="gap-20 max-h-[70vh] rounded-md overflow-y-scroll">
              <table
                className="w-full bg-transparent"
                style={{
                  borderCollapse: "separate",
                  borderSpacing: "0 0.2rem",
                  alignItems: "baseline",
                }}
              >
                <thead className="bg-white text-black lg:table-header-group w-full sticky top-0 z-10">
                  {" "}
                  <tr className=" text-black  bg-white items-center p-5">
                    <th className="rounded-l-md">
                      <div className="flex items-center justify-end px-2 py-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-black"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </div>
                    </th>
                    <th className="py-1 text-start text-sm text-black w-44">
                      Title
                    </th>
                    <th className=" py-1 text-start text-sm text-black w-36">
                      Price
                    </th>
                    <th className=" py-1 text-start text-sm text-black w-52">
                      Period
                    </th>
                    <th className=" py-1 text-start text-sm text-black">
                      Availability
                    </th>
                    <th className=" py-1 text-start text-sm text-black">
                      Active Properties
                    </th>
                    <th className=" py-1 text-start text-sm text-black">
                      Status
                    </th>
                    <th className=" py-1 text-start text-sm text-black rounded-r-md">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y mt-2">
                  {upsells?.map((upsell, index) => (
                    <>
                      <tr
                        key={upsell.upSellId}
                        className={`transition-all duration-300 ease-in-out mb-1 hover:bg-indigo-100 overflow-hidden md:table-row lg:table-row ${
                          selectedRows.includes(upsell.upSellId)
                            ? "bg-indigo-100"
                            : ""
                        } ${expandedRows.includes(index) ? "bg-gray-100" : ""}`}
                        style={{ position: "relative" }}
                      >
                        <td className="rounded-l-md">
                          <div className="flex justify-between items-center px-2">
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
                              className="form-checkbox h-4 w-4 text-blue-500"
                              checked={selectedRows.includes(upsell.upSellId)}
                              onChange={() =>
                                handleRowCheckboxChange(upsell.upSellId)
                              }
                            />
                          </div>
                        </td>

                        <td className="text-sm text-gray-700 font-semibold">
                          {upsell.title}
                        </td>
                        <td className=" text-sm text-gray-700 font-semibold">
                          {upsell.price}
                        </td>
                        <td className=" text-sm text-gray-700 font-semibold">
                          {upsell.timePeriod}
                        </td>
                        <td className=" text-sm text-gray-700 font-semibold">
                          {upsell.availability}
                        </td>
                        <td className=" py-3 text-sm font-medium text-blue-400">
                          {numberOfActive}/{totalData}
                        </td>
                        <td className="whitespace-nowrap">
                          <Switch
                            checked={upsell.status === 1}
                            onChange={() => handleToggle(upsell.upSellId)}
                            className={`${
                              upsell.status === 1
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }
                    relative inline-flex h-6 w-12 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              className={`${
                                upsell.status === 1
                                  ? "translate-x-6"
                                  : "translate-x-o"
                              }
                      pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
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
                        </td>

                        <td className="rounded-r-md">
                          <button
                            className="text-gray-700 hover:text-indigo-800 focus:outline-none transition-all duration-300 text-3xl"
                            onClick={() => {
                              handleEditUpsell(upsell.upSellId);
                            }}
                          >
                            <PencilIcon className="w-8 h-6 font-extrabold text-gray-700" />
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
                              <ChevronDownIcon className="w-4 h-4 text-black font-black" />
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
                                      <p className="text-sm  text-black">
                                        Title
                                      </p>
                                      <div className="flex flex-row gap-2 mt-1">
                                        <input
                                          type="checkbox"
                                          className="form-checkbox h-5 w-5 text-blue-500"
                                          checked={selectedRows.includes(
                                            upsell.upSellId
                                          )}
                                          onChange={() =>
                                            handleRowCheckboxChange(
                                              upsell.upSellId
                                            )
                                          }
                                        />
                                        <h3 className="text-md font-extrabold text-black">
                                          {upsell.title}
                                        </h3>
                                      </div>
                                    </div>
                                    <div className="mt-1">
                                      <p className="text-sm  text-black ">
                                        Period
                                      </p>
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
                                      <p className="text-sm  text-black ">
                                        Price
                                      </p>
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
                                      <p className="text-sm  text-black ">
                                        Status
                                      </p>
                                      <Switch
                                        checked={upsell.status === 1}
                                        onChange={() =>
                                          handleToggle(upsell.upSellId)
                                        }
                                        className={`${
                                          upsell.status === 1
                                            ? "bg-green-500"
                                            : "bg-gray-400"
                                        } relative inline-flex h-6 w-12 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                                      >
                                        <span className="sr-only">
                                          Use setting
                                        </span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUpsell;
