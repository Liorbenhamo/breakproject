import React, { useState } from "react";
import { useEffect } from "react";
import { takeusers } from "../utils/AuthService";

function MessegesPage() {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    async function TakeUsers() {
      try {
        let allusers = await takeusers();
        setUsers(allusers.data);
        console.log(allusers.data);
      } catch (err) {
        console.log(err.response.data);
      }
    }

    TakeUsers();
  }, []);
  return (
    <div style={{ width: "45vw" }} className="text-white">
      <h1 className="text-3xl font-semibold whitespace-nowrap dark:text-white">
        chats
      </h1>
      <hr />
      {Users.map((user) => (
        <div onClick={handleclick} className="flex border p-2 m-2 rounded-md">
          <img
            src={user.userimgurl}
            alt="userimg"
            className="rounded-full h-6 me-3 sm:h-7"
          />
          <span>{user.username}</span>
        </div>
      ))}
    </div>
  );
}

export default MessegesPage;
