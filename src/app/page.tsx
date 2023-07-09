"use client";
import Image from "next/image";
import { GoPerson } from "react-icons/go";
import mindChat from "@/img/mindChat.png";
import Header from "./components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden  bg-gradient-to-tr from-mindchat-bg-dark to-mindchat-bg-dark-darker">
      <div className="relative mx-auto h-full w-full overflow-hidden">
        <Image
          src={mindChat}
          width={1500}
          alt="mindChatBackgroundImage"
          className="absolute right-[-470px] top-[70px]"
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
              <Link href="/map">
                <div className="mt-[100px] w-[250px] rounded-full bg-gradient-to-r from-mindchat-primary to-cyan-700 p-[2px] text-xl font-normal text-mindchat-bg-dark">
                  <div className="rounded-full bg-mindchat-bg-dark hover:bg-transparent">
                    <div className="py-4 text-center text-white">
                      Get started
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
