"use client";
import { useState } from "react";

import UpsellDashboard from "./upselldashboard";
import { Upsell } from "../page";
import ListingMain from "@/app/listing/listingMain";

interface upsellSettingsProps {
  upsells: Upsell[];
  setUpsells: any;
  title: string;
  selectedRows: number[];
  setSelectedRows: any;
  handleRowCheckboxChange: (index: number) => void;
  totalData: number;
  setTotalData: any;
  selectAll: boolean;
  setSelectAll: any;
  limit: number;
  setLimit: any;
  currentPage: number;
  setCurrentPage: any;
  isLoading: boolean;
  setIsLoading: any;
}

const UpsellSettings: React.FC<upsellSettingsProps> = ({
  upsells,
  setUpsells,
  title,
  selectedRows,
  setSelectedRows,
  handleRowCheckboxChange,
  totalData,
  setTotalData,
  selectAll,
  setSelectAll,
  limit,
  setLimit,
  currentPage,
  setCurrentPage,
  isLoading,
  setIsLoading,
  children,
}: any) => {
  const [selectedMenu, setSelectedMenu] = useState("Upsells");

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    returnSelectedComponent(menu);
  };

  const returnSelectedComponent = (menu: String) => {
    switch (menu) {
      case "Listing":
        return <ListingMain />;
      case "Upsells":
        return (
          <UpsellDashboard
            upsells={upsells}
            setUpsells={setUpsells}
            title={title}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            handleRowCheckboxChange={handleRowCheckboxChange}
            totalData={totalData}
            setTotalData={setTotalData}
            selectAll={selectAll}
            setSelectAll={setSelectAll}
            limit={limit}
            setLimit={setLimit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        );
      case "Chat":
        return null;
      case "Guests":
        return null;
      case "Workplace":
        return null;
      default:
        return (
          <UpsellDashboard
            upsells={upsells}
            setUpsells={setUpsells}
            title={title}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            handleRowCheckboxChange={handleRowCheckboxChange}
            totalData={totalData}
            setTotalData={setTotalData}
            selectAll={selectAll}
            setSelectAll={setSelectAll}
            limit={limit}
            setLimit={setLimit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        );
    }
  };
  interface AvatarProps {
    imageUrl: string;
    profileName: string;
    requiredText: string;
  }

  const Avatar: React.FC<AvatarProps> = ({
    imageUrl,
    profileName,
    requiredText,
  }) => {
    return (
      <div className="flex items-center px-4 w-full h-[60px]">
        <div className="flex items-center justify-between p-2 bg-[#F5F7F8] rounded-lg w-full">
          <div className="flex items-center justify-between gap-2">
            <div className="w-9 h-9 rounded-full">
              <img
                src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_1280.png"
                alt="Profile Avatar"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#222222]">
                {profileName}
              </p>
              <p className="text-[11px] font-normal text-[#000000] opacity-40">
                {requiredText}
              </p>
            </div>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_9473_1810)">
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="#72767A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_9473_1810">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    );
  };
  const avatarProps = {
    imageUrl: "path/to/your/image.jpg",
    profileName: "Stanton A.",
    requiredText: "Super Admin",
  };

  const menuList = [
    {
      name: "Listing",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.1368 10.5602L8.05076 7.3615C7.75116 7.12629 7.38128 6.99845 7.00038 6.99845C6.61949 6.99845 6.24961 7.12629 5.95001 7.3615L1.86326 10.5595C1.5937 10.7695 1.37577 11.0384 1.22614 11.3455C1.07652 11.6527 0.999164 11.9901 1.00001 12.3317V19H13V12.3317C13 11.635 12.685 10.9893 12.1368 10.5602ZM11.5 17.5H2.50001V12.3317C2.50001 12.0992 2.60501 11.884 2.78801 11.7408L6.87401 8.5435C6.90994 8.51528 6.95431 8.49994 7.00001 8.49994C7.0457 8.49994 7.09007 8.51528 7.12601 8.5435L11.212 11.7423C11.395 11.8848 11.5 12.1007 11.5 12.3325V17.5ZM5.50001 12.25H8.50001V15.25H5.50001V12.25ZM14.5 10.75H16V12.25H14.5V10.75ZM14.5 13.75H16V15.25H14.5V13.75ZM11.5 4.75H13V6.25H11.5V4.75ZM16 6.25H14.5V4.75H16V6.25ZM11.5 7.75H13V9.25H11.5V7.75ZM14.5 7.75H16V9.25H14.5V7.75ZM19 3.25V19H14.5V17.5H17.5V3.25C17.5 3.05109 17.421 2.86032 17.2803 2.71967C17.1397 2.57902 16.9489 2.5 16.75 2.5H10.75C10.5511 2.5 10.3603 2.57902 10.2197 2.71967C10.079 2.86032 10 3.05109 10 3.25V6.9835L8.50001 5.80975V3.25L8.50076 3.211C8.51156 2.62136 8.7532 2.05948 9.17377 1.64607C9.59433 1.23265 10.1603 1.00069 10.75 1L16.75 1C17.9905 1 19 2.0095 19 3.25Z"
            fill={`${selectedMenu === "Listing" ? "#7000FF" : "#72767A"}`}
          />
        </svg>
      ),
    },
    {
      name: "Upsells",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_9473_1787)">
            <path
              d="M14.5833 4.16663C15.2736 4.16663 15.8333 4.72627 15.8333 5.41663C15.8333 6.10698 15.2736 6.66663 14.5833 6.66663C13.893 6.66663 13.3333 6.10698 13.3333 5.41663C13.3333 4.72627 13.893 4.16663 14.5833 4.16663Z"
              stroke={`${selectedMenu === "Upsells" ? "#7000FF" : "#72767A"}`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.31188 9.28654C1.47592 10.2202 1.45794 11.6288 2.22516 12.6197C3.74761 14.586 5.41397 16.2524 7.3803 17.7748C8.37119 18.542 9.77977 18.524 10.7134 17.6881C13.2483 15.4185 15.5696 13.0465 17.8099 10.4399C18.0314 10.1822 18.1699 9.86638 18.201 9.52796C18.3385 8.03161 18.621 3.72052 17.4503 2.54974C16.2794 1.37897 11.9684 1.66143 10.472 1.79893C10.1336 1.83003 9.81777 1.96857 9.56002 2.19005C6.95346 4.43034 4.58153 6.75172 2.31188 9.28654Z"
              stroke={`${selectedMenu === "Upsells" ? "#7000FF" : "#72767A"}`}
              strokeWidth="1.5"
            />
            <path
              d="M11.4903 10.3054C11.5081 9.97121 11.6018 9.35996 11.0937 8.89529M11.0937 8.89529C10.9365 8.75154 10.7216 8.62179 10.4291 8.51871C9.3819 8.14961 8.09568 9.38487 9.00557 10.5156C9.49465 11.1235 9.87173 11.3104 9.83623 12.0006C9.81123 12.4861 9.33432 12.9935 8.70573 13.1866C8.15965 13.3545 7.55728 13.1323 7.17628 12.7065C6.71108 12.1867 6.75807 11.6967 6.75408 11.4831M11.0937 8.89529L11.6671 8.3219M7.21774 12.7713L6.67316 13.3159"
              stroke={`${selectedMenu === "Upsells" ? "#7000FF" : "#72767A"}`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_9473_1787">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Chat",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.2477 3.99952H14.4221C14.248 3.1534 13.7875 2.39315 13.1184 1.84681C12.4493 1.30046 11.6123 1.0014 10.7484 1H4.7494C2.68198 1 1 2.68198 1 4.7494V14.3884C0.999608 14.6001 1.04102 14.8098 1.12187 15.0055C1.20271 15.2012 1.3214 15.379 1.47112 15.5287C1.62084 15.6785 1.79864 15.7971 1.99434 15.878C2.19003 15.9588 2.39976 16.0002 2.61149 15.9998C2.92344 15.9998 3.23464 15.9091 3.50385 15.7299L5.716 14.2549C5.97633 14.9837 6.45541 15.6143 7.08775 16.0604C7.72008 16.5066 8.47479 16.7465 9.24868 16.7475H13.5207L16.4933 18.7294C16.7358 18.8914 17.0178 18.9843 17.3091 18.9982C17.6004 19.0121 17.89 18.9464 18.1468 18.8081C18.6717 18.5277 18.9971 17.9833 18.9971 17.3879V7.74892C18.9971 5.6815 17.3151 3.99952 15.2477 3.99952ZM2.67223 14.4821C2.65799 14.4911 2.61599 14.5181 2.55825 14.4873C2.49901 14.4558 2.49901 14.4056 2.49901 14.3891V4.7494C2.49901 3.5091 3.50835 2.49976 4.74865 2.49976H10.7477C11.988 2.49976 12.9973 3.5091 12.9973 4.7494V9.99856C12.9973 11.2389 11.988 12.2482 10.7477 12.2482H6.24841C6.0032 12.2482 5.84273 12.3674 5.82473 12.3794L2.67223 14.4821ZM17.4974 17.3886C17.4974 17.4044 17.4974 17.4554 17.4381 17.4869C17.4208 17.4972 17.4008 17.5022 17.3807 17.5013C17.3606 17.5003 17.3412 17.4935 17.3249 17.4816L14.1641 15.3737C14.0408 15.2916 13.8961 15.2478 13.748 15.2477H9.24868C8.78363 15.2472 8.33012 15.1028 7.95043 14.8343C7.57073 14.5657 7.28345 14.1863 7.12802 13.748H10.7484C12.8159 13.748 14.4978 12.066 14.4978 9.99856V5.49928H15.2477C16.488 5.49928 17.4974 6.50862 17.4974 7.74892V17.3886Z"
            fill={`${selectedMenu === "Chat" ? "#7000FF" : "#72767A"}`}
          />
        </svg>
      ),
    },
    {
      name: "Guests",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 13C9.40666 13 8.82664 12.8241 8.33329 12.4944C7.83994 12.1648 7.45542 11.6962 7.22836 11.1481C7.0013 10.5999 6.94189 9.99667 7.05764 9.41473C7.1734 8.83279 7.45912 8.29824 7.87868 7.87868C8.29824 7.45912 8.83279 7.1734 9.41473 7.05764C9.99667 6.94189 10.5999 7.0013 11.148 7.22836C11.6962 7.45542 12.1648 7.83994 12.4944 8.33329C12.8241 8.82664 13 9.40666 13 10C13 10.7957 12.6839 11.5587 12.1213 12.1213C11.5587 12.6839 10.7956 13 10 13ZM10 8.5C9.70333 8.5 9.41332 8.58797 9.16664 8.7528C8.91997 8.91762 8.72771 9.15189 8.61418 9.42598C8.50065 9.70006 8.47094 10.0017 8.52882 10.2926C8.5867 10.5836 8.72956 10.8509 8.93934 11.0607C9.14912 11.2704 9.41639 11.4133 9.70736 11.4712C9.99833 11.5291 10.2999 11.4994 10.574 11.3858C10.8481 11.2723 11.0824 11.08 11.2472 10.8334C11.412 10.5867 11.5 10.2967 11.5 10C11.5 9.60218 11.342 9.22065 11.0607 8.93934C10.7794 8.65804 10.3978 8.5 10 8.5ZM14.5 18.25C14.5 17.0565 14.0259 15.9119 13.182 15.068C12.3381 14.2241 11.1935 13.75 10 13.75C8.80653 13.75 7.66193 14.2241 6.81802 15.068C5.97411 15.9119 5.5 17.0565 5.5 18.25C5.5 18.4489 5.57902 18.6397 5.71967 18.7803C5.86032 18.921 6.05109 19 6.25 19C6.44891 19 6.63968 18.921 6.78033 18.7803C6.92098 18.6397 7 18.4489 7 18.25C7 17.4544 7.31607 16.6913 7.87868 16.1287C8.44129 15.5661 9.20435 15.25 10 15.25C10.7956 15.25 11.5587 15.5661 12.1213 16.1287C12.6839 16.6913 13 17.4544 13 18.25C13 18.4489 13.079 18.6397 13.2197 18.7803C13.3603 18.921 13.5511 19 13.75 19C13.9489 19 14.1397 18.921 14.2803 18.7803C14.421 18.6397 14.5 18.4489 14.5 18.25ZM14.5 7C13.9067 7 13.3266 6.82405 12.8333 6.49441C12.3399 6.16477 11.9554 5.69623 11.7284 5.14805C11.5013 4.59987 11.4419 3.99667 11.5576 3.41473C11.6734 2.83279 11.9591 2.29824 12.3787 1.87868C12.7982 1.45912 13.3328 1.1734 13.9147 1.05765C14.4967 0.94189 15.0999 1.0013 15.648 1.22836C16.1962 1.45543 16.6648 1.83994 16.9944 2.33329C17.3241 2.82664 17.5 3.40666 17.5 4C17.5 4.79565 17.1839 5.55871 16.6213 6.12132C16.0587 6.68393 15.2956 7 14.5 7ZM14.5 2.5C14.2033 2.5 13.9133 2.58797 13.6666 2.7528C13.42 2.91762 13.2277 3.15189 13.1142 3.42598C13.0006 3.70007 12.9709 4.00167 13.0288 4.29264C13.0867 4.58361 13.2296 4.85088 13.4393 5.06066C13.6491 5.27044 13.9164 5.4133 14.2074 5.47118C14.4983 5.52906 14.7999 5.49935 15.074 5.38582C15.3481 5.27229 15.5824 5.08003 15.7472 4.83336C15.912 4.58668 16 4.29667 16 4C16 3.60218 15.842 3.22065 15.5607 2.93934C15.2794 2.65804 14.8978 2.5 14.5 2.5ZM19 12.25C18.9988 11.0569 18.5243 9.91299 17.6807 9.06934C16.837 8.22568 15.6931 7.75119 14.5 7.75C14.3011 7.75 14.1103 7.82902 13.9697 7.96967C13.829 8.11032 13.75 8.30109 13.75 8.5C13.75 8.69891 13.829 8.88968 13.9697 9.03033C14.1103 9.17098 14.3011 9.25 14.5 9.25C15.2956 9.25 16.0587 9.56607 16.6213 10.1287C17.1839 10.6913 17.5 11.4544 17.5 12.25C17.5 12.4489 17.579 12.6397 17.7197 12.7803C17.8603 12.921 18.0511 13 18.25 13C18.4489 13 18.6397 12.921 18.7803 12.7803C18.921 12.6397 19 12.4489 19 12.25ZM5.5 7C4.90666 7 4.32664 6.82405 3.83329 6.49441C3.33994 6.16477 2.95542 5.69623 2.72836 5.14805C2.5013 4.59987 2.44189 3.99667 2.55764 3.41473C2.6734 2.83279 2.95912 2.29824 3.37868 1.87868C3.79824 1.45912 4.33279 1.1734 4.91473 1.05765C5.49667 0.94189 6.09987 1.0013 6.64805 1.22836C7.19623 1.45543 7.66476 1.83994 7.99441 2.33329C8.32405 2.82664 8.5 3.40666 8.5 4C8.5 4.79565 8.18393 5.55871 7.62132 6.12132C7.05871 6.68393 6.29565 7 5.5 7ZM5.5 2.5C5.20333 2.5 4.91332 2.58797 4.66664 2.7528C4.41997 2.91762 4.22771 3.15189 4.11418 3.42598C4.00065 3.70007 3.97094 4.00167 4.02882 4.29264C4.0867 4.58361 4.22956 4.85088 4.43934 5.06066C4.64912 5.27044 4.91639 5.4133 5.20736 5.47118C5.49834 5.52906 5.79994 5.49935 6.07402 5.38582C6.34811 5.27229 6.58238 5.08003 6.7472 4.83336C6.91203 4.58668 7 4.29667 7 4C7 3.60218 6.84196 3.22065 6.56066 2.93934C6.27936 2.65804 5.89782 2.5 5.5 2.5ZM2.5 12.25C2.5 11.4544 2.81607 10.6913 3.37868 10.1287C3.94129 9.56607 4.70435 9.25 5.5 9.25C5.69891 9.25 5.88968 9.17098 6.03033 9.03033C6.17098 8.88968 6.25 8.69891 6.25 8.5C6.25 8.30109 6.17098 8.11032 6.03033 7.96967C5.88968 7.82902 5.69891 7.75 5.5 7.75C4.30689 7.75119 3.16299 8.22568 2.31934 9.06934C1.47568 9.91299 1.00119 11.0569 1 12.25C1 12.4489 1.07902 12.6397 1.21967 12.7803C1.36032 12.921 1.55109 13 1.75 13C1.94891 13 2.13968 12.921 2.28033 12.7803C2.42098 12.6397 2.5 12.4489 2.5 12.25Z"
            fill={`${selectedMenu === "Guests" ? "#7000FF" : "#72767A"}`}
          />
        </svg>
      ),
    },
    {
      name: "Workplace",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.25 4H14.425C14.2509 3.15356 13.7904 2.39301 13.1209 1.84654C12.4515 1.30007 11.6142 1.00109 10.75 1L9.25 1C8.38585 1.00109 7.54849 1.30007 6.87906 1.84654C6.20964 2.39301 5.74907 3.15356 5.575 4H4.75C3.7558 4.00119 2.80267 4.39666 2.09966 5.09966C1.39666 5.80267 1.00119 6.7558 1 7.75L1 15.25C1.00119 16.2442 1.39666 17.1973 2.09966 17.9003C2.80267 18.6033 3.7558 18.9988 4.75 19H15.25C16.2442 18.9988 17.1973 18.6033 17.9003 17.9003C18.6033 17.1973 18.9988 16.2442 19 15.25V7.75C18.9988 6.7558 18.6033 5.80267 17.9003 5.09966C17.1973 4.39666 16.2442 4.00119 15.25 4ZM9.25 2.5H10.75C11.2137 2.50192 11.6655 2.64706 12.0435 2.91557C12.4216 3.18407 12.7074 3.56282 12.862 4H7.138C7.29256 3.56282 7.57842 3.18407 7.95648 2.91557C8.33453 2.64706 8.7863 2.50192 9.25 2.5ZM4.75 5.5H15.25C15.8467 5.5 16.419 5.73705 16.841 6.15901C17.2629 6.58097 17.5 7.15326 17.5 7.75V10H2.5V7.75C2.5 7.15326 2.73705 6.58097 3.15901 6.15901C3.58097 5.73705 4.15326 5.5 4.75 5.5ZM15.25 17.5H4.75C4.15326 17.5 3.58097 17.2629 3.15901 16.841C2.73705 16.419 2.5 15.8467 2.5 15.25V11.5H9.25V12.25C9.25 12.4489 9.32902 12.6397 9.46967 12.7803C9.61032 12.921 9.80109 13 10 13C10.1989 13 10.3897 12.921 10.5303 12.7803C10.671 12.6397 10.75 12.4489 10.75 12.25V11.5H17.5V15.25C17.5 15.8467 17.2629 16.419 16.841 16.841C16.419 17.2629 15.8467 17.5 15.25 17.5Z"
            fill={`${selectedMenu === "Workplace" ? "#7000FF" : "#72767A"}`}
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-0 h-[90vh] min-w-[1200px] bg-[#F4F6F8]">
      <div className="flex flex-col pt-6 pb-4 bg-white h-[90vh] w-[220px] min-w-[220px]">
        <div className="">
          <ul className="flex flex-col gap-[10px] py-4 cursor-pointer text-[#72767A] font-normal text-base">
            {menuList.map((menu) => (
              <li
                key={menu.name}
                className={`${
                  selectedMenu === menu.name
                    ? "text-[#7000FF] font-medium pl-0"
                    : "hover:bg-[#F5F7F8] pl-5"
                } pr-5 py-2 cursor-pointer flex items-center`}
                onClick={() => handleMenuClick(menu.name)}
              >
                {selectedMenu === menu.name && (
                  <div className="w-5">
                    <svg
                      width="3"
                      height="24"
                      viewBox="0 0 3 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 0V0C1.65685 0 3 1.34315 3 3V21C3 22.6569 1.65685 24 0 24V24V0Z"
                        fill="#7000FF"
                      />
                    </svg>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  {menu.icon} <span>{menu.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto">
          <Avatar {...avatarProps} />
        </div>
      </div>
      <div className="w-full h-[90vh]">
        {returnSelectedComponent(selectedMenu)}
      </div>
    </div>
  );
};
export default UpsellSettings;
