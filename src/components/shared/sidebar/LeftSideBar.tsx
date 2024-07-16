"use client";

import { useEffect } from "react";
import useChatStore from "@/store/chatStore";

const LeftSideBar = () => {
  const { users, selectedUser, setSelectedUser, initializeAuth } = useChatStore(
    (state) => ({
      users: state.users,
      selectedUser: state.selectedUser,
      setSelectedUser: state.setSelectedUser,
      initializeAuth: state.initializeAuth,
    })
  );

  console.log(`all Users: ${users} llllllllllll`);

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe();
  }, [initializeAuth]);

  const handleUserClick = (user) => {
    console.log(`selectedUser ${user}`)
    setSelectedUser(user);
  };

  console.log(`All Users ${users}`)

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky flex flex-col left-0 top-0 h-screen overflow-y-auto border-r p-2  shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] gap-5">
      <h2 className="font-semibold text-xl">All Users</h2>
      <ul className="flex flex-col gap-5">
        {users.map((user) => (
          <li
            onClick={() => handleUserClick(user)}
            key={user.id}
            className={` ${
              selectedUser?.id === user.id
                ? "bg-zinc-800 rounded-lg"
                : "border-white border-b-2 outline-1"
            } text-white p-3 cursor-pointer`}>
            {user.username}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LeftSideBar;
