"use client";

import { onAuthStateChanged } from "firebase/auth";
import {
  setIsLogIn,
  setIsLoading,
  setUserUid,
  setUserEmail,
  setUserDisplayName,
  setUserPhotoURL
} from "@/redux/features/userInfoSlice";
import { db, auth } from "./firebase";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";

export default function BindAuthStateHandler() {
  store.dispatch(setIsLoading(true));

  useEffect(() => {
    const authStateListner = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        store.dispatch(setIsLogIn(true));
        store.dispatch(setUserUid(uid));
        store.dispatch(setUserEmail(email));
        store.dispatch(setUserDisplayName(displayName));
        store.dispatch(setUserPhotoURL(photoURL));

        setDoc(doc(db, "users", uid), {
          email: email,
          userName: displayName
        });
        console.log(`Current user is: ${displayName}`);
      } else {
        store.dispatch(setIsLogIn(false));
        store.dispatch(setUserUid(null));
        store.dispatch(setUserEmail(null));
        store.dispatch(setUserEmail(null));
        store.dispatch(setUserPhotoURL(null));
        console.log("No user logged in now");
      }
    });

    store.dispatch(setIsLoading(false));

    return () => authStateListner();
  }, []);

  return <></>;
}
