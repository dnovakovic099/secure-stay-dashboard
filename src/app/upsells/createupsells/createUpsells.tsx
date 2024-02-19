"use client";
import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import CommonDropdown from "@/components/commonDropdown";
import { Toaster, toast } from "react-hot-toast";
import { CameraIcon } from "@heroicons/react/20/solid";
import { envConfig } from "@/utility/environment";

const CreateUpsell: React.FC = () => {
  const myMenuItems = [
    { id: 1, item: "Standard Pricing" },
    { id: 2, item: "Based on number of nights" },
    { id: 3, item: "Based on Booking open" },
  ];

  const myPerItems = [
    { id: 1, item: "Guest" },
    { id: 2, item: "item" },
    { id: 3, item: "Adult" },
  ];

  const myPeriodItems = [
    { id: 1, item: "One Time" },
    { id: 2, item: "Daily" },
  ];
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [pricingModel, setPricingModel] = useState<any>(null);
  const [price, setPrice] = useState<any>(myMenuItems[0]);
  const [per, setPer] = useState<any>(null);
  const [period, setPeriod] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePricingModel = (selectedItem: any) => {
    setPricingModel(selectedItem.id);
  };
  const handlePrice = (selectedItem: any) => {
    setPrice(selectedItem.id);
  };
  const handlePer = (selectedItem: any) => {
    setPer(selectedItem.id);
  };
  const handlePeriod = (selectedItem: any) => {
    setPeriod(selectedItem.id);
  };

  const handlePostRequest = async (postData: any) => {
    console.log(postData);

    try {
      const apiUrl = `${envConfig.backendUrl}`;

      const response = await fetch(`${apiUrl}/saveupsell`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        toast.error("Network response was not ok");
        throw new Error("Network response was not ok");
      }

      // Handle the successful response here
      const responseData = await response.json();
      toast.success("This is a success message!");
      console.log("Response data:", responseData);
    } catch (error: any) {
      toast.error("Error making POST request:", error.message);
      // Handle errors here
      console.error("Error making POST request:", error.message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(price, per, title, shortDescription, period);
    console.log(selectedImage);

    handlePostRequest({ price: price, per: per });
    // Add logic to handle form submission here
    console.log("Form Submitted");
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

  return (
    <div className="flex flex-col justify-center h-[100%] rounded-md ml-auto mr-auto mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl mb-4 ">
        <div className="md:col-span-1">
          <div className="text-xl font-extrabold mb-1">Create Upsells</div>
          <p className="text-sm  text-gray-500 ">Build your own upsell</p>
        </div>

        <div className="md:col-span-1 flex items-center justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
          >
            Save Upsell
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl rounded-md bg-white shadow-md p-4 pl-10"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex items-center gap-8 mt-4">
          <div className="w-40 h-25 overflow-hidden">
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
          </div>
          <div>
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
          </div>
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

        <div className="mb-2 col-span-full">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mb-2 col-span-full gap-5 ">
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
        </div>
        <div className="flex items-center mb-10 col-span-full">
          <ChevronRightIcon className="w-6 h-6 text-blue-700" />
          <h6 className="text-blue-700 ml-2">More Settings</h6>
        </div>
        {/* Other form fields and components go here */}
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 mb-4"
        >
          Save Upsell
        </button>
      </div>
    </div>
  );
};

export default CreateUpsell;
