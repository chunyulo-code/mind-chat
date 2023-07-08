import { NextResponse } from "next/server";
import { db } from "@/app/utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function POST(req: Request) {
  const requestBody = await req.json(); // 解析請求內容為 JSON
  const { keywordToAdd } = requestBody;
  console.log(`keywordToAdd: ${keywordToAdd}`);
  const userUid = "r3NKJ1L8I0THTH91WuFq";
  const selectedMap = "map1";
  const docRef = doc(db, "users", userUid, "maps", selectedMap);
  const docSnap = await getDoc(docRef);
  const keywords = docSnap.data()?.library;
  const newKeywords = [...keywords, keywordToAdd];
  await updateDoc(docRef, { library: newKeywords });
  console.log("Added!!!");
  return new NextResponse("Chun");
}
