import { useState } from "react";
import UserUi from "./userUi";
import UserInfo from "./userInfo";
import ChatLayout from "./ChatLayout";

const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    message: [
      {
        sender: "host",
        content: "I have a great",
        notification:
          "new inquiry for Nov 22 to 24 at # Largest Tampa Private Component.11BR Sleeps 40+. Heated Pool/Spa.Gym",
        timestamp: "2018-07-16 10:12:52",
        type: "incoming",
        isRead: true,
      },
      {
        sender: "guest",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates debitis inventore vero doloremque molestias quas, omnis fugit, sunt reiciendis explicabo ipsum officia odio nisi, rerum illo voluptatem! Possimus, ipsam officiis Quam voluptatum maxime, nisi, dolore enim quia debitis ut possimus maiores accusamus nobis. Pariatur est, distinctio minus nihil natus ipsam error fuga fugiat, facere quibusdam, officiis unde excepturi repudiandae facilis",
        notification:
          "new inquiry for Nov 22 to 24 at # Largest Tampa Private Component.11BR Sleeps 40+. Heated Pool/Spa.Gym",
        timestamp: "2018-07-16 10:12:52",
        type: "outgoing",
        isRead: false,
      },
      {
        sender: "host",
        content: "ok let's see",
        notification: "",
        timestamp: "2018-07-16 10:12:52",
        type: "incoming",
        isRead: false,
      },
    ],
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
    checkInDate: "Nov 22 2024,9:30 AM",
    checkOutDate: "Nov 24 2024,6:30 PM",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    message: [
      {
        sender: "host",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates debitis inventore vero doloremque molestias quas, omnis fugit, sunt reiciendis explicabo ipsum officia odio nisi, rerum illo voluptatem! Possimus, ipsam officiis Quam voluptatum maxime, nisi, dolore enim quia debitis ut possimus maiores accusamus nobis. Pariatur est, distinctio minus nihil natus ipsam error fuga fugiat, facere quibusdam, officiis unde excepturi repudiandae facilis",
        notification:
          "new inquiry for Nov 22 to 24 at # Largest Tampa Private Component.11BR Sleeps 40+. Heated Pool/Spa.Gym",
        timestamp: "2018-07-16 10:12:52",
        type: "incoming",
        isRead: true,
      },
      {
        sender: "guest",
        content:
          " ipsum dolor sit amet consectetur adipisicing elit. Voluptates debitis inventore vero doloremque molestias quas, omnis fugit, sunt reiciendis explicabo ipsum officia odio nisi, rerum illo voluptatem! Possimus, ipsam officiis Quam voluptatum maxime, nisi, dolore enim quia debitis ut possimus maiores accusamus nobis. Pariatur est, distinctio minus nihil natus ipsam error fuga fugiat, facere quibusdam, officiis unde excepturi repudiandae facilis",
        notification:
          "new inquiry for Nov 22 to 24 at # Largest Tampa Private Component.11BR Sleeps 40+. Heated Pool/Spa.Gym",
        timestamp: "2018-07-16 10:12:52",
        type: "outgoing",
        isRead: true,
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
    checkInDate: "Jan 02 2024,11:30 AM",
    checkOutDate: "Jan 04 2024,10:30 PM",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    message: [
      {
        sender: "host",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates debitis inventore vero doloremque molestias quas, omnis fugit, sunt reiciendis exp",
        notification:
          "new inquiry for Nov 22 to 24 at # Largest Tampa Private Component.11BR Sleeps 40+. Heated Pool/Spa.Gym",
        timestamp: "2018-07-16 10:12:52",
        type: "incoming",
        isRead: true,
      },
      {
        sender: "guest",
        content:
          " debitis inventore vero doloremque molestias quas, omnis fugit, sunt reiciendis explicabo ipsum officia odio nisi, rerum illo voluptatem! Possimus, ipsam officiis Quam voluptatum maxime, nisi, dolore enim quia debitis ut possimus maiores accusamus nobis. Pariatur est, distinctio minus nihil natus ipsam error fuga fugiat, facere quibusdam, officiis unde excepturi repudiandae facilis",
        notification:
          "new inquiry for Nov 22 to 24 at # Largest Tampa Private Component.11BR Sleeps 40+. Heated Pool/Spa.Gym",
        timestamp: "2018-07-16 10:12:52",
        type: "outgoing",
        isRead: false,
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
    checkInDate: "Jan 03 2024,6:30 AM",
    checkOutDate: "jan 14 2024,11:30 PM",
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    message: [
      {
        sender: "host",
        content:
          " Voluptates debitis inventore vero doloremque molestias quas, omnis fugit, sunt reiciendis explicabo  nisi,  Pariatur est, distinctio minus nihil natus ipsam error fuga fugiat, facere quibusdam, officiis unde excepturi repudiandae facilis",
        notification:
          "new inquiry for Nov 22 to 24 at # Largest Tampa Private Component.11BR Sleeps 40+. Heated Pool/Spa.Gym",
        timestamp: "2018-07-16 10:12:52",
        type: "incoming",
        isRead: true,
      },
      {
        sender: "guest",
        content:
          " sunt reiciendis explicabo ipsum officia odio nisi, rerum illo voluptatem! Possimus, ipsam officiis Quam voluptatum maxime, nisi, dolore enim quia debitis ut possimus maiores accusamus nobis. Pariatur est, distinctio minus nihil natus ipsam error fuga fugiat, facere quibusdam, officiis unde excepturi repudiandae facilis",
        notification:
          "new inquiry for Nov 22 to 24 at # Largest Tampa Private Component.11BR Sleeps 40+. Heated Pool/Spa.Gym",
        timestamp: "2018-07-16 10:12:52",
        type: "outgoing",
        isRead: false,
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
    checkInDate: "Jan 03 2024,6:30 AM",
    checkOutDate: "jan 14 2024,11:30 PM",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Designer",
    message: [
      {
        sender: "host",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates debitis inventore vero doloremque molestias quas, omnis fugit, sunt reiciendis explicabo ipsum officia odio nisi, rerum illo voluptatem! Possimus, ipsam officiis Quam voluptatum maxime, nisi, dolore enim quia debitis ut possimus maiores accusamus nobis. Pariatur est, distinctio minus nihil natus ipsam error fuga fugiat, facere quibusdam, officiis unde excepturi repudiandae facilis",
        notification:
          "new inquiry for Nov 22 to 24 at # Largest Tampa Private Component.11BR Sleeps 40+. Heated Pool/Spa.Gym",
        timestamp: "2018-07-16 10:12:52",
        type: "incoming",
        isRead: true,
      },
      {
        sender: "guest",
        content:
          " Voluptates debitis inventore vero doloremque molestias quas, omnis fugit, sunt reiciendis explicabo ipsum officia odio nisi, rerum illo voluptatem! Possimus, ipsam officiis Quam voluptatum maxime, nisi, dolore enim quia debitis ut possimus maiores accusamus nobis. Pariatur est, distinctio minus nihil natus ipsam error fuga fugiat, facere quibusdam, officiis unde excepturi repudiandae facilis",
        notification:
          "new inquiry for Nov 22 to 24 at # Largest Tampa Private Component.11BR Sleeps 40+. Heated Pool/Spa.Gym",
        timestamp: "2018-07-16 10:12:52",
        type: "outgoing",
        isRead: false,
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
    checkInDate: "Jan 03 2024,6:30 AM",
    checkOutDate: "jan 14 2024,11:30 PM",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Director of Product",
    message: [
      {
        sender: "host",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates debitis inventore vero doloremque molestias quas, omnis fugit, sunt reiciendis explicabo ipsum officia odio nisi, rerum illo voluptatem! Possimus, ipsam officiis Quam voluptatum maxime, nisi, dolore enim quia debitis ut possimus maiores accusamus nobis. Pariatur est, distinctio minus nihil natus ipsam error fuga fugiat, facere quibusdam, officiis unde excepturi repudiandae facilis",
        notification:
          "new inquiry for Nov 22 to 24 at # Largest Tampa Private Component.11BR Sleeps 40+. Heated Pool/Spa.Gym",
        timestamp: "2018-07-16 10:12:52",
        type: "incoming",
        isRead: true,
      },
      {
        sender: "guest",
        content: "Hi Hello",
        notification:
          "new inquiry for Nov 22 to 24 at # Largest Tampa Private Component.11BR Sleeps 40+. Heated Pool/Spa.Gym",
        timestamp: "2018-07-16 10:12:52",
        type: "outgoing",
        isRead: false,
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
    checkInDate: "Jan 03 2024,6:30 AM",
    checkOutDate: "jan 14 2024,11:30 PM",
  },
];

const MessageLayout = () => {
  const [selectedData, setSelectedData] = useState(people[0]);

  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-12 sm:col-span-6 md:col-span-2  w-full border-l border-gray-300">
        <UserUi setSelectedData={setSelectedData} people={people} />
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-5 w-full h-[650px] border-l  border-gray-300 overflow-y-auto">
        {selectedData && <ChatLayout selectedData={selectedData} />}
      </div>
      <div className=" col-span-12 sm:hidden md:block lg:block xl:block  md:col-span-5 w-full border-l border-gray-300 text-sm">
        {selectedData && <UserInfo selectedData={selectedData} />}
      </div>
    </div>
  );
};
export default MessageLayout;
