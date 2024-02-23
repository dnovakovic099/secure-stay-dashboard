import React, { useEffect, useState } from "react";
import axios from "axios";
import { envConfig } from "@/utility/environment";
import { Battery100Icon, Battery50Icon } from "@heroicons/react/20/solid";

interface DeviceInfo {
  lockName: string;
  modelNum: string;
  electricQuantity: number;
  noKeyPwd: number;
  lockMac: string;
  openDirection: number;
}
const deviceInfoObj = {
  lockName: "",
  modelNum: "",
  electricQuantity: 0,
  noKeyPwd: 0,
  lockMac: "",
  openDirection: 0,
};

const SifelyDeviceInfo = ({ device_id }: any) => {

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(deviceInfoObj);

  const getDeviceInfo = async () => {

    const apiUrl = `${envConfig.backendUrl}/device/sifely/lockinfo`;
    const access_token = localStorage.getItem("sifely_access_token");

    const obj = {
      lockId: device_id,
      access_token,
    };

    const result = await axios.post(apiUrl, obj);

    if (result.status == 200) {
      setDeviceInfo(result.data);
    }

  };

  useEffect(() => {
    getDeviceInfo();

  }, []);

  return (
    <>
      <div className="flex items-center bg-gray-100  gap-4 mt-5 p-4 mx-5 px-3">
        <div className="flex items-center ">
          <div className="w-16 h-16 overflow-hidden rounded-full mr-2">
            <img
              src="https://www.schlage.com/content/dam/sch-us/homepage-refresh/smart-lock.png"
              alt=""
              className="object-scale-down w-full h-full rounded-full"
            />
          </div>
        </div>
        <div className="w-8/1">
          <div className="flex gap-1 items-center">
            <p className="text-2xl font-semibold text-gray-800">
              {deviceInfo.lockName}
            </p>
          </div>
          <div className="flex flex-col mt-1 text-gray-500 gap-1">
            <div className="flex items-center gap-1">
              <small>Power: </small>
              {deviceInfo.electricQuantity > 80 ? (
                <Battery100Icon color="green" width={16} height={16} />
              ) : (
                <Battery50Icon color="green" width={16} height={16} />
              )}
              <small className="text-green-600">{`${deviceInfo.electricQuantity}%`}</small>
            </div>
            <div className="flex items-center gap-1">
              <small>Model:</small>
              <small className="text-gray-600">{deviceInfo.modelNum}</small>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white w-[92%] mx-auto mt-2 mb-3">
        <hr className="border-t border-gray-300 my-3" />
        <div className="flex items-center ml-4 mt-3">
          <p className="text-xs text-gray-500">Mac Address:</p>
          <p className="text-sm text-black font-semibold ml-2">
            {deviceInfo.lockMac}
          </p>
        </div>
        <div className="flex items-center ml-4 mt-3">
          <p className="text-xs text-gray-500">Open Direction:</p>
          <p className="text-sm text-black font-semibold ml-2">
            {deviceInfo.openDirection === 1
              ? "Left Open"
              : deviceInfo.openDirection === 2
              ? "Right Open"
              : "Unknown"}
          </p>
        </div>
      </div>
    </>
  );
};

export default SifelyDeviceInfo;
