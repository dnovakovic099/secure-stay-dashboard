"use client"; //This is client component
import React, { ReactNode } from "react";
//Next Import
import { usePathname } from "next/navigation";
//Headless UI
import {
  HomeIcon,
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ShoppingCartIcon,
  ChevronRightIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import { Toaster } from "react-hot-toast";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

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
    { href: "/dashboard", icon: HomeIcon, title: "Dashboard", current: false },
    {
      href: "/listing",
      icon: BuildingOffice2Icon,
      title: "Listing",
      current: false,
    },
    {
      href: "/messages",
      icon: ChatBubbleLeftRightIcon,
      title: "Chat",
      current: false,
    },
    { href: "", icon: UserGroupIcon, title: "Users", current: false },
    {
      href: "/businessSettings",
      icon: BriefcaseIcon,
      title: "Workplace",
      current: false,
    },
    {
      href: "/upsells",
      icon: ShoppingCartIcon,
      title: "Upsells",
      current: false,
    },
    {
      href: "/locks",
      icon: LockClosedIcon,
      title: "Locks",
      current: false,
    }
  ];

  var nav = navigation.forEach((item) => {
    item.current = item.href === currentPage;
  });

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
                    {navigation.map((item, index) => (
                      <li
                        key={index}
                        className="hover:bg-indigo-100 p-3 rounded-md flex items-center space-x-2"
                      >
                        <a
                          href={item.href}
                          className="flex items-center space-x-2 w-full"
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-indigo-700"
                                : "text-gray-600",
                              "w-6 h-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          <p
                            className={classNames(
                              item.current
                                ? "text-[#7000FF] font-sm font-[500]"
                                : "text-gray-600"
                            )}
                          >
                            {item.title}
                          </p>
                        </a>
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

          <div className="flex flex-col h-[100%] w-full">
            {children && (
              <main className="h-[100%] bg-gray-100 rounded-md">
                <div className="h-[100%]">
                  <div className=" flex justify-start items-center gap-5 bg-[#141B37] h-[50px] pl-5 ">
                    {NavbarContent && (
                      <div className="w-[100%] pr-10 ">{NavbarContent}</div>
                    )}
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
