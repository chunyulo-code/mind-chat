"use clinet";
import React, { useState } from "react";
import { BiSolidUserBadge } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";

type AccountData = {
  userName: string;
  email: string;
  password: string;
  [key: string]: string; // Specify other keys if needed
};

export default function Login() {
  const [accountData, setAccountData] = useState<AccountData>({
    userName: "",
    email: "",
    password: ""
  });

  const labels = [
    { text: "User name", icon: <BiSolidUserBadge />, id: "userName" },
    { text: "Email", icon: <MdEmail />, id: "email" },
    { text: "Password", icon: <TbPassword />, id: "password" }
  ];

  async function createAccount(email: string, password: string) {
    const response = await fetch(`/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password })
    });

    const data = await response.json();
    console.log(data);
  }

  function clickHandler() {
    console.log("clicked");
    createAccount(accountData.email, accountData.password);
  }

  return (
    <div className="rounded-2xl px-[80px] py-[40px] text-white">
      <div className="font-medium text-mindchat-secondary">START FOR FREE</div>
      <div className="mt-7 text-5xl font-black">
        Create new account
        <span className="ml-2 text-5xl text-mindchat-primary">.</span>
      </div>
      <div className="mt-6 text-sm text-mindchat-secondary">
        Alright A Member?
        <a href="/login">
          <span className="ml-2 cursor-pointer font-medium text-mindchat-primary">
            Log In
          </span>
        </a>
      </div>
      <div className="mt-12 flex flex-col gap-6">
        {labels.map((label) => (
          <div key={label.text} className="relative ">
            <input
              type="text"
              id={label.text}
              className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-mindchat-primary focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-mindchat-primary"
              value={accountData[label.id]}
              onChange={(e) =>
                setAccountData((prev) => ({
                  ...prev,
                  [label.id]: e.target.value
                }))
              }
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2">
              {label.icon}
            </span>
            <label
              htmlFor={label.text}
              className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-mindchat-bg-dark dark:text-gray-400 peer-focus:dark:text-mindchat-primary"
            >
              {label.text}
            </label>
          </div>
        ))}
        <div className="text-right">
          <button
            className="rounded-full bg-mindchat-primary px-10 py-3 text-sm font-medium text-mindchat-bg-dark"
            onClick={clickHandler}
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}
