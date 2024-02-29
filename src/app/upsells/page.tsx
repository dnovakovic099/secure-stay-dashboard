"use client";
import { Sidebar } from "@/components/sidebar";
import UpsellDashboard from "./upselldashboard";
import SearchBar from "@/components/SearchBar";

//This is client component
//Component

const Upsells = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen overflow-hidden bg-slate-100">
        <SearchBar placeHolder="Search Upsells here" />
        <div className="flex items-center justify-center bg-gray-100 min-h-screen">
          <div className="min-h-screen min-w-full ">
            <UpsellDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upsells;
