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
          width={1350}
          alt="mindChatBackgroundImage"
          className="absolute right-[-370px] top-[190px]"
        />
        <div className="container relative mx-auto h-full w-full">
          <Header />
          <main className="flex h-full w-1/2 items-center justify-start pt-[60px] text-start">
            <div className="flex flex-col gap-[60px] pr-[46px]">
              <p className="text-[50px] font-bold leading-[80px] text-white">
                Immerse in Visual Thinking:
                <br />
                <span className="text-[85px] font-black leading-[120px]  text-mindchat-primary">
                  MIND CHAT
                </span>
                , <br />
                Your Gateway
              </p>
              <p className="w-4/5 text-[16px] font-normal leading-[34px] tracking-wider text-mindchat-secondary">
                a web application that facilitates visual thinking for users by
                combining mind maps and ChatGPT.
              </p>
              <Link href="/map">
                <div className="w-[250px] rounded-full bg-gradient-to-r from-mindchat-primary to-cyan-700 p-[2px] text-xl font-normal text-mindchat-bg-dark">
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
