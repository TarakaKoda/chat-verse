"use client";

import { useEffect } from "react";
import useChatStore from "@/store/chatStore";
import { SelectedUser } from "@/lib/types";

const LeftSideBar = () => {
  const { users, selectedUser, setSelectedUser, initializeAuth } = useChatStore(
    (state) => ({
      users: state.users,
      selectedUser: state.selectedUser,
      setSelectedUser: state.setSelectedUser,
      initializeAuth: state.initializeAuth,
    })
  );

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe();
  }, [initializeAuth, selectedUser]);

  const handleUserClick = (user: SelectedUser) => {
    console.log(`selectedUser ${user}`);
    setSelectedUser(user);
  };

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky flex flex-col left-0 top-0 h-screen border-r p-2 max-h-[43.5rem] overflow-y-scroll custom-scrollbar shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] gap-5">
      <h2 className="font-semibold text-xl">All Users</h2>
      <ul className="flex flex-col gap-5">
        {users.map((user) => (
          <li
            onClick={() => handleUserClick(user)}
            key={user.id}
            className={` ${
              selectedUser?.id === user.id ? "bg-zinc-800 rounded-lg" : ""
            } text-white p-3 cursor-pointer`}>
            {user.username}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LeftSideBar;
