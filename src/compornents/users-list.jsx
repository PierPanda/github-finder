import React, { useState } from "react";
import Loader from "../compornents/loader";

export default function UsersList({ users, loading, handleClick }) {
  const [lastUser, setLastUser] = useState(null);

  if (loading) {
    return <Loader />;
  }

  const handleUserClick = (e, login) => {
    e.preventDefault();

    if (lastUser === login) {
      setLastUser(null);
      return;
    }

    if (lastUser) {
      handleClick(e, null);

      setTimeout(() => {
        handleClick(e, login);
        setLastUser(login);
      }, 50);
    } else {
      handleClick(e, login);
      setLastUser(login);
    }
  };

  return users?.length > 0 ? (
    <ul
      className="fixed top-5 bottom-5 p-5 flex max-h-screen w-120 flex-col justify-start gap-2 m-5 overflow-auto z-10 hide-scrollbar"
      style={{ listStyle: "none" }}
    >
      {users.map((user) => (
        <li
          key={user.id}
          className={`border bg-amber-50 border-gray-300 w-100 text-center rounded-md p-2 cursor-pointer hover:border-blue-500 ${
            lastUser === user.login ? "bg-blue-50" : ""
          }`}
          onClick={(e) => handleUserClick(e, user.login)}
        >
          <div className="flex items-center gap-3 ">
            <img
              src={user.avatar_url}
              alt={`Avatar de ${user.login}`}
              className="w-10 h-10 rounded-full"
            />
            <span className="font-bold text-xl">{user.login}</span>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <h3 className="text-center m-2 text-2xl text-amber-50">
      Looking for a GitHub account ? 👀
    </h3>
  );
}
