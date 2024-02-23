import React from 'react';
import DeviceList from '../deviceList';
import DeviceDetails from './deviceDetails';
import BusinessSettings from '../../businessSetting';

const DeviceDetailPage = ({ params }: { params: { device_id: string } }) => {
  return (
    <BusinessSettings>
      <DeviceList>
        <DeviceDetails device_id={params.device_id} />
      </DeviceList>
    </BusinessSettings>
  );
};

export default DeviceDetailPage;
