import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { envConfig } from "@/utility/environment"; // Importing envConfig

const GuideBook = ({ selectedItem }: any) => {
  console.log(selectedItem);

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleChange1 = (e: any) => {
    setTitle(e.target.value);
  };

  const handleChange2 = (e: any) => {
    setDescription(e.target.value);
  };

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("listingId", selectedItem.listingId);

    try {
      const response = await fetch(`${envConfig.backendUrl}/guides/addGuides`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data, "----->>>");
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    handleClose();
  };

  return (
    <div className="mt-4">
      <div className="text-lg font-semibold text-gray-800 mb-4">
        Recommended Guidebooks
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex justify-start items-center">
          <PlusIcon className="h-4 w-4 mr-2 text-indigo-600" />
          <p
            className="text-base text-indigo-600 hover:text-indigo-700 cursor-pointer"
            onClick={handleOpen}
          >
            Add Guidance
          </p>
        </div>

        {open && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Add Guidance
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-800 hover:text-gray-600 focus:outline-none"
                >
                  &#x2715;
                </button>
              </div>

              <form
                onSubmit={handleSubmitForm}
                className="mb-6"
                encType="multipart/form-data"
              >
                <div>
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="photo"
                    accept="image/*"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleChange1}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChange2}
                    rows={3}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideBook;
