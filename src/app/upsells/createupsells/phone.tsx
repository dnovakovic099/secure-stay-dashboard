import React from "react";

interface PhoneStructureProps {
  image: string;
  textContent: {
    title: string;
    description: string;
    price: string;
  };
}

const PhoneStructure: React.FC<PhoneStructureProps> = ({
  image,
  textContent,
}) => {
  return (
    <div className="flex justify-center w-[16rem] h-[532px] bg-[#141B37] border-2 border-gray-700 rounded-[2.5rem] overflow-hidden shadow-lg mx-10">
      <div className="relative w-[15rem] border-2 rounded-[2rem] h-[514px] my-2 bg-white">
        {/* Top bezel */}
        <div className="h-6 flex justify-center items-center">
          <div className="bg-gray-900 w-14 h-4 rounded-full"></div>
        </div>

        {/* Screen content */}
        <div className="flex-1 justify-start bg-white overflow-hidden px-2">
          <div className="text-indigo-700 text-sm mb-2">
            Available Add-on service
          </div>
          <div>
            <img
              src={image || "path_to_default_image.jpg"}
              alt="Mobile Image"
              className={`w-full h-32 rounded-md${
                image ? "" : " border-2 border-gray-300"
              }`}
            />
          </div>
          <div className="item-start mt-4">
            <h1 className="text-sm font-bold mb-2 text-black">
              {textContent.title || "Title"}
            </h1>
            <p
              className="text-xs text-black mb-3 leading-snug"
              style={{
                overflowWrap: "break-word",
                wordWrap: "break-word",
                maxWidth: "100%",
              }}
            >
              {textContent.description || "Description goes here"}
            </p>
            <p className="text-sm text-black mb-3">
              {textContent.price ? (
                <>
                  <span className="text-green-400 font-semibold">
                    {textContent.price}
                  </span>{" "}
                  Per Booking One Time
                </>
              ) : (
                <>
                  <span className="text-green-400 font-semibold">1</span> Per
                  Booking One Time
                </>
              )}
            </p>
            <button
              className=" absolute bottom-6 bg-indigo-700 text-white px-2 py-2 mt-5 w-[14rem] rounded-md hover:bg-blue-600 transition-all duration-300 border-2 border-blue-700 "
            >
              Purchase
            </button>
          </div>
        </div>
        <div className="absolute h-4 flex justify-center items-center right-[38%] bottom-0">
          <div className="bg-gray-900 w-16 h-1 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PhoneStructure;
