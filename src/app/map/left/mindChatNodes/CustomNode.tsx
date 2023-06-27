"use client";
import React, { memo } from "react";
import { Handle, Position } from "reactflow";

type dataProps = {
  data: {
    label: string;
  };
};

function CustomNode({ data }: dataProps) {
  return (
    <div className="rounded-md border-2 border-[#66fcf1] px-4 py-2 shadow-md">
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
