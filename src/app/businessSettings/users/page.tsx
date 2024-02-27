"use client";
import { SideBarMain } from "@/components/sidebar";

import React from "react";
import BusinessSettings from "../businessSetings";
import Users from "./users";

const UserPage = () => {
  return (
    <SideBarMain>
      <BusinessSettings>
        <Users />
      </BusinessSettings>
    </SideBarMain>
  );
};

export default UserPage;
