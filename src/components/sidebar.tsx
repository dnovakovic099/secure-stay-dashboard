"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronRightIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { BiBuildingHouse } from "react-icons/bi";
import { PiChatsBold, PiUsersThree } from "react-icons/pi";
import { HiOutlineBriefcase } from "react-icons/hi";
import { MdLockOutline, MdOutlineHome } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import classNames from "classnames";
import { logoutUser } from "@/auth/auth";
import { Router } from "next/router";

interface SideBarMainProps {
  children: ReactNode;
  NavbarContent?: ReactNode;
  isHideSidebar?: Boolean;
}

const SideBarMain: React.FC<SideBarMainProps> = ({
  children,
  NavbarContent,
  isHideSidebar = false,
}) => {
  const currentPage = usePathname();
  const navigation = [
    {
      href: "/dashboard",
      icon: MdOutlineHome,
      title: "Dashboard",
      current: false,
    },
    {
      href: "/listing",
      icon: BiBuildingHouse,
      title: "Listing",
      current: false,
    },
    {
      href: "/upsells",
      icon: CiShoppingTag,
      title: "Upsells",
      current: false,
    },
    {
      href: "/messages",
      icon: PiChatsBold,
      title: "Chat",
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
      icon: HiOutlineBriefcase,
      title: "Workplace",
      current: false,
    },
    {
      href: "/locks",
      icon: MdLockOutline,
      title: "Locks",
      current: false,
    },
  ];

  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: item.href === currentPage,
  }));

  interface AvatarProps {
    imageUrl?: string;
    profileName: string;
    requiredText: string;
  }

  const Avatar: React.FC<AvatarProps> = ({
    imageUrl,
    profileName,
    requiredText,
  }) => {
    const firstLetter = profileName.charAt(0).toUpperCase();

    return (
      <div className="flex items-center justify-between gap-2 shadow-md bg-gray-100 rounded-lg p-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={profileName}
              className="w-7 h-7 rounded-full mr-2"
            />
          ) : (
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-2xl leading-none">
              {firstLetter}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-[#222222]">{profileName}</p>
          <p className="text-[11px] font-normal text-[#000000] opacity-40">
            {requiredText}
          </p>
        </div>
        <ChevronRightIcon className="w-6 h-6 text-black" />
      </div>
    );
  };
  const avatarProps = {
    // imageUrl: "path/to/your/image.jpg",
    profileName: "Grand Abode",
    requiredText: "Developer",
  };
  const currentPath = usePathname();

  const handleLogOut = () => {
    localStorage.clear();
    logoutUser();
    toast.success("Logut successfully!!!");
    window.location.href = "/login";
  };

  return (
    <>
      <div>
        <Toaster />
        {/* Static sidebar for desktop - */}

        <div className="flex flex-row overflow-hidden">
          <div
            className={`sticky lg:flex-col w-[220px] min-w-[220px] h-[50px] ${
              isHideSidebar == true && "hidden"
            }`}
          >
            <div className={`flex flex-col min-h-screen`}>
              <div className=" flex justify-start items-center gap-5 bg-[#141B37] h-[50px] pl-5 ">
                <img
                  src={"/assets/securestay.png"}
                  alt="Logo"
                  style={{ height: "40px" }}
                />
              </div>
              {isHideSidebar == false && (
                <nav className="flex flex-1 flex-col">
                  <ul
                    role="list"
                    className="flex flex-col gap-[10px] py-4 cursor-pointer text-[#72767A] font-normal text-base"
                  >
                    {updatedNavigation.map((item, index) => (
                      <li className="flex items-center m-0" key={index}>
                        <Link
                          href={item.href}
                          className={classNames({
                            "w-full py-2 flex items-center group": true,
                            "pl-5 hover:pl-0": currentPath !== item.href,
                            "text-[#7000FF] font-medium":
                              currentPath === item.href,
                          })}
                        >
                          <div
                            className={classNames({
                              "w-5 hidden-div group-hover:block": true,
                              hidden: currentPath !== item.href,
                              block: currentPath === item.href,
                            })}
                          >
                            <svg
                              width="3"
                              height="24"
                              viewBox="0 0 3 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 0V0C1.65685 0 3 1.34315 3 3V21C3 22.6569 1.65685 24 0 24V24V0Z"
                                fill="#7000FF"
                              />
                            </svg>
                          </div>
                          <div className="flex items-center gap-3 hover-trigger">
                            <item.icon className={classNames("h-5 w-5")} />
                            <p className={classNames("grow")}>{item.title}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <div className="mb-5 mx-5">
                <Avatar {...avatarProps} />
              </div>
            </div>
          </div>

          <div className="flex flex-col  h-[100%] w-full">
            {children && (
              <main className="h-[100%] bg-gray-100 rounded-md">
                <div className="h-[100%]">
                  <div className=" flex justify-end items-center gap-5 bg-[#141B37] h-[50px] pl-5 ">
                    {NavbarContent && (
                      <div className="w-[100%] pr-1">{NavbarContent}</div>
                    )}

                    <button
                      className="flex items-center px-2 py-2 mr-1 h-[40px] text-white rounded-md focus:outline-none  transition duration-300 ease-in-out bg-[#141B37]"
                      onClick={() => handleLogOut()}
                    >
                      <ArrowRightStartOnRectangleIcon className="w-4 h-4 mr-2" />
                    </button>
                  </div>
                  <div className="h-[93vh] overflow-y-scroll">{children}</div>
                </div>
              </main>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarMain;
