import {
  BarsArrowDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { BsThreeDotsVertical } from "react-icons/bs";
import classNames from "classnames";

const DEFAULT_PLACEHOLDER = "Search 22 listings";
function SearchBar({
  placeHolder = DEFAULT_PLACEHOLDER,
}: {
  placeHolder?: string;
}) {
  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-[#141b37]">
      <div className=" flex flex-1 justify-between">
        <div className="flex flex-1">
          <div
            className={classNames(
              "ml-0",
              "text-lg md:text-2xl lg:text-2xl font-bold m-auto flex items-center"
            )}
          >
            <div className="">
              <div className="border-gray-600 sm:flex w-full">
                <div className="w-full">
                  <div className="flex rounded-md shadow-sm">
                    <div className="relative flex-grow focus-within:z-10">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 text-gray-200"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
                        <BarsArrowDownIcon
                          className="h-5 w-5 text-gray-100"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="text"
                        name="desktop-search-candidate"
                        id="desktop-search-candidate"
                        className="w-full rounded-md border-0 py-2 pl-10 pr-10 text-sm font-[500] leading-6 text-gray-200 bg-[#1f284d] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
                        placeholder={placeHolder}
                        // onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2">
          <button
            className={classNames(
              "flex items-center justify-center gap-2 text-sm text-white font-semibold px-4 py-2 rounded-md",
              "bg-gradient-to-r from-purple-600 to-indigo-500",
              "border border-transparent hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            )}
            // onClick={() => handleButtonClick("create")}
          >
            <PlusIcon className="text-white h-6 w-6" aria-hidden="true" />
            <span>Create Upsells</span>
          </button>

          <div className="bg-[#1f284d] p-3 rounded-md cursor-pointer">
            <BsThreeDotsVertical className="text-xl text-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
