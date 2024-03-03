import React from 'react';
import SeamLock from './seamLock';
import SifelyLock from './sifelyLock';

const Lock = () => {
  return (
    <div className='flex justify-between gap-1 bg-white'>
      <div className='w-1/2 bg-white p-4'>
        {/* Seam Locks */}
        <SeamLock />
      </div>
      <div className='w-1/2 bg-white p-4'>
        {/* Sifely Locks */}
        <SifelyLock />
      </div>
    </div>
  );
};

export default Lock;