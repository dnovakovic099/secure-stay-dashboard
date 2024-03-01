"use client";
import React, { useState } from 'react';
import { envConfig } from '@/utility/environment';
import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

const Form = (props: any) => {
    const { closeModal, getSifelyLocks } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleUsernameChange = (value: string) => {
        setUsername(value);
    };
    const handlePasswordChange = (value: string) => {
        setPassword(value);
    };

    const handleSubmit = async () => {
        const apiUrl = `${envConfig.backendUrl}/device/sifely/getaccesstoken`;

        if (username == '' || password == '') {
            return toast.error('Please enter the credentials!');
        }

        setIsLoading(true);

        await axios.post(apiUrl, { username, password })
            .then((response) => {

                setIsLoading(false);

                if (response.status == 200 && response.data?.success) {
                    //store the access_token in the local storage          
                    localStorage.setItem('sifely_access_token', response.data?.data?.access_token);
                    localStorage.setItem('sifely_refresh_token', response.data?.data?.refresh_token);

                    closeModal();
                    getSifelyLocks();
                    toast.success(response.data?.message);
                    return;
                }

                toast.error(response.data?.message);
            })
            .catch((error) => {
                toast.error(error?.message);
            });

    };

    return (
        <div className=' px-5 py-6 rounded-md'>
            <div className='text-center font-semibold -mt-14 text-indigo-600 py-2 text-2xl mb-6'>Login to Sifely Account</div>
            <div className='flex space-x-5 '>
                <div>
                    <img
                        src='https://www.schlage.com/content/dam/sch-us/homepage-refresh/smart-lock.png'
                        alt=''
                        height={80}
                        width={110}
                    />
                </div>
                <hr />
                <div>
                    <label className="block text-indigo-900 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => handleUsernameChange(e.target.value)}
                    />
                    <div className="mb-6">
                        <label className="block text-indigo-900 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline text-base"
                            id="password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-start ">

                        <button
                            disabled={isLoading}
                            onClick={() => handleSubmit()}
                            className=" rounded-md w-full bg-indigo-600 px-10 py-1 text-base font-medium  text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                        >
                            {isLoading ? 'Processing..' : 'Sign In'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;