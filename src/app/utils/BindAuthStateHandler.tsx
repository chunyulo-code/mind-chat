"use client";

import { onAuthStateChanged } from "firebase/auth";
import { setCurrentUid, setIsLogIn } from "@/redux/features/userInfoSlice";
import { auth } from "./firebase";
import { store } from "@/redux/store";
import { useEffect } from "react";

export default function BindAuthStateHandler() {
  useEffect(() => {
    const authStateListner = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        store.dispatch(setIsLogIn(true));
        store.dispatch(setCurrentUid(uid));
        console.log(`Current user is: ${uid}`);
      } else {
        store.dispatch(setIsLogIn(false));
        store.dispatch(setCurrentUid(null));
        console.log("User in signed out");
      }
    });
    return () => authStateListner();
  }, []);

  return <></>;
}
