import React from "react";
import Image from "next/image";
import { GoPerson } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { nativeSignOut } from "../utils/firebase";

export default function HeaderBar() {
  const listItems = [
    { id: "profile", icon: <GoPerson />, clickHandler: () => {} },
    { id: "signOut", icon: <FiLogOut />, clickHandler: () => nativeSignOut() }
  ];

  return (
    <header className="absolute top-0 flex h-full w-full items-center justify-between border-b border-mindchat-bg-dark-darker bg-mindchat-bg-dark px-8 text-white shadow-md shadow-gray-700">
      <Link href="/" title="logo" className="flex items-center">
        <Image
          src="/mindChat.svg"
          alt="Mind Chat Logo"
          width={40}
          height={40}
          style={{ cursor: "pointer" }}
        />
        <span className="ml-5 text-lg font-bold text-mindchat-primary">
          MIND CHAT
        </span>
      </Link>
      <ul className="flex items-center gap-[10px] text-xl font-semibold">
        {listItems.map((listItem) => (
          <li key={listItem.id}>
            <Link
              href="/signin"
              onClick={listItem.clickHandler}
              className="flex items-center rounded-lg bg-mindchat-bg-dark-darker p-3 hover:border hover:border-mindchat-primary hover:text-mindchat-primary"
            >
              {listItem.icon}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
