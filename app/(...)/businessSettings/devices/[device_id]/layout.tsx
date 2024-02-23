'use client';
import React, { ReactNode } from 'react';

interface deviceDetailLayout {
  children: ReactNode;
}

const layout: React.FC<deviceDetailLayout> = ({ children }) => {
  return <>{children}</>;
};

export default layout;
