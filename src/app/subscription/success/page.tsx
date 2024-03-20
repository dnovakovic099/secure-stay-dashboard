'use client';
import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/20/solid';
import toast from 'react-hot-toast';
import { envConfig } from '@/utility/environment';
import axiosInstance from '@/auth/axiosInstance';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

const SuccessPage: React.FC = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const successPayment = async () => {
        try {
            setIsLoading(true);
            const apiUrl = `${envConfig.backendUrl}/subscription/saveusersubscriptioninfo`;
            const response = await axiosInstance.post(apiUrl, {});
            if (response.status == 201) {
                setIsLoading(false);
                localStorage.setItem('isSubscriptionExpired', 'false');
            } else {
                toast.error('Something went wrong. Please contact customer support. Thank You!');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(`Something went wrong. Please contact customer support. Thank You!`);
        }
    };

    useEffect(() => {
        successPayment();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {
                isLoading ?
                    (
                        <><LoadingSpinner /> Saving Payment Info...</>
                    ) : (
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h1 className="flex gap-2 text-3xl font-bold text-green-600 mb-4">
                                <CheckCircleIcon height={40} width={40} color='green' />
                                <span>Payment Successful!</span>
                            </h1>
                            <p className="text-lg text-gray-800 mb-8">Thank you! for your payment. Your transaction was successful.</p>
                            <button
                                disabled={isLoading}
                                onClick={() => router.replace('/dashboard')}
                                className="flex items-center text-center gap-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                            >
                                <ArrowRightStartOnRectangleIcon height={20} width={20} /> <span>Proceed</span>
                            </button>
                        </div >
                    )
            }
        </div>
    );
};

export default SuccessPage;
