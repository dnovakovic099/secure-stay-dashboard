"use client";
import { useState } from "react";

import UpsellDashboard from "./upselldashboard";

import {
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  CurrencyDollarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
const UpsellSettings = ({ children }: any) => {
  const [selectedMenu, setSelectedMenu] = useState("");

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    returnSelectedComponent(menu);
  };

  // Function to dynamically render the selected component
  const returnSelectedComponent = (menu: String) => {
    switch (menu) {
      case "Listing":
        return null;
      case "Upsells":
        return <UpsellDashboard />;
      case "Chat":
        return null;
      case "Guests":
        return null;
      case "Workplace":
        return null;
      default:
        return <UpsellDashboard />;
    }
  };
  interface AvatarProps {
    imageUrl: string;
    profileName: string;
    requiredText: string;
  }

  const Avatar: React.FC<AvatarProps> = ({
    imageUrl,
    profileName,
    requiredText,
  }) => {
    return (
      <div className="flex items-center space-x-4 ">
        <div className="flex items-center justify-between p-2 mx-4 bg-gray-100 rounded-md w-full">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 overflow-hidden rounded-full">
              <img
                src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_1280.png"
                alt="Profile Avatar"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {profileName}
              </p>
              <p className="text-sm text-gray-500">{requiredText}</p>
            </div>
          </div>
          <ChevronRightIcon className="w-6 h-6" />
        </div>
      </div>
    );
  };
  const avatarProps = {
    imageUrl: "path/to/your/image.jpg",
    profileName: "Stanton A.",
    requiredText: "Super Admin",
  };
  return (
    <div className="flex flex-col sm:flex-row gap-0 h-[90vh] w-full bg-gray-100">
      {/* Column 1 - Setting nav */}
      <div className="flex flex-col flex-grow py-4 bg-white max-h-[90vh] w-[8%]">
        <div className="mb-8">
          <ul className="flex flex-col gap-1 py-4 cursor-pointer">
            <li className="hover:bg-indigo-100 text-gray-500 p-3 rounded-md flex items-center space-x-2">
              <BuildingOffice2Icon className="w-6 h-6" />
              <span>Listing</span>
            </li>

            <li
              className={`${
                selectedMenu === "Upsells"
                  ? "border-l-2 border-indigo-700 text-indigo-700"
                  : "hover:bg-indigo-100 text-gray-500"
              } p-3 cursor-pointer flex items-center space-x-2`}
              onClick={() => handleMenuClick("Upsells")}
            >
              <CurrencyDollarIcon className="w-6 h-6" /> <span>Upsells</span>
            </li>
            <li className="hover:bg-indigo-100 text-gray-500 p-3 rounded-md flex items-center space-x-2">
              <ChatBubbleLeftRightIcon className="w-6 h-6" /> <span>Chat</span>
            </li>
            <li className="hover:bg-indigo-100 text-gray-500 p-3 rounded-md flex items-center space-x-2">
              <UserGroupIcon className="w-6 h-6" /> <span>Guests</span>
            </li>
            <li className="hover:bg-indigo-100 text-gray-500 p-3 rounded-md flex items-center space-x-2">
              <BriefcaseIcon className="w-6 h-6" /> <span>Workplace</span>
            </li>
          </ul>
        </div>
        <div className="mt-auto">
          <Avatar {...avatarProps} />
        </div>
      </div>
      {/* Column 2 - page components */}
      <div className="sm:w-4/5 h-[100%] overflow-hidden">
        {returnSelectedComponent(selectedMenu)}
      </div>
    </div>

    // </div>
  );
};
export default UpsellSettings;
