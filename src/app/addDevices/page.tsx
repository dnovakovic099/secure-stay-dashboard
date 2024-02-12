"use client"; //This is client component
//Component
import SideBarMain from "@/components/sidebar";
import AddDevices from "./addDevices";

const MainAddDevices = () => {
    return (
        <SideBarMain>
            <div className="h-[100%]">
                <AddDevices />
            </div>
        </SideBarMain>
    )
}
export default MainAddDevices;