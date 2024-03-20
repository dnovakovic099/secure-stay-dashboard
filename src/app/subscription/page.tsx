"use client";
import React, { Fragment, useEffect, useState } from 'react';
import SideBarMain from '@/components/sidebar';
import { Dialog, Switch, Transition } from '@headlessui/react';
import SubscriptionCard from './card';
import axiosInstance from '@/auth/axiosInstance';
import { envConfig } from '@/utility/environment';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

const monthlyPlans = [
    { name: 'STARTER', price: 10, button: 'Get Started', planId: 'price_1OsTm9GurTGjjGfhd7HTiUsr' },
    { name: 'ESSENTIAL', price: 20, button: 'Select Essential', planId: 'price_1OsTn1GurTGjjGfh9kohYe2W' },
    { name: 'PROFESSIONAL', price: 50, button: 'Select Professional', planId: 'price_1OsTniGurTGjjGfhXcU2g2vd' }
];

const yearlyPlans = [
    { name: 'STARTER', price: 99, button: 'Get Started', planId: 'price_1OtU4iGurTGjjGfhLqMzyuhj' },
    { name: 'ESSENTIAL', price: 199, button: 'Select Essential', planId: 'price_1OtU3PGurTGjjGfhYWZJG0kY' },
    { name: 'PROFESSIONAL', price: 499, button: 'Select Professional', planId: 'price_1OtU28GurTGjjGfhULwiPiDV' }
];

const SubscriptionPage = () => {
    const [enabled, setEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const createCheckoutSession = async (planId: string) => {
        try {
            setIsLoading(true);
            const apiUrl = `${envConfig.backendUrl}/subscription/createcheckoutsession`;
            const response = await axiosInstance.post(apiUrl, { planId });
            if (response.status === 201) {
                setIsLoading(false);
                window.location = response.data.session.url;
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(`Error creating checkout session`);
        }
    };

    const popup = () => {
        return (
            <Transition appear show={true} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        <span className='flex justify-start items-center gap-2'>
                                            <span>Processing payment</span>
                                            <LoadingSpinner />
                                        </span>
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Please wait while we process your payment...
                                        </p>

                                    </div>
                                </Dialog.Panel>

                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        );
    };

    const isSubscriptionExpired = localStorage.getItem('isSubscriptionExpired');

    return (
        <>
            {
                (isSubscriptionExpired && isSubscriptionExpired == 'true') ?
                    <div className='pl-52 py-4 bg-slate-100 h-screen'>
                        <Toaster />
                        <h1 className='font-semibold text-4xl'>Select a plan</h1>
                        <div className='flex justify-between mt-6'>
                            <button className='text-white bg-[#7000FF] rounded-xl px-4 py-2'>Contact Us</button>
                            <div className='flex items-center gap-4 pr-48'>
                                <span className={`${enabled ? 'text-[#ADADAD]' : 'text-black'}`}>Monthly</span>
                                <Switch
                                    checked={enabled}
                                    onChange={setEnabled}
                                    className={`${enabled ? 'bg-[#a5a4a4]' : 'bg-[#C4C4C4]'}
                                        relative inline-flex h-[24px] w-[47.5px] shrink-0 cursor-pointer 
                                        rounded-full border-2 border-transparent transition-colors 
                                        duration-200 ease-in-out focus:outline-none focus-visible:ring-2 
                                         focus-visible:ring-white/75`}
                                >
                                    <span className="sr-only">Use setting</span>
                                    <span
                                        aria-hidden="true"
                                        className={`${enabled ? 'translate-x-6' : 'translate-x-0'}
                                          pointer-events-none inline-block h-[21px] w-[20px] 
                                           transform rounded-full bg-white shadow-lg ring-0 
                                           transition duration-200 ease-in-out`}
                                    />
                                </Switch>
                                <span className={`${!enabled ? 'text-[#ADADAD]' : 'text-black'}`}>Yearly</span>
                                <small className="px-[5px] py-[2px] text-[8pt] text-white border-2 border-transparent rounded-3xl bg-white bg-clip-padding bg-gradient-to-r from-purple-600 to-purple-300">
                                    Best offer
                                </small>
                            </div>
                        </div>

                        <div className='mt-5 flex gap-6'>
                            {
                                <>
                                    {
                                        isLoading && popup()
                                    }

                                    {!enabled && monthlyPlans.map(plan => (
                                        <SubscriptionCard
                                            key={plan.name}
                                            name={plan.name}
                                            price={plan.price}
                                            planId={plan.planId}
                                            button={plan.button}
                                            plan={'month'}
                                            isEssential={plan.name === 'ESSENTIAL'}
                                            isStarter={plan.name === 'STARTER'}
                                            createCheckoutSession={createCheckoutSession}
                                            isLoading={isLoading}
                                        />
                                    ))}
                                    {enabled && yearlyPlans.map(plan => (
                                        <SubscriptionCard
                                            key={plan.name}
                                            name={plan.name}
                                            price={plan.price}
                                            planId={plan.planId}
                                            button={plan.button}
                                            plan={'year'}
                                            isEssential={plan.name === 'ESSENTIAL'}
                                            isStarter={plan.name === 'STARTER'}
                                            createCheckoutSession={createCheckoutSession}
                                            isLoading={isLoading}
                                        />
                                    ))}
                                </>
                            }

                        </div>
                    </div>
                    :
                    <>
                        {
                            window.location.href = '/dashboard'
                        }
                    </>
            }
            <></>
        </>
    );
};

export default SubscriptionPage;
