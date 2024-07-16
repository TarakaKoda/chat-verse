import Link from "next/link";

interface User {
  id: string;
  username: string;
  online: boolean;
}

interface AllUsersProps {
  users: User[];
  selectedUser: User | null;
  handleUserClick: (user: User) => void;
}

const AllUsers = ({ users, selectedUser, handleUserClick }: AllUsersProps) => {
  return (
    <ul className="flex flex-col gap-5">
      {users.map((user) => (
        <li
          key={user.id}
          className={` ${
            selectedUser?.id === user.id
              ? "bg-zinc-800 rounded-lg text-white"
              : ""
          } text-white p-3 cursor-pointer`}>
          <Link href={`/chats/${user.id}`}></Link>
          {user.username}
        </li>
      ))}
    </ul>
  );
};

export default AllUsers;
