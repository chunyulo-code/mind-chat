"use client";
import Image from "next/image";
import SignInForm from "./SignInForm";
import pad from "@/img/pad.png";
import FormLogo from "../components/FormLogo";
import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";
import Loading from "../components/Loading";
import { useEffect } from "react";

export default function Page() {
  const isLoading = useAppSelector((state) => state.userInfo.isLoading);
  const userUid = useAppSelector((state) => state.userInfo.uid);

  useEffect(() => {
    if (userUid) redirect("/map", RedirectType.replace);
  }, [userUid]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex h-screen overflow-hidden bg-gradient-to-tr from-mindchat-bg-dark to-mindchat-bg-dark-darker p-[20px] pr-0 text-white md:items-center">
      <div className="h-full w-1/2">
        <LeftForm />
      </div>
      <div className="h-full w-1/2">
        <RightImage />
      </div>
    </div>
  );
}

function LeftForm() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-[30px] px-[200px] 2xl:px-[150px] xl:px-[100px] lg:px-[50px] md:w-full">
      <FormLogo />
      <SignInForm />
    </div>
  );
}

function RightImage() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-l-3xl bg-mindchat-login-bg md:hidden">
      <Image
        src={pad}
        width={1200}
        alt="mindChatImage"
        className="absolute left-[130px] top-[150px] max-w-none"
      />
    </div>
  );
}
