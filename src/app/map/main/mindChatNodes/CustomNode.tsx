"use client";
import React, { memo } from "react";
import { Handle, Position } from "reactflow";

type dataProps = {
  data: {
    label: string;
  };
  selected: boolean;
};

function CustomNode({ data, selected }: dataProps) {
  const selectedStyle = `border-4 border-mindchat-focus`;
  const normalStyle = "border-2 border-mindchat-primary";

  return (
    <div
      className={`rounded-md px-4 py-2 ${
        selected ? selectedStyle : normalStyle
      }`}
    >
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
