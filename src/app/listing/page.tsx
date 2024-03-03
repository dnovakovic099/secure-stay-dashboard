/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { envConfig } from "@/utility/environment";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import classNames from "classnames";
import Searchbar from "@/components/searchbar";
import Box from "./Box";
import HotelDetail from "./HotelDetail";
import {
  HiOutlineBriefcase,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { MdOutlineSell } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { GoPeople } from "react-icons/go";
import Link from "next/link";
import { FiLock } from "react-icons/fi";
import {
  ChevronRightIcon,
  HomeIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import Logo from "../../assets/logo.svg";

function Sidebar() {
  const currentPath = usePathname();

  const navigation = [
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
    { href: "/", title: "Guestes", icon: GoPeople, current: false },
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

const MainMessageScreen = () => {
  const [sliceNum, setSliceNum] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${envConfig.backendUrl}/listing/getlistings`,
          {
            cache: "no-cache",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setListings(data.listings);
        setIsLoading(false);

        if (data.listings && data.listings.length > 0) {
          setSelectedItem(data.listings[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRightSide = (val: any) => {
    setSliceNum((num) => num + val);
  };

  const handleItemClick = (project: any) => {
    setSelectedItem(project);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden bg-[#f5f7f8]">
        <Searchbar />
        <main className="flex-1 overflow-y-auto">
          <Toaster />
          <div className="m-6 relative rounded-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              All Listings
            </h2>
            {isLoading ? (
              <div className="flex items-center justify-center h-[70vh]">
                <div className="w-12 h-12 border-4 border-blue-500 border-r-gray-100 rounded-full animate-spin"></div>
              </div>
            ) : (
              selectedItem && (
                <div className="relative">
                  <div
                    className={classNames(
                      "absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 bg-white p-1.5 rounded-full shadow-md hover:shadow-lg cursor-pointer",
                      { hidden: sliceNum <= 0 }
                    )}
                  >
                    <SlArrowLeft
                      className="text-sm"
                      onClick={() => {
                        if (sliceNum <= 0) return;
                        handleRightSide(-1);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {listings
                      ?.slice(sliceNum, sliceNum + 4)
                      .map((project: any) => (
                        <Box
                          key={project.id}
                          project={project}
                          selectedItem={selectedItem}
                          handleItemClick={handleItemClick}
                        />
                      ))}
                  </div>
                  <div
                    className={classNames(
                      "absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 bg-white p-1.5 rounded-full shadow-md hover:shadow-lg cursor-pointer transition-transform duration-300",
                      { hidden: sliceNum >= listings?.length - 4 }
                    )}
                  >
                    <SlArrowRight
                      className="text-sm"
                      onClick={() => {
                        if (sliceNum >= listings.length - 4) return;
                        handleRightSide(1);
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
          {selectedItem && <HotelDetail selectedItem={selectedItem} />}
        </main>
      </div>
    </div>
  );
};

export default MainMessageScreen;
