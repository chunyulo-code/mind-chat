import React from "react";
import { toMindMap, toOutline } from "@/redux/features/displayFormatSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setGptStatus } from "@/redux/features/gptResponseSlice";
import { GptStatus } from "@/app/types/gptResponseSliceTypes";

export default function FormatConverter() {
  const dispatch = useAppDispatch();
  const toMindMapHandler = () => {
    dispatch(toMindMap());
  };
  const toOutlineHandler = () => {
    dispatch(setGptStatus(GptStatus.STAND_BY));
    dispatch(toOutline());
  };
  return (
    <div className="absolute left-5 top-5 z-50 flex gap-2">
      <div
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-mindchat-primary text-white"
        onClick={toMindMapHandler}
      >
        M
      </div>
      <div
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-mindchat-primary text-white"
        onClick={toOutlineHandler}
      >
        O
      </div>
    </div>
  );
}
