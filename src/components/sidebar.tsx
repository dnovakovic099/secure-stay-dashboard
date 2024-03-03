"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ShoppingCartIcon,
  ChevronRightIcon,
  LockClosedIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import classNames from "classnames";

interface SideBarMainProps {
  children: ReactNode;
  NavbarContent?: ReactNode;
  isHideSidebar?: Boolean;
}

// {
//   href: "/listing",
//   title: "Listing",
//   icon: BiBuildingHouse,
//   current: false,
// },
// {
//   href: "/upsells",
//   title: "Upsells",
//   icon: MdOutlineSell,
//   current: false,
// },
// {
//   href: "/messages",
//   title: "Chat",
//   icon: HiOutlineChatBubbleLeftRight,
//   current: false,
// },
// { href: "guestes", title: "Guestes", icon: GoPeople, current: false },
// {
//   href: "/businessSettings",
//   title: "Workplaces",
//   icon: HiOutlineBriefcase,
//   current: false,
// },
// {
//   href: "/locks",
//   icon: LockClosedIcon,
//   title: "Locks",
//   current: false,
// },

const SideBarMain: React.FC<SideBarMainProps> = ({
  children,
  NavbarContent,
  isHideSidebar = false,
}) => {
  const currentPage = usePathname();
  const navigation = [
    { href: "/dashboard", icon: HomeIcon, title: "Dashboard", current: false },
    {
      href: "/listing",
      icon: BuildingOffice2Icon,
      title: "Listing",
      current: false,
    },
    {
      href: "/upsells",
      icon: ShoppingCartIcon,
      title: "Upsells",
      current: false,
    },
    {
      href: "/messages",
      icon: ChatBubbleLeftRightIcon,
      title: "Chat",
      current: false,
    },
    {
      href: "/businessSettings/users",
      icon: UserGroupIcon,
      title: "Users",
      current: false,
    },
    {
      href: "/businessSettings",
      icon: BriefcaseIcon,
      title: "Workplace",
      current: false,
    },
    {
      href: "/locks",
      icon: LockClosedIcon,
      title: "Locks",
      current: false,
    },
  ];

  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: item.href === currentPage,
  }));

  // var nav = navigation.forEach((item) => {
  //   item.current = item.href === currentPage;
  // });

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
      <div className="flex items-center space-x-4 w-[] shadow-md bg-gray-100 rounded-3xl px-2 ">
        <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-black">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={profileName}
              className="w-10 h-10 rounded-full mr-2"
            />
          ) : (
            <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-2xl leading-none mr-2 ">
              {firstLetter}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-800">{profileName}</p>
          <p className="text-xs text-gray-500">{requiredText}</p>
        </div>
        <ChevronRightIcon className="w-8 h-8 text-black mr-3" />
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
    console.log("log out");
  };

  return (
    <>
      <div>
        <Toaster />
        {/* Static sidebar for desktop - */}

        <div className="flex flex-row overflow-hidden">
          <div
            className={`sticky lg:flex-col w-[240px] h-[50px] ${
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
                <nav className="flex flex-1 flex-col px-2">
                  <ul
                    role="list"
                    className="flex flex-col gap-1 py-4 cursor-pointer"
                  >
                    {updatedNavigation.map((item, index) => (
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
                            "text-indigo-500 border-l-4 border-indigo-500":
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
              )}
              <div className=" mb-5 ml-2">
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
                      className="flex items-center px-2 py-2 mr-1 h-[40px] text-white rounded-md focus:outline-none hover:w-[100px]  transition duration-300 ease-in-out bg-[#141B37]"
                      onClick={handleLogOut}
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
