import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const AccountSettings = ({ data, popupTitle, setPopupTitle }: any) => {
  console.log('data1', data, 'title', popupTitle);
  const router = useRouter();
  const [name, setName] = useState('');
  const [accountID, setAccountID] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    setPopupTitle('Create public API secret key');
  }, []);

  //current Index Change
  const handleAfterChange = (currentIndex: number) => {
    // console.log("currentIndex",currentIndex);
    if (currentIndex == 0) {
      setPopupTitle('Your new public API key');
    } else {
      setPopupTitle('Create public API secret key');
    }
  };

  //account API Handler - 2
  const accountAPIHandler = () => {
    router.push('/messages');
  };

  //cancel API Handler
  const cancelHandler = () => {
    setName('');
    setAccountID('');
    setApiKey('');
  };

  const firstItem = () => {
    return (
      <div className="flex flex-col justify-between w-full h-72">
        <form className="flex flex-col justify-between w-full h-[100%]">
          <div className="flex flex-col justify-center items-center border-gray-300 border-t px-4 h-[100%] bg-slate-50">
            {/* Name */}
            <div className="flex flex-col px-12 w-full ">
              <label
                htmlFor="name"
                className="block text-base font-medium text-gray-700"
              >
                Name *
              </label>
              <div className="relative mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // required
                  placeholder="Name"
                  className="block w-full appearance-none text-base rounded-md border border-gray-300 pl-2 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const secondItem = () => {
    return (
      <div className="flex flex-col justify-between w-full h-72">
        <form className="flex flex-col justify-between w-full h-[100%]">
          <div className="flex flex-col justify-center items-center border-gray-300 border-t gap-2 px-4 h-[100%] bg-slate-50">
            {/* <div className='flex flex-col px-8 w-full'>
                            <p className='text-sm'>
                                When you generate a new kay, you need to store it safely. it will only be visible once in the dashboard.
                            </p>
                        </div> */}
            {/* Account ID */}
            <div className="flex flex-col px-8 py-2 w-full">
              <label
                htmlFor="account"
                className="block text-base font-medium text-gray-700"
              >
                Account ID :
              </label>
              <div className="relative mt-2">
                <input
                  id="account"
                  name="account"
                  type="number"
                  autoComplete="account"
                  value={accountID}
                  onChange={(e) => setAccountID(e.target.value)}
                  required
                  placeholder="Account ID"
                  className="block w-2/5 appearance-none text-base rounded-md border border-gray-300 pr-3 pl-2 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                />
              </div>
            </div>
            {/* API key*/}
            <div className="flex flex-col px-8 py-2 w-full">
              <label
                htmlFor="apiKey"
                className="block text-base font-medium text-gray-700"
              >
                API key :
              </label>
              <div className="relative mt-2">
                <input
                  id="apiKey"
                  name="apiKey"
                  type="text"
                  autoComplete="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  required
                  placeholder="API Key"
                  className="block w-full appearance-none text-base rounded-md border border-gray-300 pr-3 pl-2 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4 border-gray-300 border-t">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => cancelHandler()}
                className="rounded-lg bg-red-900 px-3 py-2 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={accountAPIHandler}
                className="rounded-lg bg-blue-900 px-3 py-2 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
              >
                Connect
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const items = [
    <div key={1} className="flex justify-center items-center px-8 h-72">
      {firstItem()}
    </div>,
    <div key={2} className="flex justify-center items-center px-8 h-72">
      {secondItem()}
    </div>,
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 102 },
      items: 1, // Show 2 text items at a time
    },
    tablet: {
      breakpoint: { max: 102, min: 46 },
      items: 1, // Show 2 text items at a time
    },
    mobile: {
      breakpoint: { max: 46, min: 0 },
      items: 1, // Show 1 text item at a time
    },
  };

  return (
    <div className="flex w-full h-72">
      <div className="w-full h-72">
        <Carousel
          keyBoardControl={true}
          transitionDuration={500}
          customTransition="all .5"
          showDots={true}
          responsive={responsive}
          infinite={false}
          afterChange={handleAfterChange} // Add afterChange event handler
          // draggable={false}
          // removeArrowOnDeviceType={['desktop', 'tablet', 'mobile']}
        >
          {items}
        </Carousel>
      </div>
    </div>
  );
};
export default AccountSettings;
