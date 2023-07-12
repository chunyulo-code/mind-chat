"use client";

import { onAuthStateChanged } from "firebase/auth";
import {
  setIsLogIn,
  setUserUid,
  setUserEmail,
  setUserDisplayName
} from "@/redux/features/userInfoSlice";
import { auth } from "./firebase";
import { store } from "@/redux/store";
import { useEffect } from "react";

export default function BindAuthStateHandler() {
  useEffect(() => {
    const authStateListner = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        store.dispatch(setIsLogIn(true));
        store.dispatch(setUserUid(uid));
        store.dispatch(setUserEmail(email));
        store.dispatch(setUserEmail(displayName));
        console.log(`Current user is: ${uid}`);
        console.log(`user: ${JSON.stringify(user)}`);
      } else {
        store.dispatch(setIsLogIn(false));
        store.dispatch(setUserUid(null));
        store.dispatch(setUserEmail(null));
        store.dispatch(setUserEmail(null));
        console.log("User in signed out");
      }
    });
    return () => authStateListner();
  }, []);

  return <></>;
}
