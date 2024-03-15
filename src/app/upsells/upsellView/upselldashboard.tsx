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
  activeProperties: number;
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
  activeProperties,
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
    // return (
    //   <div>
    //     <ManageUpsell
    //       upsells={upsells}
    //       selectAll={selectAll}
    //       handleSelectAll={handleSelectAll}
    //       handleRowCheckboxChange={handleRowCheckboxChange}
    //       handleToggle={handleToggle}
    //       selectedRows={selectedRows}
    //       currentPage={currentPage}
    //       totalPages={totalPages}
    //       onPageChange={handlePageChange}
    //     />
    //   </div>
    // );
    if (activeTab === "manageUpsells") {
      return (
        <div className="p-5 pt-4 bg-[#F4F6F8]">
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
            totalData={totalData}
            activeProperties={activeProperties}
          />
        </div>
      );
    } else if (activeTab === "upsellOrders") {
      return <div className="mt-5">This is the content for upsell orders</div>;
    } else if (activeTab === "upsellRequest") {
      return <div className="mt-5">This is the content for upsell request</div>;
    }

    return null;
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col  justify-items-start">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="w-[100%] h-16 items-start bg-white px-5 py-3 gap-10">
            <div className="flex items-center gap-10">
              <div>
                <h1 className="font-poppins text-xl leading-5 font-medium">
                  Upsells - <span>{totalData}</span>
                </h1>
              </div>
              <div className="flex bg-[#F4F6F8] w-[492px] h-10 p-[3px] rounded-lg">
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
                    className={`flex items-center justify-center w-full rounded-md cursor-pointer transition-transform ${
                      activeTab === tab
                        ? "bg-white text-[#222222] drop-shadow-sm"
                        : "text-[#72767A]"
                    }`}
                    onClick={() => handleTabClick(tab)}
                  >
                    {/* <div className="flex items-center font-[400] text-black">
                      {icon}
                    </div> */}
                    <h2 className="text-sm font-normal">{label}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[100%]">
            <div className="col-span-2">{renderTabContent()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpsellDashboard;
