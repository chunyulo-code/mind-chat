import React from "react";
import { toMindMap, toOutline } from "@/redux/features/displayFormatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setGptStatus } from "@/redux/features/gptResponseSlice";
import { GptStatus } from "@/app/types/gptResponseSliceTypes";
import summarizePane from "@/app/utils/summarizePane";
import { RiMindMap } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineOutput } from "react-icons/md";

export default function FormatConverter() {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector((state) => state.flow.nodes);
  const edges = useAppSelector((state) => state.flow.edges);
  function toMindMapHandler() {
    dispatch(toMindMap());
  }
  function toOutlineHandler() {
    dispatch(setGptStatus(GptStatus.STAND_BY));
    dispatch(toOutline());
  }

  return (
    <div className="absolute left-5 top-5 z-50 flex gap-2">
      <div
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-mindchat-primary text-white"
        onClick={toMindMapHandler}
      >
        <RiMindMap />
      </div>
      <div
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-mindchat-primary text-white"
        onClick={toOutlineHandler}
      >
        <AiOutlineMenu />
      </div>
      <div
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-mindchat-primary text-white"
        onClick={() => {
          summarizePane({ nodes, edges });
        }}
      >
        <MdOutlineOutput />
      </div>
    </div>
  );
}
