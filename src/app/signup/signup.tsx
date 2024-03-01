import { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
//icons
import { CloudIcon, EnvelopeIcon, UserIcon } from "@heroicons/react/20/solid";
//supabase
import { supabase } from '../../utility/supabase';
//useRouter
import { useRouter } from "next/navigation";
import { envConfig } from "@/utility/environment";
import handleApiCallFetch from "@/components/handleApiCallFetch";

const Signup = () => {

    const envconfig = envConfig;
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [numberofProperties, setNumberofProperties] = useState("");
    const [message, setMessage] = useState("");
    const [isloading, setIsloading] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsloading(true);
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsloading(false);
            return;
        }
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        firstName: firstName ? firstName : '',
                        lastName: lastName ? lastName : '',
                    }
                }
            });
            // console.log("userData", data)
            if (error) {
                toast.error("Failed to sign up");
                setIsloading(false);
            } else {
                if (data && data.user && data.user.id) {
                    toast.success("Signed up successfully");
                    router.push("/login");
                    setIsloading(false);
            
                    const apiUrl = `${envconfig.backendUrl}/users/create`;
                    let requestBody = {
                        uid: data && data.user && data.user.id ? data.user.id : null,
                        firstName: firstName ? firstName : "",
                        lastName: lastName ? lastName : "",
                        email: email ? email : "",
                        companyName: companyName ? companyName : "",
                        numberofProperties: numberofProperties ? parseInt(numberofProperties) : null,
                        message: message ? message : "",
                    };
                    const headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    };
                    var params = { method: 'POST', headers: headers, body: JSON.stringify(requestBody) }
                    try {
                        const response: any = await handleApiCallFetch(apiUrl, params);
                        console.log("user response", response);

                    } catch (error) {
                        console.log('Error in api call:', error);
                    }
                }
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setIsloading(false);
        }
    };

    const handleCancel = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setCompanyName("");
        setNumberofProperties("");
        setMessage("");
    }

    return (
        <>
            <div className="h-screen bg-gray-100 w-full">
                <Toaster />
                <div className="flex flex-col justify-start items-center py-4 sm:px-6 lg:px-8 w-full h-[100%]">
                    <div className="flex justify-center mt-4 sm:mx-auto sm:w-full sm:max-w-md h-16 ">
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

                    <div className="flex flex-col justify-cenlastNameter mt-4 w-3/5 ">
                        <div className="bg-white py-8 px-8 shadow sm:rounded-lg w-full" >
                            <form className="space-y-6 " onSubmit={handleSubmit}>
                                <div className='grid grid-flow-row grid-cols-2 gap-y-6 gap-x-8 pt-2'>
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
                                    {/* Password */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Password*
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
                                    </div>
                                    {/* Confirm Password */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Confirm Password*
                                        </label>
                                        <div className="mt-1 relative ">
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                autoComplete="current-password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(event) =>
                                                    setConfirmPassword(event.target.value)
                                                }
                                                required
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                                            />
                                            <div className=" absolute inset-y-0 right-0 flex items-center pr-3">
                                                <div
                                                    onClick={() =>
                                                        setShowConfirmPassword(!showConfirmPassword)
                                                    }
                                                >
                                                    {showConfirmPassword ? (
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
                                        {error && (
                                            <p className="flex text-xs text-red-600">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="w-4 h-4 mr-1"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>

                                                {error}
                                            </p>
                                        )}
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
                                                type="number"
                                                value={numberofProperties}
                                                onChange={(event) => setNumberofProperties(event.target.value)}
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
