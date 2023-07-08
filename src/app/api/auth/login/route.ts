import { auth } from "@/app/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const requestBody = await req.json(); // 解析請求內容為 JSON
  const { email, password } = requestBody;
  console.log(`email: ${email}, password: ${password}`);
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: any) => {
      // Signed in
      const user = userCredential.user;
      console.log(`Log in successfully`);
      console.log(user.uid);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("===========================");
      console.log(`Error Code: ${errorCode}, Error Msg: ${errorMessage}`);
      // ..
    });
  return NextResponse.json({ uid: "Log in clicked" });
}
