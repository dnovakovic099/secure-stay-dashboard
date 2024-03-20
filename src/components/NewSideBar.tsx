"use client";

import {
  HiOutlineBriefcase,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { MdOutlineHome, MdOutlineSell } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { GoPeople } from "react-icons/go";
import Link from "next/link";
import { FiLock } from "react-icons/fi";
import {
  ChevronRightIcon,
  HomeIcon,
  LinkIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import Logo from "../assets/logo.svg";
import classNames from "classnames";
import { PiUsersThree } from "react-icons/pi";

function Sidebar() {
  const currentPath = usePathname();

  const navigation = [
    {
      href: "/dashboard",
      icon: MdOutlineHome,
      title: "Dashboard",
      current: false,
    },
    {
      href: "/listing",
      title: "Listing",
      icon: BiBuildingHouse,
      current: false,
    },
    {
      href: "/upsells",
      title: "Upsells",
      icon: MdOutlineSell,
      current: false,
    },
    {
      href: "/messages",
      title: "Chat",
      icon: HiOutlineChatBubbleLeftRight,
      current: false,
    },
    {
      href: "/businessSettings/users",
      icon: PiUsersThree,
      title: "Users",
      current: false,
    },
    {
      href: "/businessSettings",
      title: "Workplaces",
      icon: HiOutlineBriefcase,
      current: false,
    },
    {
      href: "/locks",
      icon: FiLock,
      title: "Locks",
      current: false,
    },
    {
      href: "/connectedAccounts",
      icon: LinkIcon,
      title: "Connected A/C",
      current: false,
    },
  ];

  return (
    <aside className="w-[15%] flex flex-col justify-between h-screen">
      <div className="bg-white">
        <a
          href="/dashboard"
          className="h-16 flex px-4 text-lg font-semibold items-center bg-[#141b37] text-white justify-start"
        >
          <Image src={Logo} alt="logo" width={150} height={150} />
        </a>
        <div className="py-4 lg:sticky lg:flex-col w-full">
          <div className="flex flex-col">
            <nav className="flex flex-1 flex-col px-2">
              <ul role="list" className="-mx-2 space-y-3">
                {navigation.map((item, index) => (
                  <li
                    className="flex items-center gap-2 text-zinc-400 text-base m-0"
                    key={index}
                  >
                    <Link
                      href={item.href}
                      className={classNames({
                        "w-full px-3 py-2 flex items-center gap-2": true,
                        "border-l-4 border-white hover:border-indigo-500":
                          currentPath !== item.href,
                        "text-indigo-500 border-l-4 border-indigo-500 bg-slate-200	":
                          currentPath === item.href,
                      })}
                    >
                      <item.icon
                        className={classNames(
                          "h-6 w-6 shrink-0 text-gray-500",
                          {
                            "text-indigo-500": currentPath === item.href,
                          }
                        )}
                        aria-hidden="true"
                      />
                      <p
                        className={classNames("text-gray-500 grow", {
                          "text-indigo-500": currentPath === item.href,
                        })}
                      >
                        {item.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 my-4 mx-2 p-4 bg-gray-100 rounded-lg">
        <div className="flex-shrink-0">
          <Image
            className="object-cover h-12 w-12 rounded-full cursor-pointer"
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
            alt="hotel"
            width={48}
            height={48}
          />
        </div>
        <div className="flex flex-col flex-grow">
          <p className="text-lg font-semibold text-gray-900 truncate">
            Alex Stanton
          </p>
          <p className="text-sm text-gray-500">Super Admin</p>
        </div>
        <ChevronRightIcon
          className="h-6 w-6 text-gray-400 group-hover:text-gray-500 transition duration-300 transform group-hover:translate-x-1 cursor-pointer"
          aria-hidden="true"
        />
      </div>
    </aside>
  );
}

export default Sidebar;
