import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import ToggleBuujjjs from "./associateListing";
import AdditionalContent from "./associateListing";
import { Property } from "./createUpsells";

interface ChildProps {
  attachedProperties: Property[];
  setAttachedProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  fetchListingData: () => void;
}

const MoreSettings: React.FC<ChildProps> = ({
  attachedProperties,
  setAttachedProperties,
  fetchListingData,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setSelectedSetting(null);
  };

  const handleSettingClick = (settingIndex: any) => {
    // Handle the click for each setting here
    if (selectedSetting === settingIndex) {
      setSelectedSetting(null);
    } else {
      setSelectedSetting(settingIndex);
    }
  };

  const settingsList = [
    {
      title: "Attache Properties/Rental",
      description: "All properties attached",
    },
  ];

  return (
    <>
      <div
        className="flex items-center cursor-pointer w-fit"
        onClick={toggleSettings}
      >
        {showSettings ? (
          <ChevronUpIcon className="w-6 h-6 text-blue-700" />
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 5C7.5 4.29 8.32167 3.91916 8.8525 4.3475L8.9225 4.41083L13.9225 9.41083C14.066 9.55433 14.1522 9.74524 14.1649 9.94776C14.1776 10.1503 14.116 10.3505 13.9917 10.5108L13.9225 10.5892L8.9225 15.5892L8.84417 15.6583L8.78 15.7033L8.7 15.7483L8.67 15.7625L8.61417 15.785L8.52417 15.8117L8.48 15.82L8.43 15.8283L8.3825 15.8317L8.28417 15.8317L8.23583 15.8275L8.18583 15.82L8.1425 15.8117L8.0525 15.785L7.99667 15.7625L7.88667 15.7042L7.81167 15.65L7.74417 15.5892L7.675 15.5108L7.63 15.4467L7.585 15.3667L7.57083 15.3367L7.54833 15.2808L7.52167 15.1908L7.51333 15.1467L7.505 15.0967L7.50167 15.0492L7.5 5Z"
              fill="#077AF1"
            />
          </svg>
        )}
        <h6 className="text-sm font-medium text-[#077AF1] uppercase ml-2">
          More Settings
        </h6>
      </div>

      <div className="relative">
        {showSettings && (
          <div className="mt-4 space-y-8 border-2 shadow-lg p-3 w-[560px]">
            {settingsList?.map((setting, index) => (
              <div
                key={index}
                className="bg-white py-4 rounded-lg shadow-md border border-gray-300"
              >
                <div
                  className="px-5 flex justify-between relative select-none cursor-pointer"
                  onClick={() => handleSettingClick(index)}
                >
                  <div>
                    <h2 className="text-sm font-semibold">{setting.title}</h2>
                    <p className="text-gray-500 text-xs">
                      {setting.description}
                    </p>
                  </div>
                  {selectedSetting === index ? (
                    <ChevronUpIcon
                      className="w-6 h-6 text-blue-700"
                      onClick={() => handleSettingClick(index)}
                    />
                  ) : (
                    <ChevronDownIcon
                      className="w-6 h-6 text-blue-700"
                      onClick={() => handleSettingClick(index)}
                    />
                  )}
                </div>

                {selectedSetting === index && (
                  <div className="pt-2 mt-3 rounded-lg border border-t-black">
                    <AdditionalContent
                      attachedProperties={attachedProperties}
                      setAttachedProperties={setAttachedProperties}
                      fetchListingData={fetchListingData}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default MoreSettings;
