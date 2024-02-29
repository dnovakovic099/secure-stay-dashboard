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
            <div className="gap-20 max-h-[70vh] rounded-md">
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
                  <tr className=" text-black  bg-white items-center p-5 ">
                    <th className="pl-5 py-2 text-start ">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-black"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
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
                    <th className=" py-1 text-start text-sm text-black">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-ymt-2">
                  {upsells?.map((upsell, index) => (
                    <>
                      <tr
                        key={upsell.title}
                        className={`transition-all duration-300 ease-in-out mb-1 rounded-md hover:bg-indigo-100 overflow-hidden shadow-md md:table-row lg:table-row ${
                          selectedRows.includes(upsell.upSellId)
                            ? "bg-indigo-100"
                            : ""
                        } ${expandedRows.includes(index) ? "bg-gray-100" : ""}`}
                        style={{ position: "relative" }}
                      >
                        <td className="flex items-center gap-1 pl-1 whitespace-nowrap p-2">
                          <ListBulletIcon className="h-5 w-5" />
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-500"
                            checked={selectedRows.includes(upsell.upSellId)}
                            onChange={() =>
                              handleRowCheckboxChange(upsell.upSellId)
                            }
                          />
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

                        <td>
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
