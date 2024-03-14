// NavbarProvider.tsx
"use client";
import { Popover, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";

interface NavbarProviderProps {
  upsell_id: string;
  actionItems: Array<{
    name: string;
    icon: React.ComponentType;
    onclick: () => void;
  }>;
  goBack: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleUpdate: (e: React.FormEvent) => void;
}

export const CreateUpsellNavbarProvider = ({
  upsell_id,
  actionItems,
  goBack,
  handleSubmit,
  handleUpdate,
}: NavbarProviderProps) => {
  return (
    <div className="flex items-center justify-between text-white w-[100%]">
      <img
        src={"/assets/securestay.png"}
        alt="Logo"
        style={{ height: "40px" }}
      />
      <div className="relative flex items-center gap-5">
        <button
          className="text-sm font-medium bg-[#1F284D] text-[#FFFFFF] px-5 py-[10px] rounded-lg"
          onClick={goBack}
        >
          Cancel
        </button>
        <button
          className="text-sm font-medium bg-gradient-to-r from-[#9E49F2] to-[#7000FF] text-[#FFFFFF] px-5 py-[10px] rounded-lg"
          onClick={upsell_id ? handleUpdate : handleSubmit}
        >
          {upsell_id ? "Update Upsell" : "Save Upsell"}
        </button>

        {upsell_id && (
          <div className="ml-5">
            {" "}
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
${open ? "text-white" : "text-white/90"}
group inline-flex items-center justify-center rounded-md bg-[#1F284D] w-10 h-10 text-base font-bold hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                  >
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-5"
                  >
                    <Popover.Panel className="absolute right-1 z-20 mt-2 w-screen max-w-sm translate-x-1 transform px-4 sm:px-0 lg:max-w-1sm">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                        <div className="relative grid gap-1 bg-white p-2 lg:grid-cols-1">
                          {actionItems?.map((item) => (
                            <button
                              key={item.name}
                              onClick={() => {
                                item.onclick();
                                close(); // Close the Popover after the button is clicked
                              }}
                              className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                <div className="w-8 h-8 text-red-700">
                                  <item.icon />
                                </div>
                              </div>
                              <div className="ml-2">
                                <p className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};
