import { NextResponse } from "next/server";
import { db } from "@/app/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req: Request, res: Response) {
  const userUID = "r3NKJ1L8I0THTH91WuFq";
  const selectedMap = "map1";
  const docRef = doc(db, "users", userUID, "maps", selectedMap);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log(docSnap.data().keywords);
  } else {
    console.log("Doc is not existed");
  }
  return NextResponse.json(docSnap.data()?.keywords);
}
