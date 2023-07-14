import React from "react";
import Image from "next/image";
import { GoPerson } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { nativeGoogleSignOut } from "../utils/firebaseAuth";
import { useAppSelector } from "@/redux/hooks";
import blankProfilePicture from "@/img/blank-profile-picture.png";

export default function HeaderBar() {
  const userUid = useAppSelector((state) => state.userInfo.uid);
  const userPhotoURL = useAppSelector((state) => state.userInfo.photoURL);
  const userPhoto = (
    <Image
      src={userPhotoURL ? userPhotoURL : blankProfilePicture}
      width={35}
      height={35}
      alt="Profile photo"
      className="cursor-pointer rounded-full border border-mindchat-secondary"
    />
  );

  const iconStyle =
    "flex items-center rounded-lg bg-mindchat-bg-dark-darker p-3 hover:border hover:border-mindchat-primary hover:text-mindchat-primary";
  const listItems = [
    {
      id: "profile",
      shouldDisplay: true,
      icon: userUid ? userPhoto : <GoPerson />,
      style: userUid ? "" : iconStyle,
      clickHandler: () => {}
    },
    {
      id: "signOut",
      shouldDisplay: userUid ? true : false,
      icon: <FiLogOut />,
      style: iconStyle,
      clickHandler: () => nativeGoogleSignOut()
    }
  ];

  return (
    <header className="absolute top-0 flex h-full w-full items-center justify-between border-b border-mindchat-bg-dark-darker bg-mindchat-bg-dark px-8 text-white shadow-md shadow-gray-700">
      <Link href="/" title="logo" className="flex items-center">
        <Image
          src="/mindChat.svg"
          alt="Mind Chat Logo"
          width={40}
          height={40}
          style={{ cursor: "pointer" }}
        />
        <span className="ml-5 text-lg font-bold text-mindchat-primary">
          MIND CHAT
        </span>
      </Link>
      <ul
        className={`flex items-center ${
          userUid ? "gap-[18px]" : "gap-[10px]"
        } text-xl font-semibold`}
      >
        {listItems.map((listItem) => (
          <li key={listItem.id}>
            <Link
              href="/signin"
              onClick={listItem.clickHandler}
              className={listItem.style}
            >
              {listItem.icon}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
