'use client';
import React from 'react';
import { XCircleIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

const CancelPage: React.FC = () => {
    const router = useRouter();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className=" bg-white p-8 rounded-lg shadow-lg">
                <h2 className="flex items-center gap-2 text-3xl font-bold text-center text-red-500 mb-6">
                    <XCircleIcon height={40} width={40} />
                    <span>Payment Cancelled</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">It seems like you have cancelled the payment process.</p>

                <button
                    onClick={() => router.push('/subscription')}
                    className="flex items-center text-center gap-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                >
                    <ArrowLeftStartOnRectangleIcon height={20} width={20} /> <span>Return back</span>
                </button>

            </div>
        </div>
    );
};

export default CancelPage;
