"use client";
import Spolight from "@/app/map/right/Spolight";
import Library from "@/app/map/right/Library";
import Output from "@/app/map/right/Output";
export default function RightBar() {
  return (
    <div className="flex h-full flex-col justify-between gap-5 bg-mindchat-bg-dark p-5 text-center text-lg font-black text-white">
      <div className="flex h-1/6 flex-col gap-2 overflow-auto">
        <div className="h-[28px]">Spotlight</div>
        <Spolight />
      </div>
      <div className="flex h-3/6 flex-col gap-2 overflow-auto">
        <div className="h-[28px]">Library</div>
        <Library />
      </div>
      <div className="flex h-2/6 flex-col gap-2 overflow-auto">
        <div className="h-[28px]">Output</div>
        <Output />
      </div>
    </div>
  );
}
