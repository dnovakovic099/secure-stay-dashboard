"use client";
import { checkUserSession } from "@/auth/auth";
import axiosInstance from "@/auth/axiosInstance";
import Logo from "@/components/logo";
import { envConfig } from "@/utility/environment";
import { supabase } from "@/utility/supabase";
// import { EnvelopeIcon, CloudIcon, UserCircleIcon, UserIcon, KeyIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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

  const handlePasswordChange = (event: any) => {
    event.preventDefault();
    const enteredPassword = event.target.value;
    setPassword(enteredPassword);

    // Password validation: at least 8 characters, at most 20 characters, and at least one number
    const passwordRegex = /^(?=.*\d).{8,20}$/;
    const isValid = passwordRegex.test(enteredPassword);

    setIsValidPassword(isValid);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const { data, error }: any = await supabase.auth.signInWithPassword({
      email: email ? email : "",
      password: password ? password : "",
    });

    const user = data && data.user;

    if (user && user.id) {
      await getUserSubscriptionInfo();
      toast.success("Signed in successfully");
    } else {
      toast.error("Invalid login credentials!!!");
    }
  };

  //check for session
  const userInfo = async () => {
    return await checkUserSession();
  };

  userInfo().then((isLoggedIn) => {
    if (isLoggedIn) {
      window.location.href = "/dashboard";
    }
  });

  const getPmInfo = async () => {
    try {
      const { error, data }: any = await supabase.auth.getSession();
      if (error) return false;

      const apiUrl = `${envConfig.backendUrl}/pmcompay/userpmlist?uid=${data?.session?.user?.id}`;

      const response: any = await axiosInstance.get(apiUrl);

      const sessionInfo: any = response.data.data;

      if (sessionInfo?.length !== 0) {
        if (sessionInfo?.pmId) {
          localStorage.setItem("userPmId", sessionInfo?.pmId);
          router.replace("/dashboard");
        }
      } else {
        router.replace("/connectPM");
      }
    } catch (error) {
      toast.error("Error fetching pm info");
    }
  };

  const getUserSubscriptionInfo = async () => {
    try {
      const apiUrl = `${envConfig.backendUrl}/subscription/getusersubscriptioninfo`;
      const response = await axiosInstance.get(apiUrl);
      if (response.status == 200) {
        if (response.data?.data?.isExpired) {
          localStorage.setItem("isSubscriptionExpired", "true");
          router.replace("/subscription");
        } else {
          localStorage.setItem("isSubscriptionExpired", "false");
          await getPmInfo();
        }
      }
    } catch (error) {
      toast.error("Error fetching subscription info");
    }
  };

  return (
    <div className="relative grid grid-cols-2 h-screen w-full">
      <Toaster />

      <div className="absolute  top-0 left-0 mt-4  ml-4 z-20">
        <Logo />
      </div>
      <div className="relative flex flex-col  bg-[#141B37] right-0 h-screen">
        <div className="relative flex right-0 justify-end overflow-hidden">
          <svg
            className="fixed  top-0 left-8 overflow-hidden"
            width="650"
            height="300"
            viewBox="0 0 396 406"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M232.982 0H395.56L166.746 406H0L232.982 0Z"
              fill="url(#paint0_linear_1300_4416)"
              fillOpacity="0.5"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1300_4416"
                x1="395.56"
                y1="-161.82"
                x2="77.72"
                y2="425.72"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#7F91D8" stopOpacity="0.33" />
                <stop offset="1" stopColor="#737373" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            className="fixed mt-24"
            width="460"
            height="160"
            viewBox="0 0 525 191"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M585.908 55.5312L542.736 190.154L0.499978 117L72.0001 0.706953L585.908 55.5312Z"
              fill="url(#paint0_linear_1300_4392)"
              fillOpacity="0.6"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1300_4392"
                x1="676.732"
                y1="135.113"
                x2="82.1064"
                y2="71.7709"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#7F91D8" stopOpacity="0.33" />
                <stop offset="1" stopColor="#737373" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute flex  justify-end bottom-0 right-0 items-end mt-7">
          <Image
            src="/assets/Frame 2072749641.svg"
            width="1000"
            height="1000"
            alt="image/Logo"
            className="w-[50rem] max-h-[768px] object-contain"
          />
        </div>
      </div>

      {/* column 2- login page*/}
      <div className="flex flex-1 justify-center h-[100%] bg-gray-50">
        <div className=" flex justify-center items-center sm:mx-auto  sm:w-full  ">
          <div className="bg-white py-4 px-4 shadow-md sm:rounded-lg sm:px-6 min-w-[402px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md pb-6">
              <h2 className="text-start text-2xl font-bold tracking-tight text-gray-900">
                Login
              </h2>
              <p className="text-sm text-gray-500">
                Enter your email and password to Continue
              </p>
            </div>
            <form
              className="space-y-1"
              onSubmit={(event) => handleSubmit(event)}
            >
              <div className="h-20">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {/* <UserIcon

                                            color='white'
                                            className="h-5 w-5 text-gray-400 outline-none"
                                            aria-hidden="true"
                                        /> */}
                    <svg
                      width="14"
                      height="19"
                      viewBox="0 0 14 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.6663 18.3334H11.9997V16.6667C11.9997 15.286 10.8804 14.1667 9.49967 14.1667H4.49967C3.11897 14.1667 1.99967 15.286 1.99967 16.6667V18.3334H0.333008V16.6667C0.333008 14.3655 2.19849 12.5 4.49967 12.5H9.49967C11.8008 12.5 13.6663 14.3655 13.6663 16.6667V18.3334ZM6.99967 10.8334C4.23825 10.8334 1.99967 8.59479 1.99967 5.83337C1.99967 3.07195 4.23825 0.833374 6.99967 0.833374C9.76109 0.833374 11.9997 3.07195 11.9997 5.83337C11.9997 8.59479 9.76109 10.8334 6.99967 10.8334ZM6.99967 9.16671C8.84059 9.16671 10.333 7.67432 10.333 5.83337C10.333 3.99242 8.84059 2.50004 6.99967 2.50004C5.15872 2.50004 3.66634 3.99242 3.66634 5.83337C3.66634 7.67432 5.15872 9.16671 6.99967 9.16671Z"
                        fill="#72767A"
                      />
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
                    className="block w-full appearance-none rounded-md border border-gray-300 pr-3 pl-10 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                  />
                </div>
                {!isValidEmail && (
                  <p className="flex text-red-500 text-xs mt-1">
                    Please enter a valid email address
                  </p>
                )}
              </div>
              <div className="h-20">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.8333 8.33329H16.6667C17.1269 8.33329 17.5 8.70638 17.5 9.16663V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333H3.33333C2.8731 18.3333 2.5 17.9602 2.5 17.5V9.16663C2.5 8.70638 2.8731 8.33329 3.33333 8.33329H4.16667V7.49996C4.16667 4.2783 6.77834 1.66663 10 1.66663C13.2217 1.66663 15.8333 4.2783 15.8333 7.49996V8.33329ZM4.16667 9.99996V16.6666H15.8333V9.99996H4.16667ZM9.16667 11.6666H10.8333V15H9.16667V11.6666ZM14.1667 8.33329V7.49996C14.1667 5.19878 12.3012 3.33329 10 3.33329C7.69882 3.33329 5.83333 5.19878 5.83333 7.49996V8.33329H14.1667Z"
                        fill="#72767A"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    autoComplete="password"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="**********"
                    onChange={(event) => handlePasswordChange(event)}
                    className="block w-full appearance-none rounded-md border items-center border-gray-300 pr-3 pl-10 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                  />
                  <div className=" absolute inset-y-0 right-0 flex items-center pr-3">
                    <div onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <svg
                          width="20"
                          height="16"
                          viewBox="0 0 20 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.99993 0.5C14.4933 0.5 18.2317 3.73313 19.0154 8C18.2317 12.2668 14.4933 15.5 9.99993 15.5C5.50644 15.5 1.76813 12.2668 0.984375 8C1.76813 3.73313 5.50644 0.5 9.99993 0.5ZM9.99993 13.8333C13.5296 13.8333 16.5499 11.3767 17.3144 8C16.5499 4.62336 13.5296 2.16667 9.99993 2.16667C6.47018 2.16667 3.44986 4.62336 2.68533 8C3.44986 11.3767 6.47018 13.8333 9.99993 13.8333ZM9.99993 11.75C7.92883 11.75 6.24989 10.0711 6.24989 8C6.24989 5.92893 7.92883 4.25 9.99993 4.25C12.0709 4.25 13.7499 5.92893 13.7499 8C13.7499 10.0711 12.0709 11.75 9.99993 11.75ZM9.99993 10.0833C11.1505 10.0833 12.0833 9.15058 12.0833 8C12.0833 6.84942 11.1505 5.91667 9.99993 5.91667C8.84934 5.91667 7.91656 6.84942 7.91656 8C7.91656 9.15058 8.84934 10.0833 9.99993 10.0833Z"
                            fill="#72767A"
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
                {!isValidPassword && (
                  <p className="flex text-red-500 text-xs mt-1">
                    Please enter a valid password
                  </p>
                )}

                <div className="flex items-center justify-end pt-2">
                  <div className="text-sm">
                    <a href="#" className=" text-[#7000FF] hover:text-blue-900">
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-10">
                {isloading ? (
                  <button
                    type="submit"
                    disabled
                    className="flex w-full justify-center rounded-md border border-transparent bg-gradient-to-br from-purple-700 to-pink-500 py-2 px-4 text-sm font-medium text-white shadow-sm"
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
                    className="flex w-full justify-center rounded-md border border-transparent bg-gradient-to-br from-[#7000FF] to-[#9E49F2] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-900 focus:outline-none"
                  >
                    Login
                  </button>
                )}
              </div>
              <div className="pt-4 flex items-center justify-center text-center text-sm text-gray-400">
                <hr className="flex-grow border" />
                <span className="px-2">OR</span>
                <hr className="flex-grow border" />
              </div>

              <div className="pt-4">
                <button className="flex text-gray-500 py-2  w-full justify-center rounded-md border bg-gradient-to-br font-medium focus:outline-none">
                  <svg
                    className="mr-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" fill="white" />
                    <path
                      fill-rule="evenodd"
                      clipRule="evenodd"
                      d="M23.04 12.2615C23.04 11.446 22.9668 10.6619 22.8309 9.90918H12V14.3576H18.1891C17.9225 15.7951 17.1123 17.013 15.8943 17.8285V20.714H19.6109C21.7855 18.7119 23.04 15.7637 23.04 12.2615Z"
                      fill="#4285F4"
                    />
                    <path
                      fill-rule="evenodd"
                      clipRule="evenodd"
                      d="M11.9995 23.4998C15.1045 23.4998 17.7077 22.47 19.6104 20.7137L15.8938 17.8282C14.864 18.5182 13.5467 18.9259 11.9995 18.9259C9.00425 18.9259 6.46902 16.903 5.5647 14.1848H1.72266V17.1644C3.61493 20.9228 7.50402 23.4998 11.9995 23.4998Z"
                      fill="#34A853"
                    />
                    <path
                      fill-rule="evenodd"
                      clipRule="evenodd"
                      d="M5.56523 14.185C5.33523 13.495 5.20455 12.7579 5.20455 12C5.20455 11.242 5.33523 10.505 5.56523 9.81499V6.83545H1.72318C0.944318 8.38795 0.5 10.1443 0.5 12C0.5 13.8557 0.944318 15.612 1.72318 17.1645L5.56523 14.185Z"
                      fill="#FBBC05"
                    />
                    <path
                      fill-rule="evenodd"
                      clipRule="evenodd"
                      d="M11.9995 5.07386C13.6879 5.07386 15.2038 5.65409 16.3956 6.79364L19.694 3.49523C17.7024 1.63955 15.0992 0.5 11.9995 0.5C7.50402 0.5 3.61493 3.07705 1.72266 6.83545L5.5647 9.815C6.46902 7.09682 9.00425 5.07386 11.9995 5.07386Z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>
              </div>
            </form>
            <hr />
            <div className="mt-5 flex justify-center items-center">
              <p className="text-xs"> {`You don't have an account yet?`} </p>
              <Link
                href="/signup"
                className="underline-offset-4 text-xs  decoration-white underline font-medium text-[#7000FF] hover:text-blue-900 ml-2"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
