"use client";
import SideBarMain from "@/components/sidebar";
import UpsellDashboard from "./upselldashboard";

//This is client component
//Component

const Upsells = () => {
  return (
    <SideBarMain>
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-grow ml-auto mr-auto">
          <UpsellDashboard />
        </div>
      </div>
    </SideBarMain>
  );
};

export default Upsells;
