import React from 'react';

const SubscriptionInfo = ({ planName, pricing, currency, endDate }: { planName: string, pricing: number, currency: string, endDate: string; }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-4 border-b border-gray-300">Subscription Info</h2>
            <div className="flex items-center justify-between pb-4 mb-4">
                <div>
                    <p className="text-lg font-semibold text-gray-700">Plan</p>
                    <p className="text-lg text-gray-800">{planName}</p>
                </div>
                <div>
                    <p className="text-lg font-semibold text-gray-700">Pricing</p>
                    <p className="text-lg text-gray-800">{pricing} {currency.toUpperCase()}</p>
                </div>
                <div>
                    <p className="text-lg font-semibold text-gray-700">End Date</p>
                    <p className="text-lg text-gray-800">{endDate}</p>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionInfo;