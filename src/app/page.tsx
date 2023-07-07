"use client";
import Image from "next/image";
import { GoPerson } from "react-icons/go";
import mindChat from "@/img/mindChat.png";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden  bg-gradient-to-tr from-mindchat-bg-dark to-mindchat-bg-dark-darker">
      <div className="relative mx-auto h-full w-full overflow-hidden">
        <Image
          src={mindChat}
          width={1500}
          alt="mindChatBackgroundImage"
          className="absolute right-[-470px] top-[50px]"
        />
        <div className="container relative mx-auto h-full">
          <Header />
          <main className="flex h-full w-1/2 items-center justify-start pt-[30px] text-start">
            <div className="flex flex-col">
              <h1 className="text-[112px] font-black text-mindchat-primary">
                MIND CHAT
              </h1>
              <p className="mt-6 text-[26px] font-bold leading-[42px] tracking-wider text-white">
                &#8220;Immerse in Visual Thinking: MIND CHAT, Your
                Gateway&#8221;
              </p>
              <a href="/map">
                <button className="mt-[72px] rounded-full border border-mindchat-bg-dark-darker bg-gradient-to-r from-mindchat-primary to-cyan-500 px-10 py-3 text-xl font-semibold text-mindchat-bg-dark hover:from-cyan-300  hover:to-cyan-500  hover:text-white">
                  Get started
                </button>
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
