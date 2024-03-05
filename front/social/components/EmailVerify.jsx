import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../utils/AuthService";

function EmailVerify({ information }) {
  const navigate = useNavigate();

  const [emailcode, setEmailcode] = useState("");

  function handlechange(e) {
    setEmailcode(e.target.value);
  }

  async function handleclick() {
    if (emailcode == information.passwordemail) {
      try {
        console.log("lol");
        const response = await signup(information);
        navigate("/");
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("incorrect");
    }
  }

  return (
    <div className=" w-1/4 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-black dark:border-gray-700">
      <h1 className="text-xl font-medium text-gray-900 dark:text-white">
        email verify
      </h1>
      <p className="mt-2 text-gray-900 dark:text-white">
        code sended to your email please write it{" "}
      </p>
      <input
        onChange={(e) => handlechange(e)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        type="text"
        name="user_name"
      />
      <input
        onClick={() => handleclick()}
        className="mt-2 w-full text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
        type="submit"
        value="Send"
      />
    </div>
  );
}

export default EmailVerify;
