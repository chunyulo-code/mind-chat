import React from "react";
import Image from "next/image";
import { GoPerson } from "react-icons/go";
import Link from "next/link";

export default function Header() {
  const listItems = ["FEATURES", "PRICING", "TUTORIAL"];
  return (
    <header className="absolute top-0 flex h-[130px] w-full items-center justify-between py-10 text-white">
      <Link href="/" title="logo" className="flex items-center">
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
      </Link>
      <ul className="flex items-center gap-8 text-sm font-normal">
        {listItems.map((listItem) => (
          <li key={listItem}>
            <Link href="#" className="hover:text-mindchat-primary">
              {listItem}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/signin"
            className="flex items-center rounded-full border border-mindchat-primary px-10 py-2 hover:text-mindchat-primary"
          >
            <span className="">LOG IN</span>
          </Link>
        </li>
      </ul>
    </header>
  );
}
