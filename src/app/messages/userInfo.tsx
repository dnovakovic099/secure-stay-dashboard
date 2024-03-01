import {
  ArrowRightIcon,
  CalendarIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Listbox, Transition, Menu } from "@headlessui/react";
import CommonDropdown from "@/components/commonDropdown";
import CommonTabs from "@/components/commonTabs";
import {
  CheckIcon,
  ChevronRightIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const menuItems = [
  { id: 1, item: "Unknown", color: "gray-900" },
  { id: 2, item: "Unsatisfied", color: "red-500" },
  { id: 3, item: "Somewhat satisfied", color: "yellow-400" },
  { id: 4, item: "Neutral", color: "purple-400" },
  { id: 5, item: "Satisfied", color: "indigo-600" },
  { id: 6, item: "Highly satisfied", color: "green-500" },
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
    bookingType: [
      {
        id: 1,
        type: "inquiery",
        imageUrl:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    id: 2,
    name: "Upcoming bookings",
    href: "#",
    current: false,
    bookingType: [
      {
        id: 1,
        type: "inquiery",
        imageUrl:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        type: "confirmed",
        imageUrl:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    id: 3,
    name: "Past bookings",
    href: "#",
    current: false,
    bookingType: [
      {
        id: 1,
        type: "inquiery",
        imageUrl:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
];

const product = {
  details: [
    {
      name: "1 Audult",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
  ],
};
const paymentMethods = [
  { id: "enterdetails", title: "Enter Details" },
  { id: "idUpload", title: "ID Upload" },
  { id: "aggrement", title: "Aggrement" },
  { id: "fees", title: "Fees" },
  { id: "checkin", title: "Check in" },
];
const UserInfo = ({ selectedData }: any) => {
  const [initialTabValue, setInitialTabValue] = useState(tabs[0]);
  const [menuItemsArray, setMenuItemsArray] = useState(menuItems);
  const [isTag, setIsTag] = useState(false);
  const [isNotes, setIsNotes] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  const [userNotes, setUserNotes] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addtag, setAddtag] = useState("");
  const [selectedField, setSelectedField] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {}, [selectedField,initialTabValue, menuItemsArray,selectedColor]);

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
              <Listbox.Button className="relative cursor-pointer w-52  rounded-full bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <Image
                    // src={selected.avatar}
                    src="/assets/profile.jpg"
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
                <Listbox.Options className="absolute  z-10 mt-1 max-h-56 w-52 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {people.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "relative  select-none py-2 pl-3 pr-9 cursor-pointer"
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <Image
                              // src={selected.avatar}
                              src="/assets/profile.jpg"
                              alt=""
                              className="h-5 w-5 flex-shrink-0 rounded-full"
                              width={50}
                              height={50}
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

  const handleAddTagFunction = (value: any) => {
    setAddtag(value);

    setMenuItemsArray([
      ...menuItemsArray,
      { id: 10, item: value.split(), color: "text-gray-900" },
    ]);
  };

  function AddNewTag() {
    return (
      <div className="relative ml-2">
        <input
          type="tag"
          name="tag"
          id="tag"
          className="block w-full rounded-full px-2 border-0 py-1.5 pr-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder=""
          value={addtag}
          onChange={(e) => handleAddTagFunction(e.target.value)}
        />
        <button
          onClick={() => {
            setIsTag(!isTag), setAddtag(""), setMenuItemsArray(menuItems);
          }}
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

  const handlePhone = () => {
    setIsPhone(false), setPhone("");
    setIsPhoneHovered(false);
  };

  const handleEmail = () => {
    setIsEmail(false), setEmail("");
    setIsPhoneHovered(false);
  };

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
              <div
                className="cursor-pointer flex items-center"
                onMouseEnter={() => setIsEmailHovered(true)}
                onMouseLeave={() => setIsEmailHovered(false)}
              >
                <div className="text-sm">no email</div>
                <div className={isEmailHovered ? "block" : "hidden"}>
                  <PencilIcon className="h-4 w-4 mx-2 " aria-hidden="true" />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className=" py-4 rounded-md bg-gray-200 flex justify-center">
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="block w-10/12 pl-4  rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                onClick={() => {
                  handleEmail();
                }}
                className="m-2 py-1 px-4 bg-indigo-600 text-white rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Save
              </button>
              <button
                onClick={() => {
                  handleEmail();
                }}
                className="ml-2 py-1 px-4 bg-gray-200 text-gray-900 rounded-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
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
            Phone number
          </label>
          {!isPhone ? (
            <div
              className="cursor-pointer flex"
              onClick={() => setIsPhone(true)}
            >
              <div
                className="cursor-pointer flex items-center"
                onMouseEnter={() => setIsPhoneHovered(true)}
                onMouseLeave={() => setIsPhoneHovered(false)}
              >
                <div className="text-sm">no phone</div>
                <div className={isPhoneHovered ? "block" : "hidden"}>
                  <PencilIcon className="h-4 w-4 mx-2 " aria-hidden="true" />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <PhoneInput
                defaultCountry="ua"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                className="ml-2 py-4 px-4 bg-gray-200 text-gray-900 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <div className="m-2">
              <button
                onClick={() => {
                  handlePhone();
                }}
                className="m-2 py-1 px-4 bg-indigo-600 text-white rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Save
              </button>
              <button
                onClick={() => {
                  handlePhone();
                }}
                className="ml-2 py-1 px-4 bg-gray-200 text-gray-900 rounded-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              </div>
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
            value={userNotes}
            placeholder="Enter your notes here..."
            onChange={(e) => setUserNotes(e.target.value)}
          />
        </div>
      </div>
    );
  }

  function comfirmedDetails() {
    return (
      <>
        <div className="relative mt-3  ">
          {initialTabValue?.bookingType.map((item: any, index: any) => (
            <div key={index}>
              <div className="relative mt-2">
                <Image
                  className="aspect-[3/2]  h-52  w-full rounded-md object-cover"
                  src={item?.imageUrl}
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
                    {item.type?.toUpperCase()}
                  </button>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <CalendarIcon className="h-5 w-5 " aria-hidden="true" />
                <p className="ml-2"> Booking Information</p>
              </div>
              <div className="flex items-center mt-4">
                {selectedData.checkInDate ? selectedData.checkInDate : ""}
                <ArrowRightIcon
                  className="h-4 w-4 mx-2 mt-1"
                  aria-hidden="true"
                />
                {selectedData.checkOutDate ? selectedData.checkOutDate : ""}
              </div>
              {item.type === "confirmed" && (
                <>
                  {paymentSummary()}
                  {boardingPass()}
                </>
              )}
            </div>
          ))}
        </div>
      </>
    );
  }

  function paymentSummary() {
    return (
      <div>
        {product.details.map((detail, index) => (
          <div key={index}>
            <Disclosure as="div">
              {({ open }) => (
                <>
                  <h3>
                    <Disclosure.Button className="group relative flex w-full items-center justify-between py-2 text-left">
                      <span
                        className={classNames(
                          open ? "text-indigo-600" : "text-gray-900",
                          "text-sm font-medium"
                        )}
                      >
                        {detail.name}
                      </span>
                      <span className="ml-6 flex items-center">
                        {open ? (
                          <ChevronDownIcon
                            className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronRightIcon
                            className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </h3>
                  <Disclosure.Panel
                    as="div"
                    className="prose prose-sm  w-full bg-gray-200 rounded-md py-2 px-2"
                  >
                    <dl className="mt-2 space-y-6 text-sm font-medium text-gray-500">
                      <div className="flex justify-between">
                        <dt>Payment summary</dt>
                      </div>

                      <div className="flex justify-between">
                        <dt>$105.4 * 1 night</dt>
                        <dd className="text-gray-900">$105.4 USD</dd>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-300  text-gray-900">
                        <dt className="text-base">Total</dt>
                        <dd className="text-base">$105.4 USD</dd>
                      </div>
                    </dl>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    );
  }

  function boardingPass() {
    return (
      <div>
        <div className="">
          <Disclosure as="div">
            {({ open }) => (
              <>
                <h3>
                  <Disclosure.Button className="group relative flex w-full items-center justify-between py-2 text-left">
                    <span
                      className={classNames(
                        open ? "text-indigo-600" : "text-gray-900",
                        "text-sm font-medium"
                      )}
                    >
                      Boarding Pass
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <ChevronDownIcon
                          className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ChevronRightIcon
                          className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel
                  as="div"
                  className="prose prose-sm  w-full bg-gray-200 rounded-md py-2 px-2"
                >
                  <fieldset className="mt-4">
                    <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                      {paymentMethods.length === 0 ? (
                        <div className="flex justify-center items-center text-xs">
                          The boarding pass is not available for inquiries
                        </div>
                      ) : (
                        paymentMethods.map(
                          (paymentMethod, paymentMethodIdx) => (
                            <>
                              <div>
                                <div
                                  key={paymentMethod.id}
                                  className="flex items-center"
                                >
                                  {paymentMethodIdx === 0 ? (
                                    <input
                                      id={paymentMethod.id}
                                      name="payment-type"
                                      type="radio"
                                      defaultChecked
                                      className="h-4 w-4 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                  ) : (
                                    <input
                                      id={paymentMethod.id}
                                      name="payment-type"
                                      type="radio"
                                      className="h-4 w-4 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                  )}
                                </div>
                                <label
                                  htmlFor={paymentMethod.id}
                                  className="mt-2 whitespace-nowrap block text-xs font-normal text-gray-700"
                                >
                                  {paymentMethod?.title?.toUpperCase()}
                                </label>
                              </div>
                            </>
                          )
                        )
                      )}
                    </div>
                  </fieldset>
                  <div className="flex justify-between mt-2 ">
                    <dt className="flex "> Boarding Pass Access</dt>
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      Revoke Access
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pb-2 ">
                    <dt className="flex">Verification Report</dt>
                    <span className="inline-flex   items-center rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      Download
                    </span>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    );
  }

  const handleClick = (menuItem: any) => {
    setSelectedField(menuItem.item);
    setSelectedColor(menuItem.color);
  };
  function userReviewDropDown() {
    return (
      <div className="inline-flex rounded-md shadow-sm">
        <button
          type="button"
          // className=" relative inline-flex items-center rounded-l-full w-44 truncate bg-white px-3 py-2 text-sm  text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          className={classNames(
            "relative inline-flex items-center rounded-l-full w-44 truncate bg-white px-3 py-2 text-sm focus:z-10",
            selectedColor.length>0
              ? `text-${selectedColor} ring-1 ring-inset ring-${selectedColor} hover:bg-gray-50`
              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          )}
          
        >
          {selectedField ? selectedField : "Select a rating"}
        </button>
        <Menu as="div" className="relative -ml-px block">
          <Menu.Button
            className={classNames(
              selectedColor.length>0
                ? `text-${selectedColor} ring-1 ring-inset ring-${selectedColor}  hover:bg-gray-50`
                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
              "relative inline-flex items-center rounded-r-full bg-white px-2 py-2   focus:z-10"
            )}
          >
            <span className="sr-only">Open options</span>
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
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
            <Menu.Items className="absolute right-0 cursor-pointer  z-10 -mr-1 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {menuItemsArray.map((data) => (
                  <Menu.Item key={data.id}>
                    {({ active }) => (
                      <div
                        onClick={() => handleClick(data)}
                        className={classNames(
                          "block px-4 py-2 text-sm", // Base styles
                          `text-${data.color}`
                        )}
                      >
                        {data.item}
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    );
  }

  return (
    <div className="p-2 h-[640px] overflow-y-auto">
      <p className=" flex font-semibold text-xl text-left text-gray-900">
        {selectedData.name ? selectedData.name : ""}
      </p>
      <div className="flex items-center">
        {/* <CommonDropdown menuItems={menuItemsArray} onClick={handleItemClick} /> */}

        {userReviewDropDown()}
        <div className="border-l border-gray-300 h-7 ml-2"></div>
        {isTag ? AddNewTag() : emptyPlateTagUi()}
      </div>
      <div className="flex items-center w-full">{inputFieldsUi()}</div>

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
      {/* {inquieryDetails()} */}
      {comfirmedDetails()}
    </div>
  );
};

export default UserInfo;
