import SideBarMain from "@/components/sidebar";
import React from "react";
import BusinessSettings from "../../businessSetings";
import DeviceList from "../deviceList";
import DeviceDetails from "./deviceDetails";

const DeviceDetailPage = ({ params }: { params: { device_id: string } }) => {
  return (
    <SideBarMain>
      <BusinessSettings>
        <DeviceList>
          <DeviceDetails device_id={params.device_id}/>
        </DeviceList>
      </BusinessSettings>
    </SideBarMain>
  );
};

export default DeviceDetailPage;
