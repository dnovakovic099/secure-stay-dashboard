import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export default function CommonTabs({
  tab,
  onClick,
  iconClick,
  iconPosition,
}: any) {
  const [usertab, setUsertab] = useState(tab);
  const [activeTab, setActiveTab] = useState(1);
  useEffect(() => {
    setUsertab(tab)
  }, [tab])

  const onChangeTab = (tabId: any) => {
    const newState = usertab.map((tab: any, i: any) => {
      if (tabId == tab.id) {
        onClick({ ...tab, current: true });
        return { ...tab, current: true };
      } else {
        return { ...tab, current: false };
      }
    });
    setUsertab(newState);
    setActiveTab(tabId);
  };
  return (
    <div>
      <div className="hidden sm:block cursor-pointer">
        <div className="border-b border-gray-200 flex">
          {iconClick != undefined && iconPosition == "left" && (
            <div
              className="flex items-center"
              onClick={() => iconClick(tab.length)}
            >
              <ChevronLeftIcon
                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </div>
          )}
          <div>
            <nav className="-mb-px flex space-x-8 " aria-label="Tabs">
              {tab?.map((tab: any,) => (
                <div
                  key={tab.id}
                  onClick={() => onChangeTab(tab.id)}
                  className={classNames(
                    tab.id == activeTab
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700",
                    "flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.name.toUpperCase()}
                </div>
              ))}
            </nav>
          </div>
          {iconClick != undefined && iconPosition == "right" && (
            <div
              className="flex items-center"
              onClick={() => iconClick(tab.length)}
            >
              <ChevronRightIcon
                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
