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
import { systemResponseRules } from "@/app/constants/summarizeLibraryRules";
import { useEffect } from "react";
import { setLibrary } from "@/redux/features/librarySlice";
import { TiDeleteOutline } from "react-icons/ti";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/utils/firebase";
import { updateFSLibrary } from "@/app/utils/firestoreUpdater";

export default function Library() {
  const dispatch = useAppDispatch();
  const keywords = useAppSelector((state) => state.library.value);
  const selectedMap = useAppSelector((state) => state.userInfo.selectedMap);
  const userUid = useAppSelector((state) => state.userInfo.uid);

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
    if (userUid && selectedMap) {
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
  }, [selectedMap]);

  useEffect(() => {
    async function fetchMapLibrary() {
      if (userUid && selectedMap) {
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
      console.log("add keyword");
      updateFSLibrary();
    }
  }, [keywords]);

  return (
    <div className="z-50 flex h-[calc(100%-28px-8px)] max-h-[calc(100%-28px-8px)] w-full flex-col justify-between gap-3 overflow-hidden rounded-xl border border-mindchat-secondary p-2 font-normal shadow-md shadow-slate-700">
      <div className="h-[calc(100%-62px-12px)] overflow-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-700 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg">
        <div className="flex flex-wrap gap-2">
          {keywords?.length > 0 &&
            keywords.map((keyword) => (
              <span
                key={nanoid()}
                className="flex items-center rounded-xl border border-mindchat-primary-dark px-3 py-1 text-xs text-white"
              >
                <span>{keyword}</span>
                <span
                  className="ml-2 cursor-pointer text-lg hover:text-mindchat-primary active:text-mindchat-focus"
                  onClick={() => deleteKeywordHandler(keyword)}
                >
                  <TiDeleteOutline />
                </span>
              </span>
            ))}
        </div>
      </div>
      <div className="flex h-[62px] flex-col gap-1">
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
