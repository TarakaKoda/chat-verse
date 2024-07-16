import { Hero } from "@/components/shared/Hero";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <div className="h-screen w-full bg-neutral-950 !overflow-visible relative items-center  antialiased">
        <Hero/>
      </div>
    </>
  );
};

export default Home;
