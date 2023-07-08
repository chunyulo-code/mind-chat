"use client";
import Spolight from "@/app/map/right/Spolight";
import Library from "@/app/map/right/Library";
import Output from "@/app/map/right/Output";
export default function RightBar() {
  return (
    <div className="flex h-full flex-col gap-2 bg-mindchat-bg-dark p-5 text-center text-lg font-black text-white">
      <div>Spotlight</div>
      <div className="z-50 h-1/6 rounded-xl border border-mindchat-secondary shadow-md shadow-slate-700">
        <Spolight />
      </div>
      <div className="mt-4">Library</div>
      <div className="z-50 h-3/6 rounded-xl border border-mindchat-secondary shadow-md shadow-slate-700">
        <Library />
      </div>
      <div className="mt-4">Output</div>
      <div className="z-50 h-2/6 rounded-xl border border-mindchat-secondary shadow-md shadow-slate-700">
        <Output />
      </div>
    </div>
  );
}
