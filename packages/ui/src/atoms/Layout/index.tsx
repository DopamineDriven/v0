import * as React from "react";
import type { NavProps } from "../Nav";
import Nav from "../Nav";

export interface LayoutProps extends NavProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  path,
  deployButton,
  children,
  icon
}) => {
  return (
    <div className='ddui-mx-auto ddui-flex ddui-h-screen ddui-flex-col'>
      <Nav path={path} deployButton={deployButton} />
      <div className='ddui-bg-accents-0 ddui-px-8'>{children}</div>
      <footer className='w-full ddui-z-20 ddui-mt-auto ddui-flex ddui-items-center ddui-justify-center ddui-border-t ddui-bg-accents-1 ddui-py-10'>
        <span className='ddui-text-primary'>Created by</span>
        {icon}
      </footer>
    </div>
  );
};

Layout.displayName = "Layout";

export default Layout;
