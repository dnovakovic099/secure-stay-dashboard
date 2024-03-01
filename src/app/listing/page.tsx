"use client"; //This is client component
//Component
import SideBarMain from "@/components/sidebar";
import ListingMain from "./listingMain";

const MainMessageScreen = () => {
  return (
    <SideBarMain>
      <div className="h-[100%] overflow-y-auto"><ListingMain/></div>
    </SideBarMain>
  );
};
export default MainMessageScreen;
