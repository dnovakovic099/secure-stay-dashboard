import SideBarMain from '@/components/sidebar';
import React from 'react';
import BusinessSettings from '../businessSetings';
import Billing from './billing';

const BillingPage = () => {
    return (
        <SideBarMain>
            <BusinessSettings>
                <Billing />
            </BusinessSettings>
        </SideBarMain>
    );
};

export default BillingPage;