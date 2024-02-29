import { envConfig } from '@/utility/environment';
import { PlusIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import axios from 'axios';


const obj = { codeName: "", codeValue: "", timingOption: 2, startDate: "", endDate: "" };

const SifelyDeviceAccessCodes = ({ fetchPassCodes, passCodes, deviceId, accessToken }: any) => {
    const [showForm, setShowForm] = useState(false);
    const [showAll, setShowAll] = useState(false);


    const [form, setForm] = useState(obj);

    const handlePlusIconClick = () => {
        setShowForm(true);
    };

    const handleChange = (name: string, value: any) => {
        const tempForm: any = Object.assign({}, form);
        tempForm[name] = value;
        setForm(tempForm);
    };

    const handleSave = async () => {
        const apiUrl = `${envConfig.backendUrl}/device/sifely/createpasscode`;
        const res = await axios.post(apiUrl, { ...form, deviceId, accessToken });
        if (res.status == 200) {
            fetchPassCodes();
            setShowForm(false);
            setForm(obj);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setForm(obj);
    };

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <>
            <div
                className="px-4 w-[91%] mx-auto bg-gray-100 mb-2 py-3 rounded-md cursor-pointer select-none flex justify-between items-center transition duration-300 ease-in-out transform"
            >
                <p className="text-gray-700 font-semibold text-sm">
                    Access Codes <span className="text-slate-400">({passCodes?.length})</span >
                </p>
                <div className="flex items-center gap-4">
                    <button onClick={handlePlusIconClick} className="outline outline-2 outline-indigo-600 mr-2 bg-white p-1 rounded-md"><PlusIcon className="text-indigo-800  h-4 w-5" /></button>
                </div>
            </div>
            {showForm ? (
                <div className="px-8 mb-4">
                    <div className="mb-2">
                        <label htmlFor="codeName" className="block text-sm font-medium text-gray-700">Code Name:</label>
                        <input
                            type="text"
                            id="codeName"
                            value={form.codeName}
                            onChange={(e) => handleChange('codeName', e.target.value)}
                            placeholder="Enter code name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="codeValue" className="block text-sm font-medium text-gray-700">Code Pin:</label>
                        <input
                            type="text"
                            id="codeValue"
                            value={form.codeValue}
                            onChange={(e) => handleChange('codeValue', e.target.value)}
                            placeholder="Enter code pin"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Timing:</label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="radio"
                                id="permanent"
                                value="permanent"
                                checked={form.timingOption === 2}
                                onChange={() => handleChange('timingOption', 2)}
                                className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="permanent" className="font-medium text-gray-700">Permanent</label>
                            <input
                                type="radio"
                                id="startEnd"
                                value="startEnd"
                                checked={form.timingOption === 3}
                                onChange={() => handleChange('timingOption', 3)}
                                className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="startEnd" className="font-medium text-gray-700">Start/End Time</label>
                        </div>
                    </div>
                    {form.timingOption === 3 && (
                        <>
                            <div className="mb-2">
                                <label htmlFor="startDateTime" className="block text-sm font-medium text-gray-700">Start Date and Time:</label>
                                <input
                                    type="datetime-local"
                                    id="startDateTime"
                                    value={form.startDate}
                                    onChange={(e) => handleChange('startDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="endDateTime" className="block text-sm font-medium text-gray-700">End Date and Time:</label>
                                <input
                                    type="datetime-local"
                                    id="endDateTime"
                                    value={form.endDate}
                                    onChange={(e) => handleChange('endDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                        </>
                    )}
                    <div className="flex justify-center gap-1">
                        <button className={`rounded-md bg-indigo-600 w-16 px-2 py-1 text-base text-white shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500`} onClick={handleSave}>Save</button>
                        <button className={`rounded-md bg-red-600 w-18 px-2 py-1 text-base text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500`} onClick={handleCancel}>Cancel</button>
                    </div>
                </div>


            ) :
                (
                    <div>
                        <div className="px-6 mb-4">
                            {passCodes?.length > 0 && (
                                <>
                                    {passCodes.slice(0, showAll ? passCodes.length : 2).map((code: any, index: any) => (
                                        <div
                                            key={index}
                                            className="bg-white border-b overflow-hidden w-full px-4 transition duration-300 ease-in-out transform cursor-pointer hover:bg-[#f1f3f4]"
                                        >
                                            <div className="p-1">
                                                <h2 className="text-sm font-semibold text-gray-800 mb-1 capitalize">{code?.keyboardPwdName}</h2>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs text-gray-600">Code: {code?.keyboardPwd}</p>
                                                    <p className="text-xs text-gray-600">End date: {code?.endDate}</p>
                                                    <div className="relative">
                                                        <button
                                                            className="text-gray-500 hover:text-gray-700 focus:outline-none"

                                                        >
                                                            ...
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex justify-center">
                                        {!showAll && passCodes.length > 4 && (
                                            <button className="mt-2" onClick={toggleShowAll}>
                                                <ChevronDownIcon height={20} width={20} className="text-indigo-600 " />
                                            </button>
                                        )}
                                        {showAll && (
                                            <button className="mt-2" onClick={toggleShowAll}>
                                                <ChevronUpIcon height={20} width={20} className="text-indigo-600 " />
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
        </>
    );
};

export default SifelyDeviceAccessCodes;