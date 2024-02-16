"use client"
import React from "react";
import { brandList } from "@/constants/brandList";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { envConfig } from "@/utility/environment";

const AddDevices = () => {
    const router = useRouter()

    const authorizeSeam = async () => {
        const apiUrl=`${envConfig.backendUrl}/device/connectWebview`
        const response = await axios.get(apiUrl)
        if (response.status == 200) {
            let url = response.data.url
            window.open(url, '_blank');
        } else {
            return <></>
        }
    }


    return (
        <div className="h-[100%] w-[65%] ml-48 mt-4 ">
            <span
                className="primary-color text-sm font-medium cursor-pointer"
                onClick={() => {
                    router.back();
                }}
            >
                Back
            </span>
            <div className="bg-white rounded-lg p-6 mt-4">
                <span className="primary-color font-bold text-2xl">Add Devices</span>
                <div className="h-[80%] ml-20 mt-6">
                    <span className="text-sm">Access Management</span>
                    <div className="mt-3 flex flex-wrap gap-5 h-[400px] overflow-y-auto">
                        {/* card */}

                        {brandList.map((brand) => (
                            <div
                                onClick={() => authorizeSeam()}
                                className="border border-collapse border-slate-200 p-4 w-48 rounded-md h-54 hover:cursor-pointer"
                            >
                                <img src={brand.img} alt="" height={30} width={30} />
                                <div className="mt-4 text-start">
                                    <h1 className="text-black font-bold">{brand.name}</h1>
                                    <p className="text-sm">
                                        Connect locks via your {brand.name} account
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDevices;
