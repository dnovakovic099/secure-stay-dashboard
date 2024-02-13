import { EnvelopeIcon, CloudIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
//seam commponents
import { SeamProvider } from "@seamapi/react"

const Login = () => {

    const router = useRouter();
    const [isloading, setIsloading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

    const handleEmailChange = (event: any) => {
        event.preventDefault();
        const enteredEmail = event.target.value;
        setEmail(enteredEmail);

        // Basic email validation using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(enteredEmail);
        
        setIsValidEmail(isValid);
    };

    const handlePasswordChange = (event:any) => {
        event.preventDefault();
        const enteredPassword = event.target.value;
        setPassword(enteredPassword);

        // Password validation: at least 8 characters, at most 20 characters, and at least one number
        const passwordRegex = /^(?=.*\d).{8,20}$/;
        const isValid = passwordRegex.test(enteredPassword);

        setIsValidPassword(isValid);
    };
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log("login");
        router.replace("/dashboard");
    }

    return (
        <div className='flex h-screen w-full'>

            {/* column 1 - login image*/}
            <div className='flex flex-1 justify-center items-center h-[100%]'>
                <div className='flex justify-center items-center h-[100%]'>
                    <Image
                        className="mx-auto w-auto h-[100%]"
                        src="/assets/loginlogo.jpg"
                        width="1000"
                        height="1000"
                        alt="image/Logo"
                    />
                </div>
            </div>

            {/* column 2- login page*/}
            <div className='flex flex-1 justify-center h-[100%]'>
                <div className="flex flex-col gap-6 py-10 w-full">
                    <div className="flex justify-center sm:mx-auto sm:w-full sm:max-w-md h-16">
                        {/* <Image
                            className="mx-auto w-auto"
                            src=""
                            width="1000"
                            height="1000"
                            alt="image/Logo"
                        /> */}
                        <CloudIcon className="w-10 h-10 text-blue-900" aria-hidden={true} />
                        <p className='text-center text-3xl mt-1 ml-1 font-bold tracking-tight text-blue-900'>Rental App </p>
                    </div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                            Login
                        </h2>
                    </div>

                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className='h-20'>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email address
                                    </label>
                                    <div className="relative mt-1">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <EnvelopeIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            placeholder="you@example.com"
                                            required
                                            value={email}
                                            onChange={(event) => handleEmailChange(event)}
                                            className="block w-full appearance-none rounded-md border border-gray-300 pr-3 pl-10 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                                        />
                                    </div>
                                    {!isValidEmail && (
                                        <p className="flex text-red-500 text-xs mt-1">Please enter a valid email address</p>
                                    )}
                                </div>
                                <div className='h-20'>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            id="password"
                                            name="password"
                                            autoComplete="password"
                                            required
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(event) => handlePasswordChange(event)}
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
                                                            fillRule="evenodd"
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
                                                            fillRule="evenodd"
                                                            d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
                                                            clipRule="evenodd"
                                                        />
                                                        <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {!isValidPassword && (
                                        <p className="flex text-red-500 text-xs mt-1">Please enter a valid password</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end">

                                    <div className="text-sm">
                                        <a
                                            href="#"
                                            className="font-medium text-blue-800 hover:text-blue-900"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    {isloading ? (
                                        <button
                                            type="submit"
                                            disabled
                                            className="flex w-full justify-center rounded-md border border-transparent bg-blue-400 py-2 px-4 text-sm font-medium text-white shadow-sm"
                                        >
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Logging in...
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md border border-transparent bg-blue-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-900 focus:outline-none"
                                        >
                                            Login
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="mt-5 flex justify-center items-center">
                            <p className="text-sm"> Don&apos;t have an account ? </p>
                            <Link
                                href="/signup"
                                className="underline-offset-4 decoration-2 underline font-medium text-blue-800 hover:text-blue-900 ml-2"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default Login;
