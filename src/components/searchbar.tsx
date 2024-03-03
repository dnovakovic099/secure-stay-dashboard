// import { useState } from "react";
// import {
//   BarsArrowDownIcon,
//   MagnifyingGlassIcon,
//   PlusIcon,
// } from "@heroicons/react/20/solid";

// import toast from "react-hot-toast";
// import { envConfig } from "@/utility/environment";
// import classNames from "classnames";

// function SearchBar() {
//   const [isLoading, setIsLoading] = useState(false);
//   const synchostawaylistings = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(
//         `${envConfig.backendUrl}/listing/synchostawaylistings`, // Correct template literal usage
//         {
//           cache: "no-cache",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       toast.success(data.message);
//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="m-4 flex h-16 flex-shrink-0 bg-white">
//       <div className=" flex flex-1 justify-between">
//         <div className="flex flex-1">
//           <div
//             className={classNames(
//               "ml-0",
//               "text-lg md:text-2xl lg:text-2xl font-bold m-auto flex items-center"
//             )}
//           >
//             <div className="pl-4 text-lg md:text-xl lg:text-2xl font-normal m-auto flex">
//               <div className="border-gray-600 sm:flex w-full">
//                 <div className="w-full">
//                   <div className="flex items-center gap-6">
//                     <h1 className="font-semibold">Listings</h1>
//                     <div className="flex rounded-md border">
//                       <div className="relative flex-grow focus-within:z-10">
//                         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                           <MagnifyingGlassIcon
//                             className="h-5 w-5 text-gray-200"
//                             aria-hidden="true"
//                           />
//                         </div>
//                         <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
//                           <BarsArrowDownIcon
//                             className="h-5 w-5 text-gray-100"
//                             aria-hidden="true"
//                           />
//                         </div>
//                         <input
//                           type="text"
//                           name="desktop-search-candidate"
//                           id="desktop-search-candidate"
//                           className="w-full rounded-md border-0 py-2 pl-10 pr-10 text-sm font-[500] leading-6 text-gray-200 bg-[#fff] placeholder-gray-400"
//                           placeholder="Search 22 listings"
//                           // onChange={(e) => handleSearch(e.target.value)}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-3 px-2">
//           <button
//             className={classNames(
//               "flex items-center justify-center gap-2 text-sm text-white font-semibold px-4 py-2 rounded-md",
//               "bg-gradient-to-r from-purple-600 to-indigo-500",
//               "border border-transparent hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             )}
//             onClick={synchostawaylistings}
//           >
//             {isLoading ? "Loading..." : <span>Fetch Listings</span>}
//           </button>
//           <button
//             className={classNames(
//               "flex items-center justify-center gap-2 text-sm text-white font-semibold px-4 py-2 rounded-md",
//               "bg-gradient-to-r from-purple-600 to-indigo-500",
//               "border border-transparent hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             )}
//             // onClick={() => handleButtonClick("create")}
//           >
//             <PlusIcon className="text-white h-6 w-6" aria-hidden="true" />
//             <span>Create Listing group</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SearchBar;

/* eslint-disable @next/next/no-img-element */
import { envConfig } from "@/utility/environment";
import {
  BarsArrowDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function SearchBar() {
  const [isLoading, setIsLoading] = useState(false);

  const synchostawaylistings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${envConfig.backendUrl}/listing/synchostawaylistings`,
        {
          cache: "no-cache",
        }
      );

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast.success(data.message);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-[#141b37]">
      <Toaster />
      <div className=" flex flex-1 justify-between">
        <div className="flex flex-1">
          <div
            className={classNames(
              "ml-0",
              "text-lg md:text-2xl lg:text-2xl font-bold m-auto flex items-center"
            )}
          >
            <div className="pl-4 text-lg md:text-xl lg:text-2xl font-normal m-auto flex">
              <div className="border-gray-600 sm:flex w-full">
                <div className="w-full">
                  <div className="flex rounded-md shadow-sm">
                    <div className="relative flex-grow focus-within:z-10">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 text-gray-200"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
                        <BarsArrowDownIcon
                          className="h-5 w-5 text-gray-100"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="text"
                        name="desktop-search-candidate"
                        id="desktop-search-candidate"
                        className="w-full rounded-md border-0 py-2 pl-10 pr-10 text-sm font-[500] leading-6 text-gray-200 bg-[#1f284d] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
                        placeholder="Search 22 listings"
                        // onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2">
          <div
            className="flex gap-2.5 justify-between px-5 py-2.5 text-sm font-medium tracking-normal leading-5 text-white whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 cursor-pointer"
            onClick={synchostawaylistings}
          >
            <div className="grow my-auto">
              {isLoading ? "Loading..." : "Fetch Listings"}
            </div>
          </div>

          <div className="flex gap-2.5 justify-between px-5 py-2.5 text-sm font-medium tracking-normal leading-5 text-white whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 cursor-pointer">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a971b930b3355079e1b22cea4dd76cfe3d51e1474e8aaa0efccd679d3be2646e?"
              className="w-5 aspect-square"
              alt="icon"
            />
            <div className="grow my-auto">Create Listing group</div>
          </div>

          <div className="flex justify-center items-center px-3 w-10 h-10 rounded-lg aspect-square bg-blue-950">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1b0151a5a474592c3576693bdbb89d1d53bb7e4a868bac7d0e83febcc2c7f528?"
              className="w-full aspect-square"
              alt="icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
