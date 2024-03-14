import { envConfig } from "@/utility/environment";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import CommonDialog from "@/components/commonDailogBox";
import { countryWithCode } from "@/constants/countryCode";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import CreatePhoneNumber from "./savePhoneNumber";

const ContactList = () => {
  const [newContact, setNewContact] = useState("");
  const [contactList, setContactList] = useState([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<(() => void) | null>(null);
  const [dialogMessage, setDialogMessage] = useState("");
  const [countryDialCode, setCountryDialCode] = useState(
    countryWithCode[0].dialCode
  );
  const [showCreatePhone, setShowCreatePhone] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const apiUrl = `${envConfig.backendUrl}/messaging/getphonenolist`;
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const result: any = await handleApiCallFetch(apiUrl, params);
      setContactList(result.data);
      console.log(result.data);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const handlePostRequest = async (postData: any) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/messaging/savephonenoinfo`;

      const response = await axios.post(apiUrl, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle the response here
      if (response.status === 201) {
        setNewContact("");
        setShowCreatePhone(false);
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

  const openDialog = (action: () => void, message: string) => {
    setDialogAction(() => action);
    setDialogMessage(message);
    setDialogOpen(true);
  };

  const handleAddContact = () => {
    setShowCreatePhone(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleEditContact = (data: any) => {
    const { country_code, phone, ...rest } = data;
    const updatedData = { ...rest, countryCode: country_code, phoneNo: phone };
    openDialog(
      () => handleRequest("PUT", `messaging/updatephonenoinfo`, updatedData),
      "Are you sure you want to update phone number support?"
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

  const handleDeleteContact = (index: number) => {
    openDialog(
      () => handleRequest("DELETE", `messaging/deletephonenoinfo/${index}`),
      "Are you sure you want to delete phone number?"
    );
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    contactIndex: number,
    capability: string
  ) => {
    // Spread the contactList array to create a new array
    const updatedContacts: any[] = [...contactList];

    // Spread the contact object to create a new object
    const updatedContact = { ...updatedContacts[contactIndex] };

    // Update the capability of the contact
    updatedContact[capability] = event.target.checked;

    // Update the contact list with the modified contact
    updatedContacts[contactIndex] = updatedContact;

    // Make API call to update the contact
    handleEditContact(updatedContact);
  };

  const displayCreateModel = (value: boolean): void => {
    setShowCreatePhone(value);
  };

  return (
    <>
      <div className="flex items-center justify-between  bg-white z-10 p-2  ">
        <h2 className="text-2xl font-bold text-gray-800">Phone Numbers</h2>
        <button
          onClick={handleAddContact}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-900 hover:to-purple-800 text-white font-semibold rounded-md shadow-md transition-colors duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-purple-500 focus:to-purple-800"
        >
          <div className="flex items-center gap-3">
            <PlusIcon className="w-6 h-6" />
            Phone Number
          </div>
        </button>
      </div>

      <div
        className="overflow-y-scroll  "
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
        }}
      >
        <ul className="space-y-4 mb-8">
          {contactList?.map((contact, index) => (
            <div key={index} className="border-b-2">
              <li className="flex items-center">
                <div>{contact["country_code"]}</div>
                <input
                  type="text"
                  value={contact["phone"]}
                  disabled
                  className="flex-1 w-full px-4 py-2 placeholder-gray-500 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg bg-white"
                />

                <button
                  onClick={() => handleDeleteContact(contact["id"])}
                  className="text-red-500 font-semibold py-1 px-2 mr-2 mt-1 ml-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 ease-in hover:bg-red-100"
                >
                  <TrashIcon className="w-6 h-6" />
                </button>
              </li>
              <div className="p-2 flex items-center gap-5">
                <h3 className="text-sm font-semibold mb-4">
                  Supported Capabilities :
                </h3>
                <ul className="list-inside flex gap-5  mb-4">
                  <div key={1} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-500 h-4 w-4 border border-gray-300 rounded-3xl"
                      checked={contact["supportsSMS"]}
                      onChange={(event) =>
                        handleCheckboxChange(event, index, "supportsSMS")
                      }
                    />
                    <li className="text-gray-800">SMS</li>
                  </div>
                  <div key={2} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-500 h-4 w-4 border border-gray-300 rounded-3xl"
                      checked={contact["supportsCalling"]}
                      onChange={(event) =>
                        handleCheckboxChange(event, index, "supportsCalling")
                      }
                    />
                    <li className="text-gray-800">Calling</li>
                  </div>
                  <div key={3} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-500 h-4 w-4 border border-gray-300 rounded-3xl"
                      checked={contact["supportsWhatsApp"]}
                      onChange={(event) =>
                        handleCheckboxChange(event, index, "supportsWhatsApp")
                      }
                    />
                    <li className="text-gray-800">WhatsApp</li>
                  </div>
                </ul>
              </div>
            </div>
          ))}
        </ul>
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
      {showCreatePhone && (
        <CreatePhoneNumber
          displayCreateModel={displayCreateModel}
          newContact={newContact}
          setNewContact={setNewContact}
          handlePostRequest={handlePostRequest}
          onSelectChange={setCountryDialCode}
          countryDialCode={countryDialCode}
        />
      )}
    </>
  );
};

export default ContactList;
