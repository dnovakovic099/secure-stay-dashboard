"use client";
import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Toaster, toast } from "react-hot-toast";
import { CameraIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { envConfig } from "@/utility/environment";
import axios from "axios";
import MoreSettings from "./moresettings";
import { useRouter, useSearchParams } from "next/navigation";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import PhoneStructure from "./phone";
import Loader from "../loading";
import CommonDropdown from "@/components/commonDropdown";

export interface Property {
  listingId: number;
  id: number;
  name: string;
  externalListingName: string;
  address: string;
  price: number;
  guestsIncluded: number;
  priceForExtraPerson: number;
  currencyCode: string;
  status: number;
}

const CreateUpsell: React.FC = () => {
  const emptyProperties: Property[] = [];
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [price, setPrice] = useState("");
  const [attachedProperties, setAttachedProperties] = useState(emptyProperties);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const template_id = searchParams.get("template_id");

  const [pricingModel, setPricingModel] = useState("");

  const goBack = () => {
    router.push("/upsells");
  };

  useEffect(() => {
    if (template_id) {
      fetchData();
    }
  });

  useEffect(() => {
    fetchListingData();
  }, []);

  const fetchData = async () => {
    try {
      const apiUrl = `${envConfig.backendUrl}/upsell/:${template_id}`; // Replace with your API endpoint
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      setIsLoading(true);
      const result: any = await handleApiCallFetch(apiUrl, params);

      const responseData = result.data;

      setTitle(responseData.title);
      setShortDescription(responseData.description);
      setPrice(responseData.price);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error occured");
      // Handle error
    }
  };

  const handlePostRequest = async (postData: any) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/upsell/create`;

      const response = await axios.post(apiUrl, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response here
      if (response.status === 200) {
        // toast.success(`${response.data.message}`);
        setTitle("");
        setShortDescription("");
        setPrice("");
        setAttachedProperties(emptyProperties);
        setSelectedImage(null);
        goBack();
        return;
      }
      toast.error(`${response.data.message}`);
      return;
    } catch (error: any) {
      toast.error(`${error.message}`);
      // Handle the error here
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter title");
      return;
    }

    if (price === "") {
      toast.error("Please enter price");
      return;
    }

    const formData = new FormData();
    // formData.append("image", selectedImage!);
    formData.append("title", title);
    formData.append("description", shortDescription);
    formData.append("price", price);
    attachedProperties.forEach((property, index) => {
      if (property.status == 1) {
        formData.append(`listingIds[${index}]`, property.listingId.toString());
      }
    });
    handlePostRequest(formData);
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file && file.size <= 2048 * 1024) {
      setSelectedImage(file);
    } else {
      alert(
        "Please choose an image with a size equal to or less than 2048 KB."
      );
      // Clear the input to allow the user to choose another file
      e.target.value = null;
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.size <= 2048 * 1024) {
      setSelectedImage(file);
    } else {
      alert(
        "Please choose an image with a size equal to or less than 2048 KB."
      );
    }
  };

  const fetchListingData = async () => {
    try {
      const apiUrl = `${envConfig.backendUrl}/listing/getlistings`;
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const result: any = await handleApiCallFetch(apiUrl, params);

      // Handle successful data fetch
      console.log(result);

      setAttachedProperties(
        result.listings?.map((property: any) => ({ ...property, status: 0 }))
      );
    } catch (error) {
      toast.error("Error occured");
      // Handle error
    }
  };

  return (
    <div>
      <div className="flex items-center bg-[#141B37] h-[60px] min-w-[1440px]">
        <div className="flex justify-between items-center w-full px-5 py-2">
          <div className="flex items-center justify-between min-w-[200px]">
            <img
              src="/assets/securestay.png"
              className="flex items-center h-11"
            />
          </div>
          <div className="flex gap-3 py-[2px]">
            <div className="md:col-span-1 flex items-center justify-end">
              <button
                onClick={goBack}
                className="text-sm font-medium bg-[#1F284D] text-[#FFFFFF] px-5 py-[10px] rounded-lg"
              >
                Cancel
              </button>
            </div>
            <div className="md:col-span-1 flex items-center justify-end">
              <button
                onClick={handleSubmit}
                className="text-sm font-medium bg-gradient-to-r from-[#9E49F2] to-[#7000FF] text-[#FFFFFF] px-5 py-[10px] rounded-lg"
              >
                Save Upsell
              </button>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex min-w-[1440px] bg-[#E9ECF3]">
          <div className="flex flex-col items-center justify-start h-[90vh] min-w-[1440px] py-5 overflow-y-scroll">
            <Toaster position="top-center" reverseOrder={false} />
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-[1200px] max-w-7xl px-8 pt-8 bg-gradient-to-r from-[#FFFFFF] to-[#F4EBFF] shadow-md rounded-t-lg">
                <div className="md:col-span-1">
                  <div className="text-xl leading-5 font-semibold text-[#222222] mb-1">
                    Create Upsells
                  </div>
                  <p className="text-sm font-normal text-[#222222]">
                    Build your own upsell
                  </p>
                </div>
              </div>

              <div
                className="grid grid-cols-3 gap-10 pb-8 min-w-[1200px] max-w-7xl bg-gradient-to-r from-[#FFFFFF] to-[#F4EBFF] shadow-md pr-10 pl-8 rounded-b-lg"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="col-span-2">
                  <div className="flex items-center gap-10 mt-4 mb-5">
                    <div className="w-[240px] h-[120px] overflow-hidden">
                      {selectedImage ? (
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected"
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="border border-dashed border-[#E9ECF3] p-[5px] rounded-lg">
                          <div className="flex items-center justify-center w-full h-full px-10 py-[26px] bg-[#E9ECF3] rounded-md">
                            <div className="flex flex-col items-center gap-[10px]">
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_9473_795)">
                                  <path
                                    d="M20 10.6666H20.0133"
                                    stroke="#6F6883"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M16.6667 28H8C6.93913 28 5.92172 27.5786 5.17157 26.8284C4.42143 26.0783 4 25.0609 4 24V8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4H24C25.0609 4 26.0783 4.42143 26.8284 5.17157C27.5786 5.92172 28 6.93913 28 8V16.6667"
                                    stroke="#6F6883"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M4 21.3333L10.6667 14.6667C11.904 13.476 13.4293 13.476 14.6667 14.6667L20 20"
                                    stroke="#6F6883"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M18.6665 18.6666L19.9998 17.3333C20.8932 16.4746 21.9332 16.2346 22.9092 16.6133"
                                    stroke="#6F6883"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M21.3335 25.3334H29.3335"
                                    stroke="#6F6883"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M25.3335 21.3334V29.3334"
                                    stroke="#6F6883"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_9473_795">
                                    <rect width="32" height="32" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                              <span className="text-xs leading-[14px] font-medium text-[#222222]">
                                jpeg or png upto 2024 KB
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-base leading-5 font-medium text-[#222222] mb-3">
                        Product Image
                      </h3>
                      <p className="text-xs leading-5 font-normal text-[#222222] mb-6">
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
                        className="bg-[#F5F0FB] text-[#7000FF] text-sm font-medium px-5 py-[10px] rounded-lg cursor-pointer"
                      >
                        Upload Image
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col mb-7">
                    <div className="mb-5 col-span-full">
                      <label
                        htmlFor="title"
                        className="block text-xs font-medium text-[#222222] mb-[6px]"
                      >
                        Title<span className="text-[#AD0C0C]"> *</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="text-sm font-normal text-[#72767A] border border-[#E9ECF3] rounded-lg px-4 py-[13px] w-[560px] focus:outline-none transition duration-300"
                        placeholder="Enter title here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-5 col-span-full">
                      <label
                        htmlFor="shortDescription"
                        className="block text-xs font-medium text-[#222222] mb-[6px]"
                      >
                        Short description
                      </label>
                      <textarea
                        id="description"
                        className="text-sm font-normal text-[#72767A] border border-[#E9ECF3] rounded-lg px-4 py-[13px] w-[560px] h-[90px] focus:outline-none transition duration-300"
                        placeholder="Write Description here"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex gap-[10px]">
                      <div className="">
                        <label
                          htmlFor="price"
                          className="flex text-xs font-medium text-[#222222] mb-[6px]"
                        >
                          Price
                          <span className="text-[#AD0C0C] mr-[6px]"> *</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_9473_755)">
                              <path
                                d="M8.00016 1.33337C11.6822 1.33337 14.6668 4.31804 14.6668 8.00004C14.6682 9.75036 13.9812 11.431 12.7541 12.6791C11.527 13.9273 9.85826 14.6427 8.10818 14.6711C6.35809 14.6995 4.66706 14.0384 3.40016 12.8307C2.13327 11.623 1.39216 9.96548 1.33683 8.21604L1.3335 8.00004L1.33616 7.81337C1.43483 4.21804 4.38016 1.33337 8.00016 1.33337ZM8.00016 7.33337H7.3335L7.2555 7.33804C7.09346 7.35731 6.94413 7.43534 6.83577 7.55735C6.72742 7.67936 6.66757 7.83687 6.66757 8.00004C6.66757 8.16322 6.72742 8.32072 6.83577 8.44273C6.94413 8.56474 7.09346 8.64277 7.2555 8.66204L7.3335 8.66671V10.6667L7.33816 10.7447C7.35571 10.8935 7.42288 11.0321 7.52884 11.138C7.63479 11.244 7.77335 11.3112 7.92216 11.3287L8.00016 11.3334H8.66683L8.74483 11.3287C8.89364 11.3112 9.0322 11.244 9.13815 11.138C9.24411 11.0321 9.31128 10.8935 9.32883 10.7447L9.3335 10.6667L9.32883 10.5887C9.31289 10.4527 9.25545 10.3249 9.16432 10.2227C9.07319 10.1204 8.9528 10.0488 8.8195 10.0174L8.74483 10.004L8.66683 10V8.00004L8.66216 7.92204C8.64461 7.77323 8.57744 7.63467 8.47149 7.52872C8.36553 7.42276 8.22697 7.35559 8.07816 7.33804L8.00016 7.33337ZM8.00683 5.33337L7.92216 5.33804C7.76013 5.35731 7.61079 5.43534 7.50244 5.55735C7.39408 5.67936 7.33424 5.83687 7.33424 6.00004C7.33424 6.16322 7.39408 6.32072 7.50244 6.44273C7.61079 6.56474 7.76013 6.64277 7.92216 6.66204L8.00016 6.66671L8.08483 6.66204C8.24686 6.64277 8.3962 6.56474 8.50455 6.44273C8.61291 6.32072 8.67275 6.16322 8.67275 6.00004C8.67275 5.83687 8.61291 5.67936 8.50455 5.55735C8.3962 5.43534 8.24686 5.35731 8.08483 5.33804L8.00683 5.33337Z"
                                fill="#C6CBD5"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_9473_755">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </label>
                        <input
                          type="number"
                          id="price"
                          className="text-sm font-normal text-[#72767A] border border-[#E9ECF3] rounded-lg px-4 py-[13px] w-[180px] focus:outline-none transition duration-300"
                          placeholder="Price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <MoreSettings
                    attachedProperties={attachedProperties}
                    setAttachedProperties={setAttachedProperties}
                    fetchListingData={fetchListingData}
                  />
                </div>

                <div className="col-span-1">
                  <PhoneStructure
                    image={
                      selectedImage ? URL.createObjectURL(selectedImage) : ""
                    }
                    textContent={{
                      title: title,
                      description: shortDescription,
                      price: price,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateUpsell;
