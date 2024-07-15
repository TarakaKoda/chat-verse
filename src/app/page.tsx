import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <div className="h-screen w-full bg-neutral-950 !overflow-visible relative flex flex-col items-center  antialiased">
        <p className="text-white">Welcome to Chat verse</p>
      </div>
    </>
  );
};

export default Home;
