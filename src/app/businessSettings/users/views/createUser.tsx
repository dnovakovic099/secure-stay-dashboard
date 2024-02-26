'use client';
import React from 'react';
import { XCircleIcon } from "@heroicons/react/20/solid";
import CreateUserForm from './createUserForm';

interface UserData {
    fullName: string,
    email: string,
    contact: any,
    userType: string,
    dialCode: string,
}

interface CreateUserProps {
    displayCreateModel: (value: boolean) => void;
    createUser: (userData: UserData) => Promise<any>;
}

const CreateUser = ({ displayCreateModel, createUser }: CreateUserProps) => {

    return (
        <div className={`fixed inset-0 flex items-center justify-center`}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg  z-10">

                <div className="flex justify-end pr-1 pt-1">
                    <button
                        onClick={() => {
                            displayCreateModel(false);
                        }}
                        className="flex justify-center items-center text-gray-600 cursor-pointer  w-10 h-10 hover:text-red-500">
                        <XCircleIcon
                            className='w-8 text-indigo-900 hover:text-red-500 ' />
                    </button>
                </div>

                <CreateUserForm
                    createUser={createUser}
                />
            </div>
        </div>
    );
};

export default CreateUser;
