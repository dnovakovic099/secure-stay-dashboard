import React from 'react';
import {
  BuildingStorefrontIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  RectangleGroupIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

const GuideBook = () => {
  return (
    <div className="mt-4">
      <div className="text-lg font-semibold text-gray-800 mb-4">
        Recommended Guidebooks
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Guidebook 1 */}
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between transition duration-300 hover:shadow-xl">
          <div className="flex items-center gap-3">
            <TruckIcon className="text-gray-800 h-8 w-8" aria-hidden="true" />
            <div>
              <div className="text-gray-900 font-semibold">
                Parking Instructions
              </div>
              <div className="text-gray-600 text-sm">
                Learn about parking options
              </div>
            </div>
          </div>
          <ChevronRightIcon
            className="text-gray-600 h-6 w-6"
            aria-hidden="true"
          />
        </div>

        {/* Guidebook 2 */}
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between transition duration-300 hover:shadow-xl">
          <div className="flex items-center gap-3">
            <RectangleGroupIcon
              className="text-gray-800 h-8 w-8"
              aria-hidden="true"
            />
            <div>
              <div className="text-gray-900 font-semibold">A/C & Heating</div>
              <div className="text-gray-600 text-sm">
                Keep your space comfortable
              </div>
            </div>
          </div>
          <ChevronRightIcon
            className="text-gray-600 h-6 w-6"
            aria-hidden="true"
          />
        </div>

        {/* Guidebook 3 */}
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between transition duration-300 hover:shadow-xl">
          <div className="flex items-center gap-3">
            <BuildingStorefrontIcon
              className="text-gray-800 h-8 w-8"
              aria-hidden="true"
            />
            <div>
              <div className="text-gray-900 font-semibold">
                Local Restaurants
              </div>
              <div className="text-gray-600 text-sm">
                Discover nearby dining spots
              </div>
            </div>
          </div>
          <ChevronRightIcon
            className="text-gray-600 h-6 w-6"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default GuideBook;
