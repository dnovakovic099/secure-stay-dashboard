import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
//Headless UI
import { LockClosedIcon, LockOpenIcon, Battery100Icon, Battery50Icon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import DeviceDetails from "./deviceDetails";
import CommonPopup from "@/components/commonPopup";
import handleApiCallFetch from "@/components/handleApiCallFetch";

const Devices = () => {

    const router = useRouter();
    // Dummy data for illustration
    const deviceData = [
        { id: 1, lockName: 'Lock Device 1', subName: 'Sub A', online: true, batteryLevel: "25", lockedValue: true, image: "https://connect.getseam.com/assets/images/devices/schlage_sense-smart-deadbolt-with-camelot-trim_front.png" },
        { id: 2, lockName: 'Lock Device 2', subName: 'Sub B', online: false, batteryLevel: "80", lockedValue: false, image: "https://connect.getseam.com/assets/images/devices/schlage_sense-smart-deadbolt-with-camelot-trim_front.png" },
        { id: 3, lockName: 'Lock Device 3', subName: 'Sub C', online: true, batteryLevel: "5", lockedValue: true, image: "https://connect.getseam.com/assets/images/devices/schlage_sense-smart-deadbolt-with-camelot-trim_front.png" },
        { id: 4, lockName: 'Lock Device 4', subName: 'Sub D', online: false, batteryLevel: "100", lockedValue: false, image: "https://connect.getseam.com/assets/images/devices/schlage_sense-smart-deadbolt-with-camelot-trim_front.png" },
        { id: 5, lockName: 'Lock Device 5', subName: 'Sub E', online: true, batteryLevel: "15", lockedValue: true, image: "https://connect.getseam.com/assets/images/devices/schlage_sense-smart-deadbolt-with-camelot-trim_front.png" },
    ];

    interface Device {
        id: number;
        lockName: string;
        subName: string;
        online: boolean;
        batteryLevel: string;
        lockedValue: boolean;
        image: string;
    }

    const [deviceList, setDeviceList] = useState<Device[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [deviceID, setDeviceID] = useState();

    useEffect(() => {
        getAllDevicesList();
    }, [])

    //get All connected Devices List
    const getAllDevicesList = async () => {
        const url = "http://localhost:5173/device/deviceList";
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        try {
            const response: any = await handleApiCallFetch(url, params);
            console.log("response", response);
            const formattData = await formattResponse(response);
            setDeviceList(formattData);
            setDeviceID(formattData[0]?.id)
        } catch (error) {
            console.log('Error in api call schlage :', error);
        }
    }

    const formattResponse = (data: any) => {
        const formattedData = data.map((device: any, index: any) => ({
            id: device && device.device_id ? device.device_id : index + 1,
            lockName: device && device.properties.name ? device.properties.name : '',
            subName: device && device.properties.name ? device.properties.name : '',
            online: device && device.properties && device.properties.online ? device.properties.online : false,
            batteryLevel: device && device.properties && device.properties.battery_level ? (device.properties.battery_level * 100).toFixed(0).toString() : "0",
            lockedValue: device && device.properties && device.properties.locked ? device.properties.locked : false,
            image: device && device.properties && device.properties.image_url ? device.properties.image_url : "",
        }));
        console.log("formattedData", formattedData)
        return formattedData
    }

    //add Device Handler
    const addDeviceHandler = () => {
        console.log('Button clicked!');
        router.push("/addDevices");
    };

    //Device view Handler
    const deviceViewHandler = (id: any) => {
        console.log('deviceViewHandler clicked!', id);
        setDeviceID(id)
    };

    const handleClose = () => {
        setIsPopupOpen(false)
    }

    return (
        <div className="h-[100%]">
            <div className="flex flex-row gap-2 h-[100%] w-full">
                {/* column 1 */}
                <div className="flex-1 start-0 border-r border-gray-300 overflow-y-auto">
                    <div className="flex justify-between px-4">
                        <h2 className="text-xl font-bold text-blue-900">Smart Home Devices</h2>
                        <div className="flex gap-2">
                            <button
                                type='button'
                                onClick={addDeviceHandler}
                                className="rounded-full bg-blue-900 px-2 py-1 text-xs  text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                            >
                                Add Devices
                            </button>
                            <button
                                type='button'
                                disabled={true}
                                className="rounded-full bg-blue-900 px-2 py-1 text-xs  text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                            >
                                Pair 5 Devices
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col px-4 py-6">
                        {deviceList.map((device) => (
                            <div key={device.id} onClick={() => deviceViewHandler(device.id)} className="flex items-center border-b py-2">
                                <div className="flex-shrink-0">
                                    <Image
                                        className="h-8 w-auto"
                                        src={device.image}
                                        alt="lock"
                                        width={100}
                                        height={200}
                                    />
                                </div>
                                <div className="ml-4 w-full">
                                    <div className="text-base font-bold justify-start items-center">{device.lockName}</div>
                                    <div className="grid grid-cols-5 gap-1 w-full justify-start items-center">

                                        <div className="col-span-2 text-sm ">{device.subName}</div>

                                        <div className="col-span-1 text-sm">{device.online ?
                                            <span className="flex justify-start items-center">
                                                <CheckCircleIcon className="w-4 h-4 mr-1  fill-green-800 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                                Online
                                            </span>
                                            : <span className="flex justify-start items-center">
                                                <XCircleIcon className="w-4 h-4 mr-1 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                                Offline
                                            </span>}
                                        </div>

                                        <div className="col-span-1 text-sm">{parseInt(device.batteryLevel) > 25 ?
                                            <span className="flex justify-start items-center">
                                                <Battery100Icon className="w-4 h-4 mr-1 fill-green-800 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                                <div className="flex flex-col">
                                                    <span>Good</span>
                                                    {`(${device.batteryLevel})%`}
                                                </div>
                                            </span>
                                            : <span className="flex justify-start items-center">
                                                <Battery50Icon className="w-4 h-4 mr-1 fill-red-800 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                                <div className="flex flex-col">
                                                    <span>Low</span>
                                                    {`(${device.batteryLevel})%`}
                                                </div>
                                            </span>}
                                        </div>
                                        <div className="col-span-1 text-sm">{device.lockedValue ?
                                            <span className="flex justify-end items-center">
                                                <LockClosedIcon className="w-4 h-4 mr-1 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                                Locked
                                            </span>
                                            : <span className="flex justify-end items-center">
                                                <LockOpenIcon className="w-4 h-4 mr-1 text-gray-600 hover:text-gray-900" aria-hidden={true} />
                                                Unlocked
                                            </span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* column 2 - Device Details */}
                <div className="flex-1 overflow-y-auto">
                    {<DeviceDetails deviceId={deviceID} />}
                </div>
            </div>
            <CommonPopup
                isOpen={isPopupOpen}
                onClose={handleClose}
                heightwidth={"w-[30%] h-[80%]"}
                title={'title'}
                subtitle={undefined}
                disableCloseIcon={undefined} >
            </CommonPopup>
        </div>
    )
}
export default Devices;