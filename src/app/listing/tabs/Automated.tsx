/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { FaUser } from "react-icons/fa";

interface AutomatedMessage {
  id: number;
  title: string;
  subtitle: string;
}

const AUTOMATED_MESSAGE: AutomatedMessage[] = [
  {
    id: 1,
    title: "Confirmed Booking",
    subtitle: "Booking Confirmation",
  },
  {
    id: 2,
    title: "Pre Check-in",
    subtitle: "Verification is Approved",
  },
  {
    id: 3,
    title: "Check-in",
    subtitle: "Pre-checkin",
  },
  {
    id: 4,
    title: "Check-up",
    subtitle: "Check-up",
  },
  {
    id: 5,
    title: "Check-out",
    subtitle: "Check-out one day before check-out, 5PM",
  },
  {
    id: 6,
    title: "Post Stay",
    subtitle: "Dynamic Review (casual)",
  },
];

const Automated = ({ isToggle }: any) => {
  const [switchStates, setSwitchStates] = useState<boolean[]>(
    new Array(AUTOMATED_MESSAGE.length).fill(true)
  );
  const [on, setOn] = useState(false);
  const [popup, setPopup] = useState<boolean>(false);

  const handleToggleChange = (index: number) => {
    const newSwitchStates = [...switchStates];
    newSwitchStates[index] = !newSwitchStates[index];
    setSwitchStates(newSwitchStates);
  };

  const handleOn = () => {
    setOn(!on);
  };

  const handlePopupBox = () => {
    setPopup(!popup);
  };

  const handleClose = () => {
    setPopup(false);
  };

  const handleSwitchClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  if (popup) {
    return (
      <div className="flex flex-col justify-center bg-white ">
        <div className="flex flex-col items-center w-full bg-white max-md:max-w-full">
          <div className="flex items-center justify-between py-4 pr-20 pl-4 mt-5 w-full max-w-[960px] max-md:pr-5 max-md:max-w-full">
            <div className="text-2xl font-semibold tracking-tighter text-gray-900 max-md:max-w-full">
              Booking Confirmation
            </div>
            <div onClick={handleClose} className="cursor-pointer text-xl">
              &#x2715;
            </div>
          </div>

          <div className="flex gap-2 justify-between px-5 py-px w-full text-sm font-bold tracking-wide leading-5 text-center whitespace-nowrap border-b border-solid border-b-stone-300 max-w-[928px] text-stone-500 max-md:flex-wrap max-md:max-w-full"></div>
          <div className="flex gap-3 py-3  pr-40 mt-3 text-sm font-medium leading-5 text-stone-900 max-md:flex-wrap">
            {/* <div className="flex gap-2 px-2 py-1.5 bg-slate-50 rounded-2xl">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d06eed5b5adbf1ae7cc1c092fa7f72a1f8ff498e9f9504b95c8e77e498a7e75?"
                className="w-5 aspect-square"
                alt="icon"
              />
              <div className="self-stretch">All Listings</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a5f42fddc764bcb410ac9aa3a826ad8827ce3b2a037b28cf30fcbc32794b220?"
                className="w-5 aspect-square"
                alt="icon"
              />
            </div>
            <div className="flex gap-2 justify-center items-start px-2 py-1.5 bg-slate-50 rounded-2xl">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c00e84f28c665602a10e83dfd035805f238a9b06bed148350ad165d3f01ccd68?"
                className="w-5 aspect-square"
                alt="icon"
              />
              <div className="flex-auto self-stretch">
                Current Listing Group
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/62a47ce8c2e7c80546f563392973a08d39ee6f02ba69e8fcfef104eacf92c320?"
                className="w-5 aspect-square"
                alt="icon"
              />
            </div>
            <div className="flex gap-2 justify-center items-start px-2 py-1.5 bg-slate-50 rounded-2xl">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ebd90ab9dcf63eff8da065254cc9d7ff9b6bc6e8462b44f687e775832979328?"
                className="w-5 aspect-square"
                alt="icon"
              />
              <div className="flex-auto self-stretch">Specific Listings</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f1cdea6c1c573944242b33f4a932d44ae5ad037da5d9aa32c9c7845d58598a2?"
                className="w-5 aspect-square"
                alt="icon"
              />
            </div> */}
          </div>

          <div className="h-[280px] overflow-y-auto">
            <div className="flex flex-col justify-center mt-3 w-full bg-white max-w-[960px] max-md:max-w-full">
              <div className="justify-between p-4 bg-white max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col max-md:mt-8 max-md:max-w-full">
                      <div className="text-base font-bold text-stone-900 max-md:max-w-full">
                        Send SMS message
                      </div>
                      <div className="mt-1 text-sm leading-5 text-stone-500 max-md:max-w-full overflow-y-auto">
                        Hi [guest_first_name], thanks! You will be receiving
                        your check in instructions prior to your stay on
                        &lt;checkin_date&gt; by accessing the link below and
                        filling in the information for your boarding pass:
                        &lt;keycard_link&gt; For an additional fee, you can
                        select any of the add-ons available like early check-in,
                        late check-out, and pool heating in your boarding pass.
                        Note: Early check-in and late check-out is subject to
                        availability Note: if you opted for the pool heating,
                        please pay in advance to guarantee a heated pool as it
                        sometimes takes a day or two to reach the desired
                        temperature We hope you have a wonderful stay!&quot
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center mt-3 w-full bg-white max-w-[960px] max-md:max-w-full">
              <div className="justify-between p-4 bg-white max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col max-md:mt-8 max-md:max-w-full">
                      <div className="text-base font-bold text-stone-900 max-md:max-w-full">
                        Send email message
                      </div>
                      <div className="mt-1 text-sm leading-5 text-stone-500 max-md:max-w-full overflow-y-auto">
                        Hi [guest_first_name], thanks! You will be receiving
                        your check in instructions prior to your stay on
                        &lt;checkin_date&gt; by accessing the link below and
                        filling in the information for your boarding pass:
                        &lt;keycard_link&gt; For an additional fee, you can
                        select any of the add-ons available like early check-in,
                        late check-out, and pool heating in your boarding pass.
                        Note: Early check-in and late check-out is subject to
                        availability Note: if you opted for the pool heating,
                        please pay in advance to guarantee a heated pool as it
                        sometimes takes a day or two to reach the desired
                        temperature We hope you have a wonderful stay!&quot
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center mt-3 w-full bg-white max-w-[960px] max-md:max-w-full">
              <div className="justify-between p-4 bg-white max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col max-md:mt-8 max-md:max-w-full">
                      <div className="text-base font-bold text-stone-900 max-md:max-w-full">
                        Send Airbnb message
                      </div>
                      <div className="mt-1 text-sm leading-5 text-stone-500 max-md:max-w-full overflow-y-auto">
                        Hi [guest_first_name], thanks! You will be receiving
                        your check in instructions prior to your stay on
                        &lt;checkin_date&gt; by accessing the link below and
                        filling in the information for your boarding pass:
                        &lt;keycard_link&gt; For an additional fee, you can
                        select any of the add-ons available like early check-in,
                        late check-out, and pool heating in your boarding pass.
                        Note: Early check-in and late check-out is subject to
                        availability Note: if you opted for the pool heating,
                        please pay in advance to guarantee a heated pool as it
                        sometimes takes a day or two to reach the desired
                        temperature We hope you have a wonderful stay!&quot
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center mt-4 w-full">
            <div className="flex gap-2 justify-center items-center px-2 py-1.5 bg-slate-50 rounded-2xl">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/53edc1b2128a0e1fd56fdf70984c5bcaa6f2413e97885bd47049a385d392cd6c?"
                className="w-5 aspect-square"
                alt="icon"
              />
              <div className="flex-auto self-stretch">
                This experience is enabled
              </div>
            </div>
            <div
              className={`flex items-center px-1 rounded-3xl h-7 ${
                on ? "bg-indigo-500" : "bg-gray-300"
              }`}
            >
              <Switch
                checked={on}
                onChange={handleOn}
                className="relative inline-flex items-center justify-center w-10 h-4 cursor-pointer focus:outline-none"
              >
                <span
                  className={`absolute left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                    on
                      ? "translate-x-full bg-indigo-600"
                      : "translate-x-0 bg-gray-400"
                  }`}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col my-8 max-md:mt-8 max-md:max-w-full cursor-pointer"
      onClick={handlePopupBox}
    >
      <div className="flex flex-col justify-center bg-white">
        <div className="flex flex-col items-center pb-12 w-full bg-white max-md:max-w-full h-[200px]">
          {isToggle ? (
            AUTOMATED_MESSAGE.map(
              ({ id, title }: AutomatedMessage, index: number) => (
                <div
                  key={id}
                  className="flex flex-col justify-center py-2 mt-5 w-full bg-white max-w-[960px] max-md:max-w-full  hover:bg-slate-50"
                >
                  <div className="flex gap-5 items-center justify-between w-full max-md:flex-wrap max-md:max-w-full">
                    <div className="flex items-center gap-4 justify-between cursor-pointer">
                      <div className="flex justify-center items-center px-2 w-10 h-10 bg-slate-50 rounded-lg aspect-square">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/94c6447565ff176b10992a477015f24be5b0be26703af397658e207a808ed0e8?"
                          className="w-full aspect-square"
                          alt="icon"
                        />
                      </div>
                      <div className="grow my-auto text-base leading-6 whitespace-nowrap text-stone-900">
                        {title}
                      </div>
                    </div>
                    <div
                      className={`flex items-center px-1 rounded-3xl h-7 ${
                        switchStates[index] ? "bg-indigo-500" : "bg-slate-100"
                      }`}
                      onClick={(
                        e: React.MouseEvent<HTMLDivElement, MouseEvent>
                      ) => handleSwitchClick(e)}
                    >
                      <Switch
                        checked={switchStates[index]}
                        onChange={() => handleToggleChange(index)}
                        className="relative inline-flex items-center justify-center w-10 h-4 cursor-pointer focus:outline-none"
                      >
                        <span
                          className={`absolute left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                            switchStates[index]
                              ? "translate-x-full bg-indigo-600"
                              : "translate-x-0 bg-slate-50"
                          }`}
                        />
                      </Switch>
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <h1 className="flex justify-center text-red-500">No Expreiences</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Automated;
