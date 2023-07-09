"use client";
import { useAppSelector } from "@/redux/hooks";

export default function OutPut() {
  const outputContent = useAppSelector((state) => state.output.output);
  return (
    <div className="h-full overflow-y-scroll p-2 text-xs font-normal text-white scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-mindchat-secondary scrollbar-thumb-rounded-lg">
      {outputContent}
    </div>
  );
}
