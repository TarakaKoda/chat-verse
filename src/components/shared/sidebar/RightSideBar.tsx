"use client";

import useChatStore from "@/store/chatStore";
import UserCard from "../UserCard";

type Props = {};

const RightSideBar = (props: Props) => {
  const { users } = useChatStore((state) => ({
    users: state.users,
  }));

  return (
    <div className="flex flex-col items-center justify-start w-70 ">
      <h2 className="font-semibold text-xl">Online Users</h2>
      <ul className=" p-10 h-full flex flex-col gap-5 max-h-[43.5rem] overflow-y-scroll custom-scrollbar">
        {users?.map((user) => (
          <li key={user.id}>
            {user.online && <UserCard username={user.username} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightSideBar;
