/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { envConfig } from "@/utility/environment"; // Importing envConfig
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { Gi3DStairs } from "react-icons/gi";
// import Default from "../../../assets/6306486.svg";
import Defaults from "../../../assets/default.jpg";
import Image from "next/image";

const GuideBook = ({ selectedItem }: any) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [guideBook, setGuideBook] = useState(selectedItem.guideBook);
  const [selectedGuideBook, setSelectedGuideBook] = useState<any>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
    setImage("");
    setImagePreview("");
    setSelectedGuideBook(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = () => {
    document.getElementById("image")?.click();
  };

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(
      `${window.location.href}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdefault.1c53a63f.jpg&w=3840&q=75`
    );
    const blob = await response.blob();
    const jpgFile = new File([blob], "default.jpg", {
      type: "image/jpeg",
      lastModified: Date.now(),
    });

    const formData = new FormData();
    formData.append("photo", image || jpgFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("listingId", selectedItem.listingId);

    console.log(formData.get("photo"));

    try {
      let response;
      if (selectedGuideBook) {
        formData.append("id", selectedGuideBook.id);
        response = await fetch(
          `${envConfig.backendUrl}/guides/updateGuides/${selectedGuideBook.id}`,
          {
            method: "PUT",
            body: formData,
          }
        );
      } else {
        response = await fetch(`${envConfig.backendUrl}/guides/addGuides`, {
          method: "POST",
          body: formData,
        });
      }

      if (response.ok) {
        const data = await response.json();
        if (selectedGuideBook) {
          setGuideBook((prevGuideBooks: any) =>
            prevGuideBooks.map((guideBookItem: any) =>
              guideBookItem.id === selectedGuideBook.id ? data : guideBookItem
            )
          );
        } else {
          setGuideBook([...guideBook, data]);
        }
        handleClose();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditGuideBook = (guideBook: any) => {
    setTitle(guideBook.title);
    setDescription(guideBook.description);
    setSelectedGuideBook(guideBook);

    if (
      typeof guideBook.photo === "object" &&
      guideBook.photo instanceof File
    ) {
      console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set the image preview
      };
      reader.readAsDataURL(guideBook.photo);
    } else if (typeof guideBook.photo === "string") {
      setImagePreview(guideBook.photo);
    }
    setOpen(true);
  };

  const handleDeleteGuideBook = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this guidebook?")) {
      try {
        const response = await fetch(
          `${envConfig.backendUrl}/guides/DeleteGuides/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setGuideBook(guideBook.filter((book: any) => book.id !== id));
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <div className="mt-4">
      <div className="text-lg font-semibold text-gray-800 mb-4">
        Recommended Guidebooks
      </div>
      <div className="flex flex-col">
        {guideBook.map(({ id, title, description, photo }: any) => {
          return (
            <div
              key={id}
              className="bg-white shadow-md rounded-md p-4 mb-4 flex"
            >
              <div className="w-1/4 mr-4 flex items-center justify-center">
                <img
                  src={`${envConfig.backendUrl}/${photo}`}
                  alt={title}
                  className="w-full h-auto rounded-md"
                />
              </div>
              <div className="w-3/4 flex flex-col justify-between">
                <div>
                  <h1 className="text-xl font-semibold mb-2">{title}</h1>
                  <p className="text-gray-600 overflow-hidden overflow-ellipsis whitespace-pre-wrap break-words max-h-24">
                    {description}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <GoPencil
                    type="button"
                    className="bg-slate-200 text-black text-4xl p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600 cursor-pointer"
                    onClick={() =>
                      handleEditGuideBook({ id, title, description, photo })
                    }
                  />
                  <MdDelete
                    type="button"
                    className="bg-slate-200	text-black text-4xl p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600 cursor-pointer"
                    onClick={() => handleDeleteGuideBook(id)}
                  />
                </div>
              </div>
            </div>
          );
        })}

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
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
            <form
              className="w-[80vw] min-h-[90vh] max-h-[95vh] bg-white p-4 rounded-lg shadow-lg overflow-y-auto"
              onSubmit={handleSubmitForm}
            >
              <div className="flex flex-col">
                <div className="flex gap-5 justify-between px-10 py-3.5 w-full font-bold whitespace-nowrap border-b border-gray-200 border-solid max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                  <div className="flex gap-4 my-auto text-lg tracking-tight text-stone-900">
                    <Gi3DStairs className="shrink-0 my-auto w-4 aspect-square" />
                    <div className="grow">Guidebook</div>
                  </div>
                </div>
                <div className="flex flex-col self-center px-4 pt-3 mt-5 w-full max-w-[960px] max-md:max-w-full">
                  <div className="flex flex-col justify-center text-3xl font-bold tracking-tighter text-white whitespace-nowrap bg-white max-md:max-w-full">
                    <div className="overflow-hidden relative flex-col items-start pb-4 w-full min-h-[500px] max-md:pt-10 max-md:pr-5 max-md:max-w-full">
                      {imagePreview ? (
                        <img
                          loading="lazy"
                          src={
                            image
                              ? imagePreview
                              : `${envConfig.backendUrl}/${imagePreview}`
                          }
                          className="object-contain w-full h-[500px] max-md:h-[200px] rounded-lg border border-gray-200"
                          alt="Preview"
                        />
                      ) : (
                        <Image
                          loading="lazy"
                          src={Defaults}
                          className="object-contain w-full h-[500px] max-md:h-[200px] rounded-lg border border-gray-200"
                          alt="Placeholder"
                        />
                      )}
                      <input
                        type="file"
                        id="image"
                        name="photo"
                        accept="image/*"
                        className="hidden"
                        onChange={handleChange}
                      />
                      <div className="absolute inset-0 flex justify-end items-end p-5">
                        <GoPencil
                          type="button"
                          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600 cursor-pointer"
                          onClick={handleEditImage}
                        />
                      </div>
                    </div>
                  </div>

                  <label className="mt-16 text-lg font-bold tracking-tight text-stone-900 max-md:mt-10 max-md:max-w-full">
                    TITLE
                  </label>
                  <input
                    required
                    type="text"
                    className="justify-center items-start py-4 pr-16 pl-4 mt-3 max-w-full text-base leading-6 whitespace-nowrap bg-white rounded-xl border border-solid border-stone-300 text-stone-500 w-[480px] max-md:pr-5"
                    placeholder="Parking Instructions"
                    value={title}
                    onChange={handleChange1}
                  />
                  <label className="mt-16 text-lg font-bold tracking-tight text-stone-900 max-md:mt-10 max-md:max-w-full">
                    DESCRIPTION
                  </label>
                  <textarea
                    required
                    className="flex flex-col justify-between px-4 py-4 mt-3 bg-white rounded-xl border border-solid border-stone-300 max-md:mb-10 max-md:max-w-full resize-none overflow-y-auto"
                    rows={3}
                    placeholder="Welcome to our property! We're glad to have you as our guest. For parking, please park in the driveway, in the spots behind the property, or in the half-circle at the front of the property. Please do not park on the street in front of the property."
                    value={description}
                    onChange={handleChange2}
                  ></textarea>

                  <div className="flex gap-5 justify-between px-10 py-3.5 mt-3 w-full font-bold whitespace-nowrap max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                    <div className="flex gap-4 my-auto text-lg tracking-tight text-stone-900"></div>
                    <div className="flex gap-2 text-sm tracking-wide leading-5">
                      <div className="flex flex-col flex-1 justify-center px-4 py-2.5 text-white bg-emerald-600 rounded-3xl">
                        <button
                          type="button"
                          className="justify-center bg-emerald-600"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="flex flex-col flex-1 justify-center px-6 py-2.5 bg-lime-50 rounded-3xl text-stone-900 max-md:px-5">
                        <button
                          type="submit"
                          className="justify-center bg-lime-50"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideBook;
