"use client";
import Image from "next/image";
import { GoPerson } from "react-icons/go";
import mindChat from "@/img/mindChat.png";
import Header from "./components/Header";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

export default function Home() {
  const userUid = useAppSelector((state) => state.userInfo.uid);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-tr from-mindchat-bg-dark to-mindchat-bg-dark-darker">
      <div className="relative mx-auto h-full w-full overflow-hidden">
        <Image
          src={mindChat}
          width={1400}
          alt="mindChatBackgroundImage"
          className="absolute right-[-490px] top-[200px] 2xl:right-[-650px] lg:hidden"
        />
        <div className="relative mx-auto h-full w-full px-[130px]">
          <Header />
          <main className="flex h-full w-1/2 items-center justify-start pt-[50px] text-start lg:w-full">
            <div className="flex flex-col gap-[60px] pr-[46px] lg:pr-0">
              <p className="text-[35px] font-bold leading-[80px] text-white">
                Immerse in Visual Thinking
                <br />
                <span className="text-[110px] font-black leading-[120px]  text-mindchat-primary">
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
                      {userUid ? "Get started" : "Try it"}
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
