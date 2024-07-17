import LeftSideBar from "@/components/shared/sidebar/LeftSideBar";
import Navbar from "@/components/shared/navbar/Navbar";
import RightSideBar from "@/components/shared/sidebar/RightSideBar";
import React from "react";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Chat Verse - Send it",
  description:
    "Dive into your conversations on Chat Verse! Connect with friends, track your messages, and enjoy real-time chat features. Stay engaged with online users and explore new connections in our dynamic chat environment.",
};

const layout = ({ children }: Props) => {
  return (
    <main className="bg-neutral-950 max-h-screen min-h-screen flex flex-col overflow-hidden text-white">
      <Navbar />
      <div className="flex justify-between items-start mt-20 gap-5">
        <LeftSideBar />
        <section className="flex mb-5 max-w-[60rem] overflow-hidden flex-1 flex-col">
          <div className="mx-auto w-full max-h-[40.5rem] max-w-5xl">
            {children}
          </div>
        </section>
        <div className="w-70 overflow-y-scroll custom-scrollbar">
          <RightSideBar />
        </div>
      </div>
    </main>
  );
};

export default layout;
