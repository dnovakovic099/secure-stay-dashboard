'use client';

import { supabase } from "@/utility/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


export default function PasswordReset() {

    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLinkValid, setIsLinkValid] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const { data, error } = await supabase.auth.updateUser({
                password: confirmPassword
            });

            if (data) {
                toast.success("Password changed successfully!!!");
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            }

            if (error) {
                toast.error("Something went wrong!!! Try again!!!");
            }
        } catch (error) {

            setIsLoading(false);
        }
    };

    const checkValidUrl = async () => {
        const { data, error } = await supabase.auth.getSession();
        if (data.session) {
            setIsLinkValid(true);
        }
        if (error) {
            setIsLinkValid(false);
        }
    };


    useEffect(() => {
        const checkLoggedIn: any = localStorage?.getItem('isLoggedIn');

        if (checkLoggedIn == 'true') {
            return router.push('/login');
        } else {
            checkValidUrl();
        }
    }, []);

    if (isLinkValid) {
        return (

            <div className='grid grid-cols-2'>
                <Toaster />
                <div className='bg-[#141B37] right-0 h-screen '  >
                    <img src="/assets/securestay.png" alt="" className="h-12 px-2" />
                    T</div>
                <div className=" flex justify-center items-center sm:mx-auto  sm:w-full  ">
                    <div
                        className="bg-white py-4 px-4 shadow-md sm:rounded-lg sm:px-6 min-w-[402px]"
                    >
                        <form onSubmit={(event) => handleSubmit(event)}>
                            <div className="py-5">
                                <h1 className="text-lg font-semibold">Change Password</h1>
                            </div>
                            <div className=' space-y-3 '>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        New Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="mt-1 relative ">
                                        <input
                                            id="password"
                                            name="password"
                                            autoComplete="current-password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required
                                            placeholder="********"
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                                        />
                                        <div className=" absolute inset-y-0 right-0 flex items-center pr-3">
                                            <div onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        className="w-5 h-5 text-gray-400"
                                                    >
                                                        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        className="w-5 h-5 text-gray-400"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
                                                            clipRule="evenodd"
                                                        />
                                                        <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className='space-y-2'>
                                        <label
                                            htmlFor="confirmPassword"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Confirm Password <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-1 relative ">
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                autoComplete="current-password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(event) => setConfirmPassword(event.target.value)}
                                                required
                                                placeholder="********"
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                                            />
                                            <div className=" absolute inset-y-0 right-0 flex items-center pr-3">
                                                <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                    {showConfirmPassword ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            className="w-5 h-5 text-gray-400"
                                                        >
                                                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            className="w-5 h-5 text-gray-400"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
                                                                clipRule="evenodd"
                                                            />
                                                            <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <p className="flex text-red-500 text-xs mt-1">{error}</p>
                                )}

                                <button
                                    type='submit'
                                    className='border-2 rounded-md px-6 py-1 font-medium bg-indigo-600 text-white'
                                >
                                    {isLoading ? "Saving" : "Save"}
                                </button>
                            </div>
                        </form >
                    </div>

                </div>

            </div>

        );
    } else {
        return (
            <div className="flex py-20 flex-col justify-center items-center  text-center">
                <p>Link has been expired!!!</p>

                <Link href='/login' className="hover:underline text-blue-600">Login</Link>
            </div>
        );
    }


}
