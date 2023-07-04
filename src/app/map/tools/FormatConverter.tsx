import React, { useEffect } from "react";
import { toMindMap, toOutline } from "@/redux/features/displayFormatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setGptStatus } from "@/redux/features/outputSlice";
import { GptStatus } from "@/app/types/outputSliceTypes";
import { RiMindMap } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineOutput } from "react-icons/md";
import { nanoid } from "nanoid";
import { useChat } from "ai/react";
import { systemResponseRules } from "@/app/utils/summarizePaneRules";
import { ChatCompletionResponseMessageRoleEnum } from "openai-edge";
import { emptyOutput, setOutput } from "@/redux/features/outputSlice";

export default function FormatConverter() {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector((state) => state.flow.nodes);
  const edges = useAppSelector((state) => state.flow.edges);
  function toMindMapHandler() {
    dispatch(toMindMap());
  }
  function toOutlineHandler() {
    dispatch(setGptStatus(GptStatus.STAND_BY));
    dispatch(toOutline());
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

  function summarizePane() {
    const simplifiedNodes = nodes.map((node) => ({
      id: node.id,
      data: {
        label: node.data.label
      }
    }));
    const question = `nodes: ${JSON.stringify(
      simplifiedNodes
    )}, edges: ${JSON.stringify(edges)}`;
    setInput(question);
  }

  useEffect(() => {
    if (messages && messages.length !== 1) {
      console.log(messages.slice(-1)[0].content);
      dispatch(setOutput(messages.slice(-1)[0].content));
    }
  }, [messages]);

  return (
    <div className="absolute left-5 top-5 z-50 flex gap-2">
      <div
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-mindchat-primary text-white"
        onClick={toMindMapHandler}
      >
        <RiMindMap />
      </div>
      <div
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-mindchat-primary text-white"
        onClick={toOutlineHandler}
      >
        <AiOutlineMenu />
      </div>
      <form onSubmit={handleSubmit}>
        <button
          title="Summarize pane"
          type="submit"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-mindchat-primary text-white"
          onClick={summarizePane}
        >
          <MdOutlineOutput />
        </button>
      </form>
    </div>
  );
}
