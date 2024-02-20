'use client'
import handleApiCallFetch from '@/components/handleApiCallFetch';
import { envConfig } from '@/utility/environment';
import React from 'react';



const UpSellListing = () => {
    const listingData = [
        {
            id: 1,
            listingId: 1,
            propertyID: '#23456',
            name: 'test',
            externalListingName: 'this is external listing this is external listing this is external listing'
        },
        {
            id: 2,
            listingId: 2,
            propertyID: '#23456',
            name: 'test 2',
            externalListingName: 'this is external listing'
        }
    ];

    const renderUpSellListing = listingData?.map((data) => {
        return (
            <tr key={data.id} className="grid grid-cols-12 bg-white border-b-2 py-2 px-4">
                <td className=' col-span-2 text-start'>{data.propertyID}</td>
                <td className='col-span-8 text-start'>{data.externalListingName} {data.name}</td>
                <td className='col-span-2 text-start'>{data.name}</td>
            </tr>
        );
    })

    const fetchAssociatedListing = async (id: number) => {
        const apiUrl = `${envConfig.backendUrl}/upsell/listing?upSellId=${id}`;
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const result: any = await handleApiCallFetch(apiUrl, params)
    }
    return (
        <div className='rounded-md text-sm py-2 px-2 border shadow-md'>
            <p className='font-semibold py-2 '>Attached rentals</p>
            <table className='min-w-full'>
                <thead>
                    <tr className='grid grid-cols-12 px-4 py-2 bg-slate-200 rounded-md'>
                        <th className='col-span-2 text-start'>Property Id</th>
                        <th className='col-span-8 text-start'>Property Name</th>
                        <th className='col-span-2 text-start'>Rentals</th>
                    </tr>
                </thead>
                <tbody className='text-sm'>
                    {renderUpSellListing}
                </tbody>
            </table>
        </div>
    );
};

export default UpSellListing;
