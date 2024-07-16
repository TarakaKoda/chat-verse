import LeftSideBar from "@/components/shared/sidebar/LeftSideBar";
import Navbar from "@/components/shared/navbar/Navbar";
import RightSideBar from "@/components/shared/sidebar/RightSideBar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <main className="bg-neutral-950 max-h-screen min-h-screen flex flex-col overflow-hidden text-white">
      <Navbar />
      <div className="flex mt-20 gap-5">
        <LeftSideBar />
        <section className="flex mb-5 max-w-[60rem] overflow-hidden flex-1 flex-col">
          <div className="mx-auto w-full max-h-[40.5rem] max-w-5xl">{children}</div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
};

export default layout;
