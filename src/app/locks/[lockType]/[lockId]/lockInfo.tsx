'use client';
import React, { useEffect, useState } from 'react';
import SeamLockInfo from './seamLockInfo';
import { envConfig } from '@/utility/environment';
import axios from 'axios';
import toast from 'react-hot-toast';
import SifelyLockInfo from './sifelyLockInfo';

interface listing {
    listingId: number;
    id: number;
    name: string;
    externalListingName: string;
    address: string;
    price: number;
    guestsIncluded: number;
    priceForExtraPerson: number;
    currencyCode: string;
    images: Array<image>;
}

interface image {
    id: number;
    caption: string;
    vrboCaption: string;
    airbnbCaption: string;
    url: string;
    sortOrder: number;
}
const LockInfo = ({ lockType, lockId }: any) => {
    const [listings, setListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState<number[]>([]);
    const [selection, setSelection] = useState(false);
    const [connectedListings, setConnectedListings] = useState<listing[]>([]);
    const [filteredListings, setFilteredListings] = useState<listing[]>([]);
    const [operation, setOperation] = useState(false);

    const handleEditClick = async (e: any) => {
        e.stopPropagation();
        setSelection((prev) => !prev);
        setOperation(true);
    };

    const handleChange = (value: number) => {
        if (selectedListing.includes(value)) {
            setSelectedListing([]);
        } else {
            setSelectedListing([value]);
        }
    };

    useEffect(() => {
        if (selection) {
            setFilteredListings(listings);
        } else {
            setFilteredListings(connectedListings);
        }
    }, [selection]);

    const getDeviceListings = async () => {

        const apiUrl = `${envConfig.backendUrl}/device/getlistings/${lockId}`;
        const result = await axios.get(apiUrl);

        if (result.status == 200 && result.data?.success) {
            const arr = [result.data?.data];
            setConnectedListings(arr);
            setFilteredListings(arr);

            setSelectedListing((prev) => [...prev, result.data?.data?.id]);
        }
    };
    const fetchListings = async () => {
        try {
            const apiUrl = `${envConfig.backendUrl}/listing/getlistings`;
            const res = await axios.get(apiUrl);

            if (res.status == 200) {
                const listings = res.data.listings;
                setListings(listings);
            }
        } catch (error) {
            toast.error('Could not fetch listings');
        }
    };

    const saveDeviceLockInfo = async () => {
        if (!operation) return;
        
        try {
            const apiUrl = `${envConfig.backendUrl}/device/savelocklistinginfo`;
            const res = await axios.post(apiUrl, {
                deviceId: lockId,
                listingId: selectedListing[0] ? selectedListing[0] : null,
                deviceType: lockType
            });

            if (res.status == 201 && res.data?.success) {
                toast.success(res.data?.message);
                setSelection(false);
                getDeviceListings();
                setOperation(false);
            }
        } catch (error: any) {
            if (error?.response?.status == 400) {
                toast.error(error?.response?.data?.message);
            }
            else if (error?.response?.status == 409) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error('Error saving lock detail');
            }
        }
    };

    useEffect(() => {
        fetchListings();
        getDeviceListings();
    }, []);

    if (lockType == 'Seam') return (
        <SeamLockInfo
            lockId={lockId}
            listings={listings}
            connectedListings={connectedListings}
            handleEditClick={handleEditClick}
            filteredListings={filteredListings}
            selection={selection}
            handleChange={handleChange}
            selectedListing={selectedListing}
            saveDeviceLockInfo={saveDeviceLockInfo}
        />
    );

    if (lockType == 'Sifely') return (
        <SifelyLockInfo
            lockId={lockId}
            listings={listings}
            connectedListings={connectedListings}
            handleEditClick={handleEditClick}
            filteredListings={filteredListings}
            selection={selection}
            handleChange={handleChange}
            selectedListing={selectedListing}
            saveDeviceLockInfo={saveDeviceLockInfo}
        />
    );

    return (
        <div>Not found</div>
    );
};

export default LockInfo;