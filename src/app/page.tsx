import { Hero } from "@/components/shared/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Verse",
  description:
    "Connect, Chat, and Chill: Your All-in-One Real-Time Messaging Hub!",
};

const Home = () => {
  return (
    <>
      <div className="h-screen w-full bg-neutral-950 !overflow-visible relative items-center  antialiased">
        <Hero />
      </div>
    </>
  );
};

export default Home;
