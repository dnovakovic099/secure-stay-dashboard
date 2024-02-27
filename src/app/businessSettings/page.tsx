"use client"; //This is client component
//Component
import { SideBarMain } from "@/components/sidebar";
import BusinessSettings from "./businessSetings";

const MainBusinessSettings = () => {
  return (
    <SideBarMain>
      <div className="h-[100%]">
        <BusinessSettings />
      </div>
    </SideBarMain>
  );
};
export default MainBusinessSettings;
