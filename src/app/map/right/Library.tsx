"use client";

import { useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import { useChat } from "ai/react";
import { ChatCompletionResponseMessageRoleEnum } from "openai-edge";
import { TiDeleteOutline } from "react-icons/ti";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { GptStatus } from "@/app/types/outputSliceTypes";
import {
  setGptStatus,
  emptyOutput,
  setOutput
} from "@/redux/features/outputSlice";
import { setLibrary } from "@/redux/features/librarySlice";
import { systemResponseRules } from "@/app/constants/summarizeLibraryRules";
import { db } from "@/app/utils/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { updateFSLibrary } from "@/app/utils/firestoreUpdater";

export default function Library() {
  const dispatch = useAppDispatch();
  const selectedMap = useAppSelector((state) => state.userInfo.selectedMap);
  const userUid = useAppSelector((state) => state.userInfo.uid);
  const keywords = useAppSelector((state) => state.library.value);
  const keywordsRef = useRef(keywords);

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
      dispatch(emptyOutput());
      dispatch(setGptStatus(GptStatus.DOING));
    },
    onFinish: () => {
      dispatch(setGptStatus(GptStatus.DONE));
    }
  });

  useEffect(() => {
    async function fetchMapLibrary() {
      if (userUid && selectedMap) {
        const docRef = doc(db, "users", userUid, "maps", selectedMap);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(setLibrary(docSnap.data().library));
        } else {
          console.error("Doc is not existed");
        }
      }
    }

    fetchMapLibrary();
  }, [userUid, selectedMap, dispatch]);

  useEffect(() => {
    async function fetchMapLibrary() {
      if (userUid && selectedMap) {
        const docRef = doc(db, "users", userUid, "maps", selectedMap);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(setLibrary(docSnap.data().library));
        } else {
          console.error("Doc is not existed");
        }
      }
    }

    fetchMapLibrary();

    if (userUid && selectedMap) {
      const docRef = doc(db, "users", userUid, "maps", selectedMap);
      const unsubscribe = onSnapshot(docRef, (doc) => {
        const data = doc.data();
        if (
          data &&
          JSON.stringify(data.library) !== JSON.stringify(keywordsRef.current)
        ) {
          dispatch(setLibrary(data.library));
        }
      });

      return () => unsubscribe();
    }
  }, [userUid, selectedMap, dispatch]);

  useEffect(() => {
    keywordsRef.current = keywords;

    if (keywords.length) {
      updateFSLibrary();
    }
  }, [keywords]);

  useEffect(() => {
    if (messages && messages.length !== 1) {
      dispatch(setOutput(messages.slice(-1)[0].content));
    }
  }, [messages, dispatch]);

  function AllKeywordTags({ keywords }: { keywords: string[] }) {
    return (
      <>
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
      </>
    );
  }

  function Button({ keywords }: { keywords: string[] }) {
    return (
      <form onSubmit={handleSubmit} className="h-[35px]">
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
    );
  }

  return (
    <div className="z-50 flex h-[calc(100%-28px-8px)] max-h-[calc(100%-28px-8px)] w-full flex-col justify-between gap-3 overflow-hidden rounded-xl border border-mindchat-secondary p-2 font-normal shadow-md shadow-slate-700">
      <div className="h-[calc(100%-35px-12px)] overflow-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-700 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg">
        <div className="flex flex-wrap gap-2">
          <AllKeywordTags keywords={keywords} />
        </div>
      </div>
      <Button keywords={keywords} />
    </div>
  );
}
