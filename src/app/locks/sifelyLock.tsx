'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '@/components/LoadingSpinner';
import { envConfig } from '@/utility/environment';
import toast from 'react-hot-toast';
import { Battery100Icon, Battery50Icon, PlusIcon } from '@heroicons/react/20/solid';
import CommonPopup from '@/components/commonPopup';
import Form from './addSifelyLockForm';
import { useRouter } from 'next/navigation';

const SifelyLock = () => {
    const [sifelyLocks, setSifelyLocks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
        fetchSifelyLocks();
    }, []);

    const fetchSifelyLocks = async () => {
        try {
            setIsLoading(true);
            const apiUrl = `${envConfig.backendUrl}/device/sifely/locklist`;
            const response = await axios.get(apiUrl);
            if (response.status === 200 && response.data?.success) {
                setSifelyLocks(response.data?.data);
            }
        } catch (error) {
            console.log(error);
            toast.error('Error fetching sifely locks');
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleClick = (lockId: any) => {
        router.push(`/locks/Sifely/${lockId}`);
    };

    return (
        <>
            <CommonPopup
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                // children={<Form closeModal={closeModal} getSifelyLocks={getSifelyLocks}/>}
                disableCloseIcon={false}
                heightwidth="100rem"
            >
                <Form closeModal={closeModal} fetchSifelyLocks={fetchSifelyLocks} />
            </CommonPopup>
            <div className='p-2'>
                <div className='flex justify-between items-center pr-2'>
                    <h1 className='text-xl font-semibold ml-4'>Sifely Locks</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className='flex items-center px-2 py-2 h-[40px] text-white text-sm rounded-md focus:outline-none transition duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-purple-900 hover:to-purple-800 focus:to-purple-800'
                    >
                        <PlusIcon className="text-white h-4 w-4" />
                        Add sifely locks
                    </button>
                </div>
                <div className="text-slate-700 text-base font-medium mt-10">
                    {isLoading && <LoadingSpinner />}
                    {sifelyLocks.length === 0 && (
                        <div>
                            <p className="text-slate-400 text-center mt-32">Sorry, no devices were found</p>
                        </div>
                    )}
                    {sifelyLocks.map((lock, index) => (
                        <LockItem handleClick={handleClick} key={index} lock={lock} />
                    ))}
                </div>
            </div>
        </>
    );
};

const LockItem = ({ lock, handleClick }: any) => (
    <div onClick={() => handleClick(lock?.lockId)} className="py-4 font-normal text-sm text-justify hover:bg-[#f1f3f4] flex items-center gap-4 justify-between border-b cursor-pointer transition-all duration-300">
        <div className="flex justify-start gap-5 mx-5">
            <div>
                <img
                    src="https://www.schlage.com/content/dam/sch-us/homepage-refresh/smart-lock.png"
                    alt=""
                    width={27}
                    height={27}
                    className="rounded-md"
                />
            </div>
            <div className="flex flex-col">
                <h1 className="font-semibold text-base text-black uppercase">
                    {lock?.lockAlias?.substring(0, 30)}
                </h1>
                <p className="text-xs text-slate-500">
                    {lock.lockName}
                </p>
            </div>
        </div>
        <div className="flex flex-col mr-4 items-baseline text-slate-500">
            <div className="text-xs flex items-center gap-2 text-left">
                {lock.electricQuantity > 80 ? (
                    <Battery100Icon color="green" width={20} height={20} />
                ) : (
                    <Battery50Icon color="green" width={20} height={20} />
                )}
                <div>
                    {lock.electricQuantity < 20 ? "Low" : "Good"} ({lock.electricQuantity}%)
                </div>
            </div>
        </div>
    </div>
);

export default SifelyLock;
