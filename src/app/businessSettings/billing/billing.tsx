'use client';
import React, { useEffect, useState } from 'react';
import SubscriptionInfo from './subscriptionInfo';
import InvoiceList from './invoiceList';
import { envConfig } from '@/utility/environment';
import axiosInstance from '@/auth/axiosInstance';
import toast from 'react-hot-toast';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const subscriptionInfoObj = {
    plan: '',
    price: 0,
    currency: '',
    endDate: ''
};

const Billing = () => {

    const [subscriptionInfo, setSubscriptionInfo] = useState(subscriptionInfoObj);
    const [invoiceList, setInvoiceList] = useState([]);
    const [upcomingInvoice, setUpcomingInvoice] = useState({
        created_at: '',
        amount: '',
        currency: '',
        hosted_invoice_url: '',
        invoice_pdf: '',
        paid: ''
    });

    const getUserSubscriptionInfo = async () => {
        try {
            const apiUrl = `${envConfig.backendUrl}/subscription/getusersubscriptioninfo`;
            const response = await axiosInstance.get(apiUrl);
            if (response.status == 200) {
                const plan = response.data?.data?.product?.name;
                const price = response.data?.data?.price?.unit_amount / 100;
                const currency = response.data?.data?.price?.currency;
                const endDate = response.data?.data?.subscription?.endDate;

                setSubscriptionInfo({
                    plan: plan,
                    price: price,
                    currency: currency,
                    endDate: endDate
                });
            }
        } catch (error) {
            toast.error('Error fetching subscription info');
            console.log(error);
        }
    };

    const getInvoiceList = async () => {
        try {
            const apiUrl = `${envConfig.backendUrl}/subscription/getuserinvoices`;
            const response = await axiosInstance.get(apiUrl);
            if (response.status == 200) {
                setInvoiceList(response.data?.data[0]?.invoices);
                setUpcomingInvoice(response.data?.data[0]?.upcomingInvoice);
            }
        } catch (error) {
            toast.error(`Error fetching invoices`);
            console.log(error);
        }
    };

    useEffect(() => {
        getUserSubscriptionInfo();
        getInvoiceList();
    }, []);

    return (
        <div>
            <div className="container px-4 py-4 bg-slate-100 h-screen">
                <h1 className='text-2xl font-semibold mb-8'>Billing</h1>
                <SubscriptionInfo
                    planName={subscriptionInfo.plan}
                    pricing={subscriptionInfo.price}
                    currency={subscriptionInfo.currency}
                    endDate={subscriptionInfo.endDate}
                />
                {upcomingInvoice.created_at &&
                    <div className='flex items-center gap-2 my-4 p-4 bg-slate-200 rounded'>
                        <InformationCircleIcon height={20} width={20} color='blue' />
                        <p>Your next bill is on {upcomingInvoice.created_at}.</p>
                    </div>
                }
                <InvoiceList invoices={invoiceList} />
            </div>
        </div>
    );
};

export default Billing;