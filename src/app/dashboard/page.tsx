"use client"; //This is client component
import { checkUserSession } from "@/auth/auth";
//Component
import SideBarMain from "@/components/sidebar";
import { useEffect } from "react";

const MainDashboard = () => {

    // const userInfo = async () => {
    //     return await checkUserSession();
    // };

    // userInfo().then((isLoggedIn) => {
    //     if (!isLoggedIn) {
    //         localStorage.clear();
    //         window.location.href = '/login';
    //     }
    // });

    useEffect(() => {
        const userInfo = async () => {

            const isLoggedIn = await checkUserSession();
            if (!isLoggedIn) {
                localStorage.clear();
                window.location.href = '/login';
            }
        };

        userInfo();
    }, []);

  return (
    <SideBarMain>
      <div className="flex justify-center p-4">
        <p>Dashboard screen</p>
      </div>
    </SideBarMain>
  );
};
export default MainDashboard;
