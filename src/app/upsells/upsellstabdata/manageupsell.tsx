"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import {
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";

import UpSellListing from "./upSellListing";
import { useRouter } from "next/navigation";
import Pagination from "@/components/commonPagination";
import { Upsell } from "../upsellView/upselldashboard";

interface ManageUpsellProps {
  upsells: Upsell[];
  selectAll: boolean;
  handleSelectAll: () => void;
  handleRowCheckboxChange: (index: number) => void;
  handleToggle: (index: number) => void;
  selectedRows: number[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const ManageUpsell: React.FC<ManageUpsellProps> = ({
  upsells,
  selectAll,
  handleSelectAll,
  handleRowCheckboxChange,
  handleToggle,
  selectedRows,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const router = useRouter();

  const handleEditUpsell = (data: any) => {
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

  const renderUpSell = upsells?.map((upsell, index) => (
    <>
      <tr
        key={upsell.upSellId}
        className={`grid grid-cols-12 transition-all duration-300 ease-in-out border-gray-200 border-b rounded-md hover:bg-indigo-100 overflow-hidden relative w-[1180px] h-[54px] md:table-row lg:table-row ${
          selectedRows.includes(upsell.upSellId) ? "bg-indigo-100" : ""
        } ${expandedRows.includes(index) ? "bg-gray-100" : ""}`}
      >
        <td className="col-span-3 flex justify-start mt-4  space-x-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-0.5"
          >
            <g clipPath="url(#clip0_9473_514)">
              <path
                d="M6.66675 4.16671C6.66675 4.38772 6.75455 4.59968 6.91083 4.75596C7.06711 4.91224 7.27907 5.00004 7.50008 5.00004C7.7211 5.00004 7.93306 4.91224 8.08934 4.75596C8.24562 4.59968 8.33341 4.38772 8.33341 4.16671C8.33341 3.94569 8.24562 3.73373 8.08934 3.57745C7.93306 3.42117 7.7211 3.33337 7.50008 3.33337C7.27907 3.33337 7.06711 3.42117 6.91083 3.57745C6.75455 3.73373 6.66675 3.94569 6.66675 4.16671Z"
                stroke="#72767A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66675 9.99996C6.66675 10.221 6.75455 10.4329 6.91083 10.5892C7.06711 10.7455 7.27907 10.8333 7.50008 10.8333C7.7211 10.8333 7.93306 10.7455 8.08934 10.5892C8.24562 10.4329 8.33341 10.221 8.33341 9.99996C8.33341 9.77895 8.24562 9.56698 8.08934 9.4107C7.93306 9.25442 7.7211 9.16663 7.50008 9.16663C7.27907 9.16663 7.06711 9.25442 6.91083 9.4107C6.75455 9.56698 6.66675 9.77895 6.66675 9.99996Z"
                stroke="#72767A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66675 15.8333C6.66675 16.0543 6.75455 16.2663 6.91083 16.4226C7.06711 16.5789 7.27907 16.6667 7.50008 16.6667C7.7211 16.6667 7.93306 16.5789 8.08934 16.4226C8.24562 16.2663 8.33341 16.0543 8.33341 15.8333C8.33341 15.6123 8.24562 15.4004 8.08934 15.2441C7.93306 15.0878 7.7211 15 7.50008 15C7.27907 15 7.06711 15.0878 6.91083 15.2441C6.75455 15.4004 6.66675 15.6123 6.66675 15.8333Z"
                stroke="#72767A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.6667 4.16671C11.6667 4.38772 11.7545 4.59968 11.9108 4.75596C12.0671 4.91224 12.2791 5.00004 12.5001 5.00004C12.7211 5.00004 12.93306 4.91224 13.0893 4.75596C13.2456 4.59968 13.3334 4.38772 13.3334 4.16671C13.3334 3.94569 13.2456 3.73373 13.0893 3.57745C12.9331 3.42117 12.7211 3.33337 12.5001 3.33337C12.2791 3.33337 12.0671 3.42117 11.9108 3.57745C11.7545 3.73373 11.6667 3.94569 11.6667 4.16671Z"
                stroke="#72767A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.6667 9.99996C11.6667 10.221 11.7545 10.4329 11.9108 10.5892C12.0671 10.7455 12.2791 10.8333 12.5001 10.8333C12.7211 10.8333 12.9331 10.7455 13.0893 10.5892C13.2456 10.4329 13.3334 10.221 13.3334 9.99996C13.3334 9.77895 13.2456 9.56698 13.0893 9.4107C7.93306 9.25442 7.7211 9.16663 7.50008 9.16663C7.27907 9.16663 7.06711 9.25442 6.91083 9.4107C6.75455 9.56698 6.66675 9.77895 6.66675 9.99996Z"
                stroke="#72767A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.6667 15.8333C11.6667 16.0543 11.7545 16.2663 11.9108 16.4226C12.0671 16.5789 12.2791 16.6667 12.5001 16.6667C12.7211 16.6667 12.9331 16.5789 13.0893 16.4226C13.2456 16.2663 13.3334 16.0543 13.3334 15.8333C13.3334 15.6123 13.2456 15.4004 13.0893 15.2441C12.9331 15.0878 12.7211 15 12.5001 15C12.2791 15 12.0671 15.0878 11.9108 15.2441C11.7545 15.4004 11.6667 15.6123 11.6667 15.8333Z"
                stroke="#72767A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_9473_514">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 mt-1 text-blue-500"
            checked={selectedRows.includes(upsell.upSellId)}
            onChange={() => handleRowCheckboxChange(upsell.upSellId)}
          />
          <p className="text-sm text-gray-700 font-[500]">{upsell.title}</p>
        </td>

        <td className="col-span-1 text-sm text-gray-700 font-[500]">
          {upsell.price}
        </td>
        <td className="col-span-2 text-sm text-gray-700 font-[500]">
          {upsell.timePeriod}
        </td>
        <td className="col-span-2 text-sm text-gray-700 font-[500]">
          {upsell.availability}
        </td>
        <td className="col-span-2 text-sm text-blue-500 font-[500]">6/17</td>
        {/* <td className=" py-3 text-sm">{upsell.isActive}</td> */}
        <td className="whitespace-nowrap col-span-1">
          <Switch
            checked={upsell.status === 1}
            onChange={() => handleToggle(upsell.upSellId)}
            className={`${upsell.status === 1 ? "bg-green-500" : "bg-gray-200"}
      relative inline-flex h-5 w-10 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                upsell.status === 1 ? "translate-x-5" : "translate-x-o"
              }
        pointer-events-none inline-block h-4 w-4 x- transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
            <span
              className={`absolute inset-0 flex items-center justify-between text-xs ${
                upsell.status === 0 ? "text-white" : "text-white"
              }`}
            >
              <span className="text-xs">{upsell.status === 1 ? "" : ""}</span>
            </span>
          </Switch>
        </td>

        <td className="flex justify-center col-span-1 space-x-4">
          <button
            className="text-gray-700 hover:text-indigo-800 focus:outline-none transition-all duration-300 text-3xl"
            onClick={() => {
              handleEditUpsell(upsell.upSellId);
            }}
          >
            <PencilIcon className="w-4 h-4 font-extrabold text-gray-700" />
          </button>

          <button
            className="hover:text-indigo-800 focus:outline-none transition-all duration-300 text-sm border-2 rounded-full bg-gray-200"
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
                      <p className="text-sm  text-black">Title</p>
                      <div className="flex flex-row gap-2 mt-1">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-500"
                          checked={selectedRows.includes(upsell.upSellId)}
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
                      <p className="text-sm  text-black ">Availability</p>
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
                          upsell.status === 1 ? "bg-green-500" : "bg-gray-400"
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
                            upsell.status === 0 ? "text-white" : "text-white"
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
        <tr key={upsell.upSellId}>
          <td colSpan={7} className="w-full pl-10 pr-10">
            <UpSellListing upsellid={upsell.upSellId} />
          </td>
        </tr>
      )}
    </>
  ));

  return (
    <div className="container mx-auto ">
      <div className="flex flex-col">
        <div className="-my-2 overflow-hidden sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-1">
            <div className="overflow-y-scroll  border-gray-200 sm:rounded-lg gap-20 min-h-[90vh] ">
              <table className="w-full border">
                <thead className=" bg-white shadow-md w-full sticky -top-1 z-10 ">
                  <tr className="text-black items-center rounded-md h-[39px]  ">
                    <th className="col-span-3 py-2 flex pl-7 items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-black"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                      <p className="py-1 text-start text-xs font-poppins font-bold text-black">
                        Title
                      </p>
                    </th>

                    <th className="col-span-1 py-1 text-start text-xs font-poppins font-bold text-black">
                      Price
                    </th>
                    <th className="col-span-2 py-1 text-start text-xs font-poppins font-bold text-black">
                      Period
                    </th>
                    <th className="col-span-2 py-1 text-start text-xs font-poppins font-bold text-black">
                      Availability
                    </th>
                    <th className="col-span-2 py-1 text-start text-xs font-poppins font-bold text-black">
                      Active Properties
                    </th>
                    <th className="col-span-1 py-1 text-start text-xs font-poppins font-bold text-black">
                      Status
                    </th>
                    <th className="col-span-1 py-1 text-center  text-xs font-poppins font-bold text-black">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white mt-2">{renderUpSell}</tbody>
              </table>
              <div className="flex justify-end px-10">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUpsell;
