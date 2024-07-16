const UserCard = ({ username }: { username: string }) => {
  return (
    <div
      className={`flex-col gap-4 rounded-[20px] justify-center items-center border bg-black border-dark-4 px-5 py-8`}>
      <div className="h-14 w-14 bg-zinc-800 flex items-center justify-center object-cover rounded-full">
        <p>{username[0]}</p>
      </div>
      <div className="flex-center flex-col gap-1">
        <p className="base-medium line-clamp-1 text-center text-light-1">
          {username}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
