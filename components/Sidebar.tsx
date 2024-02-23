/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { GoPeople } from 'react-icons/go';
import { BiBuildingHouse } from 'react-icons/bi';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { MdOutlineSell } from 'react-icons/md';
import { HiOutlineBriefcase } from 'react-icons/hi2';
import classNames from 'classnames';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Logo from '@/assets/logo.svg';

function Sidebar() {
  const currentPath = usePathname();

  const navigation = [
    {
      href: '/listings',
      label: 'Listings',
      icon: BiBuildingHouse,
      current: false,
    },
    {
      href: '/upsells',
      label: 'Upsells',
      icon: MdOutlineSell,
      current: false,
    },
    {
      href: '/messages',
      label: 'Chat',
      icon: HiOutlineChatBubbleLeftRight,
      current: false,
    },
    { href: 'guestes', label: 'Guestes', icon: GoPeople, current: false },
    {
      href: '/busineSsettings',
      label: 'Workplaces',
      icon: HiOutlineBriefcase,
      current: false,
    },
  ];

  return (
    <aside className="w-1/6 flex flex-col justify-between h-screen">
      <div className="bg-white">
        <div className="h-16 flex px-4 text-[20px] font-semibold items-center bg-[#141b37] text-white justify-start">
          <Image src={Logo} alt="logo" width={150} height={150} />
        </div>
        <div className="py-4 lg:sticky lg:flex-col w-full">
          <div className="flex flex-col">
            <nav className="flex flex-1 flex-col px-2">
              <ul role="list" className="-mx-2 space-y-3">
                {navigation.map((item, index) => (
                  <li
                    className="flex items-center gap-2 text-zinc-400 text-md m-0"
                    key={index}
                  >
                    <Link
                      href={item.href}
                      className={classNames({
                        'w-full px-3 py-2 flex items-center gap-2': true,
                        'border-l-4 border-white hover:border-indigo-500':
                          currentPath !== item.href,
                        'text-indigo-500 border-l-4 border-indigo-500':
                          currentPath === item.href,
                      })}
                    >
                      <item.icon
                        className={classNames(
                          'h-6 w-6 shrink-0 text-gray-500',
                          {
                            'text-indigo-500': currentPath === item.href,
                          },
                        )}
                        aria-hidden="true"
                      />
                      <p
                        className={classNames('text-gray-500 text-lg', {
                          'text-indigo-500': currentPath === item.href,
                        })}
                      >
                        {item.label}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 my-4 mx-2  p-4 bg-slate-50 rounded-lg">
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
          <p className="text-lg font-semibold text-gray-900 line-clamp-1">
            Alex Stanton
          </p>
          <p className="text-gray-500 text-sm">Super Admin</p>
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
