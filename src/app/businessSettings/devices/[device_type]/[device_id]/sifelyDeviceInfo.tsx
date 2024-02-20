import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { envConfig } from '@/utility/environment'
import { Battery100Icon, Battery50Icon } from '@heroicons/react/20/solid'

interface DeviceInfo {
    lockName: string,
    modelNum: string,
    electricQuantity: number,
    noKeyPwd: number,
    lockMac: string,
    openDirection: number
}
const deviceInfoObj = {
    lockName: '',
    modelNum: '',
    electricQuantity: 0,
    noKeyPwd: 0,
    lockMac: '',
    openDirection: 0
}

const SifelyDeviceInfo = ({ device_id }: any) => {
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(deviceInfoObj)

    const getDeviceInfo = async () => {
        const apiUrl = `${envConfig.backendUrl}/device/sifely/lockinfo`
        const access_token = localStorage.getItem('sifely_access_token')
        const obj = {
            lockId: device_id,
            access_token
        }
        const result = await axios.post(apiUrl, obj)
        if (result.status == 200) {
            setDeviceInfo(result.data)
        }
    }


    useEffect(() => {
        getDeviceInfo()
    }, [])

    return (
        <>
            <div className='flex items-center gap-4 mt-10 px-4 mb-4'>
                <div className='mt-6 w-2/12'>
                    <img
                        src='https://www.schlage.com/content/dam/sch-us/homepage-refresh/smart-lock.png'
                        alt=''
                        height={60}
                        width={60}
                    />
                </div>
                <div className='w-8/12'>
                    <div className='flex gap-1 items-center'>
                        <p className='text-2xl'>{deviceInfo.lockName}</p>
                    </div>
                    <div className='flex flex-col mt-1 text-slate-400 gap-1'>
                        <div className='flex items-center gap-1'>
                            <small>Power: </small>
                            {deviceInfo.electricQuantity > 80 ? <Battery100Icon color="green" width={20} height={20} /> : <Battery50Icon color="green" width={20} height={20} />}
                            <small className='text-slate-600'>{`(${deviceInfo.electricQuantity})%`}</small>

                        </div>
                        <div className='flex items-center gap-1'>
                            <small>Model:</small>
                            <small className='text-slate-600'>{deviceInfo.modelNum}</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className='border border-collapse  w-full rounded-md mt-3 mb-3'>
                {/* <div className='p-4 flex '>
                    <div className='flex items-center'>
                        <div className=' mr-[19rem] items-baseline flex justify-between text-slate-500'>
                            <small className='text-sm '>Lock Status:&nbsp;</small>
                            {
                                true ?
                                    (
                                        <small className='text-sm text-black font-medium'>Locked</small>
                                    ) : (
                                        <small className='text-sm text-black font-medium'>Unlocked</small>
                                    )
                            }

                        </div>
                        <div>
                            <button onClick={() => { }} className='btn px-3 py-1 border text-sm font-medium border-blue-800 text-blue-500 rounded-lg'>{true ? "Unlock" : "Lock"}</button>
                        </div>
                    </div>
                </div> */}
                <hr />
                {/* <div className='flex items-center ml-4 mt-4 '>
                    <p className='text-sm text-slate-500'>No Key Password:&nbsp;</p>
                    <p className='text-sm text-black font-medium'>{deviceInfo.noKeyPwd}</p>
                </div> */}
                <div className='flex items-center ml-4 mt-4'>
                    <p className='text-sm text-slate-500'>Mac:&nbsp;</p>
                    <p className='text-sm text-black font-medium'>{deviceInfo.lockMac}</p>
                </div>
                <div className='flex items-center ml-4 mt-4 mb-4'>
                    <p className='text-sm text-slate-500'>Open direction:&nbsp;</p>
                    <p className='text-sm text-black font-medium'>{deviceInfo.openDirection == 1 ? 'left open' : deviceInfo.openDirection == 2 ? 'right open' : 'unknown'}</p>
                </div>
            </div>
        </>
    )
}

export default SifelyDeviceInfo