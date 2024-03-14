"use client";

import React, { useState, useEffect } from "react";
import Contacts from "./contacts";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { envConfig } from "@/utility/environment";
import axios from "axios";
import CommonDialog from "@/components/commonDailogBox";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import CreateEmail from "./saveEmail";

interface Email {
  id: number;
  email: string;
}

const CreateMessaging = () => {
  const [emails, setEmails] = useState<Email[]>();
  const [newEmail, setNewEmail] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<(() => void) | null>(null);
  const [dialogMessage, setDialogMessage] = useState("");
  const [showCreateEmail, setShowCreateEmail] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const displayCreateModel = (value: boolean): void => {
    setShowCreateEmail(value);
  };

  const fetchData = async () => {
    try {
      const apiUrl = `${envConfig.backendUrl}/messaging/getemaillist`;
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      // setIsLoading(true);
      const result: any = await handleApiCallFetch(apiUrl, params);
      console.log(result);
      setEmails(result.data);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const handlePostRequest = async (postData: any) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/messaging/saveemailinfo`;

      const response = await axios.post(apiUrl, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle the response here
      if (response.status === 201) {
        setNewEmail("");
        setShowCreateEmail(false);
        fetchData();
        return;
      }
      toast.error(`${response.data.message}`);
      return;
    } catch (error: any) {
      toast.error(`${error.message}`);

      console.error(error);
    }
  };

  const handleDialogAction = () => {
    if (dialogAction) {
      dialogAction();
      setDialogOpen(false);
      setDialogAction(null);
      setDialogMessage("");
    }
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmail === "") {
      toast.error("Please enter email");
      return;
    }

    handlePostRequest({ email: newEmail });
  };

  const openDialog = (action: () => void, message: string) => {
    setDialogAction(() => action);
    setDialogMessage(message);
    setDialogOpen(true);
  };

  const handleDeleteEmail = (index: number) => {
    openDialog(
      () => handleRequest("DELETE", `messaging/deleteemailinfo/${index}`),
      "Are you sure you want to delete emails?"
    );
  };

  const handleRequest = async (method: string, uri: string, data?: any) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/${uri}`;

      const response = await axios({
        method,
        url: apiUrl,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
      // Handle errors here
      console.error("Error making request:", error.message);
    }
  };

  const handleAddEmail = () => {
    setShowCreateEmail(true);
  };



  return (
    <div className="bg-gray-100 h-[100%] pb-2 mx-2">
      <div className="flex gap-2">
        <div className="bg-white justify-center rounded-lg shadow-md px-5 py-2 space-y-6 animate-fade-in overflow-hidden w-[50%] h-[93vh] ">
          <div className="flex items-center justify-between bg-white z-10 p-2 ">
            <h2 className="text-2xl font-bold text-gray-800">Emails</h2>
            <div>
              <button
                onClick={handleAddEmail}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-900 hover:to-purple-800 text-white font-semibold rounded-md shadow-md transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-purple-500 focus:to-purple-800"
              >
                <div className="flex items-center gap-3">
                  <PlusIcon className="w-6 h-6" />
                  Add Email
                </div>
              </button>
            </div>
          </div>
          <div
            className="overflow-y-scroll max-h-[calc(100%-2rem)]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "transparent transparent",
            }}
          >
            <div className="flex flex-col md:flex-row md:space-x-4"></div>

            <ul className="space-y-4 mt-1">
              {emails?.map((email, index) => (
                <li
                  key={index}
                  className="flex items-center border-b-2 pb-4 mb-4 "
                >
                  <input
                    type="email"
                    value={email.email}
                    disabled
                    className="flex-1 w-full px-4 py-2 placeholder-gray-500 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg bg-white"
                  />

                  <button
                    onClick={() => handleDeleteEmail(email.id)}
                    className="text-red-500 font-semibold py-1 px-2 mr-2 mt-1 ml-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 ease-in hover:bg-red-100"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white justify-center rounded-lg shadow-md px-5 py-2 space-y-6 animate-fade-in overflow-hidden w-[50%] ">
          <Contacts/>
        </div>
      </div>
      <CommonDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setDialogAction(null);
          setDialogMessage("");
        }}
        onYes={handleDialogAction}
        message={dialogMessage}
      />
      {showCreateEmail && (
        <CreateEmail
          displayCreateModel={displayCreateModel}
          newEmail={newEmail}
          HandleEmailChange={setNewEmail}
          handleSaveEmail={handleSaveEmail}
        />
      )}
    </div>
  );
};

export default CreateMessaging;
