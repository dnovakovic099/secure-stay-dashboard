"use client";
import { SideBarMain } from "@/components/sidebar";
import React from "react";
import BusinessSettings from "../businessSetings";
import DeviceList from "./deviceList";

const Devices = () => {
  return (
    <SideBarMain>
      <BusinessSettings>
        <DeviceList />
      </BusinessSettings>
    </SideBarMain>
  );
};

export default Devices;
