"use client";
import React, { memo } from "react";
import { Handle, Position, NodeToolbar } from "reactflow";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setNodes } from "@/redux/features/flowSlice";
import callChatGPT from "@/app/utils/callChatGPT";

type dataProps = {
  id: string;
  data: {
    label: string;
    toolbarVisible: boolean;
  };
  selected: boolean;
};

function CustomNode({ id, data, selected }: dataProps) {
  const dispatch = useAppDispatch();
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
    callChatGPT(keyword);
  }

  const buttonLists = [
    {
      text: "Brainstorm",
      id: "brainstorm",
      clickHandler: () => {
        brainstorm(data.label);
      }
    },
    {
      text: "Copy",
      id: "copy",
      clickHandler: () => {
        copyTextToClipboard(data.label);
      }
    },
    {
      text: "Delete",
      id: "delete",
      clickHandler: () => {
        deleteSelectedNode();
      }
    },
    {
      text: "Add to library",
      id: "AddToLibrary",
      clickHandler: () => {
        console.log("Add to library clicked");
      }
    }
  ];

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
          <button
            key={buttonList.id}
            className={toolbarButtonStyle}
            onClick={buttonList.clickHandler}
          >
            {buttonList.text}
          </button>
        ))}
      </NodeToolbar>
      <div className="text-lg font-bold text-[#ffffff]">{data.label}</div>
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
