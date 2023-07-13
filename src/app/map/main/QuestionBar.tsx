"use client";

import React, { useEffect } from "react";
// import askTopic from "@/app/utils/askTopic";
import { useChat } from "ai/react";
import { ChatCompletionResponseMessageRoleEnum } from "openai-edge";
import {
  setGptResponse,
  setGptStatus
} from "@/redux/features/gptResponseSlice";
import { syncPrevNodesNEdges } from "@/redux/features/flowSlice";
import { useAppDispatch } from "@/redux/hooks";
import { GptStatus } from "@/app/types/gptResponseSliceTypes";
import { systemResponseRules } from "@/app/utils/askTopicRules";
import { nanoid } from "nanoid";

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
      console.log("DOING");
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
      dispatch(setGptResponse(messages.slice(-1)[0].content));
    }
  }, [messages]);

  return (
    <div className="absolute left-1/2 top-1/2 z-50 flex items-center">
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
            className="h-10 w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-mindchat-primary bg-transparent px-4 text-white"
          />
        </label>
      </form>
    </div>
  );
}
