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
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-start h-[90vh] w-[100%] rounded-md pt-5 overflow-y-scroll">
          <Toaster position="top-center" reverseOrder={false} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl py-5 px-5 bg-white">
            <div className="md:col-span-1">
              <div className="text-xl font-extrabold mb-1">Edit Upsells</div>
              <p className="text-sm  text-gray-500 ">Build your own upsell</p>
            </div>

            <div className="md:col-span-1 flex items-center justify-end">
              <button
                onClick={handleUpdate}
                className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
              >
                Update Upsell
              </button>
              <div className="ml-5">
                {" "}
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={`
    ${open ? "text-white" : "text-white/90"}
    group inline-flex items-center justify-center rounded-full bg-gray-500 w-8 h-8 text-base font-bold hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                        style={{ borderRadius: "50%" }}
                      >
                        <span className="mb-2">...</span>
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

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl bg-white pl-10"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* <div className="flex items-start gap-8 mt-4">
          <div className="border-2 border-gray-200 rounded-md w-40 h-25 overflow-hidden">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-12 w-12 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            )}
          </div>
          <div>
            <div className="text-s font-bold text-gray-800 mb-1">
              Product Image
            </div>
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
          </div>
       
        </div> */}
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  required
                />
              </div>
              {/* <div className="mb-2 col-span-full">
          <label
            htmlFor="shortDescription"
            className="block text-gray-700  mb-2"
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
              <div className="mb-4 col-span-full">
                <label htmlFor="title" className="block text-gray-700 mb-2">
                  Price<span className="text-red-700 px-1">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  className="border-2 border-gray rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              {/* <div className="grid grid-cols-1 md:grid-cols-3 mb-2 col-span-full gap-5 ">
          <div className="mb-2">
            <label
              htmlFor="shortDescription"
              className="block text-gray-700  mb-2"
            >
              Price<span className="text-red-700 px-2">*</span>
            </label>
            <CommonDropdown menuItems={myMenuItems} onClick={handlePrice} />
          </div>
          <div className="mb-2">
            <label
              htmlFor="shortDescription"
              className="block text-gray-700  mb-2"
            >
              Per
            </label>
            <CommonDropdown menuItems={myPerItems} onClick={handlePer} />
          </div>
          <div className="mb-2">
            <label
              htmlFor="shortDescription"
              className="block text-gray-700  mb-2"
            >
              Period
            </label>
            <CommonDropdown menuItems={myPeriodItems} onClick={handlePeriod} />
          </div>
        </div> */}
              <div className="container mx-auto p-4">
                <MoreSettings
                  attachedProperties={attachedProperties}
                  setAttachedProperties={setAttachedProperties}
                  fetchListingData={fetchListingData}
                />
              </div>
            </div>
            {/* Other form fields and components go here */}
            <div className="md:col-span-1">
              <PhoneStructure
                image={selectedImage ? URL.createObjectURL(selectedImage) : ""}
                textContent={{
                  title: title,
                  description: shortDescription,
                  price: price,
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl p-5 rounded-b-md bg-white">
            <div className="md:col-span-1"></div>

            <div className="md:col-span-1 flex items-center justify-end ">
              <button
                onClick={handleUpdate}
                className="bg-indigo-700 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
              >
                Update Upsell
              </button>
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default EditUpsell;
