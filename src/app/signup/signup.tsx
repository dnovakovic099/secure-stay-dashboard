import { useState } from "react";
import Link from "next/link";
import { CloudIcon, EnvelopeIcon, UserIcon } from "@heroicons/react/20/solid";

const Signup = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [numberofProperties, setNumberofProperties] = useState("");
    const [PMS, setPMS] = useState("");
    const [message, setMessage] = useState("");
    const [isloading, setIsloading] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
    };
    const handleCancel = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setCompanyName("");
        setNumberofProperties("");
        setPMS("");
        setMessage("");
    }

    return (
        <>
            <div className="h-screen bg-gray-100 w-full">
                <div className="flex min-h-full flex-col justify-start items-center py-6 sm:px-6 lg:px-8 w-full">
                    <div className="flex justify-center mt-6 sm:mx-auto sm:w-full sm:max-w-md h-16 ">
                        {/* <Image
                            className="mx-auto h-26 w-auto"
                            src=""
                            width="1000"
                            height="1000"
                            alt="Image logo"
                        /> */}
                        <CloudIcon className="w-10 h-10 text-blue-900" aria-hidden={true} />
                        <p className='text-center text-3xl mt-1 ml-1 font-bold tracking-tight text-blue-900'>Rental App </p>
                    </div>

                    <div className="flex flex-col justify-cenlastNameter mt-6 w-3/5">
                        <div className="bg-white py-8 px-8 shadow sm:rounded-lg w-full">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className='grid grid-flow-row grid-cols-2 gap-y-8 gap-x-8 pt-2'>
                                    {/* first Name */}
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            First name*
                                        </label>
                                        <div className="relative mt-1">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <UserIcon
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </div>

                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                autoComplete="firstName"
                                                value={firstName}
                                                onChange={(event) => setFirstName(event.target.value)}
                                                required
                                                placeholder="First Name"
                                                className="block w-full appearance-none rounded-md border border-gray-300 pr-3 pl-10 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    {/* Last Name */}
                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Last name*
                                        </label>
                                        <div className="relative mt-1">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <UserIcon
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </div>

                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                autoComplete="lastName"
                                                value={lastName}
                                                onChange={(event) => setLastName(event.target.value)}
                                                required
                                                placeholder="Last Name"
                                                className="block w-full appearance-none rounded-md border border-gray-300 pr-3 pl-10 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    {/* Email address */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email*
                                        </label>
                                        <div className="relative mt-1 ">
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
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}
                                                autoComplete="email"
                                                required
                                                placeholder="you@example.com"
                                                className="block w-full appearance-none rounded-md border border-gray-300 pr-3 pl-10 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    {/* Company name */}
                                    <div>
                                        <label
                                            htmlFor="companyName"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Company name*
                                        </label>
                                        <div className="mt-1 relative ">
                                            <input
                                                id="companyName"
                                                name="companyName"
                                                autoComplete="current-companyName"
                                                type="text"
                                                value={companyName}
                                                onChange={(event) => setCompanyName(event.target.value)}
                                                required
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    {/* Number of Properties */}
                                    <div>
                                        <label
                                            htmlFor="numberofProperties"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Number of Properties
                                        </label>
                                        <div className="mt-1 relative ">
                                            <input
                                                id="numberofProperties"
                                                name="numberofProperties"
                                                autoComplete="numberofProperties"
                                                type="text"
                                                value={numberofProperties}
                                                onChange={(event) => setNumberofProperties(event.target.value)}
                                                // required
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    {/* PMS*/}
                                    <div>
                                        <label
                                            htmlFor="PMS"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            PMS
                                        </label>
                                        <div className="mt-1 relative ">
                                            <input
                                                id="PMS"
                                                name="PMS"
                                                autoComplete="PMS"
                                                type="text"
                                                value={PMS}
                                                onChange={(event) => setPMS(event.target.value)}
                                                // required
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="Message"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Message
                                    </label>
                                    <div className="relative mt-1">
                                        <textarea
                                            id="Message"
                                            name="Message"
                                            autoComplete="Message"
                                            value={message}
                                            // maxLength={}
                                            onChange={(event) => setMessage(event.target.value)}
                                            // required
                                            // placeholder=""
                                            className="block w-full appearance-none rounded-md border border-gray-300 pr-3 pl-4 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2 justify-end">
                                    <button
                                        type="button"
                                        onClick={() => handleCancel()}
                                        className="flex justify-center rounded-md border border-transparent bg-gray-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none"
                                    >
                                        Cancel
                                    </button>
                                    {isloading ? (
                                        <button
                                            type="submit"
                                            disabled
                                            className="flex justify-center rounded-md border border-transparent bg-blue-800 py-2 px-4 text-sm font-medium text-white shadow-sm"
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
                                            Sumbiting...
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="flex justify-center rounded-md border border-transparent bg-blue-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-900 focus:outline-none"
                                        >
                                            Sumbit
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="mt-5 flex justify-center items-center">
                            <p className="text-sm">Already have an account ?</p>
                            <Link
                                href="/login"
                                className="underline-offset-4 decoration-2 underline font-medium text-blue-800 hover:text-blue-900 ml-2"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Signup;
