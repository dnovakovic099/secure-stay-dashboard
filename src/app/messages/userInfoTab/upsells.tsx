import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import React from "react";

const ListItems = [
  {
    id: 1,
    name: "Early check-in",
    subTitle:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique cupiditate cum iure itaque? Nisi exercitationem quod est molestiae odit? Nulla harum tempore reprehenderit esse. Adipisci voluptatum voluptas at est porro?",
    current: false,
    connectedList:" connected to 4 listing"
  },
  {
    id: 2,
    name: "Late check-out",
    subTitle:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique cupiditate cum iure itaque? Nisi exercitationem quod est molestiae odit? Nulla harum tempore reprehenderit esse. Adipisci voluptatum voluptas at est porro?",
    current: false,
    connectedList:" connected to 2 listing"
  },
  {
    id: 3,
    name: "Security Autharization",
    subTitle:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique cupiditate cum iure itaque? Nisi exercitationem quod est molestiae odit? Nulla harum tempore reprehenderit esse. Adipisci voluptatum voluptas at est porro?",
    current: false,
    connectedList:" connected to 7 listing"
  },
 
];

const Upsells = () => {
  function activeFees() {
    return (
      <>
        <ul role="list" className="divide-y divide-gray-100">
          {ListItems.map((person, index) => (
            <li
              key={index}
              className=" bg-gray-200 relative flex justify-between gap-x-4 px-2 py-5 mt-2 rounded-md hover:bg-gray-300"
            >
              <div className="flex min-w-0 gap-x-4 items-center">
                <div className="min-w-0 flex-auto ">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <div className="flex gap-4">
                      <span>{person.name}</span>
                      <div className="flex text-xs leading-5 text-gray-500">
                        {person.connectedList}
                        
                      </div>
                    </div>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <div className="relative truncate hover:underline">
                      {person.subTitle}
                    </div>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <PencilIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
                <TrashIcon
                  className="h-5 w-5 flex-none text-red-400"
                  aria-hidden="true"
                />
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
  return (
    <div className="mt-2 text-sm font-semibold leading-6 text-gray-900">
      Active upsells
      {activeFees()}
    </div>
  );
};

export default Upsells;
