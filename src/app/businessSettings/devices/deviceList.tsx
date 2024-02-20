"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DeviceTable, SeamProvider } from "@seamapi/react";
import { useRouter } from "next/navigation";
import { envConfig } from '@/utility/environment'
import Form from "./form";
import CommonPopup from "@/components/commonPopup";
import { Battery50Icon, Battery100Icon } from "@heroicons/react/20/solid";

const DeviceList = ({ children }: any) => {

  const router = useRouter();
  const [clientSessionToken, setClientSessionToken] = useState("");
  const [sifelyLocks, setSifelyLocks] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getToken = async () => {
    const apiUrl = `${envConfig.backendUrl}/device/getclientsessiontoken`
    const res = await axios.get(apiUrl);
    if (res.status == 200) {
      setClientSessionToken(res.data.token);
    }
  };

  const getSifelyLocks = async () => {
    const access_token = localStorage.getItem('sifely_access_token')
    if (!access_token || access_token == '' || sifelyLocks.length > 0) {
      setSifelyLocks([])
      return
    }
    setIsLoading(true)
    const apiUrl = `${envConfig.backendUrl}/device/sifely/locklist`
    const result = await axios.post(apiUrl, { access_token, pageNo: 1, pageSize: 100 })
    setIsLoading(false)
    setSifelyLocks(result.data.list)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    getToken();
    getSifelyLocks()
  }, []);

  return (
    <div className="h-[100%] w-[100%]">
      <CommonPopup
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Login"
        subtitle='sifely account'
        children={<Form closeModal={closeModal} />}
        disableCloseIcon={false}
        heightwidth='100rem'
      />
      <div className="flex flex-row gap-2 h-[100%] ">
        {/* column 1 */}
        <div className="flex-1 start-0 border-r border-gray-300 overflow-y-auto w-[1/2]">
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
          <div className="mt-7 h-[90%] overflow-y-auto">
            {/* Device List here */}
            <SeamProvider clientSessionToken={clientSessionToken}>
              <DeviceTable
                preventDefaultOnDeviceClick
                onDeviceClick={(device_id) =>
                  router.push(`/businessSettings/devices/seam/${device_id}`)
                }
              />
            </SeamProvider>
            <hr />
            <div className="p-4">
              <h4 className="text-slate-800 font-semibold text-lg">Sifely Locks</h4>
              {
                sifelyLocks.length == 0 &&
                <div className="text-center p-4">
                  {
                    !isLoading ?
                      (
                        <>
                          <span className="text-slate-400 mr-4">Sign to your sifely account</span>
                          <span onClick={() => setShowModal(true)} className="text-blue-500 underline cursor-pointer">click here</span>
                        </>
                      ) : (
                        <p>Loading...</p>
                      )

                  }
                </div>
              }

              <ul className='text-slate-700 text-base font-medium mt-4'>
                <>
                  {
                    sifelyLocks.map((lock: any) => (
                      <li onClick={() => { router.push(`/businessSettings/devices/sifely/${lock.lockId}`) }} className=' p-2 rounded-md font-normal text-sm text-justify hover:bg-slate-100 flex gap-4 justify-start cursor-pointer'>
                        <div>
                          <img
                            src="https://www.schlage.com/content/dam/sch-us/homepage-refresh/smart-lock.png"
                            alt=''
                            width={27}
                            height={27}
                          />
                        </div>
                        <div className='flex items-baseline'>
                          <div className="flex flex-col ">
                            <h1 className='font-medium text-base text-black'>{lock.lockName}</h1>
                            <p className='text-xs text-slate-500'>{lock.lockAlias}</p>
                          </div>
                          <div className='flex flex-col ml-20 items-baseline text-slate-500'>
                            <span className="text-xs ">Mac: {lock.lockMac}</span>
                            <span className="text-xs flex gap-2">
                              {lock.electricQuantity > 80 ? <Battery100Icon color="green" width={20} height={20} /> : <Battery50Icon color="green" width={20} height={20} />}
                              <span>{lock.electricQuantity < 20 ? 'Low' : 'Good'} ({lock.electricQuantity}%)</span>
                            </span>
                          </div>

                        </div>
                      </li>
                    ))
                  }

                </>
              </ul>
            </div>
          </div>
        </div>

        {/* column 2 - Device Details */}
        <div className=" overflow-y-auto w-1/2">{children}</div>
      </div>
    </div>
  );
};

export default DeviceList;
