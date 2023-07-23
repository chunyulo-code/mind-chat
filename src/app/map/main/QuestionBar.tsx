"use client";

import { useEffect } from "react";
import { useChat } from "ai/react";
import { ChatCompletionResponseMessageRoleEnum } from "openai-edge";
import { nanoid } from "nanoid";
import {
  setGptResponse,
  setGptStatus
} from "@/redux/features/gptResponseSlice";
import { syncPrevNodesNEdges } from "@/redux/features/flowSlice";
import { useAppDispatch } from "@/redux/hooks";
import { GptStatus } from "@/app/types/gptResponseSliceTypes";
import { systemResponseRules } from "@/app/constants/askTopicRules";

export default function QuestionBar() {
  const dispatch = useAppDispatch();

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/gpt",
    initialMessages: [
      {
        id: nanoid(),
        role: ChatCompletionResponseMessageRoleEnum.System,
        content: systemResponseRules
      }
    ],
    onResponse: () => {
      dispatch(setGptStatus(GptStatus.DOING));
    },
    onFinish: () => {
      dispatch(setGptStatus(GptStatus.DONE));
    }
  });

  useEffect(() => {
    if (messages && messages.length !== 1) {
      dispatch(setGptResponse(messages.slice(-1)[0].content));
    }
  }, [messages, dispatch]);

  return (
    <div className="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center">
      <form
        onSubmit={(e) => {
          dispatch(syncPrevNodesNEdges());
          handleSubmit(e);
        }}
      >
        <label>
          <input
            type="text"
            placeholder="Type any topics..."
            value={input}
            onChange={handleInputChange}
            className="h-10 w-[300px] rounded-full border border-mindchat-primary bg-mindchat-bg-dark px-4 text-white"
          />
        </label>
      </form>
    </div>
  );
}
