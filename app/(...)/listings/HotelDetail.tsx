import CommonTabs from '@/components/commonTabs';
import { MapPinIcon, UserIcon } from '@heroicons/react/20/solid';
import { Switch } from '@headlessui/react';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { GoPencil } from 'react-icons/go';
import { IoChevronDownOutline } from 'react-icons/io5';
import Policies from './tabs/policies';
import GenetalInfo from './tabs/genetalInfo';
import Address from './tabs/address';
import CheckInandOut from './tabs/check-in-out';
import Device from './tabs/device';
import GuideBook from './tabs/guideBook';
import Picture from './tabs/picture';

import classNames from 'classnames';

const tabs = [
  { id: 1, name: 'General Information', href: '#', current: false },
  { id: 2, name: 'Address', href: '#', current: false },
  { id: 3, name: 'Check-in & Check-out', href: '#', current: false },
  { id: 4, name: 'Guidebook', href: '#', current: false },
  { id: 5, name: 'Policies & Custom fields', href: '#', current: false },
  { id: 6, name: 'Pictures', href: '#', current: false },
  { id: 7, name: 'Devices', href: '#', current: false },
];

export default function HotelDetail({ selectedItem }: any) {
  console.log(selectedItem, 'selectedItem');

  const [activeButton, setActiveButton] = useState<String>('listing');

  const [initialTabValue, setInitialTabValue] = useState(tabs[0]);
  const [renderTabs, setRenderTabs] = useState(tabs.slice(0, 5));
  const [lastRenderedIndex, setLastRenderedIndex] = useState(4);
  const [isToggle, setIsToggle] = useState(false);
  const [iconPosition, setIconPosition] = useState<'left' | 'right'>('right');

  useEffect(() => {}, [renderTabs]);
  useEffect(() => {}, [initialTabValue]);

  const handleButtonClick = (buttonName: string) => {
    if (activeButton !== buttonName) {
      setActiveButton(buttonName);
    }
  };

  const handleItemClick = (item: any) => {
    console.log('Hotel-details', item);
    // Handle the selected item here in the parent component
  };

  const handleTabClick = (item: any) => {
    setInitialTabValue(item);
    console.log('Selected handleTabClick:', item);
    // Handle the selected item here in the parent component
  };

  const renderNextTabs = (item: any) => {
    const nextIndex = lastRenderedIndex + 5;
    const nextRenderTabs = tabs.slice(item, nextIndex + 1);
    setRenderTabs(nextRenderTabs);
    setLastRenderedIndex(nextIndex);
  };

  const handleToggleChange = () => {
    setIsToggle(!isToggle);
  };

  return (
    <div className="m-6 grid grid-cols-3 gap-4 p-4 rounded-md bg-white shadow-lg relative">
      <div className="col-span-1 relative">
        <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg h-96">
          <Image
            src={selectedItem?.imageUrl}
            alt="Hotel Image"
            width={400}
            height={500}
            className="object-cover w-full h-full transition duration-300 ease-in-out transform hover:scale-105 rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 rounded-lg" />
        </div>
        <div className="absolute bottom-0 left-0 p-6 text-white bg-transparent w-full">
          <button className="p-1.5 px-5 text-sm bg-white text-black rounded-full">
            Hotel
          </button>
          <h3 className="font-semibold my-2 text-2xl text-white">
            {selectedItem?.name}
          </h3>
          <div className="flex items-center">
            <MapPinIcon
              className="block h-4 w-4 text-white hover:text-gray-500"
              aria-hidden="true"
            />
            <p className="mt-1 text-sm pl-2 text-white">
              {selectedItem?.address}
            </p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-white underline cursor-pointer">
              Preview Boarding Pass
            </div>
            <div className="flex items-center p-2 rounded-lg">
              <UserIcon
                className="block h-5 w-5 text-white hover:text-gray-500"
                aria-hidden="true"
              />
              <p className="mt-1 text-sm pl-2 text-white">4</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="inline-block">
          <button
            type="button"
            onClick={() => handleButtonClick('listing')}
            className={classNames(
              'inline-flex items-center px-3 py-2 text-sm font-semibold focus:outline-none transition duration-300',
              activeButton === 'listing'
                ? 'text-blue-500 border-b border-blue-500'
                : 'text-gray-500 border-b',
            )}
          >
            Listing Information
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick('automated')}
            className={classNames(
              'inline-flex items-center px-3 py-2 text-sm font-semibold focus:outline-none transition duration-300',
              activeButton === 'automated'
                ? 'text-blue-500 border-b border-blue-500'
                : 'text-gray-500 border-b',
            )}
          >
            Automated Message
          </button>
        </div>

        <div className="my-4">
          <div className="w-full bg-slate-50 rounded-md p-1">
            <div className="flex justify-between">
              <p className="bg-white px-4 py-2 rounded-md cursor-pointer">
                General Information
              </p>
              <p className="px-4 py-2 rounded-md cursor-pointer">Address</p>
              <p className="px-4 py-2 rounded-md cursor-pointer">
                Check-in & Check-out
              </p>
              <p className="px-4 py-2 rounded-md cursor-pointer">Guidebook</p>
              <p className="px-4 py-2 rounded-md cursor-pointer">
                Policies & Custom Fields
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 m-2">
          <div className="flex items-center justify-between bg-white">
            <div className="flex flex-col">
              <p className="text-sm font-light text-gray-500">Name</p>
              <h1 className="text-lg font-[600] text-gray-900 mt-1">
                Sun Set Hotel & villas
              </h1>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 w-[100px] text-sm font-semibold text-black border rounded-md"
              >
                <div className="flex items-center justify-center gap-1">
                  <IoChevronDownOutline />
                  <p className="text-left">English</p>
                </div>
              </button>

              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 w-[100px] text-sm font-semibold text-black border rounded-md bg-purple-50"
              >
                <div className="flex items-center justify-center gap-1">
                  <GoPencil className="text-md text-indigo-500" />
                  <p className="text-indigo-500 text-md">Edit</p>
                </div>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between bg-white">
            <div className="flex flex-col">
              <p className="text-sm font-light text-gray-500">Description</p>
              <p className="text-md text-gray-800 mt-1">
                The most beautiful sightes, monuments, well known and unknown
                places. You&apos;ll know a lot interesting stories about my city
                and will be enjoying of our monuments.
              </p>
            </div>
          </div>
        </div>
        <div className="border-b my-5 border-gray-100"></div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-200 h-24">Column 1</div>
          <div className="bg-gray-200 h-24">Column 1</div>
          <div className="bg-gray-200 h-24">Column 1</div>
          <div className="bg-gray-200 h-24">Column 1</div>
          <div className="bg-gray-200 h-24">Column 1</div>
          <div className="bg-gray-200 h-24">Column 1</div>
        </div>
      </div>

      <div className="col-span-1 flex items-center justify-between p-2 gap-5 rounded-md bg-red-50">
        <div className="text-sm text-red-900">
          <p className="p-1">
            This property is currently disabled and will not receive experiences
            & guest boarding pass.
          </p>
        </div>
        <div className="flex items-center p-1 bg-gray-300 rounded-full">
          <Switch
            checked={isToggle}
            onChange={handleToggleChange}
            className="relative inline-flex items-center justify-center w-8 h-4 cursor-pointer focus:outline-none"
          >
            <span
              className={`absolute left-0 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                isToggle
                  ? 'translate-x-full bg-indigo-600'
                  : 'translate-x-0 bg-gray-400'
              }`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}
