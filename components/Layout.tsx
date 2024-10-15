"use client";
import React, { useEffect, useState } from "react";
import FollowBar from "./Layout/FollowBar";

interface LayoutProps {
  children: React.ReactNode;
}

import Sidebar from "./Layout/Sidebar";
import PreLoader from "./PreLoader";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoading(false);
    });
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isLoading ? (
        <PreLoader />
      ) : (
        <div className="h-screen bg-black">
          <div className="container h-full mx-auto xl:px-30 max-w-6xl">
            <div className="grid grid-cols-4 h-full">
              <Sidebar />
              <div className="col-span lg:col-span-2 border-x-[1px] border-neutral-800 overflow-y-scroll no-scrollbar">
                {children}
              </div>
              <FollowBar />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
