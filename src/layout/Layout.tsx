import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith('/docs/');

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeader && <Header />}
      <main className="flex flex-col flex-1">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
