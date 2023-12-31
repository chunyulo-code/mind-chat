import { NextResponse } from "next/server";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/app/utils/firebase";

export async function POST(req: Request) {
  const requestBody = await req.json(); // 解析請求內容為 JSON
  const { userUid, mapToAdd, keywordToAdd } = requestBody;
  const docRef = doc(db, "users", userUid, "maps", mapToAdd);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const keywords = docSnap.data().library;
    const newKeywords = [...keywords, keywordToAdd];
    await updateDoc(docRef, { library: newKeywords });
  } else {
    console.error("DocSnap doesn't exist");
  }
  return new NextResponse(`Keyword is added: ${keywordToAdd}`);
}
