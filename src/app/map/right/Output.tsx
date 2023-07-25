"use client";
import { useAppSelector } from "@/redux/hooks";

export default function OutPut() {
  const outputContent = useAppSelector((state) => state.output.output);
  return (
    <div className="z-50 flex h-[calc(100%-28px-8px)] max-h-[calc(100%-28px-8px)] w-full flex-col rounded-xl border border-mindchat-secondary p-[8px] text-xs font-normal text-white shadow-md shadow-slate-700">
      <div className="w-full overflow-auto text-start scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-700 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg">
        {outputContent}
      </div>
    </div>
  );
}
