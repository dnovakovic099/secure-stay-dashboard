import { useState } from "react";
import UserUi from "./userUi";
import UserInfo from "./userInfo";
import ChatLayout from "./ChatLayout";

const MessageLayout = () => {
  const [selectedData, setSelectedData] = useState();

  return (
    // <div className="flex flex-col justify-center p-4 h-[100%] rounded-md">
    //   <div className="flex flex-row gap-2 h-[100%] w-full">
    //     {/* Column 1 - Setting nav */}
    //     <div className="w-[25%]  sm: 350px md: 1024px lg: 1440px  xl: 1536px">
    //       <h2 className="text-xl font-bold text-blue-900">Messages</h2>

    //       <UserUi setSelectedData={setSelectedData} />
    //     </div>

    //     {/* Column 2 - page components */}

    //     <div className="w-full border-l border-gray-300 sm: 350px md: 1024px lg: 1440px  xl: 1536px">
    //       <ChatLayout selectedData={selectedData} />
    //     </div>

    //     {/* Column 3 - page components */}
    //     <div className="w-full border-l border-gray-300 sm: 350px md: 1024px lg: 1440px  xl: 1536px">
    //       {selectedData && <UserInfo selectedData={selectedData} />}
    //     </div>
    //   </div>
    // </div>

    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 sm:col-span-6 md:col-span-2  w-full border-l border-gray-300">
        <UserUi setSelectedData={setSelectedData} />
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-5 w-full border-l border-gray-300">
        <ChatLayout selectedData={selectedData} />
      </div>
      <div className=" col-span-12 sm:hidden md:block lg:block xl:block  md:col-span-5 w-full border-l border-gray-300 ">
        {selectedData && <UserInfo selectedData={selectedData} />}
      </div>
    </div>
  );
};
export default MessageLayout;
