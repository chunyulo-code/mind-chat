import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { store } from "@/redux/store";
import { setIsLogIn, setUserUid } from "@/redux/features/userInfoSlice";
import { db, auth } from "./firebase";

const providerGoogle = new GoogleAuthProvider();

export async function googleSignIn() {
  signInWithPopup(auth, providerGoogle)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        const user = result.user;
        const { uid, email, displayName, photoURL } = user;
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`${errorCode}: ${errorMessage}`);
    });
}

export async function nativeCreateAccount(
  userName: string,
  email: string,
  password: string
) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential: any) => {
      // Signed in
      const { uid, displayName } = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`${errorCode}: ${errorMessage}`);
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
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export async function nativeGoogleSignOut() {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      console.error(error);
    });
}
