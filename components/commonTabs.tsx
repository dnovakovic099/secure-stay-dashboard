import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
function CommonTabs({ tab, onClick, iconClick, iconPosition }: any) {
  console.log(iconClick, 'iconClick');
  const [usertab, setUsertab] = useState(tab);
  const [activeTab, setActiveTab] = useState(1);

  const onChangeTab = (tabId: any, index: any) => {
    const newState = usertab.map((tab: any, i: any) => {
      if (index == i) {
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
          <div>
            <nav className="-mb-px flex " aria-label="Tabs">
              {tab?.map((tab: any, index: any) => (
                <div
                  key={index}
                  onClick={() => onChangeTab(tab.id, index)}
                  className={classNames(
                    tab.id == activeTab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                    'flex whitespace-nowrap border-b-2 py-4 px-1 m-0 text-sm font-medium',
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name.toUpperCase()}
                </div>
              ))}
            </nav>
          </div>
          {iconClick != undefined && (
            <div
              className="flex items-center"
              onClick={() => iconClick(tab.length)}
            >
              {iconPosition === 'right' ? (
                <ChevronRightIcon
                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              ) : (
                <ChevronLeftIcon
                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommonTabs;
