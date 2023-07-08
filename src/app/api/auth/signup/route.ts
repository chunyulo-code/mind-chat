import { auth } from "@/app/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const requestBody = await req.json(); // 解析請求內容為 JSON
  const { email, password } = requestBody;
  console.log(`email: ${email}, password: ${password}`);
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential: any) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("===========================");
      console.log(errorMessage);
      // ..
    });
  return NextResponse.json({ a: "123" });
}
