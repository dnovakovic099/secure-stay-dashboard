import React, { useState } from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export default function CommonTabs({ tab, onClick }: any) {
  const [usertab, setUsertab] = useState(tab);
  const [activeTab, setActiveTab] = useState(1);

  const onChangeTab = (tabId: any, index: any) => {
    const newState = usertab.map((tab: any, i: any) => {
      if (index == i) {
        onClick({...tab, current: true });
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
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tab?.map((tab: any, index: any) => (
              <div key={index}>
                <div
                  key={index}
                  onClick={() => onChangeTab(tab.id, index)}
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
              
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
