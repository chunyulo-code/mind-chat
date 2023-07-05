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

export default function Library() {
  const dispatch = useAppDispatch();
  const keywords = useAppSelector((state) => state.library.value);

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
    if (messages && messages.length !== 1) {
      console.log(messages.slice(-1)[0].content);
      dispatch(setOutput(messages.slice(-1)[0].content));
    }
  }, [messages]);

  return (
    <div className="flex h-full flex-col justify-between overflow-y-scroll p-2  scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-mindchat-secondary scrollbar-thumb-rounded-lg">
      <div className="flex flex-wrap">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="m-1 rounded-full border border-mindchat-primary-dark px-3 py-1 text-xs text-white"
          >
            {keyword}
          </span>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <button
            onClick={() => {
              console.log(keywords.toString());
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
            className="mt-1 w-full rounded-full bg-mindchat-primary px-2 py-1 text-xs text-mindchat-bg-dark"
          >
            Generate structure
          </button>
        </form>
      </div>
    </div>
  );
}
