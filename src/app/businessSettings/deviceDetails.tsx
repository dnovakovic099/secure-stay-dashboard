import React, { useEffect, useState } from "react";
import { KeyIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import { LockClosedIcon, LockOpenIcon, Battery100Icon, Battery50Icon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import toast from 'react-hot-toast';
import { envConfig } from "@/utility/environment";

const DeviceDetails = (props: any) => {

    const envconfig = envConfig;
    // State to track the expansion of different sections
    const [showBookingAccessCodes, setShowBookingAccessCodes] = useState(true);
    const [showBackupAccessCodes, setShowBackupAccessCodes] = useState(true);
    const [showManualAccessCodes, setShowManualAccessCodes] = useState(true);

    //show Backup Access Code boolean
    const [showBackupAccessCode1, setShowBackupAccessCode1] = useState(false);
    const [showBackupAccessCode2, setShowBackupAccessCode2] = useState(false);
    const [showBackupAccessCode3, setShowBackupAccessCode3] = useState(false);

    interface Device {
        id: string;
        lockName: string;
        subName: string;
        online: boolean;
        batteryLevel: string;
        lockedValue: boolean;
        image: string;
    }

    const [deviceData, setDeviceData] = useState<Device>();

    useEffect(() => {
        getDeviceDetails(props.deviceId);
    }, [props.deviceId])

    //get Device details
    const getDeviceDetails = async (deviceId: string) => {
        console.log("deviceId", deviceId)
        const apiUrl = `${envconfig.backendUrl}/device/deviceDetail`;

        let requestBody = {
            device_id: deviceId,
        };
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        var params = { method: 'POST', headers: headers, body: JSON.stringify(requestBody) }

        try {
            const response: any = await handleApiCallFetch(apiUrl, params);
            console.log("responsedeviceId", response);
            if (response && response.device) {
                formattResponse(response.device);

            }
        } catch (error) {
            console.log('Error in api call schlage :', error);

        }
    }

    const formattResponse = (device: any) => {

        const formattedData = {
            id: device && device.device_id ? device.device_id : "",
            lockName: device && device.properties.name ? device.properties.name : '',
            subName: device && device.properties.name ? device.properties.name : '',
            online: device && device.properties && device.properties.online ? device.properties.online : false,
            batteryLevel: device && device.properties && device.properties.battery_level ? (device.properties.battery_level * 100).toFixed(0).toString() : "0",
            lockedValue: device && device.properties && device.properties.locked ? device.properties.locked : false,
            image: device && device.properties && device.properties.image_url ? device.properties.image_url : "",
        };

        setDeviceData(formattedData);
    }

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setDeviceData((prevDevice: any) => ({
            ...prevDevice,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Pass the deviceData data to the parent component
        // updateDevice(deviceData);

        // Clear the form after submission
        setDeviceData({
            id: "",
            lockName: "",
            subName: "",
            online: false,
            batteryLevel: "",
            lockedValue: false,
            image: "",
        });
    };

    const deviceLockHandler = async (data: any) => {
        console.log("hanles api loc", data)

        let apiUrl = "";
        if (data && data.lockedValue) {
            apiUrl = `${envconfig.backendUrl}/device/unlock_door`;
        } else {
            apiUrl = `${envconfig.backendUrl}/device/lock_door`;
        }

        let requestBody = {
            device_id: data && data.id,
        };
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        var params = { method: 'POST', headers: headers, body: JSON.stringify(requestBody) }

        try {
            const response: any = await handleApiCallFetch(apiUrl, params);
            console.log("responsedeviceId", response);
            if (response && response.ok) {
                toast.success(`Door ${data.lockedValue ? "unlocked" : "locked"} successfully`);
                getDeviceDetails(data?.id);
            } else {
                toast.error(`Failed to  ${data.lockedValue ? "unlocked" : "locked"} door`);
            }
        } catch (error) {
            console.log('Error in api call schlage :', error);
        }
    }

    return (
        <div className="flex-1">
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between px-2 pb-4 border-b border-gray-300">
                    <h2 className="text-lg font-medium text-blue-900">Device details</h2>
                    <div className="flex gap-2">
                        <button
                            type='button'
                            className="rounded-full bg-gray-400 w-16 px-2 py-1 text-xs  text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className="rounded-full bg-gray-400 w-16 px-2 py-1 text-xs  text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className="flex flex-col px-2 py-2 w-full">
                    <div className="flex flex-col w-full gap-4">
                        {/* Devices Basic Details */}
                        <div className="flex flex-col w-full gap-2">
                            <h2 className="font-bold py-1">Device</h2>
                            {/* <div className="flex flex-col w-full ">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="col-span-1 mb-2 w-full">
                                        <label htmlFor="lockName" className="block mb-2 text-sm font-medium text-gray-700 items-center">
                                            Lock Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lockName"
                                            name="lockName"
                                            value={deviceData?.lockName}
                                            onChange={handleChange}
                                            placeholder="Lock Name"
                                            disabled={true}
                                            className="mr-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
                                        // required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="subName" className="block mb-2 text-sm font-medium text-gray-700 items-center">
                                            Sub Name
                                        </label>
                                        <input
                                            type="text"
                                            id="subName"
                                            name="subName"
                                            value={deviceData?.subName}
                                            onChange={handleChange}
                                            placeholder="Sub Name"
                                            disabled={true}
                                            className="mr-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
                                        // required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 justify-center items-center">
                                    <div className="col-span-1 mb-2 w-full">
                                        <div className="mb-2 w-full justify-center items-center">

                                            <label htmlFor="online1" className="block mt-2 text-sm font-medium text-gray-700 items-center">
                                                <input
                                                    type="checkbox"
                                                    id="online"
                                                    name="online"
                                                    checked={true}
                                                    onChange={handleChange}
                                                    // disabled={true}
                                                    className="mr-2 mt-1" />
                                                Online
                                            </label>
                                        </div>
                                        <div className="mb-2 justify-center items-center">
                                            <label htmlFor="lockedValue1" className="block text-sm font-medium text-gray-700 items-center">
                                                <input
                                                    type="checkbox"
                                                    id="lockedValue"
                                                    name="lockedValue"
                                                    checked={true}
                                                    onChange={handleChange}
                                                    // disabled={true}
                                                    className="mr-2" />
                                                Locked
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-1 mb-2 w-full">
                                        <label htmlFor="batteryLevel" className="block mb-2 text-sm font-medium text-gray-700 items-center">
                                            Battery Level
                                        </label>
                                        <input
                                            type="text"
                                            id="batteryLevel"
                                            name="batteryLevel"
                                            value={deviceData?.batteryLevel}
                                            onChange={handleChange}
                                            placeholder="Battery Level"
                                            disabled={true}
                                            className="mr-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
                                        // required
                                        />
                                    </div>

                                </div>
                            </div> */}
                            <div className="grid grid-cols-3 gap-1 w-full justify-center items-center border border-gray-300 rounded-lg bg-slate-200">
                                <div className="flex col-span-1 w justify-center items-center align-bottom h-40">
                                    <Image
                                        className="h-24 w-auto"
                                        src={deviceData ? deviceData?.image : ""}
                                        alt="lock"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                <div className="col-span-2 h-40 px-4">
                                    <div className="text-base font-bold justify-start items-center py-2">{deviceData?.lockName}</div>
                                    <div className="grid grid-row-3 gap-3 w-full justify-start items-center px-4">
                                        <div className="col-span-1 text-sm">{deviceData?.subName}</div>
                                        <div className="col-span-1 text-sm">{deviceData?.online ?
                                            <span className="flex justify-start items-center">
                                                <CheckCircleIcon className="w-4 h-4 mr-2  fill-green-800 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                                Online
                                            </span>
                                            : <span className="flex justify-start items-center">
                                                <XCircleIcon className="w-4 h-4 mr-2 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                                Offline
                                            </span>}
                                        </div>
                                        <div className="col-span-1 text-sm">{parseInt(deviceData ? deviceData?.batteryLevel : '') > 25 ?
                                            <span className="flex justify-start items-center">
                                                <Battery100Icon className="w-4 h-4 mr-2 fill-green-800 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                                <div className="flex flex-row">
                                                    <span>Good</span>
                                                    {`(${deviceData?.batteryLevel})%`}
                                                </div>
                                            </span>
                                            : <span className="flex justify-start items-center">
                                                <Battery50Icon className="w-4 h-4 mr-2 fill-red-800 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                                <div className="flex flex-row ">
                                                    <span>Low</span>
                                                    {`(${deviceData?.batteryLevel})%`}
                                                </div>
                                            </span>}
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-1 w-full justify-between items-center border border-gray-300 rounded-lg bg-slate-200 p-2">
                                <div className="col-span-1 text-sm">
                                    <span className="font-semibold text-xm" >Status</span>
                                    {deviceData?.lockedValue ?
                                        <span className="flex justify-end items-center">
                                            <LockClosedIcon className="w-4 h-4 mr-1 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                            Locked
                                        </span>
                                        : <span className="flex justify-end items-center">
                                            <LockOpenIcon className="w-4 h-4 mr-1 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                            Unlocked
                                        </span>}

                                </div>
                                <button
                                    type='button'
                                    onClick={() => deviceLockHandler(deviceData)}
                                    className="rounded-md bg-blue-900 px-2 py-2 text-xs font-medium w-24 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                                >
                                    {deviceData?.lockedValue ? "Unlock" : "Lock"}
                                </button>
                            </div>

                        </div>

                        {/* Booking Access Codes */}
                        <div className="w-full">
                            <div className="flex w-full py-1 justify-between">
                                <div className="flex items-center">
                                    <KeyIcon className="w-4 h-4 mr-1 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                    <h2 className="font-bold"> Booking Access Codes</h2>
                                </div>
                                <button
                                    className=""
                                    onClick={() => setShowBookingAccessCodes(!showBookingAccessCodes)}
                                >
                                    {showBookingAccessCodes ? <ChevronDownIcon className="w-6 h-6 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                        : <ChevronUpIcon className="w-6 h-6 text-gray-600 hover:text-gray-900" aria-hidden={true} />}
                                </button>
                            </div>
                            {showBookingAccessCodes && (
                                <p className="px-2 text-sm">
                                    {/* Include your booking access code details here */}
                                    Booking access codes are automatically generated on booking confirmation. Codes are activated 2 hours before check-in and
                                    are deactivated 2 hours after check-out or when the guest cancels. Please check the booking panal to view the booking access code.
                                </p>
                            )}
                        </div>

                        {/* Backup Access Codes */}
                        <div className="w-full">
                            <div className="flex w-full py-1 justify-between">
                                <div className="flex items-center">
                                    <KeyIcon className="w-4 h-4 mr-1 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                    <h2 className="font-bold"> Backup Access Codes</h2>
                                </div>
                                <button
                                    className=""
                                    onClick={() => setShowBackupAccessCodes(!showBackupAccessCodes)}
                                >
                                    {showBackupAccessCodes ? <ChevronDownIcon className="w-6 h-6 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                        : <ChevronUpIcon className="w-6 h-6 text-gray-600 hover:text-gray-900" aria-hidden={true} />}
                                </button>
                            </div>

                            {showBackupAccessCodes && (
                                <div className="flex flex-col px-2 mt-2 py-2 gap-2">
                                    {/* Include your backup access code details here */}
                                    <div className="flex justify-between items-center">
                                        <div className="">
                                            <label
                                                htmlFor="backupAccessCode1"
                                                className="block text-sm text-gray-700"
                                            >
                                                Backup Access Code 1
                                            </label>
                                            <div className="mt-1 flex">
                                                <input
                                                    id="backupAccessCode1"
                                                    name="backupAccessCode1"
                                                    autoComplete="backupAccessCode1"
                                                    type={showBackupAccessCode1 ? "text" : "password"}
                                                    value={123456}
                                                    onChange={handleChange}
                                                    disabled={true}
                                                    // minLength="8"
                                                    // maxLength="20"
                                                    // required
                                                    className="block w-4/5 rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
                                                />

                                                <div className="flex items-center ml-3">
                                                    <div onClick={() => setShowBackupAccessCode1(!showBackupAccessCode1)}>
                                                        {showBackupAccessCode1 ? (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                className="w-5 h-5 text-gray-400"
                                                            >
                                                                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                className="w-5 h-5 text-gray-400"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
                                                                    clipRule="evenodd"
                                                                />
                                                                <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm"> Permanent</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="">
                                            <label
                                                htmlFor="backupAccessCode2"
                                                className="block text-sm text-gray-700"
                                            >
                                                Backup Access Code 2
                                            </label>
                                            <div className="mt-1 flex">
                                                <input
                                                    id="backupAccessCode2"
                                                    name="backupAccessCode2"
                                                    autoComplete="backupAccessCode2"
                                                    type={showBackupAccessCode2 ? "text" : "password"}
                                                    value={123456}
                                                    onChange={handleChange}
                                                    disabled={true}
                                                    // minLength="8"
                                                    // maxLength="20"
                                                    // required
                                                    className="block w-4/5 rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
                                                />

                                                <div className="flex items-center ml-3">
                                                    <div onClick={() => setShowBackupAccessCode2(!showBackupAccessCode2)}>
                                                        {showBackupAccessCode2 ? (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                className="w-5 h-5 text-gray-400"
                                                            >
                                                                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                className="w-5 h-5 text-gray-400"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
                                                                    clipRule="evenodd"
                                                                />
                                                                <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm"> Permanent</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="">
                                            <label
                                                htmlFor="backupAccessCode3"
                                                className="block text-sm text-gray-700"
                                            >
                                                Backup Access Code 3
                                            </label>
                                            <div className="mt-1 flex">
                                                <input
                                                    id="backupAccessCode3"
                                                    name="backupAccessCode3"
                                                    autoComplete="backupAccessCode3"
                                                    type={showBackupAccessCode3 ? "text" : "password"}
                                                    value={123456}
                                                    onChange={handleChange}
                                                    disabled={true}
                                                    // minLength="8"
                                                    // maxLength="20"
                                                    // required
                                                    className="block w-4/5 rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
                                                />

                                                <div className="flex items-center ml-3">
                                                    <div onClick={() => setShowBackupAccessCode3(!showBackupAccessCode3)}>
                                                        {showBackupAccessCode3 ? (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                className="w-5 h-5 text-gray-400"
                                                            >
                                                                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                className="w-5 h-5 text-gray-400"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
                                                                    clipRule="evenodd"
                                                                />
                                                                <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm"> Permanent</p>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>

                        {/* Manual Access Codes */}
                        <div className="w-full">
                            <div className="flex w-full py-1 justify-between">
                                <div className="flex items-center">
                                    <KeyIcon className="w-4 h-4 mr-1 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                    <h2 className="font-bold">Manual Access Codes</h2>
                                </div>
                                <button
                                    className=""
                                    onClick={() => setShowManualAccessCodes(!showManualAccessCodes)}
                                >
                                    {showManualAccessCodes ? <ChevronDownIcon className="w-6 h-6 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                        : <ChevronUpIcon className="w-6 h-6 text-gray-600 hover:text-gray-900" aria-hidden={true} />}
                                </button>
                            </div>

                            {showManualAccessCodes && (
                                <div className="flex flex-col px-2 mt-2 py-2 gap-2">
                                    {/* Include your manual access code details here */}
                                    <div>Manual Access Code 1</div>
                                    <div>Manual Access Code 2</div>
                                    <div>Manual Access Code 3</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default DeviceDetails;