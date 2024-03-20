// "use client";
// import { envConfig } from "@/utility/environment";
// import { DeviceTable, SeamProvider } from "@seamapi/react";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { PlusIcon } from "@heroicons/react/20/solid";
// import { useRouter } from "next/navigation";
// import LoadingSpinner from "@/components/LoadingSpinner";

// const SeamLock = () => {
//   const [clientSessionToken, setClientSessionToken] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();

//   const fetchClientSessionToken = async () => {
//     try {
//       setIsLoading(true);
//       const apiUrl = `${envConfig.backendUrl}/device/seam/getclientsessiontoken`;
//       const response = await axios.get(apiUrl);

//       if (response.status == 200 && response.data?.success) {
//         setClientSessionToken(response.data?.data?.token);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong fetching clientsessiontoken");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleClick = (lockId: any) => {
//     router.push(`/locks/Seam/${lockId}`);
//   };

//   useEffect(() => {
//     fetchClientSessionToken();
//   }, []);

//   return (
//     <div className="text-slate-700 text-base font-medium mt-10">
//       {isLoading && <LoadingSpinner />}
//       {clientSessionToken && (
//         <div className="text-black text-center mt-32">
//           <SeamProvider clientSessionToken={clientSessionToken}>
//             <DeviceTable
//               heading={null}
//               disableSearch
//               preventDefaultOnDeviceClick
//               onDeviceClick={(deviceId) => handleClick(deviceId)}
//             />
//           </SeamProvider>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SeamLock;

// SeamLock.js
import React, { useEffect, useState } from "react";
import { SeamProvider, DeviceTable } from "@seamapi/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { envConfig } from "@/utility/environment";

const SeamLock = () => {
  const [clientSessionToken, setClientSessionToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchClientSessionToken = async () => {
    try {
      setIsLoading(true);
      const apiUrl = `${envConfig.backendUrl}/device/seam/getclientsessiontoken`;
      const response = await axios.get(apiUrl);
      if (response.status === 200 && response.data?.success) {
        setClientSessionToken(response.data?.data?.token);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong fetching clientsessiontoken");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (lockId: string) => {
    router.push(`/locks/Seam/${lockId}`);
  };

  useEffect(() => {
    fetchClientSessionToken();
  }, []);

  return (
    <div className="text-slate-700 text-base font-medium mr-10">
      {isLoading && <LoadingSpinner />}
      {clientSessionToken && (
        <div className="max-h-[650px] overflow-y-auto scrollbar-hide text-black ml-20 mr-10">
          <SeamProvider clientSessionToken={clientSessionToken}>
            <DeviceTable
              // heading={null}
              className=""
              disableSearch
              preventDefaultOnDeviceClick
              onDeviceClick={(deviceId) => handleClick(deviceId)}
            />
          </SeamProvider>
        </div>
      )}
    </div>
  );
};

export default SeamLock;
