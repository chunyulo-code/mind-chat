"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";

export default function GptResponse() {
  const gptResponse = useAppSelector((state) => state.gptResponse.allResponse);

  return (
    <div className="absolute left-5 top-[70px] z-30 text-mindchat-secondary">
      {gptResponse}
    </div>
  );
}
