"use client";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

export default function MapPageButton() {
  const userUid = useAppSelector((state) => state.userInfo.uid);

  return (
    <Link href="/map">
      <div className="w-[250px] rounded-full bg-gradient-to-r from-mindchat-primary to-cyan-700 p-[2px] text-xl font-normal text-mindchat-bg-dark">
        <div className="rounded-full bg-mindchat-bg-dark hover:bg-transparent">
          <div className="py-4 text-center text-white">
            {userUid ? "Get started" : "Try it"}
          </div>
        </div>
      </div>
    </Link>
  );
}
