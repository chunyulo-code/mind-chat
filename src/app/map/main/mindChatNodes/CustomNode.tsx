"use client";
import React, { memo, useEffect } from "react";
import { Handle, Position, NodeToolbar } from "reactflow";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setNodes,
  setPositionToGenetate,
  setNewTopicParentNodeId,
  syncPrevNodesNEdges
} from "@/redux/features/flowSlice";
import { addToLibrary } from "@/redux/features/librarySlice";
import { useChat } from "ai/react";
import { systemResponseRules } from "@/app/utils/askTopicRules";
import { nanoid } from "nanoid";
import { ChatCompletionResponseMessageRoleEnum } from "openai-edge";
import { setGptStatus } from "@/redux/features/gptResponseSlice";
import { GptStatus } from "@/app/types/gptResponseSliceTypes";
import { setGptResponse } from "@/redux/features/gptResponseSlice";
import { Node } from "reactflow";

type dataProps = {
  id: string;
  data: {
    label: string;
    toolbarVisible: boolean;
  };
  xPos: number;
  yPos: number;
  selected: boolean;
};

function CustomNode({ id, data, xPos, yPos, selected }: dataProps) {
  const dispatch = useAppDispatch();
  const editableNode = useAppSelector((state) => state.flow.editableNode);

  const { messages, handleSubmit, setInput } = useChat({
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
  const nodes = useAppSelector((state) => state.flow.nodes);
  const selectedStyle = `border-4 border-mindchat-focus`;
  const normalStyle = "border-2 border-mindchat-primary";
  const toolbarButtonStyle =
    "rounded-md bg-slate-700 px-2 py-1 text-slate-300 hover:bg-transparent hover:border hover:border-mindchat-primary";

  async function copyTextToClipboard(text: string | undefined) {
    if (text !== undefined) {
      await navigator.clipboard.writeText(text);
    }
  }

  function deleteSelectedNode() {
    const filteredNodes = nodes.filter((node) => node.id !== id);
    dispatch(setNodes(filteredNodes));
  }

  function brainstorm(keyword: string) {
    dispatch(syncPrevNodesNEdges());
    dispatch(setPositionToGenetate({ x: xPos + 250, y: yPos }));
    dispatch(setNewTopicParentNodeId(id));
    setInput(keyword);
    console.log(`keyword: ${keyword}`);
  }

  function updateText(inputText: string) {
    return nodes.map((node: Node) => {
      if (node.id === id) return { ...node, data: { label: inputText } };
      else return node;
    });
  }

  const buttonLists = [
    {
      text: "Brainstorm",
      id: "brainstorm",
      clickHandler: () => brainstorm(data.label),
      submitHandler: (e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)
    },
    {
      text: "Copy",
      id: "copy",
      clickHandler: () => {
        copyTextToClipboard(data.label);
      },
      submitHandler: (e: React.FormEvent<HTMLFormElement>) => e.preventDefault()
    },
    {
      text: "Delete",
      id: "delete",
      clickHandler: () => {
        deleteSelectedNode();
      },
      submitHandler: (e: React.FormEvent<HTMLFormElement>) => e.preventDefault()
    },
    {
      text: "Add to library",
      id: "AddToLibrary",
      clickHandler: () => {
        dispatch(addToLibrary(data.label));
      },
      submitHandler: (e: React.FormEvent<HTMLFormElement>) => e.preventDefault()
    }
  ];

  useEffect(() => {
    if (messages && messages.length !== 1) {
      dispatch(setGptResponse(messages.slice(-1)[0].content));
    }
  }, [messages]);

  return (
    <div
      className={`rounded-md px-4 py-2 ${
        selected ? selectedStyle : normalStyle
      }`}
    >
      <NodeToolbar
        isVisible={data.toolbarVisible}
        position={Position.Top}
        offset={15}
        className="flex gap-2 rounded-xl bg-mindchat-bg-dark-darker p-2"
      >
        {buttonLists.map((buttonList) => (
          <form key={buttonList.id} onSubmit={buttonList.submitHandler}>
            <button
              type="submit"
              className={toolbarButtonStyle}
              onClick={buttonList.clickHandler}
            >
              {buttonList.text}
            </button>
          </form>
        ))}
      </NodeToolbar>
      <div
        className={`text-lg font-bold text-[#ffffff] ${
          editableNode?.id === id ? "hidden" : "block"
        }`}
      >
        {data.label}
      </div>
      <label htmlFor="nodeLabelInput" className="hidden">
        label:
      </label>
      <input
        type="text"
        id="nodeLabelInput"
        className={`w-full bg-transparent px-2 py-1 text-white ${
          editableNode?.id === id ? "block" : "hidden"
        }`}
        value={data.label}
        onChange={(e) => dispatch(setNodes(updateText(e.target.value)))}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="h-3 w-3 rounded-full border-2 border-white !bg-[#66fcf1]"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="h-3 w-3 rounded-full border-2 border-white !bg-[#66fcf1]"
      />
    </div>
  );
}

export default memo(CustomNode);
