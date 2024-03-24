'use client';

import { envConfig } from '@/utility/environment';
import { supabase } from '@/utility/supabase';

import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { checkUserSession } from '@/auth/auth';
import { useRouter } from 'next/navigation';

const ForgetPassword = () => {

    const router = useRouter();

    const userInfo = async () => {
        return await checkUserSession();
    };

    useEffect(() => {
        userInfo().then(async (isLoggedIn) => {
            if (isLoggedIn) {
                router.push('/login');
            }
        });
    }, []);

    return (
        <div className='grid grid-cols-2'>
            <div className='bg-[#141B37] right-0 h-screen'>
                <img src="/assets/securestay.png" alt="" className="h-12 px-2" />
            </div>
            <div className="flex  justify-center items-center sm:mx-auto  sm:w-full  ">
                <div
                    className="bg-white py-4 rounded-md border-2 px-4 "
                >
                    <h1 className='text-lg font-semibold py-4'>Forget Password</h1>
                    <EmailVerificationForm />
                </div>

            </div>

        </div>
    );
};

export default ForgetPassword;




const EmailVerificationForm = () => {

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleEmailChange = (event: any) => {
        event.preventDefault();
        const enteredEmail = event.target.value;
        setEmail(enteredEmail);

        // Basic email validation using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(enteredEmail);
        setIsValidEmail(isValid);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();


        const response: any = await axios.get(`${envConfig.backendUrl}/users/check_user_email?email=${email}`);

        if (response?.data?.success == false) {
            toast.error(response.data.message);

        } else if (response?.data?.success == true) {

            try {

                const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: `${window.location.href}/resetpassword`
                });
                if (data) {
                    toast.success("Check email for password reset!!!", {
                        duration: 3000
                    });
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 3000);
                }
                if (error) {
                    toast.error(error.message);
                }



            } catch (error: any) {
                toast.error(error);
            }
        }


    };


    return (
        <form action="" onSubmit={handleSubmit}>
            <Toaster />
            <div className='h-40  w-full '>

                <label
                    htmlFor="email"
                    className="block text-[1rem] font-medium text-gray-700"
                >
                    Email
                </label>
                <div className="relative py-4">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">

                        <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.6663 18.3334H11.9997V16.6667C11.9997 15.286 10.8804 14.1667 9.49967 14.1667H4.49967C3.11897 14.1667 1.99967 15.286 1.99967 16.6667V18.3334H0.333008V16.6667C0.333008 14.3655 2.19849 12.5 4.49967 12.5H9.49967C11.8008 12.5 13.6663 14.3655 13.6663 16.6667V18.3334ZM6.99967 10.8334C4.23825 10.8334 1.99967 8.59479 1.99967 5.83337C1.99967 3.07195 4.23825 0.833374 6.99967 0.833374C9.76109 0.833374 11.9997 3.07195 11.9997 5.83337C11.9997 8.59479 9.76109 10.8334 6.99967 10.8334ZM6.99967 9.16671C8.84059 9.16671 10.333 7.67432 10.333 5.83337C10.333 3.99242 8.84059 2.50004 6.99967 2.50004C5.15872 2.50004 3.66634 3.99242 3.66634 5.83337C3.66634 7.67432 5.15872 9.16671 6.99967 9.16671Z" fill="#72767A" />
                        </svg>

                    </div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(event) => handleEmailChange(event)}
                        className="block min-w-80 appearance-none rounded-md border border-gray-300 pr-3 pl-10 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                    />
                </div>
                {!isValidEmail && (
                    <p className="flex text-red-500 text-xs mt-1">Please enter a valid email address</p>
                )}

                <button
                    type='submit'
                    className='border-2 rounded-md px-6 py-1 font-medium bg-indigo-600 text-white'
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

