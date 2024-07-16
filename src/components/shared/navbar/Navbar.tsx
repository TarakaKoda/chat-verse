"use client";

import { getUserByUid, onLogout } from "@/lib/firebase";
import { SelectedUser } from "@/lib/types";
import useChatStore from "@/store/chatStore";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [profileUser, setProfileUser] = useState<SelectedUser>();
  const { currentUser } = useChatStore((state) => ({
    currentUser: state.currentUser,
  }));

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser?.uid) {
        try {
          const userData = await getUserByUid(currentUser.uid);
          setProfileUser(userData);
        } catch (error) {
          console.error("Failed to fetch user data: ", error);
        }
      }
    };

    fetchUser();
  }, [currentUser]);

  const handleClick = () => {
    if (!currentUser?.uid) return;
    onLogout(currentUser.uid);
  };

  return (
    <header className="fixed right-0  left-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
      <aside className="flex items-center gap-[2px]">
        <p className="text-3xl font-bold">Chat</p>
        <p className="text-3xl font-bold">Verse</p>
      </aside>
      <aside className="flex items-center gap-4">
        {profileUser ? profileUser.username : null}
        <Link href={"/sign-in"} onClick={handleClick}>
          Logout
        </Link>
      </aside>
    </header>
  );
};

export default Navbar;
