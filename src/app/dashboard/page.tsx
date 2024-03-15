"use client"; //This is client component

//Component
import SideBarMain from "@/components/sidebar";
import { useEffect } from "react";

const MainDashboard = () => {


  return (
    <SideBarMain>
      <div className="flex justify-center p-4">
        <p>Dashboard screen</p>
      </div>
    </SideBarMain>
  );
};
export default MainDashboard;
