import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import SideBarMain from '@/components/sidebar';
import '../../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Lock App',
};

// do not cache this layout
export const revalidate = 0;
interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/assets/images/icon.png"
          type="image"
          sizes="any"
        />
      </head>
      <body className={inter.className}>
        <SideBarMain>{children}</SideBarMain>
      </body>
    </html>
  );
};
export default RootLayout;
