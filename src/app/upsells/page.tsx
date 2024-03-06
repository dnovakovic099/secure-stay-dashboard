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
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [totalData, setTotalData] = useState(0);

  const handleRowCheckboxChange = (index: number) => {
    const newSelectedRows = [...selectedRows]; // Copy the array
    const selectedIndex = newSelectedRows.indexOf(index);

    if (selectedIndex !== -1) {
      newSelectedRows.splice(selectedIndex, 1); // Remove the index if it exists
    } else {
      newSelectedRows.push(index); // Add the index if it doesn't exist
    }

    setSelectedRows(newSelectedRows);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 h-[100%]">
      <div className="min-w-full">
        <Suspense fallback={<Loader />}>
          <Navbar
            upsells={upsells}
            setUpsells={setUpsells}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            totalData={totalData}
            setTotalData={setTotalData}
          />
          <UpsellSettings
            upsells={upsells}
            setUpsells={setUpsells}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            handleRowCheckboxChange={handleRowCheckboxChange}
            totalData={totalData}
            setTotalData={setTotalData}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Upsells;
