"use client";
import { XCircleIcon } from "@heroicons/react/20/solid";
import React from "react";

interface CreateEmailProps {
  displayCreateModel: (value: boolean) => void;
  newEmail: string;
  HandleEmailChange: (newEmail: string) => void;
  handleSaveEmail: (e: React.FormEvent) => void;
}

const CreateEmail = ({
  displayCreateModel,
  newEmail,
  HandleEmailChange,
  handleSaveEmail,
}: CreateEmailProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg z-10 w-96 overflow-hidden shadow-lg">
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

        <div className="flex flex-col p-6">
          <label className="text-gray-700 mb-2 text-lg font-semibold">
            Enter Your Email:
          </label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => HandleEmailChange(e.target.value)}
            placeholder="example@example.com"
            className="w-full px-4 py-3 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:ring focus:ring-opacity-50 mb-4 bg-gray-100"
          />
          <button
            onClick={handleSaveEmail}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-900 hover:to-purple-800  text-white font-semibold rounded-md shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEmail;
