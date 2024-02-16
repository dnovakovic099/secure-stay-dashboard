import React, { ReactNode } from 'react';

interface businessSetingsLayoutProps {
  children: ReactNode;
}

const BusinessSettingsLayout:React.FC<businessSetingsLayoutProps> =({children})=>{
   return (
    <>
      {children}
    </>
   )
}

export default BusinessSettingsLayout

