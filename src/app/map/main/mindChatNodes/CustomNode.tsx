"use client";

import { memo, useEffect } from "react";
import { Node, Handle, Position, NodeToolbar } from "reactflow";
import { useChat } from "ai/react";
import { ChatCompletionResponseMessageRoleEnum } from "openai-edge";
import { nanoid } from "nanoid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setNodes,
  setPositionToGenetate,
  setNewTopicParentNodeId,
  syncPrevNodesNEdges
} from "@/redux/features/flowSlice";
import { addToLibrary } from "@/redux/features/librarySlice";
import { setGptStatus } from "@/redux/features/gptResponseSlice";
import { setGptResponse } from "@/redux/features/gptResponseSlice";
import { GptStatus } from "@/app/types/gptResponseSliceTypes";
import { systemResponseRules } from "@/app/constants/askTopicRules";

type CustomNodeProps = {
  id: string;
  data: {
    label: string;
    toolbarVisible: boolean;
  };
  xPos: number;
  yPos: number;
  selected: boolean;
};

function CustomNode({ id, data, xPos, yPos, selected }: CustomNodeProps) {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector((state) => state.flow.nodes);
  const editableNode = useAppSelector((state) => state.flow.editableNode);

  const normalStyle = "border-2 border-mindchat-primary";
  const selectedStyle = "border-2 border-mindchat-focus";
  const borderStyle = selected ? selectedStyle : normalStyle;
  const toolbarButtonStyle =
    "rounded-md bg-slate-700 px-2 py-1 text-slate-300 hover:bg-transparent hover:border hover:border-mindchat-primary";

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
      dispatch(setGptStatus(GptStatus.DOING));
    },
    onFinish: () => {
      dispatch(setGptStatus(GptStatus.DONE));
    }
  });

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
  }

  function updateText(nodes: Node[], nodeId: string, inputText: string) {
    return nodes.map((node) => {
      if (node.id === nodeId) return { ...node, data: { label: inputText } };
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
    function updateGptResponse() {
      if (messages && messages.length !== 1) {
        const latestMessage = messages[messages.length - 1];
        dispatch(setGptResponse(latestMessage.content));
      }
    }

    updateGptResponse();
  }, [messages, dispatch]);

  return (
    <div className={`rounded-md px-4 py-2 ${borderStyle}`}>
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
      <>
        <div
          className={`text-lg font-bold text-[#ffffff] ${
            editableNode?.id === id ? "hidden" : "block"
          }`}
        >
          {data.label}
        </div>
        <div>
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
            onChange={(e) =>
              dispatch(setNodes(updateText(nodes, id, e.target.value)))
            }
          />
        </div>
      </>
      <Handle
        type="target"
        position={Position.Left}
        className="h-3 w-3 rounded-full border-2 border-white !bg-[#66fcf1]"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="h-3 w-3 rounded-full border-2 border-white !bg-[#66fcf1]"
      />
    </div>
  );
}

export default memo(CustomNode);
