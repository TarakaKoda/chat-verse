import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen w-full bg-neutral-950 items-center justify-center">
      {children}
    </div>
  );
};

export default layout;
