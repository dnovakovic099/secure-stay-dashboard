import { customColorSet } from '@/components/customChatUi';
import {
  MainContainer,
  MessageList,
  MessageInput,
  MessageHeader,
  MinChatUiProvider,
} from '@minchat/react-chat-ui';
import { useEffect, useRef, useState } from 'react';

const ChatLayout = ({ selectedData }: any) => {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: 'Hello',
      user: {
        id: 'mark',
        // name: "Markus",
      },
      timestamp: new Date(), // Example timestamp for the first message
    },
    {
      text: 'Hi',
      user: {
        id: 'ba',
        name: 'barani',
      },
      timestamp: new Date(),
    },
  ]);

  // Function to handle sending a new message
  const handleSendMessage = (newMessageText: any) => {
    // Construct the new message object with the user-typed message and sender
    const newMessage = {
      text: newMessageText,
      user: {
        id: 'ba',
        name: 'barani',
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
          id: 'mark',
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
        <MinChatUiProvider theme="#6ea9d7" colorSet={customColorSet}>
          <MainContainer>
            <div className="h-[520px] w-full">
              <MessageList
                // showTypingIndicator={isTyping}
                mobileView={false}
                currentUserId={'ba'}
                messages={messages}
              />
            </div>
          </MainContainer>
        </MinChatUiProvider>
      </div>

      {/* <MessageInput
        showSendButton={true}
        placeholder="Type message here"
        onSendMessage={handleSendMessage}
      /> */}
    </div>
  );
};

export default ChatLayout;
