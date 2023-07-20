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

        console.log(`Welcome ${displayName}`);
        console.log(`uid: ${uid}`);
        console.log(`email: ${email}`);
        console.log(`photoURL: ${photoURL}`);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
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
      console.log(`Create account successfully: ${displayName}, ${uid}`);
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
      console.log(`Log in successfully`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error Code: ${errorCode}, Error Msg: ${errorMessage}`);
    });
}

export async function nativeGoogleSignOut() {
  signOut(auth)
    .then(() => {
      console.log("Sign out successfully!");
    })
    .catch((error) => {
      console.error(error);
    });
}
