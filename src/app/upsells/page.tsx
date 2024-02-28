"use client";
import SideBarMain from "@/components/sidebar";
import UpsellDashboard from "./upsellView/upselldashboard";
import Navbar from "./upsellView/navbar";
import UpsellSettings from "./upsellView/upsellsidebar";
import { Suspense } from "react";
import Loader from "./loading";

//This is client component
//Component

const Upsells = () => {
  return (
    <SideBarMain>
      <div className="flex items-center justify-center bg-gray-100 h-[100%]">
        <div className="min-w-full m ">
          <Suspense fallback={<Loader />}>
            <Navbar />
            <UpsellSettings />
          </Suspense>
        </div>
      </div>
    </SideBarMain>
  );
};

export default Upsells;
