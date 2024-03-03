"use client";

import React, { useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import Pagination from "@/components/commonPagination";
import CommonDialog from "@/components/commonDailogBox";
import toast from "react-hot-toast";

interface UserListProps {
  deleteUser: (id: number) => Promise<void>;
  fetchUserList: (
    page: number,
    limit: number,
    fullName: string
  ) => Promise<void>;
  handleChangePage: (page: number) => void;

  editUser: (userId: number) => void;
  deleteMultipleUsers: (userIds: number[]) => Promise<any>;
  updateUsersStatus: (userIds: number[], status: number) => Promise<any>;
  currentPage: number;
  totalPages: number;
  userList: any[];
  isDialogOpen: boolean;
  dialogMessage: string;
  operation: string;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogMessage: React.Dispatch<React.SetStateAction<string>>;
  setOperation: React.Dispatch<React.SetStateAction<string>>;
  userId: number;
  setUserId: (page: number) => void;
  selectedUserIds: number[];
  setSelectedUserIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const UserList = ({
  deleteUser,
  handleChangePage,
  currentPage,
  totalPages,
  userList,
  editUser,
  deleteMultipleUsers,
  updateUsersStatus,
  isDialogOpen,
  dialogMessage,
  operation,
  setIsDialogOpen,
  setDialogMessage,
  setOperation,
  userId,
  setUserId,
  selectedUserIds,
  setSelectedUserIds,
}: UserListProps) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleCheckboxToggle = (userId: number) => {
    setSelectedUserIds((prev) => {
      let updatedIds: number[];
      const index = prev.indexOf(userId);
      if (index === -1) {
        updatedIds = [...prev, userId];
      } else {
        updatedIds = prev.filter((id) => id !== userId);
      }

      const allChecked = userList.every((user) =>
        updatedIds?.includes(user.userId)
      );
      setSelectAllChecked(allChecked);

      return updatedIds;
    });
  };

  const handleSelectAllToggle = () => {
    if (!selectAllChecked) {
      const allUserIds = userList.map((user) => user.userId);
      setSelectedUserIds(allUserIds);
    } else {
      setSelectedUserIds([]);
    }
    setSelectAllChecked((prev) => !prev);
  };

  const handleMultipleOperation = (operation: string) => {
    switch (operation) {
      case "delete":
        deleteMultipleUsers(selectedUserIds);
        setSelectedUserIds([]);
        setSelectAllChecked(false);
        break;

      case "activate":
        updateUsersStatus(selectedUserIds, 1);
        setSelectedUserIds([]);
        setSelectAllChecked(false);
        break;

      case "deactivate":
        updateUsersStatus(selectedUserIds, 0);
        setSelectedUserIds([]);
        setSelectAllChecked(false);
        break;

      case "update":
        editUser(userId);
        break;
      case "remove":
        deleteUser(userId);
        break;
      default:
        break;
    }
  };

  const handleDialogConfirmation = (operation: string): void => {
    if (userId == 0 || selectedUserIds.length !== 0) {
      setIsDialogOpen(true);
      setDialogMessage(`Are you sure want to ${operation}?`);
      setOperation(operation);
    } else {
      toast.error("Please select user!!!");
    }
  };

  const handleToggle = (index: number) => {
    let userStatus: any;
    const updatedUserList = [...userList];
    updatedUserList.map((user, i) => {
      if (user.userId === index) {
        if ((user.status === 0)) {
          setSelectedUserIds([index]);
          setIsDialogOpen(true);
          setDialogMessage(`Are you sure want to activate user?`);
          setOperation("activate");
        } else {
          setSelectedUserIds([index]);
          setIsDialogOpen(true);
          setDialogMessage(`Are you sure want to deactivate user?`);
          setOperation("deactivate");
        }
      }
    });
  };

  const renderUserList = userList?.map((data) => {
    return (
      <tr
        key={data.userId}
        className="grid grid-cols-12 bg-white shadow-sm border-b-2 rounded-md py-2  items-center text-gray-500  hover:z-0 hover:border-indigo-600 hover:bg-indigo-100 text-[0.85rem] h-[54px]"
      >
        <td className="col-span-1 flex justify-start font-poppins space-x-5">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-0.5"
          >
            <g clipPath="url(#clip0_9473_514)">
              <path
                d="M6.66675 4.16671C6.66675 4.38772 6.75455 4.59968 6.91083 4.75596C7.06711 4.91224 7.27907 5.00004 7.50008 5.00004C7.7211 5.00004 7.93306 4.91224 8.08934 4.75596C8.24562 4.59968 8.33341 4.38772 8.33341 4.16671C8.33341 3.94569 8.24562 3.73373 8.08934 3.57745C7.93306 3.42117 7.7211 3.33337 7.50008 3.33337C7.27907 3.33337 7.06711 3.42117 6.91083 3.57745C6.75455 3.73373 6.66675 3.94569 6.66675 4.16671Z"
                stroke="#72767A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66675 9.99996C6.66675 10.221 6.75455 10.4329 6.91083 10.5892C7.06711 10.7455 7.27907 10.8333 7.50008 10.8333C7.7211 10.8333 7.93306 10.7455 8.08934 10.5892C8.24562 10.4329 8.33341 10.221 8.33341 9.99996C8.33341 9.77895 8.24562 9.56698 8.08934 9.4107C7.93306 9.25442 7.7211 9.16663 7.50008 9.16663C7.27907 9.16663 7.06711 9.25442 6.91083 9.4107C6.75455 9.56698 6.66675 9.77895 6.66675 9.99996Z"
                stroke="#72767A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66675 15.8333C6.66675 16.0543 6.75455 16.2663 6.91083 16.4226C7.06711 16.5789 7.27907 16.6667 7.50008 16.6667C7.7211 16.6667 7.93306 16.5789 8.08934 16.4226C8.24562 16.2663 8.33341 16.0543 8.33341 15.8333C8.33341 15.6123 8.24562 15.4004 8.08934 15.2441C7.93306 15.0878 7.7211 15 7.50008 15C7.27907 15 7.06711 15.0878 6.91083 15.2441C6.75455 15.4004 6.66675 15.6123 6.66675 15.8333Z"
                stroke="#72767A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.6667 4.16671C11.6667 4.38772 11.7545 4.59968 11.9108 4.75596C12.0671 4.91224 12.2791 5.00004 12.5001 5.00004C12.7211 5.00004 12.93306 4.91224 13.0893 4.75596C13.2456 4.59968 13.3334 4.38772 13.3334 4.16671C13.3334 3.94569 13.2456 3.73373 13.0893 3.57745C12.9331 3.42117 12.7211 3.33337 12.5001 3.33337C12.2791 3.33337 12.0671 3.42117 11.9108 3.57745C11.7545 3.73373 11.6667 3.94569 11.6667 4.16671Z"
                stroke="#72767A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.6667 9.99996C11.6667 10.221 11.7545 10.4329 11.9108 10.5892C12.0671 10.7455 12.2791 10.8333 12.5001 10.8333C12.7211 10.8333 12.9331 10.7455 13.0893 10.5892C13.2456 10.4329 13.3334 10.221 13.3334 9.99996C13.3334 9.77895 13.2456 9.56698 13.0893 9.4107C7.93306 9.25442 7.7211 9.16663 7.50008 9.16663C7.27907 9.16663 7.06711 9.25442 6.91083 9.4107C6.75455 9.56698 6.66675 9.77895 6.66675 9.99996Z"
                stroke="#72767A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.6667 15.8333C11.6667 16.0543 11.7545 16.2663 11.9108 16.4226C12.0671 16.5789 12.2791 16.6667 12.5001 16.6667C12.7211 16.6667 12.9331 16.5789 13.0893 16.4226C13.2456 16.2663 13.3334 16.0543 13.3334 15.8333C13.3334 15.6123 13.2456 15.4004 13.0893 15.2441C12.9331 15.0878 12.7211 15 12.5001 15C12.2791 15 12.0671 15.0878 11.9108 15.2441C11.7545 15.4004 11.6667 15.6123 11.6667 15.8333Z"
                stroke="#72767A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_9473_514">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <input
            type="checkbox"
            className="form-checkbox h-[15px] w-[15px] mt-1 text-blue-500"
            checked={selectedUserIds.includes(data.userId)}
            onChange={() => handleCheckboxToggle(data.userId)}
          />
        </td>

        <td className="col-span-2 text-start text-[14px] font-[500] font-poppins  text-[#222222]">
          <div className="flex justify-start gap-2">
            <div className="w-6 h-6 items-center text-center  bg-indigo-700 rounded-[50%]">
              <span className="text-[1rem] font-semibold text-white">
                {data.fullName.charAt(0).toUpperCase()}
              </span>
            </div>
            {data.fullName}
          </div>
        </td>
        <td className="col-span-3 text-start text-[14px] font-[500] font-poppins  text-[#222222]">
          {data.email}
        </td>
        <td className="col-span-2 text-start text-[14px] font-[500] font-poppins  text-[#222222]">
          {data.contact
            ? `${data.dialCode ? data.dialCode : ""} ${data.contact}`
            : "0000000000"}
        </td>
        <td className="col-span-2 text-start text-[14px] font-[500] font-poppins  text-[#222222]">
          {data.userType}
        </td>

        <td className="col-span-1 text-start text-[14px] font-[500] font-poppins  text-[#222222]">
          <Switch
            checked={data.status === 1}
            onChange={() => handleToggle(data.userId)}
            className={`${data.status === 1 ? "bg-green-500" : "bg-gray-200"}
      relative inline-flex h-5 w-10 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                data.status === 1 ? "translate-x-5" : "translate-x-o"
              }
        pointer-events-none inline-block h-4 w-4 x- transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
            <span
              className={`absolute inset-0 flex items-center justify-between text-xs ${
                data.status === 0 ? "text-white" : "text-white"
              }`}
            >
              <span className="text-xs">{data.status === 1 ? "" : ""}</span>
            </span>
          </Switch>
        </td>

        <td className="col-span-1 text-start flex justify-start space-x-5 text-[14px] font-[500] font-poppins  text-[#222222]">
          <PencilIcon
            className="w-4 h-4 font-extrabold text-gray-700"
            onClick={() => {
              handleDialogConfirmation("update");
              setUserId(data.userId);
            }}
          />

          <TrashIcon
            color="red"
            className="w-5"
            onClick={() => {
              handleDialogConfirmation("remove");
              setUserId(data.userId);
            }}
          />
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="max-h-[72vh] overflow-y-scroll px-3 ">
        <table className=" w-full bg-transparent mt-4">
          <thead className="bg-white shadow-md w-full sticky top-0 z-0 mb-20 h-[39px] ">
            <tr className="grid grid-cols-12 text-black px-4 py-2 bg-white items-center rounded-md">
              <th className="col-span-1 text-start pl-[25px] flex font-[700]">
                <div className=" items-center ">
                  <input
                    type="checkbox"
                    checked={selectAllChecked}
                    onChange={handleSelectAllToggle}
                    className="outline-none w-[15px] h-[15px]"
                  />
                </div>
              </th>

              <th className="col-span-2 text-start flex font-[700] text-xs ">
                Name
              </th>

              <th className="col-span-3 text-start flex font-[700] text-xs">
                Email
              </th>

              <th className="col-span-2 justify-start pl-2 flex font-[700] text-xs">
                Contact
              </th>

              <th className="col-span-2 text-start flex font-[700] text-xs">
                User Type
              </th>

              <th className="col-span-1 text-start flex font-[700] text-xs">
                Status
              </th>

              <th className="col-span-1 text-start flex  items-center font-[700] text-xs">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderUserList}</tbody>
        </table>
      </div>
      <div className="flex justify-end px-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handleChangePage}
        />
      </div>

      {isDialogOpen && (
        <CommonDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setDialogMessage("");
            setOperation("");
            setUserId(0);
          }}
          onYes={() => handleMultipleOperation(operation)}
          message={dialogMessage}
        />
      )}
    </div>
  );
};

export default UserList;
