"use client";

import { useState } from "react";

import {
  Bars4Icon,
  ArrowRightIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/20/solid";

import ManageUpsell from "../upsellstabdata/manageupsell";
import Pagination from "@/components/commonPagination";
import { Toaster } from "react-hot-toast";
import Loader from "../loading";

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

interface ManageUpsellProps {
  upsells: Upsell[];
  selectAll: boolean;
  handleSelectAll: () => void;
  handleRowCheckboxChange: (index: number) => void;
  handleToggle: (index: number) => void;
  selectedRows: number[];
  setUpsells: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>;
  totalData: number;
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const UpsellDashboard: React.FC<ManageUpsellProps> = ({
  upsells,
  selectAll,
  handleSelectAll,
  handleRowCheckboxChange,
  handleToggle,
  selectedRows,
  totalData,
  totalPages,
  setCurrentPage,
  currentPage,
}) => {
  const [activeTab, setActiveTab] = useState("manageUpsells");
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    return (
      <div>
        <ManageUpsell
          upsells={upsells}
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
          handleRowCheckboxChange={handleRowCheckboxChange}
          handleToggle={handleToggle}
          selectedRows={selectedRows}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    );
    // if (activeTab === "manageUpsells") {
    //   return (
    //     <div>
    //       <ManageUpsell
    //         upsells={upsells}
    //         selectAll={selectAll}
    //         handleSelectAll={handleSelectAll}
    //         handleRowCheckboxChange={handleRowCheckboxChange}
    //         handleToggle={handleToggle}
    //         selectedRows={selectedRows}
    //         currentPage={currentPage}
    //         totalPages={totalPages}
    //         onPageChange={handlePageChange}
    //       />

    //     </div>
    //   );
    // }
    //  else if (activeTab === "upsellOrders") {
    //   return;
    // } else if (activeTab === "upsellRequest") {
    //   return;
    // }

    // return null;
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col  justify-items-start rounded-md  bg-gray-100">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="w-[100%] h-[64px] items-start bg-white px-5 py-3 rounded-md gap-10">
            <div className="flex items-center gap-10">
              <div>
                <h1 className="font-poppins font-[600] text-[20px]">
                  Upsells - <span>{totalData}</span>
                </h1>
              </div>
              <div className="flex justify-center bg-gray-200 w-[600px] h-[40px] rounded-md">
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
                ].map(({ label, icon, tab }) => (
                  <div
                    key={tab}
                    className={`flex items-center justify-center w-full h-[40px] pl-5 pr-5 bg-gray-100 text-black cursor-pointer transition-transform gap-2 ${
                      activeTab === tab
                        ? "border-b-2 rounded-md bg-white text-black font-[400] shadow-md"
                        : "hover:shadow-lg hover:scale-105 bg-[#F4F6F8]"
                    }`}
                    onClick={() => handleTabClick(tab)}
                  >
                    <div className="flex items-center font-[400] text-black">
                      {icon}
                    </div>
                    <h2 className="text-[14px] font-[400] text-black">
                      {label}
                    </h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[100%] rounded-lg px-5">
            <div className="col-span-2 m-4">{renderTabContent()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpsellDashboard;
