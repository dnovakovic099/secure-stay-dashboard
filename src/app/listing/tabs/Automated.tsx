import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { FaUser } from 'react-icons/fa';

interface AutomatedMessage {
  id: number;
  title: string;
  subtitle: string;
}

const AUTOMATED_MESSAGE: AutomatedMessage[] = [
  {
    id: 1,
    title: 'Confirmed Booking',
    subtitle: 'Booking Confirmation',
  },
  {
    id: 2,
    title: 'Pre Check-in',
    subtitle: 'Verification is Approved',
  },
  {
    id: 3,
    title: 'Check-in',
    subtitle: 'Pre-checkin',
  },
  {
    id: 4,
    title: 'Check-up',
    subtitle: 'Check-up',
  },
  {
    id: 5,
    title: 'Check-out',
    subtitle: 'Check-out one day before check-out, 5PM',
  },
  {
    id: 6,
    title: 'Post Stay',
    subtitle: 'Dynamic Review (casual)',
  },
];

const Automated = ({ isToggle }: any) => {
  const [switchStates, setSwitchStates] = useState<boolean[]>(
    new Array(AUTOMATED_MESSAGE.length).fill(true),
  );

  const [popup, setPopup] = useState<boolean>(false);

  const handleToggleChange = (index: number) => {
    const newSwitchStates = [...switchStates];
    newSwitchStates[index] = !newSwitchStates[index];
    setSwitchStates(newSwitchStates);
  };

  const handlePopupBox = () => {
    setPopup(!popup);
  };

  const handleClose = () => {
    setPopup(false);
  };

  if (popup) {
    return (
      <div className="flex flex-col justify-center">
        <div className="w-full flex justify-between items-center bg-gray-100 px-4 py-2 my-1 rounded-t-md">
          <h1 className="text-dark text-xl font-semibold">
            Automated experience
          </h1>
          <button
            onClick={handleClose}
            className="px-4 py-2  text-lg text-black"
          >
            &#x2715;
          </button>
        </div>
        <div className="bg-slate-100 rounded-b-md p-4">
          <div className="mb-4">
            <h1 className="text-dark font-bold text-lg">WHEN</h1>
            <p className="text-gray-500">
              Define what starts this automated experience.
            </p>
          </div>
          <div className="mb-4">
            <div className="flex p-2 bg-white rounded-md items-center">
              <FaUser className="text-gray-500" />
              <p className="ml-2">When guest booking is confirmed</p>
            </div>
          </div>
          <div className="mb-4">
            <h1 className="text-dark font-bold text-lg">ONLY IF</h1>
            <p className="text-gray-500">
              Define what conditions must be met to start this experience.
            </p>
          </div>
          <div className="mb-4">
            <h1 className="text-dark font-bold text-lg">THEN</h1>
            <p className="text-gray-500">Define what this experience does.</p>
          </div>
          <div className="overflow-y-auto max-h-[215px]">
            <p className="p-2 bg-white rounded-md m-1">
              <b>Send SMS message</b> &quot;Hi &lt;guest_first_name&gt;! Thank
              you for booking with us! You will be receiving your check in
              instructions prior to your stay on &lt;checkin_date&gt; by
              accessing the link below and filling in the information for your
              boarding pass: &lt;keycard_link&gt; For an additional fee, you can
              select any of the add-ons available like early check-in, late
              check-out, and pool heating in your boarding pass. Note: Early
              check-in and late check-out is subject to availability Note: if
              you opted for the pool heating, please pay in advance to guarantee
              a heated pool as it sometimes takes a day or two to reach the
              desired temperature We hope you have a wonderful stay!&quot;
            </p>
            <p className="p-2 bg-white rounded-md m-1">
              <b>Send SMS message</b> &quot;Hi &lt;guest_first_name&gt;! Thank
              you for booking with us! You will be receiving your check in
              instructions prior to your stay on &lt;checkin_date&gt; by
              accessing the link below and filling in the information for your
              boarding pass: &lt;keycard_link&gt; For an additional fee, you can
              select any of the add-ons available like early check-in, late
              check-out, and pool heating in your boarding pass. Note: Early
              check-in and late check-out is subject to availability Note: if
              you opted for the pool heating, please pay in advance to guarantee
              a heated pool as it sometimes takes a day or two to reach the
              desired temperature We hope you have a wonderful stay!&quot;
            </p>
            <p className="p-2 bg-white rounded-md m-1">
              <b>Send SMS message</b> &quot;Hi &lt;guest_first_name&gt;! Thank
              you for booking with us! You will be receiving your check in
              instructions prior to your stay on &lt;checkin_date&gt; by
              accessing the link below and filling in the information for your
              boarding pass: &lt;keycard_link&gt; For an additional fee, you can
              select any of the add-ons available like early check-in, late
              check-out, and pool heating in your boarding pass. Note: Early
              check-in and late check-out is subject to availability Note: if
              you opted for the pool heating, please pay in advance to guarantee
              a heated pool as it sometimes takes a day or two to reach the
              desired temperature We hope you have a wonderful stay!&quot;
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col my-3">
      {isToggle ? (
        AUTOMATED_MESSAGE.map(
          ({ id, title, subtitle }: AutomatedMessage, index: number) => (
            <div key={id} onClick={handlePopupBox}>
              <h1 className="text-lg text-dark font-semibold mx-1 my-1">
                {title}
              </h1>
              <div className="flex justify-between p-2 bg-slate-200 rounded-md">
                <div className="flex items-center gap-4">
                  <p className="text-dark text-md font-semibold">{subtitle}</p>
                  <p className="bg-gray-300 rounded-full text-sm px-2 py-1">
                    Connect to Florida
                  </p>
                </div>
                <div
                  className={`flex items-center p-1 rounded-full ${
                    switchStates[index] ? 'bg-indigo-500' : 'bg-gray-300'
                  }`}
                >
                  <Switch
                    checked={switchStates[index]}
                    onChange={() => handleToggleChange(index)}
                    className="relative inline-flex items-center justify-center w-8 h-4 cursor-pointer focus:outline-none"
                  >
                    <span
                      className={`absolute left-0 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                        switchStates[index]
                          ? 'translate-x-full'
                          : 'translate-x-0 bg-white'
                      }`}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          ),
        )
      ) : (
        <h1 className="flex justify-center bg-slate-200">No Expreiences</h1>
      )}
    </div>
  );
};

export default Automated;
