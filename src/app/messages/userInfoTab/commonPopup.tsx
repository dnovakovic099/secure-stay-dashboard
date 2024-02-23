import { Dialog, Transition } from "@headlessui/react";
import {
  BuildingOfficeIcon,
  BuildingOffice2Icon,
  HomeIcon,
  XMarkIcon,
  HomeModernIcon,
  WrenchScrewdriverIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/20/solid";
import React, { Fragment, useRef, useState } from "react";

const CommonPopup = ({ open, setOpen }: any) => {
  const cancelButtonRef = useRef(null);

  const tabs = [
    { name: "All Lisings", icon: BuildingOfficeIcon, current: false },
    { name: "Current Lising Group ", icon: HomeModernIcon, current: false },
    { name: "Specific Listings", icon: HomeIcon, current: true },
  ];

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  function TabUi() {
    return (
      <div>
        <div className="hidden sm:block my-4">
          <nav
            className="isolate flex divide-x divide-gray-200 border border-gray-300 rounded-lg shadow"
            aria-label="Tabs"
          >
            {tabs.map((tab, tabIdx) => (
              <a
                key={tab.name}
                className={classNames(
                  tab.current
                    ? "text-indigo-400"
                    : "text-gray-500 hover:text-gray-700",
                  tabIdx === 0 ? "rounded-l-lg" : "",
                  tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <div className="flex items-center gap-2">
                  <div>{<tab.icon className="h-5 w-5" />}</div>
                  <span>{tab.name}</span>
                </div>
              </a>
            ))}
          </nav>
        </div>
      </div>
    );
  }

  const editConnectedList = () => {
    return (
      <>
        <div className="border border-gray-300 rounded-md h-20 p-4 flex justify-between">
          <div>
            <div className="text-gray-900 text-sm font-semibold">
              7 Listings
            </div>
            <div className="text-gray-900 text-sm font-normal mt-2 flex justify-between items-center">
              {" "}
              Edit settings below to customize your fee for these listings
            </div>
          </div>
          <div>
            <button
              type="button"
              className="rounded-full bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit connected listings
            </button>
          </div>
        </div>
      </>
    );
  };

  const addCondition = () => {
    return (
      <div className="mt-5">
        <div className="text-gray-900 text-sm font-normal mt-2 ">
          <div className="flex gap-2">
            <div>
              <WrenchScrewdriverIcon
                className="h-4 w-4 text-gray-800 hover:text-gray-600 cursor-pointer"
                aria-hidden="true"
              />
            </div>
            <div className="text-gray-900 text-sm font-semibold">Conditions</div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="">
              {" "}
              Choose what conditions must be met in order to display this fee in
              the boarding pass.
            </div>
            <div>
              <button
                type="button"
                className="rounded-full text-white bg-indigo-600 px-2 py-1 text-xs font-semibold  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add condition
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const description = () => {
    return (
      <>
       <div className="flex gap-2 items-center mt-2">
            <div>
              <Bars3BottomLeftIcon
                className="h-4 w-4 text-gray-800 hover:text-gray-600 cursor-pointer"
                aria-hidden="true"
              />
            </div>
            <div className="text-gray-900 text-sm font-semibold">description</div>
          </div>
       
      </>
    );
  };

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  pb-4  text-left shadow-xl transition-all sm:my-8 w-[1000px] ">
                  <div>
                    <div className="h-36 w-full bg-gray-100">
                      <div className="flex  justify-end ">
                        <div onClick={() => setOpen(false)} className="m-4">
                          {" "}
                          <XMarkIcon
                            className="h-8 w-8 hover:text-gray-600 cursor-pointer"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      <div className="text-gray-900 text-xl font-semibold m-2">
                        Security Authorization
                      </div>
                    </div>
                    <div className="px-8 mt-5">
                      <div className="flex gap-2 items-center">
                        <div>
                          {" "}
                          <HomeIcon
                            className="h-5 w-5 hover:text-gray-600 text-gray-900 cursor-pointer"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="text-gray-900 text-sm font-medium">
                          Connected Listings
                        </div>
                      </div>
                      <div className="text-gray-900 text-sm font-normal mt-2">
                        Choose whether to add your upsell to all your listings,
                        your current listing group, or specific listings.
                      </div>
                      {TabUi()}
                      {editConnectedList()}
                      <div className="border border-t-gray-300 mt-5" />
                      {addCondition()}
                      <div className="border border-b-gray-300 mt-5" />
                      {description()}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default CommonPopup;
