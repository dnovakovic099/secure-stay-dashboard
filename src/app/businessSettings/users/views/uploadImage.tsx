"user client";
import React from "react";
import { UserIcon } from "@heroicons/react/20/solid";

interface UploadImageProps {
  imageUrl: any;
  setImageUrl: any;
}

const UploadImage = ({ imageUrl, setImageUrl }: UploadImageProps) => {
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="col-span-4">
      <div className="mt-8 flex justify-center items-center">
        <label className="upload-label cursor-pointer">
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            onChange={handleImageUpload}
          />
          <div className="relative h-52 w-52 border-1 border-line border-gray-200 rounded-md overflow-hidden transition duration-300 hover:border-indigo-500 flex flex-col items-center justify-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                className="h-full w-full object-cover rounded-md"
                alt="User Avatar"
              />
            ) : (
              <>
                <div className="flex items-center justify-center h-full w-full text-gray-500 bg-gray-200 rounded-md">
                  <UserIcon color="white" className="h-[90px] w-[90px]" />
                </div>
                <div className="absolute text-xs text-gray-500 bottom-2 left-0 right-0 text-center">
                  Upload an Image
                </div>
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default UploadImage;
