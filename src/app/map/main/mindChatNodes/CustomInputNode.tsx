"use client";
import React, { memo } from "react";
import { Handle, Position, Node, NodeToolbar } from "reactflow";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setNodes } from "@/redux/features/flowSlice";

type CustomInputNodeProps = {
  id: string;
  data: {
    label: string;
    toolbarVisible: boolean;
  };
  selected: boolean;
};

function CustomInputNode({ id, data, selected }: CustomInputNodeProps) {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector((state) => state.flow.nodes);
  const selectedStyle = `border-4 border-mindchat-focus`;
  const normalStyle = "border-2 border-mindchat-primary";
  const selectedInputStyle = `border border-mindchat-focus`;
  const normalInputStyle = "border border-mindchat-primary-dark";
  const toolbarButtonStyle = "rounded-md bg-slate-700 px-2 py-1 text-slate-300";

  function updateText(inputText: string) {
    return nodes.map((node: Node) => {
      if (node.id === id) return { ...node, data: { label: inputText } };
      else return node;
    });
  }

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
        <button className={toolbarButtonStyle}>Brainstorm</button>
        <button className={toolbarButtonStyle}>Copy</button>
        <button className={toolbarButtonStyle}>Delete</button>
        <button className={toolbarButtonStyle}>Add to library</button>
      </NodeToolbar>
      <div className="text-lg font-bold text-[#ffffff]">{data.label}</div>
      <label htmlFor="nodeInputArea" className="hidden">
        Type here
      </label>
      <input
        type="text"
        id="nodeInputArea"
        className={`mt-1 w-full rounded-sm bg-transparent px-2 py-1 text-xs text-mindchat-secondary ${
          selected ? selectedInputStyle : normalInputStyle
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

export default memo(CustomInputNode);
