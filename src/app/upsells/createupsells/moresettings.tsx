import { useState } from "react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import {
  FaCaretRight,
  FaCaretLeft,
  FaCaretDown,
  FaCaretUp,
} from "react-icons/fa";
import AdditionalContent from "./associateListing";
import { Property } from "./page";

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
          <FaCaretLeft className="w-5 h-5 text-[#077AF1]" />
        ) : (
          <FaCaretRight className="w-5 h-5 text-[#077AF1]" />
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
                className="bg-white p-4 rounded-lg shadow-md border border-gray-300"
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
                    <FaCaretUp
                      className="w-5 h-5 text-[#077AF1]"
                      onClick={() => handleSettingClick(index)}
                    />
                  ) : (
                    <FaCaretDown
                      className="w-5 h-5 text-[#077AF1]"
                      onClick={() => handleSettingClick(index)}
                    />
                  )}
                </div>

                {selectedSetting === index && (
                  <div className="pt-2 mt-3 rounded-lg border border-black">
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
