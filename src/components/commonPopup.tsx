import React, { useRef, Fragment } from "react";
// This is where the Tailwind UI components are imported
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CommonPopup = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  disableCloseIcon,
  heightwidth,
}: any) => {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  const cancelButtonRef = useRef(null);
  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={onClose}
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
            <div className="fixed inset-0 bg-[#141B37] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 top-3 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className={classNames(
                    heightwidth ? heightwidth : "",
                    "relative transform  rounded-lg bg-white  text-left shadow-xl transition-all"
                  )}
                >
                  <div className="sm:flex sm:items-start w-full">
                    <div className="text-center sm:mt-0 sm:text-left w-full">
                      <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900 p-5 border-b border-[#E9ECF3]">
                        <div className="flex justify-between">
                          <span className="text-[#222222] text-xl not-italic font-medium leading-5">
                            {title}
                          </span>
                          <div className="cursor-pointer">
                            {!disableCloseIcon && (
                              <XMarkIcon
                                className="h-6 w-6 border-none rounded-md"
                                aria-hidden="true"
                                onClick={onClose}
                              />
                            )}
                          </div>
                        </div>
                        <div className="text-sm">{subtitle}</div>
                      </Dialog.Title>
                      <div className="p-5">{children}</div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default CommonPopup;
