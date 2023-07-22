"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { nativeGoogleSignOut } from "../utils/firebaseAuth";
import blankProfilePicture from "@/img/blank-profile-picture.png";
import { Logo } from "./HeaderLogo";

export default function Header() {
  const userPhotoURL = useAppSelector((state) => state.userInfo.photoURL);
  const userUid = useAppSelector((state) => state.userInfo.uid);

  const listItems = [
    {
      text: "FEATURES",
      isLink: true,
      shouldDisplay: true,
      clickHandler: () => {}
    },
    {
      text: "PRICING",
      isLink: true,
      shouldDisplay: true,
      clickHandler: () => {}
    },
    {
      text: "TUTORIAL",
      isLink: true,
      shouldDisplay: true,
      clickHandler: () => {}
    },
    {
      text: "LOG OUT",
      isLink: false,
      shouldDisplay: userUid ? true : false,
      clickHandler: () => nativeGoogleSignOut()
    }
  ];

  function DisplayProfileOrSignIn() {
    return userUid ? (
      <Link href="/map">
        <Image
          src={userPhotoURL ? userPhotoURL : blankProfilePicture}
          width={35}
          height={35}
          alt="Profile photo"
          className="cursor-pointer rounded-full border border-white"
        />
      </Link>
    ) : (
      <Link
        href="/signin"
        className="flex items-center rounded-full border border-mindchat-primary px-10 py-2 hover:text-mindchat-primary"
      >
        <span className="">SIGN IN</span>
      </Link>
    );
  }

  function ListItems() {
    return (
      <ul className="flex items-center gap-8 text-sm font-normal">
        {listItems.map(
          (listItem) =>
            listItem.shouldDisplay && (
              <li
                key={listItem.text}
                className="cursor-pointer hover:text-mindchat-primary"
                onClick={listItem.clickHandler}
              >
                {listItem.isLink ? (
                  <Link href="#">{listItem.text}</Link>
                ) : (
                  listItem.text
                )}
              </li>
            )
        )}
        <li>
          <DisplayProfileOrSignIn />
        </li>
      </ul>
    );
  }

  return (
    <header className="absolute left-[130px] right-[130px] top-0 flex h-[130px] items-center justify-between py-10 text-white">
      <Logo logoSize={50} />
      <ListItems />
    </header>
  );
}
