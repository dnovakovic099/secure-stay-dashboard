import { envConfig } from '@/utility/environment';
import { SeamProvider, DeviceDetails } from '@seamapi/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SeamDeviceInfo = ({ device_id }: any) => {
    const [clientSessionToken, setClientSessionToken] = useState("");

    const getToken = async () => {
        const apiUrl = `${envConfig.backendUrl}/device/getclientsessiontoken`
        const res = await axios.get(apiUrl);
        if (res.status == 200) {
            setClientSessionToken(res.data.token);
        }
    };

    useEffect(() => {
        getToken()
    }, [])

    return (
        <div>
            <SeamProvider clientSessionToken={clientSessionToken}>
                <DeviceDetails className="w-auto h-auto" disableResourceIds deviceId={device_id}/>
            </SeamProvider>
        </div>
    )
}

export default SeamDeviceInfo