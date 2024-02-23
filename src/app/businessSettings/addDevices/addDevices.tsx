"use client";
import React from "react";
import { brandList } from "@/constants/brandList";
import axios from "axios";
import { useRouter } from "next/navigation";
import { envConfig } from "@/utility/environment";

const AddDevices = () => {
  const router = useRouter();

  const authorizeSeam = async () => {
    const apiUrl = `${envConfig.backendUrl}/device/connectWebview`;
    const response = await axios.get(apiUrl);
    if (response.status == 200) {
      let url = response.data.url;
      window.open(url, "_blank");
    } else {
      return <></>;
    }
  };

  return (
    <div className="flex flex-col items-center mt-10  h-screen w-screen">
      <div>
        <div className="mb-2">
          <span
            className="text-indigo-600 font-bold text-sm mb-4 cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            ← Back
          </span>
        </div>
        <div className="bg-white rounded-md p-4 mt-4">
          <span className="text-indigo-600 font-bold text-lg mb-4">
            Add Devices
          </span>
          <div className="ml-4 mt-5">
            <span className="text-sm text-slate-500 mb-2">
              Access Management
            </span>
            <div className="grid grid-cols-3 gap-4 h-[300px] overflow-y-auto mt-2">
              {/* card */}
              {brandList.map((brand) => (
                <div
                  key={brand.name}
                  onClick={() => authorizeSeam()}
                  className="flex flex-row gap-5 border border-slate-200 p-3 rounded-md cursor-pointer hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="mb-2 w-12 h-12 object-scale-down"
                  />
                  <div className="text-start">
                    <h1 className="text-black font-semibold text-sm">
                      {brand.name}
                    </h1>
                    <p className="text-xs text-slate-500">
                      Connect locks via your {brand.name} account
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDevices;
