'use client'
import { useUserChat } from "@/hooks/useUserChat";
import AllUsers from "../AllUsers";

type Props = {};

const LeftSideBar = (props: Props) => {
  const {handleUserClick, chats, selectedUser,currentUser,users} = useUserChat()
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky flex flex-col left-0 top-0 h-screen overflow-y-auto border-r p-2  shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] gap-5 ">
      <h2 className="font-semibold text-xl">All Users</h2>
      <AllUsers users={users} selectedUser={selectedUser} handleUserClick={handleUserClick}/>
    </section>
  );
};

export default LeftSideBar;
