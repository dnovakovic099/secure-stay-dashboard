"use client";
import React, { ReactNode } from "react";

interface deviceListLayout {
  children: ReactNode;
}

const layout: React.FC<deviceListLayout> = ({ children }) => {
  return <>{children}</>;
};

export default layout;
