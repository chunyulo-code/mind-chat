import { NextResponse } from "next/server";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/app/utils/firebase";

export async function POST(req: Request) {
  const requestBody = await req.json(); // 解析請求內容為 JSON
  const { keywordToAdd } = requestBody;
  console.log(`myKeyWord: ${keywordToAdd}`);
  console.log("=====!!!=====");
  const userUID = "9TjkIyfzR6VmZyrBLX9f9348nni1";
  const selectedMap = "map3";
  const docRef = doc(db, "users", userUID, "maps", selectedMap);
  // try {
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     console.log(`docData: ${docSnap.data()}`);
  //   } else {
  //     console.log("DocSnap doesn't exist");
  //   }
  // } catch (error) {
  //   console.error(error);
  // }

  return new NextResponse(`Keyword is added: ${keywordToAdd}`);
}
