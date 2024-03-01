import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BarsArrowDownIcon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import UserList from "./usersList";
import Image from "next/image";
import CommonTabs from "@/components/commonTabs";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const tabs: any[] = [
  { id: 1, name: "All", href: "#", count: "", current: false },
  { id: 2, name: "Priority", href: "#", count: "4", current: false },
];

const UserUi = ({ setSelectedData, people }: any) => {
  const [usertab, setUsertab] = useState(tabs);
  const [activeTab, setActiveTab] = useState(1);
  const [userSearch, setUserSearch] = useState("");
  const [userList, setUserList] = useState(people);

  const onChangeTab = (tabId: any, index: any) => {
    const newState = usertab.map((tab, i) => {
      if (index == i) {
        return { ...tab, current: true };
      } else {
        return { ...tab, current: false };
      }
    });
    setUsertab(newState);
    setActiveTab(tabId);
  };

  const handleTabClick = (item: any) => {
    setActiveTab(item.id);
  };

  const handleSearch = (value: any) => {
    setUserSearch(value);
    const filteredUsers = people.filter((user: any) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setUserList(filteredUsers);
  };

  function userSearchUi() {
    return (
      <div className="my-4 border-gray-600 sm:flex px-2">
        <div>
          <div className="flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center ">
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Open options</span>
                    <Image
                      src="/assets/filterIcon.png"
                      alt="My profile"
                      className="w-auto h-3 items-end  mr-2"
                      width={50}
                      height={50}
                    />
                    {/* <BarsArrowDownIcon className="h-5 w-5 mr-2" aria-hidden="true" /> */}
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
                    <Menu.Items className=" absolute md:w-40 w-56 xl:w-56 lg:w-56 sm:w-36 px-2 right-0 z-10 mt-4 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Guests with pending actions
                          </a>
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
                          >
                            Cheking-In-Today
                          </a>
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
                          >
                            Cheking-Out-Today
                          </a>
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
                          >
                            Guests-In-House
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <input
                type="text"
                name="desktop-search-candidate"
                id="desktop-search-candidate"
                className="w-36 md:w-36 xl:w-56 lg:w-52  sm:w-80 rounded-md border-0 py-1.5 p-10  text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:text-indigo-600"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="">
        <h2 className="mt-4 ml-2 ext-xl font-bold text-blue-900">Messages</h2>

        <div className="ml-2">
          <CommonTabs tab={usertab} onClick={handleTabClick} />
        </div>

        {userSearchUi()}
        {userList.length === 0 ? (
          <p className="flex text-xs items-center justify-center">
            No users found...
          </p>
        ) : activeTab == 1 ? (
          <UserList setSelectedData={setSelectedData} userList={userList} />
        ) : (
          <UserList
            setSelectedData={setSelectedData}
            userList={userList.slice(0, 3)}
          />
        )}
      </div>
    </>
  );
};
export default UserUi;
