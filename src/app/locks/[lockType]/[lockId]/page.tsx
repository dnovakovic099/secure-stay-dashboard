import SideBarMain from '@/components/sidebar';
import React from 'react';
import LockInfo from './lockInfo';

const Page = ({ params }: { params: { lockType: string, lockId: string; }; }) => {
    return (
        <SideBarMain>
            <LockInfo lockType={params.lockType} lockId={params.lockId} />
        </SideBarMain>
    );
};

export default Page;