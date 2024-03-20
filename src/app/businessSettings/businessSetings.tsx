"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BusinessSettings = ({ children }: any) => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const router = useRouter();

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    returnSelectedComponent(menu);
  };

  // Function to dynamically render the selected component
  const returnSelectedComponent = (menu: String) => {
    switch (menu) {
      case "Branding":
        return null;
      case "Connected Accounts":
        return null;
      case "Messaging":
        return router.push("/businessSettings/messaging");
      case "users":
        return router.push("/businessSettings/users");
      case "billing":
        return router.push("/businessSettings/billing");
      case "Reports":
        return null;
      default:
        return null;
    }
  };

  return (
    // <div className="flex flex-col justify-center p-4 h-[100%] rounded-md">
    <div className="flex flex-row gap-0 h-[100%] w-full bg-gray-300">
      {/* Column 1 - Setting nav */}
      <div className="w-[20%] p-4 rounded-md bg-gray-100">
        <h2 className="text-xl font-bold text-indigo-700">Business Settings</h2>
        <ul className="flex flex-col gap-1 py-8 cursor-pointer">
          <li className="hover:bg-indigo-100 p-3 rounded-md">Branding </li>
          <li className="hover:bg-indigo-100 p-3 rounded-md">
            Connected A/C{" "}
          </li>
          <li    className={`${
              selectedMenu == "messaging" ? "bg-slate-200" : ""
            } hover:bg-indigo-100 p-3 rounded-md`}
            onClick={() => handleMenuClick("Messaging")}>Messaging </li>
          <li
            className={`${
              selectedMenu == "users" ? "bg-slate-200" : ""
            } hover:bg-indigo-100 p-3 rounded-md`}
            onClick={() => handleMenuClick("users")}
          >
            Users{" "}
          </li>
          <li className={`${selectedMenu == "users" ? "bg-slate-200" : ""
            } hover:bg-indigo-100 p-3 rounded-md`}
          onClick={() => handleMenuClick("billing")}>Billing </li>
          <li className="hover:bg-indigo-100 p-3 rounded-md">Reports </li>
        </ul>
      </div>

      {/* Column 2 - page components */}
      <div className="w-full border-l border-gray-300 overflow-y-scroll">{children}</div>
    </div>
    // </div>
  );
};
export default BusinessSettings;
