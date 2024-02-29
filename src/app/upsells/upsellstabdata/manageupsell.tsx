"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import {
  PencilSquareIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { Upsell } from "../upselldashboard";
import UpSellListing from "./upSellListing";
import EditIcon from "../../../assets/edit.svg";
import DownIcon from "../../../assets/down.svg";
import DraggableIcon from "../../../assets/draggable.svg";

interface ManageUpsellProps {
  upsells: Upsell[];
  selectAll: boolean;
  handleSelectAll: () => void;
  handleRowCheckboxChange: (index: number) => void;
  handleToggle: (index: number) => void;
  selectedRows: number[];
  // Add other necessary props
}
const ManageUpsell: React.FC<ManageUpsellProps> = ({
  upsells,
  selectAll,
  handleSelectAll,
  handleRowCheckboxChange,
  handleToggle,
  selectedRows,
  //   ...otherProps
}) => {
  const handleEditUpsell = (data: any) => {
    // Navigate to the desired screen in a new tab
    window.open(
      `/upsells/createupsells?upsell_id=${data}`,
      "_blank",
      "noopener,noreferrer"
    );
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
    <div className="container">
      <div className="flex flex-col">
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg gap-20">
              <table
                className="w-full divide-y divide-gray-200"
                style={{
                  borderCollapse: "separate",
                  borderSpacing: "0",
                }}
              >
                <thead className="bg-gradient-to-r hidden sm:table-header-group bg-white">
                  <tr>
                    <th />
                    <th className="pl-2 pr-5 py-1 text-left flex items-center">
                      {" "}
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 mr-2"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                      Title
                    </th>
                    <th className="px-6 py-1 text-left">Price</th>
                    <th className="px-6 py-1 text-left">Period</th>
                    <th className="px-6 py-1 text-left">Availability</th>
                    <th className="px-6 py-1 text-left">Active Properties</th>
                    <th className="px-6 py-1 text-left">Status</th>
                    <th className="px-6 py-1 text-left">Action</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {upsells?.map((upsell, index) => (
                    <>
                      <tr
                        key={upsell.title}
                        className={`transition-all duration-300 ease-in-out hover:bg-gray-100 rounded-md overflow-hidden shadow-md hidden lg:table-row ${
                          expandedRows.includes(index) ? "bg-gray-100" : ""
                        }`}
                        style={{ position: "relative" }}
                      >
                        <td className="px-1 text-sm text-center mb-2 cursor-pointer whitespace-nowrap">
                          <Image
                            src={DraggableIcon}
                            height={16}
                            width={16}
                            alt="icon"
                          />
                        </td>
                        <td className="pl-2 pr-5 py-3 text-sm">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-500 mr-2"
                            checked={selectedRows.includes(upsell.upSellId)}
                            onChange={() =>
                              handleRowCheckboxChange(upsell.upSellId)
                            }
                          />
                          {upsell.title}
                        </td>
                        <td className="px-4 py-3 text-sm">{upsell.price}</td>
                        <td className="px-4 py-3 text-sm">
                          {upsell.timePeriod}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {upsell.availability}
                        </td>
                        <td className="px-4 py-3 text-sm">{upsell.isActive}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
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
                            ></span>
                          </Switch>
                        </td>

                        <td className="px-4 sm:px-6 py-3">
                          <button
                            className="text-indigo-600 hover:text-indigo-800 focus:outline-none transition-all duration-300 text-lg"
                            onClick={() => {
                              handleEditUpsell(upsell.upSellId);
                            }}
                          >
                            <Image
                              src={EditIcon}
                              height={20}
                              width={20}
                              alt="icon"
                            />
                          </button>
                          <button
                            className="text-indigo-600 hover:text-indigo-800 focus:outline-none transition-all duration-300 text-lg bg-gray-100 h-5 w-5 rounded-xl ml-2"
                            onClick={() => {
                              handleEditUpsell(upsell.upSellId);
                            }}
                          >
                            <Image
                              src={DownIcon}
                              height={20}
                              width={20}
                              alt="icon"
                            />
                          </button>
                        </td>
                      </tr>

                      <tr className="lg:hidden">
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
                                  <PencilSquareIcon
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
                                      <p className="text-sm  text-black ">
                                        Active Properties
                                      </p>
                                      <p className="text-md font-bold text-black">
                                        {upsell.isActive}
                                      </p>
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
                                        {upsell.isActive}
                                      </p>
                                    </div>
                                    <div className="mt-1">
                                      <p className="text-sm  text-black ">
                                        Status
                                      </p>
                                      <Switch
                                        checked={upsell.status === 1}
                                        onChange={() => handleToggle(index)}
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
