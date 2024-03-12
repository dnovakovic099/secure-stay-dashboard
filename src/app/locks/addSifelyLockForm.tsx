import { envConfig } from "@/utility/environment";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import axiosInstance from "@/auth/axiosInstance";

const AddSifelyLockForm = ({ closeModal, fetchSifelyLocks }: any) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const isDisabled = form.username === "" || form.password === "" || isLoading;

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const apiUrl = `${envConfig.backendUrl}/device/sifely/getaccesstoken`;
      const response = await axiosInstance.post(apiUrl, form);
      if (response.status == 200 && response.data?.success) {
        fetchSifelyLocks();
        setIsLoading(false);
        toast.success("Device added successfully");
        closeModal();
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error?.response?.status == 400) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <div className=" px-5 py-6 rounded-md">
        <div className="text-center font-semibold -mt-14 text-black py-2 text-2xl mb-6">
          Login to Sifely Account
        </div>
        <div className="flex space-x-5 ">
          <div>
            <img
              src="https://www.schlage.com/content/dam/sch-us/homepage-refresh/smart-lock.png"
              alt=""
              height={80}
              width={110}
            />
          </div>
          <hr />
          <div>
            <label
              className="block text-indigo-900 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
            <div className="mb-6">
              <label
                className="block text-indigo-900 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline text-base"
                id="password"
                type="password"
                placeholder="********"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>
            <div className="flex items-center justify-start ">
              <button
                disabled={isDisabled}
                onClick={() => handleSubmit()}
                className=" items-center px-2 py-2 w-full text-center h-[40px] text-white text-sm rounded-md focus:outline-none transition duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-purple-900 hover:to-purple-800 focus:to-purple-800"
              >
                {isLoading ? "Processing.." : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSifelyLockForm;
