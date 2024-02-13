import Image from "next/image";
import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function UserList({ setSelectedData, userList }: any) {
  return (
    <ul role="list" className="divide-y divide-gray-100 w-60 h-[480px] overflow-y-auto ">
      {userList?.map((person: any) => (
        <li
          key={person.email}
          className="flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-indigo-100"
          onClick={() => {
            setSelectedData(person)
          }}
        >
          <div className="flex min-w-0 gap-x-4">
           
            <div className="min-w-0 flex-auto">
              <p className="text-sm truncate font-semibold leading-6 text-gray-900">
                {person.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non debitis temporibus autem porro totam officiis, veniam officia voluptates optio soluta asperiores ex excepturi. Harum obcaecati eveniet porro facere possimus numquam?
                Possimus similique id corrupti alias dolorem repudiandae libero voluptas impedit nemo, laudantium inventore. Praesentium voluptatem assumenda deserunt modi, dolor omnis optio saepe illo doloribus fuga nemo voluptatum labore ex illum!
                Alias recusandae soluta vero deleniti, dolorum, temporibus ex velit fugiat, mollitia cumque at. Dicta qui facere doloribus sint aliquid odit esse libero sapiente, quae quos deleniti, ducimus non doloremque assumenda?
   
               
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            {/* <p className="text-sm leading-6 text-gray-900">{person.role}</p> */}
            {person.lastSeen ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                
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
          <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />

        </li>
      ))}
    </ul>
  );
}
