"use client";
import SideBarMain from "@/components/sidebar";
import UpsellDashboard from "./upselldashboard";

//This is client component
//Component

const Upsells = () => {
  return (
    <SideBarMain>
      <div className="flex bg-gray-100 ">
        <UpsellDashboard />
      </div>
    </SideBarMain>
  );
};
export default Upsells;
