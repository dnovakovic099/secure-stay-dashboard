'use client';
import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { GoHome } from 'react-icons/go';
import { BiBuildingHouse } from 'react-icons/bi';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { FaUsers } from 'react-icons/fa';
import { HiOutlineBriefcase } from 'react-icons/hi2';

import classNames from 'classnames';

//

import { FaPlus } from 'react-icons/fa6';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { HiMiniBarsArrowDown } from 'react-icons/hi2';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { RiMenu3Line } from 'react-icons/ri';

import {
  EllipsisVerticalIcon,
  BarsArrowDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';

export default function Home() {
  const currentPath = usePathname();

  const navigation = [
    { href: '/dashboard', label: 'Dashboard', icon: GoHome, current: false },
    {
      href: '/listing',
      label: 'Listings',
      icon: BiBuildingHouse,
      current: false,
    },
    {
      href: '/messages',
      label: 'Chat',
      icon: HiOutlineChatBubbleLeftRight,
      current: false,
    },
    { href: '', label: 'Guestes', icon: FaUsers, current: false },
    {
      href: '/businessSettings',
      label: 'Workplaces',
      icon: HiOutlineBriefcase,
      current: false,
    },
  ];

  return (
    <h1>Hello</h1>
    // <main className="flex">
    //   <div className="sticky top-0 w-[70%] md:w-1/3 lg:w-[18%] h-screen overflow-y-auto">
    // <div className="flex flex-row h-screen p-4 bg-white">
    //   <div className="lg:sticky lg:flex-col w-full">
    //     <div className="flex flex-col">
    //       <nav className="flex flex-1 flex-col px-2">
    //         <ul role="list" className="-mx-2 space-y-3">
    //           {navigation.map((item, index) => (
    //             <li
    //               className="flex items-center gap-2 text-zinc-400 text-md m-0"
    //               key={index}
    //             >
    //               <Link
    //                 href={item.href}
    //                 className={classNames({
    //                   'w-full p-2 flex items-center gap-2 rounded-md': true,
    //                   'hover:bg-zinc-100': currentPath !== item.href,
    //                   'bg-blue-600': currentPath === item.href,
    //                 })}
    //               >
    //                 <item.icon
    //                   className={classNames('h-6 w-6 shrink-0 text-dark', {
    //                     'text-white': currentPath === item.href,
    //                     'hover:text-white': currentPath === item.href,
    //                   })}
    //                   aria-hidden="true"
    //                 />
    //                 <p
    //                   className={classNames('text-dark text-sm', {
    //                     'text-white hover:text-white':
    //                       currentPath === item.href,
    //                   })}
    //                 >
    //                   {item.label}
    //                 </p>
    //               </Link>
    //             </li>
    //           ))}
    //         </ul>
    //       </nav>
    //     </div>
    //   </div>
    // </div>
    //   </div>
    //   {/* Search box */}
    // <div className="w-1/2 sticky top-0 z-10 flex h-16 flex-shrink-0 bg-red-400">
    //   <div className=" flex flex-1 justify-between px-6">
    //     <div className="flex flex-1">
    //       <div
    //         className={classNames(
    //           'ml-0',
    //           'text-lg md:text-2xl lg:text-2xl font-bold m-auto flex items-center',
    //         )}
    //       >
    //         <p className="text-md font-[500] text-dark ">Listings</p>
    //         <div className="pl-10 text-lg md:text-xl lg:text-2xl font-normal m-auto flex">
    //           <div className="border-gray-600 sm:flex">
    //             <div>
    //               <div className="flex rounded-md shadow-sm">
    //                 <div className="relative flex-grow focus-within:z-10">
    //                   <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
    //                     <MagnifyingGlassIcon
    //                       className="h-5 w-5 text-gray-400"
    //                       aria-hidden="true"
    //                     />
    //                   </div>
    //                   <div className="absolute inset-y-0 right-0 flex items-center pr-3">
    //                     <Menu as="div" className="relative flex-none">
    //                       <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
    //                         <span className="sr-only">Open options</span>
    //                         <BarsArrowDownIcon
    //                           className="h-5 w-5"
    //                           aria-hidden="true"
    //                         />
    //                       </Menu.Button>
    //                       <Transition
    //                         enter="transition ease-out duration-100"
    //                         enterFrom="transform opacity-0 scale-95"
    //                         enterTo="transform opacity-100 scale-100"
    //                         leave="transition ease-in duration-75"
    //                         leaveFrom="transform opacity-100 scale-100"
    //                         leaveTo="transform opacity-0 scale-95"
    //                       >
    //                         {/* <Menu.Items className="absolute w-52 right-0 z-10 mt-2 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
    //                         </Menu.Items> */}
    //                       </Transition>
    //                     </Menu>
    //                   </div>
    //                   <input
    //                     type="text"
    //                     name="desktop-search-candidate"
    //                     id="desktop-search-candidate"
    //                     className="w-full rounded-md border-0 py-1.5 pl-10 pr-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:text-indigo-600"
    //                     placeholder="Search..."
    //                     // onChange={(e) => handleSearch(e.target.value)}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="flex items-center gap-3">
    //       <button
    //         className={classNames(
    //           'flex flex-row whitespace-nowrap',
    //           'bg-blue-600 pr-4 text-sm text-white',
    //           'font-semibold py-1.5 px-2.5 border border-blue-600 rounded-md items-center',
    //         )}
    //         // onClick={() => handleButtonClick("create")}
    //       >
    //         <PlusIcon
    //           className="text-white mr-4 flex-shrink-0 h-6 w-6"
    //           aria-hidden="true"
    //         />
    //         Create listing group
    //       </button>
    //     </div>
    //   </div>
    // </div>
    // </main>
  );
}
