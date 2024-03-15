'use client';

import React from 'react';
import ConnectAccounts from './connectAccounts';
import SideBarMain from '@/components/sidebar';

const ConnectAccountPage = () => {
    return (
        <div className=''>
            <SideBarMain>
                <ConnectAccounts />
            </SideBarMain>
        </div>
    );
};

export default ConnectAccountPage;