'use client';

import CommonPopup from '@/components/commonPopup';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import AccountSettings from './accountSettings';

const ConnectPM = () => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [selectedData, setSelectedData] = useState();

  const accounts = [
    {
      id: 1,
      accountName: 'WhatsApp',
      description:
        'Heads up! Connecting your WhatsApp Business Account requires a Facebook Business Manager platform and a meeting with our CS team. Please reach out to your Onboarding Manager if you would like to schedule a WhatsApp session.',
    },
    {
      id: 2,
      accountName: 'airbnb',
      description: 'Connect your Airbnb Account',
    },
    {
      id: 3,
      accountName: 'Hostaway',
      description:
        'Your Hostaway account is connected and is recieving listings, bookings and messages',
    },
    {
      id: 4,
      accountName: 'Stripe',
      description:
        'Your Stripe account is connected and recieving notifications and updates.',
    },
    {
      id: 5,
      accountName: 'Schlage',
      description:
        'Your Schlage account is connected and recieving notifications and updates.',
    },
  ];

  const handleItemClick = (data: any) => {
    console.log('Accountdata:', data);
    // router.push('/messages');
    setSelectedData(data);
    setIsPopupOpen(true);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1000 },
      items: 1, // Show 2 text items at a time
      slidesToSlide: 1,
    },
  };

  return (
    <div className="h-[100%]">
      <div className="flex flex-col py-12 px-24 h-screen bg-gray-300">
        <div className="bg-white p-2 rounded-md w-full h-[95%]">
          <div className="px-10 py-2">
            <h2 className="text-xl font-bold text-blue-900">
              Connect Accounts
            </h2>
          </div>
          <div className="py-4 px-4 h-[90%] justify-center">
            <div className="py-4 px-6 w-full h-[100%] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 ">
                {accounts.map((data) => (
                  <div
                    key={data.id}
                    className="flex flex-col border gap-1 p-4 rounded justify-around"
                  >
                    {/* Row 1 */}
                    <div className="mb-2">
                      <p className="text-xl font-bold text-green-900">
                        {data.accountName}
                      </p>
                    </div>
                    {/* Row 2*/}
                    <div className="mb-2">
                      <p>{data.description}</p>
                    </div>
                    {/* Row 3*/}
                    <div className="flex justify-end px-4">
                      <h2
                        onClick={() => handleItemClick(data)}
                        className="text-sm text-blue-800"
                      >
                        Connect account
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <CommonPopup
          isOpen={isPopupOpen}
          onClose={handleClose}
          heightwidth={'w-3/6 h-96'}
          title={popupTitle}
          subtitle={undefined}
          disableCloseIcon={undefined}
        >
          <AccountSettings
            data={selectedData}
            popupTitle={popupTitle}
            setPopupTitle={setPopupTitle}
          />
        </CommonPopup>
      </div>
    </div>
  );
};
export default ConnectPM;
