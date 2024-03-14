import React, { useState } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { countryWithCode } from "@/constants/countryCode";

interface CreatePhoneProps {
  displayCreateModel: (value: boolean) => void;
  newContact: string;
  setNewContact: (newContact: string) => void;
  countryDialCode: string;
  onSelectChange: (data: string) => void;
  handlePostRequest: (postData: any) => Promise<void>;
}

const CreatePhoneNumber = ({
  displayCreateModel,
  newContact,
  setNewContact,
  countryDialCode,
  onSelectChange,
  handlePostRequest
}: CreatePhoneProps) => {
  const [supportsSMS, setSupportsSMS] = useState(false);
  const [supportsCalling, setSupportsCalling] = useState(false);
  const [supportsWhatsApp, setSupportsWhatsApp] = useState(false);

  const handleSaveContact = () => {
    const validPhoneNoInfo = {
      countryCode: countryDialCode,
      phoneNo: newContact,
      supportsSMS: supportsSMS,
      supportsCalling: supportsCalling,
      supportsWhatsApp: supportsWhatsApp,
    };

    handlePostRequest(validPhoneNoInfo);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg z-10 w-[40rem] overflow-hidden shadow-lg">
        <div className="flex justify-end pr-4 pt-4">
          <button
            onClick={() => {
              displayCreateModel(false);
            }}
            className="flex items-center justify-center text-gray-600 hover:text-red-500 transition transform hover:scale-110 focus:outline-none"
          >
            <XCircleIcon className="w-8" />
          </button>
        </div>

        <div className="flex flex-col p-6 space-y-6">
          <label className="text-gray-800 text-lg font-semibold">
            Enter Your Phone Number:
          </label>
          <div className="flex space-x-2 mb-6">
            <select
              name="country"
              id=""
              className="rounded-md py-2 px-3 outline-none shadow-sm bg-gray-100 text-gray-800 focus:ring focus:border-indigo-500"
              value={countryDialCode}
              onChange={(e) => onSelectChange(e.target.value)}
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
              className="rounded-md py-2 px-3 outline-none shadow-sm w-20 bg-gray-100 text-gray-800"
            />

            <input
              name="contact"
              type="number"
              value={newContact}
              onChange={(e) => setNewContact(e.target.value)}
              placeholder="9800000000"
              className="rounded-md py-2 px-3 outline-none shadow-sm w-full focus:ring focus:border-indigo-500 border border-gray-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8 mx-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="supportsSMS"
                checked={supportsSMS}
                onChange={() => setSupportsSMS(!supportsSMS)}
                className="mr-2 text-indigo-500 focus:ring focus:ring-offset-2 w-4 h-4"
              />
              <label htmlFor="supportsSMS" className="text-gray-800">
                Supports SMS
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="supportsCalling"
                checked={supportsCalling}
                onChange={() => setSupportsCalling(!supportsCalling)}
                className="mr-2 text-indigo-500 focus:ring focus:ring-offset-2 w-4 h-4"
              />
              <label htmlFor="supportsCalling" className="text-gray-800">
                Supports Calling
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="supportsWhatsApp"
                checked={supportsWhatsApp}
                onChange={() => setSupportsWhatsApp(!supportsWhatsApp)}
                className="mr-2 text-indigo-500 focus:ring focus:ring-offset-2 w-4 h-4"
              />
              <label htmlFor="supportsWhatsApp" className="text-gray-800">
                Supports WhatsApp
              </label>
            </div>
          </div>

          <button
            onClick={handleSaveContact}
            className="px-8 py-2 mt-4 ml-auto bg-gradient-to-r from-indigo-600 to-indigo-800 hover:to-indigo-700 text-white font-semibold rounded-md shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePhoneNumber;
