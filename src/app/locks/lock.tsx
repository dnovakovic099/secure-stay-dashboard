"use client";
// import React, { useEffect, useState } from "react";
// import SeamLock from "./seamLock";
// import SifelyLock from "./sifelyLock";
// import CommonPopup from "@/components/commonPopup";
// import Form from "./addSifelyLockForm";
// import { envConfig } from "@/utility/environment";
// import toast from "react-hot-toast";
// import axiosInstance from "@/auth/axiosInstance";

// const Lock = () => {
//   const [sifelyLocks, setSifelyLocks] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeButton, setActiveButton] = useState<String>("seamLock");
//   const [activeTab, setActiveTab] = useState<String | Boolean>("seamLock");
//   const [showModal, setShowModal] = useState(false);

//   const handleButtonClick = (buttonName: string) => {
//     if (activeButton !== buttonName) {
//       setActiveButton(buttonName);
//       setActiveTab(buttonName === "seamLock" ? "seamLock" : "sifelyLocks");
//     }
//   };

//   useEffect(() => {
//     fetchSifelyLocks();
//   }, []);

//   const fetchSifelyLocks = async () => {
//     try {
//       setIsLoading(true);
//       const apiUrl = `${envConfig.backendUrl}/device/sifely/locklist`;
//       const response = await axiosInstance.get(apiUrl);
//       if (response.status === 200 && response.data?.success) {
//         setSifelyLocks(response.data?.data || []);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Error fetching sifely locks");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const createConnectWebView = async () => {
//     try {
//       setIsLoading(true);
//       const apiUrl = `${envConfig.backendUrl}/device/seam/createconnectwebview`;
//       const response = await axiosInstance.get(apiUrl);

//       if (response.status == 200 && response.data?.success) {
//         const url = response.data?.data?.url;
//         setIsLoading(false);
//         window.open(url, "_blank");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="flex justify-between gap-1 px-6 py-6 bg-[#f5f7f8] min-h-full max-h-full">
//       <div className="w-full bg-white flex flex-col p-5 rounded-lg shadow-2xl">
//         <div className="flex justify-between p-4 text-center">
//           <div className="flex justify-between text-xs tracking-normal leading-4 text-center border-b border-solid border-b-slate-200 mt-auto">
//             <div
//               className={`inline-flex items-center px-3 py-2 text-xs font-medium focus:outline-none transition duration-300 cursor-pointer ${
//                 activeButton === "seamLock"
//                   ? "text-blue-600 border-b-2 border-blue-600"
//                   : "text-gray-600 border-b-2 border-gray-300"
//               }`}
//               onClick={() => handleButtonClick("seamLock")}
//               style={{ fontSize: "16px" }}
//             >
//               Seam Locks
//             </div>
//             <div
//               className={`inline-flex items-center px-3 py-2 text-xs font-medium focus:outline-none transition duration-300 cursor-pointer ${
//                 activeButton === "sifelyLocks"
//                   ? "text-blue-600 border-b-2 border-blue-600"
//                   : "text-gray-600 border-b-2 border-gray-300"
//               }`}
//               onClick={() => handleButtonClick("sifelyLocks")}
//               style={{ fontSize: "16px" }}
//             >
//               Sifely Locks
//             </div>
//           </div>

//           {activeTab === "seamLock" && (
//             <div
//               className="flex gap-2.5 justify-between px-5 py-2.5 text-sm font-medium tracking-normal leading-5 text-white whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 cursor-pointer w-40 h-12"
//               onClick={createConnectWebView}
//             >
//               {isLoading ? (
//                 <div className="grow my-auto">Processing...</div>
//               ) : (
//                 <div className="grow my-auto">
//                   <span className="text-xl">+</span> Add seam locks
//                 </div>
//               )}
//             </div>
//           )}
//           {activeTab === "sifelyLocks" && (
//             <div
//               className="flex gap-2.5 justify-between px-5 py-2.5 text-sm font-medium tracking-normal leading-5 text-white whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 cursor-pointer w-40 h-12"
//               onClick={() => setShowModal(true)}
//             >
//               {isLoading ? (
//                 <div className="grow my-auto">Processing...</div>
//               ) : (
//                 <div className="grow my-auto">
//                   <span className="text-xl">+</span> Add sifely locks
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//         <div className="p-2">
//           {activeTab === "seamLock" ? (
//             <SeamLock />
//           ) : (
//             <>
//               <CommonPopup
//                 isOpen={showModal}
//                 onClose={() => setShowModal(false)}
//                 // children={<Form closeModal={closeModal} getSifelyLocks={getSifelyLocks}/>}
//                 disableCloseIcon={false}
//                 heightwidth="100rem"
//               >
//                 <Form
//                   closeModal={closeModal}
//                   fetchSifelyLocks={fetchSifelyLocks}
//                 />
//               </CommonPopup>
//               <SifelyLock />
//             </>
//           )}
//         </div>
//       </div>
//       {/* <div className="w-1/2 bg-white p-4">
//         <SifelyLock />
//       </div> */}
//     </div>
//   );
// };

// export default Lock;

// Lock.js
import React, { useEffect, useState } from "react";
import SeamLock from "./seamLock";
import SifelyLock from "./sifelyLock";
import CommonPopup from "@/components/commonPopup";
import Form from "./addSifelyLockForm";
import { envConfig } from "@/utility/environment";
import toast from "react-hot-toast";
import axiosInstance from "@/auth/axiosInstance";

const Lock = () => {
  const [sifelyLocks, setSifelyLocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("seamLock");
  const [activeTab, setActiveTab] = useState("seamLock");
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = (buttonName: string) => {
    if (activeButton !== buttonName) {
      setActiveButton(buttonName);
      setActiveTab(buttonName === "seamLock" ? "seamLock" : "sifelyLocks");
    }
  };

  useEffect(() => {
    fetchSifelyLocks();
  }, []);

  const fetchSifelyLocks = async () => {
    try {
      setIsLoading(true);
      const apiUrl = `${envConfig.backendUrl}/device/sifely/locklist`;
      const response = await axiosInstance.get(apiUrl);
      if (response.status === 200 && response.data?.success) {
        setSifelyLocks(response.data?.data || []);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching sifely locks");
    } finally {
      setIsLoading(false);
    }
  };

  const createConnectWebView = async () => {
    try {
      setIsLoading(true);
      const apiUrl = `${envConfig.backendUrl}/device/seam/createconnectwebview`;
      const response = await axiosInstance.get(apiUrl);
      if (response.status === 200 && response.data?.success) {
        const url = response.data?.data?.url;
        setIsLoading(false);
        window.open(url, "_blank");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-between gap-1 px-6 py-6 bg-[#f5f7f8] min-h-full max-h-full">
      <div className="w-full bg-white flex flex-col p-5 rounded-lg shadow-2xl">
        <div className="flex justify-between p-4 text-center">
          <div className="flex justify-between text-xs tracking-normal leading-4 text-center border-b border-solid border-b-slate-200 mt-auto">
            <div
              className={`inline-flex items-center px-3 py-2 text-xs font-medium focus:outline-none transition duration-300 cursor-pointer ${
                activeButton === "seamLock"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 border-b-2 border-gray-300"
              }`}
              onClick={() => handleButtonClick("seamLock")}
              style={{ fontSize: "20px" }}
            >
              Seam Locks
            </div>
            <div
              className={`inline-flex items-center px-3 py-2 text-xs font-medium focus:outline-none transition duration-300 cursor-pointer ${
                activeButton === "sifelyLocks"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 border-b-2 border-gray-300"
              }`}
              onClick={() => handleButtonClick("sifelyLocks")}
              style={{ fontSize: "20px" }}
            >
              Sifely Locks
            </div>
          </div>

          {activeTab === "seamLock" && (
            <div
              className="flex gap-2.5 justify-between px-5 py-2.5 text-sm font-medium tracking-normal leading-5 text-white whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 cursor-pointer w-40 h-12"
              onClick={createConnectWebView}
            >
              {isLoading ? (
                <div className="grow my-auto">Processing...</div>
              ) : (
                <div className="grow my-auto">
                  <span className="text-xl">+</span> Add seam locks
                </div>
              )}
            </div>
          )}
          {activeTab === "sifelyLocks" && (
            <div
              className="flex gap-2.5 justify-between px-5 py-2.5 text-sm font-medium tracking-normal leading-5 text-white whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 cursor-pointer w-40 h-12"
              onClick={() => setShowModal(true)}
            >
              {isLoading ? (
                <div className="grow my-auto">Processing...</div>
              ) : (
                <div className="grow my-auto">
                  <span className="text-xl">+</span> Add sifely locks
                </div>
              )}
            </div>
          )}
        </div>
        <div className="p-2">
          {activeTab === "seamLock" ? (
            <SeamLock />
          ) : (
            <>
              <CommonPopup
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                // children={<Form closeModal={closeModal} getSifelyLocks={getSifelyLocks}/>}
                disableCloseIcon={false}
                heightwidth="100rem"
              >
                <Form
                  closeModal={closeModal}
                  fetchSifelyLocks={fetchSifelyLocks}
                />
              </CommonPopup>
              <SifelyLock />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lock;
