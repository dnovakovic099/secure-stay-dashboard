'use client';

import React, { Fragment, useEffect, useState } from 'react';
import {
    MagnifyingGlassIcon, ChevronUpDownIcon, PencilSquareIcon, TrashIcon, PlusIcon, AdjustmentsVerticalIcon,
    LinkIcon,
    XCircleIcon
} from "@heroicons/react/20/solid";
import { Popover, Transition } from '@headlessui/react';
import Pagination from '@/components/commonPagination';
import CommonDialog from '@/components/commonDailogBox';
import toast from 'react-hot-toast';


interface UserListProps {
    displayCreateModel: (value: boolean) => void;
    deleteUser: (id: number) => Promise<void>,
    searchUser: (name: string) => Promise<void>,
    fetchUserList: (page: number, limit: number, fullName: string) => Promise<void>,
    handleChangePage: (page: number) => void,
    handleChangeLimit: (limit: number) => void,
    editUser: (userId: number) => void,
    deleteMultipleUsers: (userIds: number[]) => Promise<any>,
    updateUsersStatus: (userIds: number[], status: number) => Promise<any>,
    currentPage: number,
    totalPages: number;
    userList: any[],
}

interface ActionOperationPros {
    handleDialogConfirmation: (value: string) => void;
}



const UserList = ({ displayCreateModel, deleteUser, handleChangePage, handleChangeLimit, currentPage, totalPages, userList, searchUser, editUser, deleteMultipleUsers, updateUsersStatus }: UserListProps) => {

    const [name, setName] = useState('');
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [operation, setOperation] = useState('');
    const [userId, setUserId] = useState(0);

    const handleCheckboxToggle = (userId: number) => {
        setSelectedUserIds(prev => {
            let updatedIds: number[];
            const index = prev.indexOf(userId);
            if (index === -1) {
                updatedIds = [...prev, userId];
            } else {
                updatedIds = prev.filter(id => id !== userId);
            }

            const allChecked = userList.every(user => updatedIds?.includes(user.userId));
            setSelectAllChecked(allChecked);

            return updatedIds;
        });
    };

    const handleSelectAllToggle = () => {
        if (!selectAllChecked) {
            const allUserIds = userList.map(user => user.userId);
            setSelectedUserIds(allUserIds);
        } else {
            setSelectedUserIds([]);
        }
        setSelectAllChecked(prev => !prev);
    };

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            searchUser(name);
        }, 1000);
        return () => clearTimeout(delaySearch);
    }, [name]);



    const handleMultipleOperation = (operation: string) => {

        switch (operation) {

            case 'delete':
                deleteMultipleUsers(selectedUserIds);
                setSelectedUserIds([]);
                setSelectAllChecked(false);
                break;

            case 'activate':
                updateUsersStatus(selectedUserIds, 1);
                setSelectedUserIds([]);
                setSelectAllChecked(false);
                break;

            case 'deactivate':
                updateUsersStatus(selectedUserIds, 0);
                setSelectedUserIds([]);
                setSelectAllChecked(false);
                break;

            case 'update':
                editUser(userId);
                break;
            case 'remove':
                deleteUser(userId);
                break;
            default:
                break;
        }
    };

    const handleDialogConfirmation = (operation: string): void => {
        if (userId == 0 || selectedUserIds.length !== 0) {

            setIsDialogOpen(true);
            setDialogMessage(`Are you sure want to ${operation}?`);
            setOperation(operation);

        } else {
            toast.error("Please select user!!!");
        }

    };

    const renderUserList = userList?.map(data => {
        return (
            <tr
                key={data.userId}
                className="grid grid-cols-12 bg-white shadow-sm border-b-2 rounded-b-xl py-2 px-4 items-center text-gray-500 font-medium hover:z-0 hover:border-indigo-600 text-[0.85rem]"
            >

                <td className="col-span-1 text-end flex justify-between pr-5 space-x-2  items-center">

                    <div className=' items-center '>
                        <input
                            type="checkbox"
                            value={data.userId}
                            checked={selectedUserIds.includes(data.userId)}
                            onChange={() => handleCheckboxToggle(data.userId)}
                            className='outline-none w-4 h-4'
                        />
                    </div>

                    <div className='w-8 h-8  items-center text-center pt-1  bg-indigo-700 rounded-[50%]'>
                        <span className='text-[1rem] font-semibold text-white'>
                            {data.fullName.charAt(0).toUpperCase()}
                        </span>
                    </div>
                </td>

                <td className="col-span-2 text-start">{data.fullName}</td>
                <td className="col-span-3 text-start">{data.email}</td>
                <td className="col-span-2 text-start">
                    {data.contact ? `${data.dialCode ? data.dialCode : ''} ${data.contact}` : '0000000000'}
                </td>
                <td className="col-span-2 text-start">{data.userType}</td>

                <td className="col-span-1 text-start ">
                    <span
                        className={` rounded-full text-xs px-2 py-0.5  ${data.status == 1 ? 'bg-green-200 text-green-800' : "bg-red-200 text-red-800"}`}>
                        {data.status == 1 ? 'Active' : "Inactive"}
                    </span>
                </td>

                <td className="col-span-1 text-end flex justify-center space-x-2">
                    <PencilSquareIcon color='blue' className='w-5' onClick={() => {
                        handleDialogConfirmation('update');
                        setUserId(data.userId);
                    }} />

                    <TrashIcon color='red' className='w-5' onClick={() => {
                        handleDialogConfirmation('remove');
                        setUserId(data.userId);
                    }} />
                </td>
            </tr>
        );
    });

    return (
        <div >
            <div className='flex justify-between mb-2 py-2'>

                <div className='flex space-x-4'>

                    <div className='flex items-center  rounded-md bg-white px-2 min-w-80 shadow-md'>

                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text" className=' px-1.5 py-0.5 text-sm outline-none  rounded-md w-full text-indigo-800 font-medium ' placeholder='Search...'
                        />

                    </div>

                    <div
                        className='flex items-center  rounded-md bg-white px-2 max-w-24 shadow-md'
                    >
                        <AdjustmentsVerticalIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />

                        <select
                            onChange={(e) => handleChangeLimit(parseInt(e.target.value))}
                            className=' px-1.5 py-0.5 text-sm outline-none  rounded-md w-full text-indigo-600 font-medium '>

                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>50</option>
                            <option value={40}>100</option>

                        </select>
                    </div>
                </div>


                <div className='flex space-x-2 items-center'>
                    <button
                        onClick={() => displayCreateModel(true)}
                        className='px-2 py-1 flex bg-indigo-600 text-white  font-medium rounded-md items-center'><PlusIcon className='w-5' />
                        Create New
                    </button>
                    <ActionOperationPopUp
                        handleDialogConfirmation={handleDialogConfirmation}
                    />
                </div>
            </div>

            <div className='max-h-[72vh] overflow-y-scroll  ' >

                <table className=' w-full bg-transparent'>

                    <thead className='w-full sticky top-0 z-0 bg-indigo-700'>
                        <tr className="grid grid-cols-12 text-white px-4 py-2 bg-indigo-700 items-center rounded-t-md">
                            <th className="col-span-1 text-start flex font-medium"><div className=' items-center '>
                                <input
                                    type="checkbox"
                                    checked={selectAllChecked}
                                    onChange={handleSelectAllToggle}
                                    className='outline-none w-4 h-4'
                                />
                            </div></th>

                            <th className="col-span-2 text-start flex font-medium">Name<ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400 pt-1"
                                aria-hidden="true"
                            /></th>

                            <th className="col-span-3 text-start flex font-medium">Email<ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400 pt-1"
                                aria-hidden="true"
                            /></th>

                            <th className="col-span-2 text-start flex font-medium">Contact<ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400 pt-1"
                                aria-hidden="true"
                            /></th>

                            <th className="col-span-2 text-start flex font-medium">User type<ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400 pt-1"
                                aria-hidden="true"
                            /></th>

                            <th className="col-span-1 text-start flex font-medium">Status<ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400 pt-1"
                                aria-hidden="true"
                            /></th>

                            <th className="col-span-1 text-start flex  items-center font-medium">
                                Action<ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400 pt-1"
                                    aria-hidden="true"
                                />
                            </th>

                        </tr>
                    </thead>

                    <tbody>
                        {renderUserList}
                    </tbody>

                </table>

            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handleChangePage}
            />
            {
                isDialogOpen && <CommonDialog
                    isOpen={isDialogOpen}
                    onClose={() => {
                        setIsDialogOpen(false);
                        setDialogMessage('');
                        setOperation('');
                        setUserId(0);
                    }}
                    onYes={() =>
                        handleMultipleOperation(operation)
                    }
                    message={dialogMessage}
                />
            }

        </div>
    );
};

export default UserList;



const ActionOperationPopUp = ({ handleDialogConfirmation }: ActionOperationPros) => {

    const multipleUsersOperation = [
        {
            name: "Delete Users",
            icon: TrashIcon,
            operation: 'delete',
        },
        {
            name: "Activate Users",
            icon: LinkIcon,
            operation: 'activate',
        },
        {
            name: "Deactivate Users",
            icon: XCircleIcon,
            operation: 'deactivate',
        },
    ];

    return (
        <Popover className="relative">
            {({ open }) => (<>
                <Popover.Button
                    className={`${open ? "text-white" : "text-white/90"}
                          group inline-flex items-center justify-center rounded-full bg-gray-200 w-8 h-8 text-base font-bold hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                    style={{ borderRadius: "50%" }}>
                    <span className="mb-2 font-extrabold text-indigo-600">...</span>
                </Popover.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-5"
                >
                    <Popover.Panel className="absolute right-1 z-20 mt-2 min-w-52 max-w-sm translate-x-1 transform px-4 sm:px-0 lg:max-w-sm">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                            <div className="relative grid gap-1 bg-white p-2 lg:grid-cols-1">
                                {multipleUsersOperation?.map((item) => (
                                    <button
                                        key={item.name}
                                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500/50"
                                        onClick={() => {
                                            handleDialogConfirmation(item.operation);
                                        }}
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                            <item.icon
                                                aria-hidden="true"
                                                className="w-8 h-8 text-indigo-700"
                                            />
                                        </div>
                                        <div className="ml-2">
                                            <p className="text-sm font-medium text-gray-900">
                                                {item.name}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </>
            )}
        </Popover>
    );
};



