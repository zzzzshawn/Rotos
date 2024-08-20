import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import Navbar from "@/components/shared/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative mx-auto max-w-7xl">
      <Navbar />
      <div className="flex">
        <LeftSideBar />

        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-16 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-2xl">{children}</div>
        </section>

        <RightSideBar/> 
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
