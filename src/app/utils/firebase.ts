import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";
import { store } from "@/redux/store";
import { setCurrentUid, setIsLogIn } from "@/redux/features/userInfoSlice";

const firebaseConfig = {
  apiKey: "AIzaSyBbCc_FxEcg9jnqvASCREn1VAjlCrasdus",
  authDomain: "mindchat-ba82e.firebaseapp.com",
  projectId: "mindchat-ba82e",
  storageBucket: "mindchat-ba82e.appspot.com",
  messagingSenderId: "33301755306",
  appId: "1:33301755306:web:c98ca427062b3eb859a7d3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export async function nativeCreateAccount(
  userName: string,
  email: string,
  password: string
) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential: any) => {
      // Signed in
      const uid = userCredential.user.uid;
      window.localStorage.setItem("uid", uid);
      store.dispatch(setCurrentUid(uid));
      store.dispatch(setIsLogIn(true));
      console.log("===========================");
      console.log(`uid: ${uid}`);
      console.log("===========================");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("===========================");
      console.log(errorMessage);
      console.log("===========================");
    });
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: userName }).catch(
      (err) => console.error(err)
    );
  }
}

export async function nativeSignIn(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: any) => {
      const uid = userCredential.user.uid;
      console.log(uid);
      window.localStorage.setItem("uid", uid);
      store.dispatch(setCurrentUid(uid));
      store.dispatch(setIsLogIn(true));
      console.log(`Log in successfully`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error Code: ${errorCode}, Error Msg: ${errorMessage}`);
    });
}

export async function nativeSignOut() {
  signOut(auth)
    .then(() => {
      window.localStorage.removeItem("uid");
      console.log("Sign out successfully!");
    })
    .catch((error) => {
      console.error(error);
    });
}
