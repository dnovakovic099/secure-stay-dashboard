"use client"; //This is client component
//Component
import SideBarMain from "@/components/sidebar";
import MessageLayout from "./messageLayout";

const MainMessageScreen = () => {
    return (
        <SideBarMain>
            <div className="h-[100%]">
                <MessageLayout />
            </div>
        </SideBarMain >
    )
}
export default MainMessageScreen;