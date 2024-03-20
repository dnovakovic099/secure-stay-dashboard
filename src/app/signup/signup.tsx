import { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
//icons
import { EnvelopeIcon, UserIcon } from "@heroicons/react/20/solid";
//supabase
import { supabase } from "../../utility/supabase";
//useRouter
import { useRouter } from "next/navigation";
import { envConfig } from "@/utility/environment";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import Logo from "@/components/logo";
import { checkUserSession } from "@/auth/auth";

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
    console.log("poooooooooooooooooo");

    event.preventDefault();
    setIsloading(true);
    setError("");

    console.log(password, confirmPassword, "[[[[]]]]]");

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
            firstName: firstName ? firstName : "",
            lastName: lastName ? lastName : "",
          },
        },
      });
      console.log(data, "[[[[]]]]]");

      // const user = data && data.user;

      // if (user && user.id) {

      //     let requestBody = {
      //         uid: data && data.user && data.user.id ? data.user.id : null,
      //         firstName: firstName ? firstName : "",
      //         lastName: lastName ? lastName : "",
      //         email: email ? email : "",
      //         companyName: companyName ? companyName : "",
      //         numberofProperties: numberofProperties ? parseInt(numberofProperties) : null,
      //         message: message ? message : "",
      //     };

      //     const userResponse: any = await axiosInstance.post(`${envConfig.backendUrl}/users/create`, JSON.stringify(requestBody));

      //     const userData: any = userResponse.data.data;

      //     if (userData?.length !== 0) {

      //         if (userData?.pmId) {

      //             router.push("/dashboard");
      //             localStorage.setItem('userPmId', userData?.pmId);

      //         }

      //         toast.success("Signed in successfully");

      //     } else if (userResponse.data.success == true || userData?.length == 0) {

      //         router.push('/connectPM');

      //     } else {

      //         toast.error("Something went wrong!!");
      //     }
      // }
      // else {
      //     toast.error("Invalid login credentials!!!");
      // }
      // // console.log("userData", data)
      if (error) {
        toast.error("Failed to sign up");
        setIsloading(false);
      } else {
        if (data && data.user && data.user.id) {
          toast.success("Please check email and verify email.");
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
            numberofProperties: numberofProperties
              ? parseInt(numberofProperties)
              : null,
            message: message ? message : "",
          };
          const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
          };
          var params = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(requestBody),
          };
          try {
            const response: any = await handleApiCallFetch(apiUrl, params);
            console.log("user response", response);
          } catch (error) {
            console.log("Error in api call:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error signing up:", error);
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

  return (
    <>
      <div className="h-screen bg-gray-50 w-full">
        <Toaster />
        <div className="grid grid-cols-2 grid-flow-col-dense">
          <div>
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

              <div className="absolute flex ml-20 rounded-md  justify-end bottom-0 right-0 items-end mt-7">
                <div>
                  <img src="/assets/Upsells.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center  sm:px-6 lg:px-8 w-full h-[100%]">
            {/* <div className="flex justify-center mt-4 sm:mx-auto sm:w-full sm:max-w-md h-16 ">

                    </div> */}

            <div className="flex bg-white shadow sm:rounded-lg  flex-col justify-cenlastNameter mt-4 w-full ">
              <div className="px-8 pt-5 sm:w-full sm:max-w-md pb-6">
                <h2 className="text-start text-2xl font-bold tracking-tight text-gray-900">
                  Signup
                </h2>
                <p className="text-sm text-gray-500">
                  Provide all values to create account.
                </p>
              </div>
              <div className=" px-8  w-full">
                <form className="space-y-4 " onSubmit={handleSubmit}>
                  <div className="grid grid-flow-row grid-cols-2 gap-y-4 gap-x-8 pt-2">
                    {/* first Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name <span className="text-red-500">*</span>
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
                        Last name <span className="text-red-500">*</span>
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
                        Email <span className="text-red-500">*</span>
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
                          placeholder="Enter email"
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
                        Company name <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative ">
                        <input
                          id="companyName"
                          name="companyName"
                          autoComplete="current-companyName"
                          type="text"
                          value={companyName}
                          onChange={(event) =>
                            setCompanyName(event.target.value)
                          }
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
                        Password <span className="text-red-500">*</span>
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
                    {/* Confirm Password */}
                    <div>
                      <label
                        htmlFor="password"
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
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
                          required
                          placeholder="********"
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
                      {error && (
                        <p className="flex text-xs text-red-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4 mr-1"
                          >
                            <path
                              fill-rule="evenodd"
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
                          onChange={(event) =>
                            setNumberofProperties(event.target.value)
                          }
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

                  <div className="flex gap-2 justify-between">
                    <div className="flex space-x-4">
                      {isloading ? (
                        <button
                          type="submit"
                          disabled
                          className="flex justify-center  items-center rounded-md border border-transparent bg-blue-800 py-2 px-4 text-sm font-medium text-white shadow-sm"
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
                          className="flex justify-center items-center rounded-md border border-transparent bg-gradient-to-br from-[#7000FF] to-[#9E49F2] py-2 px-8 text-sm font-medium text-white shadow-sm  focus:outline-none"
                        >
                          Submit
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleCancel()}
                        className="flex justify-center items-center rounded-md border border-transparent bg-gray-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="flex">
                      <button className="flex text-gray-500 py-2  px-4 w-full justify-center rounded-md border bg-gradient-to-br font-medium focus:outline-none">
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
                        Signup with Google
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="py-5 flex justify-center items-center">
                <p className="text-sm">Already have an account ?</p>
                <Link
                  href="/login"
                  className="underline-offset-4 decoration-none  font-medium text-[#7000FF] hover:text-blue-900 ml-2"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
