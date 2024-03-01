"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import MoreSettings from "./moresettings";
import PhoneStructure from "./phone";
import Loader from "../loading";
import { Property } from "./page";

interface CreateUpsellProps {
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

const CreateUpsell = (props: CreateUpsellProps) => {
  return (
    <div className="flex flex-col items-center justify-start h-[93vh] w-[100%] pl-10 pt-5 rounded-md overflow-y-scroll">
      <Toaster position="top-center" reverseOrder={false} />

      {props.isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white  max-w-6xl pb-5 mr-10 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl p-5 bg-white rounded-3xl ">
            <div className="md:col-span-1">
              <div className="text-xl font-extrabold mb-1">Create Upsells</div>
              <p className="text-sm  text-gray-500 ">Build your own upsell</p>
            </div>
          </div>
          <div className=" justify-between grid grid-cols-12 ">
            <div
              className="col-span-7 gap-10 w-[100%] max-w-6xl bg-white pr-10 pl-10"
              onDragOver={props.handleDragOver}
              onDrop={props.handleDrop}
            >
              <div className="md:col-span-2">
                <div className="flex items-center gap-8 mt-4">
                  {/* <div className="w-40 h-25 overflow-hidden">
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-md">
                  <CameraIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div> */}
                  {/* <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Product Image
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Only image files are allowed to be uploaded here.
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageInput"
              />
              <label
                htmlFor="imageInput"
                className="bg-blue-700 border-2 border-blue-700 text-white px-4 py-1 rounded-lg hover:bg-transparent hover:text-blue-700 transition-all duration-300 mt-2 cursor-pointer"
              >
                Upload Image
              </label>
            </div> */}
                </div>
                <div className="mb-2 col-span-full">
                  <label htmlFor="title" className="block text-gray-700 mb-2">
                    Title<span className="text-red-700 px-1">*</span>
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
                    className="block text-gray-700 mb-2"
                  >
                    Short Description
                  </label>
                  <textarea
                    id="description"
                    className="border-2 border-gray rounded-md p-2 w-full h-15 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
                    placeholder="Write Description"
                    value={props.shortDescription}
                    onChange={(e) => props.setShortDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-10 col-span-full">
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
                <MoreSettings
                  attachedProperties={props.attachedProperties}
                  setAttachedProperties={props.setAttachedProperties}
                  fetchListingData={props.fetchListingData}
                />
              </div>

              {/* <div className="mb-2 col-span-full">
          <label
            htmlFor="shortDescription"
            className="block text-gray-700 mb-2"
          >
            Pricing Model
          </label>
          <div className="relative inline-block text-left w-full">
            <CommonDropdown
              menuItems={myMenuItems}
              onClick={handlePricingModel}
              className="w-full"
            />
          </div>
        </div> */}
            </div>
            <div className="bg-white">
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
    </div>
  );
};

export default CreateUpsell;
