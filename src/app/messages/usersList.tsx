import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function UserList({ setSelectedData, userList }: any) {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 md:w-40 w-60 h-[490px] sm:w-full  xl:w-60 lg:w-60  overflow-y-auto "
    >
      {userList?.map((person: any) => (
        <li
          key={person.email}
          className="px-2 flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-indigo-100"
          onClick={() => {
            setSelectedData(person);
          }}
        >
          <div className="flex min-w-0 items-center">
            <div className="flex-none rounded-full p-1 items-center">
              <div
                className={classNames(
                  !person.message[person.message.length - 1].isRead ? "bg-indigo-500" : "bg-gray-400",
                  "h-2 w-2 rounded-full "
                )}
              />
            </div>
            <div className="min-w-0 flex-auto">
              <p className="text-sm truncate font-semibold leading-6 text-gray-900">
                {person.name}
              </p>
              <div className="flex w-48 justify-between items-end">
                <p className="mt-1 w-40 truncate text-xs leading-5 text-gray-500">
                  {person.message.filter((p: any) => !p.isRead).length > 0 ? (
                    person.message
                      .filter((p: any) => !p.isRead)
                      .map((filteredMessage: any) => (
                        <span key={filteredMessage.id}>
                          {filteredMessage.content}
                        </span>
                      ))
                  ) : (
                    <span>
                      {person.message[person.message.length - 1].content}
                    </span>
                  )}
                </p>
                {person.message.length > 0 && (
                  <Image
                    src={
                      "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                    }
                    alt="My profile"
                    className="w-4 h-4 items-end  rounded-full"
                    width={50}
                    height={50}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex  lg:block xl:block md:hidden sm:hidden  sm:flex-col sm:items-end shrink-0">
            {person.lastSeen ? (
              <p className="mt-1 text-xs  leading-5 text-gray-500">
                <time dateTime={person.lastSeenDateTime}>
                  {person.lastSeen}
                </time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            )}
          </div>
          <div className="flex mt-1">
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-gray-400 items-center"
              aria-hidden="true"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
