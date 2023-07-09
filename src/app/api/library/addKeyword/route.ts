import { NextResponse } from "next/server";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/app/utils/firebase";

export async function POST(req: Request) {
  const requestBody = await req.json(); // 解析請求內容為 JSON
  const { keywordToAdd } = requestBody;
  console.log(keywordToAdd);
  const userUID = "9TjkIyfzR6VmZyrBLX9f9348nni1";
  const selectedMap = "map3";
  console.log("=====!!!=====");
  const docRef = doc(db, "users", userUID, "maps", selectedMap);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const keywords = docSnap.data()?.keywords;
    const newKeywords = [...keywords, keywordToAdd];
    await updateDoc(docRef, { library: newKeywords });
    console.log("Updated!!!");
  } else {
    console.log("DocSnap doesn't exist");
  }
  return new NextResponse("Keyword is added");
}
