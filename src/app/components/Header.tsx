import React from "react";
import Image from "next/image";
import { GoPerson } from "react-icons/go";

export default function Header() {
  return (
    <header className="absolute top-0 flex h-[130px] w-full items-center justify-between py-10 text-white">
      <a href="/" title="logo" className="flex items-center">
        <Image
          src="/mindChat.svg"
          alt="Mind Chat Logo"
          width={50}
          height={50}
          style={{ cursor: "pointer" }}
        />
        <span className="ml-5 text-xl font-bold text-mindchat-primary">
          MIND CHAT
        </span>
      </a>
      <ul className="flex items-center gap-8 font-semibold">
        <li>
          <a href="#" className="hover:text-mindchat-primary">
            FEATURES
          </a>
        </li>
        <li>
          <a
            href="/login"
            className="flex items-center rounded-full border border-mindchat-primary px-8 py-2 hover:text-mindchat-primary"
          >
            <GoPerson className="text-xl" />
            <span className="ml-3">LOG IN</span>
          </a>
        </li>
      </ul>
    </header>
  );
}
