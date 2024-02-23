'use client';
import React, { useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { DeviceTable, SeamProvider } from '@seamapi/react';
import { useRouter } from 'next/navigation';
import { envConfig } from '@/utility/environment';

const DeviceList = ({ children }: any) => {
  const router = useRouter();
  const [clientSessionToken, setClientSessionToken] = useState('');

  const getToken = async () => {
    const apiUrl = `${envConfig.backendUrl}/device/getclientsessiontoken`;
    const res = await axios.get(apiUrl);
    if (res.status == 200) {
      setClientSessionToken(res.data.token);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="h-[100%] w-[100%]">
      <div className="flex flex-row gap-2 h-[100%] ">
        {/* column 1 */}
        <div className="flex-1 start-0 border-r border-gray-300 overflow-y-auto w-1/2">
          <div className="flex justify-between px-4">
            <h2 className="text-xl font-bold text-blue-900">
              Smart Home Devices
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => router.push('/businessSettings/addDevices')}
                className="rounded-full bg-blue-900 px-2 py-1 text-xs  text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
              >
                Add Devices
              </button>
              <button
                type="button"
                disabled={true}
                className="rounded-full bg-blue-900 px-2 py-1 text-xs  text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
              >
                Pair 5 Devices
              </button>
            </div>
          </div>
          <div className="mt-7">
            {/* Device List here */}
            <SeamProvider clientSessionToken={clientSessionToken}>
              <DeviceTable
                preventDefaultOnDeviceClick
                onDeviceClick={(device_id) =>
                  router.push(`/businessSettings/devices/${device_id}`)
                }
              />
            </SeamProvider>
          </div>
        </div>

        {/* column 2 - Device Details */}
        <div className=" overflow-y-auto w-1/2">{children}</div>
      </div>
    </div>
  );
};

export default DeviceList;
