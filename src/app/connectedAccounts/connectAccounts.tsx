'use client';
import { envConfig } from '@/utility/environment';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ChevronRightIcon } from '@heroicons/react/20/solid';


interface IsOpenProps {
    setIsOpen: (value: boolean) => void;
}

interface ErrorResponse {
    message: string;
}

const accountData = [
    {
        id: 1,
        account: "pm",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt placeat soluta laudantium nemo, odit pariatur commodi iure quam eligendi quidem?",
        image: '/assets/pmlogo.jpg'
    },
    {
        id: 2,
        account: "sifely",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt placeat soluta laudantium nemo, odit pariatur commodi iure quam eligendi quidem?",
        image: '/assets/Great Logo.webp'
    },
    {
        id: 3,
        account: "seam",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt placeat soluta laudantium nemo, odit pariatur commodi iure quam eligendi quidem?",
        image: '/assets/seamlogo.png'
    },
    {
        id: 4,
        account: "strip",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt placeat soluta laudantium nemo, odit pariatur commodi iure quam eligendi quidem?",
        image: '/assets/striplogo.png'
    },
];

const ConnectAccounts = () => {

    const [accountCreation, setAccountCreation] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };


    const handleAccountInfo = (action: string) => {
        setIsOpen(true);
        switch (action) {
            case 'pm':
                setAccountCreation('pm');
                break;
            case 'strip':
                setAccountCreation('strip');
                break;
            case 'seam':
                setAccountCreation('seam');
                break;
            case 'sifely':
                setAccountCreation('sifely');
                break;
            default:
                break;
        }
    };


    return (
        <div className='px-4 '>

            {/* <div className=' grid grid-cols-3 gap-4 my-5'>

                {accountData?.map((data) => {
                    return (
                        <div key={data.account} className='border  shadow-md rounded-lg bg-white'>
                            
                            <div className='flex justify-center px-4 py-4 w-40 mx-auto  min-h-20'>
                                <Image
                                    src={data.image}
                                    width={1000} height={1000}
                                    alt='image'
                                    className='h-12 w-full'
                                />

                            </div>
                            <p className=' text-justify px-4 py-4'>{data.desc}</p>
                            <div className=' flex justify-center bottom-0 py-4 bg-gray-200 '>

                                <button onClick={() => {
                                    handleAccountInfo(data.account);
                                }
                                } className=' text-[#7000FF] text-opacity-70 font-semibold'>
                                    Connect Account
                                </button>
                                <ChevronRightIcon className='w-7 opacity-50' />
                            </div>
                        </div>
                    );
                })
                }
            </div> */}
            <div className='flex px-4  my-5 space-x-3 w-1/2'>
                <div className=' grid grid-cols-1 gap-4 '>
                    {accountData?.map((data) => (
                        <div key={data.account} className='border rounded-lg overflow-hidden shadow-lg bg-white'>
                            <div className='flex justify-start'>

                            </div>
                            <div className='px-4 py-2'>
                                <img src={data.image} className='h-12' alt='image' />
                                {/* <p className='text-lg  mb-2 uppercase text-indigo-600 font-bold tracking-wider '>{data.account}</p> */}
                                <p className='text-gray-400 text-sm '>{data.desc}</p>
                                <div className='flex justify-end items-center  p-2 '>
                                    <button onClick={() => handleAccountInfo(data.account)} className=' py-1 text-indigo-900 font-medium items-center'>
                                        Connect Account
                                    </button>
                                    <ChevronRightIcon className='w-5 h-5 text-gray-500' />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>


            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
                    <div className="bg-white p-6 rounded-lg z-50 relative">
                        <button className="absolute top-0 right-0 m-4" onClick={closeModal}>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {accountCreation === 'pm' && <ConnectPMAccountForm setIsOpen={setIsOpen} />}
                        {accountCreation === 'seam' && <SaveSeamAccountInfoForm setIsOpen={setIsOpen} />}
                        {accountCreation === 'sifely' && <SaveSifelyAccountInfoForm setIsOpen={setIsOpen} />}
                        {accountCreation === 'strip' && <SaveStripAccountInfoForm setIsOpen={setIsOpen} />}
                    </div>
                </div>
            )}
        </div>

    );
};

export default ConnectAccounts;




const ConnectPMAccountForm = ({ setIsOpen }: IsOpenProps) => {

    const [formValues, setFormValues] = useState({
        account: '',
        clientId: '',
        clientSecret: ''
    });

    const handleChange = (e: any) => {
        setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!formValues.account || !formValues.clientId || !formValues.clientSecret) {
            return toast.error("Please provide all values!!!");
        }

        await axios.post(`${envConfig.backendUrl}/account/savepmaccountinfo`, formValues).then((response: any) => {
            toast.success(response?.data?.message);
            setIsOpen(false);
            handleCancel();

        }).catch((error: AxiosError<ErrorResponse>) => {

            if (error.response?.status === 409) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error('Something went wrong!!!');
            }
        });


    };

    const handleCancel = () => {
        setFormValues({
            account: '',
            clientId: '',
            clientSecret: ''
        });
    };
    return (
        
        <div className='bg-white rounded-md px-4 pb-2 '>
            <div className='pb-4 text-2xl font-bold text-purple-700'>
                PM Account Info
            </div>
            <form action="" className=' text-start grid min-w-[20rem]  ' >
                <div className='flex flex-col space-y-4'>

                    <div className='flex flex-col  w-full '>
                        <label
                            htmlFor="name"
                            className="block text-base font-medium text-gray-700"
                        >
                            Account
                        </label>
                        <div className="relative mt-2">
                            <input
                                id="account"
                                name="account"
                                type="text"
                                autoComplete="account"
                                value={formValues.account}
                                onChange={handleChange}
                                required
                                placeholder="Enter Account"
                                className="block w-full appearance-none text-base rounded-md border border-gray-300 pl-2 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className='flex flex-col  w-full '>
                        <label
                            htmlFor="name"
                            className="block text-base font-medium text-gray-700"
                        >
                            Client Id
                        </label>
                        <div className="relative mt-2">
                            <input
                                id="clientId"
                                name="clientId"
                                type="text"
                                autoComplete="clientId"
                                value={formValues.clientId}
                                onChange={handleChange}
                                required
                                placeholder="Enter client id"
                                className="block w-full appearance-none text-base rounded-md border border-gray-300 pl-2 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className='flex flex-col  w-full '>
                        <label
                            htmlFor="name"
                            className="block text-base font-medium text-gray-700"
                        >
                            Client Secret
                        </label>
                        <div className="relative mt-2">
                            <input
                                id="clientSecret"
                                name="clientSecret"
                                type="text"
                                autoComplete="clientSecret"
                                value={formValues.clientSecret}
                                onChange={handleChange}
                                required
                                placeholder="Provide Client Secret"
                                className="block w-full appearance-none text-base rounded-md border border-gray-300 pl-2 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className='flex justify-start space-x-5 '>
                        <button
                            onClick={handleSubmit}
                            className=' px-6 py-2 rounded-lg bg-gradient-to-br from-[#7000FF] to-[#9E49F2]  font-semibold text-white '>Save</button>
                        <button
                            onClick={handleCancel}
                            className='border-2 px-6 rounded-lg py-1 bg-gradient-to-br from-red-500 to-indigo-700 font-semibold text-white'>Cancel</button>
                    </div>
                </div>

            </form>
        </div>


    );
};


const SaveSeamAccountInfoForm = ({ setIsOpen }: IsOpenProps) => {
    const [apiKey, setApiKey] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!apiKey) return toast.error('Please provide api key!!!');

        await axios.post(`${envConfig.backendUrl}/account/saveseamaccountinfo`, { apiKey }).then((response: any) => {
            toast.success(response?.data?.message);
            setIsOpen(false);
            handleCancel();

        }).catch((error: AxiosError<ErrorResponse>) => {

            if (error.response?.status === 409) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error('Something went wrong!!!');
            }
        });
    };

    const handleCancel = () => {
        setApiKey('');
    };

    return (
        <div className='bg-white rounded-md px-4 pb-2'>
            <div className='pb-4 text-2xl font-bold text-purple-700'>

                Seam Account Info
            </div>
            <form className='text-start grid min-w-[20rem] space-y-4 ' >
                <div className='flex flex-col  w-full '>
                    <label
                        htmlFor="name"
                        className="block text-base font-medium text-gray-700"
                    >
                        API Key
                    </label>
                    <div className="relative mt-2">
                        <input
                            name="apiKey"
                            type="text"
                            autoComplete="apiKey"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            required
                            placeholder="Enter api key"
                            className="block w-full appearance-none text-base rounded-md border border-gray-300 pl-2 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                        />
                    </div>
                </div>
                <div className='flex justify-start space-x-5'>
                    <button
                        onClick={handleSubmit}
                        className='border-2 px-6 py-2 rounded-lg bg-gradient-to-br from-[#7000FF] to-[#9E49F2]  font-semibold text-white '>Save</button>
                    <button
                        onClick={handleCancel}
                        className='border-2 px-6 rounded-lg py-1 bg-gradient-to-br from-red-500 to-indigo-700 font-semibold text-white'>Cancel</button>
                </div>
            </form>
        </div>
    );
};

const SaveSifelyAccountInfoForm = ({ setIsOpen }: IsOpenProps) => {
    const [clientId, setClientId] = useState('');

    const [accountSecret, setAccountSecrect] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!clientId || !accountSecret) return toast.error('Please provide all values!!!');
        const response: any = await axios.post(`${envConfig.backendUrl}/account/savesifelyaccountinfo`, { clientId, clientSecret: accountSecret }).then((response: any) => {
            toast.success(response?.data?.message);
            setIsOpen(false);
            handleCancel();

        }).catch((error: AxiosError<ErrorResponse>) => {

            if (error.response?.status === 409) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error('Something went wrong!!!');
            }
        });

    };

    const handleCancel = () => {
        setClientId('');
        setAccountSecrect('');
    };
    return (
        <div className='bg-white rounded-md px-4 pb-2'>
            <div className='pb-4 text-2xl font-bold text-purple-700'>

                Sifely Account Info
            </div>
            <form className='text-start grid min-w-[20rem] space-y-4'>

                <div className='flex flex-col w-full  '>
                    <label
                        htmlFor="name"
                        className="block text-base font-medium text-gray-700"
                    >
                        Client ID
                    </label>
                    <div className="relative mt-2">
                        <input
                            id="apiKey"
                            name="apiKey"
                            type="text"
                            autoComplete="apiKey"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            required
                            placeholder="Provide client Id"
                            className="block w-full appearance-none text-base rounded-md border border-gray-300 pl-2 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                        />
                    </div>
                </div>
                <div className='flex flex-col  w-full '>
                    <label
                        htmlFor="name"
                        className="block text-base font-medium text-gray-700"
                    >
                        Client Secret
                    </label>
                    <div className="relative mt-2">
                        <input
                            id="accountSecret"
                            name="accountSecret"
                            type="text"
                            autoComplete="accountSecret"
                            value={accountSecret}
                            onChange={(e) => setAccountSecrect(e.target.value)}
                            required
                            placeholder="Provide account secret"
                            className="block w-full appearance-none text-base rounded-md border border-gray-300 pl-2 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                        />
                    </div>
                </div>
                <div className='flex justify-start space-x-5 my-10'>
                    <button
                        onClick={handleSubmit}
                        className='border-2 px-6 py-2 rounded-lg bg-gradient-to-br from-[#7000FF] to-[#9E49F2]  font-semibold text-white '>Save</button>
                    <button
                        onClick={handleCancel}
                        className='border-2 px-6 rounded-lg py-1 bg-gradient-to-br from-red-500 to-indigo-700 font-semibold text-white'>Cancel</button>
                </div>
            </form>
        </div>
    );
};
const SaveStripAccountInfoForm = ({ setIsOpen }: IsOpenProps) => {
    const [apiKey, setApiKey] = useState('');

    const handleSubmit = async (e: any) => {

        e.preventDefault();
        if (!apiKey) return toast.error("Please provide value!!!");

        await axios.post(`${envConfig.backendUrl}/account/savestripeaccountinfo`, { apiKey }).then((response: any) => {
            toast.success(response?.data?.message);
            setIsOpen(false);
            handleCancel();

        }).catch((error: AxiosError<ErrorResponse>) => {

            if (error.response?.status === 409) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error('Something went wrong!!!');
            }
        });
    };

    const handleCancel = () => {
        setApiKey('');
    };

    return (
        <div className='bg-white rounded-md px-4 pb-2'>
            <div className='pb-4 text-2xl font-bold text-purple-700'>

                Save Strip Account Info
            </div>
            <form className='text-start grid min-w-[20rem] space-y-6'>
                <div className='flex flex-col  w-full '>
                    <label
                        htmlFor="name"
                        className="block text-base font-medium text-gray-700"
                    >
                        Client ID
                    </label>
                    <div className="relative mt-2">
                        <input
                            name="apiKey"
                            type="text"
                            autoComplete="apiKey"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            required
                            placeholder="Enter client ID"
                            className="block w-full appearance-none text-base rounded-md border border-gray-300 pl-2 py-2 placeholder-gray-400 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-blue-900 sm:text-sm"
                        />
                    </div>
                </div>

                <div className='flex justify-start space-x-5 '>
                    <button
                        onClick={handleSubmit}
                        className='border-2 px-6 py-2 rounded-lg bg-gradient-to-br from-[#7000FF] to-[#9E49F2]  font-semibold text-white '>Save</button>
                    <button
                        onClick={handleCancel}
                        className='border-2 px-6 rounded-lg py-1 bg-gradient-to-br from-red-500 to-indigo-700 font-semibold text-white'>Cancel</button>
                </div>
            </form>
        </div>
    );
};



const data = [
    {
        pmAccount: {
            account: '',
            clientId: '',
            clientSecret: '',
        }
    },
    {
        seamAccount: {
            apiKey: ''
        }
    },
    {
        sifelyAccount: {
            apiKey: ""
        }
    },
    {
        stripeAccount: {
            apiKey: ''
        }
    }

];