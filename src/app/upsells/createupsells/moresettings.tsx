import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import ToggleBuujjjs from "./associateListing";
import AdditionalContent from "./associateListing";
import { Property } from "./createUpsells";

interface ChildProps {
  attachedProperties: Property[];
  setAttachedProperties: React.Dispatch<React.SetStateAction<Property[]>>;
}

const MoreSettings: React.FC<ChildProps> = ({
  attachedProperties,
  setAttachedProperties,
}) => {
  const [showSettings, setShowSettings] = useState(true);
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
      title: "Setting 1",
      description: "Description 1",
      data: ["Data 1", "Data 2", "Data 3"],
    },
  ];

  return (
    <div>
      <div
        className="flex items-center cursor-pointer border-b border-gray-300 p-2 "
        onClick={toggleSettings}
      >
        {showSettings ? (
          <ChevronUpIcon className="w-6 h-6 text-blue-700" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 text-blue-700" />
        )}
        <h6 className="text-blue-700 ml-2">More Settings</h6>
      </div>

      <div className="relative">
        {showSettings && (
          <div className="mt-4 space-y-4 border-2 p-5">
            {settingsList?.map((setting, index) => (
              <div
                key={index}
                className="bg-white py-4 rounded-lg shadow-md border border-gray-300"
              >
                <div className="px-5 flex justify-between relative">
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
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default MoreSettings;
