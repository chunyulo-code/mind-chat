"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useAppSelector } from "@/redux/hooks";

export default function Outline() {
  const gptResponse = useAppSelector((state) => state.gptResponse.allResponse);

  return (
    <div className="relative flex h-full w-full justify-center bg-mindchat-bg-dark pb-32 pt-20 ">
      <ReactMarkdown className="prose prose-invert w-full overflow-y-scroll scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-mindchat-secondary scrollbar-thumb-rounded-lg">
        {gptResponse}
      </ReactMarkdown>
    </div>
  );
}
