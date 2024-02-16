"use client";
import { DeviceDetails, SeamProvider } from "@seamapi/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { envConfig } from "@/utility/environment";


const DeviceInfo = ({ device_id }:any) => {
  const [clientSessionToken, setClientSessionToken] = useState("");
  const router=useRouter()

  const getToken = async () => {
    const apiUrl=`${envConfig.backendUrl}/device/getclientsessiontoken`
    const res = await axios.get(apiUrl);
    if (res.status == 200) {
      setClientSessionToken(res.data.token);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
      {/* <Toaster /> */}
      <div className="flex justify-between px-2">
        <h2 className="text-xl font-bold text-blue-900">Device details</h2>
        <div className="flex gap-2">
          <button
          onClick={()=>router.back()}
            type="button"
            className="rounded-full bg-gray-400 w-16 px-2 py-1 text-xs  text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-gray-400 w-16 px-2 py-1 text-xs  text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
          >
            Save
          </button>
        </div>
      </div>

      <div>
        <SeamProvider clientSessionToken={clientSessionToken}>
          <DeviceDetails className="" disableResourceIds deviceId={device_id} />
        </SeamProvider>
      </div>
    </div>
  );
};

export default DeviceInfo;
