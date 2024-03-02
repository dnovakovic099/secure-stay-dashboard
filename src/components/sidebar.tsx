// /* eslint-disable @next/next/no-img-element */
// 'use client';
// import React, { ReactNode } from 'react';
// import { usePathname } from 'next/navigation';
// import classNames from 'classnames';

// import {
//   HomeIcon,
//   BuildingOffice2Icon,
//   ChatBubbleLeftRightIcon,
//   UserGroupIcon,
//   BriefcaseIcon,
//   ShoppingCartIcon,
// } from '@heroicons/react/20/solid';
// import { Toaster } from 'react-hot-toast';
// import Link from 'next/link';
// import Image from 'next/image';
// import { GoPeople } from 'react-icons/go';
// import { BiBuildingHouse } from 'react-icons/bi';
// import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
// import { MdOutlineSell } from 'react-icons/md';
// import { HiOutlineBriefcase } from 'react-icons/hi2';
// import { ChevronRightIcon } from '@heroicons/react/20/solid';
// import Logo from '../assets/logo.svg';

// // function classNames(...classes: string[]) {
// //   return classes.filter(Boolean).join(" ");
// // }

// interface SideBarMainProps {
//   children: ReactNode;
// }

// const SideBarMain: React.FC<SideBarMainProps> = ({ children }) => {
//   const currentPage = usePathname();
//   const navigation = [
//     { href: '/dashboard', icon: HomeIcon, current: false },
//     { href: '/listing', icon: BuildingOffice2Icon, current: false },
//     { href: '/messages', icon: ChatBubbleLeftRightIcon, current: false },
//     { href: '', icon: UserGroupIcon, current: false },
//     { href: '/businessSettings', icon: BriefcaseIcon, current: false },
//     { href: '/upsells', icon: ShoppingCartIcon, current: false },
//   ];

//   var nav = navigation.forEach((item) => {
//     item.current = item.href === currentPage;
//   });

//   return (
//     <>
//       <div>
//         <Toaster />
//         {/* Static sidebar for desktop - */}
//         <div className="flex flex-row h-screen p-4 bg-gray-300">
//           <div className="sticky lg:w-12 lg:flex-col">
//             <div className="flex flex-col">
//               {/* Nav button */}
//               <nav className="flex flex-1 flex-col px-2">
//                 <ul role="list" className="-mx-2 my-4 space-y-8">
//                   {navigation.map((item, index) => (
//                     <li key={index}>
//                       <a href={item.href}>
//                         <item.icon
//                           className={classNames(
//                             item.current ? 'text-dark' : 'text-gray-600',
//                             'h-8 w-8 shrink-0',
//                           )}
//                           aria-hidden="true"
//                         />
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </nav>
//             </div>
//           </div>

//           <div className="flex flex-col h-[100%] w-full">
//             {children && (
//               <main className="h-[100%] bg-gray-100 rounded-md">
//                 <div className="h-[100%]">{children}</div>
//               </main>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// function Sidebar() {
//   const currentPath = usePathname();

//   const navigation = [
//     {
//       href: '/listing',
//       label: 'Listing',
//       icon: BiBuildingHouse,
//       current: false,
//     },
//     {
//       href: '/upsells',
//       label: 'Upsells',
//       icon: MdOutlineSell,
//       current: false,
//     },
//     {
//       href: '/messages',
//       label: 'Chat',
//       icon: HiOutlineChatBubbleLeftRight,
//       current: false,
//     },
//     { href: 'guestes', label: 'Guestes', icon: GoPeople, current: false },
//     {
//       href: '/businessSettings',
//       label: 'Workplaces',
//       icon: HiOutlineBriefcase,
//       current: false,
//     },
//   ];

//   return (
//     <aside className="w-1/8 flex flex-col justify-between h-screen">
//       <div className="bg-white">
//         <a
//           href="/dashboard"
//           className="h-16 flex px-4 text-lg font-semibold items-center bg-[#141b37] text-white justify-start"
//         >
//           <Image src={Logo} alt="logo" width={150} height={150} />
//         </a>
//         <div className="py-4 lg:sticky lg:flex-col w-full">
//           <div className="flex flex-col">
//             <nav className="flex flex-1 flex-col px-2">
//               <ul role="list" className="-mx-2 space-y-3">
//                 {navigation.map((item, index) => (
//                   <li
//                     className="flex items-center gap-2 text-zinc-400 text-base m-0"
//                     key={index}
//                   >
//                     <Link
//                       href={item.href}
//                       className={classNames({
//                         'w-full px-3 py-2 flex items-center gap-2': true,
//                         'border-l-4 border-white hover:border-indigo-500':
//                           currentPath !== item.href,
//                         'text-indigo-500 border-l-4 border-indigo-500':
//                           currentPath === item.href,
//                       })}
//                     >
//                       <item.icon
//                         className={classNames(
//                           'h-6 w-6 shrink-0 text-gray-500',
//                           {
//                             'text-indigo-500': currentPath === item.href,
//                           },
//                         )}
//                         aria-hidden="true"
//                       />
//                       <p
//                         className={classNames('text-gray-500 text-base', {
//                           'text-indigo-500': currentPath === item.href,
//                         })}
//                       >
//                         {item.label}
//                       </p>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </div>
//       <div className="flex items-center space-x-4 my-4 mx-2 p-4 bg-gray-100 rounded-lg">
//         <div className="flex-shrink-0">
//           <Image
//             className="object-cover h-12 w-12 rounded-full cursor-pointer"
//             src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
//             alt="hotel"
//             width={48}
//             height={48}
//           />
//         </div>
//         <div className="flex flex-col flex-grow">
//           <p className="text-lg font-semibold text-gray-900 truncate">
//             Alex Stanton
//           </p>
//           <p className="text-sm text-gray-500">Super Admin</p>
//         </div>
//         <ChevronRightIcon
//           className="h-6 w-6 text-gray-400 group-hover:text-gray-500 transition duration-300 transform group-hover:translate-x-1 cursor-pointer"
//           aria-hidden="true"
//         />
//       </div>
//     </aside>
//   );
// }

// export { Sidebar, SideBarMain };

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
            <div className={"flex flex-col min-h-screen"}>
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
                                ? "text-indigo-700 font-bold"
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
