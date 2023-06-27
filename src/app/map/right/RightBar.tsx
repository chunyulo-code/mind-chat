"use client";
import Spolight from "@/app/map/right/Spolight";
import Library from "@/app/map/right/Library";
import Output from "@/app/map/right/Output";
export default function RightBar() {
  return (
    <div className="flex h-full flex-col gap-5 bg-mindchat-bg-dark p-5">
      <div className="z-50 h-1/6 rounded-xl border border-mindchat-secondary">
        <Spolight />
      </div>
      <div className="z-50 h-3/6 rounded-xl border border-mindchat-secondary">
        <Library />
      </div>
      <div className="z-50 h-2/6 rounded-xl border border-mindchat-secondary">
        <Output />
      </div>
    </div>
  );
}
