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
            {image ? (
              <img
                src={image}
                alt="Selected"
                className="w-full h-[120px] object-cover rounded-md"
              />
            ) : (
              <div className="border border-dashed border-[#E9ECF3] p-[5px] rounded-lg">
                <div className="flex items-center justify-center w-full h-full px-6 py-[26px] bg-[#E9ECF3] rounded-md">
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
            <button className=" absolute bottom-6 bg-indigo-700 text-white px-2 py-2 mt-5 w-[14rem] rounded-md hover:bg-blue-600 transition-all duration-300 border-2 border-blue-700 ">
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
