"use client";
import React, { useEffect } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/nav-bar";
import "../globals.css";
import { DefaultSpinner } from "@/components/default-spinner";
import { useStore } from "@/store/index";
import DrawerSidebar from "@/components/drawer-sidebar";

const Dashboardlayout = ({ children }: { children: React.ReactNode; }) => {
  const isSidebar = useStore((state) => state.isSidebar);
  const setSession = useStore((state) => state.setSession);

  console.log("dashboard");
  return (
    <>
      <DefaultSpinner />
      <div
        style={{ transition: "0.2s" }}
        className={`${isSidebar ? "sidebarTwoColumn" : "sidebarOneColumn"} `}
      >
        <Sidebar />
        <DrawerSidebar />
        <main className={`grid content-start w-full`}>
          <Navbar />
          <div className="w-full p-6 flex flex-col justify-start items-center overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboardlayout;
