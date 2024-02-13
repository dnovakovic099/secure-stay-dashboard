import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import handleApiCallFetch from "@/components/handleApiCallFetch";

const AddDevices = () => {
    const routre = useRouter();

    const devices = [
        { id: 1, deviceName: 'Salto', imageSrc: 'https://www.shutterstock.com/shutterstock/photos/2079026965/display_1500/stock-photo-close-up-of-woman-using-intercom-at-building-entrance-2079026965.jpg', description: 'Connet lock via your Salto account' },
        { id: 2, deviceName: 'Yale', imageSrc: 'https://www.shutterstock.com/shutterstock/photos/2388454481/display_1500/stock-photo-door-lock-embodying-security-and-access-control-the-polished-metal-and-intricate-design-convey-a-2388454481.jpg', description: 'Connet lock via your Yale account' },
        { id: 3, deviceName: 'Igloohome', imageSrc: 'https://www.shutterstock.com/shutterstock/photos/2224806929/display_1500/stock-photo-safety-concept-biege-safe-door-with-digital-lock-closeup-shot-with-shallow-depth-of-field-2224806929.jpg', description: 'Connet lock via your Igloohome account' },
        { id: 4, deviceName: 'Nuki', imageSrc: 'https://www.shutterstock.com/shutterstock/photos/386004586/display_1500/stock-photo-safe-close-up-protection-security-lock-banking-and-finance-386004586.jpg', description: 'Connet lock via your Nuki account' },
        { id: 5, deviceName: 'Schlage', imageSrc: 'https://www.shutterstock.com/shutterstock/photos/516050149/display_1500/stock-photo-safe-lock-code-password-pad-number-protection-safety-box-bank-516050149.jpg', description: 'Connet lock via your Schlage account' },
        { id: 6, deviceName: 'August', imageSrc: 'https://www.shutterstock.com/shutterstock/photos/1320615239/display_1500/stock-photo-digital-knob-door-for-access-interior-electronic-digital-door-handle-on-wood-door-hotel-or-1320615239.jpg', description: 'Connet lock via your August account' },
        { id: 7, deviceName: 'Sample 1', imageSrc: 'https://www.shutterstock.com/shutterstock/photos/2079026965/display_1500/stock-photo-close-up-of-woman-using-intercom-at-building-entrance-2079026965.jpg', description: 'Connet lock via your Sample 1 account' },
        { id: 8, deviceName: 'Sample 2', imageSrc: 'https://www.shutterstock.com/shutterstock/photos/2224806929/display_1500/stock-photo-safety-concept-biege-safe-door-with-digital-lock-closeup-shot-with-shallow-depth-of-field-2224806929.jpg', description: 'Connet lock via your Sample 2 account' },
        { id: 9, deviceName: 'Sample 3', imageSrc: 'https://www.shutterstock.com/shutterstock/photos/1320615239/display_1500/stock-photo-digital-knob-door-for-access-interior-electronic-digital-door-handle-on-wood-door-hotel-or-1320615239.jpg', description: 'Connet lock via your Sample 3 account' },
        { id: 10, deviceName: 'Sample 4', imageSrc: 'https://www.shutterstock.com/shutterstock/photos/516050149/display_1500/stock-photo-safe-lock-code-password-pad-number-protection-safety-box-bank-516050149.jpg', description: 'Connet lock via your Sample 4 account' },
        // Add more devices as needed
    ];

    const handleItemClick = async (device: { id?: number; deviceName: any; imageSrc?: string; description?: string; }) => {
        // Handle the click event for the specific grid item (Schlage in this example)
        if (device && device.deviceName && device.deviceName == "Schlage") {
            const url = "http://localhost:5173/device/connectWebview";
            const params = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
            try {
                const newData: any = await handleApiCallFetch(url, params);
                console.log("response", newData);
                if (newData && newData.url) {
                    routre.push(newData?.url);
                }
            } catch (error) {
                console.log('Error in api call schlage :', error);
            }
        }
    };


    return (
        <div className="flex flex-col py-4 px-24 h-[100%] rounded-md bg-gray-300">
            <div className="p-1">
                <button
                    type='button'
                    onClick={() => routre.back()}
                    className="text-blue-900 text-sm font-medium"
                >
                    Back
                </button>
            </div>
            <div className="bg-white p-2 rounded-md w-full h-[99%]">
                <div className="px-2">
                    <h2 className="text-xl font-bold text-blue-900">Add Devices</h2>
                </div>
                <div className="py-10 px-24 h-[96%] justify-center">
                    <p className="text-xs font-medium">Access Managment</p>
                    <div className="py-4 w-4/5 h-[100%] overflow-y-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {devices.map((device) => (
                                <div key={device.id} className="border p-4 rounded transition duration-300 ease-in-out hover:bg-gray-200" onClick={() => handleItemClick(device)}>
                                    {/* Row 1: Image */}
                                    <div className="mb-2">
                                        <img src={device.imageSrc} alt={device.deviceName} className="w-full h-28 object-cover" />
                                    </div>
                                    {/* Row 2: Device Name */}
                                    <div className="mb-2">
                                        <h2 className="text-lg font-bold">{device.deviceName}</h2>
                                    </div>
                                    {/* Row 3: Description */}
                                    <div>
                                        <p>{device.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddDevices;