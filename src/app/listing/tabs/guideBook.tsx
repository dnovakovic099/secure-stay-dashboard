import React from "react";
import { BuildingStorefrontIcon, ChevronDownIcon, RectangleGroupIcon, TruckIcon } from "@heroicons/react/24/outline";

const GuideBook = () => {
  return (
    <div className="mt-4">
      <div className="text-lg font-semibold mb-4">Recommended guidebooks</div>
      <div className="flex flex-col gap-6">
        {/* Column 1 */}
        <div className="flex flex-row justify-between items-center border px-4 py-2 rounded-lg bg-slate-200">
          <div className="flex flex-col gap-1">
            <TruckIcon
              className="text-black flex-shrink-0 h-6 w-6"
              aria-hidden="true"
            />
            <div className="text-gray-900 font-medium">Parking Instructions</div>
          </div>
          <ChevronDownIcon
            className="text-black flex-shrink-0 h-6 w-6"
            aria-hidden="true"
          />
        </div>

        {/* Column 2 */}
        <div className="flex flex-row justify-between items-center border px-4 py-2 rounded-lg bg-slate-200">
          <div className="flex flex-col gap-1">
            <RectangleGroupIcon
              className="text-black flex-shrink-0 h-6 w-6"
              aria-hidden="true"
            />
            <div className="text-gray-900 font-medium">A/C & Heating</div>
          </div>
          <ChevronDownIcon
            className="text-black flex-shrink-0 h-6 w-6"
            aria-hidden="true"
          />
        </div>

        {/* Column 3 */}
        <div className="flex flex-row justify-between items-center border px-4 py-2 rounded-lg bg-slate-200">
          <div className="flex flex-col gap-1">
            <BuildingStorefrontIcon
              className="text-black flex-shrink-0 h-6 w-6"
              aria-hidden="true"
            />
            <div className="text-gray-900 font-medium">Local Restaurants</div>
          </div>
          <ChevronDownIcon
            className="text-black flex-shrink-0 h-6 w-6"
            aria-hidden="true"
          />
        </div>

      </div>

    </div>
  );
};

export default GuideBook;
