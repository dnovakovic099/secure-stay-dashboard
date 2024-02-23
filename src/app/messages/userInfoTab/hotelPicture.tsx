import { Dialog, Menu, Transition } from "@headlessui/react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { Fragment, useRef, useState } from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const HotelPicture = ({ selectedItem }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  const cancelButtonRef = useRef(null);
  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const menuItemsPopup = () => {
    return (
      <Menu as="div" className="relative flex-none">
        <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
          <PencilIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <label
                  htmlFor="file-upload"
                  className={classNames(
                    active ? "bg-gray-50" : "",
                    "block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100 rounded-md cursor-pointer"
                  )}
                >
                  Upload Photo
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-50" : "",
                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                  )}
                  onClick={() => setOpen(true)}
                >
                  Select from existing photos
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  };

  function existingImageUi() {
    return (
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-[1000px] ">
                  <div>
                    <div className="flex  justify-between mb-2">
                      <div className="text-indigo-400 text-xl font-normal">select image</div>
                      <div onClick={()=>setOpen(false)}>
                        {" "}
                        <XMarkIcon
                          className="h-8 w-8 hover:text-gray-600 cursor-pointer"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <ul
                      role="list"
                      className="mx-auto h-96 overflow-y-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
                    >
                      {selectedItem?.images.map((person: any, index: any) => (
                        <li key={index}>
                          <div
                            onClick={() => setSelectedImage(person.id)}
                            className={classNames(
                              person.id == selectedImage
                                ? "border-blue-500 flex flex-1 items-start justify-between truncate rounded-md border-2 p-1 "
                                : ""
                            )}
                          >
                            <Image
                              className="aspect-[3/2] w-full rounded-lg object-cover "
                              src={person.url}
                              alt={person.url}
                              width={500}
                              height={500}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex flex-col overflow-y-auto h-full">
        {/* Row 1: Main Image */}
        <div className="text-base font-semibold px-2">Main image</div>
        <div
          className="w-full p-2 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={selectedItem?.images[0]?.url}
            alt="Main images"
            className="object-cover object-center w-full h-64 rounded-md"
            width={400}
            height={400}
          />
          {isHovered && (
            <div className="absolute top-4 right-4 p-2 bg-gray-50 rounded-full">
              {menuItemsPopup()}
            </div>
          )}
        </div>

        {/* Row 2: Additional Images */}
        <div className="text-base font-semibold px-2 pt-3">
          Additional images
        </div>
        <div className="text-sm px-2">
          Uploaded pictures: {selectedItem?.images?.length}
        </div>
        <div className="grid grid-cols-3 w-full ">
          {selectedItem?.images.map((imageUrl: any, index: any) => (
            <div key={imageUrl.id} className="w-full p-2">
              <img
                src={imageUrl.url}
                alt={`Image ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      {open && existingImageUi()}
    </div>
  );
};

export default HotelPicture;
