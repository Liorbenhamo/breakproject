import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { takeuser } from "../utils/AuthService";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState({});
  const { id } = useParams();
  useEffect(() => {
    async function getprofileofuser() {
      const userfromback = await takeuser(id);
      setUserProfile(userfromback.data);
    }
    getprofileofuser();
  }, []);
  console.log(userProfile);

  return <div className="text-white">{userProfile.username}</div>;
}
