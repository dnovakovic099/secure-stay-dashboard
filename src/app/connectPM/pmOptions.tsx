'use client';

import { envConfig } from '@/utility/environment';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { redirect, useRouter } from 'next/navigation';
import { supabase } from '@/utility/supabase';
import axiosInstance from '@/auth/axiosInstance';
import axios from 'axios';


const PMOptions = () => {

    const [pmList, setPmList] = useState([]);
    const [pmId, setPmId] = useState(0);
    const [selected, setSelected] = useState(false);
    const [pmName, setPmName] = useState('');



    const getUserId = async () => {
        const { error, data } = await supabase.auth.getSession();

        if (error) return window.location.href = '/login';

        if (!data) return window.location.href = '/login';

        if (data.session?.user.id) {

            return data.session?.user.id;
        }

        return window.location.href = '/login';
    };

    const getPmList = async () => {

        try {

            const response = await axiosInstance.get(`${envConfig.backendUrl}/pm/getpmlist`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data) {

                setPmList(response.data.data[0]);
            } else {
                toast.error("Cannot fetch data!!!");
            }

        } catch (error) {
            toast.error("Something went wrong!!!");
        }
    };

    const saveUsersPM = async (pmId: number) => {

        if (!pmId) {
            return toast.error("Please select one company!!!");
        }

        const uid = await getUserId();

        if (!uid) return toast.error('Please login first!!!');

        try {

            const pmData = { pmId, uid, pmName };

            const response: any = await axios.post(`${envConfig.backendUrl}/pmcompay/saveuserpmcompany`, pmData);

            const userData = response.data.data;

            if (userData?.pmId) {

                localStorage.setItem('userPmId', userData?.pmId);
                window.location.href = '/dashboard';

            } else {

                toast.error("Something went wrong!!!");

            }

        } catch (error) {

            throw new Error;
        }
    };


    const checkUsersPM = async () => {

        const uid = await getUserId();
        const userResponse: any = await axios.get(`${envConfig.backendUrl}/pmcompay/userpmlist?uid=${uid} `, {});

        const userData = userResponse.data;

        if (userData.success == true) {
            localStorage.setItem('userPmId', userData.data.pmId);
            window.location.href = '/dashboard';
        }
    };

    // useEffect(() => {
    checkUsersPM();
    // getPmList();
    // }, []);


    return (

        <div>
            <Toaster />
            <div className='text-2xl text-white font-normal text-center text py-2 bg-gradient-to-br from-indigo-400 via-indigo-700 to-indigo-900 mb-5 rounded-md '>
                Choose your pm company
            </div>
            <div className=' border-2 rounded-xl py-5 px-5 border-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800'>

                <PMCart
                    setPmId={setPmId}
                    pmId={pmId}
                    pmList={pmList}
                    setSelected={setSelected}
                    setPmName={setPmName}
                />
                <div className='text-center mt-10 '>
                    <button
                        onClick={() => saveUsersPM(pmId)}
                        disabled={!selected}
                        className='text-lg bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white px-10 py-1  rounded-lg '>Save</button>
                </div>
            </div>
        </div>
    );
};

export default PMOptions;

interface PmCartProps {
    pmId: number;
    setPmId: (id: number) => void;
    setPmName: (name: string) => void;
    pmList: any[];
    setSelected: (value: boolean) => void;
}

const PMCart = ({ pmId, setPmId, setSelected, setPmName }: PmCartProps) => {

    return (
        <div className='flex flex-col md:grid  md:grid-cols-2 xl:grid-cols-4  '>
            {pmSoftwareList?.map((data) => {
                return (
                    <div key={data.id}
                        onClick={() => {
                            setSelected(true);
                            setPmId(data.id);
                            setPmName(data.name);
                        }}
                        className={`m-2 rounded-2xl  border  justify-center items-center ${pmId === data.id ? "bg-gray-200" : ''}`}>
                        <div className='mt-2 flex justify-center px-8 py-8 m-2 '>
                            <img src={data.image} alt="" className=' justify-center max-h-[30px] min-h-[30px] ' />
                        </div>

                        {/* <div className='px-5 flex  justify-between items-center bg-gray-100 text-gray-500 text-sm bottom-0 py-5 rounded-b-xl'>
                            <p className='capitalize '>{data.name}</p>
                            <ChevronRightIcon className='h-4 w-4' />
                        </div> */}
                    </div>
                );
            })
            }
        </div>
    );
};


const pmSoftwareList = [
    {
        id: 1,
        name: "Hostaway",
        image: 'https://hostway.com/wp-content/uploads/2021/03/Logo.png'
    },
    {
        id: 2,
        name: "MyVR",
        image: "https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/98881571-9fef-4280-b68f-54c3e6805541.png",
    },
    {
        id: 3,
        name: "Kunas",
        image: "https://kunas.io/wp-content/uploads/2023/03/kunas-logo-horizontal-color-300x89.png",
    },
    {
        id: 4,
        name: "hoteliga",
        image: "https://hoteligaweb.s3.eu-central-1.amazonaws.com/Content/images/team/hoteliga_logo_EpsilonNet_black.png",
    },
    {
        id: 5,
        name: "Beds",
        image: "https://beds24.com/webinclude/beds24_channel_manager.svg",
    },
    {
        id: 6,
        name: "Hosthub",
        image: "https://www.hosthub.com/wp-content/themes/syncbnb/assets/img/hosthub-page-header-logo.svg",
    },
    {
        id: 7,
        name: "Hostify",
        image: "https://hostify.com/wp-content/uploads/2023/02/Hostify-Logo.svg",
    },
    {
        id: 8,
        name: "Booking Automation",
        image: "https://www.bookingautomation.com/wp-content/uploads/2019/03/Group-415.png",
    },
    {
        id: 9,
        name: "MEWS",
        image: "https://www.mews.com/hubfs/_Project_Phoenix/images/logo/Mews%20Logo.svg",
    },
    {
        id: 10,
        name: "hostfully",
        image: "https://www.hostfully.com/wp-content/uploads/2022/08/logo-1.svg",
    },
    {
        id: 11,
        name: "Guesty",
        image: "https://www.guesty.com/wp-content/uploads/2023/07/guesty-logo-new.svg",
    },
    {
        id: 12,
        name: "RMS Cloud",
        image: "https://www.rmscloud.com/hubfs/RMS%20GLB%20Website%2022/RMS_2022/icons/rms-logo.svg",
    }
];

