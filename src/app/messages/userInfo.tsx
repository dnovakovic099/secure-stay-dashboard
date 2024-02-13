import {
  ArrowRightIcon,
  CalendarIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import CommonDropdown from "@/components/commonDropdown";
import CommonTabs from "@/components/commonTabs";
import {
  CheckIcon,
  ChevronUpDownIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const menuItems = [
  { id: 1, item: "unKnown" },
  { id: 2, item: "unStatisfied" },
  { id: 3, item: "Somewhat statisfied" },
  { id: 4, item: "nuetral" },
  { id: 5, item: "statisfied" },
  { id: 6, item: "Highly statisfied" },
];
const languages = [
  { id: 1, item: "English" },
  { id: 2, item: "Spanish" },
  { id: 3, item: "Chinese" },
  { id: 4, item: "Hindi" },
];

const tabs: any[] = [
  {
    id: 1,
    name: "Active bookings",
    href: "#",
    current: false,
    imageUrl:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Upcoming bookings",
    href: "#",
    current: false,
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Past bookings",
    href: "#",
    current: false,
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const bookingInfo = [
  {
    id: 1,
    name: "Leslie Alexander",
    checkInDate: "Nov 22 2024,9:30 AM",
    checkOutDate: "Nov 24 2024,6:30 PM",
  },
  {
    id: 2,
    name: "Michael Foster",
    checkInDate: "Jan 02 2024,11:30 AM",
    checkOutDate: "Jan 04 2024,10:30 PM",
  },
  {
    id: 3,
    name: "Dries Vincent",
    checkInDate: "Jan 03 2024,6:30 AM",
    checkOutDate: "jan 14 2024,11:30 PM",
  },
];
const UserInfo = ({ selectedData }: any) => {
  const [initialTabValue, setInitialTabValue] = useState(tabs[0]);
  const [isTag, setIsTag] = useState(false);
  const [isNotes, setIsNotes] = useState(false);
  const [userNotes, setUserNotes] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    console.log(selectedData, "selectedData");
  }, [initialTabValue]);

  const handleItemClick = (item: any) => {
    console.log("Selected item:", item);
    // Handle the selected item here in the parent component
  };
  const handleTabClick = (item: any) => {
    setInitialTabValue(item);
    console.log("Selected handleTabClick:", item);
    // Handle the selected item here in the parent component
  };

  const people = [
    {
      id: 1,
      name: "Wade Cooper",
      avatar:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 2,
      name: "Arlene Mccoy",
      avatar:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 3,
      name: "Devon Webb",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    },
    {
      id: 4,
      name: "Tom Cook",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 5,
      name: "Tanya Fox",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 6,
      name: "Hellen Schmidt",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 7,
      name: "Caroline Schultz",
      avatar:
        "https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 8,
      name: "Mason Heaney",
      avatar:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 9,
      name: "Claudie Smitham",
      avatar:
        "https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 10,
      name: "Emil Schaefer",
      avatar:
        "https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  function AssignedToFunction() {
    const [selected, setSelected] = useState(people[3]);

    return (
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block mt-2 text-sm font-medium leading-6 text-gray-900">
              Assigned to
            </Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-52 cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <Image
                    src={selected.avatar}
                    alt=""
                    className="h-5 w-5 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                  />
                  <span className="ml-3 block truncate">{selected.name}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-52 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {people.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <img
                              src={person.avatar}
                              alt=""
                              className="h-5 w-5 flex-shrink-0 rounded-full"
                            />
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {person.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    );
  }

  function AddNewTag() {
    return (
      <div className="relative ml-2">
        <input
          type="tag"
          name="tag"
          id="tag"
          className="block w-full rounded-full border-0 py-1.5 pr-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder=""
        />
        <button
          onClick={() => setIsTag(!isTag)}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500 hover:text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    );
  }

  function inputFieldsUi() {
    return (
      <div className=" w-full grid grid-cols-6 gap-4 mt-2">
        <div className="col-span-3 ml-1 ">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          {!isEmail ? (
            <div
              className="cursor-pointer flex"
              onClick={() => setIsEmail(true)}
            >
              <div> no email</div>
              <PencilIcon className="h-4 w-4 mx-2 mt-1" aria-hidden="true" />
            </div>
          ) : (
            <div>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="you@example.com"
                />
              </div>

              <button
                onClick={() => setIsEmail(false)}
                className="m-2 py-1 px-4 bg-indigo-600 text-white rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Save
              </button>
              <button   onClick={() => setIsEmail(false)} className="ml-2 py-1 px-4 bg-gray-200 text-gray-900 rounded-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="col-span-3 ">
          <label
            htmlFor="phone"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            phone number
          </label>
          {!isPhone ? (
            <div
              className="cursor-pointer flex"
              onClick={() => setIsPhone(true)}
            >
              <div> no phone</div>
              <PencilIcon className="h-4 w-4 mx-2 mt-1" aria-hidden="true" />
            </div>
          ) : (
            <div>
              <div className="mt-2">
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="123456789"
                />
              </div>

              <button
                onClick={() => setIsPhone(false)}
                className="m-2 py-1 px-4 bg-indigo-600 text-white rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Save
              </button>
              <button
                onClick={() => setIsPhone(false)}
                className="ml-2 py-1 px-4 bg-gray-200 text-gray-900 rounded-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  function emptyPlateTagUi() {
    return (
      <div className="flex items-center">
        <p className="ml-2 text-indigo-600 hover:text-indigo-400 cursor-pointer">
          {" "}
          Click the plus to add a tag
        </p>
        <PlusIcon
          className="h-4 w-4 ml-2 text-indigo-600 hover:text-indigo-400 cursor-pointer"
          aria-hidden="true"
          onClick={() => setIsTag(!isTag)}
        />
      </div>
    );
  }

  function AddNotes() {
    return (
      <div>
        <div className="mt-2 text-sm font-medium leading-6 text-gray-900">
          <p>Average Response time</p>
          <p>0 Min</p>
        </div>

        <div className="mt-2">
          <textarea
            rows={3}
            name="comment"
            id="comment"
            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={""}
            placeholder="Enter your notes here..."
            onChange={(e) => setUserNotes(e.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 h-[640px] overflow-y-auto">
      <p className=" flex font-semibold text-xl text-left text-gray-900">
        {selectedData.name ? selectedData.name : ""}
      </p>
      <div className="flex items-center">
        <CommonDropdown menuItems={menuItems} onClick={handleItemClick} />
        <div className="border-l border-gray-300 h-7 ml-2"></div>
        {isTag ? AddNewTag() : emptyPlateTagUi()}
      </div>
      <div className="flex items-center w-full">
        {inputFieldsUi()}
        {/* {isNotes && (
          <div className="mt-10 mx-2">
            <CommonDropdown menuItems={languages} onClick={handleItemClick} />
          </div>
        )} */}
      </div>

      <div className="flex items-center">
        <div>{AssignedToFunction()}</div>
        {isNotes && (
          <div className="mt-10 mx-2">
            <CommonDropdown menuItems={languages} onClick={handleItemClick} />
          </div>
        )}
      </div>

      {isNotes && AddNotes()}
      <div className=" mt-2">
        <button
          onClick={() => setIsNotes(!isNotes)}
          className="w-full  bg-indigo-100 text-indigo-600 hover:text-indigo-500 cursor-pointer font-semibold py-2 rounded-b-md    focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {isNotes ? "See Less" : "See Response Time & Language & Notes Fields"}
        </button>
      </div>
      <CommonTabs tab={tabs} onClick={handleTabClick} />
      <div className="relative mt-3">
        {initialTabValue && (
          <div className="relative">
            <Image
              className="aspect-[3/2]  h-52  w-full rounded-md object-cover"
              src={initialTabValue.imageUrl}
              alt="hotel"
              width={500}
              height={500}
            />

            <div className="absolute top-0 left-0 right-0 bottom-0 flex  justify-center">
              <div className="w-full flex items-start justify-between mx-2 mt-10">
                <h2 className="text-lg font-semibold text-white">
                  Your Text Here
                </h2>
                <h2 className="text-lg font-semibold text-white">
                  Your Text Here
                </h2>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 ">
              <button className="w-full  bg-gray-700 text-white font-semibold py-2 rounded-b-md   hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                INQUIRY
              </button>
            </div>
          </div>
        )}
        <div className="flex items-center mt-4">
          <CalendarIcon className="h-5 w-5 " aria-hidden="true" />
          <p className="ml-2"> Booking Information</p>
        </div>
        <div className="flex items-center mt-4">
          {selectedData.checkInDate ? selectedData.checkInDate : ""}
          <ArrowRightIcon className="h-4 w-4 mx-2 mt-1" aria-hidden="true" />
          {selectedData.checkOutDate ? selectedData.checkOutDate : ""}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
