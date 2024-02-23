'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const BusinessSettings = ({ children }: any) => {
  const [selectedMenu, setSelectedMenu] = useState('');
  const router = useRouter();

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    returnSelectedComponent(menu);
  };

  // Function to dynamically render the selected component
  const returnSelectedComponent = (menu: String) => {
    switch (menu) {
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
      case 'devices':
        return router.push('/businessSettings/devices');
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
          <ul className="flex flex-col gap-1 py-8 cursor-pointer">
            <li className="hover:bg-slate-200 p-3 rounded-md">Branding </li>
            <li className="hover:bg-slate-200 p-3 rounded-md">
              Connected Accounts{' '}
            </li>
            <li className="hover:bg-slate-200 p-3 rounded-md">Messaging </li>
            <li className="hover:bg-slate-200 p-3 rounded-md">Users </li>
            <li className="hover:bg-slate-200 p-3 rounded-md">Billing </li>
            <li
              className={`${
                selectedMenu == 'devices' ? 'bg-slate-200' : ''
              } hover:bg-slate-200 p-3 rounded-md`}
              onClick={() => handleMenuClick('devices')}
            >
              Devices
            </li>
            <li className="hover:bg-slate-200 p-3 rounded-md">Reports </li>
          </ul>
        </div>

        {/* Column 2 - page components */}
        <div className="w-full border-l border-gray-300">{children}</div>
      </div>
    </div>
  );
};

export default BusinessSettings;
