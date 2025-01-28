import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        {children || <Outlet />} 
      </main>
    </div>
  );
};

export default Layout;