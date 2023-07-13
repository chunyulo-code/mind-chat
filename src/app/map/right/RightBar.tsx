"use client";
import Spolight from "@/app/map/right/Spolight";
import Library from "@/app/map/right/Library";
import Output from "@/app/map/right/Output";
export default function RightBar() {
  return (
    <div className="flex h-full flex-col justify-between bg-mindchat-bg-dark p-5 text-center text-lg font-black text-white">
      <div className="flex h-[155px] flex-col gap-2">
        <div className="h-[30px] w-full">Spotlight</div>
        <Spolight />
      </div>
      <div className="flex h-[465px] flex-col gap-2">
        <div className="h-[30px] w-full">Library</div>
        <Library />
      </div>
      <div className="flex h-[310px] flex-col gap-2">
        <div className="h-[30px] w-full">Output</div>
        <Output />
      </div>
    </div>
  );
}
