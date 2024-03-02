import { HiPencil } from 'react-icons/hi2';
import { PiBuildingsLight } from 'react-icons/pi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { RiRoadMapLine } from 'react-icons/ri';
import { GoPeople } from 'react-icons/go';
import { FaWifi } from 'react-icons/fa6';
import { IoLockOpenOutline } from 'react-icons/io5';

const Address = ({ selectedItem }: any) => {
  return (
    <div className="flex mt-4 text-gray-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 w-full">
        <div className="h-20 border-b flex items-center gap-4 px-5 bg-white hover:bg-gray-50 transition duration-300">
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 font-light mb-1">Street</p>
            <p className="text-md text-gray-800 font-semibold">
              {selectedItem.street}
            </p>
          </div>
        </div>

        <div className="h-20 border-b flex items-center gap-4 px-5 bg-white hover:bg-gray-50 transition duration-300">
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 font-light mb-1">City</p>
            <p className="text-md text-gray-800 font-semibold">
              {selectedItem.city}
            </p>
          </div>
        </div>

        <div className="h-20 border-b flex items-center gap-4 px-5 bg-white hover:bg-gray-50 transition duration-300">
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 font-light mb-1">State</p>
            <p className="text-md text-gray-800 font-semibold">
              {selectedItem.state}
            </p>
          </div>
        </div>

        <div className="h-20 border-b flex items-center gap-4 px-5 bg-white hover:bg-gray-50 transition duration-300">
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 font-light mb-1">Country</p>
            <p className="text-md text-gray-800 font-semibold">
              {selectedItem.country}
            </p>
          </div>
        </div>

        <div className="h-20 border-b flex items-center gap-4 px-5 bg-white hover:bg-gray-50 transition duration-300">
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 font-light mb-1">
              Country Code
            </p>
            <p className="text-md text-gray-800 font-semibold">
              {selectedItem.countryCode}
            </p>
          </div>
        </div>

        <div className="h-20 border-b flex items-center gap-4 px-5 bg-white hover:bg-gray-50 transition duration-300">
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 font-light mb-1">Zip Code</p>
            <p className="text-md text-gray-800 font-semibold">
              {selectedItem.zipcode}
            </p>
          </div>
        </div>

        <div className="h-20 border-b flex items-center gap-4 px-5 bg-white hover:bg-gray-50 transition duration-300">
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 font-light mb-1">Latitude</p>
            <p className="text-md text-gray-800 font-semibold">
              {selectedItem.lat}° N
            </p>
          </div>
        </div>

        <div className="h-20 border-b flex items-center gap-4 px-5 bg-white hover:bg-gray-50 transition duration-300">
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 font-light mb-1">Longitude</p>
            <p className="text-md text-gray-800 font-semibold">
              {selectedItem.lng}° W
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
