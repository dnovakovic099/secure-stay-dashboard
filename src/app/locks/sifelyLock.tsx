// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import LoadingSpinner from "@/components/LoadingSpinner";
// import { envConfig } from "@/utility/environment";
// import toast from "react-hot-toast";
// import {
//   Battery100Icon,
//   Battery50Icon,
//   PlusIcon,
// } from "@heroicons/react/20/solid";
// import CommonPopup from "@/components/commonPopup";
// import Form from "./addSifelyLockForm";
// import { useRouter } from "next/navigation";

// const SifelyLock = () => {
//   const [sifelyLocks, setSifelyLocks] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const router = useRouter();

//   useEffect(() => {
//     fetchSifelyLocks();
//   }, []);

//   const fetchSifelyLocks = async () => {
//     try {
//       setIsLoading(true);
//       const apiUrl = `${envConfig.backendUrl}/device/sifely/locklist`;
//       const response = await axios.get(apiUrl);
//       if (response.status === 200 && response.data?.success) {
//         setSifelyLocks(response.data?.data);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Error fetching sifely locks");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const handleClick = (lockId: any) => {
//     router.push(`/locks/Sifely/${lockId}`);
//   };

//   return (
//     <>
//       <CommonPopup
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         // children={<Form closeModal={closeModal} getSifelyLocks={getSifelyLocks}/>}
//         disableCloseIcon={false}
//         heightwidth="100rem"
//       >
//         <Form closeModal={closeModal} fetchSifelyLocks={fetchSifelyLocks} />
//       </CommonPopup>
//       <div className="p-2">
//         <div className="flex justify-between items-center pr-2">
//           <h1 className="text-xl font-semibold ml-4">Sifely Locks</h1>
//           <button
//             onClick={() => setShowModal(true)}
//             className="flex items-center px-2 py-2 h-[40px] text-white text-sm rounded-md focus:outline-none transition duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-purple-900 hover:to-purple-800 focus:to-purple-800"
//           >
//             <PlusIcon className="text-white h-4 w-4" />
//             Add sifely locks
//           </button>
//         </div>
//         <div className="text-slate-700 text-base font-medium mt-10">
//           {isLoading && <LoadingSpinner />}
//           {sifelyLocks.length === 0 && (
//             <div>
//               <p className="text-slate-400 text-center mt-32">
//                 Sorry, no devices were found
//               </p>
//             </div>
//           )}
//           {sifelyLocks.map((lock, index) => (
//             <LockItem handleClick={handleClick} key={index} lock={lock} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// const LockItem = ({ lock, handleClick }: any) => (
//   <div
//     onClick={() => handleClick(lock?.lockId)}
//     className="py-4 font-normal text-sm text-justify hover:bg-[#f1f3f4] flex items-center gap-4 justify-between border-b cursor-pointer transition-all duration-300"
//   >
//     <div className="flex justify-start gap-5 mx-5">
//       <div>
//         <img
//           src="https://www.schlage.com/content/dam/sch-us/homepage-refresh/smart-lock.png"
//           alt=""
//           width={27}
//           height={27}
//           className="rounded-md"
//         />
//       </div>
//       <div className="flex flex-col">
//         <h1 className="font-semibold text-base text-black uppercase">
//           {lock?.lockAlias?.substring(0, 30)}
//         </h1>
//         <p className="text-xs text-slate-500">{lock.lockName}</p>
//       </div>
//     </div>
//     <div className="flex flex-col mr-4 items-baseline text-slate-500">
//       <div className="text-xs flex items-center gap-2 text-left">
//         {lock.electricQuantity > 80 ? (
//           <Battery100Icon color="green" width={20} height={20} />
//         ) : (
//           <Battery50Icon color="green" width={20} height={20} />
//         )}
//         <div>
//           {lock.electricQuantity < 20 ? "Low" : "Good"} ({lock.electricQuantity}
//           %)
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default SifelyLock;

//------------------------------------------------

// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import LoadingSpinner from "@/components/LoadingSpinner";
// import { envConfig } from "@/utility/environment";
// import toast from "react-hot-toast";
// import {
//   Battery100Icon,
//   Battery50Icon,
//   PlusIcon,
// } from "@heroicons/react/20/solid";
// // import CommonPopup from "@/components/commonPopup";
// // import Form from "./addSifelyLockForm";
// import { useRouter } from "next/navigation";

// const SifelyLock = () => {
//   const [sifelyLocks, setSifelyLocks] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   // const [showModal, setShowModal] = useState(false);

//   const router = useRouter();

//   useEffect(() => {
//     fetchSifelyLocks();
//   }, []);

//   const fetchSifelyLocks = async () => {
//     try {
//       setIsLoading(true);
//       const apiUrl = `${envConfig.backendUrl}/device/sifely/locklist`;
//       const response = await axios.get(apiUrl);
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

//   // const closeModal = () => {
//   //   setShowModal(false);
//   // };

//   const handleClick = (lockId: any) => {
//     router.push(`/locks/Sifely/${lockId}`);
//   };

//   return (
//     <div className="text-slate-700 text-base font-medium mt-10">
//       {isLoading && <LoadingSpinner />}
//       {sifelyLocks?.length === 0 && (
//         <div>
//           <p className="text-black text-center mt-32">
//             Sorry, no devices were found
//           </p>
//         </div>
//       )}
//       {sifelyLocks.map((lock, index) => (
//         <LockItem handleClick={handleClick} key={index} lock={lock} />
//       ))}
//     </div>
//   );
// };

// const LockItem = ({ lock, handleClick }: any) => (
//   <div
//     onClick={() => handleClick(lock?.lockId)}
//     className="py-4 font-normal text-sm text-justify hover:bg-[#f1f3f4] flex items-center gap-4 justify-between border-b cursor-pointer transition-all duration-300"
//   >
//     <div className="flex justify-start gap-5 mx-5">
//       <div>
//         <img
//           src="https://www.schlage.com/content/dam/sch-us/homepage-refresh/smart-lock.png"
//           alt=""
//           width={27}
//           height={27}
//           className="rounded-md"
//         />
//       </div>
//       <div className="flex flex-col">
//         <h1 className="font-semibold text-base text-black uppercase">
//           {lock?.lockAlias?.substring(0, 30)}
//         </h1>
//         <p className="text-xs text-slate-500">{lock.lockName}</p>
//       </div>
//     </div>
//     <div className="flex flex-col mr-4 items-baseline text-slate-500">
//       <div className="text-xs flex items-center gap-2 text-left">
//         {lock.electricQuantity > 80 ? (
//           <Battery100Icon color="green" width={20} height={20} />
//         ) : (
//           <Battery50Icon color="green" width={20} height={20} />
//         )}
//         <div>
//           {lock.electricQuantity < 20 ? "Low" : "Good"} ({lock.electricQuantity}
//           %)
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default SifelyLock;

// SifelyLock.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { envConfig } from "@/utility/environment";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Battery100Icon, Battery50Icon } from "@heroicons/react/20/solid";

const mockSifelyLockData = [
  {
    id: 1,
    lockId: 123456,
    lockName: "Front Door Lock",
    lockAlias: "Front Door",
    lockMac: "AA:BB:CC:DD:EE:FF",
    electricQuantity: 80,
    featureValue: "feature1,feature2",
    hasGateway: 1,
    lockData: "lock data 1",
    groupId: 1,
    groupName: "Main Group",
    date: 1647727240000,
    status: 1,
    accessToken: "abc123token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    lockId: 789012,
    lockName: "Back Door Lock",
    lockAlias: "Back Door",
    lockMac: "11:22:33:44:55:66",
    electricQuantity: 60,
    featureValue: "feature3,feature4",
    hasGateway: 0,
    lockData: "lock data 2",
    groupId: 2,
    groupName: "Secondary Group",
    date: 1647727240000,
    status: 1,
    accessToken: "def456token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    lockId: 654321,
    lockName: "Garage Lock",
    lockAlias: "Garage",
    lockMac: "FF:EE:DD:CC:BB:AA",
    electricQuantity: 90,
    featureValue: "feature5,feature6",
    hasGateway: 1,
    lockData: "lock data 3",
    groupId: 1,
    groupName: "Main Group",
    date: 1647727240000,
    status: 1,
    accessToken: "ghi789token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more entries here as needed...
  {
    id: 4,
    lockId: 987654,
    lockName: "Basement Lock",
    lockAlias: "Basement",
    lockMac: "12:34:56:78:90:AB",
    electricQuantity: 70,
    featureValue: "feature7,feature8",
    hasGateway: 0,
    lockData: "lock data 4",
    groupId: 2,
    groupName: "Secondary Group",
    date: 1647727240000,
    status: 1,
    accessToken: "jkl012token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    lockId: 135792,
    lockName: "Office Lock",
    lockAlias: "Office",
    lockMac: "CC:DD:EE:FF:AA:BB",
    electricQuantity: 85,
    featureValue: "feature9,feature10",
    hasGateway: 1,
    lockData: "lock data 5",
    groupId: 1,
    groupName: "Main Group",
    date: 1647727240000,
    status: 1,
    accessToken: "mno345token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    lockId: 246801,
    lockName: "Storage Lock",
    lockAlias: "Storage",
    lockMac: "23:45:67:89:AB:CD",
    electricQuantity: 95,
    featureValue: "feature11,feature12",
    hasGateway: 0,
    lockData: "lock data 6",
    groupId: 2,
    groupName: "Secondary Group",
    date: 1647727240000,
    status: 1,
    accessToken: "pqr678token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    lockId: 112233,
    lockName: "Front Gate Lock",
    lockAlias: "Front Gate",
    lockMac: "FF:AA:BB:CC:DD:EE",
    electricQuantity: 75,
    featureValue: "feature13,feature14",
    hasGateway: 1,
    lockData: "lock data 7",
    groupId: 1,
    groupName: "Main Group",
    date: 1647727240000,
    status: 1,
    accessToken: "stu901token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    lockId: 445566,
    lockName: "Warehouse Lock",
    lockAlias: "Warehouse",
    lockMac: "EF:GH:IJ:KL:MN:OP",
    electricQuantity: 88,
    featureValue: "feature15,feature16",
    hasGateway: 0,
    lockData: "lock data 8",
    groupId: 2,
    groupName: "Secondary Group",
    date: 1647727240000,
    status: 1,
    accessToken: "vwx234token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    lockId: 778899,
    lockName: "Side Gate Lock",
    lockAlias: "Side Gate",
    lockMac: "12:34:56:78:90:AB",
    electricQuantity: 82,
    featureValue: "feature17,feature18",
    hasGateway: 1,
    lockData: "lock data 9",
    groupId: 1,
    groupName: "Main Group",
    date: 1647727240000,
    status: 1,
    accessToken: "yza567token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    lockId: 990011,
    lockName: "Side Door Lock",
    lockAlias: "Side Door",
    lockMac: "AB:CD:EF:GH:IJ:KL",
    electricQuantity: 78,
    featureValue: "feature19,feature20",
    hasGateway: 0,
    lockData: "lock data 10",
    groupId: 2,
    groupName: "Secondary Group",
    date: 1647727240000,
    status: 1,
    accessToken: "bcd890token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    lockId: 112233,
    lockName: "Back Gate Lock",
    lockAlias: "Back Gate",
    lockMac: "MN:OP:QR:ST:UV:WX",
    electricQuantity: 92,
    featureValue: "feature21,feature22",
    hasGateway: 1,
    lockData: "lock data 11",
    groupId: 1,
    groupName: "Main Group",
    date: 1647727240000,
    status: 1,
    accessToken: "efg123token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 12,
    lockId: 334455,
    lockName: "Side Entrance Lock",
    lockAlias: "Side Entrance",
    lockMac: "YZ:AB:CD:EF:GH:IJ",
    electricQuantity: 84,
    featureValue: "feature23,feature24",
    hasGateway: 0,
    lockData: "lock data 12",
    groupId: 2,
    groupName: "Secondary Group",
    date: 1647727240000,
    status: 1,
    accessToken: "hij456token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 13,
    lockId: 556677,
    lockName: "Side Window Lock",
    lockAlias: "Side Window",
    lockMac: "KL:MN:OP:QR:ST:UV",
    electricQuantity: 79,
    featureValue: "feature25,feature26",
    hasGateway: 1,
    lockData: "lock data 13",
    groupId: 1,
    groupName: "Main Group",
    date: 1647727240000,
    status: 1,
    accessToken: "klm789token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 14,
    lockId: 778899,
    lockName: "Front Window Lock",
    lockAlias: "Front Window",
    lockMac: "WX:YZ:AB:CD:EF:GH",
    electricQuantity: 87,
    featureValue: "feature27,feature28",
    hasGateway: 0,
    lockData: "lock data 14",
    groupId: 2,
    groupName: "Secondary Group",
    date: 1647727240000,
    status: 1,
    accessToken: "nop012token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 15,
    lockId: 990011,
    lockName: "Back Window Lock",
    lockAlias: "Back Window",
    lockMac: "IJ:KL:MN:OP:QR:ST",
    electricQuantity: 83,
    featureValue: "feature29,feature30",
    hasGateway: 1,
    lockData: "lock data 15",
    groupId: 1,
    groupName: "Main Group",
    date: 1647727240000,
    status: 1,
    accessToken: "qrs345token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const SifelyLock = () => {
  const [sifelyLocks, setSifelyLocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchSifelyLocks();
  }, []);

  const fetchSifelyLocks = async () => {
    try {
      setIsLoading(true);
      const apiUrl = `${envConfig.backendUrl}/device/sifely/locklist`;
      const response = await axios.get(apiUrl);
      if (response.status === 200 && response.data?.success) {
        setSifelyLocks(response.data?.data || mockSifelyLockData);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching sifely locks");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (lockId: string) => {
    router.push(`/locks/Sifely/${lockId}`);
  };

  return (
    <div className="text-slate-700 text-base font-medium mr-10 mt-2">
      {isLoading && <LoadingSpinner />}
      {sifelyLocks?.length === 0 && (
        <div className="m-0 p-0 border-0 font-sans text-base align-baseline tracking-normal">
          <p className="text-black font-sm text-center mt-80">
            Sorry, no devices were found
          </p>
        </div>
      )}
      <div className="max-h-[650px] overflow-y-auto scrollbar-hide text-black ml-10 mr-10">
        {sifelyLocks.map((lock, index) => (
          <LockItem handleClick={handleClick} key={index} lock={lock} />
        ))}
      </div>
    </div>
  );
};

const LockItem = ({ lock, handleClick }: any) => (
  <div
    onClick={() => handleClick(lock?.lockId)}
    className="py-4 font-normal text-sm text-justify hover:bg-[#f1f3f4] flex items-center gap-4 justify-between border-b cursor-pointer transition-all duration-300 p-10"
  >
    <div className="flex justify-start gap-5 mx-5">
      <div>
        <img
          src="https://www.schlage.com/content/dam/sch-us/homepage-refresh/smart-lock.png"
          alt=""
          width={27}
          height={27}
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="font-semibold text-base text-black uppercase">
          {lock?.lockAlias?.substring(0, 30)}
        </h1>
        <p className="text-xs text-slate-500">{lock.lockName}</p>
      </div>
    </div>
    <div className="flex flex-col mr-4 items-baseline text-slate-500">
      <div className="text-xs flex items-center gap-2 text-left">
        {lock.electricQuantity > 80 ? (
          <Battery100Icon color="green" width={20} height={20} />
        ) : (
          <Battery50Icon color="green" width={20} height={20} />
        )}
        <div>
          {lock.electricQuantity < 20 ? "Low" : "Good"} ({lock.electricQuantity}
          %)
        </div>
      </div>
    </div>
  </div>
);

export default SifelyLock;
