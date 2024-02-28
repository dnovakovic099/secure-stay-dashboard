"use client";
import React, { useState, useEffect } from "react";

import { Toaster, toast } from "react-hot-toast";
import { CameraIcon } from "@heroicons/react/20/solid";
import { envConfig } from "@/utility/environment";
import axios from "axios";
import MoreSettings from "./moresettings";
import { useRouter, useSearchParams } from "next/navigation";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import PhoneStructure from "./phone";
import Loader from "../loading";

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
    <div className="flex flex-col items-center justify-start h-[90vh] w-[100%] rounded-md pt-5 overflow-y-scroll">
      <Toaster position="top-center" reverseOrder={false} />

      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl p-5 bg-white shadow-md rounded-t-xl ">
            <div className="md:col-span-1">
              <div className="text-xl font-extrabold mb-1">Create Upsells</div>
              <p className="text-sm  text-gray-500 ">Build your own upsell</p>
            </div>

            <div className="md:col-span-1 flex items-center justify-end">
              <button
                onClick={handleSubmit}
                className="bg-indigo-700 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
              >
                Save Upsell
              </button>
            </div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 w-[100%] max-w-6xl bg-white shadow-md pr-10 pl-10"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <MoreSettings
                attachedProperties={attachedProperties}
                setAttachedProperties={setAttachedProperties}
                fetchListingData={fetchListingData}
              />
            </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl p-5 rounded-b-md bg-white">
            <div className="md:col-span-1"></div>

            <div className="md:col-span-1 flex items-center justify-end ">
              <button
                onClick={handleSubmit}
                className="bg-indigo-700 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
              >
                Save Upsell
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateUpsell;
