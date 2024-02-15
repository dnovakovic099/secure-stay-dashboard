"use client"; //This is client component
//Component
import React, { useEffect, useState } from "react";
import SideBarMain from "@/components/sidebar";
import { envConfig } from "@/utility/environment";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import { SeamProvider, DeviceTable, ConnectAccountButton, DeviceDetails } from "@seamapi/react";
import { Dropdown } from 'flowbite-react';
import 'react-dropdown/style.css';

const Locks = (props:any) => {

    useEffect(() => {
        lockClientID(props.deviceId);
    }, [props.deviceId])

    const [token = '', setToken] = useState();
    const [listing='1', setListing] = useState();
    const [listingId = '', setLockListingId] =  useState<string | undefined>();
    const [deviceID = '', setDeviceID] = useState<string | undefined>();

    const lockClientID = async (deviceId: string) => {
        const apiUrl = `${envConfig.backendUrl}/seam/get_client_session`;

        let requestBody = {
            device_id: deviceId,
        };
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        var params = { method: 'POST', headers: headers }

        try {
            const response: any = await handleApiCallFetch(apiUrl, params);
            setToken(response.token)
        } catch (error) {
            console.log('Error in api call schlage :', error);

        }
    }

    const id = lockClientID('test');

    if (!token) return <p>Loading...</p>

    const setLockListing = (listingId: string) => {
        setLockListingId(listingId);
        // const apiUrl = `${envConfig.backendUrl}/seam/get_client_session`;

        // let requestBody = {
        //     device_id: deviceId,
        // };
        // const headers = {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // };

        // var params = { method: 'POST', headers: headers }

        // try {
        //     const response: any = await handleApiCallFetch(apiUrl, params);
        //     setToken(response.token)
        // } catch (error) {
        //     console.log('Error in api call schlage :', error);

        // }
    }

    const displayDropDown = () => {
        if (deviceID == '') {
            return;
        }

        console.log({deviceID})

        return (
            <Dropdown 
                style={{ backgroundColor: 'black', float: 'right' }} 
                label={listingId || "Listing"}
                dismissOnClick={true}
            >
                <Dropdown.Item onClick={() => setLockListing('Rogers')}>Rogers</Dropdown.Item>
                <Dropdown.Item>Seminole</Dropdown.Item>
                <Dropdown.Item>Interbay</Dropdown.Item>
                <Dropdown.Item>Compound</Dropdown.Item>
            </Dropdown>
        );
    }
    
    return (
        <SideBarMain>
            <div style={{ padding: '5%' }}>
                {displayDropDown()}
                <SeamProvider clientSessionToken={token}>
                    <ConnectAccountButton />
                    {!deviceID && <DeviceTable 
                        preventDefaultOnDeviceClick={true}
                        onDeviceClick={(deviceId: string) => {
                            console.log('setting')
                            setDeviceID(deviceId);
                        }}
                        onBack={() => {
                            console.log('back')
                            setDeviceID('');
                        }}
                    />
    }
                    <DeviceDetails deviceId={deviceID} onBack={() => setDeviceID('')}/>
                </SeamProvider>
            </div>
        </SideBarMain>
    )
}
export default Locks;