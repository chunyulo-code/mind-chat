"use client";
import Image from "next/image";
import SignIn from "./SignIn";
import pad from "@/img/pad.png";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";
import ReactLoading from "react-loading";

export default function Page() {
  const isLoading = useAppSelector((state) => state.userInfo.isLoading);
  const userUid = useAppSelector((state) => state.userInfo.uid);
  if (userUid) redirect("/map", RedirectType.replace);

  return isLoading ? (
    <div className="flex h-screen w-screen items-center justify-center bg-mindchat-bg-dark">
      <ReactLoading
        type="spinningBubbles"
        color="#ffffff"
        height={"50px"}
        width={"50px"}
      />
    </div>
  ) : (
    <div className="flex h-screen overflow-hidden bg-gradient-to-tr from-mindchat-bg-dark to-mindchat-bg-dark-darker p-[20px] pr-0 text-white md:items-center">
      <div className="flex w-1/2 flex-col justify-center gap-[30px] px-[200px] 2xl:px-[150px] xl:px-[100px] lg:px-[50px] md:w-full">
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/mindChat.svg"
              alt="Mind Chat Logo"
              width={100}
              height={100}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>
        <SignIn />
      </div>
      <div className="relative w-1/2 overflow-hidden rounded-l-3xl bg-mindchat-login-bg md:hidden">
        <Image
          src={pad}
          width={1200}
          alt="mindChatImage"
          className="absolute left-[130px] top-[150px] max-w-none"
        />
      </div>
    </div>
  );
}
