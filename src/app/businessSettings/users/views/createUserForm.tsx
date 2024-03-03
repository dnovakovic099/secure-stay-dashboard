"user client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UploadImage from "./uploadImage";
import UserType from "./userType";
import { countryWithCode } from "@/constants/countryCode";

interface UserData {
  fullName: string;
  email: string;
  contact: any;
  userType: string;
  dialCode: string;
}

interface CreateUserProps {
  createUser: (formData: UserData) => Promise<any>;
}

const CreateUserForm = ({ createUser }: CreateUserProps) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dialCode: "",
    contact: "",
    userType: "",
  });
  const [countryDialCode, setCountryDialCode] = useState(
    countryWithCode[0].dialCode
  );
  const [selectedRole, setSelectedRole] = useState("");

  const handleChange = (name: string, value: any): void => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e: any): Promise<any> => {
    e.preventDefault();
    console.log(formData.dialCode);

    if (!formData.fullName || !formData.email || !formData.userType)
      return toast.error("Provide all values");

    if (!formData.email.includes("@gmail.com"))
      return toast.error("Provide valid email!!!");

    await createUser(formData);
  };

  const handleClearForm = (e: any) => {
    e.preventDefault();
    setFormData({
      fullName: "",
      email: "",
      dialCode: "",
      contact: "",
      userType: "",
    });
    setCountryDialCode(countryWithCode[0].dialCode);
  };

  const handleSelectChange = (data: any) => {
    setCountryDialCode(data);
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      dialCode: countryDialCode,
    }));
  }, [countryDialCode]);

  return (
    <div className="bg-white flex flex-col md:flex-row justify-center rounded-md p-5">
      <form className="px-4 py-4 w-full md:w-[40rem]">
        <div className="text-center text-indigo-600">
          <h1 className="text-2xl text-gray-700 font-[600] tracking-normal -mt-8 font-serif">
            Create New User
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 ">
          <div className="space-y-4">
            <div className="grid space-y-2 w-full">
              <label htmlFor="" className="text-gray-800 font-semibold">
                Full name
              </label>
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="John Doe"
                className="rounded-md py-2 px-2 outline-none shadow-sm border w-full focus:ring focus:border-indigo-500"
              />
            </div>
            <div className="grid space-y-2 w-full">
              <label htmlFor="" className="text-gray-800 font-semibold">
                Email
              </label>
              <input
                name="email"
                type="text"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="example@gmail.com"
                className="rounded-md py-2 px-2 outline-none shadow-sm border w-full focus:ring focus:border-indigo-500"
              />
            </div>
            <div className="grid space-y-2 w-full">
              <label htmlFor="" className="text-gray-800 font-semibold">
                Contact
              </label>
              <div className="flex border shadow-sm rounded-md">
                <select
                  name="country"
                  id=""
                  className="rounded-l-md py-2 outline-none shadow-sm bg-white text-gray-800"
                  value={countryDialCode}
                  onChange={(e) => handleSelectChange(e.target.value)}
                >
                  {countryWithCode?.map((data) => (
                    <option key={data.name} value={data.dialCode}>
                      {data.code}
                    </option>
                  ))}
                </select>

                <input
                  name=""
                  type="text"
                  value={countryDialCode}
                  disabled
                  className="rounded-md py-2 px-2 outline-none shadow-sm w-20 bg-white text-gray-800"
                />

                <input
                  name="contact"
                  type="number"
                  value={formData.contact}
                  onChange={(e) => handleChange("contact", e.target.value)}
                  placeholder="9800000000"
                  className="rounded-md py-2 px-2 outline-none shadow-sm w-full focus:ring focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <UploadImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </div>
        </div>
        <UserType
          handleChange={handleChange}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <div className="flex space-x-5 justify-center mt-5">
          <button
            onClick={handleSubmitForm}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md w-full hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-500"
          >
            Save
          </button>
          <button
            onClick={handleClearForm}
            className="px-4 py-2 bg-red-500 text-white rounded-md w-full hover:bg-red-600 focus:outline-none focus:ring focus:border-red-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
