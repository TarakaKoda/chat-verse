import React from "react";

type UserChatProps = {
  param: { id: string };
};

const UserChatPage = ({ param: { id } }: UserChatProps) => {
  return <div>UserChatPage{id}</div>;
};

export default UserChatPage;
