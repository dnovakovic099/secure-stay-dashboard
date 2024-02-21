import { customColorSet } from "@/components/customChatUi";
import {
  MainContainer,
  MessageList,
  MessageInput,
  MessageHeader,
  MinChatUiProvider,
} from "@minchat/react-chat-ui";
import { useEffect, useRef, useState } from "react";
import { MinChatUI } from "@minchat/reactui";
import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
} from "mdb-react-ui-kit";
import Image from "next/image";

const sampleJSON = {
  accountId: 10450,
  listingMapId: 40160,
  reservationId: 2,
  conversationId: 1406,
  communicationId: null,
  airbnbThreadMessageId: null,
  body: "hello guest",
  communicationType: "email",
  status: "sent",
  isIncoming: 0,
  isSeen: 0,
  sentUsingHostaway: 0,
  hash: "299855b5f40bd4e65fd83e5382a571e2",
  listingTimeZoneName: "Europe/Moscow",
  communicationEvent: null,
  communicationTimeDelta: null,
  communicationApplyListingTimeZone: null,
  communicationAlwaysTrigger: null,
  date: "2018-07-16 10:12:52",
  sentChannelDate: "2018-07-16 10:13:52",
  attachments: [
    {
      accountId: 10450,
      listingMapId: null,
      reservationId: 2,
      taskId: null,
      name: "download.jpeg",
      url: "https://www.image.com/img.jpeg",
      isPublic: 1,
      communicationId: null,
      conversationMessageId: 3,
      extension: "jpeg",
      mimeType: "image/jpeg",
      isImage: null,
      id: 6,
    },
  ],
  insertedOn: "2018-07-16 10:12:52",
  updatedOn: "2018-07-16 10:12:52",
  id: 326,
};

const ChatLayout = ({ selectedData }: any) => {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: sampleJSON.body,
      user: {
        id: "mark",
        // name: "Markus",
        avatarUrl: sampleJSON.attachments[0].url,
        timestamp: new Date().toLocaleTimeString(), // Example timestamp for the first message
      },
      timestamp: new Date().toLocaleTimeString(), // Example timestamp for the first message
    },
    {
      text: "Hi",
      user: {
        id: "ba",
        name: "barani",
      },
      timestamp: new Date(),
    },
  ]);

  const chatMessages = [
    {
      sender: "host",
      message: sampleJSON.body,
      timestamp: sampleJSON.date,
      type: "incomeing",
      profileUrl: sampleJSON.attachments[0].url,
    },
    {
      sender: "host",
      message: sampleJSON.body,
      timestamp: sampleJSON.date,
      type: "incomeing",
      profileUrl: sampleJSON.attachments[0].url,
    },
    {
      sender: "guest",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates debitis inventore vero doloremque molestias quas, omnis fugit, sunt reiciendis explicabo ipsum officia odio nisi, rerum illo voluptatem! Possimus, ipsam officiis Quam voluptatum maxime, nisi, dolore enim quia debitis ut possimus maiores accusamus nobis. Pariatur est, distinctio minus nihil natus ipsam error fuga fugiat, facere quibusdam, officiis unde excepturi repudiandae facilis",
      timestamp: sampleJSON.date,
      type: "outgoing",
      profileUrl: sampleJSON.attachments[0].url,
    },
    // Add more messages as needed
  ];

  // Function to handle sending a new message
  // const handleSendMessage = (newMessageText: any) => {
  //   // Construct the new message object with the user-typed message and sender
  //   const newMessage = {
  //     text: newMessageText,
  //     user: {
  //       id: "ba",
  //       name: "barani",
  //     },
  //     timestamp: new Date(), // Example timestamp for the first message
  //   };

  //   setIsTyping(true);
  //   setMessages([...messages, newMessage]);

  //   // Simulate a response from Joe after a short delay
  //   setTimeout(() => {
  //     const responseMessage = {
  //       text: newMessageText,
  //       user: {
  //         id: "mark",
  //         // name: "Markus",
  //       },
  //       timestamp: new Date(), // Example timestamp for the first message
  //     };
  //     setIsTyping(false);

  //     setMessages([...messages, newMessage, responseMessage]);
  //   }, 1000); // Delay of 1 second for the response
  // };

  function formatTimeToAmPm(timestamp: any) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  return (
    <div className="flex flex-col ">
      <div className="flex-1">
        {/* <MinChatUiProvider theme="#6ea9d7" colorSet={customColorSet}>
          <MainContainer>
            <div className="h-[520px] w-full">
              <MessageList
                // showTypingIndicator={isTyping}
                mobileView={false}
                currentUserId={"ba"}
                messages={messages}
              />
            </div>
          </MainContainer>
        </MinChatUiProvider> */}
        <MDBContainer className="py-5 ">
          <MDBRow className="d-flex justify-content-center ">
            <MDBCol md="8" lg="6" xl="4">
              <MDBCard id="chat1" style={{ borderRadius: "15px" }}>
                <MDBCardBody>
                  <div className="flex-1  justify-between flex flex-col h-90vh">
                    <div
                      id="messages"
                      className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                    >
                      <div className="flex items-center justify-center text-xs uppercase">
                        Start the conversion at 12 am
                      </div>
                      {chatMessages.map((chat, index) => (
                        <div
                          key={index}
                          className={`chat-message ${
                            chat.type === "outgoing" ? "" : "justify-end"
                          }`}
                        >
                          <div
                            className={`flex items-end ${
                              chat.type === "outgoing" ? "" : "justify-end"
                            }`}
                          >
                            <div
                              className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${
                                chat.type === "outgoing"
                                  ? "order-2 items-start"
                                  : "order-1 items-end"
                              }`}
                            >
                              <div>
                                <span
                                  className={`px-4 py-2 rounded-lg inline-block ${
                                    chat.type === "outgoing"
                                      ? "bg-gray-300 text-gray-600"
                                      : "bg-blue-600 text-white"
                                  }`}
                                >
                                  {chat.message}
                                </span>
                                <div className="text-xs text-gray-400">
                                  {formatTimeToAmPm(chat.timestamp)}
                                </div>
                              </div>
                            </div>
                            <Image
                              src={
                                chat.type === "outgoing"
                                  ? "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                                  : "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                              }
                              alt="My profile"
                              className="w-3 h-3  rounded-full"
                              width={50}
                              height={50}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
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
