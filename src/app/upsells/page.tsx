"use client";
import SideBarMain from "@/components/sidebar";
import UpsellDashboard from "./upselldashboard";

//This is client component
//Component

const Upsells = () => {
  return (
    <SideBarMain>
      <div className="flex items-center justify-center bg-gray-100 min-h-screen">
        <div className="min-h-screen min-w-full ">
          <UpsellDashboard />
        </div>
      </div>
    </SideBarMain>
  );
};

export default Upsells;
