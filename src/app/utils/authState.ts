import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { store } from "@/redux/store";
import { setUid } from "@/redux/features/userInfoSlice";

export function authStateChangeHabdler() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
      store.dispatch(setUid(uid));
    } else {
      console.log("error");
    }
  });
}
