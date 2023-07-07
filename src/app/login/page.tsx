"use client";
import Image from "next/image";
import Header from "../components/Header";
import Login from "./Login";
import pad from "@/img/pad.png";

export default function page() {
  return (
    <div className="flex h-screen  overflow-hidden bg-gradient-to-tr from-mindchat-bg-dark to-mindchat-bg-dark-darker p-[20px] pr-0 text-white">
      <div className="flex w-1/2 flex-col justify-center px-10">
        <div className="flex flex-col items-center">
          <Image
            src="/mindChat.svg"
            alt="Mind Chat Logo"
            width={100}
            height={100}
            style={{ cursor: "pointer" }}
          />
        </div>
        <Login />
      </div>
      <div className="relative w-1/2 overflow-hidden rounded-l-3xl bg-mindchat-login-bg">
        <Image
          src={pad}
          width={1200}
          alt="mindChatImage"
          className="absolute left-[130px] top-[150px] max-w-none"
        />
      </div>
      {/* <Image
        src={perspectiveLaptop}
        width={1200}
        alt="mindChatBackgroundImage"
        className="absolute left-[0px] top-[100px]"
      /> */}

      {/* <Login /> */}
    </div>
  );
}