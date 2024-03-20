// "use client";

// import Lock from "./lock";
// import classNames from "classnames";
// import Sidebar from "@/components/NewSideBar";
// import { Toaster } from "react-hot-toast";

// const MainMessageScreen = () => {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex flex-col flex-1 overflow-hidden bg-[#f5f7f8]">
//         <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-[#141b37]">
//           <Toaster />
//           <div className=" flex flex-1 justify-between">
//             <div className="flex flex-1">
//               <div
//                 className={classNames(
//                   "ml-0",
//                   "text-lg md:text-2xl lg:text-2xl font-bold m-auto flex items-center"
//                 )}
//               >
//                 <div className="pl-4 text-lg md:text-xl lg:text-2xl font-normal m-auto flex">
//                   <div className="border-gray-600 sm:flex w-full">
//                     <div className="w-full">
//                       <div className="flex rounded-md shadow-sm"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <main className="flex-1 overflow-y-auto">
//           <Lock />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainMessageScreen;

// MainMessageScreen.js
import React from "react";
import classNames from "classnames";
import Sidebar from "@/components/NewSideBar";
import { Toaster } from "react-hot-toast";
import Lock from "./lock";

const MainMessageScreen = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden bg-[#f5f7f8]">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-[#141b37]">
          <Toaster />
          <div className="flex flex-1 justify-between">
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
                      <div className="flex rounded-md shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto">
          <Lock />
        </main>
      </div>
    </div>
  );
};

export default MainMessageScreen;
