"use client";
import React, { useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import { envConfig } from "@/utility/environment";
import axios from "axios";
import MoreSettings from "./moresettings";
import { Property } from "./createUpsells";
import { useRouter } from "next/navigation";
import PhoneStructure from "./phone";
import Loader from "../loading";

const EditUpsell: React.FC = () => {
  const emptyProperties: Property[] = [];
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [price, setPrice] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [attachedProperties, setAttachedProperties] = useState(emptyProperties);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const upsell_id = searchParams.get("upsell_id");

  const goBack = () => {
    router.push("/upsells");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${envConfig.backendUrl}/upsell?upSellId=${upsell_id}`;
        // Replace with your API endpoint
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

    if (upsell_id) {
      console.log(upsell_id);

      fetchData();
      fetchListingData();
    }
  }, [upsell_id]);

  const fetchAssociatedListing = async (id: string) => {
    const apiUrl = `${envConfig.backendUrl}/upsell/listing?upSellId=${id}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    setIsLoading(true);
    const result: any = await handleApiCallFetch(apiUrl, params);
    setIsLoading(false);
    setAttachedProperties((prevProperties) =>
      prevProperties?.map((property) => {
        const updatedProperty = result.data?.find(
          (item: any) => item.id === property.id
        );
        return updatedProperty
          ? { ...property, status: 1 }
          : { ...property, status: 0 };
      })
    );
  };

  const fetchListingData = async () => {
    try {
      const apiUrl = `${envConfig.backendUrl}/listing/getlistings`; // Replace with your API endpoint
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const result: any = await handleApiCallFetch(apiUrl, params);

      // Handle successful data fetch
      setAttachedProperties(
        result.listings?.map((property: any) => ({ ...property, status: 1 }))
      );
      fetchAssociatedListing(upsell_id!);
      // setTotalData(result.listings.length);
    } catch (error) {
      toast.error("Error occured");
      // Handle error
    }
  };

  const handleUpdateRequest = async (postData: any) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/upsell/update`;
      setIsLoading(true);
      const response = await axios.put(apiUrl, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response here
      if (response.status === 200) {
        // toast.success(`${response.data.message}`);
        setIsLoading(false);
        goBack();
        return;
      }
      setIsLoading(false);
      toast.error(`${response.data.message}`);
      return;
    } catch (error: any) {
      setIsLoading(false);
      toast.error(`${error.message}`);
      // Handle the error here
      console.error(error);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("upSellId", upsell_id!);
    formData.append("title", title);
    formData.append("description", shortDescription);
    formData.append("price", price);

    attachedProperties.forEach((property, index) => {
      if (property.status == 1) {
        formData.append(`listingIds[${index}]`, property.listingId.toString());
      }
    });

    handleUpdateRequest(formData);
    // Add logic to handle form submission here
    console.log("Form Updated");
  };

  const handleRequest = async (method: string, uri: string, data?: any) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/${uri}`;

      setIsLoading(true);
      const response = await axios({
        method,
        url: apiUrl,
        data,
        headers: {
          "Content-Type": "application/form-data",
        },
      });

      setIsLoading(false);
      goBack();
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
      // Handle errors here
      console.error("Error making request:", error.message);
    }
  };
  const handleDelete = () => {
    handleRequest("DELETE", `upsell/delete?upSellId=${upsell_id}`, {});
  };
  const solutions = [
    {
      name: "Delete",
      icon: TrashIcon,
      onclick: handleDelete,
    },
  ];

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

  return (
    <div>
      <div className="flex items-center bg-[#141B37] h-[60px] min-w-[1440px]">
        <div className="flex justify-between items-center w-full px-5 py-2">
          <div className="flex items-center justify-between min-w-[200px]">
            <img
              src="/assets/securestay.png "
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
              <div className="md:col-span-1 flex items-center gap-3 justify-end">
                <button
                  onClick={handleUpdate}
                  className="text-sm font-medium bg-gradient-to-r from-[#9E49F2] to-[#7000FF] text-[#FFFFFF] px-5 py-[10px] rounded-lg"
                >
                  Update Upsell
                </button>
                <div className="flex items-center h-10">
                  <Popover className="relative h-10">
                    {({ open }) => (
                      <>
                        <Popover.Button>
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="40"
                              height="40"
                              rx="8"
                              fill="#1F284D"
                            />
                            <g clipPath="url(#clip0_9473_1818)">
                              <path
                                d="M19.3333 20C19.3333 20.1769 19.4035 20.3464 19.5285 20.4714C19.6535 20.5965 19.8231 20.6667 19.9999 20.6667C20.1767 20.6667 20.3463 20.5965 20.4713 20.4714C20.5963 20.3464 20.6666 20.1769 20.6666 20C20.6666 19.8232 20.5963 19.6537 20.4713 19.5286C20.3463 19.4036 20.1767 19.3334 19.9999 19.3334C19.8231 19.3334 19.6535 19.4036 19.5285 19.5286C19.4035 19.6537 19.3333 19.8232 19.3333 20Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M19.3333 24.6667C19.3333 24.8435 19.4035 25.013 19.5285 25.1381C19.6535 25.2631 19.8231 25.3333 19.9999 25.3333C20.1767 25.3333 20.3463 25.2631 20.4713 25.1381C20.5963 25.013 20.6666 24.8435 20.6666 24.6667C20.6666 24.4899 20.5963 24.3203 20.4713 24.1953C20.3463 24.0702 20.1767 24 19.9999 24C19.8231 24 19.6535 24.0702 19.5285 24.1953C19.4035 24.3203 19.3333 24.4899 19.3333 24.6667Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M19.3333 15.3333C19.3333 15.5101 19.4035 15.6797 19.5285 15.8047C19.6535 15.9297 19.8231 16 19.9999 16C20.1767 16 20.3463 15.9297 20.4713 15.8047C20.5963 15.6797 20.6666 15.5101 20.6666 15.3333C20.6666 15.1565 20.5963 14.9869 20.4713 14.8619C20.3463 14.7369 20.1767 14.6666 19.9999 14.6666C19.8231 14.6666 19.6535 14.7369 19.5285 14.8619C19.4035 14.9869 19.3333 15.1565 19.3333 15.3333Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_9473_1818">
                                <rect
                                  width="16"
                                  height="16"
                                  fill="white"
                                  transform="translate(12 12)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </Popover.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-5"
                        >
                          <Popover.Panel className="absolute right-1 z-20 mt-2 w-screen max-w-sm translate-x-1 transform px-4 sm:px-0 lg:max-w-1sm">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                              <div className="relative grid gap-1 bg-white p-2 lg:grid-cols-1">
                                {solutions?.map((item) => (
                                  <button
                                    key={item.name}
                                    onClick={handleDelete}
                                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                                  >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                      <item.icon
                                        aria-hidden="true"
                                        className="w-8 h-8 text-red-700"
                                      />
                                    </div>
                                    <div className="ml-2">
                                      <p className="text-sm font-medium text-gray-900">
                                        {item.name}
                                      </p>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              </div>
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
                    Edit Upsells
                  </div>
                  <p className="text-sm font-normal text-[#222222]">
                    Build your own upsell
                  </p>
                </div>
              </div>
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 min-w-[1200px] max-w-7xl bg-gradient-to-r from-[#FFFFFF] to-[#F4EBFF] shadow-md pr-10 pl-8 rounded-b-lg"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="md:col-span-2">
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
                        placeholder="Title"
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
                <div className="md:col-span-1">
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

export default EditUpsell;
