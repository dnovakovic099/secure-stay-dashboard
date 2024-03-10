"use client";
import Navbar from "./upsellView/navbar";
import UpsellSettings from "./upsellView/upsellsidebar";
import { Suspense, useState } from "react";
import Loader from "./loading";

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

const Upsells = () => {
  const [upsells, setUpsells] = useState<Upsell[]>([]);
  const [title, setTitle] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleRowCheckboxChange = (index: number) => {
    const newSelectedRows = [...selectedRows];
    const selectedIndex = newSelectedRows.indexOf(index);

    if (selectedIndex !== -1) {
      newSelectedRows.splice(selectedIndex, 1);
    } else {
      newSelectedRows.push(index);
    }

    setSelectedRows(newSelectedRows);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 h-[100%]">
      <div className="min-w-full">
        <Suspense fallback={<Loader />}>
          <Navbar
            setUpsells={setUpsells}
            title={title}
            setTitle={setTitle}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            setTotalData={setTotalData}
            setSelectAll={setSelectAll}
            limit={limit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setIsLoading={setIsLoading}
          />
          <UpsellSettings
            upsells={upsells}
            setUpsells={setUpsells}
            title={title}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            handleRowCheckboxChange={handleRowCheckboxChange}
            totalData={totalData}
            setTotalData={setTotalData}
            selectAll={selectAll}
            setSelectAll={setSelectAll}
            limit={limit}
            setLimit={setLimit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Upsells;
