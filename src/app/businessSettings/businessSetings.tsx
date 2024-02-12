import { useState } from "react";
import Devices from "./devices";

const BusinessSettings = () => {

    const [selectedMenu, setSelectedMenu] = useState('Devices');

    const handleMenuClick = (menu: string) => {
        setSelectedMenu(menu);
    };

    // Function to dynamically render the selected component
    const renderSelectedComponent = () => {
        switch (selectedMenu) {
            case 'Branding':
                return null;
            case 'Connected Accounts':
                return null;
            case 'Messaging':
                return null;
            case 'users':
                return null;
            case 'Billing':
                return null;
            case 'Devices':
                return <Devices />;
            case 'Reports':
                return null;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col justify-center p-4 h-[100%] rounded-md">
            <div className="flex flex-row gap-2 h-[100%] w-full">
                {/* Column 1 - Setting nav */}
                <div className="w-[25%]">
                    <h2 className="text-xl font-bold text-blue-900">Business Settings</h2>
                    <ul className="flex flex-col gap-4 py-8">
                        <li>Branding </li>
                        <li>Connected Accounts </li>
                        <li>Messaging </li>
                        <li>users </li>
                        <li>Billing </li>
                        <li onClick={() => handleMenuClick('Devices')}>Devices</li>
                        <li>Reports </li>
                    </ul>
                </div>

                {/* Column 2 - page components */}
                <div className="w-full border-l border-gray-300">
                    {renderSelectedComponent()}
                </div>
            </div>
        </div>
    )
}
export default BusinessSettings;