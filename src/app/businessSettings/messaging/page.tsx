"use client";
import React from "react";
import CreateMessaging from "./createMessaging/createmessaging";
import SideBarMain from "@/components/sidebar";
import BusinessSettings from "../businessSetings";

const MessagingPage = () => {
  return (
    <SideBarMain>
      <BusinessSettings>
        <CreateMessaging/>
      </BusinessSettings>
    </SideBarMain>
  );
};

export default MessagingPage;
