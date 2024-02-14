import { useState } from "react";
import UserUi from "./userUi";
import UserInfo from "./userInfo";
import ChatLayout from "./ChatLayout";

const MessageLayout = () => {
  const [selectedData, setSelectedData] = useState();

  return (
    <div className="flex flex-col justify-center p-4 h-[100%] rounded-md">
      <div className="flex flex-row gap-2 h-[100%] w-full">
        {/* Column 1 - Setting nav */}
        <div className="w-[25%]">
          <h2 className="text-xl font-bold text-blue-900">Messages</h2>

          <UserUi setSelectedData={setSelectedData} />
        </div>

        {/* Column 2 - page components */}

        <div className="w-full border-l border-gray-300 ">
          <ChatLayout selectedData={selectedData} />
        </div>

        {/* Column 3 - page components */}
        <div className="w-full border-l border-gray-300">
          {selectedData && <UserInfo selectedData={selectedData} />}
        </div>
      </div>
    </div>
  );
};
export default MessageLayout;
