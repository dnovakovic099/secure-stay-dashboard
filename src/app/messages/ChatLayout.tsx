import { customColorSet } from "@/components/customChatUi";
import {
  MainContainer,
  MessageList,
  MessageInput,
  MessageHeader,
  MinChatUiProvider,
} from "@minchat/react-chat-ui";
import { useEffect, useRef, useState } from "react";

const ChatLayout = ({ selectedData }: any) => {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello",
      user: {
        id: "mark",
        // name: "Markus",
      },
      timestamp: new Date(), // Example timestamp for the first message
    },
  ]);

  // Function to handle sending a new message
  const handleSendMessage = (newMessageText: any) => {
    // Construct the new message object with the user-typed message and sender
    const newMessage = {
      text: newMessageText,
      user: {
        id: "ba",
        name: "barani",
      },
      timestamp: new Date(), // Example timestamp for the first message
    };

    setIsTyping(true);
    setMessages([...messages, newMessage]);

    // Simulate a response from Joe after a short delay
    setTimeout(() => {
      const responseMessage = {
        text: newMessageText,
        user: {
          id: "mark",
          // name: "Markus",
        },
        timestamp: new Date(), // Example timestamp for the first message
      };
      setIsTyping(false);

      setMessages([...messages, newMessage, responseMessage]);
    }, 1000); // Delay of 1 second for the response
  };

  return (
    <div className="flex flex-col ">
      <div className="flex-1">
        <MessageHeader showBack>
          <div className="message-header">
            <div className="username">{selectedData?.name}</div>
            {selectedData?.lastSeen ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                
                <time dateTime={selectedData?.lastSeenDateTime}>
                  {selectedData?.lastSeen}
                </time>
              </p>
            ) : (
            //   <div className="mt-1 flex items-center gap-x-1.5">
            //     <div className="flex-none rounded-full bg-emerald-500/20 p-1">
            //       <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            //     </div>
            //     <p className="text-xs leading-5 text-gray-500">Online</p>
            //   </div>
            <p className="text-xs leading-5 text-gray-500">Online</p>
            )}
          </div>
        </MessageHeader>
        <MinChatUiProvider theme="#6ea9d7" colorSet={customColorSet}>
          <MainContainer>
            <div className="h-[520px] w-full">
              <MessageList
                showTypingIndicator={isTyping}
                mobileView={false}
                currentUserId={"ba"}
                messages={messages}
              />
            </div>
          </MainContainer>
        </MinChatUiProvider>
      </div>

      <MessageInput
        showSendButton={true}
        placeholder="Type message here"
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatLayout;
