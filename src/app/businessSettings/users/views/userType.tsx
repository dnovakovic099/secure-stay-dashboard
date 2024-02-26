'use client';

import React, { useState } from 'react';
import { UserIcon, UserGroupIcon, UsersIcon, UserCircleIcon } from "@heroicons/react/20/solid";

interface UserTypeProps {
    handleChange: (name: string, value: any) => void;
    selectedRole: string,
    setSelectedRole: Function;
}

const UserType = ({ handleChange, selectedRole, setSelectedRole }: UserTypeProps) => {


    const userType = [
        {
            role: 'Admin',
            icon: <UserCircleIcon className='w-10' />,
            desc: 'Can perform all the operation.'
        },
        {
            role: 'Team',
            icon: <UserGroupIcon className='w-10' />,
            desc: 'Can perform all the operation.'
        },
        {
            role: 'Virtual Assistant',
            icon: <UsersIcon className='w-10' />,
            desc: 'Can perform all the operation.'
        },
        {
            role: 'Co-Host',
            icon: <UserIcon className='w-10' />,
            desc: 'Can perform all the operation. also can test the apis'
        },
    ];


    return (
        <div className='py-3'>
            <p className='text-indigo-900 font-semibold py-2 text-left'>User Type</p>
            <div className='grid grid-cols-2 gap-4 '>
                {userType?.map(data => {
                    return (
                        <div
                            key={data.role}
                            onClick={() => {
                                handleChange('userType', data.role);
                                setSelectedRole(data.role);
                            }}
                            className={`shadow-md  border-t rounded-md flex flex-col text-center space-y-1 px-2  py-2 hover:scale-105 hover:border-indigo-600 ${selectedRole == data.role ? "bg-indigo-200" : ''}`}

                        >
                            <div className='flex justify-center text-indigo-800'>
                                {data.icon}
                            </div>
                            <div className='text-indigo-600 font-semibold'>{data.role}</div>
                            <div className='text-sm text-gray-600'>{data.desc}</div>
                        </div>
                    );
                })
                }
            </div>
        </div>

    );
};

export default UserType;