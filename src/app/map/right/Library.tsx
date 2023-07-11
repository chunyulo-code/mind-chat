"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useChat } from "ai/react";
import { ChatCompletionResponseMessageRoleEnum } from "openai-edge";
import { GptStatus } from "@/app/types/outputSliceTypes";
import {
  setGptStatus,
  emptyOutput,
  setOutput
} from "@/redux/features/outputSlice";
import { nanoid } from "nanoid";
import { systemResponseRules } from "@/app/utils/summarizeLibraryRules";
import { useEffect } from "react";
import { setLibrary } from "@/redux/features/librarySlice";
import { TiDeleteOutline } from "react-icons/ti";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/app/utils/firebase";
import { updateFSLibrary } from "@/app/utils/firestoreUpdater";

export default function Library() {
  const dispatch = useAppDispatch();
  const keywords = useAppSelector((state) => state.library.value);
  const selectedMap = useAppSelector((state) => state.userInfo.selectedMap);
  const userUid = auth.currentUser?.uid;

  async function deleteKeywordHandler(keywordToDelete: string) {
    const newKeywords = keywords.filter(
      (keyword) => keyword !== keywordToDelete
    );
    dispatch(setLibrary(newKeywords));
  }

  const { messages, setInput, handleSubmit } = useChat({
    api: "/api/gpt",
    initialMessages: [
      {
        id: nanoid(),
        role: ChatCompletionResponseMessageRoleEnum.System,
        content: systemResponseRules
      }
    ],
    onResponse: () => {
      console.log("DOING");
      dispatch(emptyOutput());
      dispatch(setGptStatus(GptStatus.DOING));
    },
    onFinish: () => {
      console.log("DONE");
      dispatch(setGptStatus(GptStatus.DONE));
    }
  });

  useEffect(() => {
    if (userUid) {
      const unsub = onSnapshot(
        doc(db, "users", userUid, "maps", selectedMap),
        (doc) => {
          const data = doc.data();
          if (data) {
            dispatch(setLibrary(data.library));
          }
        }
      );
      return () => unsub();
    }
  }, []);

  useEffect(() => {
    async function fetchMapLibrary() {
      if (userUid) {
        const docRef = doc(db, "users", userUid, "maps", selectedMap);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(setLibrary(docSnap.data().library));
        } else {
          console.log("Doc is not existed");
        }
      }
    }
    fetchMapLibrary();
  }, [selectedMap]);

  useEffect(() => {
    if (messages && messages.length !== 1) {
      console.log(messages.slice(-1)[0].content);
      dispatch(setOutput(messages.slice(-1)[0].content));
    }
  }, [messages]);

  useEffect(() => {
    if (keywords.length) {
      updateFSLibrary();
    }
  }, [keywords]);

  return (
    <div className="z-50 flex h-[calc(100%-30px)] w-full flex-col justify-between overflow-hidden rounded-xl border border-mindchat-secondary p-2 font-normal shadow-md shadow-slate-700">
      <div className="flex h-5/6 flex-wrap overflow-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-700 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg">
        {keywords?.length > 0 &&
          keywords.map((keyword) => (
            <span
              key={nanoid()}
              className="group m-1 flex items-center rounded-xl border border-mindchat-primary-dark px-3 py-1 text-xs text-white"
            >
              <span>{keyword}</span>
              <span
                className="ml-2 hidden cursor-pointer text-lg group-hover:block hover:text-mindchat-primary active:text-mindchat-focus"
                onClick={() => deleteKeywordHandler(keyword)}
              >
                <TiDeleteOutline />
              </span>
            </span>
          ))}
      </div>
      <div className="flex flex-col gap-1">
        <form onSubmit={handleSubmit}>
          <button
            onClick={() => {
              setInput(keywords.toString());
            }}
            type="submit"
            className=" w-full rounded-full bg-mindchat-primary px-2 py-1 text-xs text-mindchat-bg-dark"
          >
            Generate article
          </button>
        </form>
        <form onSubmit={(e) => e.preventDefault()}>
          <button
            type="submit"
            className="w-full rounded-full bg-mindchat-primary px-2 py-1 text-xs text-mindchat-bg-dark"
          >
            Generate structure
          </button>
        </form>
      </div>
    </div>
  );
}
