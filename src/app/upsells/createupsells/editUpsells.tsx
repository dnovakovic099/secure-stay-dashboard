"use client";
import React, { useEffect } from "react";

import { Toaster } from "react-hot-toast";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import { envConfig } from "@/utility/environment";
import MoreSettings from "./moresettings";
import PhoneStructure from "./phone";
import Loader from "../loading";
import { Property } from "./page";

interface EditUpsellProps {
  upsell_id: string;
  title: string;
  shortDescription: string;
  price: string;
  attachedProperties: Property[];
  selectedImage: File | null;
  isLoading: boolean;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setShortDescription: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  setAttachedProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  goBack: () => void;
  handleImageUpload: (e: any) => void;
  handleDragOver: (e: any) => void;
  handleDrop: (e: any) => void;
  fetchListingData: () => void;
}

const EditUpsell = (props: EditUpsellProps) => {
  // console.log(props.attachedProperties);

  // useEffect(() => {
  //   props.attachedProperties !== null &&
  //     fetchAssociatedListing(props.upsell_id);
  // }, [props.upsell_id]);

  // const fetchAssociatedListing = async (id: string) => {
  //   const apiUrl = `${envConfig.backendUrl}/upsell/listing?upSellId=${id}`;
  //   const params = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   props.setIsLoading(true);
  //   const result: any = await handleApiCallFetch(apiUrl, params);

  //   props.setIsLoading(false);
  //   props.setAttachedProperties((prevProperties) =>
  //     prevProperties?.map((property) => {
  //       const updatedProperty = result.data?.find(
  //         (item: any) => item.id === property.id
  //       );
  //       return updatedProperty
  //         ? { ...property, status: 1 }
  //         : { ...property, status: 0 };
  //     })
  //   );
  // };

  return (
    <>
      {props.isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-start h-[93vh] w-[100%] rounded-md pt-5 overflow-y-scroll">
          <Toaster position="top-center" reverseOrder={false} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl rounded-t-2xl py-5 px-5 bg-white">
            <div className="md:col-span-1">
              <div className="text-xl font-extrabold mb-1">Edit Upsells</div>
              <p className="text-sm  text-gray-500 ">Build your own upsell</p>
            </div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl pb-2 rounded-b-2xl bg-white pl-10"
            onDragOver={props.handleDragOver}
            onDrop={props.handleDrop}
          >
            <div className="md:col-span-2">
              <div className="mb-2 col-span-full">
                <label htmlFor="title" className="block text-gray-700  mb-2">
                  Title<span className="text-red-700 px-2">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  className="border-2 border-gray rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
                  placeholder="Title"
                  value={props.title}
                  onChange={(e) => props.setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-2 col-span-full">
                <label
                  htmlFor="shortDescription"
                  className="block text-gray-700  mb-2"
                >
                  Short Description
                </label>

                <textarea
                  id="description"
                  className=" border-2 border-gray rounded-md p-2 w-full h-15  focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
                  placeholder="Write Description"
                  value={props.shortDescription}
                  onChange={(e) => props.setShortDescription(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4 col-span-full">
                <label htmlFor="title" className="block text-gray-700 mb-2">
                  Price<span className="text-red-700 px-1">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  className="border-2 border-gray rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
                  placeholder="Price"
                  value={props.price}
                  onChange={(e) => props.setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="container mx-auto p-4">
                <MoreSettings
                  attachedProperties={props.attachedProperties}
                  setAttachedProperties={props.setAttachedProperties}
                  fetchListingData={props.fetchListingData}
                />
              </div>
            </div>
            {/* Other form fields and components go here */}
            <div className="md:col-span-1 mb-3">
              <PhoneStructure
                image={
                  props.selectedImage
                    ? URL.createObjectURL(props.selectedImage)
                    : ""
                }
                textContent={{
                  title: props.title,
                  description: props.shortDescription,
                  price: props.price,
                }}
              />
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default EditUpsell;
