import { NextResponse } from "next/server";
import { db } from "@/app/utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function POST(req: Request) {
  const requestBody = await req.json(); // 解析請求內容為 JSON
  const { keyword } = requestBody;
  console.log(`keywordToAdd: ${keyword}`);
  const userUID = "r3NKJ1L8I0THTH91WuFq";
  const selectedMap = "map1";
  const docRef = doc(db, "users", userUID, "maps", selectedMap);
  const docSnap = await getDoc(docRef);
  const keywords = docSnap.data()?.keywords;
  const newKeywords = [...keywords, keyword];
  await updateDoc(docRef, { keywords: newKeywords });
  console.log("Updated!!!");
  return new NextResponse("Chun");
}
