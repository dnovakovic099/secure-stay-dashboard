"use client";
import React, { useState, useEffect } from "react";
import CommonDropdown from "@/components/commonDropdown";
import { Popover, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import { envConfig } from "@/utility/environment";
import axios from "axios";

const EditUpsell: React.FC = () => {
  const [upsellsData, setUpsellsData] = useState(null);
  const [listingIds, setListingIds] = useState(["1", "2", "3"]);

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [pricingModel, setPricingModel] = useState<any>(null);
  const [price, setPrice] = useState<any>(null);
  const [per, setPer] = useState<any>(null);
  const [period, setPeriod] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const searchParams = useSearchParams();
  const upsell_id = searchParams.get("upsell_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${envConfig.backendUrl}/upsell/listing?upSellId=${upsell_id}`; // Replace with your API endpoint
        const params = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const result: any = await handleApiCallFetch(apiUrl, params);
        console.log(result);
      } catch (error) {
        toast.error("Error occured");
        // Handle error
        // setUpsellsData(error);
      }
    };

    if (upsell_id) {
      fetchData();
    }
  }, [upsell_id]);

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

  const handleUpdateRequest = async (postData: any) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/upsell/update`;

      const response = await axios.put(apiUrl, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response here
      if (response.status === 200) {
        toast.success(`${response.data.message}`);
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
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("upSellId", "1");
    formData.append("title", title);
    formData.append("description", shortDescription);
    formData.append("price", price);
    formData.append("purchaseDate", "2080-04-10");
    formData.append("checkIn", "2080-04-10");
    formData.append("checkOut", "2080-04-10");
    formData.append("guestName", "2080-04-10");
    formData.append("timePeriod", "Always");

    listingIds.forEach((listingId, index) => {
      formData.append(`listingIds[${index}]`, listingId);
    });

    handleUpdateRequest(formData);
    // Add logic to handle form submission here
    console.log("Form Updated");
  };

  const solutions = [
    {
      name: "Delete",
      icon: IconOne,
    },
  ];
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl mb-4">
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
                          {solutions.map((item) => (
                            <a
                              key={item.name}
                              //   href={item.href}
                              className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                <item.icon aria-hidden="true" />
                              </div>
                              <div className="ml-2">
                                <p className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </p>
                              </div>
                            </a>
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
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl rounded-md bg-white shadow-md p-4 pl-10"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex items-start gap-8 mt-4">
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
          {/* </div> */}
        </div>
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
        <div className="flex items-center mb-10 col-span-full">
          <ChevronRightIcon className="w-6 h-6 text-blue-700" />
          <h6 className="text-blue-700 ml-2">More Settings</h6>
        </div>
        {/* Other form fields and components go here */}
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
        >
          Update Upsell
        </button>
      </div>
    </div>
  );
};
function IconOne() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

export default EditUpsell;
