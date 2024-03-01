'user client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UploadImage from './uploadImage';
import UserType from './userType';
import { countryWithCode } from '@/constants/countryCode';
import handleApiCallFetch from '@/components/handleApiCallFetch';
import { envConfig } from '@/utility/environment';
import { UpdateUserData } from '../users';


interface CreateUserProps {
    updateUser: (formData: UpdateUserData) => Promise<any>;
    userId: number;
}


const UpdateUserForm = ({ updateUser, userId }: CreateUserProps) => {

    const [imageUrl, setImageUrl] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        dialCode: '',
        contact: '',
        userType: '',
        userId: ''
    });

    const [countryDialCode, setCountryDialCode] = useState(countryWithCode[0].dialCode);
    const [selectedRole, setSelectedRole] = useState('');

    const handleChange = (name: string, value: any): void => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitForm = async (e: any): Promise<any> => {
        e.preventDefault();


        if (!formData.fullName || !formData.email || !formData.userType) return toast.error('Provide all values');

        if (!formData.email.includes('@gmail.com')) return toast.error('Provide valid email!!!');

        await updateUser(formData);

        setFormData({
            fullName: '',
            email: '',
            dialCode: '',
            contact: '',
            userType: '',
            userId: ''
        });
    };

    const handleClearForm = (e: any) => {
        e.preventDefault();
        setFormData(prev => ({
            ...prev,
            fullName: '',
            email: '',
            dialCode: '',
            contact: '',
            userType: ''

        }));
        setCountryDialCode(countryWithCode[0].dialCode);
    };

    const handleSelectChange = (data: any) => {
        setCountryDialCode(data);
    };

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            dialCode: countryDialCode
        }));

    }, [countryDialCode]);

    const fetchSingleUser = async (userId: number): Promise<any> => {

        const apiUrl = `${envConfig.backendUrl}/user/getSingleUser?userId=${userId}`;
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response: any = await handleApiCallFetch(apiUrl, params);


        if (response.status == true) {
            setFormData((prev) => ({
                ...prev,
                fullName: response.data.fullName,
                email: response.data.email,
                dialCode: response.data.dialCode,
                contact: response.data.contact,
                userType: response.data.userType,
                userId: response.data.userId
            }));
            setSelectedRole(response.data.userType);
            setCountryDialCode(response.data.dialCode);
        }


    };

    useEffect(() => {

        if (userId !== 0) fetchSingleUser(userId);

    }, [userId]);


    return (
        <div className='bg-white   flex justify-center  rounded-md'>

            <form className='px-4 py-4 w-[40rem]'>

                <div className=' text-center text-indigo-600'>
                    <h1 className='text-xl text-indigo-600 font-bold tracking-normal -mt-8'>
                        Update User
                    </h1>
                </div>

                <div className='grid grid-flow-col gap-4'>

                    <div className='col-span-8 space-y-4'>

                        <div className='grid space-y-2 w-full '>
                            <label className='text-indigo-900 font-semibold'>
                                Full name
                            </label>
                            <input
                                name='fullName'
                                type='text'
                                value={formData.fullName}
                                onChange={(e) => handleChange('fullName', e.target.value)}
                                className=' rounded-md py-2 px-2 outline-none shadow-sm border w-full'
                            />
                        </div>

                        <div className='grid space-y-2 w-full '>
                            <label className='text-indigo-900 font-semibold'>
                                Email
                            </label>
                            <input
                                name='email'
                                type='text'
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className=' rounded-md py-2 px-2 outline-none shadow-sm border w-full'
                            />
                        </div>

                        <div className='grid space-y-2 w-full '>
                            <label className='text-indigo-900 font-semibold'>
                                Contact
                            </label>

                            <div className='flex border  shadow-sm rounded-md '>
                                <select
                                    name="country"
                                    id=""
                                    className='rounded-md py-2 outline-none shadow-sm'
                                    value={countryDialCode}
                                    onChange={(e) => handleSelectChange(e.target.value)}
                                >
                                    {countryWithCode?.map(data => (
                                        <option key={data.name} value={data.dialCode}>
                                            {data.code}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    name=''
                                    type='text'
                                    value={countryDialCode}
                                    disabled
                                    className='rounded-md py-2 px-2 outline-none shadow-sm w-20'
                                />

                                <input
                                    name='contact'
                                    type='number'
                                    value={formData.contact}
                                    onChange={(e) => handleChange('contact', e.target.value)}
                                    placeholder='9800000000'
                                    className=' rounded-md py-2 px-2 outline-none shadow-sm  w-full'
                                />

                            </div>
                        </div>

                    </div>
                    <UploadImage
                        imageUrl={imageUrl}
                        setImageUrl={setImageUrl}
                    />
                </div>
                <UserType
                    handleChange={handleChange}
                    selectedRole={selectedRole}
                    setSelectedRole={setSelectedRole}
                />
                <div className='flex space-x-5 justify-center  '>
                    <button
                        onClick={handleSubmitForm}
                        className='px-4 py-2 bg-indigo-600 text-white rounded-md w-full'
                    >Update </button>

                    <button
                        onClick={handleClearForm}
                        className='px-4 py-2 bg-red-500 text-white  rounded-md w-full'>Cancel</button>
                </div>

            </form >
        </div >
    );
};

export default UpdateUserForm;