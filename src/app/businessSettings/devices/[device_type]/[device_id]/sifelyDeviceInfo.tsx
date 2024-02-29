import React, { useEffect, useState } from "react";
import axios from "axios";
import { envConfig } from "@/utility/environment";
import ReactTooltip from 'react-tooltip';
import { Battery100Icon, Battery50Icon, ChevronDownIcon, ChevronUpIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import SifelyDeviceAccessCodes from "./sifelyDeviceAccessCodes";


interface DeviceInfo {
  lockName: string;
  lockAlias: string;
  modelNum: string;
  electricQuantity: number;
  noKeyPwd: number;
  lockMac: string;
  openDirection: number;
  accessToken: string;
}
const deviceInfoObj = {
  lockName: "",
  lockAlias: "",
  modelNum: "",
  electricQuantity: 0,
  noKeyPwd: 0,
  lockMac: "",
  openDirection: 0,
  accessToken: ""
};

const SifelyDeviceInfo = ({ device_id }: any) => {

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(deviceInfoObj);
  const [passCodes, setPassCodes] = useState([]);

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

  const fetchPassCodes = async () => {
    try {
      const apiUrl = `${envConfig.backendUrl}/device/sifely/getpasscodes?deviceId=${device_id}&accessToken=${deviceInfo?.accessToken}`;
      const result = await axios.get(apiUrl);
      if (result.status == 200) {
        setPassCodes(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPassCodes();
  }, [deviceInfo])

  useEffect(() => {
    getDeviceInfo();

  }, []);

  return (
    <>
      <div className="flex items-center bg-gray-100  gap-4 mt-5 p-4 mx-5 px-3 rounded-md">
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
            <p className="text-xl font-semibold text-gray-800 uppercase">
              {deviceInfo?.lockAlias}
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
              <small className="text-green-600">{`${deviceInfo?.electricQuantity}%`}</small>
            </div>
            {/* <div className="flex items-center gap-1">
              <small>Model:</small>
              <small className="text-gray-600">{deviceInfo.lockName}</small>
            </div> */}
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
      
      <SifelyDeviceAccessCodes
        fetchPassCodes={fetchPassCodes}
        passCodes={passCodes}
        deviceId={device_id}
        accessToken={deviceInfo.accessToken}
      />

    </>
  );
};

export default SifelyDeviceInfo;
