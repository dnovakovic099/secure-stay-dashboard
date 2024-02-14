"use client"; //This is client component
import React, { ReactNode } from 'react';
//Next Import
import { usePathname } from 'next/navigation';
//Headless UI
import { HomeIcon, BuildingOffice2Icon, ChatBubbleLeftRightIcon, UserGroupIcon, BriefcaseIcon } from "@heroicons/react/20/solid";
// Toaster
import { Toaster } from 'react-hot-toast';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface SideBarMainProps {
    children: ReactNode;
}

const SideBarMain: React.FC<SideBarMainProps> = ({ children }) => {

    const currentPage = usePathname();
    const navigation = [
        { href: '/dashboard', icon: HomeIcon, current: false },
        { href: '', icon: BuildingOffice2Icon, current: false },
        { href: '/messages', icon: ChatBubbleLeftRightIcon, current: false, },
        { href: '', icon: UserGroupIcon, current: false },
        { href: '/businessSettings', icon: BriefcaseIcon, current: false, },
    ]

    var nav = navigation.forEach((item) => {
        item.current = (item.href === currentPage)
    })

    return (
        <>
            <div>
                <Toaster />
                {/* Static sidebar for desktop - */}
                <div className='flex flex-row h-screen p-4 bg-gray-300'>
                    <div className="sticky lg:w-12 lg:flex-col">
                        <div className="flex flex-col ">
                            {/* Nav button */}
                            <nav className="flex flex-1 flex-col px-2">
                                <ul role="list" className="-mx-2 space-y-4">
                                    {navigation.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={item.href}
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        item.current ? 'text-dark' : 'text-gray-600',
                                                        'h-8 w-8 shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className='flex flex-col h-[100%] w-full'>
                        {children &&
                            <main className='h-[100%] bg-gray-100 rounded-md'>
                                <div className="h-[100%]">
                                    {children}
                                </div>
                            </main>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBarMain;
